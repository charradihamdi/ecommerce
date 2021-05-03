const express =require('express');
const router= express.Router();

const {addCategory,getCategories}=require('../controllers/category')
router.post('/category/create',addCategory);
router.get('/category/getCategories',getCategories);
module.exports=router;