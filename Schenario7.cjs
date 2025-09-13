// 7. Storing Data in Local Storage
// Write a function saveProductsToLocalStorage(products) that takes a products array, 
// converts it to a JSON string,
// and stores it in the browser's localStorage under the key user_products.

//Answer

const saveProductsToLocalStorage=(products)=>{
    const productJson=JSON.stringify(products);
    localStorage.setItem('user_products',productJson);
}

//Soluution in different way
const saveProductsToLocalStorageLambda=(products)=>{
    localStorage.setItem('user_products',JSON.stringify(products));
}