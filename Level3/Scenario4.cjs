// 4. Database Transactions

// Scenario: You're building a banking application. When a user transfers money from one account to another,
//  two separate database updates must occur: debiting one account and crediting another. 
//  This entire operation must be atomic—if one part fails, the whole transaction should be rolled back.

// Task: Write a function transferMoney(fromAccountId, toAccountId, amount) 
// using a library like Mongoose (with replica sets enabled for transactions). This function should:

// 1)Start a database session and transaction.

// 2)Find and decrease the balance of the fromAccountId.

// 3)Find and increase the balance of the toAccountId.

// 4)Commit the transaction.

// 4)If any step fails (e.g., insufficient funds), 
// it must abort the transaction so that no changes are saved.

