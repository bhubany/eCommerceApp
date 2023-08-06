import {COLORS} from 'common/enums';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  HeaderTextWrapper,
  NoInternateBgImageWrapper,
  NoInternateHeaderWrapper,
  NoInternateTextWrapper,
  NoInternetContainer,
  NoInternetWrapper,
} from './noInternetStyle';

const InfinityIcon = () => (
  <MaterialIcons name="all-inclusive" color={COLORS.PRIMARY} size={50} />
);

const NoInternet = () => {
  return (
    <NoInternetContainer>
      <NoInternetWrapper>
        <NoInternateBgImageWrapper
          source={require('../../assets/images/no-wifi.png')}
        />
        <NoInternateTextWrapper>No Internet Connection</NoInternateTextWrapper>
        <NoInternateHeaderWrapper>
          <InfinityIcon />
          <HeaderTextWrapper>Infinity Shop</HeaderTextWrapper>
        </NoInternateHeaderWrapper>
      </NoInternetWrapper>
    </NoInternetContainer>
  );
};

export default NoInternet;
