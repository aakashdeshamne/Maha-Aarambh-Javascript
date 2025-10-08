// 2. Distributed Caching Strategy (Conceptual)

// Scenario: Your single-instance Redis cache (from Day 3) is becoming a bottleneck and
// a single point of failure as your application scales.
// Task:

// Explain the limitations of a single-node cache in a multi-server environment.

// Describe the "Cache-Aside" pattern (the one you implemented on Day 3).

// Propose a solution for a distributed caching system. Explain what a distributed cache 
// (like Redis Cluster or Memcached) is and how it solves the problem.

// Discuss a cache invalidation strategy. If a product's price is updated in the database, 
// how do you ensure the old value is removed from the distributed cache across all servers?

// Limitations of a single-node cache in a multi-server environment:
// 1. Scalability: A single-node cache can become a bottleneck as the number of requests increases.
// 2. Single Point of Failure: If the cache node goes down, all servers relying on it will experience
//    increased latency as they fall back to the database.
// 3. Limited Memory: A single cache node has limited memory capacity, which can lead to cache misses
//    if the dataset grows beyond its capacity.
// 4. Network Latency: In a distributed environment, servers may be located in different regions,
//    leading to increased latency when accessing a single cache node.

// Cache-Aside Pattern:
// The Cache-Aside pattern involves the application checking the cache before querying the database.
// If the data is found in the cache (cache hit), it is returned directly. If not (cache miss),
// the application retrieves the data from the database, stores it in the cache, and then returns it.
// This pattern allows for lazy loading of data into the cache and helps keep the cache updated
// with frequently accessed data.

// Solution for a Distributed Caching System:
// A distributed cache, such as Redis Cluster or Memcached, consists of multiple cache nodes
// that work together to provide a larger, more resilient caching layer. Each node can store

// a portion of the cached data, allowing for horizontal scaling as the application grows.
// Distributed caches can handle higher loads and provide redundancy, ensuring that if one
// node fails, others can continue to serve cached data. This setup reduces the risk of a
// single point of failure and improves overall application performance.
// Cache Invalidation Strategy:
// To ensure that stale data is not served from the cache after a product's price is updated
// in the database, a cache invalidation strategy must be implemented. One common approach
// is to use a "write-through" or "write-behind" strategy, where updates to the database
// also update or invalidate the corresponding cache entries. For example, when a product's
// price is updated, the application can either remove the old cache entry or update it 
// with the new price. This can be done using a message queue or pub/sub system to notify
// all cache nodes of the change, ensuring that all servers have consistent and up-to-date
// cached data.

