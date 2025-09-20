//routes/products.v2.js
const express = require('express');
const router = express.Router();
// Sample data for v2
const productsV2 = [
    { id: 1, name: 'Product A', price: 100, category: 'Electronics' },
    { id: 2, name: 'Product B', price: 150, category: 'Apparel' }
];
router.get('/',(req,res)=>{
    res.json(productsV2);
})
module.exports = router;