import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList ,ImageBackground} from 'react-native'
import React, { useEffect, useState } from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { DataTable } from 'react-native-paper';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Color } from '../Style';
import { GetDetailsbyOrderId } from '../Redux/Actions/PaymentAction';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../Component/Loader';
import CustomBottomTab from '../Component/CustomBottomTab';

const ViewOrder = ({ route }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { MY_INFO } = useSelector(state => state.TaxLeafReducer);
    const { GET_ORDER_DETAILS } = useSelector(state => state.PaymentReducer);
    const bgImage = require('../Assets/img/guest_shape.png');

    console.log(GET_ORDER_DETAILS, 'orderInfoRedux')

    const [loader, setLoader] = useState(false);

    const jsonData = MY_INFO.guestInfo;
    const orderId = route.params.orderId;
    const collectionInfo = GET_ORDER_DETAILS[0]?.collectionInfo
    const companyClientContactInfo = GET_ORDER_DETAILS[0]?.companyClientContactInfo
    const serviceListModel = GET_ORDER_DETAILS[0]?.serviceListModel[0]
    const projectInfo = GET_ORDER_DETAILS[0]?.projectInfo
    const serviceList = GET_ORDER_DETAILS[0]?.serviceListModel;

    // Calculate the sum of "priceCharged" using reduce
    const totalPriceCharged = serviceList?.reduce((sum, service) => {
        // Access the "priceCharged" property within "reqInfo"
        const priceCharged = service?.reqInfo?.priceCharged;
        // Add the current priceCharged to the sum
        return sum + priceCharged;
    }, 0); // Initialize sum with 0

    console.log("Total Price Charged:", totalPriceCharged);
    // GET_ORDER_DETAILS[0]?.serviceListModel.map(item => console.log(item.individualInfo.firstName, 'prec'))

    useEffect(() => {
        setLoader(true);
        dispatch(
            GetDetailsbyOrderId(jsonData?.clientId, jsonData?.clientType, orderId, navigation),
        );
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }, [orderId])
    return (
        <View>
            <Loader flag={loader} />
            <View

          style={{backgroundColor:'#d5e3e5'}}
          >
            <ScrollView>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('HomeScreen') }}
                >
                    <Text style={{
                        color: Color.white,
                        fontSize: 12,
                        backgroundColor: '#8AB645',
                        padding: 5,
                        paddingTop: 10,
                        textAlign: 'center',
                        width: wp(35),
                        marginLeft: 210,
                        borderRadius: 3,
                        height: hp(5),
                        marginTop: 10,
                    }}>
                        Back To Dashboard
                    </Text>
                </TouchableOpacity>
                <View style={styles.slideContainer}>
                    <Text style={styles.orderId}>Order Id: {collectionInfo?.orderId}</Text>
                    <DataTable style={styles.container}>
                        <DataTable.Header style={styles.tableHeader}>
                            <DataTable.Title>
                                <Text style={styles.invoice}> Invoice Details</Text>

                            </DataTable.Title>

                        </DataTable.Header>
                        <DataTable.Row>

                            <DataTable.Cell ><Text style={styles.KeyName}>Created Time</Text></DataTable.Cell>
                            <DataTable.Cell><Text style={styles.ValueName}>{collectionInfo?.creationDate}
                            </Text></DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell ><Text style={styles.KeyName}>Invoice Type</Text></DataTable.Cell>
                            <DataTable.Cell><Text style={styles.ValueName}>{collectionInfo?.clientType}</Text></DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell ><Text style={styles.KeyName}>Created By Staff</Text></DataTable.Cell>
                            <DataTable.Cell><Text style={styles.ValueName}>{serviceListModel?.requesetedStaffInfo?.firstName + ' ' + serviceListModel?.requesetedStaffInfo?.lastName}</Text></DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell ><Text style={styles.KeyName}>Incorporated Date</Text></DataTable.Cell>
                            <DataTable.Cell><Text style={styles.ValueName}>2021-01-01</Text></DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>

                            <DataTable.Cell ><Text style={styles.KeyName}>Client ID</Text></DataTable.Cell>
                            <DataTable.Cell><Text style={styles.ValueName}>MREALESTATE</Text></DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell ><Text style={styles.KeyName}>Federal ID</Text></DataTable.Cell>
                            <DataTable.Cell><Text style={styles.ValueName}>81-3900350</Text></DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell ><Text style={styles.KeyName}>State Of Incorporation</Text></DataTable.Cell>
                            <DataTable.Cell><Text style={styles.ValueName}>Florida</Text></DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell ><Text style={styles.KeyName}>Type Of Company</Text></DataTable.Cell>
                            <DataTable.Cell><Text style={styles.ValueName}>S Corporation</Text></DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>

                            <DataTable.Cell ><Text style={styles.KeyName}>Fiscal Year End</Text></DataTable.Cell>
                            <DataTable.Cell><Text style={styles.ValueName}>December</Text></DataTable.Cell>
                        </DataTable.Row>
                        <View style={styles.contentView}>
                            <Text style={styles.subHead1}>Contact Info</Text>

                            <Text style={styles.LIstText2}>
                                <Text style={styles.KeyName1}>Contact Type: Main</Text>{"\n"}
                                Name: {companyClientContactInfo?.firstName + ' ' + companyClientContactInfo?.lastName}{"\n"}
                                Phone: {companyClientContactInfo?.phone1}
                                {"\n"}Email: {companyClientContactInfo?.email1}{"\n"}
                                Address: {companyClientContactInfo?.address1}, {companyClientContactInfo?.city}, {companyClientContactInfo?.zip}
                            </Text>
                        </View>

                        <View style={styles.contentView}>
                            <Text style={styles.subHead1}>Owners</Text>
                            <View>

                                {
                                    GET_ORDER_DETAILS[0] && GET_ORDER_DETAILS[0]?.managerPercentageInfo.map((item, index) => (
                                        <Text style={styles.LIstText2}>

                                            <Text style={styles.KeyName1}>Manager</Text>{"\n"}
                                            Name: {item?.individualInfo?.firstName + ' ' + item?.individualInfo?.lastName}{"\n"}
                                            Percentage: {item?.percentageInfo.percentage}%{"\n"}

                                        </Text>
                                    ))
                                }
                            </View>


                        </View>

                        <DataTable.Row>
                            <DataTable.Cell ><Text style={styles.KeyName}>Office</Text></DataTable.Cell>
                            <DataTable.Cell><Text style={styles.ValueName}>TaxLeaf Corporate</Text></DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell ><Text style={styles.KeyName}>Office ID</Text></DataTable.Cell>
                            <DataTable.Cell><Text style={styles.ValueName}>{collectionInfo?.officeId}</Text></DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell ><Text style={styles.KeyName}>Partner</Text></DataTable.Cell>
                            <DataTable.Cell><Text style={styles.ValueName}>Moses Admin</Text></DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell ><Text style={styles.KeyName}>Manager</Text></DataTable.Cell>
                            <DataTable.Cell><Text style={styles.ValueName}>Moses Admin</Text></DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell ><Text style={styles.KeyName}>Referred By Source</Text></DataTable.Cell>
                            <DataTable.Cell><Text style={styles.ValueName}>Corporate Office</Text></DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell ><Text style={styles.KeyName}>Referred By Name</Text></DataTable.Cell>
                            <DataTable.Cell><Text style={styles.ValueName}>website</Text></DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell ><Text style={styles.KeyName}>Language</Text></DataTable.Cell>
                            <DataTable.Cell><Text style={styles.ValueName}>English</Text></DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell ><Text style={styles.KeyName}>Language Id</Text></DataTable.Cell>
                            <DataTable.Cell><Text style={styles.ValueName}>1</Text></DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>

                </View>
                <View style={styles.slideContainer1} >
                    <Text style={styles.service}>Services</Text>

                    {
                        GET_ORDER_DETAILS[0] && GET_ORDER_DETAILS[0]?.serviceListModel.map((item, index) => (
                            <View style={styles.semiContainer}>
                                <View style={styles.contentView1}>
                                    <Text style={styles.subHead}>Category:</Text>

                                    <Text style={styles.LIstText21}>{item?.serviceInfo?.category?.name}</Text>
                                </View>
                                <View style={styles.contentView1} >
                                    <Text style={styles.subHead}>Service:</Text>

                                    <Text style={styles.LIstText2}>
                                        {item?.serviceInfo?.description}
                                    </Text>
                                </View>
                                <View style={styles.contentView1}>
                                    <Text style={styles.subHead}>Retail Price:</Text>

                                    <Text style={styles.LIstText2}>${item?.reqInfo?.retailPrice}</Text>
                                </View>
                                <View style={styles.contentView1}>
                                    <Text style={styles.subHead}>Override Price:</Text>

                                    <Text style={styles.LIstText2}>
                                        ${item?.reqInfo?.priceCharged}
                                    </Text>
                                </View>
                                <View style={styles.contentView1}>
                                    <Text style={styles.subHead}>Quantity:</Text>

                                    <Text style={styles.LIstText2}>
                                        {item?.reqInfo?.quantity}
                                    </Text>
                                </View>
                                <View style={styles.contentView1}>
                                    <Text style={styles.subHead}>Total:</Text>

                                    <Text style={styles.LIstText2}>
                                        ${item?.reqInfo?.priceCharged}
                                    </Text>
                                </View>
                                <View style={styles.contentViewNotes}>
                                    <Text style={styles.subHeadNotes}>Notes:</Text>

                                    <Text style={styles.LIstTextNotes}>
                                        {item?.notesListInfo[0]?.note1}                            </Text>
                                </View>
                                {/* <View style={styles.part}></View> */}


                            </View>
                        ))}

                    <View style={styles.semiContainer}>
                        <Text style={styles.service1}>Invoice Notes</Text>
                        <View style={styles.part}></View>
                        <Text style={styles.service2}>{serviceListModel?.notesListInfo[0]?.note1}</Text>



                    </View>
                    {
                        projectInfo?.projectId ?
                            <View style={[styles.semiContainer, { flexDirection: 'row' }]}>
                                <Text style={styles.service3}>Associated Project Id:</Text>
                                <Text style={{ marginTop: 12, marginLeft: 16, fontSize: 15 }}>{projectInfo?.projectId}</Text>



                            </View> : null
                    }

                    <Text style={styles.price}>Total Price: ${totalPriceCharged}</Text>
                </View>

            </ScrollView>
            </View>
            <CustomBottomTab/>
        </View>
    )
}

