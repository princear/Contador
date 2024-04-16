import { StyleSheet,Alert, Text, View, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native'
import React, { useState, useMemo, useEffect } from 'react';

import { TextInput } from 'react-native-gesture-handler';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Color } from '../Style';
import Icon from 'react-native-vector-icons/AntDesign';
import HeadTabs from './HeadTabs';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitContactUs } from '../Redux/Actions/TaxLeaf';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Loader } from '../Component/Loader';



const ContactUs = () => {
    const bgImage = require("../Assets/img/guest_shape.png")
    const { MANAGER_INFO } = useSelector(state => state.TaxLeafReducer);
    const manager = MANAGER_INFO;
   // console.log(manager,'WWWWW')
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("");
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);

    const SubmitRequest = () => {

      
        if (!name || !phone || !email || !country || !message) {
            setLoader(true)
            Alert.alert('Validation Error', 'All fields are required');
            setTimeout(() => {
                setLoader(false)
          }, 2000);
          }

          else{
            setLoader(true)
            dispatch(SubmitContactUs(manager?.id,name,phone,email,message,country,navigation))
            setTimeout(() => {
                setLoader(false)
                setName('')
                setEmail('')
                setMessage('')
                setCountry('')
                setPhone('')
          }, 2000);
          }
      

    

    }


    return (
        <View style={{backgroundColor:'#d0e4e6'}}>
             <Loader flag={loader} />

            <ScrollView>
            <HeadTabs />
                <Text style={styles.headText1}>Get in Touch !</Text>

                <View>
                    <View style={styles.infoSec}>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Image
                                source={require('../Assets/profileBlank.png')}
                                style={{
                                    width: 70,
                                    height: 70,
                                    borderRadius: 50,
                                    alignSelf: 'center',
                                    marginLeft: 10
                                }}
                            />
                            <View style={{marginLeft:20}}>
                                <Text
                                    style={{
                                        textAlign: 'left',
                                        color: '#fff',
                                        marginTop: 10,
                                        // fontFamily: 'Poppins-Bold',
                                        fontSize: 12,
                                        fontFamily:'Poppins-SemiBold',
                                        // marginLeft: 10
                                    }}>
                                    Manager Information
                                </Text>
                                <Text
                                    style={{
                                        textAlign: 'left',
                                        color: '#fff',
                                        marginTop: 5,
                                        // fontFamily: 'Poppins-Bold',
                                        fontSize: 18,
                                      fontFamily:'Poppins-Bold'
                                        // marginLeft: 10
                                    }}>
                                    {manager?.firstName}{' '}
                      {manager?.lastName}
                                </Text>
                                <Text
                                    style={{
                                        textAlign: 'left',
                                        color: '#90c460',
                                        width:wp(60),
                                        fontFamily:'Poppins-SemiBold',
                                        fontSize: 14,
                                        // marginRight: 25,
                                    }}>
                                       {manager?.user}

                                </Text>
                                <Text
                                    style={{
                                        textAlign: 'left',
                                        color: '#90c460',

                                        fontFamily:'Poppins-SemiBold',
                                        fontSize: 14,
                                        // marginRight: 25,
                                    }}>

                                {manager?.phone ? manager?.phone : 'N/A'}
                                </Text>
                            </View>

                        </View>

                    </View>
                </View>
               

                <View style={styles.formContainer}>
                    <Text style={styles.heading}>
                        Submit Your Request
                    </Text>
                    <View style={styles.part}></View>
                    <View >


                        <TextInput
                            placeholder="Name"
                            placeholderTextColor={'#47607c'}
                            style={[styles.input]}
                            
                         value={name}
                        onChangeText={text => {
                          setName(text);
                        }}
                        />
                    </View>
                    <View>


                        <TextInput
                            placeholder="Phone Number"
                            placeholderTextColor={'#47607c'}
                            style={[styles.input]}
                            value={phone}
                            onChangeText={text => {
                              setPhone(text);
                            }}
                        // value={email}
                        // onChangeText={text => {
                        //   onChangeEmail(text);
                        // }}
                        />
                    </View>
                    <View style={{  }}>


                        <TextInput
                            placeholder="Email"
                            placeholderTextColor={'#47607c'}
                            style={[styles.input]}
                            value={email}
                            onChangeText={text => {
                              setEmail(text);
                            }}

                        // value={email}
                        // onChangeText={text => {
                        //   onChangeEmail(text);
                        // }}
                        />
                    </View>
                    <View style={{ marginBottom: 5 }}>


                        <TextInput
                            placeholder="Country"
                            placeholderTextColor={'#47607c'}
                            style={[styles.input]}
                            value={country}
                            onChangeText={text => {
                              setCountry(text);
                            }}
                        // value={email}
                        // onChangeText={text => {
                        //   onChangeEmail(text);
                        // }}
                        />
                    </View>
                    <View style={{ marginBottom: 15 }}>

                        <TextInput
                            multiline={true}
                            placeholder="Message"
                            placeholderTextColor={'#47607c'}
                            numberOfLines={6}
                            value={message}
                            onChangeText={text => {
                              setMessage(text);
                            }}
                            style={styles.textArea}
                        />

                    </View>


                </View>
                <View style={{ marginTop: 10,marginBottom:20 }}>
                    <TouchableOpacity
                        style={[styles.button]}
                     onPress={() =>
                        SubmitRequest()
                       }
                    >
                      <Image source={require('../Assets/img/icons/tickWhite.png')} style={{ width: 25, height: 25,  }} />
                         <Text style={styles.textStyle}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default ContactUs

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 5,
        alignSelf:'center',
        // borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        width: wp(80),
        backgroundColor: '#fff',
    },
    formContainer: {
        backgroundColor: '#00818a',
        width: wp(90),
        padding: 10,
        alignSelf: 'center',
        borderRadius: 20
    },
    button: {
        borderRadius: 20,
        padding: 10,
        //elevation: 2,
        flexDirection:"row",
        justifyContent:"center",
        width: wp(90),
        alignSelf: 'center',
        backgroundColor: '#82be4e',
        //alignSelf: 'flex-end',
    },
    buttonOpen: {

    },
    buttonClose: {
        backgroundColor: '#82be4e',
    },
    textStyle: {
        color: '#fff',
        textAlign: 'center',
       fontFamily:'Poppins-SemiBold',
       marginLeft:5
    },
    textArea: {
        height: 100, textAlignVertical: 'top', borderWidth: 1, borderColor: 'gray', width: '96%', alignSelf: 'center', borderRadius: 20,
        backgroundColor: '#fff',
        marginLeft: 8,
        paddingLeft:10

    },
    heading: {
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
        // maxWidth:'80%',
        color: '#fff',
        // height:40,
        marginTop: 10,
        marginLeft: 20,
        fontWeight: '800',
        textAlign: 'center',
        // marginBottom: 10
    },
    headText: {
        // textAlign: 'flex',
        // marginLeft:110,
        color: Color.darkGreen,
        marginTop: 10,
        fontWeight: '600',
    },
    headText1: {
        color: '#00818a',
        fontFamily:'Poppins-Bold',
   
        fontSize: 20,
        marginLeft: 30,
    },
    slideContainer: {
        backgroundColor: '#F5F5F5',
        width: wp(90),
        justifyContent: 'center',
        alignSelf: 'center',
        /// height: 420,
        opacity: 2,
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
        // width:'62%'
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    // icon: {color:'#000'},
    LIstText2: {
        color: '#000',
    },
    subHead: {
        width: 130,
        fontSize: 15,
        fontWeight: '600',
        color: Color.darkGreen,
        // backgroundColor: 'red',
    },
    contentView: {
        height: 40,
        //  backgroundColor: '#fff',
        marginTop: 10,
        padding: 10,
        flexDirection: 'row',
    },
    part: {
        borderWidth: 0.5,
        borderColor: '#3e9aa2',
        marginTop: 10,
        width: '90%',
        alignSelf: 'center',
    },
    infoSec: {
        backgroundColor: '#0f355a',
        borderRadius: 20,
        padding: 10,
        //height: 190,
        width: wp(90),
        alignSelf: 'center',
        marginTop: 5,
        marginBottom: 10,
    },
    infoSecText: {
        color: '#fff',
        fontSize: 11,
        lineHeight: 18,
        width: wp(80),
        alignSelf: "center",
        //textAlign: "center",
        fontFamily: 'Poppins-SemiBold',
        // marginLeft: 10
    },
})