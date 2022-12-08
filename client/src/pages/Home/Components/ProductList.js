import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../../../redux/actions/productActions";
import truck from "../../../public/images/loading-truck.gif";
import loading from "../../../public/images/loading.gif";

import {
  ProductCardsWrapper,
  ProductsCardContainer,
} from "../Styles/productListStyle";

export default function ProductList() {
  const products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();

  dispatch(fetchProducts());

  return (
    <ProductCardsWrapper>
      <ProductsCardContainer>
        {products.length === 0 ? (
          <img src={truck || loading} alt="Loading Truck" />
        ) : (
          products.map((product) => {
            return (
              <ProductCard product={product} key={product.id}></ProductCard>
            );
          })
        )}
      </ProductsCardContainer>
    </ProductCardsWrapper>
  );
}
