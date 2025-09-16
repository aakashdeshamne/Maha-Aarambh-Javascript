// 8. Retrieving Data from Local Storage
// Write a function loadProductsFromLocalStorage() 
// that retrieves the user_products item from localStorage, 
// parses it from a JSON string back into an array of objects, 
// and returns it. If no data is found, it should return an empty array [].

//Answer
function loadProductsFromLocalStorage(){
    const product=[];
    const productJson=localStorage.getItem('user_products');
    if(productJson){
        product.push(...JSON.parse(productJson));
        return product;
    }
    return product;
}

//Soluution in different better way

const loadProductsFromLocalStorageLambda=()=>{
    const productJson=localStorage.getItem('user_products');
    return productJson ? JSON.parse(productJson) : [];
}