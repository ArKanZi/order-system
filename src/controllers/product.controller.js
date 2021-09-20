const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../uploads'),
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      console.log("Filename: ", file.fieldname + '-' + uniqueSuffix + '.' + path.extname(file.originalname));
      cb(null, file.fieldname + '-' + uniqueSuffix +  path.extname(file.originalname)) 
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  };

const upload = multer({ storage: storage, fileFilter });
const uploadBannerPath = upload.single('ProductBanner');

const productService = require('../services/product.service');
function Product(req, res){
    productService.getProductList().then(
        productList => {
            console.log(productList[1]);
            res.render('product/product', {title: 'product', product: productList[0], productCategory: productList[1]})
        }
    ).catch(
        error => {
            console.log(error);
            res.render('product/product', {title: 'product', product: [] })
        }
    )
    
}

function createProduct(req, res){
    const body = req.body;
    const file = req.file;
    //console.log(file);
    body['filename'] = file.filename;
    //console.log(body);
    productService.createProductServices(body).then(
        result => res.redirect('/product')
    ).catch(
        error => console.log(error)
    )
}

function editProduct(req, res){
    const productId = req.params.product_id
    productService.getCategoryList().then(
        productList => {
            //console.log(productList);
            //console.log(productId,item);
            const productLIST = productList.find((productDetails) => productDetails.productId == productId)
            res.render('product/edit-product', {title: 'Edit product', product: productLIST})
        }
    ).catch(
        error => {
            console.log(error);
            res.render('product/edit-product', {title: 'Edit product', product: [] })
        }
    )
    //res.render('product/edit-product');
}

function deleteProduct(req, res){
    
}

module.exports = {
    Product,
    createProduct,
    editProduct,
    deleteProduct,
    uploadBannerPath
}