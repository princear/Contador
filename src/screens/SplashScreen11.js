import React, { useEffect } from "react";
import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    SafeAreaView,
    Image,
    ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_DATA } from "../Redux/Actions/types";
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Color } from '../Style';


const SplashScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    // const navigation = useNavigation();
    const gotoSignInScreen = async () => {
        let token = await AsyncStorage.getItem("login");
        let response = await AsyncStorage.getItem("response");


        setTimeout(function async() {
            console.log(token, "SplashScreenSplashScreenSplashScreen", response);

            if (token) {



                dispatch({
                    type: LOGIN_DATA,
                    payload: response,
                });
                navigation.replace("Auth");
            } else {
                //navigation.replace("YourProfle");
                navigation.replace("Login");
            }
        }, 3000);
    };


    useEffect(() => {
        gotoSignInScreen();
    }, [navigation]);



    return (
        <View style={styles.container}>
            <Image source={require('../Assets/img/logo.png')} style={styles.logo} />
        </View>
    );
};
export default SplashScreen;

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

