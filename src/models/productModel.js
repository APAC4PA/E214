const { ObjectId } = require('mongodb');
const { getDB } = require('../data/connection');
const userModel = require('../models/userModel');
var products;
async function addProduct(productName, productPrice, productDescription, seller){
    const db = getDB();
    await db.collection('products')
    .insertOne({seller, productName, productPrice, productDescription, createdAt: new Date()})
}
async function getAllProducts(sortBy){
    const db = getDB();
    products = await db.collection('products')
    .find().toArray();
    for (const product of products) {
        const user = await userModel.findUserById(product.seller);
        product.seller = user.username;
        product.location = user.location;
    }
    products.sort((a, b) => (String(a[sortBy])).localeCompare(String(b[sortBy])));
    return products;
}
async function deleteProduct(id) {
    const db = getDB();
    await db.collection('products').deleteOne({_id: new ObjectId(id)});    
} 
async function getUserProducts(username){
    const userProducts = products.filter(obj => obj.seller == username)
    return userProducts;
}
async function getProductById(id){
    const editingProduct = products.find(p => p._id.equals(new ObjectId(id)));
    return editingProduct;
}
async function editProduct(id, newName, newPrice, newDescription) {
    const db = getDB();
    await db.collection('products').updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            productName: newName,
            productPrice: newPrice,
            productDescription: newDescription
          }
        }
    )
}
module.exports = { addProduct, getAllProducts, deleteProduct, getUserProducts, getProductById, editProduct};