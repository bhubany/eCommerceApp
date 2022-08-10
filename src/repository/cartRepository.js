const con = require('../config/mysqlDb');

const read_all_cart = async() =>{
    try{
        let carts = await con.awaitQuery("SELECT * FROM carts");
        if(carts.length >0 ) return carts;
        throw new Error(`No cart Found`);
    }catch(err){
        throw err;
    }
}


const add_cart = async(cart) =>{
    try{
        let addCartRes = await con.awaitQuery(`INSERT INTO carts (id, userId, totalBill, status) VALUES (?, ?, ?, ?)`,[cart.id, cart.userId, cart.totalBill, cart.status]);
        if(addCartRes.affectedRows > 0){
            for(product of cart.products){
                let addProductRes = await con.awaitQuery(`INSERT INTO cart_products (cartId, productId, quantity) VALUES (?, ?, ?)`,[cart.id, product.productId, product.quantity]);
                if(addProductRes.affectedRows >0) return true;
            }
            throw new Error(`Error occurs adding product to cart`);
        }
        throw new Error(`Error occurs adding Cart`)
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
        return false;
    }
}

const find_cart = async(cartId) => { // find cart from id
    try{
        // let test = await con.awaitQuery(`SELECT * FROM carts WHERE id = ? UNION ALL SELECT * FROM cart_products WHERE cartId = ? `, [cartId, cartId]);
        // console.log(test);
        let cart = await con.awaitQuery(`SELECT * FROM carts WHERE id =?`,[cartId]);
        let product = await con.awaitQuery(`SELECT productId, quantity FROM cart_products WHERE cartId =?`,[cartId]);
        cart  = Object.values(JSON.parse(JSON.stringify(cart)))
        product  = Object.values(JSON.parse(JSON.stringify(product)))

        let cart2={...cart[0], products:product}
        if(cart.length > 0) return cart2;
        return false;
    }catch(err){
        throw err;
    }
}

find_cart("307a5463-b654-4be3-8538-496bfee01a10");

const update_cart = async(cartId, newCart) => {
    try{
        let updateCartRes = await con.awaitQuery(`UPDATE carts SET totalBill =? , status =? WHERE id =?`,[newCart.totalBill, newCart.status, cartId]);
        let res = false;
        if(updateCartRes.affectedRows > 0){
            for(product of newCart.products){
                let productRes = await con.awaitQuery(`SELECT * FROM cart_products WHERE cartId = ? AND productId = ? `, [cartId, product.productId]);
                if(productRes.length > 0){
                    let updateQuantityRes = await con.awaitQuery(`UPDATE cart_products SET quantity =? WHERE cartId =? AND productId = ? `,[product.quantity, cartId,  product.productId]);
                    if(updateQuantityRes.affectedRows >0) res = true;
                }else{
                    let updateProduct = await con.awaitQuery(`INSERT INTO cart_products (cartId, productId, quantity) VALUES (?, ?, ?)`,[cartId, product.productId, product.quantity]);
                    if(updateProduct.affectedRows >0) res = true;
                }
            }
            return res;
        }
        throw new Error(`Error occur Updating Cart`);
    }catch(err){
        throw err;
    }
}

const delete_cart = async(cartId) => {
    try{
        const cart = await con.awaitQuery("SELECT * FROM carts WHERE id= ?", cartId);
        if(cart.length > 0){
            const delRes = await con.awaitQuery("DELETE FROM carts WHERE id= ?", cartId);
            if(delRes.affectedRows > 0) return true;
        }
        throw new Error(`No cart found for ID: ${cartId}`);
    }catch(err){
        throw err;
    }
}

const update_cart_status = async(cartId, status) => {
    try{
        const cart = await con.awaitQuery("SELECT * FROM carts WHERE id= ?", cartId);
        if(cart.length > 0){
            const updCartRes = await con.awaitQuery("UPDATE carts SET status =? WHERE id= ?", [status, cartId]);
            if(updCartRes.affectedRows > 0) return true;
        }
        throw new Error(`No cart found for ID: ${cartId}`);
    }catch(err){
        throw err;
    }
}

module.exports ={add_cart, read_all_cart, find_cart, update_cart, delete_cart, update_cart_status}