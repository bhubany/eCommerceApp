const Store = require('../repository/dbRepository');
const Validate = require('../utils/validations');
const Schema = require('../models/orderModel');
const AddressSchema = require('../models/addressModule');


/* Place order
@params
    1) cartId: "cartId where products are placed",
    2) Shipping_address: "Address of customer", addressObject
    3) payments: "Payments Details", paymentObject
@returns
    @if(placed order sucessfully)
        return order_details
    @else
        return error
*/

const place_order = (cartId, shipping_address, payments) =>{
    try{

        const cart = Store.cart.find_cart(cartId);
        if(! cart){
            throw new Error(`No cart found for Id: ${cartId}`);
        }
        const shipment = {type: "active", status: "reviewing"};
        const address = AddressSchema.Address(value);
        const order = Schema.Order(cart, address, payments, shipment);

        for (product of cart.products){
            if(!Store.product.decrease_quantity(product.productId, product.quantity)){
                throw new Error(`Error occurs updating remaining product`);
            }
        }
        if(!Store.order.place_order(order)){
            throw new Error(`Error Occurs while Placing Order`);
        }
        
        if(!Store.cart.delete_cart(cartId)){
            throw new Error(`Error Occurs Removing cart`);
        }

        console.log(`Your order has been placed with order Id : ${order.id}`);
    }catch (err){
        console.log(`${err.name} => ${err.message}`)
    }
}

const shipping_address = {
    "country": "Nepal",
    "province": "3",
    "city": "abc",
    "ward": 23,
    "tole": "xyz",
    "house_no": 12
    }
const payment ={"type": "cash", "status": "onDelivery"}
// place_order("60eeaa21-39d9-4025-80ed-5da261dc0576", shipping_address, payment);

