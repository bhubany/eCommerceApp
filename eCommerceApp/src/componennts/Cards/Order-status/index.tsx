import React from 'react';
import {OrderStatusProps} from './orderStatus';
import {
  OrderStausContainer,
  OrderStausDetails,
  OrderStausIconWrapper,
  OrderStausLeftBorder,
  OrderStausText,
} from './orderStatusStyle';

const OrderStatus = (props: OrderStatusProps) => {
  return (
    <OrderStausContainer>
      <OrderStausIconWrapper>
        {props.stepIcon}
        {props.showProgress ? <OrderStausLeftBorder {...props} /> : null}
      </OrderStausIconWrapper>
      <OrderStausDetails>
        <OrderStausText {...props}>{props.stepDetail}</OrderStausText>
      </OrderStausDetails>
    </OrderStausContainer>
  );
};

export default OrderStatus;
