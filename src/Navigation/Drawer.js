import React, { useState } from 'react';

import { authorize, revoke } from 'react-native-app-auth';
import { LOGIN_DATA } from "../Redux/Actions/types";
import AsyncStorage from "@react-native-community/async-storage";
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
import { Loader } from '../Component/Loader';
import AppIntroSlider from 'react-native-app-intro-slider';
import { TextInput } from 'react-native-gesture-handler';
// import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { useIsFocused, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';

const Drawer = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  // const { MY_INFO } = useSelector(state => state.TaxLeafReducer);
  // const jsonData = MY_INFO.staffview;
  // const jsonData1 = MY_INFO.officeInfo;


  const AuthConfig = {


    appId: "17f808bd-072c-4b60-8ca9-e86199b17f79",
    //appId: '766090b1-948f-4eb3-ad69-9fc723b4e7d8',

    tenantId: "9728fcf8-f04b-4271-b352-022a33fbfcc4",
    scopes: ['openid', 'profile', 'email', 'user.read', 'user.write'], // Include 'email' scope to request user's email
    responseType: 'id_token token',
  };


  const config = {
    //warmAndPrefetchChrome: true,
    issuer: 'https://login.microsoftonline.com/9728fcf8-f04b-4271-b352-022a33fbfcc4', // Replace with your Azure AD tenant ID

    clientId: AuthConfig.appId,
    // redirectUrl: Platform.OS === 'ios' ? 'urn:ietf:wg:oauth:2.0:oob' : 'msauth://com.taxleaf/VzSiQcXRmi2kyjzcA%2BmYLEtbGVs%3D',
    redirectUrl: 'msauth://com.taxleaf/VzSiQcXRmi2kyjzcA%2BmYLEtbGVs%3D',
    //redirectUrl: 'https://stagingclientportal.taxleaf.com/MicrosoftConnect',
    scopes: AuthConfig.appScopes,
    response_mode: 'query',
    responseType: 'id_token token',
    additionalParameters: {
      prompt: 'login',

    },
    dangerouslyAllowInsecureHttpRequests: true,
    serviceConfiguration: {
      authorizationEndpoint: 'https://login.microsoftonline.com/' + AuthConfig.tenantId + '/oauth2/v2.0/authorize',
      revocationEndpoint: 'https://login.microsoftonline.com/' + AuthConfig.tenantId + '/revoke',
      tokenEndpoint: 'https://login.microsoftonline.com/' + AuthConfig.tenantId + '/oauth2/v2.0/token',
      responseType: 'id_token token',
    }


  }



  const signOut = async () => {
    setLoader(true)
    try {
      // Revoke the token(s) and perform any additional sign-out actions
      let logoutToken = await revoke(config, { tokenToRevoke: 'accessToken' });
      console.log(logoutToken, 'JJJJJJJJJJJJJJJJJJJJ')
      AsyncStorage.clear();
      // let obj = "";
      // dispatch({
      //   type: LOGIN_DATA,
      //   payload: obj,
      // });

      // Navigate to your app's sign-in screen or perform any other action
      // For example, you can use React Navigation to navigate to the login screen
      navigation.navigate('home');
    } catch (error) {
      console.error('Sign-out error:', error);
    }

    setTimeout(() => {
      setLoader(false)
    }, 2000);
  };


  return (
    <SafeAreaView style={styles.container}>
      <Loader flag={loader} />
      <View style={styles.headImg}>
        <Image source={require('../Assets/img/logo.png')} style={styles.logo} />
      </View>

      {/* <View style={{textAlign: 'center'}}>
        <Image
          source={require('../Assets/profileBlank.png')}
          style={styles.profileImg}
        />
        <Text style={styles.headText}>
          {jsonData?.firstName} {jsonData?.lastName}
        </Text>
        <Text style={styles.headText}>{jsonData1?.officeId}</Text>
      </View> */}

      <View style={{ marginTop: 0 }}>
        <View style={styles.part}></View>
        <TouchableOpacity
          style={styles.screenName}
          onPress={() => {
            navigation.navigate('Dashboard');
          }}>
          {/* <Icon2 style={styles.icon} name="home" size={20} color="#fff" /> */}
          <Image
                  source={ require('../Assets/img/icons/home.png')}
                  style={  [styles.icons,]}
                />
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
          {/* <Icon2 style={styles.icon} name="groups" size={20} color="#fff" /> */}
          <Image
                  source={ require('../Assets/img/icons/group.png')}
                  style={  [styles.icons,]}
                />
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
          {/* <Icon2 style={styles.icon} name="person" size={20} color="#fff" /> */}
               <Image
                  source={ require('../Assets/img/icons/userM.png')}
                  style={  [styles.icons,]}
                />
          <Text style={styles.screenNameText}>Manager</Text>

        </TouchableOpacity>

        {/* <View style={styles.part}></View> */}
      </View>
      <View>
        <View style={styles.part}></View>

        <TouchableOpacity
          style={styles.screenName}
          onPress={() => {
            navigation.navigate('PaymentsContain');
          }}>
          {/* <Icon2 style={styles.icon} name="payment" size={20} color="#fff" /> */}
          <Image
                  source={ require('../Assets/img/icons/transaction.png')}
                  style={  [styles.icons,]}
                />
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
          {/* <Icon2
            name="upload-file"
            style={styles.icon}
            size={20}
            color="#fff"
          /> */}
           <Image
                  source={ require('../Assets/img/icons/files-white.png')}
                  style={  [styles.icons,]}
                />

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
          {/* <Icon2
            style={styles.icon}
            name="request-quote"
            size={20}
            color="#fff"
          /> */}
                <Image
                  source={ require('../Assets/img/icons/product-request.png')}
                  style={  [styles.icons,]}
                />
          <Text style={styles.screenNameText}>Requests</Text>
        </TouchableOpacity>
        <View style={styles.part}></View>
      </View>
      <View>
        <View style={styles.part}></View>
        <TouchableOpacity
          style={styles.screenName}
          onPress={() => {
            navigation.navigate('ContactUs');
          }}>
          {/* <Icon2
            style={styles.icon}
            name="request-quote"
            size={20}
            color="#fff"
          /> */}
           <Image
                  source={ require('../Assets/img/icons/contact-us.png')}
                  style={  [styles.icons,]}
                />

          <Text style={styles.screenNameText}>Contact</Text>
        </TouchableOpacity>
        {/* <View style={styles.part}></View>
        <TouchableOpacity
          style={styles.screenName}
          onPress={() => {
            navigation.navigate('ClientSteps');
          }}>
          <Icon2
            style={styles.icon}
            name="request-quote"
            size={20}
            color="#fff"
          />

          <Text style={styles.screenNameText}>Edit Profile</Text>
        </TouchableOpacity> */}
        <View style={styles.part}></View>
      </View>
      <View>
        <View style={styles.part}></View>
        <TouchableOpacity
          style={styles.screenName}
          onPress={() => signOut()}>
          {/* <Icon2
            style={styles.icon}
            name="request-quote"
            size={20}
            color="#fff"
          /> */}
             <Image
                  source={ require('../Assets/img/icons/logout1.png')}
                  style={  [styles.icons,]}
                />

          <Text style={styles.screenNameText}>Logout</Text>
        </TouchableOpacity>
        <View style={styles.part}></View>
      </View>
    </SafeAreaView>
  );
};

export default Drawer;

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
  icons:{
    alignSelf: 'center',
    height:20,
    marginLeft: 20,
    resizeMode:'contain',
    width:20,
 
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
    //flex:1
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
  //  marginLeft:20,
    flexDirection: 'row',
  },
  screenNameText: {
    color: '#fff',
    marginLeft: 10,
    marginVertical: 9,
    fontWeight: '600',
  },
  icon: {
    marginLeft: 20,
    marginTop: 7,
  },
});
