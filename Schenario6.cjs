// 6. Data Transformation
// Write a function transformProductsForLookup(productList) 
// that takes an array of product objects (like the one from the API call in Schenario 5) 
// and transforms it into a single object where each key is the product's id 
// and the value is the product object itself. 
// This makes looking up products by ID much faster.
//Answer:
const transformProductsForLookup=(productlist)=>{
    return productlist.reduce((acc, product) => {
        acc[product.id] = product;
        return acc;
    }, {});
}

//Answer using lambda function
const transferProductsForLookupLambda=(productlist)=>{
    return productlist.reduce((acc,product)=>({...acc,[product.id]:product}),{});
}

//Answer using Normal foreach loop
const transformProductsForLookupForeach=(productlist)=>{
    const productMap={};
    productlist.forEach(product=>{
        productMap[product.id]=product;
    })
    return productMap;
}