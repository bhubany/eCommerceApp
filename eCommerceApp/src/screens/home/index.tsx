import {carouselImages} from 'common/datas';
import {ProductType} from 'common/types';
import {infoToast} from 'common/utils';
import Layout from 'layout';
import React from 'react';
import ProductCard from '../../componennts/Cards/Product';
import Carousel from '../../componennts/Carousel';
import {
  CarouselWrapper,
  HomeContainer,
  HomeWrapper,
  ProductCardWrapper,
} from './homeStyle';

const products: ProductType[] = []; //TODO: fetch actual products

export default function Home() {
  const handleProductDetail = (id: string) => {
    infoToast(`Clicked for ID: ${id}`);
  };

  return (
    <Layout>
      <HomeContainer>
        <HomeWrapper>
          <CarouselWrapper>
            <Carousel imageList={carouselImages} />
          </CarouselWrapper>
          <ProductCardWrapper>
            {products && products.length
              ? products.map(product => (
                  <ProductCard
                    key={product.id}
                    onClick={() => handleProductDetail(product.id)}
                    product={product}
                  />
                ))
              : null}
          </ProductCardWrapper>
        </HomeWrapper>
      </HomeContainer>
    </Layout>
  );
}
