import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {product} from 'common/datas';
import {AlignHorizontallySpaceBtn, TextContent} from 'common/styles';
import {CartDetails} from 'common/types';
import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {PlaceOrderProps} from 'screens/place-order/placeOrder';
import {cartState} from 'store/selectors';
import MyButton from '../../componennts/Buttons';
import CartCard from '../../componennts/Cards/Cart-Card';
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

type NavigationProps = NativeStackScreenProps<
  {placeOrder: PlaceOrderProps},
  'placeOrder'
>;

const Cart: React.FC<NavigationProps> = ({navigation}) => {
  const [open, setOpen] = useState<boolean>(false);
  const {totalBill, products}: CartDetails = useSelector(cartState);
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleCheckOut = () =>
    navigation.navigate('placeOrder', {
      fromScreen: 'cart',
    });

  const handleViewProduct = () => {
    setOpen(true);
  };

  //TODO: modify get cart API to get product details also to match cart requirements

  return (
    <CartContainer>
      <NavHeader title="My Cart Details" handleClick={handleGoBack} />
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
            {products &&
              products.length &&
              products.map(prdt => (
                <CartCard
                  key={prdt.productId}
                  product={product}
                  onClick={() => handleViewProduct()}
                />
              ))}
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
      {open && <Modal setOpen={setOpen} />}
    </CartContainer>
  );
};

export default Cart;
