import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Alert, Image } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Color } from '../Style';
import { GetDetailsbyOrderId } from '../Redux/Actions/PaymentAction';
import { ManagerInfo } from '../Redux/Actions/TaxLeaf';

import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../Component/Loader';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import CustomBottomTab from '../Component/CustomBottomTab';
import HeadTabs from './HeadTabs';

export default InvoiceDetails = ({ route }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const { MY_INFO } = useSelector(state => state.TaxLeafReducer);
    const { GET_ORDER_DETAILS } = useSelector(state => state.PaymentReducer);
    const { MANAGER_INFO } = useSelector(state => state.TaxLeafReducer);
    const { OFFICE_INFO } = useSelector(state => state.TaxLeafReducer);

    // console.log(GET_ORDER_DETAILS, 'orderInfoInvoice')
    // console.log(MANAGER_INFO, 'MANAGER_INFO')

    const [loader, setLoader] = useState(false);
    const orderId = route.params.orderId;
    const jsonData = MY_INFO.guestInfo;
    const collectionInfo = GET_ORDER_DETAILS[0]?.collectionInfo
    const companyClientContactInfo = GET_ORDER_DETAILS[0]?.companyClientContactInfo
    const serviceListModel = GET_ORDER_DETAILS[0]?.serviceListModel[0]
    const managerInfo = MANAGER_INFO
    const officeInfo = OFFICE_INFO
    const serviceList = GET_ORDER_DETAILS[0]?.serviceListModel;
    const companyTypeInfo = MY_INFO.companyTypeInfo;
    const stateInfo = MY_INFO.stateInfo;
    const companyInfo = MY_INFO.companyInfo;



    // Calculate the sum of "priceCharged" using reduce
    const totalPriceCharged = serviceList?.reduce((sum, service) => {
        // Access the "priceCharged" property within "reqInfo"
        const priceCharged = service?.reqInfo?.priceCharged;
        // Add the current priceCharged to the sum
        return sum + priceCharged;
    }, 0); // Initialize sum with 0
    // console.log("Total Price Charged:", totalPriceCharged);

    // console.log("route.params.orderId", route.params.orderId);
    const invoiceData = {
        invoiceNumber: '12345',
        invoiceDate: '01/01/2022',
        customerName: 'John Smith',
        customerEmail: 'john@example.com',
        customerAddress: '123 Main St, Anytown USA 12345',
        items: [
            {
                id: 1,
                name: 'Item 1',
                quantity: 2,
                price: 9.99,
                total: 19.98,
            },
            {
                id: 2,
                name: 'Item 2',
                quantity: 1,
                price: 19.99,
                total: 19.99,
            },
        ],
        total: 39.97,
    };

    useEffect(() => {
        setLoader(true);

        dispatch(
            GetDetailsbyOrderId(jsonData?.clientId, jsonData?.clientType, orderId, navigation),
        );
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }, [orderId])

    useEffect(() => {
        dispatch(ManagerInfo(jsonData?.clientId, jsonData?.clientType, navigation));

    }, [])

    return (
        <View style={styles.container}>
            <Loader flag={loader} />

            <ScrollView style={{ paddingBottom: 80 }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <HeadTabs />


                <View style={styles.invoiceInfoContainer}>
                    <View style={[styles.header, { flexDirection: 'row', justifyContent: 'space-between', width: wp(90) }]}>
                        <Text style={styles.title}>Invoice</Text>
                        <TouchableOpacity 
                        onPress={() => navigation.navigate('Payments')}
                        style={styles.invoiceInfo}>
                        <Image
                          source={require('../Assets/img/icons/backToD.png')}
                          style={{
                            width: 20,
                            height: 20,
                            marginTop: 12,
                            marginRight:5,
                           // borderRadius: 50,
                            //alignSelf: 'center',{}
                          }}
                        />
                            <Text style={{ fontSize: 12, fontFamily: 'Poppins-Bold', marginTop: 13 }}>Back to Dashboard</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.invoiceInfo}>
                        <Text style={[styles.label, { marginLeft: 5 }]}>Order ID:</Text>
                        <Text style={styles.text}>{collectionInfo?.orderId}</Text>
                    </View>


                </View>
                {/* <View style={styles.divider} /> */}
                <View style={styles.slideContainerClient}>
                    <View style={{ width: wp(85), alignSelf: 'center', marginBottom: 10 }}>
                        <Text style={styles.headingClient}>Invoice Details</Text>

                    </View>

                    <View style={styles.contentView}>
                        <Text style={styles.subHead}>Created Time:</Text>
                        <Text style={styles.LIstText2}>
                            {collectionInfo?.creationDate}
                        </Text>
                    </View>
                    <View style={styles.contentView}>
                        <Text style={styles.subHead}>Invoice Type:</Text>

                        <Text style={styles.LIstText2}>

                            {collectionInfo?.clientType == 'company' ? "Bussiness Client"
                                : collectionInfo?.clientType
                            }
                        </Text>
                    </View>
                    <View style={styles.contentView}>
                        <Text style={styles.subHead}>Created by Staff:</Text>

                        <Text style={styles.LIstText2}>
                            {/* {serviceList[0]?.requesetedStaffInfo?.firstName && serviceList[0]?.requesetedStaffInfo?.lastName &&
                                serviceList[0]?.requesetedStaffInfo?.firstName + ' ' + serviceList[0]?.requesetedStaffInfo?.lastName} */}

                            {serviceList && serviceList[0]?.requesetedStaffInfo?.firstName + ' ' + serviceList && serviceList[0]?.requesetedStaffInfo?.lastName}
                        </Text>
                    </View>
                    <View style={styles.contentView}>
                        <Text style={styles.subHead}>Incorporated Date:</Text>

                        <Text style={styles.LIstText2}>
                            {companyInfo?.incorporatedDate}

                        </Text>
                    </View>
                    <View style={styles.contentView}>
                        <Text style={styles.subHead}>Client Id:</Text>

                        <Text style={styles.LIstText2}>

                            {collectionInfo?.clientId}
                        </Text>
                    </View>
                    {/* <View style={styles.contentView}>
                        <Text style={styles.subHead}>Federal Id:</Text>

                        <Text style={styles.LIstText2}>

                            81-3900350
                        </Text>
                    </View> */}
                    <View style={styles.contentView}>
                        <Text style={styles.subHead}>State of Incorporation:</Text>

                        <Text style={styles.LIstText2}>
                            {stateInfo?.stateName}

                        </Text>
                    </View>
                    <View style={styles.contentView}>
                        <Text style={styles.subHead}>Type of Company:</Text>

                        <Text style={styles.LIstText2}>

                            {companyTypeInfo?.type}
                        </Text>
                    </View>
                    <View style={styles.contentView}>
                        <Text style={styles.subHead}>Fiscal Year End:</Text>

                        <Text style={styles.LIstText2}>


                        </Text>
                    </View>
                </View>
                <View style={styles.slideContainerClient1}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', alignSelf: 'center', marginBottom: 10 }}>
                        <Text style={styles.headingClient}>Invoice Details</Text>

                    </View>

                    <View style={styles.contentView}>
                        <Text style={styles.subHead}>Contact Type:</Text>

                        <Text style={styles.LIstText2}>
                            Main
                        </Text>
                    </View>
                    <View style={styles.contentView}>
                        <Text style={styles.subHead}>Name:</Text>

                        <Text style={styles.LIstText2}>
                            {companyClientContactInfo?.firstName + ' ' + companyClientContactInfo?.lastName}
                        </Text>
                    </View>
                    <View style={styles.contentView}>
                        <Text style={styles.subHead}>Phone:</Text>

                        <Text style={styles.LIstText2}>
                            {companyClientContactInfo?.phone1}
                        </Text>
                    </View>
                    <View style={[styles.contentView, { height: hp(6) }]}>
                        <Text style={styles.subHead}>Email:</Text>

                        <Text style={styles.LIstText2}>
                            {companyClientContactInfo?.email1}
                        </Text>
                    </View>
                    <View style={[styles.contentView, {}]}>
                        <Text style={styles.subHead}>Address:</Text>

                        <Text style={styles.LIstText2}>
                            {companyClientContactInfo?.address1}, {companyClientContactInfo?.city},{companyClientContactInfo?.zip}, {route.params.countryname}
                        </Text>
                    </View>

                </View>


            </ScrollView>
            <CustomBottomTab />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        // marginTop: 80,
        backgroundColor: '#d5e3e5',
        paddingBottom: 80
    },
    header: {
        // alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        padding: 5,
    color:Color.headerIconBG


    },
    invoiceInfoContainer: {
        // flexDirection: 'row',
        justifyContent: 'space-between',
        // marginTop: 10,
    },
    invoiceInfo: {
        flexDirection: 'row',
    },
    label: {
        fontSize: 14,
        fontFamily: 'Poppins-Bold'
    },
    text: {
        marginLeft: 5,
        fontFamily: 'Poppins-Bold'
        // marginTop: 4
    },
    divider: {
        borderColor: '#d0e4e6',
        borderBottomWidth: 1,
        // marginVertical: 20,
    },
    customerInfoContainer: {
        marginTop: 20,
    },
    customerInfo: {
        flexDirection: 'row',
        marginVertical: 5,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    itemsContainer: {
        marginTop: 20,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginVertical: 5,
    },
    itemName: {
        fontSize: 13,
        width: wp(20),
        color: Color.darkGreen
    },
    itemDetails: {
        fontSize: 13,
        color: Color.darkGreen,

        width: wp(15)
    },
    Price: {
        fontSize: 13,
        color: Color.darkGreen,

        width: wp(15)

    },
    Quantity: {
        fontSize: 13,
        color: Color.darkGreen,

        width: wp(19)

    },
    itemTotal: {
        fontSize: 13,
        color: Color.darkGreen,

        width: wp(15)

    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
    },
    total: {
        fontSize: 18,
        fontWeight: 'bold',

    },
    total1: {
        fontSize: 17,
        marginLeft: 7,
        marginTop: 2,

    },
    slideContainerClient: {
        backgroundColor: Color.geen,
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
        // height: hp(2=10),
        opacity: 2,
        // paddingBottom: 20,
        marginTop: 15,
    },

    LIstText2: {
        color: 'rgba(106,106,106,255)',
        fontFamily: 'Poppins-SemiBold',
        width: wp(50),
        // backgroundColor: "red",
        fontSize: 12,

        //alignSelf: "center",
        // backgroundColor: 'yellow',
        //height: hp(10)
    },

    subHead: {
        width: wp(30),
        fontSize: 12,
        // backgroundColor: "red",
        paddingLeft: 10,
        fontFamily: 'Poppins-SemiBold',
        //  backgroundColor: "red",
        color: Color.headerIconBG
    },
    headingClient: {
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        // maxWidth:'80%',
        color: '#fff',
        // height:40,
        marginTop: 10,
        // marginLeft: 20,
        fontWeight: '600',

        // textAlign: 'center',
    },
    contentView: {
        height: wp(10),
        width: wp(90),
        borderColor: '#d0e4e6',
        borderBottomWidth: 0.5,
        // backgroundColor: "green",
        backgroundColor: '#fff',
        alignItems: 'center',
        // marginTop: 1,
        justifyContent: 'space-between',
        // padding: 10,
        flexDirection: 'row',
        // borderRadius: 20,
        // marginLeft: 10,
        // marginRight: 10,
    },
    contentView1: {
        height: 50,
        backgroundColor: Color.geen,
        marginTop: 1,
        // padding: 10,
        flexDirection: 'row',
        // borderRadius: 20,
        // marginLeft: 10,
        // marginRight: 10,
    },
    contentView2: {
        // height: 50,
        backgroundColor: '#fff',
        marginTop: 1,
        padding: 10,
        flexDirection: 'row',
        // borderRadius: 20,
        // marginLeft: 10,
        // marginRight: 10,
    },
    Final: {
        backgroundColor: 'gray',
        height: hp(7),
        width: wp(25),
        paddingTop: 8,
        paddingLeft: 4
    }
});
