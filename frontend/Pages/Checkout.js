import {Link, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import SelectPicker from 'react-native-form-select-picker';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
const Checkout = props => {
  propsParse = props.route.params.props;
  // console.log('Propsnya', JSON.parse(propsParse).waktu_keberangkatan);
  const navRedirect = useNavigation();
  const [selectedFrom, setSelectedFrom] = useState();
  const [selectedTo, setSelectedTo] = useState();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState();
  const [openTime, setOpenTime] = useState(false);
  const [jenisMobil, setJenisMobil] = useState(
    JSON.parse(propsParse).jenis_mobil,
  );
  const [jumlahKursi, setJumlahKursi] = useState('0');

  AsyncStorage.getItem('form-dari', (error, result) => {
    setSelectedFrom(result);
  });
  AsyncStorage.getItem('form-tujuan', (error, result) => {
    setSelectedTo(result);
  });
  const [tgl, setTgl] = useState();
  AsyncStorage.getItem('form-tanggal-berangkat', (error, result) => {
    setTgl(result);
  });
  const [uToken, setUToken] = useState();
  AsyncStorage.getItem('auth-token', (error, result) => {
    setUToken(result);
  });
  const [formInput, setFormInput] = useState({
    dari: selectedFrom,
    dari_alamat: '',
    ke: selectedTo,
    tujuan_alamat: '',
    tanggal_berangkat: tgl,
    jenis_mobil: JSON.parse(propsParse).jenis_mobil,
    jumlah_kursi: jumlahKursi,
    jam_berangkat: JSON.parse(propsParse).waktu_keberangkatan,
  });

  const handleChangeInput = (text, input) => {
    setFormInput({...formInput, [input]: text});
  };
  const handleSubmit = e => {
    // store data / Checkouts to tb_order
    e.preventDefault();
    let data = JSON.stringify({
      driver_id: JSON.parse(propsParse).id,
      dari: selectedFrom,
      alamat_dari: formInput.dari_alamat,
      ke: selectedTo,
      alamat_tujuan: formInput.tujuan_alamat,
      tanggal_keberangkatan: tgl,
      waktu_keberangkatan: JSON.parse(propsParse).waktu_keberangkatan,
      jumlah_kursi: jumlahKursi,
      jenis_mobil: JSON.parse(propsParse).jenis_mobil,
    });
    let config = {
      headers: {
        Authorization: 'Bearer ' + uToken,
      },
    };
    axios.get('sanctum/csrf-cookie').then(res => {
      axios
        .post(`api/order/store`, data, config)
        .then(res => {
          if (res.data.status === 200) {
            console.log('====================================');
            console.log('sukses');
            console.log('====================================');
            navRedirect.navigate('Navbar', {
              screen: 'Pesanan',
            });
          }
          if (res.data.status === 201) {
            console.log('====================================');
            console.log('201');
            console.log('====================================');
            navRedirect.navigate('Navbar');
          }
        })
        .catch(err => {
          console.log('====================================');
          console.log(err);
          console.log('====================================');
        });
    });
  };
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View
        style={{
          backgroundColor: '#fff',
          display: 'flex',
          justifyContent: 'center',
          padding: 20,
          height: '100%',
          paddingBottom: 50,
        }}>
        <View style={{borderWidth: 1, borderColor: '#f0f0f0', padding: 20}}>
          <View>
            <Text style={{color: '#42BB5D'}}>Dari</Text>
            <TextInput
              placeholderTextColor="grey"
              style={styles.input}
              name="dari"
              onChangeText={text => handleChangeInput(text, 'dari')}
              value={selectedFrom}
              placeholder="e.g. Jl. Merpati No.30"
              editable={false}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text style={{color: '#42BB5D'}}>Alamat Lengkap </Text>
            <TextInput
              placeholderTextColor="grey"
              style={styles.input}
              name="dari_alamat"
              onChangeText={text => handleChangeInput(text, 'dari_alamat')}
              value={formInput.dari_alamat}
              placeholder="e.g. Jl. Merpati No.30"
            />
          </View>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#f0f0f0',
            padding: 20,
            marginTop: 10,
          }}>
          <View>
            <Text style={{color: '#42BB5D'}}>Tujuan</Text>
            <TextInput
              placeholderTextColor="grey"
              style={styles.input}
              name="tujuan"
              onChangeText={text => handleChangeInput(text, 'tujuan')}
              value={selectedTo}
              placeholder="e.g. Jl. Merpati No.30"
              editable={false}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text style={{color: '#42BB5D'}}>Alamat Lengkap </Text>
            <TextInput
              placeholderTextColor="grey"
              style={styles.input}
              name="tujuan_alamat"
              value={formInput.tujuan_alamat}
              onChangeText={text => handleChangeInput(text, 'tujuan_alamat')}
              placeholder="e.g. Jl. Merpati No.30"
            />
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <View style={{marginRight: 10, flex: 1}}>
            <Text style={{color: '#42BB5D'}}>Tanggal Berangkat</Text>
            <TextInput
              type="text"
              style={styles.input}
              placeholder={toString(date)}
              onPressIn={() => setOpen(true)}
              value={tgl}
              name="tanggal_berangkat"
              onChangeText={text =>
                handleChangeInput(text, 'tanggal_berangkat')
              }
              editable={false}
            />
          </View>
          <View style={{marginLeft: 10, flex: 1}}>
            <Text style={{color: '#42BB5D'}}>Jam Berangkat</Text>
            <TextInput
              placeholderTextColor="grey"
              type="text"
              style={styles.input}
              value={formInput.jam_berangkat}
              name="jam_berangkat"
              editable={false}
              onChangeText={text => handleChangeInput(text, 'jam_berangkat')}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
          }}>
          <View style={{flex: 1, marginRight: 3}}>
            <Text style={{color: '#42BB5D'}}>Jenis Mobil</Text>
            <TextInput
              placeholderTextColor="grey"
              type="text"
              style={styles.input}
              value={formInput.jenis_mobil}
              name="jenis_mobil"
              editable={false}
              onChangeText={text => handleChangeInput(text, 'jenis_mobil')}
            />
          </View>
          <View style={{flex: 1, marginLeft: 3}}>
            <Text style={{color: '#42BB5D'}}>Jumlah Kursi </Text>
            <SelectPicker
              style={styles.input}
              onValueChange={value => {
                setJumlahKursi(value);
              }}
              selected={jumlahKursi}>
              <SelectPicker.Item label="-Pilih-" value="0" />
              <SelectPicker.Item label="1" value="1" />
              <SelectPicker.Item label="2" value="2" />
              <SelectPicker.Item label="3" value="3" />
              <SelectPicker.Item label="4" value="4" />
              <SelectPicker.Item label="5" value="5" />
              <SelectPicker.Item label="6" value="6" />
            </SelectPicker>
          </View>
        </View>

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>
            Pesan Sekarang
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
export default Checkout;
