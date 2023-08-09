import {COLORS, STATUS} from 'common/enums';
import {infoToast} from 'common/utils';
import Layout from 'layout';
import React, {useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyButton from '../../componennts/Buttons';
import ProductCard from '../../componennts/Cards/Product';
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

const SearchIcon = () => (
  <MaterialIcons name="search" color={COLORS.WHITE} size={20} />
);

const SearchProducts = () => {
  const [keyword, setKeyword] = useState<string>('');
  const {data, message, status, fetch} = useSearchProducts();
  const handleSearch = () => {
    if (keyword && keyword.length) {
      fetch(keyword);
    }
  };
  //TODO: Navoigate to product detail page on click
  const handleViewProduct = (id: string) => {
    infoToast('Product View for Id', id);
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
            icon={<SearchIcon />}
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
