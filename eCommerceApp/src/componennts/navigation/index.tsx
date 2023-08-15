import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {HorizontalLine} from 'common/styles';
import {UserDetails} from 'common/types';
import {errorToast, successToast} from 'common/utils';
import React from 'react';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Share, {ShareOptions} from 'react-native-share';
import {useDispatch, useSelector} from 'react-redux';
import {userLogout} from 'store/reducers/userSlice';
import {loginState} from 'store/selectors';
import {ShareIcon, SignOutIcon} from '../../componennts/Icons';
import {
  CustomMenuContainer,
  DrawerFooterItemContent,
  DrawerFooterItemWrapper,
  DrawerFooterListWrapper,
  DrawerListWrapper,
  MenueBgImageWrapper,
  UserImageWrapper,
  UserNameContainer,
  UserNameWrapper,
} from './navigationStyle';

const CustomMenuItem: React.FC<DrawerContentComponentProps> = props => {
  const dispatch = useDispatch();
  const login: UserDetails = useSelector(loginState);
  const {navigation} = props;
  const handleTellAFriend = async () => {
    try {
      const options: ShareOptions = {
        urls: ['www.infinityshop.com/app'],
        title: 'Tell a friend !',
        message: 'Check out this cool app!',
      };

      const result = await Share.open(options);
      successToast(result.message); // we can manage shared details to db
    } catch (error: any) {
      errorToast(error.message);
    }
  };

  const handleLogout = () => {
    try {
      dispatch(userLogout());
      successToast('Logout Sucessfully');
      navigation.navigate('signin');
    } catch (error: any) {
      errorToast(error.message);
    }
  };

  const handleLoginOrProfile = () => {
    try {
      if (login && login.isLogined) {
        navigation.navigate('profile');
      } else {
        navigation.navigate('signin');
      }
    } catch (error: any) {
      errorToast(error.message);
    }
  };

  return (
    <CustomMenuContainer>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: 'orange'}}>
        <MenueBgImageWrapper
          source={require('../../assets/images/bg-cart-orange.jpg')}>
          <UserImageWrapper
            source={
              login && login.isLogined && login.imageurl
                ? login.imageurl
                : require('../../assets/images/User-Profile.png')
            }
            alt={
              login && login.isLogined ? login.imagealttext : 'user profile pic'
            }
          />
          <UserNameContainer onPress={handleLoginOrProfile}>
            <UserNameWrapper>
              {login && login.isLogined ? `Hello ${login.firstname}` : 'signin'}
            </UserNameWrapper>
          </UserNameContainer>
        </MenueBgImageWrapper>
        <DrawerListWrapper>
          <DrawerItemList {...props} />
        </DrawerListWrapper>
      </DrawerContentScrollView>
      <View>
        <HorizontalLine />
      </View>
      <DrawerFooterListWrapper>
        <TouchableOpacity onPress={() => handleTellAFriend()}>
          <DrawerFooterItemWrapper>
            {ShareIcon}
            <DrawerFooterItemContent>Tell a friend !</DrawerFooterItemContent>
          </DrawerFooterItemWrapper>
        </TouchableOpacity>
        {login && login.isLogined ? (
          <TouchableOpacity onPress={() => handleLogout()}>
            <DrawerFooterItemWrapper>
              {SignOutIcon}
              <DrawerFooterItemContent>Sign Out</DrawerFooterItemContent>
            </DrawerFooterItemWrapper>
          </TouchableOpacity>
        ) : null}
      </DrawerFooterListWrapper>
    </CustomMenuContainer>
  );
};

export default CustomMenuItem;
