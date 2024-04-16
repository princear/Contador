import React, { useState } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { TextInput } from 'react-native-gesture-handler';
// import { useIsFocused, useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useIsFocused, useNavigation } from '@react-navigation/native';

const Drawer1 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.headImg}>
        <Image source={require('../Assets/img/logo.png')} style={styles.logo} />
      </View>
      <View style={{ textAlign: 'center' }}>
        <Image
          source={require('../Assets/profileBlank.png')}
          style={styles.profileImg}
        />
        <Text style={styles.headText}>Prince Eastsons</Text>
        <Text style={styles.headText}>TL MDADE</Text>
      </View>
      <View style={{ marginTop: 50 }}>
        <View style={styles.part}></View>
        <TouchableOpacity
          style={styles.screenName}
          onPress={() => {
            navigation.navigate('Dashboard');
          }}>
          <Text style={styles.screenNameText}>Home</Text>
        </TouchableOpacity>
        {/* <View style={styles.part}></View> */}
      </View>
      <View>
        <View style={styles.part}></View>
        <TouchableOpacity
          style={styles.screenName}
          onPress={() => {
            navigation.navigate('ClientInfo');
          }}>
          <Text style={styles.screenNameText}>Client Info</Text>
        </TouchableOpacity>
        {/* <View style={styles.part}></View> */}
      </View>
      <View>
        <View style={styles.part}></View>
        <TouchableOpacity
          style={styles.screenName}
          onPress={() => {
            navigation.navigate('Manager');
          }}>
          <Text style={styles.screenNameText}>Manager</Text>
        </TouchableOpacity>
        {/* <View style={styles.part}></View> */}
      </View>
      <View>
        <View style={styles.part}></View>
        <TouchableOpacity
          style={styles.screenName}
          onPress={() => {
            navigation.navigate('Payments');
          }}>
          <Text style={styles.screenNameText}>Payments</Text>
        </TouchableOpacity>
        {/* <View style={styles.part}></View> */}
      </View>
      <View>
        <View style={styles.part}></View>
        <TouchableOpacity
          style={styles.screenName}
          onPress={() => {
            navigation.navigate('FileCabinet');
          }}>
          <Text style={styles.screenNameText}>File Cabinet</Text>
        </TouchableOpacity>
        {/* <View style={styles.part}></View> */}
      </View>
      <View>
        <View style={styles.part}></View>
        <TouchableOpacity
          style={styles.screenName}
          onPress={() => {
            navigation.navigate('Requests');
          }}>
          <Text style={styles.screenNameText}>Requests</Text>
        </TouchableOpacity>
        <View style={styles.part}></View>
      </View>
    </View>
  );
};

export default Drawer1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F4050',
    // padding: 10,
  },
  head: {
    height: hp(10),
    // backgroundColor: "red"
    flexDirection: 'row',
  },
  subText: {
    color: '#fff',
  },
  logoicons: {
    height: 80,
    width: 80,
  },
  icons: {
    height: 25,
    width: 25,
  },
  MenuLIstContainer: {
    padding: 10,
    marginTop: 10,
  },
  LastText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Poppins-Italic',
    marginLeft: 20,
  },
  MenuLIst: {
    flexDirection: 'row',
    // padding: 10,
    // marginTop: 20
  },
  menusublist: {
    marginLeft: 50,
  },
  MenuHead: {
    padding: 5,
    fontSize: 16,
    color: 'yellow',
  },
  SocialMainContainer: {
    height: 40,
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  SocialContainer: {
    height: 30,
    width: '12%',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  verticleLine: {
    height: 100,
    width: 2,
    backgroundColor: 'yellow',
  },
  logo: {
    width: '55%',
    height: 60,
    alignSelf: 'center',
  },
  headImg: {
    backgroundColor: '#F3F3F3',
    padding: 10,
  },
  profileImg: {
    width: '40%',
    height: 110,
    borderRadius: 120,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  headText: {
    textAlign: 'center',
    color: '#000',
    marginBottom: 10,
    color: '#fff',
    fontWeight: '600',
  },
  part: {
    borderWidth: 0.5,
    borderColor: '#A7B1C2',
  },
  screenName: {
    marginVertical: 10,
  },
  screenNameText: {
    color: '#fff',
    marginLeft: 30,
    marginVertical: 9,
    fontWeight: '600',
  },
});
