import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import react, {useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  ScrollViewBase,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const DetailPesanan = params => {
  console.log('====================================');
  console.log(params.route.params.item);
  console.log('====================================');
  const [roleLocal, setRoleLocal] = useState();
  const isFocused = useIsFocused();
  const [uToken, setUToken] = useState();
  const [getStatus, setStatus] = useState(params.route.params.item.status);
  useEffect(() => {
    AsyncStorage.getItem('auth-role', (error, result) => {
      setRoleLocal(result);
    });
    AsyncStorage.getItem('auth-token', (error, result) => {
      setUToken(result);
    });
  }, [isFocused]);
  let config = {
    headers: {
      Authorization: 'Bearer ' + uToken,
    },
  };
  const handleTerima = event => {
    let data = {
      status: 'Diterima',
    };
    event.preventDefault();
    axios.get('sanctum/csrf-cookie').then(res => {
      axios
        .post(
          'api/order/proses?terima=' + params.route.params.item.id,
          data,
          config,
        )
        .then(res => {
          setStatus('Diterima');

          Alert.alert('Pesanan berhasil diterima');
        })
        .catch(err => {
          console.log(err);
        });
    });
  };
  const handleProses = event => {
    let data = {
      status: 'Diproses',
    };
    event.preventDefault();
    axios.get('sanctum/csrf-cookie').then(res => {
      axios
        .post(
          'api/order/proses?proses=' + params.route.params.item.id,
          data,
          config,
        )
        .then(res => {
          setStatus('Diproses');
          Alert.alert('Pesanan diproses');
        })
        .catch(err => {
          console.log(err);
        });
    });
  };
  const handleSelesai = event => {
    let data = {
      status: 'Selesai',
    };
    event.preventDefault();
    axios.get('sanctum/csrf-cookie').then(res => {
      axios
        .post(
          'api/order/proses?selesai=' + params.route.params.item.id,
          data,
          config,
        )
        .then(res => {
          setStatus('Selesai');
          Alert.alert('Pesanan Selesai');
        })
        .catch(err => {
          console.log(err);
        });
    });
  };
  return (
    <>
      <ScrollView style={{flex: 1, backgroundColor: '#f8f8f8'}}>
        <View
          style={{
            margin: 10,
            borderWidth: 1,
            borderColor: '#0781212c',
            padding: 10,
            borderRadius: 10,
            backgroundColor: 'white',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {/* Kiri */}
            <View style={{width: 150}}>
              <View style={{marginTop: 5}}>
                <Text style={styles.textTitle}>Dari</Text>
                <Text style={{marginLeft: 10, color: 'grey'}}>
                  {params.route.params.item.dari}
                </Text>
              </View>
              <View style={{marginTop: 5}}>
                <Text style={styles.textTitle}>Alamat</Text>
                <Text style={styles.textBody}>
                  {params.route.params.item.alamat_dari}
                </Text>
              </View>
              <View style={{marginTop: 5}}>
                <Text style={styles.textTitle}>Tanggal Berangkat</Text>
                <Text style={styles.textBody}>
                  {params.route.params.item.tanggal_keberangkatan}
                </Text>
              </View>
              <View style={{marginTop: 5}}>
                <Text style={styles.textTitle}>Jam Berangkat</Text>
                <Text style={styles.textBody}>
                  {params.route.params.item.waktu_keberangkatan} WIB
                </Text>
              </View>
              <View style={{marginTop: 5}}>
                <Text style={styles.textTitle}>Jumlah Kursi</Text>
                <Text style={styles.textBody}>
                  {params.route.params.item.jumlah_kursi}
                </Text>
              </View>
            </View>
            {/* end Kiri */}
            {/* Kanan */}
            <View style={{width: 100}}>
              <View style={{marginTop: 5}}>
                <Text style={styles.textTitle}>Tujuan</Text>
                <Text style={{marginLeft: 10, color: 'grey'}}>
                  {params.route.params.item.ke}{' '}
                </Text>
              </View>
              <View style={{marginTop: 5}}>
                <Text style={styles.textTitle}>Alamat</Text>
                <Text style={{marginLeft: 10, color: 'grey'}}>
                  {params.route.params.item.alamat_tujuan}
                </Text>
              </View>
              <View style={{marginTop: 150}}>
                <Text style={styles.textTitle}>Total</Text>
                <Text style={styles.textBody}>
                  Rp {150000 * params.route.params.item.jumlah_kursi},-
                </Text>
              </View>
            </View>
            {/* end Kanan */}
          </View>
          <View
            style={{
              margin: 10,
              borderWidth: 1,
              borderColor: '#0781212c',
              padding: 10,
              borderRadius: 10,
              backgroundColor: 'white',
            }}>
            <Text style={{color: '#777777', fontWeight: '700', fontSize: 15}}>
              Informasi Driver
            </Text>
            <View
              style={{
                marginTop: 5,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <View style={{marginTop: 5}}>
                <Text style={styles.textTitle}>Nama Driver</Text>
                <Text style={styles.textBody}>
                  {params.route.params.item.driver.user.name}
                </Text>
              </View>
              <View style={{marginTop: 5}}>
                <Text style={styles.textTitle}>Jenis Mobil</Text>
                <Text style={styles.textBody}>
                  {params.route.params.item.driver.jenis_mobil}
                </Text>
              </View>
              <View
                style={{
                  marginTop: 20,
                  borderLeftWidth: 1,
                  //   borderLeftColor: '#0781212c',
                  borderLeftColor: '#bbb6b6',
                  marginLeft: 10,
                }}>
                {getStatus === 'Masuk' && (
                  <View>
                    <Icon
                      name="circle"
                      style={{
                        position: 'absolute',
                        left: -6,
                        top: -9,
                        color: '#bbb6b6',
                      }}
                    />
                    <Text
                      style={{
                        marginLeft: 10,
                        marginTop: -11,
                        color: 'grey',
                        fontSize: 12,
                      }}>
                      Menunggu Driver Menerima Pesanan
                    </Text>
                  </View>
                )}
                {getStatus === 'Diterima' && (
                  <>
                    <View>
                      <Icon
                        name="circle"
                        style={{
                          position: 'absolute',
                          left: -6,
                          top: -9,
                          color: '#42BB5D',
                        }}
                      />
                      <Text
                        style={{
                          marginLeft: 10,
                          marginTop: -11,
                          fontSize: 12,
                          color: '#42BB5D',
                        }}>
                        Pesanan Diterima
                      </Text>
                    </View>
                    <View style={{marginTop: 20}}>
                      <Icon
                        name="circle"
                        style={{
                          position: 'absolute',
                          left: -6,
                          top: -9,
                          color: '#bbb6b6',
                        }}
                      />
                      <Text
                        style={{
                          marginLeft: 10,
                          marginTop: -11,
                          fontSize: 12,
                          color: 'grey',
                        }}>
                        Sedang dalam perjalanan
                      </Text>
                    </View>
                  </>
                )}
                {getStatus === 'Diproses' && (
                  <>
                    <View>
                      <Icon
                        name="circle"
                        style={{
                          position: 'absolute',
                          left: -6,
                          top: -9,
                          color: '#42BB5D',
                        }}
                      />
                      <Text
                        style={{
                          marginLeft: 10,
                          marginTop: -12,
                          fontSize: 12,
                          color: '#42BB5D',
                        }}>
                        Pesanan Diterima
                      </Text>
                    </View>
                    <View style={{marginTop: 20}}>
                      <Icon
                        name="circle"
                        style={{
                          position: 'absolute',
                          left: -6,
                          top: -9,
                          color: '#42BB5D',
                        }}
                      />
                      <Text
                        style={{
                          marginLeft: 10,
                          marginTop: -12,
                          fontSize: 12,
                          color: '#42BB5D',
                        }}>
                        Sedang dalam perjalanan
                      </Text>
                    </View>
                    <View style={{marginTop: 20}}>
                      <Icon
                        name="circle"
                        style={{
                          position: 'absolute',
                          left: -6,
                          top: -9,
                          color: '#bbb6b6',
                        }}
                      />
                      <Text
                        style={{
                          marginLeft: 10,
                          marginTop: -12,
                          fontSize: 12,
                          color: '#bbb6b6',
                        }}>
                        Pesanan Selesai
                      </Text>
                    </View>
                  </>
                )}
                {getStatus === 'Selesai' && (
                  <>
                    <View>
                      <Icon
                        name="circle"
                        style={{
                          position: 'absolute',
                          left: -6,
                          top: -9,
                          color: '#42BB5D',
                        }}
                      />
                      <Text
                        style={{
                          marginLeft: 10,
                          marginTop: -12,
                          fontSize: 12,
                          color: '#42BB5D',
                        }}>
                        Pesanan Diterima
                      </Text>
                    </View>
                    <View style={{marginTop: 20}}>
                      <Icon
                        name="circle"
                        style={{
                          position: 'absolute',
                          left: -6,
                          top: -9,
                          color: '#42BB5D',
                        }}
                      />
                      <Text
                        style={{
                          marginLeft: 10,
                          marginTop: -12,
                          fontSize: 12,
                          color: '#42BB5D',
                        }}>
                        Sedang Dalam Perjalanan
                      </Text>
                    </View>
                    <View style={{marginTop: 20}}>
                      <Icon
                        name="circle"
                        style={{
                          position: 'absolute',
                          left: -6,
                          top: -9,
                          color: '#42BB5D',
                        }}
                      />
                      <Text
                        style={{
                          marginLeft: 10,
                          marginTop: -12,
                          fontSize: 12,
                          color: '#42BB5D',
                        }}>
                        Pesanan Selesai
                      </Text>
                    </View>
                  </>
                )}
              </View>
            </View>
          </View>
          {roleLocal === 'driver' && (
            <>
              {getStatus === 'Masuk' && (
                <TouchableOpacity onPress={handleTerima} style={styles.button}>
                  <Text style={{color: '#fff', fontWeight: 'bold'}}>
                    Terima Pesanan
                  </Text>
                </TouchableOpacity>
              )}
              {getStatus === 'Diterima' && (
                <TouchableOpacity onPress={handleProses} style={styles.buttonProses}>
                  <Text style={{color: '#fff', fontWeight: 'bold'}}>
                    Proses Pesanan
                  </Text>
                </TouchableOpacity>
              )}
              {getStatus === 'Diproses' && (
                <TouchableOpacity onPress={handleSelesai} style={styles.buttonSelesai}>
                  <Text style={{color: '#fff', fontWeight: 'bold'}}>
                    Pesanan Selesai
                  </Text>
                </TouchableOpacity>
              )}
              {getStatus === 'Selesai' && (
                <View style={styles.textSelesai}>
                  <Text style={{color: 'grey', fontWeight: 'normal'}}>
                    Pesanan Selesai ❤️
                  </Text>
                </View>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </>
  );
};
//
const styles = StyleSheet.create({
  textTitle: {
    color: '#777777',
    fontWeight: '700',
    fontSize: 15,
  },
  textBody: {
    marginLeft: 10,
    color: 'grey',
  },
  button: {
    backgroundColor: '#42BB5D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonProses: {
    backgroundColor: '#b38300',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonSelesai: {
    backgroundColor: '#860505',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  textSelesai: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
});
export default DetailPesanan;
