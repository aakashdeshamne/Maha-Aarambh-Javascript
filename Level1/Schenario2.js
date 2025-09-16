//  Product Data Retrieval Function

// Given the following array of product objects, 
// write a JavaScript function getProductById(id)
//  that takes a product ID as an argument and returns the corresponding product object.
//  If no product is found, it should return null.

const products = [
  { id: 101, name: "Laptop", price: 1200 },
  { id: 102, name: "Mouse", price: 25 },
  { id: 103, name: "Keyboard", price: 75 },
];

//Answer
//normal function
function getProductById(id){
    for(let i=0;i<products.length;i++){
        if(products[i].id==id){
            return product[i];
        }
    }
    return null;
}
//Arraow function
const getProductByIdArrow=(id)=>{
    for(let i=0;i<products.length;i++){
        if(products[i].id==id){
            return product[i];
        }
    }
    return null;
}
//using annonymous function
const requireProduct=function(id){
    for(let i=0;i<products.length;i++){
        if(products[i].id==id){
            return product[i];
        }
    }
    return null;
}

//using find method
const getProductByIdFind=(id)=>{
    const product=products.find((products)=>products.id===id);
    return product || null;
}

