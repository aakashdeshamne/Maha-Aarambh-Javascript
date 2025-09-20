// routes/products.v1.js
const express = require('express');
const router = express.Router();
// Sample data for v1
const productsV1 = [
    { id: 1, name: 'Product A', price: 100 },
    { id: 2, name: 'Product B', price: 150 }
];
router.get('/',(req,res)=>{
    res.json(productsV1);
})
module.exports = router;