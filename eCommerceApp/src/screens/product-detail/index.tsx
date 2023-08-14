import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {COLORS, QUANTITY, STATUS} from 'common/enums';
import {
  CART_QTY_CANNOT_BE_LESS_THAN_ONE,
  INVALID_QUANTITY,
  LOGIN_FIRST,
  OUT_OF_STOCK,
  QUANTITY_CANNOT_BE_GREATER_THAN_AVAILABLE,
} from 'common/messages/info.message';
import {
  AlignHorizontallyCenter,
  AlignHorizontallySpaceBtn,
  TextContent,
} from 'common/styles';
import {AddToCartResp, CartDetails, UserDetails} from 'common/types';
import {errorToast, infoToast, successToast} from 'common/utils';
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, TouchableOpacity} from 'react-native';
import Config from 'react-native-config';
import {useDispatch, useSelector} from 'react-redux';
import {ProductDetailParams} from 'screens/home';
import {RootState} from 'store';
import {addToCart, userCart} from 'store/actions/cartAction';
import {cleanAddToCartStatus} from 'store/reducers/cartSlice';
import {addToCartState, cartState, loginState} from 'store/selectors';
import MyButton from '../../componennts/Buttons';
import {
  AddIcon,
  AddToCartIcon,
  InventoryIcon,
  NextIcon,
  PreviousIcon,
  ShoppingCartIcon,
  SubtractIcon,
} from '../../componennts/Icons';
import Loader from '../../componennts/Loader';
import NavHeader from '../../componennts/Nav-Header';
import {useFetchProductByID} from '../../hooks';
import {
  ContentWrapper,
  FooterWrapper,
  ImageContainer,
  ImageWrapper,
  LoaderWrapper,
  MyCartLabelWrapper,
  MyCartWrapper,
  NextBtnWrapper,
  PreviousBtnWrapper,
  ProductDetContainer,
  ProductDetailContainer,
  ProductDetailWrapper,
  QuantityBtnWrapper,
  QuantityInput,
  QuantityWrapper,
} from './productDetailStyle';

type ProductDetailScreenRouteProp = RouteProp<any, 'ProductDetail'>;
type ProductDetailScreenNavigationProp = StackNavigationProp<
  any,
  'ProductDetail'
>;

type Props = {
  route: ProductDetailScreenRouteProp;
  navigation: ProductDetailScreenNavigationProp;
};

