import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Button,
  Alert
} from 'react-native';
import { LoginUser } from '../Redux/Actions/TaxLeaf';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Loader } from '../Component/Loader';
const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const bgImage = require('../Assets/img/login-mainbg.jpg');
  const [email, setEmail] = useState();
  const onChangeEmail = text => {
    setEmail(text);
  };
  const onLogin = () => {
    setLoader(true);
    if (email) {
      dispatch(LoginUser(email, navigation));

    } else {
      Alert.alert('Please Enter Email Address')
    }
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  };
  return (
    <>
      <ImageBackground source={bgImage} style={styles.bgImg} resizeMode="cover">
        <Loader flag={loader} />
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                marginBottom: 20,
                width: wp(90),
                alignSelf: 'center',
              }}>
              <Image
                source={require('../Assets/img/logo.png')}
                style={styles.logo}
              />
            </View>

            <View style={styles.formContainer}>
              <TextInput
                placeholder="Enter Email"
                placeholderTextColor={'lightgrey'}
                style={[styles.input, { height: 50 }]}
                value={email}
                onChangeText={text => {
                  onChangeEmail(text);
                }}
              />

              <TouchableOpacity
                onPress={() => onLogin()}
                style={[styles.button, styles.buttonClose]}
              // onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Login1</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* <View style={styles.container}>
          <Image
            source={require('../Assets/img/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.text}>Sign in to start your session</Text>

          <TextInput
            placeholder="Enter Email"
            placeholderTextColor={'lightgrey'}
            style={[styles.input, {Height: 50}]}
            value={email}
            onChangeText={text => {
              onChangeEmail(text);
            }}
          />
          <TouchableOpacity
            onPress={() => onLogin()}
            style={{width: '70%', alignSelf: 'center', marginBottom: 30}}>
            <Button
              title="Login With Office 365"
              color="#1C84C6"
              // onPress={() => setModalVisible(true)}
            />
          </TouchableOpacity>
        </View> */}
        {/* <Text style={styles.footerText}>
          © 2023 taxleaf.com - All Rights Reserved Login
        </Text> */}
      </ImageBackground>
      {/* <View>
        <Image
          source={require('../Assets/img/bigbubble.png')}
          style={styles.footerImg}
        />
      </View> */}
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  bgImg: {
    height: '100%',
    // // width:'100%',
    // resizeMode:'cover'
  },
  container: {
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 120,
    padding: 10,
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  text: {
    color: '#676A6C',
    marginVertical: 30,
  },

  footerImg: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 140,
  },

  footerText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#676A6C',
  },

  formContainer: {
    backgroundColor: '#2F4050',
    width: wp(90),
    height: wp(40),
    justifyContent: 'center',
    padding: 10,
    alignSelf: 'center',
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: wp(80),
    backgroundColor: '#fff',
  },
  //   input: {
  //     height: 35,
  //     // margin: 12,
  //     borderRadius: 10,
  //     borderWidth: 1,
  //     padding: 10,
  //     width: 180,
  //   },
  centeredView: {
    flex: 1,

    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    // marginTop: 22,
  },
  modalView: {
    //margin: 20,

    backgroundColor: 'white',
    //borderRadius: 20,
    padding: 35,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: 120,
    alignSelf: 'center',
  },
  buttonOpen: {
    backgroundColor: '#8AB645',
  },
  buttonClose: {
    backgroundColor: '#8AB645',
    width: wp(80),
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
