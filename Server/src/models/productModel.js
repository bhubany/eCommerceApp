const { v4: uuidv4 } = require("uuid");
const Validate = require("../utils/validations");

const Product = ({
  category,
  model,
  brand,
  name,
  description,
  price,
  quantity,
  images,
}) => {
  const { error, value } = Validate.product_validation({
    category,
    model,
    brand,
    name,
    description,
    price,
    quantity,
  });
  if (error) throw error;
  return {
    id: uuidv4(),
    category: value.category,
    model: value.model,
    brand: value.brand,
    name: value.name,
    description: value.description,
    price: value.price,
    quantity: value.quantity,
    images: images,
  };
};

module.exports = { Product };
