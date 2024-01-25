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


const LoginScreen = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [result, setResult] = useState(null);
    const [authUrl, setAuthUrl] = useState(null);

    const AuthConfig = {
        appId: "17f808bd-072c-4b60-8ca9-e86199b17f79",
        //appId: '766090b1-948f-4eb3-ad69-9fc723b4e7d8',

        tenantId: "9728fcf8-f04b-4271-b352-022a33fbfcc4",
        scopes: ['openid', 'profile', 'email', 'offline_access', 'User.Read.All', 'User.ReadWrite'], // Include 'email' scope to request user's email
        responseType: 'id_token token',
    };

    const config = {
        issuer: `https://login.microsoftonline.com/${AuthConfig.tenantId}`,
        clientId: AuthConfig.appId,
        redirectUrl: 'msauth://com.taxleaf/VzSiQcXRmi2kyjzcA%2BmYLEtbGVs%3D',
        scopes: AuthConfig.scopes,
        additionalParameters: {
            prompt: 'login',
        },
        serviceConfiguration: {
            authorizationEndpoint: `https://login.microsoftonline.com/${AuthConfig.tenantId}/oauth2/v2.0/authorize`,
            revocationEndpoint: `https://login.microsoftonline.com/${AuthConfig.tenantId}/revoke`,
            tokenEndpoint: `https://login.microsoftonline.com/${AuthConfig.tenantId}/oauth2/v2.0/token`,
            responseType: 'id_token token',
        },
    };

    useEffect(() => {
        const fetchAuthUrl = async () => {
            try {
                console.log("JJJJJJJJJJJ")
                const authUrlResult = await authorize(config);
                setAuthUrl(authUrlResult.url);
            } catch (error) {
                console.error('Error fetching authorization URL:', error);
            }
        };

        fetchAuthUrl();
    }, []);
    const handleShouldStartLoad = (event) => {
        console.log('GGGG')
        const { url } = event;

        if (url && url.startsWith(config.redirectUrl)) {
            setLoader(true);
            const code = new URL(url).searchParams.get('code');
            exchangeToken(code);

            // Prevent loading the redirect URL in the WebView
            return false;
        }

        // Allow loading other URLs
        return true;
    };
    const exchangeToken = async (code) => {
        try {
            const tempResult = await authorize(config, { authorizationCode: code });
            setResult(tempResult);

            if (tempResult) {
                const idToken = tempResult.idToken;
                const decodedToken = JSON.parse(decode(idToken.split('.')[1]));
                const userEmail = decodedToken.email;

                console.log('User Email:', userEmail, decodedToken);

                dispatch(LoginUser(userEmail, navigation));

                setTimeout(() => {
                    setLoader(false);
                }, 2000);
            } else {
                console.log('Authentication failed');
            }
        } catch (error) {
            console.error('Token exchange failed:', error);
            setLoader(false);
        }
    };

    const renderWebView = () => (
        <WebView
            source={{ uri: authUrl }}
            onShouldStartLoadWithRequest={() => handleShouldStartLoad()}
            //  onNavigationStateChange={() => handleNavigationStateChange()}
            javaScriptEnabled={true}
        />
    );

    return (
        <View style={{ flex: 1 }}>
            {authUrl ? renderWebView() : null}

            <TouchableOpacity
                style={[styles.buttonContainer, styles.loginButton]}
                onPress={() => setLoader(true)}>
                <Text style={styles.loginText}>Login with Office365</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;


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
