import AsyncStorage from '@react-native-community/async-storage';
import {Link, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const navRedirect = useNavigation();
  const [menuActive, setMenuActive] = useState(true);
  const [loginInput, setLoginInput] = useState({
    email_login: 'admin@gmail.com',
    pass_login: 'admin',
  });
  const handleChangeInput = (text, input) => {
    setLoginInput({...loginInput, [input]: text});
  };
  const handleLoginSubmit = event => {
    setLoading(true);
    event.preventDefault();
    let data = JSON.stringify({
      email: loginInput.email_login,
      password: loginInput.pass_login,
    });
    axios.get('sanctum/csrf-cookie').then(res => {
      axios.post(`api/login`, data).then(res => {
        console.log(res.data);
        if (res.data.status === 200) {
          // AsyncStorage.clear();
          // AsyncStorage.clear().then(() => console.log('Cleared'))
          AsyncStorage.setItem('auth-name', res.data.username);
          AsyncStorage.setItem('auth-id', JSON.stringify(res.data.id));
          AsyncStorage.setItem('auth-email', res.data.email);
          AsyncStorage.setItem('auth-role', res.data.role);
          AsyncStorage.setItem('auth-token', res.data.token);

          // navRedirect.navigate('Navbar');
          if (res.data.role === 'driver') {
            navRedirect.navigate('Navbar', {
              screen: 'Pesanan',
            });
          } else if (res.data.role === 'user') {
            navRedirect.navigate('Navbar');
          }
          console.log('====================Logged In===============');
        } else {
          console.log('====================================');
          console.log(res.data.status);
          console.log('====================================');
        }
      });
    });
    setLoading(false);
  };
  // register
  const [regisInput, setRegisInput] = useState({
    name_regis: '',
    email_regis: '',
    pass_regis: '',
    pass_confirm_regis: '',
    telp_regis: '',
  });
  const handleChangeRegis = (text, input) => {
    setRegisInput({...regisInput, [input]: text});
  };
  const handleRegisSubmit = event => {
    setLoading(true);
    event.preventDefault();
    let data = JSON.stringify({
      name: regisInput.name_regis,
      email: regisInput.email_regis,
      password: regisInput.pass_regis,
      password_confirmation: regisInput.pass_confirm_regis,
      telp: regisInput.telp_regis,
    });

    axios.get('sanctum/csrf-cookie').then(res => {
      axios
        .post(`api/register`, data)
        .then(res => {
          console.log(res.data);
          if (res.data.status === 200) {
            navRedirect.navigate('Navbar');
          }
        })
        .catch(err => {
          console.log('====================================');
          console.log(data);
          console.log('====================================');
        });
    });
    setLoading(false);
  };
  return (
    <>
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            backgroundColor: '#fff',
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            paddingBottom: 50,
          }}>
          <Text
            style={{
              fontSize: 35,
              fontWeight: 'bold',
              color: '#42BB5D',
              marginTop: 30,
            }}>
            TravelKita.id
          </Text>
          <Image
            source={require('../assets/logo1.png')}
            style={{width: 400, height: 400, resizeMode: 'contain'}}
          />
          <View
            style={{
              backgroundColor: '#f0f0f0',
              padding: 10,
              borderRadius: 50,
              flex: 1,
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={
                menuActive && {
                  backgroundColor: '#fff',
                  borderRadius: 50,
                }
              }>
              <TouchableOpacity
                onPress={e => setMenuActive(true)}
                style={styles.menu}>
                <Text style={{color: '#42BB5D', fontWeight: 'bold'}}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={
                menuActive === false && {
                  backgroundColor: '#fff',
                  borderRadius: 50,
                }
              }>
              <TouchableOpacity
                onPress={e => setMenuActive(false)}
                style={styles.menu}>
                <Text style={{color: '#42BB5D', fontWeight: 'bold'}}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {menuActive ? (
            <>
              <SafeAreaView style={{width: '80%', marginTop: 10, flex: 1}}>
                <TextInput
                  placeholderTextColor="grey"
                  type="text"
                  style={styles.input}
                  onChangeText={text => handleChangeInput(text, 'email_login')}
                  value={loginInput.email_login}
                  name="email_login"
                  placeholder="Masukkan Email"
                />
                <TextInput
                  placeholderTextColor="grey"
                  style={styles.input}
                  onChangeText={text => handleChangeInput(text, 'pass_login')}
                  value={loginInput.pass_login}
                  name="pass_login"
                  placeholder="Masukkan Password"
                  secureTextEntry={true}
                />
                <TouchableOpacity
                  disabled={loading ? true : false}
                  onPress={handleLoginSubmit}
                  style={loading ? {backgroundColor: 'red'} : styles.button}>
                  <Text style={{color: '#fff', fontWeight: 'bold'}}>Login</Text>
                </TouchableOpacity>
              </SafeAreaView>
            </>
          ) : (
            <>
              <SafeAreaView style={{width: '80%', marginTop: 10, flex: 1}}>
                <TextInput
                  placeholderTextColor="grey"
                  style={styles.input}
                  name="name_regis"
                  onChangeText={text => handleChangeRegis(text, 'name_regis')}
                  value={regisInput.name_regis}
                  placeholder="Nama Lengkap"
                />
                <TextInput
                  placeholderTextColor="grey"
                  style={styles.input}
                  name="email_regis"
                  onChangeText={text => handleChangeRegis(text, 'email_regis')}
                  value={regisInput.email_regis}
                  placeholder="Masukkan Email"
                />
                <TextInput
                  placeholderTextColor="grey"
                  style={styles.input}
                  name="pass_regis"
                  onChangeText={text => handleChangeRegis(text, 'pass_regis')}
                  value={regisInput.pass_regis}
                  placeholder="Masukkan Password"
                  secureTextEntry={true}
                />
                <TextInput
                  placeholderTextColor="grey"
                  style={styles.input}
                  name="pass_confirm_regis"
                  onChangeText={text =>
                    handleChangeRegis(text, 'pass_confirm_regis')
                  }
                  value={regisInput.pass_confirm_regis}
                  placeholder="Konfirmasi Password"
                  secureTextEntry={true}
                />
                <TextInput
                  placeholderTextColor="grey"
                  keyboardType="phone-pad"
                  style={styles.input}
                  name="telp_regis"
                  onChangeText={text => handleChangeRegis(text, 'telp_regis')}
                  value={regisInput.telp_regis}
                  placeholder="No Telp"
                />
                <TouchableOpacity
                  onPress={handleRegisSubmit}
                  style={styles.button}>
                  <Text style={{color: '#fff', fontWeight: 'bold'}}>
                    Register
                  </Text>
                </TouchableOpacity>
              </SafeAreaView>
            </>
          )}
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
  },
  button: {
    backgroundColor: '#42BB5D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  menu: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
});
export default Auth;
