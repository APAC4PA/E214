const express = require('express');

const router = express.Router();

const userControllers = require('../controllers/userController');
const productControllers = require('../controllers/productController');

router.get('/', userControllers.showMainPage);
router.get('/register', userControllers.showUserPage);
router.post('/register', userControllers.addUser);
router.get('/login', userControllers.showLoginPage);
router.post('/login', userControllers.loginUser);
router.get('/logout', userControllers.logoutUser);
router.get('/buy/:slug', userControllers.showBuyPage);
router.post('/buy/:slug', userControllers.buyProduct);
router.post('/editProduct/:slug', productControllers.editProduct)
router.get('/editProduct/:slug', productControllers.showEditPage)
router.get('/userProducts/:slug', userControllers.showUserProducts);
router.post('/sort/:slug', productControllers.sortProductList);
router.post('/delete/:slug', productControllers.deleteProduct);
router.get('/newProduct/:slug', productControllers.showNewProductPage);
router.post('/newProduct/:slug', productControllers.addNewProduct);

module.exports = router;