const express = require('express');
const categoryRouter = express.Router();

const categoryCtrl = require('../controllers/category.controller');

categoryRouter.get('/category', categoryCtrl.category);
categoryRouter.post('/create-category', categoryCtrl.uploadBannerPath, categoryCtrl.createCategory);
categoryRouter.get('/edit-category/:category_id', categoryCtrl.uploadBannerPath ,categoryCtrl.editCategory);
categoryRouter.get('/delete-category/:category_id' ,categoryCtrl.deleteCategory);


module.exports = categoryRouter;