export default ViewOrder

const styles = StyleSheet.create({
    slideContainer: {
        backgroundColor: '#fff',
        width: wp(90),
        justifyContent: 'center',
        alignSelf: 'center',
        /// height: 420,
        opacity: 2,
        // paddingBottom: 20,
        borderRadius: 10,
        marginTop: 20,
        // width:'62%'
    },
    slideContainer1: {
        backgroundColor: '#8AB645',
        width: wp(90),
        justifyContent: 'center',
        alignSelf: 'center',
        opacity: 2,
        paddingBottom: 20,
        borderRadius: 10,
        marginTop: 20,
        // width:'62%'
    },
    part: {
        borderWidth: 0.5,
        borderColor: '#676A6C',
        marginTop: 10,
        width: '100%',
        alignSelf: 'center',
        marginBottom: 5
    },
    LIstText2: {
        color: '#676A6C',
        width: wp(45),
    },
    LIstTextNotes: {
        color: '#676A6C',
        width: wp(38),
    },
    LIstText21: {
        color: '#676A6C',
        fontWeight: '600',

    },
    subHead1: {
        width: 145,
        fontSize: 13,
        fontWeight: '800',
        color: '#06A0D6',

    },
    subHead: {
        width: 150,
        fontSize: 15,
        fontWeight: '600',
        color: '#676A6C',
    },
    subHeadNotes: {
        width: 148,
        fontSize: 15,
        fontWeight: '600',
        color: '#676A6C',
    },
    contentView: {
        height: hp(30),
        backgroundColor: '#fff',
        marginTop: 10,
        // padding: 10,
        flexDirection: 'row',
        borderRadius: 20,
        marginLeft: 10,
        marginRight: 10,
        width: wp(85),
    },
    contentViewNotes: {
        height: hp(16),
        marginTop: 10,
        // padding: 10,
        flexDirection: 'row',
        borderRadius: 20,

        width: wp(43),
    },
    contentView1: {
        height: 30,

        flexDirection: 'row',

    },
    semiContainer: {
        // height: hp(40),
        backgroundColor: '#fff',
        marginTop: 10,
        padding: 10,
        borderRadius: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    orderId: {
        width: 150,
        fontSize: 18,
        fontWeight: '400',
        color: '#000',
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10
    },
    invoice: {
        // width: 150,
        fontSize: 16,
        fontWeight: '400',
        color: 'purple',
    },
    service: {
        fontSize: 17,
        fontWeight: '600',
        color: '#fff',
        marginLeft: 20,
        marginTop: 10
    },
    service1: {
        fontSize: 17,
        fontWeight: '600',
        color: '#06A0D6',
        marginLeft: 20,
        marginTop: 10
    },
    service2: {
        fontSize: 17,
        fontWeight: '600',
        color: '#676A6C',
        marginLeft: 20,
        marginTop: 10
    },
    service3: {
        fontSize: 17,
        fontWeight: '600',
        color: '#676A6C',
        marginTop: 10
    },
    container: {
        padding: 5,
    },
    tableHeader: {
        backgroundColor: '#00FFFF',

    },
    KeyName: {
        fontSize: 13,
        fontWeight: '800',
        color: '#676A6C',
    },
    KeyName1: {
        fontSize: 13,
        fontWeight: '800',
        color: '#676A6C',
    },
    ValueName: {
        fontSize: 13,

        color: '#676A6C',
    },
    price: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '800',
        marginTop: 10,
        marginLeft: 150
    },
    
})