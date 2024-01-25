import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Alert } from 'react-native';
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

export default InvoiceView = ({ route }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const { MY_INFO } = useSelector(state => state.TaxLeafReducer);
    const { GET_ORDER_DETAILS } = useSelector(state => state.PaymentReducer);
    const { MANAGER_INFO } = useSelector(state => state.TaxLeafReducer);

    console.log(GET_ORDER_DETAILS, 'orderInfoInvoice')
    console.log(MANAGER_INFO, 'MANAGER_INFO')

    const [loader, setLoader] = useState(false);
    const orderId = route.params.orderId;
    const jsonData = MY_INFO.guestInfo;
    const collectionInfo = GET_ORDER_DETAILS[0]?.collectionInfo
    const companyClientContactInfo = GET_ORDER_DETAILS[0]?.companyClientContactInfo
    const serviceListModel = GET_ORDER_DETAILS[0]?.serviceListModel[0]
    const managerInfo = MANAGER_INFO?.managerInfo
    const officeInfo = MANAGER_INFO?.officeInfo
    const serviceList = GET_ORDER_DETAILS[0]?.serviceListModel;

    // Calculate the sum of "priceCharged" using reduce
    const totalPriceCharged = serviceList?.reduce((sum, service) => {
        // Access the "priceCharged" property within "reqInfo"
        const priceCharged = service?.reqInfo?.priceCharged;
        // Add the current priceCharged to the sum
        return sum + priceCharged;
    }, 0); // Initialize sum with 0
    console.log("Total Price Charged:", totalPriceCharged);

    console.log("route.params.orderId",route.params.orderId);
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

            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.title}>Invoice</Text>
                </View>
                <View style={styles.invoiceInfoContainer}>
                    <View style={styles.invoiceInfo}>
                        <Text style={styles.label}>Order Id:</Text>
                        <Text style={styles.text}>{collectionInfo?.orderId}</Text>
                    </View>
                    <View style={styles.invoiceInfo}>
                        <Text style={styles.label}>Invoice Date:</Text>
                        <Text style={styles.text}>{collectionInfo?.creationDate}</Text>
                    </View>
                </View>
                <View style={styles.divider} />
                <View style={styles.customerInfoContainer}>
                    <Text style={styles.subtitle}>INVOICE TO:</Text>
                    <View style={styles.customerInfo}>
                        {/* <Text style={styles.label}>Name:</Text> */}
                        <Text style={styles.text}>{collectionInfo?.clientId}</Text>
                    </View>
                    <View style={styles.customerInfo}>
                        {/* <Text style={styles.label}>Email:</Text> */}
                        <Text style={styles.text}>{companyClientContactInfo?.phone1}</Text>
                    </View>
                    <View style={styles.customerInfo}>
                        {/* <Text style={styles.label}>Address:</Text> */}
                        <Text style={styles.text}>{companyClientContactInfo?.address1}, {companyClientContactInfo?.city}, {companyClientContactInfo?.zip}</Text>
                    </View>
                </View>
                <View style={styles.customerInfoContainer}>
                    <Text style={styles.subtitle}>INVOICE FROM:</Text>
                    <View style={styles.customerInfo}>
                        {/* <Text style={styles.label}>Name:</Text> */}
                        <Text style={styles.text}>{officeInfo?.name}</Text>
                    </View>
                    <View style={styles.customerInfo}>
                        {/* <Text style={styles.label}>Name:</Text> */}
                        <Text style={styles.text}>{managerInfo?.firstName + ' ' + managerInfo?.lastName}</Text>
                    </View>
                    <View style={styles.customerInfo}>
                        {/* <Text style={styles.label}>Email:</Text> */}
                        <Text style={styles.text}>{officeInfo?.phone}</Text>
                    </View>
                    <View style={styles.customerInfo}>
                        {/* <Text style={styles.label}>Address:</Text> */}
                        <Text style={styles.text}>{officeInfo?.address}, {officeInfo?.city}, {officeInfo?.zip}</Text>
                    </View>
                </View>
                <View style={styles.divider} />
                <View style={styles.itemsContainer}>
                    <Text style={styles.subtitle}>Invoice Items</Text>
                    <View style={styles.item} >
                        <Text style={[styles.itemName, {
                            fontWeight: 'bold',
                        }]}>#Order</Text>
                        <Text style={[styles.itemDetails, {
                            fontWeight: 'bold',
                        }]}>
                            Period
                        </Text>
                        <Text style={[styles.Price, {
                            fontWeight: 'bold',
                        }]}>Price</Text>
                        <Text style={[styles.Quantity, {
                            fontWeight: 'bold',
                        }]}>Quantity</Text>
                        <Text style={[styles.Final, {
                            fontWeight: 'bold',
                        }]}>Final Price</Text>

                    </View>
                    {
                        GET_ORDER_DETAILS[0] && GET_ORDER_DETAILS[0]?.serviceListModel.map((item, index) => (
                            <View style={styles.item}>
                                <Text style={styles.itemName}>{item?.serviceInfo?.description}</Text>
                                <Text style={styles.itemDetails}>
                                    N/A
                                </Text>
                                <Text style={styles.Price}>${item?.reqInfo?.priceCharged}</Text>
                                <Text style={styles.Quantity}>{item?.reqInfo?.quantity}</Text>

                                <Text style={styles.itemTotal}>${item?.reqInfo?.priceCharged}</Text>

                            </View>
                        ))
                    }
                    {/* {invoiceData.items.map((item) => (
                        <View style={styles.item} key={item.id}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemDetails}>
                                ${item.price}
                            </Text>
                            <Text style={styles.Price}>${item.total}</Text>
                            <Text style={styles.Quantity}>$ {item.quantity}</Text>

                            <Text style={styles.itemTotal}>${item.total}</Text>

                        </View>
                    ))} */}
                </View>
                <View style={styles.divider} />
                <View style={styles.totalContainer}>
                    <Text style={styles.label}>Total:</Text>
                    <Text style={styles.total1}>${totalPriceCharged}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20 }}>
                    <TouchableOpacity
                    >
                        <Text style={{
                            color: Color.white,
                            fontSize: 12,
                            backgroundColor: '#8AB645',
                            padding: 5,
                            textAlign: 'center',
                            width: wp(20),
                            height: hp(5),
                            borderRadius: 20,
                            paddingTop: 10
                        }}>
                            Print
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    >
                        <Text style={{
                            color: Color.white,
                            fontSize: 12,
                            backgroundColor: '#8AB645',
                            padding: 5,
                            textAlign: 'center',
                            width: wp(20),
                            height: hp(5),
                            borderRadius: 20,
                            paddingTop: 10,
                            marginLeft: 5,
                            marginRight: 5
                        }}>
                            Download
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    >
                        <Text style={{
                            color: Color.white,
                            fontSize: 12,
                            backgroundColor: '#8AB645',
                            padding: 5,
                            textAlign: 'center',
                            width: wp(20),
                            height: hp(5),
                            borderRadius: 20,
                            paddingTop: 10
                        }}>
                            Pay Now
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        // marginTop: 80,
        backgroundColor:'#d5e3e5'
    },
    header: {
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#8AB645',
        padding: 5

    },
    invoiceInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    invoiceInfo: {
        flexDirection: 'row',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    text: {
        marginLeft: 5,
        marginTop: 4
    },
    divider: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginVertical: 20,
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
        marginVertical: 5,
    },
    itemName: {
        fontSize: 13,
        width: wp(15)
    },
    itemDetails: {
        fontSize: 13,

        width: wp(15)
    },
    Price: {
        fontSize: 13,

        width: wp(15)

    },
    Quantity: {
        fontSize: 13,

        width: wp(15)

    },
    itemTotal: {
        fontSize: 13,

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
        marginTop: 2
    },
});
