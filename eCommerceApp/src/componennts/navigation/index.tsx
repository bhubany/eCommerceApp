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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {userLogout} from 'store/reducers/userSlice';
import {loginState} from 'store/selectors';
import {
  CustomMenuContainer,
  DrawerFooterItemContent,
  DrawerFooterItemWrapper,
  DrawerFooterListWrapper,
  DrawerListWrapper,
  MenueBgImageWrapper,
  UserImageWrapper,
  UserNameWrapper,
} from './navigationStyle';
const ShareIcon = ({color = '#1976d2', size = 16}) => (
  <MaterialIcons name="share" color={color} size={size} />
);
const SignOutIcon = ({color = '#1976d2', size = 16}) => (
  <MaterialIcons name="logout" color={color} size={size} />
);

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
          source={require('../../assets/images/download.png')}>
          <UserImageWrapper
            source={
              login && login.isLogined
                ? login.imageurl
                : require('../../assets/images/User-Profile.png')
            }
            alt={
              login && login.isLogined ? login.imagealttext : 'user profile pic'
            }
          />
          <TouchableOpacity onPress={() => handleLoginOrProfile()}>
            <UserNameWrapper>
              {login && login.isLogined ? `Hello ${login.firstname}` : 'signin'}
            </UserNameWrapper>
          </TouchableOpacity>
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
            <ShareIcon />
            <DrawerFooterItemContent>Tell a friend !</DrawerFooterItemContent>
          </DrawerFooterItemWrapper>
        </TouchableOpacity>
        {login && login.isLogined ? (
          <TouchableOpacity onPress={() => handleLogout()}>
            <DrawerFooterItemWrapper>
              <SignOutIcon />
              <DrawerFooterItemContent>Sign Out</DrawerFooterItemContent>
            </DrawerFooterItemWrapper>
          </TouchableOpacity>
        ) : null}
      </DrawerFooterListWrapper>
    </CustomMenuContainer>
  );
};

export default CustomMenuItem;
