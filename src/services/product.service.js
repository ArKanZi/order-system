const db = require('../db');

function createProductServices(body){
    return new Promise(async(resolve, reject) => {
        let conn;
        try {
            conn = await db.getConnection();
            const query =`INSERT INTO Product(Image, CategoryId, ProductName, ProductPrice, ProductQuantity, IsActive, CreatedAt, UpdatedAt) 
                            VALUES(?,?,?,?,?,?,NOW(), NOW())`;
            const params = [body['filename'], body['ProductCategory'], body['ProductName'], body['ProductPrice'], body['ProductQuantity'], body['IsActive']];
            const result = await conn.query(query, params);
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        } finally{
            conn.end();
        }
    });
}

function getProductList(body){
    return new Promise(async(resolve, reject) => {
        let conn;
        try {
            conn = await db.getConnection();
            const query =`SELECT ProductId, ProductName, product.Image, ProductPrice, ProductQuantity, product.IsActive, product.CategoryId, category.categoryId, category.CategoryName 
                          FROM Product, category WHERE product.IsDeleted=? AND category.CategoryId = product.CategoryId
                          ORDER BY ProductName ASC;SELECT CategoryId, CategoryName FROM category WHERE IsDeleted=?`;
            const params = [0,0];
            const result = await conn.query(query, params);
            
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        } finally{
            conn.end();
        }
    });
} 

module.exports = {
    createProductServices,
    getProductList
}