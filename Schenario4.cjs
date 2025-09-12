// Data Validation Function
// Write a function validateProductData(product) that takes a product object. 
// It should return true if the product has a name (string, not empty), 
// a price (number, greater than 0), and an id (number). Otherwise, 
// it should return false.

//Answer
const validateProductData=(product)=>{
    if(typeof(product.name)==='string' && product.name.trim()!==''){
        if(typeof(product.price)==='number' && product.price>0){
            if(typeof(product.id)==='number'){
                return true;
            }
            return false;
        }
    }
    return false;
}
console.log(validateProductData({id:101,name:"Aakash",price:1200}));//true