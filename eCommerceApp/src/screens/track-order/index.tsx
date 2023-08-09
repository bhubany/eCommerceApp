import {products} from 'common/datas';
import {COLORS, ORDER_STATUS, SHIPMENT_STATUS, STATUS} from 'common/enums';
import {AlignHorizontallySpaceBtn, TextContent} from 'common/styles';
import {UserDetails} from 'common/types';
import {infoToast} from 'common/utils';
import Layout from 'layout';
import React, {useState} from 'react';
import {Image} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {loginState} from 'store/selectors';
import MyButton from '../../componennts/Buttons';
import OrderProductCard from '../../componennts/Cards/Order-Product';
import OrderStatus from '../../componennts/Cards/Order-status';
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

const SearchIcon = () => (
  <MaterialIcons name="search" color={COLORS.WHITE} size={20} />
);

const VehicleIcon = () => (
  <MaterialIcons name="local-shipping" color={COLORS.CORAL} size={50} />
);

const PendingIcon = () => (
  <MaterialIcons name="pending" color={COLORS.INFO} size={50} />
);

const AcceptedIcon = () => (
  <MaterialIcons name="check-circle-outline" color={COLORS.SUCCESS} size={50} />
);

const CompletedIcon = () => (
  <MaterialIcons name="verified" color={COLORS.SUCCESS} size={50} />
);

const DeliveredIcon = () => (
  <Image
    source={require('../../assets/icons/delivered.png')}
    style={{height: 50, width: 50}}
  />
);

const CancelledIcon = () => (
  <MaterialIcons name="cancel" color={COLORS.ERROR} size={50} />
);

const ReturnedIcon = () => (
  <MaterialIcons name="assignment-return" color={COLORS.CORAL} size={50} />
);

const ReplacementIcon = () => (
  <MaterialIcons name="find-replace" color={COLORS.CORAL} size={50} />
);

const TrackOrder = () => {
  const {isLogined = false, email}: UserDetails = useSelector(loginState);

  const [orderId, setOrderId] = useState<string>('');
  const {data, message, status, fetch} = useTrackOrder();
  const handleTrackOrder = () => {
    if (orderId && orderId.length) {
      fetch(orderId);
    }
  };

  const stepper: TrackOrderStepper[] = [
    {
      id: 1,
      status: ORDER_STATUS.PENDING,
      stepDetail: 'Your order is waiting for approval',
      textColor: COLORS.INVERSE,
      stepIcon: <PendingIcon />,
      showProgress: true,
    },
    {
      id: 2,
      status: ORDER_STATUS.ACCEPTED,
      stepDetail: 'Your ordr has been accepted. Packaging is ongoing',
      textColor: COLORS.INVERSE,
      stepIcon: <AcceptedIcon />,
      showProgress: true,
    },
    {
      id: 3,
      status: ORDER_STATUS.SHIPPED,
      stepDetail: 'Your package is on the way',
      textColor: COLORS.INVERSE,
      stepIcon: <VehicleIcon />,
      showProgress: true,
    },
    {
      id: 4,
      status: ORDER_STATUS.DELIVERED,
      stepDetail: 'Your package has been delivered',
      textColor: COLORS.INVERSE,
      stepIcon: <DeliveredIcon />,
      showProgress: true,
    },
    {
      id: 5,
      status: ORDER_STATUS.COMPLETED,
      stepDetail: 'Your order completed successfully',
      textColor: COLORS.SUCCESS,
      stepIcon: <CompletedIcon />,
      showProgress: false,
    },
  ];

  const extraSteps: TrackOrderStepper[] = [
    {
      id: 6,
      status: ORDER_STATUS.CANCELLED,
      stepDetail: 'Your order has been cancelled',
      textColor: COLORS.ERROR,
      stepIcon: <CancelledIcon />,
      showProgress: false,
    },

    {
      id: 7,
      status: SHIPMENT_STATUS.RETURNED,
      stepDetail: 'Your package has been placed for Returned',
      textColor: COLORS.CORAL,
      stepIcon: <ReturnedIcon />,
      showProgress: false,
    },
    {
      id: 8,
      status: SHIPMENT_STATUS.REPLACED,
      stepDetail: 'Your package has been placed for replacement',
      textColor: COLORS.CORAL,
      stepIcon: <ReplacementIcon />,
      showProgress: false,
    },
  ];

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
        fontWeight="700"
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
            icon={<SearchIcon />}
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
