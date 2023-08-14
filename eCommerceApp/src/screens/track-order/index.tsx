import {extraSteps, products, stepper} from 'common/datas';
import {COLORS, ORDER_STATUS, SHIPMENT_STATUS, STATUS} from 'common/enums';
import {AlignHorizontallySpaceBtn, TextContent} from 'common/styles';
import {UserDetails} from 'common/types';
import {infoToast} from 'common/utils';
import Layout from 'layout';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {loginState} from 'store/selectors';
import MyButton from '../../componennts/Buttons';
import OrderProductCard from '../../componennts/Cards/Order-Product';
import OrderStatus from '../../componennts/Cards/Order-status';
import {SearchIcon} from '../../componennts/Icons';
import Loader from '../../componennts/Loader';
import {useTrackOrder} from '../../hooks/order';
import {TrackOrderStepper} from './trackOrder';
import {
  InputWrapper,
  NoOrderFoundTextWrapper,
  NoOrderFoundWrapper,
  OrderDetailsContainer,
  OrderLoaderWrapper,
  OrderWrapper,
  PmntWrapper,
  ProductDetailsContainer,
  ShipmentTitleWrapper,
  ShipmentWrapper,
  TitleTextWrapper,
  TrackOrderContainer,
  TrackOrderFormWrapper,
} from './trackOrderStyle';

const TrackOrder = () => {
  const {isLogined = false, email}: UserDetails = useSelector(loginState);

  const [orderId, setOrderId] = useState<string>('');
  const {data, message, status, fetch} = useTrackOrder();
  const handleTrackOrder = () => {
    if (orderId && orderId.length) {
      fetch(orderId);
    }
  };

  const getSteps = (orderStatus: string, shipmentStatus: string) => {
    let newSteps: TrackOrderStepper[] = [];
    switch (orderStatus) {
      case ORDER_STATUS.PENDING:
        newSteps = stepper.slice(0, 1);
        break;
      case ORDER_STATUS.ACCEPTED:
        newSteps = stepper.slice(0, 2);
        break;
      case ORDER_STATUS.FAILED:
      case ORDER_STATUS.CANCELLED:
        newSteps = stepper.slice(0, 2);
        newSteps.push(
          extraSteps.find(step => step.status === ORDER_STATUS.CANCELLED) ||
            ({} as TrackOrderStepper),
        );
        break;
      case ORDER_STATUS.IN_PROGRESS:
      case ORDER_STATUS.SHIPPED:
        newSteps = stepper.slice(0, 3);
        break;
      case ORDER_STATUS.DELIVERED:
        newSteps = stepper.slice(0, 4);
        if (shipmentStatus === SHIPMENT_STATUS.RETURNED) {
          newSteps.push(
            extraSteps.find(step => step.status === SHIPMENT_STATUS.RETURNED) ||
              ({} as TrackOrderStepper),
          );
        } else if (shipmentStatus === SHIPMENT_STATUS.REPLACED) {
          newSteps.push(
            extraSteps.find(step => step.status === SHIPMENT_STATUS.REPLACED) ||
              ({} as TrackOrderStepper),
          );
        }
        break;
      case ORDER_STATUS.COMPLETED:
        newSteps = stepper.slice(0, 5);
        break;
      default:
        return [];
    }
    return newSteps.map(step => (
      <OrderStatus
        key={step.id}
        stepDetail={step.stepDetail}
        stepIcon={step.stepIcon}
        showProgress={step.showProgress}
        textColor={step.textColor}
        fontWeight="600"
      />
    ));
  };
  // Navigate to product detail page
  const handleClick = (id: string) => {
    infoToast(`Clicked on product with ID: ${id}`);
  };

  //TODO: get actual product details
  const orderProducts = products;

  return (
    <Layout>
      <TrackOrderContainer>
        <TitleTextWrapper>Track Your Order:</TitleTextWrapper>
        <TrackOrderFormWrapper>
          <InputWrapper
            value={orderId}
            placeholder="Enter your order ID"
            onChangeText={inp => setOrderId(inp)}
          />
          <InputWrapper
            value={isLogined ? email : ''}
            placeholder="Enter your Email"
            onChangeText={inp => setOrderId(inp)}
            editable={isLogined ? false : true}
          />
          <MyButton
            icon={SearchIcon}
            title="Search"
            height="40px"
            width="150px"
            handleClick={handleTrackOrder}
          />
        </TrackOrderFormWrapper>
        {status === STATUS.LOADING ? (
          <OrderLoaderWrapper>
            <Loader />
          </OrderLoaderWrapper>
        ) : status === STATUS.SUCCESS ? (
          <OrderWrapper>
            {data && Object.keys(data).length && (
              <OrderDetailsContainer>
                <ProductDetailsContainer
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {orderProducts &&
                    orderProducts.length &&
                    orderProducts.map(product => (
                      <OrderProductCard
                        onClick={() => handleClick(product.id)}
                        product={product}
                        key={product.id}
                        quantity={1} // !fixme(): keep actual quantity
                      />
                    ))}
                </ProductDetailsContainer>
                <PmntWrapper>
                  <AlignHorizontallySpaceBtn>
                    <TextContent fontSize="18px">
                      {'Total Bill :' ?? 'NA'}
                    </TextContent>
                    <TextContent fontSize="18px" color={COLORS.GREY}>
                      {data?.totalBill ?? 'NA'}
                    </TextContent>
                  </AlignHorizontallySpaceBtn>
                  <AlignHorizontallySpaceBtn>
                    <TextContent fontSize="18px">
                      {data?.payment?.type ?? 'NA'} :
                    </TextContent>
                    <TextContent fontSize="18px" color={COLORS.SUCCESS}>
                      {data?.payment?.status ?? 'NA'}
                    </TextContent>
                  </AlignHorizontallySpaceBtn>
                  <AlignHorizontallySpaceBtn>
                    <TextContent fontSize="18px">
                      {'Shipment type :' ?? 'NA'}
                    </TextContent>
                    <TextContent fontSize="18px" color={COLORS.GREY}>
                      {data?.shipment.type ?? 'NA'}
                    </TextContent>
                  </AlignHorizontallySpaceBtn>
                  <AlignHorizontallySpaceBtn>
                    <TextContent fontSize="18px">
                      {'Order Placed on :' ?? 'NA'}
                    </TextContent>
                    <TextContent fontSize="18px" color={COLORS.GREY}>
                      {data?.placedOn.split('T')[0] ?? 'NA'}
                    </TextContent>
                  </AlignHorizontallySpaceBtn>
                </PmntWrapper>
                <ShipmentWrapper>
                  <ShipmentTitleWrapper>
                    <TextContent
                      fontSize="24px"
                      color={COLORS.INVERSE}
                      fontWeight="900">
                      Shipment Details
                    </TextContent>
                  </ShipmentTitleWrapper>
                  {getSteps(data.orderStatus, data.shipment.status)}
                </ShipmentWrapper>
              </OrderDetailsContainer>
            )}
          </OrderWrapper>
        ) : status === STATUS.FAILED ? (
          <NoOrderFoundWrapper>
            <NoOrderFoundTextWrapper> {message}</NoOrderFoundTextWrapper>
          </NoOrderFoundWrapper>
        ) : null}
      </TrackOrderContainer>
    </Layout>
  );
};

export default TrackOrder;
