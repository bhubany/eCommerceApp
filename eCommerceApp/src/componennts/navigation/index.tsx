import React from 'react';
import {View} from 'react-native';
import Share, {ShareOptions} from 'react-native-share';
import bgCart from '../../assets/images/download.png';
import userProfile from '../../assets/images/User-Profile.png';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  CustomMenuContainer,
  MenueBgImageWrapper,
  UserImageWrapper,
  UserNameWrapper,
  DrawerListWrapper,
  DrawerFooterListWrapper,
  DrawerFooterItemWrapper,
  DrawerFooterItemContent,
} from './navigationStyle';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {HorizontalLine} from 'common/styles';
const ShareIcon = ({color = '#1976d2', size = 16}) => (
  <MaterialIcons name="share" color={color} size={size} />
);
const SignOutIcon = ({color = '#1976d2', size = 16}) => (
  <MaterialIcons name="logout" color={color} size={size} />
);

const CustomMenuItem: React.FC<DrawerContentComponentProps> = props => {
  const handleTellAFriend = async () => {
    try {
      const options: ShareOptions = {
        urls: ['www.infinityshop.com/app'],
        title: 'Tell a friend !',
        message: 'Check out this cool app!',
      };

      const result = await Share.open(options);
      console.log(result); // we can manage shared details to db
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleLogout = () => {
    try {
      console.warn('Logout Sucessfully');
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleLoginOrProfile = () => {
    try {
      console.warn('login/profile clicked');
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <CustomMenuContainer>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: 'orange'}}>
        <MenueBgImageWrapper source={bgCart}>
          <UserImageWrapper source={userProfile} />
          <TouchableOpacity onPress={() => handleLoginOrProfile()}>
            <UserNameWrapper>Current User</UserNameWrapper>
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

        <TouchableOpacity onPress={() => handleLogout()}>
          <DrawerFooterItemWrapper>
            <SignOutIcon />
            <DrawerFooterItemContent>Sign Out</DrawerFooterItemContent>
          </DrawerFooterItemWrapper>
        </TouchableOpacity>
      </DrawerFooterListWrapper>
    </CustomMenuContainer>
  );
};

export default CustomMenuItem;
