import AsyncStorage from '@react-native-community/async-storage';
import {Link, useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import NewIcon from 'react-native-vector-icons/Entypo';
import FSIcon from 'react-native-vector-icons/Feather';
const PesananDriver = () => {
  const [uId, setUId] = useState();
  const [getOrder, setGetOrder] = useState([]);
  AsyncStorage.getItem('auth-id', (error, result) => {
    setUId(result);
  });
  const isFocused = useIsFocused();

  useEffect(() => {
    getYourOrder();
  }, [isFocused, uId]);

  const getYourOrder = () => {
    axios.get('sanctum/csrf-cookie').then(res => {
      axios.get('api/order/show?did=' + uId).then(res => {
        setGetOrder(res.data);
      });
    });
  };

  return (
    <ScrollView style={{backgroundColor: '#f8f8f8', flex: 1}}>
      <View
        style={{
          backgroundColor: '#f8f8f8',
          display: 'flex',
          justifyContent: 'center',
          padding: 10,
          height: '100%',
          paddingBottom: 50,
        }}>
        {getOrder.length === 0 && (
          <View
            style={{
              backgroundColor: '#ecebeb',
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 10,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'grey'}}>Belum ada pesanan </Text>
          </View>
        )}
        {getOrder
          .sort((b, a) => a.id - b.id)
          .map((item, index) => (
            <TouchableOpacity style={styles.card} key={index}>
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
                    Driver : {item.driver.user.name}
                  </Text>
                </View>

                <Text
                  style={{
                    fontSize: 10,
                    color:
                      (item.status === 'Masuk' && '#bb0707') ||
                      (item.status === 'Diterima' && '#00460f') ||
                      (item.status === 'Diproses' && '#ff4800') ||
                      (item.status === 'Selesai' && 'grey'),
                    marginLeft: 5,
                  }}>
                  {item.status}
                </Text>
              </View>
              <Text style={{marginTop: 5, color: 'grey', fontSize: 12}}>
                {item.tanggal_keberangkatan}
              </Text>
              <Text style={{color: 'grey', fontSize: 12}}>
                Pukul {item.waktu_keberangkatan} WIB
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{color: 'grey', fontSize: 12}}>
                  Jumlah Kursi: {item.jumlah_kursi}
                </Text>
                <Link
                  to={{
                    screen: 'DetailPesanan',
                    params: {item},
                  }}
                  style={styles.link}>
                  {index === 0 ? (
                    <>
                      <Text>Terbaru</Text> <NewIcon name="new" />{' '}
                    </>
                  ) : (
                    <>
                      <Text style={{color: 'grey'}}>Lihat Detail</Text>
                      <FSIcon style={{color: 'grey'}} name="arrow-right" />
                    </>
                  )}
                </Link>
              </View>
            </TouchableOpacity>
          ))}
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
  button: {
    borderWidth: 1,
    borderColor: '#42BB5D',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 50,
    fontSize: 10,
    color: '#42BB5D',
  },
  link: {
    borderColor: '#42BB5D',
    paddingHorizontal: 10,
    borderRadius: 50,
    fontSize: 10,
    color: '#42BB5D',
  },
});
export default PesananDriver;
