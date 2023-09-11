import {useNavigation} from '@react-navigation/native';
import {countries} from 'common/datas';
import {COLORS} from 'common/enums';
import {TextContent} from 'common/styles';
import {infoToast} from 'common/utils';
import {Formik} from 'formik';
import React from 'react';
import * as Yup from 'yup';
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

  const handleSubmit = () => infoToast('Form submitted successfully');

  const validationSchema = Yup.object({
    select: Yup.number().max(5).required(),
  });

  return (
    <Styles.Container>
      <NavHeader title="Place order" handleClick={handleNavigateBack} />
      <Styles.Wrapper>
        <Styles.Header>
          <TextContent>FIll your details</TextContent>
        </Styles.Header>
        <Styles.Body>
          <Formik
            initialValues={{select: ''}}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {({dirty, errors}) => (
              <>
                <Select
                  options={countries}
                  name="select"
                  label="Select Label"
                  id="select"
                  required
                />
              </>
            )}
          </Formik>
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
