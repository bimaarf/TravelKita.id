import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import react, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
const Chatting = chatParams => {
  const isFocused = useIsFocused();
  useEffect(() => {
    console.log('=================in chat===================');
    // console.log(chatParams.route.params.chatParams);
  }, [isFocused]);
  const [formInput, setFormInput] = useState({
    message: '',
  });
  const handleChangeInput = (text, input) => {
    setFormInput({...formInput, [input]: text});
  };
  const refChat = useRef();
  const [uId, setUId] = useState();
  const [roleLocal, setRoleLocal] = useState();
  useEffect(() => {
    AsyncStorage.getItem('auth-role', (error, result) => {
      setRoleLocal(result);
    });
    AsyncStorage.getItem('auth-id', (error, result) => {
      setUId(result);
    });
  }, [isFocused]);
  let timer;
  useEffect(() => {
    timer = setInterval(() => {
      getChatsRequest();
      console.log('hai');
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const [getChats, setChats] = useState([]);
  const getChatsRequest = async () => {
    await axios.get('sanctum/csrf-cookie').then(res => {
      axios
        .get(
          'api/chatting/show?order_id=' + chatParams.route.params.chatParams.id,
        )
        .then(res => {
          setChats(res.data);
        });
    });
  };
  const handleSubmit = () => {
    let toValue;
    roleLocal === 'user' &&
      (toValue = chatParams.route.params.chatParams.driver_id);
    roleLocal === 'driver' &&
      (toValue = chatParams.route.params.chatParams.user_id);
    let data = {
      message: formInput.message,
      order_id: chatParams.route.params.chatParams.id,
      from: uId,
      to: toValue,
    };
    axios.get('sanctum/csrf-cookie').then(res => {
      axios.post('api/chatting/store', data).then(res => {
        console.log(res.data.status);
        if (res.data.status === 200) {
          setFormInput({message: ''});
          refChat.current.scrollToEnd({animated: true});
        }
      });
    });
  };
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
        <ScrollView
          ref={refChat}
          onContentSizeChange={() =>
            refChat.current.scrollToEnd({animated: true})
          }
          style={{marginBottom: 70, paddingHorizontal: 10, marginTop: 10}}>
          {getChats.length === 0 && (
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
              <Text style={{color: 'grey'}}>Belum ada pesan </Text>
            </View>
          )}
          {/* looping */}
          {getChats.map((item, index) => (
            <View key={index}>
              {item.from != uId ? (
                <>
                  {/* other */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    {roleLocal === 'user' ? (
                      <Icon
                        name="car"
                        style={{marginRight: 10, color: '#0a8023'}}
                        size={20}
                      />
                    ) : (
                      <Icon name="user" style={{color: '#0a8023'}} size={20} />
                    )}
                    <Text
                      style={{
                        backgroundColor: '#f0f0f0',
                        padding: 13,
                        borderRadius: 5,
                        width: '80%',
                        color: 'black',
                      }}>
                      {item.message}
                    </Text>
                  </View>
                  {/* end other */}
                </>
              ) : (
                <>
                  {/* You */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      marginTop: 10,
                    }}>
                    <Text
                      style={{
                        backgroundColor: '#41a051',
                        padding: 13,
                        borderRadius: 5,
                        width: '80%',
                        marginRight: 10,
                        color: 'white',
                      }}>
                      {item.message}
                    </Text>
                    {roleLocal === 'driver' ? (
                      <Icon
                        name="car"
                        style={{marginRight: 10, color: '#0a8023'}}
                        size={20}
                      />
                    ) : (
                      <Icon name="user" style={{color: '#0a8023'}} size={20} />
                    )}
                  </View>
                  {/* end You */}
                </>
              )}
              {/* -------------------- */}
            </View>
          ))}
          {/* end looping */}
        </ScrollView>
        <View style={styles.submitButton}>
          <TextInput
            placeholderTextColor="grey"
            type="text"
            onChangeText={text => handleChangeInput(text, 'message')}
            value={formInput.message}
            style={styles.input}
            name="message"
            placeholder="Ketikkan sesuatu..."
          />
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              position: 'absolute',
              right: 10,
              padding: 20,
              color: 'grey',
            }}
            size={100}>
            <IconEntypo name="paper-plane" size={30} color="grey" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  submitButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    color: 'black',
    width: '100%',
  },
});

export default Chatting;
