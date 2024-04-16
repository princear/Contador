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
    const { MANAGER_INFO } = useSelector(state => state.TaxLeafReducer);
    const { PARTNER_INFO } = useSelector(state => state.TaxLeafReducer);
    const { OFFICE_INFO } = useSelector(state => state.TaxLeafReducer);
    console.log(REQUEST_INFO_BY_ID, 'REQUEST_INFO_BY_ID')
    const bgImage = require('../Assets/img/guest_shape.png');
    const manager = MANAGER_INFO;
    const partner = PARTNER_INFO;
    const managerOffice = OFFICE_INFO;

    console.log(actionId, 'LLLLLL')
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             setLoader(true);
    //             await dispatch(RequestInfoById(actionId, navigation));
    //         } finally {
    //             setLoader(false);
    //         }
    //     };

    //     fetchData();
    // }, [REQUEST_INFO_BY_ID, navigation]);



    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching data...');
                setLoader(true);
                await dispatch(RequestInfoById(actionId, navigation));
                console.log('Data fetched successfully');

                setTimeout(() => {
                    setLoader(false);
                }, 1000);

            }
            catch (error) {
                console.error('Error fetching data:', error);
                // setTimeout(() => {
                //     setLoader(false);
                // }, 1000);
            }

        };

        fetchData();
    }, []);


    const removeHtmlTags = (htmlString) => {
        if (!htmlString) {
            return ''; // or handle it in another way based on your requirements
          }
        // Use a regular expression to remove HTML tags
        return htmlString.replace(/<[^>]*>/g, '');
      };  

    // useEffect(() => {
    //     setLoader(true);
    //     dispatch(RequestInfoById(actionId, navigation));

    //     setTimeout(() => {
    //         setLoader(false);
    //     }, 2000);
    // }, [REQUEST_INFO_BY_ID]);
    return (

        <View style={{ backgroundColor: '#d5e3e5' }}>

            <Loader flag={loader} />
            <ScrollView style={{ marginBottom: 10 }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <HeadTabs />
                <Text style={{ fontSize: 20, marginLeft: 30, marginBottom: 10, fontFamily: 'Poppins-Bold', color: Color.headerIconBG }}>Requests</Text>
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
                            fontFamily: 'Poppins-Bold',

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
                            fontFamily: 'Poppins-Bold',

                        }}>


                            Action Dashboard
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", justifyContent: 'space-between', width: '90%', alignSelf: 'center' }}>
                    <Text style={{ color: Color.darkGreen, fontSize: 12, fontFamily: 'Poppins-SemiBold', }}>Action ID #{REQUEST_INFO_BY_ID?.actionModel?.id}</Text>
                    <Text style={{ color: Color.darkGreen, fontSize: 12, fontFamily: 'Poppins-SemiBold', }}>Client ID: {REQUEST_INFO_BY_ID?.actionModel?.clientId}</Text>

                </View>


                <View
                    // source={bgImage}
                    style={styles.bgImg}
                >
                    <View style={styles.container}>


                        <View style={styles.slideContainerClient}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', alignSelf: 'center', marginBottom: 10 }}>


                                <Text style={styles.headingClient}>
                                    {/* {manager?.id}
                                    {REQUEST_INFO_BY_ID?.actionStaffModel?.staffId} {partner?.id} */}
                                    {REQUEST_INFO_BY_ID?.actionStaffModel?.staffId === manager?.id ?

                                        manager?.firstName + " " + manager?.lastName
                                        :
                                        partner?.firstName + " " + partner?.lastName

                                    }
                                </Text>
                                <Text style={styles.headingClient}>Assign</Text>

                            </View>

                            <View style={styles.contentView}>
                                <Text style={styles.subHead}>Department:</Text>
                                <Text style={styles.LIstText2}>
                                    N/A
                                </Text>
                            </View>
                            <View style={styles.contentView}>
                                <Text style={styles.subHead}>Office:</Text>
                                {/* {REQUEST_INFO_BY_ID?.actionStaffModel?.staffId} */}
                                <Text style={styles.LIstText2}>

                                    {managerOffice?.officeId}

                                </Text>
                            </View>
                        </View>

                        <View style={{ backgroundColor: '#fff', paddingBottom: 20, width: wp(90), alignSelf: 'center', marginTop: 20 }}>
                            <View style={styles.slideContainerClient1}>
                                <View style={{
                                    flexDirection: 'row', marginLeft: 15,
                                    //marginTop: 10
                                }}>
                                    {/* <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: '#fff', fontFamily: 'Poppins-SemiBold', marginTop: 5 }}>Notes</Text>
                                        <Text style={styles.notes}>2</Text>
                                    </View> */}
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: '#fff', fontFamily: 'Poppins-SemiBold', marginTop: 5 }}>SOS</Text>
                                        <Text style={styles.sos}>+</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: '#fff', fontFamily: 'Poppins-SemiBold', marginTop: 5 }}>Action Files</Text>
                                        <Text style={styles.action}>0</Text>
                                    </View>

                                </View>
                            </View>
                            <View style={{ marginLeft: 15, marginBottom: 10, marginTop: 10 }}>
                                <Text style={{ fontSize: 12, fontFamily: 'Poppins-SemiBold', color: Color.headerIconBG, }}>Subject: <Text style={{ fontSize: 12, color: Color.darkGreen }}>{REQUEST_INFO_BY_ID?.actionModel?.subject}</Text> </Text>

                            </View>
                            <View style={styles.part}></View>
                            <View style={{ marginLeft: 15, justifyContent: "center", marginTop: 10 }}>
                                <Text style={{ fontSize: 12, fontFamily: 'Poppins-SemiBold', color: Color.headerIconBG, }}>Message:  <Text style={{ fontSize: 12, color: Color.darkGreen }}> 
                                {removeHtmlTags(REQUEST_INFO_BY_ID?.actionModel?.message)} 
                                {/* {REQUEST_INFO_BY_ID?.actionModel?.message} */}
                                </Text></Text>


                            </View>

                        </View>

                        <View style={{ backgroundColor: '#fff', paddingBottom: 20, width: wp(90), alignSelf: 'center', marginTop: 20 }}>
                            <View style={[styles.slideContainerClient1, { backgroundColor: '#254768' }]}>
                                <View style={{ marginLeft: 15, }}>
                                    <Text style={{ fontSize: 14, color: '#fff', fontFamily: 'Poppins-SemiBold', }}>Action Notification</Text>


                                </View>
                            </View>
                            <View style={{ marginLeft: 15, marginTop: 10 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 14, fontFamily: 'Poppins-SemiBold', color: Color.headerIconBG, marginBottom: 10, }}>Tracking</Text>
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
                                            fontFamily: 'Poppins-SemiBold',
                                            // marginTop: 2,
                                            marginLeft: 4,
                                            // fontWeight: '700'

                                        }}>


                                            NEW
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.part}></View>
                            <View style={{ marginLeft: 15, marginTop: 10 }}>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={{ fontSize: 14, fontFamily: 'Poppins-SemiBold', color: Color.headerIconBG, }}>Priority</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            // navigation.navigate('ViewRequest', {
                                            // })
                                        }}
                                        style={{
                                            backgroundColor: '#e00101',
                                            //padding: 5,
                                            textAlign: 'center',
                                            width: wp(20),
                                            marginLeft: 30,
                                            flexDirection: 'row',
                                            borderRadius: 3,
                                            //  height: hp(4),
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
                                            fontFamily: 'Poppins-SemiBold',
                                            // fontWeight: '700'

                                        }}>
                                            {
                                                REQUEST_INFO_BY_ID?.actionModel?.priority === 1 ?
                                                    'URGENT'
                                                    :
                                                    REQUEST_INFO_BY_ID?.actionModel?.priority === 2 ?
                                                        'IMPORTANT'
                                                        :
                                                        REQUEST_INFO_BY_ID?.actionModel?.priority === 3 ?
                                                            'REGULAR'
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
        fontFamily: 'Poppins-SemiBold',
        fontSize: 12
    },

    subHead: {
        width: 100,
        fontSize: 12,
        fontFamily: 'Poppins-SemiBold',
        color: Color.headerIconBG
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
        height: wp(10),
        justifyContent: 'center',
        // alignSelf: 'center',
        //alignItems: "center",
        /// height: 420,
        // opacity: 2,
        // paddingBottom: 20,
        // marginTop: 20,
    },
    sos: {
        backgroundColor: Color.green, color: '#fff', borderRadius: 3, marginLeft: 10, marginRight: 10, width: wp(6), alignSelf: 'center', marginTop: 5, height: hp(3),
        fontFamily: 'Poppins-Bold', textAlign: "center"
    },
    notes: {
        fontFamily: 'Poppins-Bold', textAlign: "center", backgroundColor: '#ED5565', color: '#fff', borderRadius: 3, marginLeft: 10, marginRight: 10, width: wp(6), alignSelf: 'center', marginTop: 5, height: hp(3),

    },
    action: {
        backgroundColor: '#F8AC59', color: '#fff', borderRadius: 3, marginLeft: 10, marginRight: 4, width: wp(6), alignSelf: 'center', marginTop: 5, height: hp(3),
        fontFamily: 'Poppins-Bold', textAlign: "center",
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