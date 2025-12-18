const { ObjectId } = require('mongodb');
const { getDB } = require('../data/connection');
const bcrypt = require('bcrypt');

async function addUser(username, pass, location){
    const db = getDB();
    const cryptedPassword = await bcrypt.hash(pass, 10);
    await db.collection('users')
    .insertOne({ username, password: cryptedPassword, location, createdAt: new Date()})
}
async function findUserByName(username){
    const db = getDB();
    return await db.collection('users').findOne({username})
}
async function findUserById(id){
    const db = getDB();
    return await db.collection('users').findOne({_id: new ObjectId(id)})
}
async function buyProduct(productId, buyer, adress, cardNumbers, cvv, billingAdress){

    const db = getDB();
    const cryptedCN = await bcrypt.hash(cardNumbers, 10);
    const cryptedCvv = await bcrypt.hash(cvv, 10);
    await db.collection('purchasedProducts')
    .insertOne({ buyer: buyer, adress, cryptedCN, cryptedCvv, billingAdress, productId})
}
module.exports = { addUser, findUserByName, findUserById, buyProduct};