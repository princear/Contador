// import * as React from 'react';
// import { View, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import HomeScreen from './src/screens/Home';
// import ClientInfo from './src/screens/ClientInfo';
// import Manager from './src/screens/Manager';
// import Payments from './src/screens/Payments';
// import FileCabinet from './src/screens/FileCabinet';
// import Request from './src/screens/Request';
// import Splash from './src/screens/Splash';
// import Login from './src/screens/Login';
// import { createDrawerNavigator } from '@react-navigation/drawer';

// import MyDrawer from './src/Navigation/Navigation';

// const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

// function App() {
//   return <NavigationContainer>{/* <MyDrawer /> */}</NavigationContainer>;
// }

// export default App;


import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text, Linking,Alert,
  TouchableHighlight,
} from 'react-native';

import { authorize } from 'react-native-app-auth';
//clientId: '17f808bd-072c-4b60-8ca9-e86199b17f79',
//     clientId: '766090b1-948f-4eb3-ad69-9fc723b4e7d8',
//     tenant: '9728fcf8-f04b-4271-b352-022a33fbfcc4', // your app tenant ID
//     // redirectUrl: 'msauth://com.taxleaf/VzSiQcXRmi2kyjzcA%2BmYLEtbGVs%3D',
//     redirectUrl: 'https://stagingclientportal.taxleaf.com/MicrosoftConnect',

// const appPackage = 'com.taxleaf.taxleaf'; // Replace with the actual package name

// //const appDeepLink = `market://details?id=${appPackage}`;
// const appDeepLink = `market://details?id=${appPackage}`;
// const playStoreLink = `https://play.google.com/store/apps/details?id=${appPackage}`;



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


// const config = {
//   issuer: 'https://login.microsoftonline.com/{9728fcf8-f04b-4271-b352-022a33fbfcc4}', // Replace with your Azure AD tenant ID
//   clientId: '17f808bd-072c-4b60-8ca9-e86199b17f79',
//   redirectUrl: 'msauth://com.taxleaf/VzSiQcXRmi2kyjzcA%2BmYLEtbGVs%3D',
//   scopes: ['openid', 'profile', 'email', 'your-api-scopes'], // Include the scopes needed for your API
//   responseType: 'id_token token', // Request an access token along with the ID token
// };


// const config = {
//   issuer: 'https://login.microsoftonline.com/9728fcf8-f04b-4271-b352-022a33fbfcc4',
//   clientId: '17f808bd-072c-4b60-8ca9-e86199b17f79',

//   //clientId: '766090b1-948f-4eb3-ad69-9fc723b4e7d8',
//   // redirectUrl: 'https://stagingclientportal.taxleaf.com/MicrosoftConnect',
//   scopes: [

//     'User.Read',
//     'User.Write',
//     'User.ReadWriteAll'

//   ],
//   redirectUrl: 'msauth://com.taxleaf/VzSiQcXRmi2kyjzcA%2BmYLEtbGVs%3D',

//   // additionalParameters: {
//   //   resource: 'your-resource'
//   // }
// };

// Log in to get an authentication token
//const authState = await authorize(config);

// Refresh token
// const refreshedState = await refresh(config, {
//   refreshToken: authState.refreshToken,
// });



