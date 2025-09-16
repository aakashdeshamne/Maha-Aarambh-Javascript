// Asynchronous Data Fetching with async/await
// Write an async function fetchProducts() that uses fetch and await to get data 
// from the following public API endpoint: 
// https://fakestoreapi.com/products. 
// The function should return the JSON data.
const url="https://fakestoreapi.com/products";

//Answer using arrow function
const fetchProducts=async(url)=>{
    try{
        const response=await fetch(url);
        const data=await response.json();
        return data;
    }
    catch(error){
        console.error("Error fetching products:",error);
    }
}
fetchProducts(url).
then((data)=>console.log(data)).catch((error)=>console.error(error));