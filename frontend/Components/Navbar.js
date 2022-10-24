import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../Pages/Home';
import Auth from '../Pages/Auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import Profile from '../Pages/Profile';
import Travel from '../Pages/Travel';
import {Link} from '@react-navigation/native';
import PesananDriver from '../Pages/Driver/PesananDriver';
import AsyncStorage from '@react-native-community/async-storage';
import PesananUser from '../Pages/User/PesananUser';

const Tab = createBottomTabNavigator();
const {Navigator, Screen} = createBottomTabNavigator();
const Navbar = () => {
  const [roleLocal, setRoleLocal] = useState();
  const [getParams, setParams] = useState();

  useEffect(() => {
    AsyncStorage.getItem('auth-role', (error, result) => {
      setRoleLocal(result);
    });
  }, []);
  return (
    <>
      <Navigator
        // initialRouteName={state.route.params.state}
        initialRouteName={'Home'}
        // tabBarOptions={{
        //   activeTintColor: '#42BB5D',
        // }}
        screenOptions={{
          activeTintColor: '#42BB5D',
          inactiveTintColor: '#fff',
        }}>
        <Screen
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (
              <Icon name="home" color={color} size={30} />
            ),
          }}
          name="Home"
          component={roleLocal == 'driver' ? PesananDriver : Home}
        />
        {roleLocal === 'user' && (
          <Screen
            options={{
              tabBarLabel: 'Pesanan',
              tabBarIcon: ({color, size}) => (
                <IconMat name="history-edu" color={color} size={30} />
              ),
            }}
            name="Pesanan"
            component={PesananUser}
          />
        )}

        <Screen
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({color, size}) => (
              <Icon name="user" color={color} size={30} />
            ),
          }}
          name="Profile"
          component={Profile}
        />
      </Navigator>
    </>
  );
};

export default Navbar;