const App = () => {
  const [result, setResult] = useState({});



  // const config = {
  //   //warmAndPrefetchChrome: true,
  //   clientId: AuthConfig.appId,
  //   // redirectUrl: Platform.OS === 'ios' ? 'urn:ietf:wg:oauth:2.0:oob' : 'msauth://com.taxleaf/VzSiQcXRmi2kyjzcA%2BmYLEtbGVs%3D',
  //   redirectUrl: 'msauth://com.taxleaf/VzSiQcXRmi2kyjzcA%2BmYLEtbGVs%3D',
  //   //redirectUrl: 'https://stagingclientportal.taxleaf.com/MicrosoftConnect',
  //   scopes: AuthConfig.appScopes,

  //   additionalParameters: { prompt: 'select_account' },
  //   serviceConfiguration: {
  //     authorizationEndpoint: 'https://login.microsoftonline.com/' + AuthConfig.tenantId + '/oauth2/v2.0/authorize',
  //     tokenEndpoint: 'https://login.microsoftonline.com/' + AuthConfig.tenantId + '/oauth2/v2.0/token',
  //     response_type: 'id_token',
  //   },
  // };

  const config = {
    issuer: 'https://login.microsoftonline.com/' + AuthConfig.tenantId,
    clientId: AuthConfig.appId,
    redirectUrl: 'msauth://com.taxleaf/VzSiQcXRmi2kyjzcA%2BmYLEtbGVs%3D',

    scopes: AuthConfig.appScopes,
  };



  // const openAppOrPlayStore = async () => {
  //   try {
  //     // Try opening the app using a deep link
  //     await Linking.openURL(appDeepLink);
  //   } catch (error) {
  //     // If the deep link fails, open the Play Store link
  //     Alert.alert('App not installed', 'Do you want to install it from the Play Store?', [
  //       { text: 'Cancel', style: 'cancel' },
  //       { text: 'OK', onPress: () => Linking.openURL(playStoreLink) },
  //     ]);
  //   }
  // };

  // useEffect(() => {

  //   openAppOrPlayStore();


    
   
  //     const handleDeepLink = (event) => {
  //       // Extract the path or query parameters from the deep link
  //       const { path, queryParams } = Linking.parse(event.url);

  //       // Use path and queryParams to navigate or perform actions
  //       // For example, navigate to a specific screen based on the path
  //     };

  //     // Add event listener for deep linking
  //     Linking.addEventListener('url', handleDeepLink);

  //     // Clean up the event listener when component unmounts
  //     return () => Linking.removeEventListener('url', handleDeepLink);
  // }, []);




  const loginWithOffice365 = async () => {



    console.log("Before authorize");
    // try {
    console.log('LLLLLLLLLLJJJJJJJJJJJJJ')
    let tempResult = await authorize(config);
    console.log("After authorize", tempResult);
    setResult(tempResult);
    //   // ...
    // } catch (error) {
    //   console.error('Authentication failed:', error);
    // }
  }


  // const loginWithOffice365 = async () => {
  //   try {
  //     const config = {
  //       issuer: 'https://login.microsoftonline.com/{9728fcf8-f04b-4271-b352-022a33fbfcc4}', // Replace with your Azure AD tenant ID
  //       clientId: '17f808bd-072c-4b60-8ca9-e86199b17f79',
  //       redirectUrl: 'msauth://com.taxleaf/VzSiQcXRmi2kyjzcA%2BmYLEtbGVs%3D',
  //       scopes: ['openid', 'profile', 'email', 'your-api-scopes'], // Include the scopes needed for your API
  //       responseType: 'id_token token', // Request an access token along with the ID token
  //     };

  //     const authResult = await authorize(config);
  //     setResult(authResult)
  //     console.log('Authentication successful:', authResult);

  //     // Store the access token for later use
  //     // You might want to use a state management solution or AsyncStorage
  //     const accessToken = authResult.accessToken;
  //     console.log(accessToken, ':IIIIIIII')
  //     // TODO: Store accessToken securely
  //   } catch (error) {
  //     console.error('Authentication failed:', error);
  //   }
  // };



  return (
    <>
      <View style={styles.container}>
        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => loginWithOffice365()}>
          <Text style={styles.loginText}>Login with Office365</Text>
        </TouchableHighlight>
        <Text>{result.accessToken ? "Logged In" : "Error"}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
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
});



export default App;











// import React, { useState, useEffect } from 'react';
// import { View, Text, Button } from 'react-native';
// import { signIn, signOut, getAccessToken } from './src/screens/authService'

// const App = () => {
//   const [user, setUser] = useState(null);

//   const handleSignIn = async () => {
//     console.log('LLLLLL')
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

// export default App;


