const express = require('express');
const router = express.Router()
router.use(express.json());
const Service = require('../service/allService');

const add_product = async(req, resp) => {
    try{
        const data = req.body;
        const res = await Service.product.add_product(data.category, data.model, data.brand, data.description, data.price, data.quantity, data.rating);
        resp.send(res);
    }catch(err){
        resp.send(err.message);
    }
}


const remove_product = async(req, resp) => {
    try{
        const productId = req.params.id;
        const res = await Service.product.remove_product(productId);
        resp.send(res);
    }catch(err){
        resp.send(err.message);
    }
}


const update_product = async(req, resp) => {
    try{
        const productId = req.params.id;
        const data = req.body;
        console.log(data.category);
        const res = await Service.product.update_product(productId, data.category, data.model, data.brand, data.description, data.price, data.quantity, data.rating);
        resp.send(res);
    }catch(err){
        resp.send(err.message);
    }
}


const revenue_report = async(req, resp) => {
    try{
        resp.send("Working Good from revenue-report");
    }catch(err){
        resp.send(err.message);
    }
}


const ar_aging_report = async(req, resp) => {
    try{
        resp.send("Working good from Ar-aging");
    }catch(err){
        resp.send(err.message);
    }
}


const search_products =async(req, resp) => {
    try{
        const keyword = req.params.keyword;
        const res = await Service.product.search_products(keyword);
        resp.send(res);
    }catch(err){
        resp.send(err.message);
    }
}


module.exports = {add_product, remove_product, update_product, revenue_report, ar_aging_report, search_products};