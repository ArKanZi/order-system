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
const uploadBannerPath = upload.single('categoryBanner');

const categoryService = require('../services/category.service');
function category(req, res){
    categoryService.getCategoryList().then(
        categoryList => {
            //console.log(categoryList);
            res.render('category/category', {title: 'Category', category: categoryList})
        }
    ).catch(
        error => {
            console.log(error);
            res.render('category/category', {title: 'Category', category: [] })
        }
    )
}

function createCategory(req, res){
    const body = req.body;
    const file = req.file;
    body['filename'] = file.filename;
    categoryService.createCategoryServices(body).then(
        result => res.redirect('/category')
    ).catch(
        error => console.log(error)
    )
}

function editCategory(req, res){
    const categoryId = req.params.category_id
    categoryService.getCategoryList().then(
        categoryList => {
            //console.log(categoryList);
            //console.log(categoryId,item);
            const CategoryLIST = categoryList.find((CategoryDetails) => CategoryDetails.CategoryId == categoryId)
            res.render('category/edit-category', {title: 'Edit Category', category: CategoryLIST})
        }
    ).catch(
        error => {
            console.log(error);
            res.render('category/edit-category', {title: 'Edit Category', category: [] })
        }
    )
    //res.render('category/edit-category');
}

function deleteCategory(req, res){
    const CategoryId = req.params.category_id
    //console.log(categoryId);
    categoryService.deleteCategoryList(CategoryId).then(
        result => res.redirect('/category')
    ).catch(
        error => console.log(error)
    )
    
}

module.exports = {
    category,
    createCategory,
    editCategory,
    deleteCategory,
    uploadBannerPath
}