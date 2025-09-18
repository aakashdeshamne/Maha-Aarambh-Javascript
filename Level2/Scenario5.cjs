// 5. Data Aggregation

// Scenario: You have an array of sales transaction objects. 
// You need to calculate the total sales amount for each product category.
// Task: Write a function calculateCategorySales(transactions) 
// that takes an array of transaction objects 
// (e.g., [{ category: 'Electronics', amount: 1200 }, { category: 'Books', amount: 45 }, ...]) 
// and returns an object where keys are the category names and values are the total sales
//  for that category.

const calculateCategorySales=(transactions)=>{
    const categorysales={};
    for(const transaction of transactions){
        const {category,amount}=transaction;
        if(categorysales[category]){
            categorysales[category]+=amount;
        }
        else{
            categorysales[category]=amount;
        }
    }
    return categorysales;
}

//reducing code and using reduce method
const calculateCategorySalesReduce=(transactions)=>{
    return transactions.reduce((acc,transaction)=>{
        const {category,amount}=transaction;
        if(acc[category]){
            acc[category]+=amount;
        }
        else{
            acc[category]=amount;
        }
        return acc;
    },{});
}