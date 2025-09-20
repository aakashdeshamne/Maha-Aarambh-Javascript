// 7. Asynchronous Cache Simulation

// Scenario: Your database is slow. You want to implement a cache to store results from frequent queries,
// but the cache itself (like Redis) is an external service that you must interact with asynchronously.
// Task: Create a simple async cache object asyncCache with get and set methods. 
// Both methods should return Promises. set(key, value) should store the value 
// and resolve after a 50ms delay (simulating network latency). get(key) should retrieve the value.
// Write a function getUserWithCache(userId) that first tries to get the user from asyncCache.
// If it's a cache miss (returns undefined), 
// it should "fetch" the user from a simulated database function (that also returns a promise) 
// and then set the result in the cache before returning the user.

const model=require('../models/UserModel');

const asyncCache={
    store:{},
    set(key,value){
        return new Promise((resolve)=>{
            setTimeout(()=>{
                this.store[key]=value;
                resolve();
            },50);       
        })
    },
    get(key){
        return new Promise((resolve)=>{
            setTimeout(()=>{
                resolve(this.store[key]);
            },50);
        })
    }
}

const getUserFromDB = async (userId) => {
    const user = await model.findOne(userId);
    if (!user) throw new Error('User not found');
    return user;
};

const getUserWithCache=async(userId)=>{
    let user=await asyncCache.get(userId);
    if(!user){
        user=await getUserFromDB(userId);
        if(!user) throw new Error('User not found');
        await asyncCache.set(userId,user);
        return user;
    }
    return user;
}
