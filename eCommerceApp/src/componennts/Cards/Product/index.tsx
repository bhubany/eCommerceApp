import React from 'react';
import {
  ProductCardContainer,
  ProductCardContentText,
  ProductCardContentWrapper,
  ProductCardImage,
  ProductCardImageWrapper,
  ProductCardWrapper,
} from './productStyle';

import {COLORS} from 'common/enums';
import {AlignHorizontallyCenter} from 'common/styles';
import {ProductType} from 'common/types';
import Config from 'react-native-config';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface ProductCardProps {
  product: ProductType;
  onClick?: () => void | any;
}

const ProductCard = (props: ProductCardProps) => {
  const isClickable = typeof props.onClick === 'function';

  const handlePress = () => {
    if (isClickable && props.onClick) {
      props.onClick();
    }
  };
  return (
    <>
      {isClickable ? (
        <TouchableOpacity onPress={() => handlePress()}>
          <ActualProductCard {...props} />
        </TouchableOpacity>
      ) : (
        <ActualProductCard {...props} />
      )}
    </>
  );
};

const ActualProductCard = (props: ProductCardProps) => {
  const {name, images, price} = props.product;
  return (
    <ProductCardContainer>
      <ProductCardWrapper>
        <ProductCardImageWrapper>
          <ProductCardImage
            source={{
              uri: `${Config.BACKEND_ENDPOINT}${images[0].imageurl}`,
            }}
          />
        </ProductCardImageWrapper>
        <ProductCardContentWrapper>
          <ProductCardContentText
            textAlign="center"
            numberOfLines={2}
            fontWeight="600">
            {name ?? 'no name'}
          </ProductCardContentText>
          <AlignHorizontallyCenter>
            <ProductCardContentText
              textDecoration="line-through"
              color={COLORS.CORAL}>{`Rs.${Math.round(
              price * 1.5,
            )}`}</ProductCardContentText>
            <ProductCardContentText
              color={COLORS.ERROR}>{`Rs.${price}`}</ProductCardContentText>
          </AlignHorizontallyCenter>
        </ProductCardContentWrapper>
      </ProductCardWrapper>
    </ProductCardContainer>
  );
};

export default ProductCard;
