import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import {
  createNavigationContainerRef,
  Link,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
const Travel = tanggalProps => {
  // get taxi / driver
  const [getReqDriver_one, setGetReqDriver_one] = useState([]);
  const [getReqDriver_two, setGetReqDriver_two] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    getDriver();
  }, [isFocused]);
  console.log('=====================in travel===============');
  console.log(tanggalProps.route.params.tanggalProps);

  const getDriver = () => {
    axios
      .get(
        '/api/driver/show?tanggal_keberangkatan=' +
          tanggalProps.route.params.tanggalProps,
      )
      .then(res => {
        console.log('====================================');
        setGetReqDriver_one(res.data[0]);
        setGetReqDriver_two(res.data[1]);
        if (!res.data[1]) {
          console.log('nulla');
        } else {
          console.log('ada');
        }
      });
  };
  return (
    <ScrollView style={{backgroundColor: '#f8f8f8', flex: 1}}>
      <View
        style={{
          backgroundColor: '#f8f8f8',
          display: 'flex',
          justifyContent: 'center',
          padding: 20,
          height: '100%',
          paddingBottom: 50,
        }}>
        {/* looping */}
        {getReqDriver_one.map((item, index) => (
          <TouchableOpacity key={index} style={styles.card}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name="car" color="#078122" />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '500',
                    color: '#078122',
                    marginLeft: 5,
                  }}>
                  {item.vendor.vendor_name}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 10,
                  color: '#a2cf00',
                  marginLeft: 5,
                }}>
                Jenis Mobil: {item.jenis_mobil}
              </Text>
            </View>
            <Text style={{marginTop: 10, color: 'grey'}}>
              Pukul {item.waktu_keberangkatan} WIB
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: 'grey'}}>
                Jumlah Kursi: {item.jumlah_kursi}
              </Text>
              <Link
                to={{
                  screen: 'Checkout',
                  params: {props: JSON.stringify(item)},
                }}
                style={styles.button}>
                Pesan Sekarang
              </Link>
            </View>
          </TouchableOpacity>
        ))}
        {/* looping */}
        {/* looping */}
        {getReqDriver_two && (
          <>
            {getReqDriver_two.map((item, index) => (
              <TouchableOpacity key={index} style={styles.card}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name="car" color="#078122" />
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: '500',
                        color: '#078122',
                        marginLeft: 5,
                      }}>
                      {item.driver.vendor.vendor_name}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 10,
                      color: '#a2cf00',
                      marginLeft: 5,
                    }}>
                    Jenis Mobil: {item.jenis_mobil}
                  </Text>
                </View>
                <Text style={{marginTop: 10, color: 'grey'}}>
                  Pukul {item.waktu_keberangkatan} WIB
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{color: 'grey'}}>
                    Jumlah Kursi: {item.driver.jumlah_kursi - item.jumlah_kursi}
                  </Text>
                  {item.jumlah_kursi === item.driver.jumlah_kursi ? (
                    <Text style={styles.buttonHabis}>Habis</Text>
                  ) : (
                    <Link
                      to={{
                        screen: 'Checkout',
                        params: {props: JSON.stringify(item.driver)},
                      }}
                      style={styles.button}>
                      Pesan Sekarang
                    </Link>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}
        {/* looping */}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderColor: '#b4b4b4',
    borderRadius: 20,
    height: 100,
    padding: 13,
    marginVertical: 5,
  },
  buttonHabis: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 50,
    fontSize: 10,
    color: '#970000',
  },
  button: {
    borderWidth: 1,
    borderColor: '#42BB5D',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 50,
    fontSize: 10,
    color: '#42BB5D',
  },
});
export default Travel;
