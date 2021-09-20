const db = require('../db');

function createCategoryServices(body){
    return new Promise(async(resolve, reject) => {
        let conn;
        try {
            conn = await db.getConnection();
            const query =`INSERT INTO category(Image, ParentId, CategoryName, IsActive, CreatedAt, UpdatedAt) 
                            VALUES(?,?,?,?,NOW(), NOW())`;
            const params = [body['filename'], 0, body['categoryName'], body['isActive']];
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

function getCategoryList(body){
    return new Promise(async(resolve, reject) => {
        let conn;
        try {
            conn = await db.getConnection();
            const query =`SELECT CategoryId, ParentId, CategoryName, Image, IsActive FROM category WHERE IsDeleted=? ORDER BY CategoryName ASC 
                           `;
            const params = [0];
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

function deleteCategoryList(CategoryId){
    return new Promise(async(resolve, reject) => {
        let conn;
        try {
            conn = await db.getConnection();
            const query =`UPDATE category SET IsDeleted=? WHERE CategoryId=?`;
            const params = [1, CategoryId];
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
    createCategoryServices,
    getCategoryList,
    deleteCategoryList
}