const update_quantity_order = (orderID, product, action) =>{
    try{
        const order = Store.order.read_order_from_id(orderID);
        if(!order){
            throw new Error(`No Order Found For Id: ${orderID}`)
        }
        const product_res = Store.product.find_product(product.productId);
        if(!product_res){
            throw new Error(`No Product found for Id: ${product.productId}`);
        }

        switch (action) {
            case action = "add":
                if(product.quantity <= product_res.quantity){
                    for(var oldProduct of order.products){
                        if(oldProduct.productId === product.productId){
                            oldProduct.quantity += product.quantity;
                            order.total_bill += product.quantity*product_res.price;
                            if(!Store.product.decrease_quantity(product.productId, product.quantity)){
                                throw new Error(`Error occurs updating remaining product`);
                            }
                            if(Store.order.update_order(orderID, order)){
                                console.log("Quantity in order has been added sucessfully");
                                return;
                            }
                            throw new Error(`Error Occurs while Placing Order`);
                        }
                    }
                    throw new Error(`No product found for ID: ${product.productId} on order  ID: ${orderID}`)
                }
                throw new Error(`Entered number of quantity is not sufficient in store`);

            case action = "remove":
                    for(var oldProduct of order.products){
                        if(oldProduct.productId === product.productId && product.quantity <= oldProduct.quantity){
                            oldProduct.quantity -= product.quantity;
                            order.total_bill -= product.quantity*product_res.price;
                            if(!Store.product.increase_quantity(product.productId, product.quantity)){
                                throw new Error(`Error occurs updating remaining product`);
                            }
                            if(Store.order.update_order(orderID, order)){
                                console.log("Quantity from order has been decreased sucessfully");
                                return;
                            }
                            throw new Error(`Error Occurs while Placing Order`);
                        }
                    }
                    throw new Error(`No product found for ID: ${product.productId} on order  ID: ${orderID}`)        
        }
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}
// update_quantity_order("08ecc7a8-ea33-4e5e-bda2-fd788b3bab8e", {productId: "eb83b188-a9a6-4035-bd61-f44689128529", "quantity": 5}, "add")


/* Update Address
@params
    1) orderId : Unique Id of order,
    2) new_address: object containing new address, addressObject
@returns
    @if(sucessfully update)
        returns updated address
    @else
        return error
*/
const update_address = (orderID ,new_address) => {
    try{
        const order = Store.order.read_order_from_id(orderID);
        if(!order){
            throw new Error(`No Order Found For Id: ${orderID}`)
        }
        const {error, value} = Validate.Updatable_address_validation({new_address});
        if(error) throw error;
        const address = value;
        for(key in address){
            if((address[key]).length !== 0){               
                order.shipping_address[key] = address[key];
            }
        }
        if(Store.order.update_order(orderID, order)){
            console.log("Address Updated Sucessfully");
            return
        }
        throw new Error(`Error occurs updating address. Try again later.`);     

    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}

const new_address = {
    "country": "Nepal",
    "province": 2,
    "city": "Lalitpur",
    "ward": "23",
    "tole": "Dhapakhel",
    "house_no": 42
    }
// update_address("08ecc7a8-ea33-4e5e-bda2-fd788b3bab8e", new_address);

/* Update Payment 
@params
    1) orderID: Unique Id,
    2) new_payment: Object containing payment details, paymentObject
@returns
    @if(Sucessful updated)
        return sucess_message
    @else
        return error
*/
const update_payment = (orderID, new_payment) => {
    try{
        const order = Store.order.read_order_from_id(orderID);
        if(!order){
            throw new Error(`No Order Found For Id: ${orderID}`)
        }
        const payment = new_payment // will come from payment schema
        
        for(key in payment){
            if((payment[key]).length !== 0){               
                order.payment[key] = payment[key];
            }
        }
        if(Store.order.update_order(orderID, order)){
            console.log("Payment Updated Sucessfully");
            return
        }
        throw new Error(`Error occurs updating Payment. Try again later.`);     

    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}

// update_payment("08ecc7a8-ea33-4e5e-bda2-fd788b3bab8e",{"type": "Connect-IPS", "status": "paid"})

/* track Order 
@params
    1) orderID: "Unique Id"
@returns
    @if(order found)
        return status
    @else
        return error
*/
const track_order = (orderID) => {
    try{
        const order = Store.order.read_order_from_id(orderID);
        if(!order){
            throw new Error(`No Order Found For Id: ${orderID}`)
        }
        console.log(`Type: ${order.shipment.type}, Status : ${order.shipment.status}`);
        return order.shipment;

    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}

// track_order("08ecc7a8-ea33-4e5e-bda2-fd788b3bab8e");
/* Cancel Order  
@param
    1) orderID: "Unique ID"
@returns
    @if(order cancelled sucessfully)
        return status
    @else
        return error
*/

const cancel_order = (orderID) => {
    try{
        const order = Store.order.read_order_from_id(orderID);
        if(!order){
            throw new Error(`No Order Found For Id: ${orderID}`)
        }
        if(order.shipment.type === "cancelled"){
            throw new Error(`Already Placed for cancelled. Id: ${orderID}`);
        }
        for(product of order.products){
            if(!Store.product.increase_quantity(product.productId, product.quantity)){
                throw new Error(`Error occurs adding cancelled product in store`);
            }
        }
        order.shipment= {type: "cancelled", status: "placed for cancelling"};
        order.payment = {type: "refund", status: "Placed for refund"}

        if(Store.order.update_order(orderID, order)){
            console.log("Order has been placed for cancellation");
            return;
        }
        throw new Error(`Error Occurs while cancelling Order`);
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}

// cancel_order("08ecc7a8-ea33-4e5e-bda2-fd788b3bab8e");

/* return replace Order  
@param
    1) orderID : "Unique ID"
    2) action  : either replace or return
@returns
    @if(order replace/return sucessfully)
        return status
    @else
        return error
*/
const return_replace_order = (orderID, action) =>{
    try{
        const order = Store.order.read_order_from_id(orderID);
        if(!order){
            throw new Error(`No Order Found For Id: ${orderID}`)
        }
        if(order.shipment.type === "cancelled"){
            throw new Error(`Order is already Placed for cancellation. Id: ${orderID}`);
        }
        if(order.shipment.type === "return"){
            throw new Error(`Already Placed for return. Id: ${orderID}`);
        }

        if(action === "return"){
            for(product of order.products){
                if(!Store.product.increase_quantity(product.productId, product.quantity)){
                    throw new Error(`Error Occurs updating returned Product quantity in store. Try again later`);
                }
            }
        }
        order.shipment = {type: action, status: `placed for ${action}`};

        if(Store.order.update_order(orderID, order)){
            console.log(`Your order has been placed for ${action} Sucessfully`);
            return;
        }
        throw new Error(`Error occurs while ${action}. Try again later.`)

    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}

// return_replace_order("08ecc7a8-ea33-4e5e-bda2-fd788b3bab8e", "return");
/* Track refund updates 
@params
    1) orderID: "Unique ID"
@returns
    @if(order found)
        return refund status
    @else
        return error
*/
const refund_updates = (orderId) =>{
    try{
        const order = Store.order.read_order_from_id(orderId);
        if(!order){
            throw new Error(`No Order Found For Id: ${orderId}`)
        }
        if(order.payment.type === "refund"){
            console.log(`Type: ${order.payment.type}, Status : ${order.payment.status}`);
            return order.payment;
        }
        throw new Error(`No refund order found for ID:  "${orderId}"`);

    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}

// refund_updates("08ecc7a8-ea33-4e5e-bda2-fd788b3bab8e")

/* Management: Send shipment updates
@params
    1) orderId: "Unique order Id"
@returns
    @if(order found)
        return order status 
    @else
        return error
*/
const send_shipment_updates = (orderId) => {
    try{
        const order = Store.order.read_order_from_id(orderId);
        if(!order){
            throw new Error(`No Order Found For Id: ${orderId}`)
        }
        console.log(`Type: ${order.shipment.type}, Status : ${order.shipment.status}`);
        return order.shipment;

    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}

// send_shipment_updates("08ecc7a8-ea33-4e5e-bda2-fd788b3bab8e");

/* Management: Send return updates
@params
    1) orderId: "Unique order id"
@returns
    @if(order found)
        return order status
    @else
        return Error
*/
const send_return_updates = (orderId) => {
    try{
        const order = Store.order.read_order_from_id(orderId);
        if(!order){
            throw new Error(`No Order Found For Id: ${orderId}`)
        }
        if(order.shipment.type === "return"){
            console.log(`Type: ${order.shipment.type}, Status : ${order.shipment.status}`);
            return order.shipment;
        }
        throw new Error(`No return order found for ID:  "${orderId}"`);
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}

// send_return_updates("08ecc7a8-ea33-4e5e-bda2-fd788b3bab8e");

/* Management: Send Payment updates
@params
    1) orderId: "Unique order Id"
@returns
    @if(order found)
        return payment status
    @else
        return Error
    */
const send_payment_updates = (orderId) => {
    try{
        const order = Store.order.read_order_from_id(orderId);
        if(!order){
            throw new Error(`No Order Found For Id: ${orderId}`)
        }
        console.log(`Type: ${order.payment.type}, Status : ${order.payment.status}`);
        return order.payment;
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
}



// send_payment_updates("08ecc7a8-ea33-4e5e-bda2-fd788b3bab8e");




module.exports = {place_order, update_quantity_order, update_address, update_payment, track_order, cancel_order, return_replace_order, refund_updates, send_shipment_updates, send_return_updates, send_payment_updates}