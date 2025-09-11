// Simple In-Memory Cache
// Write a function getCachedProduct(id) 
// that first checks a simple in-memory cache (a JavaScript object) 
// for a product. If the product exists in the cache, return it. 
// If not, retrieve it from the products array (using the getProductById function from the previous exercise),
// store it in the cache, and then return it.

const products = [
  { id: 101, name: "Laptop", price: 1200 },
  { id: 102, name: "Mouse", price: 25 },
  { id: 103, name: "Keyboard", price: 75 },
];

//Answer
const productCache={};
const getCachedProduct=(id)=>{
      if(productCache[id]){
        return productCache[id];
      }
      else{
        const product=products.find((products)=>products.id===id);
        if(product){
            productCache[id]=product;
            return product;
        }
        return null;
      }
}
