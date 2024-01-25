import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text, Linking,
  View,
  ImageBackground,
  Image,
  Button,
  Alert
} from 'react-native';
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
import { authorize } from 'react-native-app-auth';


// import { authorize, refresh, prefetchConfiguration } from 'react-native-app-auth';
// import { PublicClientApplication } from 'react-native-msal';
// //import { signIn, signOut } from './authService'

// import {
//   UserAgentApplication,
//   AuthenticationParameters,
//   Configuration,
// } from "@azure/msal";


const Login = () => {


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
  const [email, setEmail] = useState();
  const onChangeEmail = text => {
    setEmail(text);
  };


  const AuthConfig = {
    appId: "17f808bd-072c-4b60-8ca9-e86199b17f79",
    //appId: '766090b1-948f-4eb3-ad69-9fc723b4e7d8',

    tenantId: "9728fcf8-f04b-4271-b352-022a33fbfcc4",
    appScopes: [

      'User.Read',
      'User.Write',
      'User.ReadWriteAll',
      'openid',
      'offline_Access',
      'email.read'


    ],
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
    additionalParameters: { prompt: 'select_account' },
    dangerouslyAllowInsecureHttpRequests: true,
    // serviceConfiguration: {
    //   authorizationEndpoint: 'https://login.microsoftonline.com/' + AuthConfig.tenantId + '/oauth2/v2.0/authorize',
    //   tokenEndpoint: 'https://login.microsoftonline.com/' + AuthConfig.tenantId + '/oauth2/v2.0/token',
    //   //response_type: 'id_token',
    // },


  };



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

    console.log("Before authorize");
    try {
      console.log('LLLLLLLLLLJJJJJJJJJJJJJ')
      let tempResult = await authorize(config);
      console.log("After authorize", tempResult);

      if (tempResult) {
        setLoader(true)
        dispatch(LoginUser("prince@eastsons.com", navigation));
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
    }
  }
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
  //   const authenticate = async () => {
  //     // try {
  //     // Try to get cached token or refresh an expired ones
  //     //   let tokens = await azureAuth.auth.acquireTokenSilent({ scope: scopes.join(' '), userId: this.state.userId })
  //     //   if (!tokens) {
  //     //     // No cached tokens or the requested scope defines new not yet consented permissions
  //     //     // Open a window for user interaction
  //     //     tokens = await azureAuth.webAuth.authorize({ scope: 'Mail.Read' })
  //     //   }
  //     //   let mails = await azureAuth.auth.msGraphRequest({ token: tokens.accessToken, path: '/me/mailFolders/Inbox/messages' })
  //     // } catch (error) {
  //     //   console.log(error)
  //     // }

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

  //     // try {
  //     //   console.log("OUUUUUUUUUUUUUUU")
  //     //   let tokens = await azureAuth.webAuth.authorize({ scope: scopes.join(' ') })
  //     //   console.log(token, 'PPPPPPPP')
  //     //   setResult(tokens.accessToken)
  //     //   console.log(result, 'LLLLLLLLLL')
  //     //   // this.setState({ accessToken: tokens.accessToken });
  //     //   let info = await azureAuth.auth.msGraphRequest({ token: tokens.accessToken, path: '/me' })
  //     //   setName(info.displayName)
  //     //   setId(tokens.userId)
  //     //   console.log(id, name, 'KKKKKKKKKKK')

  //     //   // this.setState({ user: info.displayName, userId: tokens.userId })
  //     // } catch (error) {
  //     //   console.log(error, 'OOOOOO')
  //     // }




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
                // onPress={() => authenticate()}
                style={[styles.button, styles.buttonClose]}
              // onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Login</Text>
              </TouchableOpacity>


            </View>
            <View style={{

              marginTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
              //  backgroundColor: '#DCDCDC',
            }}>


              <TouchableOpacity
                style={[styles.buttonContainer, styles.loginButton]}
                onPress={() => loginWithOffice365()}>
                <Text style={styles.loginText}>Login with Office365</Text>
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
      </ImageBackground >
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
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: '#3659b8',
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

    backgroundColor: 'red',
    //borderRadius: 20,
    padding: 35,
    width: wp(90),
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
