import {COLORS} from 'common/enums';
import {AlignVerticallyCenter, TextContent} from 'common/styles';
import React from 'react';
import Config from 'react-native-config';
import {CartCardProps} from './cartCard';
import {
  CartCrdCntnr,
  CartCrdWrpr,
  CntntWrpr,
  DescWrpr,
  ImgWrpr,
} from './cartCardStyle';

const CartCard: React.FC<CartCardProps> = props => {
  const {product, onClick} = props;
  return (
    <>
      {product && Object.keys(product).length && (
        <CartCrdCntnr disabled={!onClick} onPress={onClick}>
          <CartCrdWrpr>
            <ImgWrpr
              source={{
                uri: `${Config.BACKEND_ENDPOINT}${product.images[0].imageurl}`,
              }}
            />
            <CntntWrpr>
              <AlignVerticallyCenter>
                <TextContent fontWeight="800" fontSize="18px">
                  {product.name}
                </TextContent>
                <DescWrpr>
                  <TextContent numberOfLines={2} color={COLORS.GREY}>
                    {product.description}
                  </TextContent>
                </DescWrpr>
              </AlignVerticallyCenter>
              <AlignVerticallyCenter>
                <TextContent
                  fontWeight="800"
                  fontSize="14px"
                  color={COLORS.CORAL}>{`Rs.: ${product.price}`}</TextContent>
                <TextContent color={COLORS.INFO}>
                  {`Qty: ${product.quantity}`}
                </TextContent>
              </AlignVerticallyCenter>
            </CntntWrpr>
          </CartCrdWrpr>
        </CartCrdCntnr>
      )}
    </>
  );
};

export default CartCard;
