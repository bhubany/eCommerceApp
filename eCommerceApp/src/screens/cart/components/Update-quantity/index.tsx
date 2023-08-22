import {COLORS, QUANTITY} from 'common/enums';
import {
  CART_QTY_CANNOT_BE_LESS_THAN_ONE,
  INVALID_QUANTITY,
  QUANTITY_CANNOT_BE_GREATER_THAN_AVAILABLE,
} from 'common/messages/info.message';
import {TextContent} from 'common/styles';
import {errorToast} from 'common/utils';
import React from 'react';
import {AddIcon, SubtractIcon} from '../../../../componennts/Icons';
import Styles from './styles';
import {UpdateQuantityProps} from './updateQuantity';

const UpdateQuantity = ({
  quantity,
  setQuantity,
  availableQuantity,
}: UpdateQuantityProps) => {
  const handleUpdateQuantity = (
    action: QUANTITY,
    avQuantity = availableQuantity,
  ) => {
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

  return (
    <Styles.Container>
      <Styles.Header>
        <TextContent>Update Your Quantity</TextContent>
      </Styles.Header>
      <Styles.Body>
        <Styles.BtnWrapper
          borderColor={COLORS.DANGER}
          onPress={() => handleUpdateQuantity(QUANTITY.DECREASE)}>
          {SubtractIcon}
        </Styles.BtnWrapper>
        <Styles.Input value={quantity} keyboardType="number-pad" />
        <Styles.BtnWrapper
          borderColor={COLORS.SUCCESS}
          onPress={() => handleUpdateQuantity(QUANTITY.INCREASE)}>
          {AddIcon}
        </Styles.BtnWrapper>
      </Styles.Body>
    </Styles.Container>
  );
};

export default UpdateQuantity;
