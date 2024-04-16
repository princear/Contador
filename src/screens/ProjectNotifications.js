import React, { useState, useEffect } from 'react';
import { View, BackHandler, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import { UpdateNotificationsRead, dashboardlist, dashboardlist2 } from '../Redux/Actions/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Color } from '../Style';
import { clientInfo, ManagerInfo } from '../Redux/Actions/TaxLeaf';
import { Loader } from '../Component/Loader';
const ProjectNotifications = () => {

    const [showwhat1, setshowwhat1] = useState('');
    const [showwhat2, setshowwhat2] = useState('');
    const [loader, setLoader] = useState(false);
    const [infoData, setInfoData] = useState({});
    const [dashboardList, setDashboardList] = useState([]);
    const [dashboardList2, setDashboardList2] = useState([]);
    const [dashboardMessageList, setDashboardMessageList] = useState([]);
    const { MY_INFO } = useSelector(state => state.TaxLeafReducer);
    const { DASHBOARD_LIST } = useSelector(state => state.DashboardReducer);
    const { DASHBOARD_MESSAGE_LIST } = useSelector(state => state.DashboardReducer);
    const { DASHBOARD_LIST_TWO } = useSelector(state => state.DashboardReducer);
    const { MANAGER_INFO } = useSelector(state => state.TaxLeafReducer);
    const { LOGIN_DATA } = useSelector(state => state.TaxLeafReducer);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [refreshCount, setRefreshCount] = useState(0);
    const jsonData = MY_INFO.guestInfo;
    const officeInfo = MY_INFO.officeInfo;



    useEffect(() => {
        setLoader(true);
        // setInterval(() => {

        dispatch(clientInfo(LOGIN_DATA, navigation))
            .then(() => dispatch(dashboardlist(jsonData?.clientId, jsonData?.clientType, officeInfo?.id, navigation)))
            .then(() => dispatch(dashboardlist2(jsonData?.clientId, jsonData?.clientType, officeInfo?.id, navigation)))
            .then(() => dispatch(ManagerInfo(jsonData?.clientId, jsonData?.clientType, navigation)))
            .finally(() => {
                setLoader(false);
            });
        // }, 5000);
    }, [LOGIN_DATA, jsonData?.clientId, jsonData?.clientType, officeInfo?.id]);

    // const fetchData = async () => {
    //     setLoader(true);
    //     try {
    //         await dispatch(clientInfo(LOGIN_DATA, navigation));
    //         await dispatch(dashboardlist(jsonData?.clientId, jsonData?.clientType, officeInfo?.id, navigation));
    //         await dispatch(dashboardlist2(jsonData?.clientId, jsonData?.clientType, officeInfo?.id, navigation));
    //         await dispatch(ManagerInfo(jsonData?.clientId, jsonData?.clientType, navigation));
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     } finally {
    //         setLoader(false);
    //     }
    // };

    // const handleReload = () => {
    //     fetchData(); // Call fetchData function to reload all APIs
    // };


    useEffect(() => {


        setDashboardList(DASHBOARD_LIST);
        setDashboardList2(DASHBOARD_LIST_TWO);
        setDashboardMessageList(DASHBOARD_MESSAGE_LIST);

    }, [DASHBOARD_LIST, DASHBOARD_MESSAGE_LIST, DASHBOARD_LIST_TWO]);

    const formatDate = (dateTimeString) => {
        const date = new Date(dateTimeString);

        const hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();

        const formattedHours = hours % 12 === 0 ? 12 : hours % 12; // Convert hours to 12-hour format
        const period = hours < 12 ? 'AM' : 'PM'; // Determine AM or PM

        return `${formattedHours}:${minutes} ${period} - ${month}/${day}/${year}`;
    };
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // setLoader(true);
            console.log("HeadTAbsHeadTAbs")
            // showwhatfunc1(showwhat1)
            setshowwhat1("")
            setshowwhat2("")
            // setTimeout(() => {
            //   setLoader(false);
            // }, 2000);

        });
        return unsubscribe;
    }, [navigation,]);


    const HolidaysNewsType = 'Holidays';
    const TaxNewsType = 'Tax Deadlines';
    const EventsType = 'Events';
    const OrderType = 'order';
    const GovernmentType = 'government_payment';
    const TaxReturnsType = 'tax_returns';
    const BookKeepingType = 'bookkeeping';

    const HolidaysfilteredList =
        dashboardList &&
        dashboardList.filter(item => item.newsType === HolidaysNewsType);

    const TaxfilteredList =
        dashboardList &&
        dashboardList.filter(item => item.newsType === TaxNewsType);

    const EventsfilteredList =
        dashboardList &&
        dashboardList.filter(item => item.newsType === EventsType);


    const orderfilteredList =
        dashboardList2 &&
        dashboardList2.filter(item => item.section === OrderType);

    const GovfilteredList =
        dashboardList2 &&
        dashboardList2.filter(item => item.reference === GovernmentType);

    const taxreturnfilteredList =
        dashboardList2 &&
        dashboardList2.filter(item => item.reference === TaxReturnsType);

    const BookKeepingfilteredList =
        dashboardList2 &&
        dashboardList2.filter(item => item.reference === BookKeepingType);



    let UnreadTaxDeadCount = 0;
    let UnreadMessagesCount = 0;
    let UnreadHolidaysCount = 0;
    let UnreadEventCount = 0;
    let UnreadOrderCount = 0;
    let UnreadTaxReturnCount = 0;
    let UnreadBookCount = 0;
    let UnreadGovCount = 0;
    let AllUnreadNotifications = 0;



    // Iterate over the array
    if (dashboardMessageList && Array.isArray(dashboardMessageList)) {
        // Iterate over each item in dashboardMessageList
        for (const item of dashboardMessageList) {
            // Check if the property "isNotificationRead" is false
            if (item && item.isNotificationRead === false) {
                // Increment counter
                UnreadMessagesCount++;
            }
        }

    } else {
        // Handle the case when dashboardMessageList is undefined or not an array
        //console.error('Error: dashboardMessageList is not properly defined');
    }


    const HolidaysfilteredList1 =
        dashboardList &&
        dashboardList.filter(item => item.newsType === HolidaysNewsType && item.isNotificationRead === false);

    UnreadHolidaysCount = HolidaysfilteredList1 && HolidaysfilteredList1.length || 0;


    const TaxfilteredList1 =
        dashboardList &&
        dashboardList.filter(item => item.newsType === TaxNewsType && item.isNotificationRead === false);


    UnreadTaxDeadCount = TaxfilteredList1 && TaxfilteredList1.length || 0;


    const EventsfilteredList1 =
        dashboardList &&
        dashboardList.filter(item => item.newsType === EventsType && item.isNotificationRead === false);

    UnreadEventCount = EventsfilteredList1 && EventsfilteredList1.length || 0;


    const orderfilteredList1 =
        dashboardList2 &&
        dashboardList2.filter(item => item.section === OrderType && item.isNotificationRead === false);

    UnreadOrderCount = orderfilteredList1 && orderfilteredList1.length || 0;




    const GovfilteredList1 =
        dashboardList2 &&
        dashboardList2.filter(item => item.reference === GovernmentType && item.isNotificationRead === false);


    UnreadGovCount = GovfilteredList1 && GovfilteredList1.length || 0;



    const taxreturnfilteredList1 =
        dashboardList2 &&
        dashboardList2.filter(item => item.reference === TaxReturnsType && item.isNotificationRead === false);


    UnreadTaxReturnCount = taxreturnfilteredList1 && taxreturnfilteredList1.length || 0;


    const BookKeepingfilteredList1 =
        dashboardList2 &&
        dashboardList2.filter(item => item.reference === BookKeepingType && item.isNotificationRead === false);

    UnreadBookCount = BookKeepingfilteredList1 && BookKeepingfilteredList1.length || 0;



    console.log("TaxDeadCount", UnreadTaxDeadCount);
    console.log("messageCount", UnreadMessagesCount);
    console.log("HolidaysCount", UnreadHolidaysCount);
    console.log("EventsCount", UnreadEventCount);


    AllUnreadNotifications = UnreadTaxDeadCount + UnreadMessagesCount + UnreadHolidaysCount + UnreadEventCount + UnreadOrderCount +
        UnreadTaxReturnCount + UnreadBookCount + UnreadGovCount;


    console.log(AllUnreadNotifications, 'AllUnreadNotificationsAllUnreadNotifications')








    return (
        <View style={styles.container}>

            <TouchableOpacity onPress={() => setshowwhat2('')}>


                {GovfilteredList && GovfilteredList.length > 0 ? (
                    GovfilteredList.map(item => (

                        <View key={item.id} style={{
                            borderRadius: 10,
                            backgroundColor: "#f7f9fa",
                            alignSelf: "center",
                            marginTop: 10,
                            padding: 10,
                            width: wp(90),
                            flexDirection: 'row'
                        }}>
                            <View
                                style={{
                                    width: wp(15),

                                }}
                            >
                                <Image source={require('../Assets/img/icons/bell-green.png')}
                                    style={{
                                        alignSelf: 'center',
                                        height: 30,
                                        resizeMode: 'contain',
                                        width: 30,
                                    }} />
                                <View
                                    style={{
                                        position: 'absolute',
                                        top: -2,
                                        right: 10,
                                        height: 20,

                                        width: 20,
                                        justifyContent: 'center',
                                        borderWidth: 1,
                                        borderColor: Color.white,
                                        backgroundColor: 'red',
                                        borderRadius: 50,
                                    }}>
                                    <Text
                                        style={{
                                            color: Color.white,
                                            alignSelf: 'center',
                                            fontFamily: 'Poppins-SemiBold',
                                            fontSize: 10,
                                        }}>
                                        1
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    width: wp(65),
                                    //  backgroundColor:'red'
                                }}
                            >

                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins-Bold',
                                        color: Color.headerIconBG,
                                        padding: 3,
                                    }}>

                                    ID: #{item.sectionId}

                                </Text>

                                <View
                                    style={{
                                        borderBottomWidth: 1,

                                        borderBottomColor: '#e4edee',
                                    }}
                                ></View>
                                {/* <Text
                                                        style={{
                                                            fontSize: 14,
                                                            fontFamily: 'Poppins-SemiBold',
                                                            color: Color.headerIconBG,
                                                            padding: 3,
                                                        }}>
                                                        Message: */}
                                <Text
                                    style={{
                                        fontSize: 10,
                                        fontFamily: 'Poppins-SemiBold',
                                        color: Color.headerIconBG,
                                        padding: 3,
                                    }}>
                                    Congratulations! A new project with ID # {item.sectionId} has been successfully created.

                                </Text>

                                <Text
                                    style={{
                                        fontSize: 10,
                                        fontFamily: 'Poppins-SemiBold',
                                        color: Color.headerIconBG,
                                        padding: 3,
                                    }}>
                                    {formatDate(item.addedOn)}
                                </Text>

                                {/* </Text> */}
                            </View>

                        </View>
                    ))
                ) : (
                    <View style={{
                        borderRadius: 10,
                        backgroundColor: "#f7f9fa",
                        alignSelf: "center",
                        marginTop: 10,
                        padding: 10,
                        width: wp(90),

                    }}>

                        <Text style={styles.subHead}>
                            No Gov. Payments
                        </Text>

                    </View>

                )}


            </TouchableOpacity>
        </View>
    );
}


