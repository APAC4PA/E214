const userModel = require('../models/userModel');
const productModel = require('../models/productModel');
const bcrypt = require('bcrypt');
var lastUsedUsername = null;
const regex  =/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
async function showMainPage(req, res) {
    const products = await productModel.getAllProducts();
    res.render('pages/index', {username: lastUsedUsername, products})
}
function showUserPage(req, res) {
    res.render('pages/userPage')
}
function showLoginPage(req, res) {
    res.render('pages/loginPage')
}
async function addUser(req, res){
    const { username, pass, location } = req.body;
    if(await userModel.findUserByName(username))
    {
        return res.render("pages/errorPage", {
            error: "Taki użytkownik już istnieje"
        })
    }
    else if(!regex.test(pass)){
        return res.render("pages/errorPage", {
            error: "Hasło powinno zawierać przynajmniej jeden numer i jeden znak specjalny"
        })
    }
    await userModel.addUser(username, pass, location);
    res.redirect('/');
}
async function loginUser(req, res){
    const user = await userModel.findUserByName(req.body.username)
    const products = await productModel.getAllProducts();
    if(user && await bcrypt.compare(req.body.pass, user.password))
        {
        lastUsedUsername = user.username;
        return res.render('pages/index', {username: lastUsedUsername, products});
        }
    else{
        return res.render('pages/errorPage', {
            error: 'Taki użytkownik nie istnieje'
        });
    }
}
async function showUserProducts(req, res) {
    const products = await productModel.getUserProducts(req.params.slug);
    res.render('pages/userProductPage', {username: lastUsedUsername, products});
}
function logoutUser(req,res){
    lastUsedUsername = null;
    res.redirect('/');
}
async function showBuyPage(req, res) {
    res.render('pages/buyProductPage', {slug: req.params.slug})
}
async function buyProduct(req, res){
    const { adress, cardNumber, cvv, billingAdress } = req.body;
    await userModel.buyProduct(req.params.slug, lastUsedUsername, adress, cardNumber, cvv, billingAdress);
    await productModel.deleteProduct(req.params.slug);
    res.redirect('/');
}
module.exports = { showUserPage, addUser, showMainPage, showLoginPage, loginUser, logoutUser, showUserProducts, showBuyPage, buyProduct};