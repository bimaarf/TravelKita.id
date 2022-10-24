import {Link, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
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
} from 'react-native';
import SelectPicker from 'react-native-form-select-picker';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-community/async-storage';
const Home = () => {
  const navRedirect = useNavigation();
  const [selectedFrom, setSelectedFrom] = useState('0');
  const [selectedTo, setSelectedTo] = useState('0');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [formInput, setFormInput] = useState({
    dari: selectedFrom,
    tujuan: selectedTo,
    tanggal_berangkat:
      date.getDate() + ' - ' + date.getMonth() + ' - ' + date.getFullYear(),
  });
  const handleChangeInput = (text, input) => {
    setFormInput({...formInput, [input]: text});
  };
  const handleSubmit = event => {
    event.preventDefault();
    console.log(formInput);
    AsyncStorage.setItem('form-dari', formInput.dari);
    AsyncStorage.setItem('form-tujuan', formInput.tujuan);
    AsyncStorage.setItem(
      'form-tanggal-berangkat',
      date.getDate() + ' - ' + date.getMonth() + ' - ' + date.getFullYear(),
    );
    navRedirect.navigate('Travel', {tanggalProps:  date.getDate() + ' - ' + date.getMonth() + ' - ' + date.getFullYear()});
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
        <Text style={{color: '#42BB5D'}}>Dari</Text>
        <View style={{marginHorizontal: 10}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
            <Icon name="car" style={{color: '#42BB5D', marginRight: 10}} />
            <SelectPicker
              name="dari"
              style={styles.input}
              onValueChange={value => handleChangeInput(value, 'dari')}
              selected={selectedFrom}>
              <SelectPicker.Item label="-Pilih-" value="0" />
              <SelectPicker.Item label="Pontianak" value="Pontianak" />
              <SelectPicker.Item label="Sambas" value="Sambas" />
            </SelectPicker>
          </View>
        </View>

        <Text style={{color: '#42BB5D'}}>Tujuan</Text>
        <View style={{marginHorizontal: 10}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
            <Icon name="car" style={{color: '#42BB5D', marginRight: 10}} />
            <SelectPicker
              style={styles.input}
              name="tujuan"
              onValueChange={value => handleChangeInput(value, 'tujuan')}
              selected={selectedTo}>
              <SelectPicker.Item label="-Pilih-" value="0" />
              <SelectPicker.Item label="Pontianak" value="Pontianak" />
              <SelectPicker.Item label="Sambas" value="Sambas" />
            </SelectPicker>
          </View>
        </View>
        <View>
          <Text style={{color: '#42BB5D'}}>Tanggal Berangkat</Text>
          <TextInput
            type="text"
            style={styles.input}
            placeholder={toString(date)}
            onPressIn={() => setOpen(true)}
            value={
              date.getDate() +
              ' - ' +
              date.getMonth() +
              ' - ' +
              date.getFullYear()
            }
            name="tanggal_berangkat"
            onChangeText={text => handleChangeInput(text, 'tanggal_berangkat')}
          />
          <DatePicker
            style={{width: 200}}
            modal
            open={open}
            date={date}
            mode="datetime"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="2016-05-01"
            maxDate="2030-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onConfirm={date => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>

        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            width: '50%',
          }}></View>

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>Cari</Text>
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
  menu: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
});
export default Home;
