const productModel = require('../models/productModel');
const userModel = require('../models/userModel');

function showNewProductPage(req, res) {
    const slug = req.params.slug;
    res.render('pages/newProductPage', {slug: slug, error: null})
}
async function addNewProduct(req, res){
    const {productName, productPrice, productDescription} = req.body;
    const slug = req.params.slug;
    const seller = await userModel.findUserByName(slug);
    await productModel.addProduct(productName, productPrice, productDescription, seller._id.toString());
    res.redirect('/')
}
async function deleteProduct(req, res){
    await productModel.deleteProduct(req.params.slug);
    res.redirect('/');
}
async function sortProductList(req, res) {
    const sortBy = req.body.sortBy;
    const username = req.params.slug? req.params.slug : null; 
    const products = await productModel.getAllProducts(sortBy);
    res.render('pages/index', {username: username, products})
}
async function showEditPage(req, res) {
    const slug = req.params.slug;
    const product = await productModel.getProductById(slug);
    res.render('pages/editPage', {product: product})
}
async function editProduct(req, res){
    const { productName, productPrice, productDescription } = req.body;
    const productId = req.params.slug;
    await productModel.editProduct(productId, productName, productPrice, productDescription)
    res.redirect('/');
}
module.exports = { showNewProductPage, addNewProduct, deleteProduct, sortProductList, showEditPage, editProduct};