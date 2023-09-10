import {useNavigation} from '@react-navigation/native';
import {COLORS} from 'common/enums';
import {TextContent} from 'common/styles';
import {infoToast} from 'common/utils';
import React from 'react';
import MyButton from '../../componennts/Buttons';
import {PlaceOrderIcon} from '../../componennts/Icons';
import Select from '../../componennts/Inputs/Select';
import NavHeader from '../../componennts/Nav-Header';
import {PlaceOrderProps} from './placeOrder';
import Styles from './styles';

const PlaceOrder: React.FC<PlaceOrderProps> = ({fromScreen}) => {
  const navigation = useNavigation();

  //TODO: manage navigation go back properly
  const handleNavigateBack = () =>
    fromScreen ? navigation.navigate(fromScreen as never) : navigation.goBack();
  const handlePlaceOrder = () => {
    infoToast('Order Placed');
  };

  return (
    <Styles.Container>
      <NavHeader title="Place order" handleClick={handleNavigateBack} />
      <Styles.Wrapper>
        <Styles.Header>
          <TextContent>FIll your details</TextContent>
        </Styles.Header>
        <Styles.Body>
          {/* <Formik initialValues={}>
            {({dirty, errors}) => (
              <TextInput
                aria-label="input"
                value="35"
                placeholder="THis is Inputs"
              />
            )}
          </Formik> */}
          <Select />
        </Styles.Body>
        <Styles.Footer>
          <MyButton
            title="Place Order"
            icon={PlaceOrderIcon}
            backgroundColor={COLORS.SUCCESS}
            width="150px"
            handleClick={() => handlePlaceOrder()}
          />
        </Styles.Footer>
      </Styles.Wrapper>
    </Styles.Container>
  );
};

export default PlaceOrder;