const ProductDetail = (props: Props) => {
  const {navigation, route} = props;
  const {products}: CartDetails = useSelector(cartState);
  const {id: userId, isLogined}: UserDetails = useSelector(loginState);
  const addToCartResp: AddToCartResp = useSelector(addToCartState);
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const {productId} = route.params as ProductDetailParams;
  const {data: product, fetch, message, status} = useFetchProductByID();
  const [target, setTarget] = useState<number>(1);
  const [quantity, setQuantity] = useState<string>('1');
  let index = 0;

  const handleNext = () => {
    if (target < index) {
      setTarget(target + 1);
    }
  };

  const handlePrevious = () => {
    if (target > 1) {
      setTarget(target - 1);
    }
  };

  const handleNavigateBack = () => {
    navigation.goBack();
  };

  const handleAddToCart = () => {
    if (!isLogined) {
      infoToast(LOGIN_FIRST);
      navigation.navigate('signin');
    } else {
      if (parseInt(quantity, 10) < 1) {
        errorToast(`Invalid product quantity: ${quantity}`);
      } else {
        dispatch(
          addToCart({
            userId: userId as string,
            quantity: parseInt(quantity, 10),
            productId: productId as string,
          }),
        );
      }
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigation.navigate('cart');
  };

  const handleMyCart = () => navigation.navigate('cart');

  const handleQuantity = (action: QUANTITY, avQuantity: number) => {
    const qty = parseInt(quantity, 10);
    switch (action) {
      case QUANTITY.INCREASE:
        if (qty < avQuantity) {
          setQuantity(`${qty + 1}`);
        } else {
          errorToast(QUANTITY_CANNOT_BE_GREATER_THAN_AVAILABLE);
        }
        break;

      case QUANTITY.DECREASE:
        if (qty > 1) {
          setQuantity(`${qty - 1}`);
        } else {
          errorToast(CART_QTY_CANNOT_BE_LESS_THAN_ONE);
        }
        break;

      default:
        errorToast(INVALID_QUANTITY);
        break;
    }
  };

  useEffect(() => {
    if (productId) {
      fetch(productId);
    }

    if (userId) {
      dispatch(userCart({id: userId}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (addToCartResp.status === STATUS.SUCCESS) {
      successToast(addToCartResp.message);
      dispatch(cleanAddToCartStatus());
      dispatch(userCart({id: userId as string}));
    } else if (addToCartResp.status === STATUS.FAILED) {
      errorToast(addToCartResp.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addToCartResp, dispatch]);

  return (
    <ProductDetContainer>
      <NavHeader
        title="Product Detail"
        handleClick={() => handleNavigateBack()}
      />

      {status === STATUS.LOADING ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : status === STATUS.SUCCESS && product ? (
        <ContentWrapper>
          <ImageContainer>
            {product.images &&
              product.images.length &&
              product.images.map(image => {
                index++;
                return (
                  <ImageWrapper key={image.id} show={target === index}>
                    <Image
                      source={{
                        uri: `${Config.BACKEND_ENDPOINT}${image.imageurl}`,
                        height: 250,
                        width: 450,
                      }}
                    />
                  </ImageWrapper>
                );
              })}
            <NextBtnWrapper>
              <TouchableOpacity
                style={{opacity: target === index ? 0.5 : 1}}
                disabled={target === index}
                onPress={() => handleNext()}>
                {NextIcon}
              </TouchableOpacity>
            </NextBtnWrapper>
            <PreviousBtnWrapper>
              <TouchableOpacity
                style={{opacity: target === 1 ? 0.5 : 1}}
                disabled={target === 1}
                onPress={() => handlePrevious()}>
                {PreviousIcon}
              </TouchableOpacity>
            </PreviousBtnWrapper>
          </ImageContainer>
          <QuantityWrapper>
            <QuantityBtnWrapper
              disabled={product.quantity < 1}
              onPress={() =>
                handleQuantity(QUANTITY.DECREASE, product.quantity)
              }>
              {SubtractIcon}
            </QuantityBtnWrapper>
            <QuantityInput
              value={quantity}
              onChangeText={val => setQuantity(val)}
              keyboardType="number-pad"
            />
            <QuantityBtnWrapper
              disabled={product.quantity < 1}
              onPress={() =>
                handleQuantity(QUANTITY.INCREASE, product.quantity)
              }
              color={COLORS.SUCCESS}>
              {AddIcon}
            </QuantityBtnWrapper>
          </QuantityWrapper>
          <AlignHorizontallyCenter>
            {product.quantity < 1 ? (
              <TextContent color={COLORS.ERROR}>{OUT_OF_STOCK}</TextContent>
            ) : null}
          </AlignHorizontallyCenter>
          <ProductDetailContainer>
            <ScrollView showsVerticalScrollIndicator={false}>
              <ProductDetailWrapper>
                <AlignHorizontallyCenter>
                  <TextContent
                    fontWeight="900"
                    fontSize="20px"
                    color={COLORS.INVERSE}>
                    {product.name ?? 'NA'}
                  </TextContent>
                </AlignHorizontallyCenter>
                <AlignHorizontallySpaceBtn>
                  <TextContent>{'Brand :'}</TextContent>
                  <TextContent fontWeight="900" color={COLORS.CORAL}>
                    {product.brand}
                  </TextContent>
                </AlignHorizontallySpaceBtn>
                <AlignHorizontallySpaceBtn>
                  <TextContent>{'Category :'}</TextContent>
                  <TextContent>{product.category}</TextContent>
                </AlignHorizontallySpaceBtn>
                <AlignHorizontallySpaceBtn>
                  <TextContent>{'Model :'}</TextContent>
                  <TextContent>{product.model}</TextContent>
                </AlignHorizontallySpaceBtn>
                <AlignHorizontallySpaceBtn>
                  <TextContent>{'Price :'}</TextContent>
                  <TextContent>{product.price}</TextContent>
                </AlignHorizontallySpaceBtn>

                <AlignHorizontallySpaceBtn>
                  <TextContent>{'Available quantity :'}</TextContent>
                  <TextContent color={product.quantity > 1 ? '' : COLORS.ERROR}>
                    {product.quantity > 1 ? product.quantity : OUT_OF_STOCK}
                  </TextContent>
                </AlignHorizontallySpaceBtn>

                <AlignHorizontallyCenter>
                  <TextContent fontSize="20px">
                    {'More Description :'}
                  </TextContent>
                </AlignHorizontallyCenter>
                <TextContent textAlign="center">
                  {product.description}
                </TextContent>
              </ProductDetailWrapper>
            </ScrollView>
          </ProductDetailContainer>
          <FooterWrapper>
            <MyButton
              disabled={product.quantity < 1}
              handleClick={() => handleAddToCart()}
              width="120px"
              title="Add to Cart"
              icon={AddToCartIcon}
            />
            <TouchableOpacity onPress={handleMyCart}>
              {isLogined ? (
                <MyCartWrapper>
                  {ShoppingCartIcon}
                  <MyCartLabelWrapper>
                    {products.length || 'NA'}
                  </MyCartLabelWrapper>
                </MyCartWrapper>
              ) : null}
            </TouchableOpacity>
            <MyButton
              disabled={product.quantity < 1}
              handleClick={() => handleBuyNow()}
              width="120px"
              title="Buy Now"
              icon={InventoryIcon}
              borderColor={COLORS.SUCCESS}
              backgroundColor={COLORS.SUCCESS}
            />
          </FooterWrapper>
        </ContentWrapper>
      ) : status === STATUS.FAILED && message ? (
        <AlignHorizontallyCenter>
          <TextContent color={COLORS.ERROR}>{message}</TextContent>
        </AlignHorizontallyCenter>
      ) : null}
    </ProductDetContainer>
  );
};

export default ProductDetail;
