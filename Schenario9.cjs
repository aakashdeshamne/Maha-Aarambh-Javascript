// 9 .Write a function getUsersWithCache(cacheDuration) 
// that fetches user data from https://jsonplaceholder.typicode.com/users. 
// It should store the response in localStorage along with a timestamp. 
// On subsequent calls, 
// if the cached data exists and is not older than cacheDuration (in milliseconds),
//  it should return the cached data. Otherwise, 
//  it should make a new API call and update the cache.