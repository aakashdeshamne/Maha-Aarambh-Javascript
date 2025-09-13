// 9 .Write a function getUsersWithCache(cacheDuration) 
// that fetches user data from https://jsonplaceholder.typicode.com/users. 
// It should store the response in localStorage along with a timestamp. 
// On subsequent calls, 
// if the cached data exists and is not older than cacheDuration (in milliseconds),
//  it should return the cached data. Otherwise, 
//  it should make a new API call and update the cache.

const url='https://jsonplaceholder.typicode.com/users';
//Solution

const getUsersWithCache=async(cacheUserDuration)=>{
    const cacheData=localStorage.getItem('cached_users');
    const cacheTimestamp=localStorage.getItem('cache_timestamp');
    const currentTime=Date.now();
    if(cacheData && cacheTimestamp && (currentTime-cacheTimestamp)<cacheUserDuration){
        return JSON.parse(cacheData);
    }
    else{
        const fetchData=await fetch(url);
        const userData=await fetchData.json();
        localStorage.setItem('cached_users',JSON.stringify(userData));
        localStorage.setItem('cache_timestamp',currentTime.toString());
        return userData;
    }
}
