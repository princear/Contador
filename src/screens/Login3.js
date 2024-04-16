import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text, Linking,
  View,
  ImageBackground,
  Image,
  Button,
  Alert
} from 'react-native';
import { jwtDecode } from "jwt-decode";
import { decode } from 'base-64';

import { LoginUser } from '../Redux/Actions/TaxLeaf';
import AsyncStorage from '@react-native-community/async-storage';
// import AzureAuth from 'react-native-azure-auth';

import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Loader } from '../Component/Loader';
import { authorize, revoke } from 'react-native-app-auth';
import { WebView } from 'react-native-webview';



// import { authorize, refresh, prefetchConfiguration } from 'react-native-app-auth';
// import { PublicClientApplication } from 'react-native-msal';
// //import { signIn, signOut } from './authService'

// import {
//   UserAgentApplication,
//   AuthenticationParameters,
//   Configuration,
// } from "@azure/msal";


const Login = () => {

  const webViewRef = useRef(null);

  //   // console.log('clientId:', 'your-client-id');
  //   // console.log('tenant:', 'your-tenant-id');
  //   // console.log('redirectUri:', 'your-redirect-uri');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [result, setResult] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");


  const bgImage = require('../Assets/img/login-mainbg.jpg');
   //const [email, setEmail] = useState("julietam.geraci@gmail.com");
   const [email, setEmail] = useState("Vigiolending@gmail.com");
   //const [email, setEmail] = useState("aalok@eastsons.com");
 // const [email, setEmail] = useState("prince@eastsons.com");
  //const [email, setEmail] = useState("angiecotes@hotmail.com");

  //const [email, setEmail] = useState("julietam.geraci@gmail.com");
  //const [email, setEmail] = useState("Julieta.gracias@taxleaf.com");
  
  const onChangeEmail = text => {
    setEmail(text);
  };


  const AuthConfig = {
    // issuer: 'https://login.microsoftonline.com/9728fcf8-f04b-4271-b352-022a33fbfcc4', // Replace with your Azure AD tenant ID
    // clientId: '17f808bd-072c-4b60-8ca9-e86199b17f79',
    // redirectUrl: 'msauth://com.taxleaf/VzSiQcXRmi2kyjzcA%2BmYLEtbGVs%3D',
    // scopes: ['openid', 'profile', 'email'], // Include 'email' scope to request user's email
    // responseType: 'id_token token',
    // additionalParameters: {
    //   prompt: 'select_account',
    //   login_hint: 'user@example.com',
    //   state: 'random-state-value',
    //   nonce: 'random-nonce-value',
    //   // Add any other parameters as needed
    // },


    appId: "17f808bd-072c-4b60-8ca9-e86199b17f79",
    //appId: '766090b1-948f-4eb3-ad69-9fc723b4e7d8',

    tenantId: "9728fcf8-f04b-4271-b352-022a33fbfcc4",
    scopes: ['openid', 'profile', 'email', 'offline_access', 'User.Read.All', 'User.ReadWrite'], // Include 'email' scope to request user's email
    responseType: 'id_token token',
  };

  const config = {
    //warmAndPrefetchChrome: true,
    issuer: 'https://login.microsoftonline.com/9728fcf8-f04b-4271-b352-022a33fbfcc4', // Replace with your Azure AD tenant ID

    clientId: AuthConfig.appId,
    // redirectUrl: Platform.OS === 'ios' ? 'urn:ietf:wg:oauth:2.0:oob' : 'msauth://com.taxleaf/VzSiQcXRmi2kyjzcA%2BmYLEtbGVs%3D',
    redirectUrl: 'msauth://com.taxleaf/VzSiQcXRmi2kyjzcA%2BmYLEtbGVs%3D',
    //redirectUrl: 'https://stagingclientportal.taxleaf.com/MicrosoftConnect',
    scopes: AuthConfig.scopes,
    //response_mode: 'query',
    //responseType: 'id_token token',
    additionalParameters: {
      prompt: 'login',
      // login_hint: 'user@example.com',
      //state: 'random-state-value',
      //nonce: 'random-nonce-value',
      // Add any other parameters as needed
    },
    dangerouslyAllowInsecureHttpRequests: true,
    // serviceConfiguration: {
    //   authorizationEndpoint: 'https://your-oidc-provider.com/oauth2/authorize',
    //   tokenEndpoint: 'https://your-oidc-provider.com/oauth2/token',
    //   revocationEndpoint: 'https://your-oidc-provider.com/oauth2/revoke',
    // },
    serviceConfiguration: {
      authorizationEndpoint: 'https://login.microsoftonline.com/' + AuthConfig.tenantId + '/oauth2/v2.0/authorize',
      revocationEndpoint: 'https://login.microsoftonline.com/' + AuthConfig.tenantId + '/revoke',
      tokenEndpoint: 'https://login.microsoftonline.com/' + AuthConfig.tenantId + '/oauth2/v2.0/token',
      responseType: 'id_token token',
    }

  }


  //};



  // useEffect(() => {
  //   // Check for the authorization code or access token in the URL
  //   authorize(config)
  //     .then((result) => {
  //       // Handle the result, which may include an authorization code or access token
  //       console.log('Authentication result:', result);

  //       // Redirect to the desired screen
  //       //  navigation.navigate('Home');
  //     })
  //     .catch((error) => {
  //       console.error('Authentication error:', error);
  //     });
  // }, []);

  // const config = {
  //   issuer: 'https://login.microsoftonline.com/9728fcf8-f04b-4271-b352-022a33fbfcc4', // Replace with your Azure AD tenant ID
  //   clientId: '17f808bd-072c-4b60-8ca9-e86199b17f79',
  //   additionalParameters: { prompt: 'select_account' },
  //   redirectUrl: 'msauth://com.taxleaf/VzSiQcXRmi2kyjzcA%2BmYLEtbGVs%3D',
  //   scopes: ['openid', 'profile', 'User.Read'], // Include the scopes needed for your API
  //   responseType: 'id_token token', // Request an access token along with the ID token


  // };


  const loginWithOffice365 = async () => {
    console.log(config, 'OOOOOOOO')
    //if (email) {

    setLoader(true)
    // dispatch(LoginUser(email, navigation))

    console.log("Before authorize");
    try {
      console.log('LLLLLLLLLLJJJJJJJJJJJJJ')
      let tempResult = await authorize(config);

      //  const userEmail = tempResult.additionalParameters;
      //  console.log('User email:', userEmail);
      // console.log("After authorize", tempResult);

      if (tempResult) {
        setLoader(true)

        const idToken = tempResult.idToken;
        const decodedToken = JSON.parse(decode(idToken.split('.')[1]));

        //const decodedToken = jwtDecode(name);

        // Extract user's email
        const userEmail = decodedToken.email;

        console.log('User Email:', userEmail, decodedToken);


        dispatch(LoginUser(userEmail, navigation));
        // dispatch(LoginUser(email, navigation));
        // AsyncStorage.setItem('login', JSON.stringify(tempResult.accessToken));
        // navigation.navigate('Auth');
        setTimeout(() => {
          setLoader(false)
        }, 2000);


      }
      else {
        console.log('LLLLL')
      }


      setResult(tempResult);
      // ...
    } catch (error) {
      console.error('Authentication failed:', error);

      setLoader(false)

    }

    // }
    // else {
    //   Alert.alert('Please Enter Email Address')
    // }

  }


  const signOut = async () => {

    console.log(name, 'IIIIIIIIIIIII')
    const decodedToken = JSON.parse(decode(name.split('.')[1]));

    //const decodedToken = jwtDecode(name);

    // Extract user's email
    const userEmail = decodedToken.email;

    console.log('User Email:', userEmail);
    // try {
    //   // Revoke the token(s) and perform any additional sign-out actions
    //   let logoutToken = await revoke(config, { tokenToRevoke: 'accessToken' });
    //   console.log(logoutToken, 'JJJJJJJJJJJJJJJJJJJJ')
    //   // Navigate to your app's sign-in screen or perform any other action
    //   // For example, you can use React Navigation to navigate to the login screen
    //   //  navigation.navigate('Login');
    // } catch (error) {
    //   console.error('Sign-out error:', error);
    // }
  };

  //   let scopes = ['User.Read', 'User.ReadWrite']
  //   const azureAuth = new AzureAuth({
  //     //clientId: '17f808bd-072c-4b60-8ca9-e86199b17f79',
  //     clientId: '766090b1-948f-4eb3-ad69-9fc723b4e7d8',
  //     tenant: '9728fcf8-f04b-4271-b352-022a33fbfcc4', // your app tenant ID
  //     // redirectUrl: 'msauth://com.taxleaf/VzSiQcXRmi2kyjzcA%2BmYLEtbGVs%3D',
  //     redirectUrl: 'https://stagingclientportal.taxleaf.com/MicrosoftConnect',

  //   });




  //   const config = {
  //     //  warmAndPrefetchChrome: true,
  //     issuer: 'https://login.microsoftonline.com/{9728fcf8-f04b-4271-b352-022a33fbfcc4}',
  //     // issuer: 'https://login.microsoftonline.com/{9728fcf8-f04b-4271-b352-022a33fbfcc4}',
  //     //  clientId: '17f808bd-072c-4b60-8ca9-e86199b17f79', 
  //     clientId: '766090b1-948f-4eb3-ad69-9fc723b4e7d8',
  //     //redirectUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/logout",
  //     redirectUrl: 'https://stagingclientportal.taxleaf.com/MicrosoftConnect',
  //     //  redirectUrl: 'https://stagingclientportal.taxleaf.com/MicrosoftConnect',
  //     // redirectUrl: 'msauth://com.taxleaf/VzSiQcXRmi2kyjzcA%2BmYLEtbGVs%3D',
  //     //redirectUrl: 'msauth://com.taxleaf/VzSiQcXRmi2kyjzcA%2BmYLEtbGVs%3D',
  //     //scopes: ['User.Read', 'User.Write'],

  //   };





  //   // const azureInstance = new AzureInstance({
  //   //   clientId: '766090b1-948f-4eb3-ad69-9fc723b4e7d8',
  //   //   tenant: '9728fcf8-f04b-4271-b352-022a33fbfcc4',
  //   //   redirectUri: 'com.taxleaf://auth',
  //   //   //scopes: ['openid', 'profile', 'User.Read'],
  //   // });



  //   // const handleSignIn = async () => {
  //   //   console.log("PPPPP")
  //   //   try {
  //   //     await signIn();
  //   //   } catch (error) {
  //   //     console.error('Sign In Error', error);
  //   //   }
  //   // };

  //   // const handleSignOut = async () => {
  //   //   try {
  //   //     await signOut();
  //   //   } catch (error) {
  //   //     console.error('Sign Out Error', error);
  //   //   }
  //   // };
  const authenticate = async () => {
    // try {
    // Try to get cached token or refresh an expired ones
    //   let tokens = await azureAuth.auth.acquireTokenSilent({ scope: scopes.join(' '), userId: this.state.userId })
    //   if (!tokens) {
    //     // No cached tokens or the requested scope defines new not yet consented permissions
    //     // Open a window for user interaction
    //     tokens = await azureAuth.webAuth.authorize({ scope: 'Mail.Read' })
    //   }
    //   let mails = await azureAuth.auth.msGraphRequest({ token: tokens.accessToken, path: '/me/mailFolders/Inbox/messages' })
    // } catch (error) {
    //   console.log(error)
    // }

    //     // try {
    //     //   // Try to get cached token or refresh an expired ones
    //     //   let tokens = await azureAuth.auth.acquireTokenSilent({ scope: 'User.Read', userId:  })
    //     //   if (!tokens) {
    //     //     // No cached tokens or the requested scope defines new not yet consented permissions
    //     //     // Open a window for user interaction
    //     //     tokens = await azureAuth.webAuth.authorize({ scope: 'User.Read' })
    //     //   }
    //     //   let mails = await azureAuth.auth.msGraphRequest({ token: tokens.accessToken, path: '/me/mailFolders/Inbox/messages' })
    //     // } catch (error) {
    //     //   console.log(error)
    //     // }

    // try {
    //   console.log("OUUUUUUUUUUUUUUU")
    //   let tokens = await azureAuth.webAuth.authorize({ scope: scopes.join(' ') })
    //   console.log(token, 'PPPPPPPP')
    //   setResult(tokens.accessToken)
    //   console.log(result, 'LLLLLLLLLL')
    //   // this.setState({ accessToken: tokens.accessToken });
    //   let info = await azureAuth.auth.msGraphRequest({ token: tokens.accessToken, path: '/me' })
    //   setName(info.displayName)
    //   setId(tokens.userId)
    //   console.log(id, name, 'KKKKKKKKKKK')

    //     //   // this.setState({ user: info.displayName, userId: tokens.userId })
    //     // } catch (error) {
    //     //   console.log(error, 'OOOOOO')
  }




  //     // const result = await refresh(config, {
  //     //   refreshToken: result,

  //     // });

  //     // try {
  //     //   console.log("RRRRRR ")
  //     //   const result = await authorize(config);
  //     //   console.log(result, 'UUUUUUUUUUUUUUUUUUUU');
  //     //   // Use result.authorizationCode to obtain the access token
  //     // } catch (error) {
  //     //   console.error(error);
  //     // }
  //   };

  //   // authenticate();

  //   const onSuccess = (data) => {
  //     console.log('Token acquired:', data);
  //     // Handle the token, e.g., store it in state or context
  //   }


  //   console.log(result, 'AAAAAAAAAAAAAAAAAAAA')
  //   // useEffect(() => {
  //   //   // Add event listener to handle deep links
  //   //   const handleDeepLink = (event) => {
  //   //     // Extract the path or query parameters from the deep link
  //   //     const { path, queryParams } = Linking.parse(event.url);

  //   //     // Use path and queryParams to navigate or perform actions
  //   //     // For example, navigate to a specific screen based on the path
  //   //   };

  //   //   // Add event listener for deep linking
  //   //   Linking.addEventListener('url', handleDeepLink);

  //   //   // Clean up the event listener when component unmounts
  //   //   return () => Linking.removeEventListener('url', handleDeepLink);
  //   // }, []);

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
            {/* <View
              style={{
                // marginBottom: 20,
                width: wp(90),
                alignSelf: 'center',
              }}>
              <Image
                source={require('../Assets/img/logo.png')}
                style={styles.logo}
              />
            </View> */}
            <View>
              {/* <AzureLoginView
                azureInstance={azureInstance}
                loadingMessage="Requesting access token"
                onSuccess={(data) => onSuccess(data)}
                onCancel={() => console.log('Login cancelled')}
                onError={(error) => console.error(error)}
              /> */}
            </View>

            <View>
              {/* <Text>React Native MSAL Authentication</Text>
              <TouchableOpacity

                onPress={() => handleSignIn()}>
                <Text>Sign In</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleSignOut()}>
                <Text>Sign our</Text>
              </TouchableOpacity> */}


            </View>
            <View style={styles.formContainer}>
               {/* <TextInput
                placeholder="Enter Email"
                placeholderTextColor={'lightgrey'}
                style={[styles.input, { height: 50 }]}
                value={email}
                onChangeText={text => {
                  onChangeEmail(text);
                }}
              />  */}

              <View
                style={{
                  // marginBottom: 20,
                  width: wp(90),
                  alignSelf: 'center',
                }}>
                <Image
                  source={require('../Assets/img/logo.png')}
                  style={styles.logo}
                />
              </View>
              <TouchableOpacity
                style={[styles.buttonContainer, styles.loginButton]}
                onPress={() => loginWithOffice365()}>
                <Text style={styles.loginText}>Login with Office365</Text>
              </TouchableOpacity>
               {/* <TouchableOpacity
                onPress={() => onLogin()}
                //  onPress={() => loginWithOffice365()}
                // onPress={() => authenticate()}
                style={[styles.button, styles.buttonClose]}
              // onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Login</Text>
              </TouchableOpacity>  */}


            </View>
            
            <View style={{
              marginTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
              //  backgroundColor: '#DCDCDC',
            }}>

           {/* <TouchableOpacity
                style={[styles.buttonContainer, styles.loginButton]}
                onPress={() => loginWithOffice365()}>
                <Text style={styles.loginText}>Login with Office365</Text>
              </TouchableOpacity> */}

             {/* <TouchableOpacity
                style={[styles.buttonContainer, styles.loginButton]}
                onPress={() => signOut()}>
                <Text style={styles.loginText}>Logout</Text>
              </TouchableOpacity> */}

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
        {/* <WebView
          ref={webViewRef}
          source={{ uri: 'https://login.microsoftonline.com' }}
          style={{ flex: 1, height: 300 }}
          onNavigationStateChange={(navState) => {
            // Handle navigation state changes if needed
            console.log('Navigation State:', navState);
          }}
        /> */}
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
    marginTop: 20,
    marginBottom: 20,
    width: 180,
    height: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
    // backgroundColor: "red",
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
  buttonContainer: {
    height: 45,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 10,
  },
  loginButton: {
    backgroundColor: '#1c84c6',
  },
  loginText: {
    color: 'white',
  },

  footerText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#676A6C',
  },

  formContainer: {
    marginTop: 10,
    //  backgroundColor: '#2F4050',
    width: wp(80),
    // height: wp(40),
    alignSelf: "center",
    // justifyContent: 'center',
    alignItems: "center",
    // padding: 10,
    alignSelf: 'center',
    // borderRadius: 20,
    //borderTopLeftRadius: 20,
    //borderTopRightRadius: 20,
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
    width: wp(80),
    alignSelf: "center",
    backgroundColor: 'white',
    borderRadius: 20,
    // padding: 35,

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


// import React, { useState, useEffect } from 'react';
// import {
//   StyleSheet,
//   View,
//   Text, Linking,
//   TouchableHighlight,
// } from 'react-native';

// import { authorize } from 'react-native-app-auth';
// //clientId: '17f808bd-072c-4b60-8ca9-e86199b17f79',
// //     clientId: '766090b1-948f-4eb3-ad69-9fc723b4e7d8',
// //     tenant: '9728fcf8-f04b-4271-b352-022a33fbfcc4', // your app tenant ID
// //     // redirectUrl: 'msauth://com.taxleaf/VzSiQcXRmi2kyjzcA%2BmYLEtbGVs%3D',
// //     redirectUrl: 'https://stagingclientportal.taxleaf.com/MicrosoftConnect',

// const AuthConfig = {
//   appId: "17f808bd-072c-4b60-8ca9-e86199b17f79",
//   //appId: '766090b1-948f-4eb3-ad69-9fc723b4e7d8',

//   tenantId: "9728fcf8-f04b-4271-b352-022a33fbfcc4",
//   appScopes: [

//     'User.Read',
//     // 'User.Write',
//     //'User.ReadWriteAll'

//   ],
// };

// // const config = {
// //   warmAndPrefetchChrome: true,
// //   clientId: AuthConfig.appId,
// //   // redirectUrl: Platform.OS === 'ios' ? 'urn:ietf:wg:oauth:2.0:oob' : 'msauth://com.taxleaf/VzSiQcXRmi2kyjzcA%2BmYLEtbGVs%3D',
// //   redirectUrl: 'msauth://com.taxleaf/VzSiQcXRmi2kyjzcA%2BmYLEtbGVs%3D',
// //   //redirectUrl: 'https://stagingclientportal.taxleaf.com/MicrosoftConnect',
// //   scopes: AuthConfig.appScopes,
// //   additionalParameters: { prompt: 'select_account' },
// //   serviceConfiguration: {
// //     authorizationEndpoint: 'https://login.microsoftonline.com/' + AuthConfig.tenantId + '/oauth2/v2.0/authorize',
// //     tokenEndpoint: 'https://login.microsoftonline.com/' + AuthConfig.tenantId + '/oauth2/v2.0/token',
// //   },
// // };



// const config = {
//   issuer: 'https://login.microsoftonline.com/9728fcf8-f04b-4271-b352-022a33fbfcc4',
//   clientId: '17f808bd-072c-4b60-8ca9-e86199b17f79',
//   //clientId: '766090b1-948f-4eb3-ad69-9fc723b4e7d8',
//   // redirectUrl: 'https://stagingclientportal.taxleaf.com/MicrosoftConnect',

//   redirectUrl: 'msauth://com.taxleaf/VzSiQcXRmi2kyjzcA%2BmYLEtbGVs%3D',
//   // additionalParameters: {
//   //   resource: 'your-resource'
//   // }
// };

// // Log in to get an authentication token
// //const authState = await authorize(config);

// // Refresh token
// // const refreshedState = await refresh(config, {
// //   refreshToken: authState.refreshToken,
// // });



// const Login = () => {
//   const [result, setResult] = useState({});


//   // useEffect(() => {
//   //   // Add event listener to handle deep links
//   //   const handleDeepLink = (event) => {
//   //     // Extract the path or query parameters from the deep link
//   //     const { path, queryParams } = Linking.parse(event.url);

//   //     // Use path and queryParams to navigate or perform actions
//   //     // For example, navigate to a specific screen based on the path
//   //   };

//   //   // Add event listener for deep linking
//   //   Linking.addEventListener('url', handleDeepLink);

//   //   // Clean up the event listener when component unmounts
//   //   return () => Linking.removeEventListener('url', handleDeepLink);
//   // }, []);




//   const loginWithOffice365 = async () => {
//     console.log("Before authorize");
//     try {
//       let tempResult = await authorize(config);
//       console.log("After authorize", tempResult);
//       setResult(tempResult);
//       // ...
//     } catch (error) {
//       console.error('Authentication failed:', error);
//     }
//   }
//   return (
//     <>
//       <View style={styles.container}>
//         <TouchableHighlight
//           style={[styles.buttonContainer, styles.loginButton]}
//           onPress={() => loginWithOffice365()}>
//           <Text style={styles.loginText}>Login with Office365</Text>
//         </TouchableHighlight>
//         <Text>{result.accessToken ? "Logged In" : "Error"}</Text>
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#DCDCDC',
//   },
//   buttonContainer: {
//     height: 45,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//     width: 250,
//     borderRadius: 30,
//   },
//   loginButton: {
//     backgroundColor: '#3659b8',
//   },
//   loginText: {
//     color: 'white',
//   },
// });

// export default Login;



//Example usage in a component
// import React, { useState, useEffect } from 'react';
// import { View, Text, Button } from 'react-native';
// import { signIn, signOut, getAccessToken } from './authService';

// const Login = () => {
//   const [user, setUser] = useState(null);

//   const handleSignIn = async () => {
//     try {
//       const result = await signIn();
//       setUser(result.user);
//       console.log(result, 'PPPPPPP ')
//     } catch (error) {
//       console.error('Sign in failed', error);
//     }
//   };

//   const handleSignOut = async () => {
//     try {
//       await signOut();
//       setUser(null);
//     } catch (error) {
//       console.error('Sign out failed', error);
//     }
//   };

//   const handleGetAccessToken = async () => {
//     try {
//       const token = await getAccessToken();
//       console.log('Access Token:', token);
//     } catch (error) {
//       console.error('Failed to get access token', error);
//     }
//   };

//   // useEffect(() => {
//   //   // Check if user is already signed in
//   //   // Perform other initializations
//   // }, []);

//   return (
//     <View>
//       {user ? (
//         <>
//           <Text>Welcome, {user.name}</Text>
//           <Button title="Sign Out" onPress={handleSignOut} />
//           <Button title="Get Access Token" onPress={handleGetAccessToken} />
//         </>
//       ) : (
//         <Button title="Sign In" onPress={() => handleSignIn()} />
//       )}
//     </View>
//   );
// };

// export default Login;
