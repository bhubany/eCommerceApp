import React from 'react';
import {
  ProductCardContainer,
  ProductCardContentText,
  ProductCardImage,
  ProductCardImageWrapper,
  ProductCardWrapper,
} from './orderProductStyle';

import {COLORS} from 'common/enums';
import {AlignHorizontallyCenter} from 'common/styles';
import {ProductType} from 'common/types';
import Config from 'react-native-config';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface OrderProductCardProps {
  product: ProductType;
  quantity?: number | string;
  onClick?: () => void | any;
}

const OrderProductCard: React.FC<OrderProductCardProps> = props => {
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

const ActualProductCard = (props: OrderProductCardProps) => {
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
        <ProductCardContentText
          textAlign="center"
          numberOfLines={2}
          fontWeight="600">
          {name ?? 'no name'}
        </ProductCardContentText>
        <AlignHorizontallyCenter>
          <ProductCardContentText fontWeight="900" color={COLORS.RED}>
            {props?.quantity || 'NA'}
          </ProductCardContentText>
        </AlignHorizontallyCenter>
      </ProductCardWrapper>
    </ProductCardContainer>
  );
};

export default OrderProductCard;
