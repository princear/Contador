import {StyleSheet, Text, View, Image, Alert} from 'react-native';
import React, {useEffect} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Color} from '../Style';

const Splash = () => {
  const navigation = useNavigation();

  const gotoSignInScreen = async () => {
    // Alert.alert('hiii');

    setTimeout(function async() {
      navigation.navigate('Login');
    }, 2000);
  };

  useEffect(() => {
    gotoSignInScreen();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../Assets/img/logo.png')} style={styles.logo} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    // backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 100,
    width: 180,
    resizeMode: 'contain',
  },
});
