import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Color } from '../Style';

const CustomBottomTab = () => {
  const iconNm = require('../Assets/img/icons/home.png');
  const iconClint = require('../Assets/img/icons/group.png');
  const iconFile = require('../Assets/img/icons/files-white.png');
  const iconRe = require('../Assets/img/icons/product-request.png');
  const navigation = useNavigation();
  return (
    <View
      style={{
        position: 'absolute',
        //flex: 1,
        bottom: 0,
        alignSelf: 'flex-end',
        width: wp(100),
        justifyContent: 'center',
        backgroundColor: Color.darkGreen,
        paddingHorizontal: 22
      }}>
      <View
        style={{
          flexDirection: 'row',
          // position:'absolute',
          bottom: 0,
          alignSelf: 'center',
          borderTopColor: '#E5E5E5',
          borderTopWidth: 1,
          width: wp(95),
          justifyContent: 'space-between',
          backgroundColor: Color.darkGreen,
          height: 80,
          paddingHorizontal: 22

        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Dashboard')}
          style={{
            // flexDirection: 'row',
            padding: 8,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            //  backgroundColor: 'red',
          }}>
          <Image source={iconNm} style={{ width: 25, height: 25 }} />

          <Text
            style={{
              alignSelf: 'center',
              color: Color.white,
              // borderBottomWidth: 2,
              // borderBottomColor: Color.geen,
              paddingBottom: 5,
              fontSize: 10,
              fontWeight: 'bold',
            }}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ClientInfo')}
          style={{
            // flexDirection: 'row',
            padding: 8,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginLeft: wp(5),
            // backgroundColor: 'yellow',
          }}>
          <Image source={iconClint} style={{ width: 25, height: 25 }} />

          <Text
            style={{
              alignSelf: 'center',
              color: Color.white,
              // borderBottomWidth: 2,
              // borderBottomColor: Color.geen,
              paddingBottom: 5,
              fontSize: 10,
              fontWeight: 'bold',
            }}>
            Clients
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('FileCabinet')}
          style={{
            // flexDirection: 'row',
            padding: 8,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            position: 'relative',
            left: wp(1),
            // backgroundColor: 'red',
          }}>
          <Image source={iconFile} style={{ width: 25, height: 25 }} />

          <Text
            style={{
              alignSelf: 'center',
              color: Color.white,
              // borderBottomWidth: 2,
              // borderBottomColor: Color.geen,
              paddingBottom: 5,
              fontSize: 10,
              fontWeight: 'bold',
            }}>
            File Cabinet
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Requests')}
          style={{
            // flexDirection: 'row',
            padding: 8,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            position: 'relative',
            left: wp(1),
            //    backgroundColor: 'yellow',
          }}>
          <Image source={iconRe} style={{ width: 25, height: 25 }} />

          <Text
            style={{
              alignSelf: 'center',
              color: Color.white,
              // borderBottomWidth: 2,
              // borderBottomColor: Color.geen,
              paddingBottom: 5,
              fontSize: 10,
              fontWeight: 'bold',
            }}>
            Request
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomBottomTab;
