import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {product} from 'common/datas';
import {CART_ACTION, STATUS} from 'common/enums';
import {QUANTITY_UPDATED_IN_CART} from 'common/messages/info.message';
import {AlignHorizontallySpaceBtn, TextContent} from 'common/styles';
import {CartDetails, UserDetails} from 'common/types';
import {errorToast, successToast} from 'common/utils';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {PlaceOrderProps} from 'screens/place-order/placeOrder';
import {ProductDetailParams} from 'screens/product-detail/productDetail';
import {RootState} from 'store';
import {
  removeFromCart,
  updateCartQuantity,
  userCart,
} from 'store/actions/cartAction';
import {cleanRemoveStatus, cleanUpdateStatus} from 'store/reducers/cartSlice';
import {
  cartState,
  loginState,
  removeFromCartState,
  updateQuantityState,
} from 'store/selectors';
import MyButton from '../../componennts/Buttons';
import Confirm from '../../componennts/Cards/Confirm-box';
import {CartCheckoutIcon} from '../../componennts/Icons';
import Modal from '../../componennts/Modal';
import NavHeader from '../../componennts/Nav-Header';
import {
  CartCardContainer,
  CartCntntCntnr,
  CartContainer,
  CartDetlsWrpr,
  FooterWrapper,
} from './cartStyle';
import CartCard from './components/Cart-Card';
import UpdateQuantity from './components/Update-quantity';

type CartSreenRouteProp = RouteProp<any, 'cart'>;
type NavigationProps = StackNavigationProp<
  {placeOrder: PlaceOrderProps; productDetail: ProductDetailParams},
  'placeOrder' | 'productDetail'
>;

type Props = {
  route: CartSreenRouteProp;
  navigation: NavigationProps;
};

const Cart = ({navigation, route}: Props) => {
  const [productId, setProductId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<string>('0');
  const [prevQuantity, setPrevQuantity] = useState<number>(0);
  const [openRemove, setOpenRemove] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const {totalBill, products}: CartDetails = useSelector(cartState);
  const {id, isLogined}: UserDetails = useSelector(loginState);
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const updateQty = useSelector(updateQuantityState);
  const remove = useSelector(removeFromCartState);
  const userId = (isLogined ? id : '') as string;

  const handleNavigateBack = () => {
    if (route.params?.fromScreen) {
      navigation.navigate(route.params.fromScreen);
    } else {
      navigation.goBack();
    }
  };

  const handleCheckOut = () =>
    navigation.navigate('placeOrder', {
      fromScreen: 'cart',
    });

  const handleView = (pId: string) => {
    navigation.navigate('productDetail', {fromScreen: 'cart', productId: pId});
  };

  const handleUpdate = () => {
    const qty = parseInt(quantity, 10);
    dispatch(
      updateCartQuantity({
        action: qty > prevQuantity ? CART_ACTION.ADD : CART_ACTION.REMOVE,
        productId: productId as string,
        quantity: qty > prevQuantity ? qty - prevQuantity : prevQuantity - qty,
        userId,
      }),
    );
    setOpenEdit(false);
    setProductId(null);
  };

  const handleDelete = () => {
    dispatch(
      removeFromCart({
        productId: productId as string,
        userId,
      }),
    );
    setOpenRemove(false);
    setProductId(null);
  };

  useEffect(() => {
    if (updateQty && updateQty.status === STATUS.SUCCESS) {
      successToast(QUANTITY_UPDATED_IN_CART);
    } else if (updateQty && updateQty.status === STATUS.FAILED) {
      errorToast(updateQty.message);
    }
    if (updateQty && updateQty.status !== STATUS.PENDING) {
      dispatch(cleanUpdateStatus());
      dispatch(userCart({id: userId}));
    }

    if (remove && remove.status === STATUS.SUCCESS) {
      successToast(remove.message);
    } else if (remove && remove.status === STATUS.FAILED) {
      errorToast(remove.message);
    }

    if (remove && remove.status !== STATUS.PENDING) {
      dispatch(cleanRemoveStatus());
      dispatch(userCart({id: userId}));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateQty, remove]);

  useEffect(() => {
    dispatch(userCart({id: userId}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //TODO: modify get cart API to get product details also to match cart requirements
  return (
    <CartContainer>
      <NavHeader title="My Cart Details" handleClick={handleNavigateBack} />
      <CartCntntCntnr>
        <CartDetlsWrpr>
          <AlignHorizontallySpaceBtn>
            <TextContent fontSize="16px">Total Quantity: </TextContent>
            <TextContent fontSize="16px">{products.length} </TextContent>
          </AlignHorizontallySpaceBtn>
          <AlignHorizontallySpaceBtn>
            <TextContent fontSize="16px">Total Bill: </TextContent>
            <TextContent fontSize="16px">{totalBill} </TextContent>
          </AlignHorizontallySpaceBtn>
        </CartDetlsWrpr>
        <ScrollView showsVerticalScrollIndicator={false}>
          <CartCardContainer>
            {products && products.length
              ? products.map(prdt => (
                  <CartCard
                    key={prdt.productId}
                    product={product}
                    handleView={() => handleView(prdt.productId)}
                    handleEdit={() => {
                      setProductId(prdt.productId);
                      setQuantity(`${prdt.quantity}`);
                      setPrevQuantity(prdt.quantity);
                      setOpenEdit(true);
                    }}
                    handleDelete={() => {
                      setProductId(prdt.productId);
                      setOpenRemove(true);
                    }}
                  />
                ))
              : null}
          </CartCardContainer>
        </ScrollView>
      </CartCntntCntnr>
      <FooterWrapper>
        <MyButton
          width="350px"
          height="40px"
          icon={CartCheckoutIcon}
          title="Checkout"
          fontSize="24px"
          handleClick={handleCheckOut}
        />
      </FooterWrapper>
      {openRemove && (
        <Modal setOpen={setOpenRemove} showFooter={false}>
          <Confirm
            onYes={handleDelete}
            onNo={() => {
              setProductId(null);
              setOpenRemove(false);
            }}
            header={`Are you sure to delete product from cart?`}
          />
        </Modal>
      )}
      {openEdit && (
        <Modal setOpen={setOpenEdit} onSave={handleUpdate}>
          <UpdateQuantity
            quantity={quantity}
            setQuantity={setQuantity}
            availableQuantity={10}
          />
        </Modal>
      )}
    </CartContainer>
  );
};

export default Cart;
