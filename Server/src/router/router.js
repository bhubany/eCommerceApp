const router = require("express").Router();
const api = require("../api/api");

router.get("/", async (req, resp) => {
  resp.send("Hello!, This is from cart API.");
});

// for user
router.post("/user/register", api.user.user_register);
router.post("/user/login", api.user.user_login);

// for product
router.get("/product/getAll", api.product.get_all_product);
router.get("/product/getone/:productId", api.product.get_product_by_id);
router.post("/product/add", api.product.add_product);
router.delete("/product/remove", api.product.remove_product);
router.put("/product/update", api.product.update_product);
router.get("/product/revenueReport", api.product.revenue_report);
router.get("/product/arAgingReport", api.product.ar_aging_report);
router.get("/product/search/:keyword", api.product.search_products);

// for cart
router.get("/cart/getCart/", api.cart.get_user_cart);
router.post("/cart/addProductToCart", api.cart.add_product_to_cart);
router.put("/cart/updateQuantityInCart", api.cart.update_quantity_in_cart);

// for order
router.post("/order/placeOrder", api.order.place_order);
router.put("/order/updateQuantityInOrder", api.order.update_quantity_order);
router.put("/order/updateAddress", api.order.update_address);
router.put("/order/updatePayment", api.order.update_payment);
router.get("/order/trackOrder", api.order.track_order);
router.put("/order/cancelOrder", api.order.cancel_order);
router.put("/order/returnReplaceOrder", api.order.return_replace_order);
router.get("/order/refundUpdates", api.order.refund_updates);
router.get("/order/shipmentUpdates", api.order.send_payment_updates);
router.get("/order/returnUpdates", api.order.send_return_updates);
router.get("/order/paymentupdates", api.order.send_payment_updates);

// for countries, states, districts
router.get("/countries/getAll", api.extra.read_all_countries);
router.get("/states/getAll", api.extra.read_all_states);
router.get("/districts/getAll", api.extra.read_all_districts);
router.get("/country/states/getAll", api.extra.read_states_by_country_id);
router.get("/state/districts/getAll", api.extra.read_districts_by_state_id);

module.exports = router;