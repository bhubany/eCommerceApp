import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {STATUS} from 'common/enums';
import Layout from 'layout';
import React, {useState} from 'react';
import {ProductDetailParams} from 'screens/product-detail/productDetail';
import MyButton from '../../componennts/Buttons';
import ProductCard from '../../componennts/Cards/Product';
import {SearchIcon} from '../../componennts/Icons';
import Loader from '../../componennts/Loader';
import {useSearchProducts} from '../../hooks';
import {
  InputWrapper,
  NoProductFoundTextWrapper,
  NoProductFoundWrapper,
  ProductCardWrapper,
  ProductLoaderWrapper,
  SearchProductContainer,
  SearchProductFormWrapper,
} from './searchProductStyle';

type ParamList = {
  productDetail: ProductDetailParams;
};

type Props = NativeStackScreenProps<ParamList, 'productDetail'>;

const SearchProducts: React.FC<Props> = ({navigation}) => {
  const [keyword, setKeyword] = useState<string>('');
  const {data, message, status, fetch} = useSearchProducts();
  const handleSearch = () => {
    if (keyword && keyword.length) {
      fetch(keyword);
    }
  };

  const handleViewProduct = (id: string) => {
    navigation.navigate('productDetail', {
      productId: id,
      fromScreen: 'searchProducts',
    });
  };

  return (
    <Layout>
      <SearchProductContainer>
        <SearchProductFormWrapper>
          <InputWrapper
            value={keyword}
            placeholder="Enter keyword"
            onChangeText={inp => setKeyword(inp)}
          />
          <MyButton
            icon={SearchIcon}
            title="Search"
            height="34px"
            handleClick={handleSearch}
          />
        </SearchProductFormWrapper>
        {status === STATUS.LOADING ? (
          <ProductLoaderWrapper>
            <Loader />
          </ProductLoaderWrapper>
        ) : status === STATUS.SUCCESS ? (
          <ProductCardWrapper>
            {data &&
              data.length &&
              data.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => handleViewProduct(product.id)}
                />
              ))}
          </ProductCardWrapper>
        ) : status === STATUS.FAILED ? (
          <NoProductFoundWrapper>
            <NoProductFoundTextWrapper> {message}</NoProductFoundTextWrapper>
          </NoProductFoundWrapper>
        ) : null}
      </SearchProductContainer>
    </Layout>
  );
};

export default SearchProducts;
