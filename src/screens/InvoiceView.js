import React, { useEffect, useState } from 'react'
import {
    View, Text,
    Modal, StyleSheet,
    Platform,
    TextInput,
    ScrollView, TouchableOpacity, FlatList, Alert, Image
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Dropdown } from 'react-native-element-dropdown';
import { Color } from '../Style';
import { GetDetailsbyOrderId } from '../Redux/Actions/PaymentAction';
import { ManagerInfo } from '../Redux/Actions/TaxLeaf';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../Component/Loader';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import CustomBottomTab from '../Component/CustomBottomTab';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import { PermissionsAndroid } from 'react-native';


import HeadTabs from './HeadTabs';



export default InvoiceView = ({ route }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const { MY_INFO } = useSelector(state => state.TaxLeafReducer);
    const { GET_ORDER_DETAILS } = useSelector(state => state.PaymentReducer);
    const { MANAGER_INFO } = useSelector(state => state.TaxLeafReducer);
    const { OFFICE_INFO } = useSelector(state => state.TaxLeafReducer);
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [error, setError] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');


    console.log(GET_ORDER_DETAILS, 'orderInfoInvoiceorderInfoInvoiceorderInfoInvoice')
    console.log(MANAGER_INFO, 'MANAGER_INFO')
    const [datePicker, setDatePicker] = useState(false);
    const [date, setDate] = useState(new Date());
    const [loader, setLoader] = useState(false);
    const orderId = route.params.orderId;
    const countryname = route.params.countryname;
    const jsonData = MY_INFO.guestInfo;
    const collectionInfo = GET_ORDER_DETAILS[0]?.collectionInfo
    const individualClientContactInfo = GET_ORDER_DETAILS[0]?.individualClientContactInfo
    const companyClientContactInfo = GET_ORDER_DETAILS[0]?.companyClientContactInfo
    const serviceListModel = GET_ORDER_DETAILS[0]?.serviceListModel[0]
    const managerInfo = MANAGER_INFO;
    const officeInfo = OFFICE_INFO;
    const serviceList = GET_ORDER_DETAILS[0]?.serviceListModel;

    //   console.log(serviceList.priceCharged, 'serviceListserviceListserviceList')

    console.log(value, 'Selectionnnn')

    //const bgImage = require('../Assets/img/guest_shape.png');
    //const bgImage1 = '../Assets/img/guest_shape.png'

    //const base64Image = Image.resolveAssetSource(bgImage);
    //const dataUri = `data:image/png;base64,${base64Image.base64}`;



    // Calculate the sum of "priceCharged" using reduce
    const totalPriceCharged = serviceList?.reduce((sum, service) => {
        // Access the "priceCharged" property within "reqInfo"
        const priceCharged = service?.reqInfo?.priceCharged;
        // Add the current priceCharged to the sum
        return sum + priceCharged;
    }, 0); // Initialize sum with 0
    console.log("Total Price Charged:", totalPriceCharged);

    console.log("route.params.orderId", route.params.orderId);
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

    const data1 = [
        { label: 'Paypal', value: '1' },
        { label: 'Credit Card', value: '2' },
        // { label: 'Regular', value: '3' },

    ];

    const handleDropdownChange = (item) => {
        console.log(item, 'IIIII')
        setValue(item.value);
        setIsFocus(false);
        setError(''); // Clear the error message when a value is selected
    };

    console.log(value, 'KKKKKKKKKKK')

    const handleBlur = () => {
        setIsFocus(false);
        handleValidation(); // Validate on blur
    };


    const handleValidation = () => {
        if (!value) {
            setError('Please select an option');
            return false;
        }
        setError('');
        return true;
    };

    const onDateSelected = (event, value) => {
        setDate(value);
        setDatePicker(false);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoader(true);

                // Fetch order details
                await dispatch(GetDetailsbyOrderId(jsonData?.clientId, jsonData?.clientType, orderId, navigation));

                // Fetch manager info
                //  await dispatch(ManagerInfo(jsonData?.clientId, jsonData?.clientType, navigation));
                setTimeout(() => {
                    setLoader(false);
                }, 1000);
            } catch (error) {
                console.error("Error fetching data:", error);
                setTimeout(() => {
                    setLoader(false);
                }, 1000);
            }
            // finally {
            //     setLoader(false);
            // }
        };

        fetchData();

    }, []);


    useEffect(() => {
        requestStoragePermission();
    }, []);

    const requestStoragePermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Storage Permission Required',
                    message: 'This app needs access to your storage to download PDF files.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Storage permission granted');
                // Call your PDF generation and download logic here
            } else {
                console.log('Storage permission denied');
            }
        } catch (error) {
            console.error('Error requesting storage permission:', error);
        }
    };


    // useEffect(() => {
    //     setLoader(true);

    //     dispatch(
    //         GetDetailsbyOrderId(jsonData?.clientId, jsonData?.clientType, orderId, navigation),
    //     );
    //     setTimeout(() => {
    //         setLoader(false);
    //     }, 2000);
    // }, [orderId])
    // useEffect(() => {
    //     dispatch(ManagerInfo(jsonData?.clientId, jsonData?.clientType, navigation));

    // }, [])


    const generatePDF = async () => {

        try {


            const bgImageUri = Image.resolveAssetSource(require('./assets/image/contador-logo.png')).uri;
            const invoiceImageUri = Image.resolveAssetSource(require('./assets/image/invoice.png')).uri;
            const locationImageUri = Image.resolveAssetSource(require('./assets/image/location.png')).uri;
            const phoneImageUri = Image.resolveAssetSource(require('./assets/image/whatsapp.png')).uri;



            // const imageUri = await Image.resolveAssetSource(bgImage).uri
            const convertToBase64 = async (imageUri) => {
                try {
                    const response = await fetch(imageUri);
                    const blob = await response.blob();
                    return new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = () => {
                            const base64Data = reader.result.split(',')[1];
                            resolve(base64Data);
                        };
                        reader.onerror = reject;
                        reader.readAsDataURL(blob);
                    });
                } catch (error) {
                    console.error('Error converting image to base64:', error);
                    return null;
                }
            };

            // Convert images to base64
            const [bgBase64, invoiceBase64, locationbase64, phonebase64] = await Promise.all([
                convertToBase64(bgImageUri),
                convertToBase64(invoiceImageUri),
                convertToBase64(locationImageUri),
                convertToBase64(phoneImageUri)
            ]);

            const htmlContent = `
                        
                      
     <!DOCTYPE html>
     <html lang="en">
    <head>
    <title>Bootstrap Example</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
    </head>
    <body style="background: #e9ecef; width: 794px; margin: 0 auto;">

        <div style=" background: #fff;">
            <div class="container p-0">
                <div class="row">
                    <div class="col-md-6">
                        <div class="logo">
                         
                          <img src="data:image/png;base64,${bgBase64}" alt="logo" class="img-fluid" width="225"/>
                     
                            </div>
                    </div>
                    <div class="col-md-6 ">
                        <div class="invoice-right float-right">
                          <img src="data:image/png;base64,${invoiceBase64}" alt="invoice" class="img-fluid" width="165"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container" style="padding-left: 39px;">
                <div class="row">
                    <div class="col-md-7">
                        <div>
                            <div class="green-box">
                                <span style="background: #97b550; padding: 0 5px; color: #fff; font-weight: 600;">BILL TO</span>
                                <ul style="list-style: none; margin-top: 20px; padding-left: 0px;">
                                    <li style="float: left; width: 20%;">Client:</li>
                                    <li style="float: left; width: 80%;">`+ `${companyClientContactInfo?.firstName}` + " " + `${companyClientContactInfo?.lastName}` + `</li>
                                    <li style="float: left; width: 20%;">Address: </li>
                                    <li style="float: left; width: 80%;">`+ `${companyClientContactInfo?.address1}` + `,` + `${companyClientContactInfo?.city}` + `,` + `${companyClientContactInfo?.zip}` + `,` + `${countryname}` + `</li>
                                  
                                    <li style="float: left; width: 20%;">Phone:</li>
                                    <li style="float: left; width: 20%;">`+ `${companyClientContactInfo?.phone1}` + `</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-5">
                        <div>
                            <div class="blue-box">
                                <span style="background: #233859; padding: 0 5px; color: #fff; font-weight: 600;">FROM: TaxLeaf Corporate</span>
                                <ul style="margin-top: 20px; padding-left: 0px; list-style: none;">
                                    <li>
                                         <img src="data:image/png;base64,${locationbase64}" alt="" class="img-fluid" width="19"> <span style="color: #243859;">` + `${officeInfo?.address}` + `,` + `${officeInfo?.city}` + `,` + `${officeInfo?.zip}` + `<br>
                                          </span>
                                    </li>
                                    <li>
                                         <img src="data:image/png;base64,${phonebase64}" alt="" class="img-fluid" width="17"> <span style="color: #243859;">` + `${officeInfo?.phone}` + `</span>
                                    </li>
                                   
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <div class="col-md-11" style="background-color: #65a1a1; margin-left: 30px;  padding: 12px 19px;">
                <div class="row">
                    <div class="col-md-12">
                        <div>
                            <p style="color: #fff; text-transform: uppercase; margin-bottom: 5px; font-size: 20px; font-weight: 500;">invoice data</p>
                            <p style="color: #fff; margin-bottom: 5px;">
                                <span style="text-transform: capitalize; font-weight: 500;">invoice date:</span> <span>`+ `${collectionInfo?.creationDate}` + `</span></p>
                            <p style="color: #fff; margin-bottom: 5px;">
                                <span style="text-transform: capitalize; font-weight: 500;">invoice:</span> <span>`+ `${collectionInfo?.invoiceId}` + `</span></p>
                        </div>
                    </div>
                </div>
                <div class="row mt-4">
                `+
                `${GET_ORDER_DETAILS[0] && GET_ORDER_DETAILS[0]?.serviceListModel.map((item, index) => (`
                <div class="col-md-6">
                        <div>
                            <span style="background: #97b550; padding: 0 5px; color: #fff;font-size: 20px; font-weight: 600; text-transform: uppercase;">Service</span>
                        </div>
                        <p style="color: #fff; font-size: 16px; font-weight: 600; text-transform: capitalize;">`+ `${item?.serviceInfo?.description}` + `</p>
                    </div>
                    <div class="col-md-3 text-center">
                        <div>
                            <span style="background: #97b550; padding: 0 5px; color: #fff;font-size: 20px; font-weight: 600; text-transform: uppercase;">Quantiy</span>
                        </div>
                        <p style="color: #fff; font-size: 16px; font-weight: 600; text-transform: capitalize;">`+ `${item?.reqInfo?.quantity}` + `</p>
                    </div>
                    <div class="col-md-3 text-center">
                        <div>
                            <span style="background: #97b550; padding: 0 5px; color: #fff;font-size: 20px; font-weight: 600; text-transform: uppercase;">Amount</span>
                        </div>
                        <p style="color: #fff; font-size: 16px; font-weight: 600; text-transform: capitalize;">$`+ `${item?.reqInfo?.priceCharged}` + `</p>
                    </div>
                </div >
        <div class="row" style="border-top: 2px solid #fff;">
            <div class="col-md-9">
                <div>
                    <span style="padding: 0 5px; color: #fff;font-size: 20px; font-weight: 600; text-transform: uppercase;">Total</span>
                </div>
            </div>
            <div class="col-md-3 text-center">
                <div>
                    <span style="padding: 0 5px; color: #fff;font-size: 20px; font-weight: 600; text-transform: uppercase;">$`+ `${item?.reqInfo?.priceCharged}` + `</span>
                </div>
            </div>
        </div>
            </div >
                   
                `))
                }`
                + `
                    
            <div class="container mb-5">
                <div class="row">
                    <div class="col-md-12 text-center">
                        <div>
                            <p style="color: #000; margin-bottom: 8px; ">Click Here to pay now</p>
                            <a href="https://clientportal.taxleaf.com/client-payment/payment/paynow/NzQzNzA=" target="_blank" style="background: #97b550; color: #fff; font-size: 20px; font-weight: 800; padding: 2px 10px; border-radius: 9px;">Pay Now!</a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container my-5">
                <div class="row">
                    <div class="col-md-12">
                        <div>
                            <p style="font-size: 14px; margin-bottom: 0; margin-top: 6rem;">Late Fees Disclousure:</p>
                            <p style="font-size: 14px; margin-bottom: 30rem;">Please Note: If any invoiced amount is not received by the mentioned due date, then those charges may accrue a late fee of
                                $30 added to the invoice. Also, after every other month, late fees will increase by 5%. </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </body>
</html>
                        `;

            const options = {
                html: htmlContent,
                fileName: `${collectionInfo?.invoiceId}`,
                directory: 'Documents'
            };
            const file = await RNHTMLtoPDF.convert(options);
            console.log('PDF generated:', file.filePath);
            downloadPDF(file.filePath);

        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };







    const downloadPDF = async (filePath) => {

        try {
            // const destPath = `${RNFS.DownloadDirectoryPath}/TestPDF.pdf`; // Destination path
            let destPath;
            if (Platform.OS === 'android') {
                destPath = `${RNFS.DownloadDirectoryPath}/Invoice${collectionInfo?.invoiceId}.pdf`; // Destination path for Android
                console.log('ANDROIDDDDDDDDDDD')
            } else if (Platform.OS === 'ios') {
                destPath = `${RNFS.DocumentDirectoryPath}/Invoice${collectionInfo?.invoiceId}.pdf`; // Destination path for iOS
                console.log(destPath, 'iosssssssss')
            } else {
                throw new Error('Unsupported platform');
            }
            await RNFS.moveFile(filePath, destPath); // Move the file to the destination path
            Alert.alert('Success', 'PDF downloaded successfully');
        } catch (error) {
            console.error('Error downloading PDF:', error);
            Alert.alert('Error', 'Failed to download PDF', error);
        }

    };

    return (
        <View style={styles.container}>
            <Loader flag={loader} />
            <ScrollView style={{ paddingBottom: 80 }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <HeadTabs />

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
                                marginTop: 11,
                                marginRight: 5,
                                // borderRadius: 50,
                                //alignSelf: 'center',
                            }}
                        />
                        <Text style={{ fontSize: 12, fontFamily: 'Poppins-Bold', marginTop: 13 }}>Back to Dashboard</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.invoiceInfoContainer}>
                    <View style={styles.invoiceInfo}>
                        <Text style={styles.label}>Order ID:</Text>
                        <Text style={styles.text}>{collectionInfo?.invoiceId}</Text>
                    </View>
                    <View style={styles.invoiceInfo}>
                        <Text style={styles.label}>Invoice Date:</Text>
                        <Text style={styles.text}>{collectionInfo?.creationDate}</Text>
                    </View>
                </View>
                {/* <View style={styles.divider} /> */}
                <View style={styles.slideContainerClient}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', alignSelf: 'center', marginBottom: 10 }}>
                        <Text style={styles.headingClient}>Invoice To</Text>

                    </View>

                    <View style={styles.contentView}>
                        <Text style={styles.LIstText2}>
                            {collectionInfo?.clientId}
                        </Text>
                    </View>
                    <View style={styles.contentView}>
                        <Text style={styles.LIstText2}>
                            {companyClientContactInfo?.firstName}   {companyClientContactInfo?.lastName}

                        </Text>
                    </View>
                    <View style={styles.contentView}>
                        <Text style={styles.LIstText2}>
                            {/* {companyClientContactInfo?.firstName}   {companyClientContactInfo?.lastName} */}
                            {companyClientContactInfo?.phone1}
                        </Text>
                    </View>
                    <View style={styles.contentView}>
                        <Text style={styles.LIstText2}>
                            {companyClientContactInfo?.address1}, {companyClientContactInfo?.city}, {companyClientContactInfo?.zip},{countryname}
                        </Text>
                    </View>
                </View>
                <View style={[styles.slideContainerClient1, { backgroundColor: '#098d95' }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', alignSelf: 'center', marginBottom: 10 }}>
                        <Text style={styles.headingClient}>Invoice From</Text>

                    </View>

                    <View style={styles.contentView}>
                        <Text style={styles.LIstText2}>
                            {officeInfo?.name}
                        </Text>
                    </View>
                    <View style={styles.contentView}>
                        <Text style={styles.LIstText2}>
                            {managerInfo?.firstName + ' ' + managerInfo?.lastName}
                        </Text>
                    </View>
                    <View style={styles.contentView}>
                        <Text style={styles.LIstText2}>
                            {officeInfo?.phone}
                        </Text>
                    </View>
                    <View style={styles.contentView}>
                        <Text style={styles.LIstText2}>
                            {officeInfo?.address}, {officeInfo?.city}, {officeInfo?.zip}
                        </Text>
                    </View>
                </View>


                <View style={styles.slideContainerClient1}>
                    <View style={{ paddingLeft: 10, width: wp(90), alignSelf: 'center', marginBottom: 10 }}>
                        <Text style={styles.headingClient}>Invoice Items</Text>

                    </View>

                    <View style={styles.contentView1}>
                        <View style={styles.item} >
                            <Text style={[styles.itemName, {
                                fontFamily: 'Poppins-Bold', color: '#fff', fontSize: 12,
                            }]}>#Order</Text>
                            <Text style={[styles.itemDetails, {
                                fontFamily: 'Poppins-Bold', color: '#fff', fontSize: 12,
                            }]}>
                                Period
                            </Text>
                            <Text style={[styles.Price, {
                                fontFamily: 'Poppins-Bold', color: '#fff', fontSize: 12,
                            }]}>Price</Text>

                            <Text style={[styles.Quantity, {
                                fontFamily: 'Poppins-Bold', color: '#fff', fontSize: 12,
                            }]}>Quantity</Text>

                            <View
                                style={styles.Final}
                            >
                                <Text style={{
                                    fontFamily: 'Poppins-Bold', color: '#fff', fontSize: 12,
                                    textAlign: "center"
                                }}>Final Price</Text>
                            </View>


                        </View>
                    </View>
                    <View style={styles.contentView2}>
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
                    </View>

                </View>

                <View style={styles.divider} />
                {/* <View style={styles.totalContainer}>
                    <Text style={styles.label}>Total:</Text>
                    <Text style={styles.total1}>${totalPriceCharged}</Text>
                </View> */}
                <View style={{ width: wp(80), flexDirection: 'row', alignSelf: 'center', justifyContent: "center", margin: 20 }}>
                    {/* <TouchableOpacity
                        style={{
                            color: Color.darkGreen,
                            fontSize: 12,
                            backgroundColor: '#fff',
                            padding: 5,
                            textAlign: 'center',
                            width: wp(28),
                            height: hp(5.5),
                            borderRadius: 20,
                            alignItems: 'center',
                            padding: 12,
                            flexDirection: 'row',
                        }}
                    >
                        <Image source={require('../Assets/img/icons/printInvoice.png')} style={{ marginRight: 6 }} />

                        <Text
                            style={{

                                fontSize: 12,
                                textAlign: "center",
                                fontFamily: 'Poppins-Bold',
                            }}
                        >
                            Print
                        </Text>
                    </TouchableOpacity> */}

                    <TouchableOpacity
                        onPress={() => generatePDF()}
                        style={{
                            color: Color.white,
                            fontSize: 12,
                            backgroundColor: '#8AB645',
                            padding: 10,
                            textAlign: 'center',
                            width: wp(30),
                            height: hp(5.5),
                            borderRadius: 20,
                            marginLeft: 5,
                            marginRight: 5,
                            flexDirection: 'row'
                        }}
                    >
                        <Image source={require('../Assets/img/icons/downloadInvoice.png')} style={{ marginRight: 3 }} />

                        <Text style={{


                            fontSize: 12,
                            textAlign: "center",
                            fontFamily: 'Poppins-Bold',

                            marginTop: 2, color: '#fff'
                        }} >

                            Download
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setModalVisible(true)}
                        style={{
                            color: Color.darkGreen,
                            fontSize: 12,
                            backgroundColor: '#fff',
                            padding: 5,
                            textAlign: 'center',
                            width: wp(30),
                            height: hp(5.5),
                            borderRadius: 20,
                            alignItems: 'center',
                            padding: 12,
                            flexDirection: 'row',
                        }}
                    >
                        <Image source={require('../Assets/img/icons/payInvoice.png')} style={{ marginRight: 2 }} />

                        <Text
                            style={{
                                fontSize: 12,
                                textAlign: "center",
                                fontFamily: 'Poppins-Bold',

                            }}
                        >
                            Pay Now
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <CustomBottomTab />
            <Modal
                ///    animationType="slide"
                // animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View
                            style={{
                                flexDirection: 'row',
                                marginBottom: 20,
                                width: wp(90),
                                alignSelf: 'center',
                            }}>
                            <Text style={styles.Subheading}>Add Payment</Text>
                            <TouchableOpacity
                                onPress={() => setModalVisible(!modalVisible)}
                                // onPress={() => navigation.navigate('ContactUs')}

                                style={{
                                    backgroundColor: '#8AB645',
                                    height: wp(10),
                                    width: wp(10),
                                    borderRadius: 40,
                                    position: 'absolute',
                                    right: -20,
                                    top: -45,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Text style={{ color: '#fff' }}>X</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.formContainer}>

                            <TouchableOpacity
                                style={styles.btn}
                                onPress={() => setDatePicker(true)}>
                                <View style={{ flexDirection: "row", justifyContent: 'space-between', width: wp(75) }}>
                                    <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fff', fontSize: 12 }}>
                                        Payment Date
                                    </Text>
                                    {date ? (
                                        <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fff', fontSize: 12 }}>
                                            {moment(date, 'MM-DD-YYYY').format('ddd,DD MMM YYYY')}
                                        </Text>
                                    ) : (
                                        <Text style={{ color: '#fff', fontSize: 15 }}>Select</Text>
                                    )}
                                </View>

                            </TouchableOpacity>

                            {datePicker && (
                                <DateTimePicker
                                    value={date}
                                    mode={'date'}
                                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                    //   is24Hour={false}
                                    onChange={onDateSelected}
                                    style={styles.datePicker}
                                />
                            )}

                            <Dropdown
                                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                iconStyle={styles.iconStyle}
                                data={data1}
                                maxHeight={200}
                                itemTextStyle={{ fontSize: 12, fontFamily: 'Poppins-SemiBold', color: '#5a5a5a' }} // Set the font size and other styles for dropdown items

                                labelField="label"
                                valueField="value"
                                placeholder={!isFocus ? 'Select' : 'Select'}
                                value={value}
                                onFocus={() => setIsFocus(true)}
                                //  onBlur={() => setIsFocus(false)}
                                onBlur={handleBlur}
                                onChange={(item) => handleDropdownChange(item)}
                            />

                            <Text style={styles.input}>{totalPriceCharged}</Text>
                            {/* <TextInput
                style={styles.input}
                placeholder="Payment Amount"

              // onChangeText={onChangeText}
               value={totalPriceCharged}
              /> */}

                            {value == 2
                                ?
                                <>

                                    <TextInput
                                        style={styles.input}
                                        placeholder="Card Number"

                                    // onChangeText={onChangeText}
                                    // value={text}
                                    />

                                    <TextInput
                                        style={styles.input}
                                        placeholder="Card Holder Name"

                                    // onChangeText={onChangeText}
                                    // value={text}
                                    />
                                </>
                                :
                                null}


                            <View style={styles.slideContainerEdit}>
                                <TextInput
                                    numberOfLines={5}
                                    multiline={true}
                                    placeholder="Notes"
                                    // placeholderTextColor={'lightgrey'}
                                    style={[{
                                        color: Color.HeaderBackground, fontFamily: 'Poppins-SemiBold', fontSize: 12,
                                        padding: 10, paddingTop: 10, textAlignVertical: 'top'
                                    }]}
                                // style={styles.input}
                                // placeholder="Phone"

                                // onChangeText={onChangeText}
                                // value={text}
                                />
                            </View>



                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                // onPress={() => setModalVisible(!modalVisible)}
                                onPress={() => navigation.navigate('Paypal', {
                                    totalPriceCharged: totalPriceCharged

                                })}
                            >
                                <Text style={styles.textStyle}>Proceed</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.screenBg,
        paddingLeft: 20,
        paddingRight: 20,
        // marginTop: 80,
        //   backgroundColor: '#d5e3e5',
        paddingBottom: 80
    },
    header: {
        // alignItems: 'center',
    },
    title: {
        fontSize: 20,
        color: Color.headerIconBG,
        fontFamily: 'Poppins-Bold',
        padding: 5
    },

    invoiceInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginTop: 10,
    },

    invoiceInfo: {
        flexDirection: 'row',
    },

    label: {
        fontSize: 14,
        fontFamily: 'Poppins-Bold',
    },

    text: {
        marginLeft: 5,
        fontFamily: 'Poppins-Bold',
        // marginTop: 4
    },

    dropdown: {
        height: 40,
        borderColor: 'gray',
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderRadius: 8,
        width: wp(80),
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'center',
        paddingHorizontal: 8,
    },


    placeholderStyle: {
        fontSize: 12,
        fontFamily: 'Poppins-SemiBold'
    },

    slideContainerEdit: {
        backgroundColor: '#fff',
        width: wp(80),
        justifyContent: 'center',
        alignSelf: 'center',
        // height: 220,
        opacity: 2,
        paddingBottom: 20,
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 10,
        // width:'62%'
    },
    selectedTextStyle: {
        fontSize: 12,
        fontFamily: 'Poppins-SemiBold'
    },
    divider: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        // marginVertical: 20,
    },
    btn: {
        width: wp(80),
        height: hp(5),
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 10,
        backgroundColor: '#8AB645',
        // backgroundColor: 'red',
        borderRadius: 10,
        // padding: 10,
        alignItems: 'center',
        // marginRight: 10
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
        alignItems: "center",
        paddingLeft: 10
        // justifyContent: 'space-between',
        // marginVertical: 5,
    },
    itemName: {
        fontSize: 10,
        textAlign: "center",
        fontFamily: 'Poppins-SemiBold',
        width: wp(17),
        color: Color.darkGreen
    },
    itemDetails: {
        fontSize: 10,
        textAlign: "center",
        fontFamily: 'Poppins-SemiBold',
        color: Color.darkGreen,

        width: wp(17)
    },
    datePicker: {
        backgroundColor: Color.white
    },
    Price: {
        fontSize: 10,
        textAlign: "center",
        fontFamily: 'Poppins-SemiBold',
        color: Color.darkGreen,

        width: wp(17)

    },
    Quantity: {
        fontSize: 10,
        textAlign: "center",
        fontFamily: 'Poppins-SemiBold',
        color: Color.darkGreen,

        width: wp(17)

    },
    itemTotal: {
        fontSize: 10,
        textAlign: "center",
        fontFamily: 'Poppins-SemiBold',
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
        backgroundColor: '#254768',
        width: wp(90),
        justifyContent: 'center',
        alignSelf: 'center',
        // height: hp(2=10),
        opacity: 2,
        // paddingBottom: 20,
        marginTop: 15,
    },
    LIstText2: {
        color: '#6a6a6a',
        fontSize: 12,
        fontFamily: 'Poppins-Bold',
    },

    subHead: {
        width: 150,
        fontSize: 15,
        fontWeight: '600',
        color: '#000'
    },
    headingClient: {
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
        // maxWidth:'80%',
        color: '#fff',
        // height:40,
        marginTop: 10,
        // marginLeft: 20,
        fontWeight: '700',

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
        height: 50,
        backgroundColor: Color.geen,
        marginTop: 1,
        // padding: 10,
        width: wp(90),
        flexDirection: 'row',
        // borderRadius: 20,
        // marginLeft: 10,
        // marginRight: 10,
    },
    contentView2: {
        // height: 50,
        backgroundColor: '#fff',
        marginTop: 1,
        width: wp(100),
        height: wp(15),
        // padding: 10,
        flexDirection: 'row',
        // borderRadius: 20,
        // marginLeft: 10,
        // marginRight: 10,
    },
    Final: {
        backgroundColor: 'gray',
        height: 50,
        width: wp(20),


        //  alignItems: "center",
        justifyContent: "center"

    },
    centeredView: {
        flex: 1,

        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
        // marginTop: 22,
    },
    modalView: {
        //margin: 20,

        backgroundColor: 'white',
        //borderRadius: 20,
        padding: 35,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    Subheading: {
        fontSize: 16,
        color: '#000',
        paddingLeft: 20,
        fontWeight: '700',
    },
    formContainer: {
        backgroundColor: '#2F4050',
        width: wp(90),
        padding: 10,
        alignSelf: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
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
    buttonClose: {
        backgroundColor: '#8AB645',
        width: wp(80),
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        width: 120,
        alignSelf: 'center',
    },
});
