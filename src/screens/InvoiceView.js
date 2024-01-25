import React, { useEffect, useState } from 'react'
import { View, Text,
    Modal, StyleSheet,
    TextInput,
    ScrollView, TouchableOpacity, FlatList, Alert, Image } from 'react-native';
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

    console.log(value,'Selectionnnn')


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
        console.log(item,'IIIII')
        setValue(item.value);
        setIsFocus(false);
        setError(''); // Clear the error message when a value is selected
      };
    
      console.log(value,'KKKKKKKKKKK')

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
                            marginRight:5,
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
                <View style={{width:wp(80), flexDirection: 'row', alignSelf: 'center',justifyContent:"center", margin: 20 }}>
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
                  <View style={{flexDirection:"row",justifyContent:'space-between',width:wp(75)}}> 
                  <Text style={{ fontFamily:'Poppins-SemiBold', color: '#fff', fontSize: 12 }}>
                  Payment Date
                  </Text>
                {date ? (
                  <Text style={{ fontFamily:'Poppins-SemiBold', color: '#fff', fontSize: 12 }}>
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
                onChange={ (item) => handleDropdownChange(item)}
              />
             
              <Text  style={styles.input}>{totalPriceCharged}</Text>
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
               style={[ {color:Color.HeaderBackground,fontFamily:'Poppins-SemiBold',   fontSize:12,
                 padding: 10,paddingTop:10, textAlignVertical: 'top' }]}
               // style={styles.input}
               // placeholder="Phone"

              // onChangeText={onChangeText}
              // value={text}
              />
              </View>
            
            
             
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
              // onPress={() => setModalVisible(!modalVisible)}
               onPress={() => navigation.navigate('Paypal',{
                totalPriceCharged:totalPriceCharged

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
        marginTop:10,
        marginBottom:10,
        alignSelf: 'center',
        paddingHorizontal: 8,
      },


      placeholderStyle: {
        fontSize: 12,
        fontFamily:'Poppins-SemiBold'
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
        marginBottom:10,
        marginTop: 10,
        // width:'62%'
      },
      selectedTextStyle: {
        fontSize: 12,
        fontFamily:'Poppins-SemiBold'
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
    datePicker:{
        backgroundColor:Color.white
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