export default ProjectNotifications;


const styles = StyleSheet.create({

    constainer: {
        flex: 1,



    },
    tabsContainer: {
        // backgroundColor: '#fff',
        width: wp(90),
        justifyContent: 'center',
        alignSelf: 'center',
        /// height: 420,
        opacity: 2,
        paddingBottom: 20,
        borderRadius: 10,
        // marginTop: 20,
        // width:'62%'
    },
    part: {
        borderWidth: 0.5,
        borderColor: '#A7B1C2',
        marginTop: 10,
        width: '90%',
        alignSelf: 'center',
    },
    TabsContainer: {
        justifyContent: 'center',
        alignItems: "center",
        width: wp(22),
        backgroundColor: "",
        height: wp(20)
    },
    moblieSec: {
        // backgroundColor: "red",
        // height: 20,
        width: wp(90),
        // backgroundColor: 'red',
        //backgroundColor: 'red',
        //  justifyContent: 'space-between',
        alignSelf: 'center',
        borderRadius: 50,

        justifyContent: "center",
        // alignItems: "center",
        marginTop: 0,
        // marginBottom: 30,

        flexDirection: 'row',
        // alignSelf: "center",
    },
    emailtoch: {
        //  backgroundColor: "yellow",
        width: wp(12),
        height: wp(12),
        // paddingTop: 5,


        //  justifyContent: 'center',
        borderRadius: 50,
        //marginRight: 6,
        //marginTop: 10,
    },
    emailtochO: {
        //  backgroundColor: "lightgray",
        width: wp(12),
        height: wp(12),
        // paddingTop: 5,
        //  justifyContent: 'center',
        borderRadius: 50,
        //marginRight: 6,
        //marginTop: 10,
    },
    ButtonText: {

        textAlign: 'center',
        paddingTop: 3,
        fontSize: 10,
        fontFamily: 'Poppins-Bold',
    },
    mobiletoch: {
        // backgroundColor: showwhat == "My Schools" ? "#2F5597" : "lightgray",
        // width: 70,
        // height: 45,
        width: wp(12),
        height: wp(12),
        //marginTop: 10,
        // paddingTop: 5,
        borderRadius: 50,
        // justifyContent: 'center',
        // marginLeft: 10
    },
    mobiletoch1: {
        // backgroundColor: showwhat == "My Schools" ? "#2F5597" : "lightgray",
        // width: 70,
        // height: 45,
        width: wp(12),
        height: wp(12),
        //marginTop: 10,
        //  paddingTop: 5,
        borderRadius: 50,
        // justifyContent: 'center',
        // marginRight: 5,
    },
    subHead: {
        //marginLeft: 30,
        //  marginTop: 20,

        fontFamily: 'Poppins-Bold',
        color: Color.headerIconBG,
        textAlign: "center"
    },
    icon: {
        alignSelf: 'center',
        height: 50,
        resizeMode: 'contain',
        width: 50,
        //marginTop: 5 
    },


})