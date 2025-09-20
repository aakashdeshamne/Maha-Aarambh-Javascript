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