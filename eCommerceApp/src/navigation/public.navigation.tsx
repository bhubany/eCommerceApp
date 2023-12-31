import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Cart from 'screens/cart';
import Home from 'screens/home';
import PlaceOrder from 'screens/place-order';
import ProductDetail from 'screens/product-detail';
import Profile from 'screens/profile';
import SearchProducts from 'screens/search-product';
import SignIn from 'screens/signin';
import SignUp from 'screens/signup';
import TrackOrder from 'screens/track-order';
import CustomMenuItem from './../componennts/Custom-Menue-Item';
import {StackParamList} from './navigation';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator<StackParamList>();
const HomeIcon = ({color = '', size = 24}) => (
  <MaterialIcons name="home" color={color} size={size} />
);
const TrackOrderIcon = ({color = '', size = 24}) => (
  <MaterialIcons name="local-shipping" color={color} size={size} />
);

const SearchIcon = ({color = '', size = 24}) => (
  <MaterialIcons name="search" color={color} size={size} />
);

const CartIcon = ({color = '', size = 24}) => (
  <MaterialIcons name="shopping-cart" color={color} size={size} />
);

const ProfileIcon = ({color = '', size = 24}) => (
  <MaterialIcons name="person" color={color} size={size} />
);

const PublicNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomMenuItem {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: '#1976d2',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#1976d2',
        drawerLabelStyle: {marginLeft: 10},
        headerShown: false,
      }}>
      <Drawer.Screen
        name="home"
        component={PublicStackNavigation}
        options={{
          title: 'Home',
          lazy: true,
          drawerIcon: HomeIcon,
        }}
      />
      <Drawer.Screen
        name="trackOrder"
        component={TrackOrder}
        options={{
          lazy: true,
          title: 'Track Order',
          drawerIcon: TrackOrderIcon,
        }}
      />
      <Drawer.Screen
        name="searchProducts"
        component={SearchProducts}
        options={{
          lazy: true,
          title: 'Search Products',
          drawerIcon: SearchIcon,
        }}
      />
      <Drawer.Screen
        name="cart"
        component={Cart} //TODO: move to private navigation
        options={{
          lazy: true,
          title: 'My Cart',
          drawerIcon: CartIcon,
        }}
      />

      <Drawer.Screen
        name="profile"
        component={Profile} //TODO: move to private navigation
        options={{
          lazy: true,
          title: 'My Profile',
          drawerIcon: ProfileIcon,
        }}
      />
    </Drawer.Navigator>
  );
};

export const PublicStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="homeScreen" component={Home} />
      <Stack.Screen name="signin" component={SignIn} />
      <Stack.Screen name="signup" component={SignUp} />
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="productDetail" component={ProductDetail} />
      <Stack.Screen name="placeOrder" component={PlaceOrder} />
    </Stack.Navigator>
  );
};

export default PublicNavigation;
