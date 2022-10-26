import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, View} from 'react-native';
import Auth from './Pages/Auth';
import Navbar from './Components/Navbar';
import axios from 'axios';
import Home from './Pages/Home';
import Travel from './Pages/Travel';
import Checkout from './Pages/Checkout';
import DetailPesanan from './Pages/User/DetailPesanan';
import Chatting from './Pages/Chats/Chatting';
const Stack = createNativeStackNavigator();
// axios.defaults.baseURL = 'https://api-porto.bimarf.in/';
axios.defaults.baseURL = 'https://travelkita.bimarf.in/';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Content-Type'] =
  'application/json/x-www-form-urlencoded; charset=UTF-8; multipart/form-data';
axios.defaults.withCredentials = true;
// const [token, setToken] = useState
// axios.interceptors.request.use(function (config) {
//   config.headers.Authorization = token ? `Bearer ${token}` : '';
//   return config;
// });
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Auth" component={Auth} options={{title: 'Auth'}} />
        <Stack.Screen
          name="Navbar"
          component={Navbar}
          options={{title: 'TravelKita.id'}}
        />
        <Stack.Screen
          name="Travel"
          component={Travel}
          options={{title: 'Travel', headerShown: true}}
        />
        <Stack.Screen name="Form" component={Home} options={{title: 'Form'}} />
        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={{title: 'Checkout', headerShown: true}}
        />
        <Stack.Screen
          name="DetailPesanan"
          component={DetailPesanan}
          options={{title: 'DetailPesanan', headerShown: true}}
        />
        <Stack.Screen
          name="Chatting"
          component={Chatting}
          options={{title: 'Chatting', headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
