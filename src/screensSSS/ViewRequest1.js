import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ImageBackground, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Color } from '../Style';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../Component/Loader';
import { RequestInfoById } from '../Redux/Actions/TaxLeaf';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import HeadTabs from './HeadTabs';

const ViewRequest = ({ route }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const navigation = useNavigation();
    const actionId = route.params.actionId;
    const { REQUEST_INFO_BY_ID } = useSelector(state => state.TaxLeafReducer);
    console.log(REQUEST_INFO_BY_ID, 'REQUEST_INFO_BY_ID')
    const bgImage = require('../Assets/img/guest_shape.png');
    useEffect(() => {
        setLoader(true);
        dispatch(RequestInfoById(actionId, navigation));

        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }, [actionId]);
    return (

        <View style={{ backgroundColor: '#d5e3e5' }}>

            <Loader flag={loader} />
            <ScrollView style={{ marginBottom: 10 }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <HeadTabs />
                <Text style={{ fontSize: 22, marginLeft: 30, marginVertical: 10, fontWeight: '700', color: Color.headerIconBG }}>Requests</Text>
                <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: "center", }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('CreateNewAction')}
                        style={{
                            backgroundColor: '#fff',
                            // paddingTop: 10,
                            textAlign: 'center',
                            width: wp(45),
                            // marginLeft: 60,
                            flexDirection: 'row',
                            borderRadius: 25,
                            height: hp(5),
                            alignItems: "center",
                            justifyContent: 'center'
                        }}
                    >
                        <Image source={require('../Assets/img/icons/createAction.png')} />

                        <Text style={{
                            color: Color.headerIconBG,
                            fontSize: 12,
                            marginTop: 2,
                            marginLeft: 4,
                            fontWeight: '700'

                        }}>


                            Create New Action
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}
                        style={{
                            backgroundColor: '#fff',
                            // paddingTop: 10,
                            alignItems: "center",
                            textAlign: 'center',
                            width: wp(45),
                            marginLeft: 10,
                            flexDirection: 'row',
                            borderRadius: 25,
                            height: hp(5),
                            justifyContent: 'center'
                        }}
                    >
                        <Image source={require('../Assets/img/icons/actionDashboard.png')} style={{ marginTop: 1 }} />
                        <Text style={{
                            color: Color.headerIconBG,
                            fontSize: 12,
                            marginTop: 2,
                            marginLeft: 4,
                            fontWeight: '700'

                        }}>


                            Action Dashboard
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", justifyContent: 'space-between', width: '90%', alignSelf: 'center' }}>
                    <Text style={{ color: Color.darkGreen, fontSize: 13, fontWeight: '500' }}>Action Id #{REQUEST_INFO_BY_ID?.actionModel?.id}</Text>
                    <Text style={{ color: Color.darkGreen, fontSize: 13, fontWeight: '500' }}>Client ID: {REQUEST_INFO_BY_ID?.actionModel?.clientId}</Text>

                </View>


                <View
                    // source={bgImage}
                    style={styles.bgImg}
                >
                    <View style={styles.container}>


                        <View style={styles.slideContainerClient}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', alignSelf: 'center', marginBottom: 10 }}>
                                <Text style={styles.headingClient}>MARIO RUIZ</Text>
                                <Text style={styles.headingClient}>assign</Text>

                            </View>

                            <View style={styles.contentView}>
                                <Text style={styles.subHead}>Department:</Text>
                                <Text style={styles.LIstText2}>
                                    N/A
                                </Text>
                            </View>
                            <View style={styles.contentView}>
                                <Text style={styles.subHead}>Office:</Text>
                                <Text style={styles.LIstText2}>
                                    CORP
                                </Text>
                            </View>
                        </View>

                        <View style={{ backgroundColor: '#fff', paddingBottom: 20, width: wp(90), alignSelf: 'center', marginTop: 20 }}>
                            <View style={styles.slideContainerClient1}>
                                <View style={{ flexDirection: 'row', marginLeft: 15, marginTop: 10 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: '#fff', fontWeight: '600', marginTop: 5 }}>Notes</Text>
                                        <Text style={styles.notes}>2</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: '#fff', fontWeight: '600', marginTop: 5 }}>SOS</Text>
                                        <Text style={styles.sos}>+</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: '#fff', fontWeight: '600', marginTop: 5 }}>Action Files</Text>
                                        <Text style={styles.action}>0</Text>
                                    </View>

                                </View>
                            </View>
                            <View style={{ marginLeft: 20, marginBottom: 10, marginTop: 10 }}>
                                <Text style={{ fontSize: 12, color: '#000', marginBottom: 10 }}>Subject: <Text style={{ fontSize: 12, color: Color.darkGreen }}>{REQUEST_INFO_BY_ID?.actionModel?.subject}</Text> </Text>

                            </View>
                            <View style={styles.part}></View>
                            <View style={{ marginLeft: 20, justifyContent: "center", marginTop: 10 }}>
                                <Text style={{ fontSize: 12, color: '#000', }}>Message:  <Text style={{ fontSize: 12, color: Color.darkGreen }}>{REQUEST_INFO_BY_ID?.actionModel?.message}</Text></Text>


                            </View>

                        </View>

                        <View style={{ backgroundColor: '#fff', paddingBottom: 20, width: wp(90), alignSelf: 'center', marginTop: 20 }}>
                            <View style={[styles.slideContainerClient1, { backgroundColor: '#254768' }]}>
                                <View style={{ flexDirection: 'row', marginLeft: 15, marginTop: 10 }}>
                                    <Text style={{ fontSize: 15, color: '#fff', fontWeight: '600' }}>Action Notification</Text>


                                </View>
                            </View>
                            <View style={{ marginLeft: 20, marginBottom: 10, marginTop: 20 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 15, color: '#000', marginBottom: 10, marginTop: 6 }}>Tracking</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            // navigation.navigate('ViewRequest', {
                                            // })
                                        }}
                                        style={{
                                            backgroundColor: '#2b9df1',
                                            padding: 5,
                                            textAlign: 'center',
                                            width: wp(20),
                                            marginLeft: 20,
                                            flexDirection: 'row',
                                            borderRadius: 3,
                                            height: hp(4),
                                            justifyContent: 'center'
                                        }}
                                    >
                                        {/* <Icon
                                  name="eye"
                                  size={14}
                                  color="#fff"
                                /> */}
                                        <Text style={{
                                            color: Color.white,
                                            fontSize: 12,
                                            // marginTop: 2,
                                            marginLeft: 4,
                                            // fontWeight: '700'

                                        }}>


                                            New
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.part}></View>
                            <View style={{ marginLeft: 20 }}>
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <Text style={{ fontSize: 15, color: '#000', marginBottom: 10, marginTop: 6 }}>Priority</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            // navigation.navigate('ViewRequest', {
                                            // })
                                        }}
                                        style={{
                                            backgroundColor: '#e00101',
                                            padding: 5,
                                            textAlign: 'center',
                                            width: wp(20),
                                            marginLeft: 30,
                                            flexDirection: 'row',
                                            borderRadius: 3,
                                            height: hp(4),
                                            justifyContent: 'center'
                                        }}
                                    >
                                        {/* <Icon
                                  name="eye"
                                  size={14}
                                  color="#fff"
                                    /> */}
                                        <Text style={{
                                            color: Color.white,
                                            fontSize: 12,
                                            marginTop: 2,
                                            marginLeft: 4,
                                            // fontWeight: '700'

                                        }}>
                                            {
                                                REQUEST_INFO_BY_ID?.actionModel?.priority === 1 ?
                                                    'Urgent'
                                                    :
                                                    REQUEST_INFO_BY_ID?.actionModel?.priority === 2 ?
                                                        'Important'
                                                        :
                                                        REQUEST_INFO_BY_ID?.actionModel?.priority === 3 ?
                                                            'Regular'
                                                            : null
                                            }

                                        </Text>
                                    </TouchableOpacity>
                                </View>

                            </View>

                        </View>


                    </View>
                </View>
            </ScrollView>

        </View>

    )
}

