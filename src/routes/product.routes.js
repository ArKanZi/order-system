const express = require('express');
const productRouter = express.Router();

const productCtrl = require('../controllers/product.controller');

productRouter.get('/product', productCtrl.Product);
productRouter.post('/create-product', productCtrl.uploadBannerPath, productCtrl.createProduct);
productRouter.get('/edit-product/:product_id', productCtrl.uploadBannerPath , productCtrl.editProduct);

module.exports = productRouter;