import React, {useEffect, useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
const Profile = () => {
  const navRedirect = useNavigation();
  const handleLogout = event => {
    AsyncStorage.clear().then(() => console.log('Cleared~~~~~~'));
    event.preventDefault();
    // axios.post(`api/logout`).then(res => {
    navRedirect.navigate('Auth');
    // });
  };
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  useEffect(() => {
    AsyncStorage.getItem('auth-name').then(value => {
      setUsername(value);
    });
    AsyncStorage.getItem('auth-email').then(value => {
      setEmail(value);
    });
  }, []);
  return (
    <>
      <ScrollView
        style={{
          backgroundColor: 'white',
          paddingHorizontal: 50,
          flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon color="grey" name="user" size={100} />
          <Text>Profile</Text>
        </View>
        <View>
          <TextInput
            placeholderTextColor="grey"
            style={styles.input}
            placeholder={username}
          />
          <TextInput
            placeholderTextColor="grey"
            style={styles.input}
            placeholder={email}
          />
          <TextInput
            placeholderTextColor="grey"
            style={styles.input}
            placeholder="Change Password"
          />
          <TouchableOpacity style={styles.button}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>
              Change Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.buttonLogout}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>Logout </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  input: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    color: 'black',
    width: '100%',
  },
  button: {
    backgroundColor: '#42BB5D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonLogout: {
    backgroundColor: '#a70404',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
});
export default Profile;
