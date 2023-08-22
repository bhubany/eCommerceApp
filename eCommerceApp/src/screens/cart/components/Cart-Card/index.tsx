import {COLORS} from 'common/enums';
import {AlignVerticallyCenter, TextContent} from 'common/styles';
import React from 'react';
import Config from 'react-native-config';
import {DeleteIcon, EditIcon, ViewIcon} from '../../../../componennts/Icons';
import {CartCardProps} from './cartCard';
import {
  CardAction,
  CartCrdCntnr,
  CartCrdWrpr,
  CntntDetails,
  CntntWrpr,
  DescWrpr,
  IconWrapper,
  ImgWrpr,
} from './cartCardStyle';

const CartCard: React.FC<CartCardProps> = props => {
  const {product, handleView, handleEdit, handleDelete} = props;
  return (
    <>
      {product && Object.keys(product).length && (
        <CartCrdCntnr>
          <CartCrdWrpr>
            <ImgWrpr
              source={{
                uri: `${Config.BACKEND_ENDPOINT}${product.images[0].imageurl}`,
              }}
            />
            <CntntWrpr>
              <CntntDetails>
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
              </CntntDetails>
              <CardAction>
                <IconWrapper borderColor={COLORS.INFO} onPress={handleView}>
                  {ViewIcon}
                </IconWrapper>
                <IconWrapper borderColor={COLORS.SUCCESS} onPress={handleEdit}>
                  {EditIcon}
                </IconWrapper>
                <IconWrapper borderColor={COLORS.DANGER} onPress={handleDelete}>
                  {DeleteIcon}
                </IconWrapper>
              </CardAction>
            </CntntWrpr>
          </CartCrdWrpr>
        </CartCrdCntnr>
      )}
    </>
  );
};

export default CartCard;