export default ViewRequest

const styles = StyleSheet.create({
    container: {
        width: '95%',
        alignSelf: 'center'
    },
    header: {
        backgroundColor: '#CDF2FF',
        alignItems: 'center',
        height: hp(5),
        justifyContent: 'center'
    },
    LIstText2: {
        color: '#000',
    },

    subHead: {
        width: 100,
        fontSize: 15,
        fontWeight: '600',
        color: '#000'
    },
    headingClient: {
        fontSize: 15,
        fontFamily: 'Poppins-Bold',
        // maxWidth:'80%',
        color: '#fff',
        // height:40,
        marginTop: 10,
        // marginLeft: 20,
        fontWeight: '600',

        // textAlign: 'center',
    },
    contentView: {
        height: 40,
        backgroundColor: '#fff',
        marginTop: 1,
        padding: 10,
        flexDirection: 'row',
        // borderRadius: 20,
        // marginLeft: 10,
        // marginRight: 10,
    },
    contentView1: {
        height: 40,
        backgroundColor: '#FFEFCE',
        marginTop: 10,
        padding: 10,
        flexDirection: 'row',
        borderRadius: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    slideContainerClient: {
        backgroundColor: Color.green,
        width: wp(90),
        justifyContent: 'center',
        alignSelf: 'center',
        // height: hp(2=10),
        opacity: 2,
        // paddingBottom: 20,
        marginTop: 5,
    },
    slideContainerClient1: {
        backgroundColor: Color.headerIconBG,
        width: wp(90),
        justifyContent: 'center',
        alignSelf: 'center',
        /// height: 420,
        opacity: 2,
        paddingBottom: 20,
        // marginTop: 20,
    },
    sos: {
        backgroundColor: '#1AB394', color: '#fff', borderRadius: 3, marginLeft: 10, marginRight: 10, width: wp(6), alignSelf: 'center', marginTop: 5, height: hp(3),
        paddingLeft: 6
    },
    notes: {
        backgroundColor: '#ED5565', color: '#fff', borderRadius: 3, marginLeft: 10, marginRight: 10, width: wp(6), alignSelf: 'center', marginTop: 5, height: hp(3),
        paddingLeft: 6
    },
    action: {
        backgroundColor: '#F8AC59', color: '#fff', borderRadius: 3, marginLeft: 10, marginRight: 4, width: wp(6), alignSelf: 'center', marginTop: 5, height: hp(3),
        paddingLeft: 6
    },
    bgImg: {
        paddingBottom: 140
    },
    part: {
        borderWidth: 0.5,
        borderColor: 'lightgray',
        // marginTop: 10,
        width: '100%',
        alignSelf: 'center',
    },
})