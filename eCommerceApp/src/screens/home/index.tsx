import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {carouselImages} from 'common/datas';
import {STATUS} from 'common/enums';
import {ProductType} from 'common/types';
import Layout from 'layout';
import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {ProductDetailParams} from 'screens/product-detail/productDetail';
import MyButton from '../../componennts/Buttons';
import ProductCard from '../../componennts/Cards/Product';
import Carousel from '../../componennts/Carousel';
import {DownloadIcon} from '../../componennts/Icons';
import Loader from '../../componennts/Loader';
import {useFetchLimitedProducts} from '../../hooks';
import {
  CarouselWrapper,
  HomeContainer,
  HomeWrapper,
  LoadMoreBtnContainer,
  ProductCardWrapper,
} from './homeStyle';

export type HomeProps = {
  productDetail: ProductDetailParams;
};
type Props = NativeStackScreenProps<HomeProps, 'productDetail'>;

export default function Home({navigation}: Props) {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loadingMoreProducts, setLoadingMoreProducts] =
    useState<boolean>(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const perPageLimit = 10;
  const {
    data: {data: actualData, next},
    message,
    hasNext,
    loadingMore,
    status,
    refetch: fetchNext,
  } = useFetchLimitedProducts({
    page: 1,
    limit: perPageLimit,
  });

  const handleProductDetail = (id: string) => {
    navigation.navigate('productDetail', {productId: id});
    navigation.canGoBack();
  };

  useEffect(() => {
    if (status === STATUS.SUCCESS) {
      setProducts(prevProducts => [
        ...prevProducts,
        ...actualData.filter(
          newProduct =>
            !prevProducts.some(
              existingProduct => existingProduct.id === newProduct.id,
            ),
        ),
      ]);
      setLoadingMoreProducts(false);
    }
  }, [actualData, status]);

  const handleLoadMore = () => {
    if (hasNext && !loadingMore) {
      setLoadingMoreProducts(true);
      const nextPage = next?.page || 2;
      fetchNext(nextPage, perPageLimit);
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      scrollViewRef.current?.scrollTo({x: 0, y: 0, animated: false});
    }
  }, [products]);

  return (
    <>
      {status === STATUS.PENDING ||
      status === STATUS.LOADING ||
      !products ||
      !products.length ||
      loadingMoreProducts ? (
        <Loader />
      ) : (
        <Layout>
          <HomeContainer>
            <HomeWrapper>
              <CarouselWrapper>
                <Carousel imageList={carouselImages} />
              </CarouselWrapper>
              <ProductCardWrapper>
                {status === STATUS.FAILED ? (
                  <View>
                    <Text>Error Occurred: {message ?? ''}</Text>
                  </View>
                ) : (
                  <>
                    {products && products.length > 0 ? (
                      products.map(product => (
                        <ProductCard
                          key={product.id}
                          onClick={() => handleProductDetail(product.id)}
                          product={product}
                        />
                      ))
                    ) : (
                      <View>
                        <Text>No products found.</Text>
                      </View>
                    )}
                  </>
                )}
              </ProductCardWrapper>
              {hasNext && (
                <LoadMoreBtnContainer>
                  <MyButton
                    title="Load More"
                    icon={DownloadIcon}
                    width="140px"
                    handleClick={() => handleLoadMore()}
                  />
                </LoadMoreBtnContainer>
              )}
            </HomeWrapper>
          </HomeContainer>
        </Layout>
      )}
    </>
  );
}
