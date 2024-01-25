import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView ,ImageBackground} from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Color } from '../Style';
import Icon from 'react-native-vector-icons/AntDesign';

const ContactUs = () => {
    const bgImage = require("../Assets/img/guest_shape.png")

    return (
        <View>
            <ScrollView>

            <View style={{backgroundColor:'#d5e3e5'}}>
            <Text style={styles.headText1}>Get in Touch !</Text>

                <View style={styles.slideContainer}>
                    <Icon
                        style={[
                            styles.icon,

                        ]}
                        name="user"
                        size={50}
                        color="green"
                    />
                    <View style={styles.contentView}>
                        <Text style={styles.subHead}>Manager:</Text>
                        <Text style={styles.LIstText2}>
                           Jhon Smith
                        </Text>
                    </View>
                    <View style={styles.contentView}>
                        <Text style={styles.subHead}>Email:</Text>
                        <Text style={styles.LIstText2}>
                        miamistaff@taxleaf.com
                        </Text>
                    </View>
                </View>
                <View style={styles.slideContainer}>
                    <Icon
                        style={[
                            styles.icon,

                        ]}
                        name="phone"
                        size={50}
                        color="green"
                    />
                    <View style={styles.contentView}>
                        <Text style={styles.subHead}>Call Us:</Text>
                        <Text style={styles.LIstText2}>
                           987654
                        </Text>
                    </View>
                    
                </View>
                <Text style={styles.heading}>
                    Submit Your Request
                </Text>
                <View style={styles.formContainer}>
                    <View >


                        <TextInput
                            placeholder="Name"
                            placeholderTextColor={'lightgrey'}
                            style={[styles.input, { height: 50 }]}
                        // value={email}
                        // onChangeText={text => {
                        //   onChangeEmail(text);
                        // }}
                        />
                    </View>
                    <View>


                        <TextInput
                            placeholder="Phone Number"
                            placeholderTextColor={'lightgrey'}
                            style={[styles.input, { height: 50 }]}
                        // value={email}
                        // onChangeText={text => {
                        //   onChangeEmail(text);
                        // }}
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>


                        <TextInput
                            placeholder="Email"
                            placeholderTextColor={'lightgrey'}
                            style={[styles.input, { height: 50 }]}
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
                            numberOfLines={6}
                            style={styles.textArea}
                        />

                    </View>
                    <View style={{ marginBottom: 10 }}>


                        <TextInput
                            placeholder="Country"
                            placeholderTextColor={'lightgrey'}
                            style={[styles.input, { height: 50 }]}
                        // value={email}
                        // onChangeText={text => {
                        //   onChangeEmail(text);
                        // }}
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                        // onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default ContactUs

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 30,
        padding: 10,
        width: wp(80),
        backgroundColor: '#fff',
    },
    formContainer: {
        backgroundColor: '#2F4050',
        width: wp(90),
        padding: 10,
        alignSelf: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        width: wp(50),
        alignSelf: 'center',
        //alignSelf: 'flex-end',
    },
    buttonOpen: {
        backgroundColor: '#8AB645',
    },
    buttonClose: {
        backgroundColor: '#8AB645',
    },
    textStyle: {
        color: '#fff',
        textAlign: 'center',
    },
    textArea: {
        height: 100, textAlignVertical: 'top', borderWidth: 1, borderColor: 'gray', width: '93%', alignSelf: 'center', borderRadius: 20,
        backgroundColor: '#fff'
    },
    heading: {
        fontSize: 21,
        fontFamily: 'Poppins-Bold',
        // maxWidth:'80%',
        color: Color.darkGreen,
        // height:40,
        marginTop: 20,
        marginLeft: 20,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 10
    },
    headText: {
        // textAlign: 'flex',
        // marginLeft:110,
        color: Color.darkGreen,
        marginTop: 10,
        fontWeight: '600',
    },
    headText1: {
        color: Color.darkGreen,
        marginTop: 30,
        fontWeight: '600',
        fontSize: 24,
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
})