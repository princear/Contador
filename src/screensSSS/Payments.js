import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  
  Dimensions,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ImageBackground
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import CustomHeader from '../Component/CustomHeader';
import CustomBottomTab from '../Component/CustomBottomTab';
import { GetPaymentList, GetDetailsbyOrderId } from '../Redux/Actions/PaymentAction';
import { Loader } from '../Component/Loader';
import { Color } from '../Style';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/AntDesign';
import IconF from 'react-native-vector-icons/Foundation';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Fontisto';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Icon4 from 'react-native-vector-icons/FontAwesome6';
import { dashboardlist } from '../Redux/Actions/Dashboard';
import HeadTabs from './HeadTabs';

const data = [
  {
    img: require('../Assets/profileBlank.png'),
    clintID: 'EastSons',
    clintName: 'Prince EastSons',
    viewicon: require('../Assets/img/icons/view.png'),
  },

  {
    img: require('../Assets/profileBlank.png'),
    clintID: 'EastSons',
    clintName: 'Prince EastSons',
    viewicon: require('../Assets/img/icons/view.png'),
  },

  {
    img: require('../Assets/profileBlank.png'),
    clintID: 'EastSons',
    clintName: 'Prince EastSons',
    viewicon: require('../Assets/img/icons/view.png'),
  },
  {
    img: require('../Assets/profileBlank.png'),
    clintID: 'EastSons',
    clintName: 'Prince EastSons',
    viewicon: require('../Assets/img/icons/view.png'),
  },
  {
    img: require('../Assets/profileBlank.png'),
    clintID: 'EastSons',
    clintName: 'Prince EastSons',
    viewicon: require('../Assets/img/icons/view.png'),
  },
  {
    img: require('../Assets/profileBlank.png'),
    clintID: 'EastSons',
    clintName: 'Prince EastSons',
    viewicon: require('../Assets/img/icons/view.png'),
  },
  {
    img: require('../Assets/profileBlank.png'),
    clintID: 'EastSons',
    clintName: 'Prince EastSons',
    viewicon: require('../Assets/img/icons/view.png'),
  },
  {
    img: require('../Assets/profileBlank.png'),
    clintID: 'EastSons',
    clintName: 'Prince EastSons',
    viewicon: require('../Assets/img/icons/view.png'),
  },
];
const Payments = () => {
  const [showwhat, setshowwhat] = useState('Experience');

  const [infoData, setInfoData] = useState([]);
  const [idRow, setIdRow] = useState();
  const { MY_INFO } = useSelector(state => state.TaxLeafReducer);
  const { GET_PAYMENT_LIST } = useSelector(state => state.PaymentReducer);
  const { DASHBOARD_LIST } = useSelector(state => state.DashboardReducer);
  const { DASHBOARD_MESSAGE_LIST } = useSelector(state => state.DashboardReducer);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [activeSections, setActiveSection] = useState([]);
  //const { GET_ORDER_DETAILS } = useSelector(state => state.PaymentReducer);
  //const serviceListModel = GET_ORDER_DETAILS[0]?.serviceListModel[0]
  const bgImage = require('../Assets/img/guest_shape.png');
  const [orderIDAcc, setOrderID] = useState()
  const navigation = useNavigation();
  const showwhatfunc = data => {
    setshowwhat(data);
    //console.log(data);
  };
  //console.log(orderIDAcc, 'orderIDAcc')
  //console.log(GET_PAYMENT_LIST, 'GET_PAYMENT_LIST')
  const jsonData = MY_INFO.guestInfo;
  const officeInfo = MY_INFO.officeInfo;

  console.log(jsonData?.clientId, jsonData?.clientType, 'jsonData?.clientId, jsonData?.clientType')

  //console.log(GET_ORDER_DETAILS, 'orderInfoPAymentScreen')

  useEffect(() => {

    const fetchData = async () => {

      try {
        setLoader(true);

        // Dispatch GetPaymentList and dashboardlist sequentially
        await dispatch(GetPaymentList(jsonData?.clientId, jsonData?.clientType, navigation));

        // Get the latest state after GetPaymentList is resolved
        //   const paymentList = GET_PAYMENT_LIST;

        // Dispatch dashboardlist with data from GetPaymentList
        //  await dispatch(dashboardlist(jsonData?.clientId, jsonData?.clientType, officeInfo?.id, navigation, paymentList));

        setTimeout(() => {
          setLoader(false);
        }, 500);
        // Set infoData based on the latest state
        // setInfoData(paymentList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      // finally {
      //   setLoader(false);
      // }
    };

    fetchData();
  }, []);


  // console.log(infoData[0].serviceListModel, 'infoDatainfoDatainfoDatainfoDatainfoData')

  // useEffect(() => {
  //   setLoader(true);
  //   dispatch(
  //     GetPaymentList(jsonData?.clientId, jsonData?.clientType, navigation),
  //   );

  //   setInfoData(GET_PAYMENT_LIST);
  //   dispatch(
  //     dashboardlist(
  //       jsonData?.clientId,
  //       jsonData?.clientType,
  //       officeInfo?.id,
  //       navigation,
  //     ),
  //   );

  //   setTimeout(() => {
  //     setLoader(false);
  //   }, 2000);
  // }, []);
  // // console.log(infoData, 'infoData');
  // useEffect(() => {
  //   setInfoData(GET_PAYMENT_LIST);
  // }, [GET_PAYMENT_LIST]);

  useEffect(() => {
    // setLoader(true);
    setInfoData(GET_PAYMENT_LIST);
    //setInfoData(GET_ORDER_DETAILS);
    // setTimeout(() => {
    //   setLoader(false);
    // }, 2000);
    // getorderbyId()
  }, [GET_PAYMENT_LIST,]);
  // useEffect(() => {
  //   infoData?.collectionInfo.map((item)=>{
  //     getorderbyId(item?.orderId)
  //   })
  // }, [infoData])
  let filteredData;

  if (Array.isArray(infoData)) {
    filteredData = infoData.filter(item => item.collectionInfo.paymentStatus === 1);
    // Use filteredData as needed
  } else {
    console.error('infoData is not an array');
  }



  const getorderbyId = (orderId) => {
    // Alert.alert('hii')
    console.log(jsonData?.clientId, jsonData?.clientType, orderId, 'orderIDDDD')
    // setLoader(true);

    dispatch(
      GetDetailsbyOrderId(jsonData?.clientId, jsonData?.clientType, orderId, navigation),
    );
    //   setTimeout(() => {
    //     setLoader(false);
    // }, 2000);

  }

  // console.log(
  //   infoData.length,
  //   'GET_PAYMENT_LISTGET_PAYMENT_LISTGET_PAYMENT_LIST',
  // );
  const SECTIONS = [
    {
      title: 'First',
      content: 'Lorem ipsum...',
    },
    {
      title: 'Second',
      content: 'Lorem ipsum...',
    },
  ];

  const renderSectionTitle = section => {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  };


  const handleRow = item => {
    console.log(item?.collectionInfo?.orderId, 'KKKKKKKKK')

    setIdRow(item?.collectionInfo?.orderId);
    setLoader(true)

    // setSelectedData(item);

    dispatch(
      GetDetailsbyOrderId(jsonData?.clientId, jsonData?.clientType, item?.collectionInfo?.orderId, navigation),
    );
    setTimeout(() => {
      setLoader(false)
    }, 2000);
    // getorderbyId(item?.collectionInfo?.orderId)

  };
  const handleRowOFF = item => {
    setIdRow();
    // setSelectedData(item);
    // getorderbyId(item?.collectionInfo?.orderId)
  };


  console.log(infoData[0]?.countryName, "infodatainfodatainfodatainfodatainfodatainfodata")

  const renderHeader = item => {
    return (
      <>

        <View></View>

      </>

    );
  };

  const renderContent = (section, _, isActive) => {
    setOrderID(section?.collectionInfo?.orderId)

    return (
      <>
        <Animatable.View style={{ marginBottom: 20, backgroundColor: '#fff' }}>
          {/* <TouchableOpacity
            onPress={() => { handleRow(section) }}>
            <Animatable.View
              duration={400}
              style={[
                styles.content,
                isActive ? styles.active : styles.inactive,
                {
                  width: wp(90),
                  backgroundColor: Color.green,
                  alignItems: 'center',
                  alignSelf: 'center',
                  // marginBottom: 10,
                  flexDirection: 'row',
                  height: wp(15),


                  opacity: 10,
                  paddingLeft: 10,
                  paddingRight: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                },
              ]}
              transition="backgroundColor">

              <Animatable.Text
                animation={isActive ? 'bounceIn' : undefined}
                style={{
                  color: '#fff',
                  textAlign: 'center',

                  width: wp(20),
                  // backgroundColor: '#2F5597',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  height: wp(10),
                  fontSize: 11,
                  fontFamily: 'Poppins-SemiBold',
                  justifyContent: 'center',
                }}>
                Category
              </Animatable.Text>

              <Animatable.Text
                animation={isActive ? 'bounceIn' : undefined}
                style={{
                  color: '#fff',
                  textAlign: 'center',

                  width: wp(20),

                  // backgroundColor: '#2F5597',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  height: wp(10),
                  fontSize: 11,
                  //fontSize: 10,
                  fontFamily: 'Poppins-SemiBold',
                  justifyContent: 'center',
                }}>
                Service Name
              </Animatable.Text>
              <Animatable.Text
                animation={isActive ? 'bounceIn' : undefined}
                style={{
                  color: '#fff',
                  textAlign: 'center',


                  width: wp(15),

                  // backgroundColor: '#2F5597',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  height: wp(11),
                  fontSize: 11,
                  fontFamily: 'Poppins-SemiBold',
                  justifyContent: 'center',
                }}>
                Retail Price
              </Animatable.Text>
              <Animatable.Text
                animation={isActive ? 'bounceIn' : undefined}
                style={{
                  color: '#fff',
                  textAlign: 'center',

                  width: wp(15),

                  // backgroundColor: '#2F5597',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  height: wp(10),
                  fontSize: 11,
                  fontFamily: 'Poppins-SemiBold',
                  justifyContent: 'center',
                }}>
                Quantity
              </Animatable.Text>
              <Animatable.Text
                animation={isActive ? 'bounceIn' : undefined}
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  // marginTop: 4,
                  //alignSelf: "center",
                  width: wp(18),

                  backgroundColor: Color.darkGreen,
                  // borderTopLeftRadius: 10,
                  // borderTopRightRadius: 10,
                  height: wp(15),
                  paddingTop: 15,
                  fontSize: 10,
                  fontFamily: 'Poppins-SemiBold',
                  justifyContent: 'center',
                }}>
                Total Price
              </Animatable.Text>
            </Animatable.View>
          </TouchableOpacity> */}

          {/* {
            idRow == section?.collectionInfo?.orderId ? */}
          {/* <FlatList
            //data={GET_ORDER_DETAILS[0]?.serviceListModel}
            data={infoData}
            // keyExtractor={item => item?.serviceInfo?.id}
            renderItem={({ item, index }) => (
              item.serviceListModel.map((service, serviceIndex) => (
                <>
                  <TouchableOpacity
                    onPress={() => { handleRow(section) }}>
                    <Animatable.View
                      duration={400}
                      style={[
                        styles.content,
                        isActive ? styles.active : styles.inactive,
                        {
                          width: wp(90),
                          backgroundColor: Color.green,
                          alignItems: 'center',
                          alignSelf: 'center',
                          // marginBottom: 10,
                          flexDirection: 'row',
                          height: wp(15),


                          opacity: 10,
                          paddingLeft: 10,
                          paddingRight: 10,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        },
                      ]}
                      transition="backgroundColor">

                      <Animatable.Text
                        animation={isActive ? 'bounceIn' : undefined}
                        style={{
                          color: '#fff',
                          textAlign: 'center',

                          width: wp(20),
                          // backgroundColor: '#2F5597',
                          borderTopLeftRadius: 10,
                          borderTopRightRadius: 10,
                          height: wp(10),
                          fontSize: 11,
                          fontFamily: 'Poppins-SemiBold',
                          justifyContent: 'center',
                        }}>
                        Category
                      </Animatable.Text>

                      <Animatable.Text
                        animation={isActive ? 'bounceIn' : undefined}
                        style={{
                          color: '#fff',
                          textAlign: 'center',

                          width: wp(20),

                          // backgroundColor: '#2F5597',
                          borderTopLeftRadius: 10,
                          borderTopRightRadius: 10,
                          height: wp(10),
                          fontSize: 11,
                          //fontSize: 10,
                          fontFamily: 'Poppins-SemiBold',
                          justifyContent: 'center',
                        }}>
                        Service Name
                      </Animatable.Text>
                      <Animatable.Text
                        animation={isActive ? 'bounceIn' : undefined}
                        style={{
                          color: '#fff',
                          textAlign: 'center',


                          width: wp(15),

                          // backgroundColor: '#2F5597',
                          borderTopLeftRadius: 10,
                          borderTopRightRadius: 10,
                          height: wp(11),
                          fontSize: 11,
                          fontFamily: 'Poppins-SemiBold',
                          justifyContent: 'center',
                        }}>
                        Retail Price
                      </Animatable.Text>
                      <Animatable.Text
                        animation={isActive ? 'bounceIn' : undefined}
                        style={{
                          color: '#fff',
                          textAlign: 'center',

                          width: wp(15),

                          // backgroundColor: '#2F5597',
                          borderTopLeftRadius: 10,
                          borderTopRightRadius: 10,
                          height: wp(10),
                          fontSize: 11,
                          fontFamily: 'Poppins-SemiBold',
                          justifyContent: 'center',
                        }}>
                        Quantity
                      </Animatable.Text>
                      <Animatable.Text
                        animation={isActive ? 'bounceIn' : undefined}
                        style={{
                          color: '#fff',
                          textAlign: 'center',
                          // marginTop: 4,
                          //alignSelf: "center",
                          width: wp(18),

                          backgroundColor: Color.darkGreen,
                          // borderTopLeftRadius: 10,
                          // borderTopRightRadius: 10,
                          height: wp(15),
                          paddingTop: 15,
                          fontSize: 10,
                          fontFamily: 'Poppins-SemiBold',
                          justifyContent: 'center',
                        }}>
                        Total Price
                      </Animatable.Text>
                    </Animatable.View>
                  </TouchableOpacity>

                  <Animatable.View

                    duration={400}
                    style={[
                      styles.content,

                      isActive ? styles.active : styles.inactive,
                      {
                        width: wp(90),
                        // backgroundColor: 'red',
                        //  alignItems: 'center',
                        // marginBottom: 10,
                        flexDirection: 'row',
                        height: wp(15),
                        alignItems: "center",
                        justifyContent: "center",
                        // alignSelf: 'center',

                        opacity: 10,
                        // paddingLeft: 10,
                        //paddingRight: 10,
                        //  paddingBottom: 10,

                        //  justifyContent: 'space-between',
                      },
                    ]}
                    transition="backgroundColor">
                    <Animatable.Text
                      animation={isActive ? 'bounceIn' : undefined}
                      style={{
                        color: '#000',
                        textAlign: 'center',
                        width: wp(20),

                        // backgroundColor: '#2F5597',
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        height: wp(10),
                        fontSize: 10,
                        fontFamily: 'Poppins-SemiBold',
                        justifyContent: 'center',
                      }}>
                      {service?.serviceInfo?.category?.name}
                    </Animatable.Text>
                    <Animatable.Text
                      animation={isActive ? 'bounceIn' : undefined}
                      style={{
                        color: '#000',
                        textAlign: 'center',
                        width: wp(20),

                        // backgroundColor: '#2F5597',
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        height: wp(10),
                        fontSize: 10,
                        fontFamily: 'Poppins-SemiBold',
                        justifyContent: 'center',
                      }}>
                      {service?.serviceInfo.description}
                    </Animatable.Text>
                    <Animatable.Text
                      animation={isActive ? 'bounceIn' : undefined}
                      style={{
                        color: '#000',
                        textAlign: 'center',
                        width: wp(15),

                        // backgroundColor: '#2F5597',
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        height: wp(10),
                        fontSize: 10,
                        fontFamily: 'Poppins-SemiBold',
                        justifyContent: 'center',
                      }}>
                      ${service?.reqInfo?.retailPrice}
                    </Animatable.Text>
                    <Animatable.Text
                      animation={isActive ? 'bounceIn' : undefined}
                      style={{
                        color: '#000',
                        textAlign: 'center',
                        width: wp(15),

                        // backgroundColor: '#2F5597',
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        height: wp(10),
                        fontSize: 10,
                        fontFamily: 'Poppins-SemiBold',
                        justifyContent: 'center',
                      }}>
                      {service?.reqInfo?.quantity}
                    </Animatable.Text>
                    <Animatable.Text
                      animation={isActive ? 'bounceIn' : undefined}
                      style={{
                        color: '#000',
                        textAlign: 'center',
                        width: wp(15),

                        // backgroundColor: '#2F5597',
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        height: wp(10),
                        fontSize: 10,
                        fontFamily: 'Poppins-SemiBold',
                        justifyContent: 'center',
                      }}>
                      ${service?.reqInfo?.priceCharged}
                    </Animatable.Text>
                  </Animatable.View>



                </>
              ))
            )}
          /> */}
          {/* :
              null
          } */}

          {/* <Animatable.View
            duration={400}
            style={[
              styles.content,
              isActive ? styles.active : styles.inactive,
              {
                width: wp(90),
                backgroundColor: 'lightgray',
                alignItems: 'center',
                alignSelf: 'center',
                // marginBottom: 10,
                flexDirection: 'row',
                height: wp(10),
                opacity: 10,
                paddingLeft: 10,
                paddingRight: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            ]}
            transition="backgroundColor">
            <Animatable.Text
              animation={isActive ? 'bounceIn' : undefined}
              style={{
                color: '#000',
                // textAlign: 'center',
                marginTop: wp(6),
                //paddingTop: 10,
                //width: wp(18),
                // backgroundColor: '#2F5597',
                borderTopLeftRadius: 10,
                //borderTopRightRadius: 10,
                height: wp(10),
                fontSize: 8,

                fontFamily: 'Poppins-SemiBold',
                justifyContent: 'center',
              }}>
              Order ID #{section?.collectionInfo?.invoiceId}
              {/* Order ID #{section?.collectionInfo?.orderId} 
            </Animatable.Text>
            <View
              style={{
                width: wp(12),

                alignItems: 'center',
              }}>
              {section?.serviceInfo?.isActive == 'y' ? (
                <Text
                  style={{
                    color: Color.white,
                    fontSize: 10,
                    backgroundColor: '#1c84c6',

                    fontFamily: 'Poppins-SemiBold',

                    padding: 5,
                    textAlign: 'center',
                    width: wp(12),
                  }}>
                  Active
                </Text>
              ) : (
                <Text
                  style={{
                    color: Color.white,
                    fontSize: 10,
                    fontFamily: 'Poppins-SemiBold',
                    backgroundColor: '#1c84c6',
                    padding: 5,
                    textAlign: 'center',
                    width: wp(15),
                  }}>
                  Active
                </Text>

              )}
            </View>

            <View style={{
              flexDirection: 'row',
              width: wp(48),
              // backgroundColor: '#fff',
              // marginBottom: 17
            }}>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('InvoiceView', {
                    orderId: section?.collectionInfo?.orderId
                    //  orderId: section?.collectionInfo?.invoiceId
                  })
                }}
                style={{
                  // backgroundColor: '#8AB645',
                  paddingTop: 5,
                  textAlign: 'center',
                  width: wp(22),
                  marginLeft: 0,
                  flexDirection: 'row',
                  // borderRadius: 3
                }}
              >
                <Icon
                  name="eye"
                  size={20}
                  color="#8AB645"
                />

                <Text style={{
                  color: "#000",
                  fontSize: 9,

                  fontFamily: 'Poppins-SemiBold',
                  // marginTop: 2,
                  margin: 2

                }}>


                  View Invoice
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('InvoiceDetails', {
                    orderId: section?.collectionInfo?.orderId
                  })
                }}
                style={{
                  // backgroundColor: '#8AB645',
                  padding: 5,
                  textAlign: 'center',
                  width: wp(20),
                  marginLeft: 10,
                  flexDirection: 'row',
                  // borderRadius: 3
                }}
              >
                <Icon
                  name="eye"
                  size={20}
                  color="#8AB645"
                />
                <Text style={{
                  color: "#000",
                  fontSize: 9,
                  fontFamily: 'Poppins-SemiBold',
                  // marginTop: 2,
                  margin: 2

                }}>


                  View Order
                </Text>
              </TouchableOpacity>
            </View>
          </Animatable.View> */}
        </Animatable.View>
      </>
    );
  };
  const setSections = sections => {
    //setting up a active section state
    console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH');
    console.log(sections, 'PPPPPPPPPPPPPPPPPPPP');
    setActiveSection(sections.includes(undefined) ? [] : sections);
    getorderbyId(sections?.collectionInfo?.orderId)
  };



  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:Color.white}}>
      <Loader flag={loader} />
      <CustomHeader />
   

        {/* <ImageBackground

          source={bgImage}
          style={styles.bgImg}
          resizeMode="cover"> */}

        <ScrollView
          //nestedScrollEnabled={true}
          style={{height: hp(80), backgroundColor:'#d5e3e5'}}
        >

    <View style={{ backgroundColor:'#d5e3e5' }}>
          <HeadTabs />
          {/* <View style={styles.headerView}>
          <Text style={styles.header}>Plan Invoices</Text>
        </View> */}
          <Text style={{ fontSize: 20, marginLeft: 20, color: Color.headerIconBG, fontFamily: 'Poppins-Bold', }}>Payments</Text>
          <View style={{ width: wp(95), alignSelf: 'center', height: hp(50) }}>
            {(() => {
              if (showwhat == 'Experience') {
                return (
                  <View style={styles.moblieSec1}>
                    <TouchableOpacity
                      style={[
                        styles.emailtoch1,
                        {
                          backgroundColor:
                            showwhat == 'Experience' ? Color.green : '#fff',
                          flexDirection: 'row',
                          // paddingTop: 12,

                        },
                      ]}
                      onPress={() => showwhatfunc('Experience')}>
                      <View
                        style={{

                          // backgroundColor:
                          //   showwhat == 'My Schools' ? Color.geen : '#fff',
                          // borderRadius: 15
                        }}
                      >
                         <Image
                  source={ require('../Assets/img/icons/pending.png')}
                  style={  [styles.icons,]}
                />
                        {/* <Icon
                          style={[
                            { marginRight: 5 }

                          ]}
                          name="clockcircle"
                          size={20}
                          color="#fff"
                        /> */}
                      </View>

                      <Text style={showwhat == 'My Schools' ? styles.ButtonText1 : styles.ButtonTextW}>
                        Pending ({filteredData?.length}) 
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.mobiletochP,
                        {
                          backgroundColor:
                            showwhat == 'My Schools' ? Color.geen : '#fff',
                          flexDirection: 'row',
                          // paddingTop: 12
                        },
                      ]}
                      onPress={() => showwhatfunc('My Schools')}>
                      <View
                        style={{
                        //  backgroundColor: showwhat == 'My Schools' ? 'lightgray' : Color.geen,
                         // height: wp(5), width: wp(5),

                         // alignItems: "center",
                         // borderRadius: 15, marginRight: 4,
                        }}
                      >
                        {/* <IconF
                          style={{

                            color: showwhat == 'My Schools' ? Color.geen : '#fff'
                          }}
                          name="dollar"
                          size={20}
                          color={Color.geen}
                        /> */}
                         <Image
                  source={ require('../Assets/img/icons/paidicon.png')}
                  style={  [styles.icons,]}
                />
                      </View>

                      <Text style={showwhat == 'My Schools' ? styles.ButtonTextW : styles.ButtonText1}>Paid (0)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.emailtoch2,
                        {
                          backgroundColor:
                            showwhat == 'Reviews' ? Color.geen : '#fff',
                          flexDirection: 'row',
                          //  paddingTop: 12
                        },
                      ]}
                      onPress={() => showwhatfunc('Reviews')}>
                      <View>
                      <Image
                  source={ require('../Assets/img/icons/planicon.png')}
                  style={  [styles.icons,]}
                />
                        {/* <Icon
                          style={[
                            { marginRight: 5 }

                          ]}
                          name="checkcircle"
                          size={20}
                          color={Color.geen}
                        /> */}
                      </View>

                      <Text style={showwhat == 'My Schools' ? styles.ButtonTextW : styles.ButtonText1}>Plan</Text>
                    </TouchableOpacity>
                  </View>
                );
              } else if (showwhat == 'My Schools') {
                return (
                  <View style={styles.moblieSec1}>
                    <TouchableOpacity
                      style={[
                        styles.emailtoch1,
                        {
                          backgroundColor:
                            showwhat == 'Experience' ? Color.geen : '#fff',
                          flexDirection: 'row',
                          // paddingTop: 12

                        },
                      ]}
                      onPress={() => showwhatfunc('Experience')}>
                       
                      {/* <Icon
                        style={[
                          { marginRight: 5 }

                        ]}
                        name="clockcircle"
                        size={20}
                        color={showwhat == 'My Schools' ? Color.geen : 'lightgray'}
                      /> */}

                <Image
                  source={ require('../Assets/img/icons/pending-greenic.png')}
                  style={  [styles.icons,]}
                />
                      <Text style={showwhat == 'My Schools' ? styles.ButtonText1 : styles.ButtonTextW}>
                        Pending ({filteredData?.length})
                        {/* ({infoData.length}) */}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.mobiletochP,
                        {
                          backgroundColor:
                            showwhat == 'My Schools' ? Color.geen : '#fff',
                          flexDirection: 'row',
                          //   paddingTop: 12
                        },
                      ]}
                      onPress={() => showwhatfunc('My Schools')}>
                      <View
                        style={{ alignItems: 'center', 
                      //  backgroundColor: showwhat == 'My Schools' ? '#fff' : '#fff', 
                        //width: wp(5), borderRadius: 15,
                         //height: wp(5), marginRight: 4,
                         }}

                      >
                        {/* <IconF
                          style={{ color: showwhat == 'My Schools' ? Color.geen : 'lightgray' }}
                          name="dollar"
                          size={20}
                          color="#fff"
                        /> */}
                          <Image
                  source={ require('../Assets/img/icons/paid-whiteic.png')}
                  style={  [styles.icons,]}
                />

                      </View>

                      <Text style={showwhat == 'My Schools' ? styles.ButtonTextW : styles.ButtonText1}>Paid (0)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.emailtoch2,
                        {
                          backgroundColor:
                            showwhat == 'Reviews' ? Color.geen : '#fff',
                          flexDirection: 'row',
                          // paddingTop: 12
                        },
                      ]}
                      onPress={() => showwhatfunc('Reviews')}>
                      {/* <Icon
                        style={[
                          { marginRight: 5 }
                        ]}
                        name="checkcircle"
                        size={18}
                        color={showwhat == 'My Schools' ? Color.geen : 'lightgray'}
                      /> */}
                        <Image
                  source={ require('../Assets/img/icons/planicon.png')}
                  style={  [styles.icons,]}
                />
                      <Text style={showwhat == 'My Schools' ? styles.ButtonText1 : styles.ButtonTextW}>Plan</Text>
                    </TouchableOpacity>
                  </View>
                );
              } else {
                return (
                  <View style={styles.moblieSec1}>
                    <TouchableOpacity
                      style={[
                        styles.emailtoch1,
                        {
                          backgroundColor:
                            showwhat == 'Experience' ? Color.geen : '#fff',
                          flexDirection: 'row',
                          //  paddingTop: 12

                        },
                      ]}
                      onPress={() => showwhatfunc('Experience')}>
                      {/* <Icon
                        style={[
                          { marginRight: 5 }

                        ]}
                        name="clockcircle"
                        size={20}
                        color={showwhat == 'My Schools' ? 'lightgray' : Color.geen}
                      /> */}
                         <Image
                  source={ require('../Assets/img/icons/pending-greenic.png')}
                  style={  [styles.icons,]}
                />
                      <Text style={showwhat == 'Experience' ? styles.ButtonTextW : styles.ButtonText1}>
                        Pending  ({filteredData?.length}) 
                        {/* ({infoData.length}) */}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.mobiletochP,
                        {
                          backgroundColor:
                            showwhat == 'My Schools' ? Color.geen : '#fff',
                          flexDirection: 'row',
                          // paddingTop: 12
                        },
                      ]}
                      onPress={() => showwhatfunc('My Schools')}>
                      <View
                        style={{ alignItems: "center", 
                        // backgroundColor: showwhat == 'My Schools' ? 'lightgray' : Color.geen,
                        //  width: wp(5), borderRadius: 15, height: wp(5), marginRight: 4, 
                        //  color: showwhat == 'My Schools' ? Color.geen : '#fff'
                         }}

                      >
                        {/* <IconF
                          style={{ color: showwhat == 'My Schools' ? Color.geen : '#fff' }}
                          name="dollar"
                          size={20}
                          color="#fff"
                        /> */}
                           <Image
                  source={ require('../Assets/img/icons/paidicon.png')}
                  style={  [styles.icons,]}
                />
                      </View>

                      <Text style={showwhat == 'My Schools' ? styles.ButtonTextW : styles.ButtonText1}>Paid (0)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.emailtoch2,
                        {
                          backgroundColor:
                            showwhat == 'Reviews' ? Color.geen : '#fff',
                          flexDirection: 'row',
                          // paddingTop: 12
                        },
                      ]}
                      onPress={() => showwhatfunc('Reviews')}>
                      {/* <Icon
                        style={[
                          { marginRight: 5 }

                        ]}
                        name="checkcircle"
                        size={18}
                        color="#fff"
                      /> */}
                        <Image
                  source={ require('../Assets/img/icons/plan-whiteic.png')}
                  style={  [styles.icons,]}
                />
                      <Text style={showwhat == 'My Schools' ? styles.ButtonText1 : styles.ButtonTextW}>Plan</Text>
                    </TouchableOpacity>
                  </View>
                );
              }
            })()}

            {(() => {
              if (showwhat == 'Experience') {
                return (
                  <View style={styles.subContainer}>
                    {/* <Text style={styles.subHead}>
                    Pending Invoices ({infoData.length})
                    </Text> */}

                    <ScrollView
                      nestedScrollEnabled={true}
                      style={{}}>


                      {/* <Accordion
                        activeSections={activeSections}
                        sections={infoData}
                        //title and content of accordion
                        touchableComponent={TouchableOpacity}
                        renderHeader={renderContent}
                        renderContent={renderHeader}
                        //Header Component(View) to render
                        //Content Component(View) to render
                        duration={400}
                        //Duration for Collapse and expand
                        onChange={setSections}
                      /> */}



                      <FlatList
                        //data={GET_ORDER_DETAILS[0]?.serviceListModel}
                        data={filteredData}

                        // keyExtractor={item => item?.serviceInfo?.id}
                        renderItem={({ item, index }) => (
                          item.serviceListModel.map((service, serviceIndex) => (
                            <>
                              <View

                              //</>   onPress = {() => {handleRow(section)}}
                              >
                                <Animatable.View
                                  duration={400}
                                  style={[
                                    styles.content,
                                    //  isActive ? styles.active : styles.inactive,
                                    {
                                      width: wp(90),
                                      backgroundColor: Color.green,
                                      alignItems: 'center',
                                      alignSelf: 'center',
                                      // marginBottom: 10,
                                      flexDirection: 'row',
                                      height: wp(15),


                                      opacity: 10,
                                      paddingLeft: 10,
                                      paddingRight: 10,
                                      flexDirection: 'row',
                                      justifyContent: 'space-between',
                                    },
                                  ]}
                                  transition="backgroundColor">

                                  <Animatable.Text
                                    //animation={isActive ? 'bounceIn' : undefined}
                                    style={{
                                      color: '#fff',
                                      textAlign: 'center',

                                      width: wp(20),
                                      // backgroundColor: '#2F5597',
                                      borderTopLeftRadius: 10,
                                      borderTopRightRadius: 10,
                                      height: wp(10),
                                      fontSize: 11,
                                      fontFamily: 'Poppins-SemiBold',
                                      justifyContent: 'center',
                                    }}>
                                    Category
                                  </Animatable.Text>

                                  <Animatable.Text
                                    //   animation={isActive ? 'bounceIn' : undefined}
                                    style={{
                                      color: '#fff',
                                      textAlign: 'center',

                                      width: wp(20),

                                      // backgroundColor: '#2F5597',
                                      borderTopLeftRadius: 10,
                                      borderTopRightRadius: 10,
                                      height: wp(10),
                                      fontSize: 11,
                                      //fontSize: 10,
                                      fontFamily: 'Poppins-SemiBold',
                                      justifyContent: 'center',
                                    }}>
                                    Service Name
                                  </Animatable.Text>
                                  <Animatable.Text
                                    //  animation={isActive ? 'bounceIn' : undefined}
                                    style={{
                                      color: '#fff',
                                      textAlign: 'center',


                                      width: wp(15),

                                      // backgroundColor: '#2F5597',
                                      borderTopLeftRadius: 10,
                                      borderTopRightRadius: 10,
                                      height: wp(11),
                                      fontSize: 11,
                                      fontFamily: 'Poppins-SemiBold',
                                      justifyContent: 'center',
                                    }}>
                                    Retail Price
                                  </Animatable.Text>
                                  <Animatable.Text
                                    //   animation={isActive ? 'bounceIn' : undefined}
                                    style={{
                                      color: '#fff',
                                      textAlign: 'center',

                                      width: wp(15),

                                      // backgroundColor: '#2F5597',
                                      borderTopLeftRadius: 10,
                                      borderTopRightRadius: 10,
                                      height: wp(10),
                                      fontSize: 11,
                                      fontFamily: 'Poppins-SemiBold',
                                      justifyContent: 'center',
                                    }}>
                                    Quantity
                                  </Animatable.Text>
                                  <Animatable.Text
                                    //  animation={isActive ? 'bounceIn' : undefined}
                                    style={{
                                      color: '#fff',
                                      textAlign: 'center',
                                      // marginTop: 4,
                                      //alignSelf: "center",
                                      width: wp(18),

                                      backgroundColor: Color.darkGreen,
                                      // borderTopLeftRadius: 10,
                                      // borderTopRightRadius: 10,
                                      height: wp(15),
                                      paddingTop: 15,
                                      fontSize: 10,
                                      fontFamily: 'Poppins-SemiBold',
                                      justifyContent: 'center',
                                    }}>
                                    Total Price
                                  </Animatable.Text>
                                </Animatable.View>
                              </View>

                              <Animatable.View

                                duration={400}
                                style={[
                                  styles.content,

                                  //  isActive ? styles.active : styles.inactive,
                                  {
                                    width: wp(90),
                                    // backgroundColor: 'red',
                                    //  alignItems: 'center',
                                    // marginBottom: 10,
                                    flexDirection: 'row',
                                    height: wp(15),
                                    alignItems: "center",
                                    justifyContent: "center",
                                    // alignSelf: 'center',

                                    opacity: 10,
                                    // paddingLeft: 10,
                                    //paddingRight: 10,
                                    //  paddingBottom: 10,

                                    //  justifyContent: 'space-between',
                                  },
                                ]}
                                transition="backgroundColor">
                                <Animatable.Text
                                  //   animation={isActive ? 'bounceIn' : undefined}
                                  style={{
                                    color: '#000',
                                    textAlign: 'center',
                                    width: wp(20),

                                    // backgroundColor: '#2F5597',
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                    height: wp(10),
                                    fontSize: 10,
                                    fontFamily: 'Poppins-SemiBold',
                                    justifyContent: 'center',
                                  }}>
                                  {service?.serviceInfo?.category?.name}
                                </Animatable.Text>
                                <Animatable.Text
                                  // animation={isActive ? 'bounceIn' : undefined}
                                  style={{
                                    color: '#000',
                                    textAlign: 'center',
                                    width: wp(20),

                                    // backgroundColor: '#2F5597',
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                    height: wp(10),
                                    fontSize: 10,
                                    fontFamily: 'Poppins-SemiBold',
                                    justifyContent: 'center',
                                  }}>
                                  {service?.serviceInfo.description}
                                </Animatable.Text>
                                <Animatable.Text
                                  // animation={isActive ? 'bounceIn' : undefined}
                                  style={{
                                    color: '#000',
                                    textAlign: 'center',
                                    width: wp(15),

                                    // backgroundColor: '#2F5597',
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                    height: wp(10),
                                    fontSize: 10,
                                    fontFamily: 'Poppins-SemiBold',
                                    justifyContent: 'center',
                                  }}>
                                  ${service?.reqInfo?.retailPrice}
                                </Animatable.Text>
                                <Animatable.Text
                                  // animation={isActive ? 'bounceIn' : undefined}
                                  style={{
                                    color: '#000',
                                    textAlign: 'center',
                                    width: wp(15),

                                    // backgroundColor: '#2F5597',
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                    height: wp(10),
                                    fontSize: 10,
                                    fontFamily: 'Poppins-SemiBold',
                                    justifyContent: 'center',
                                  }}>
                                  {service?.reqInfo?.quantity}
                                </Animatable.Text>
                                <Animatable.Text
                                  //   animation={isActive ? 'bounceIn' : undefined}
                                  style={{
                                    color: '#000',
                                    textAlign: 'center',
                                    width: wp(15),

                                    // backgroundColor: '#2F5597',
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                    height: wp(10),
                                    fontSize: 10,
                                    fontFamily: 'Poppins-SemiBold',
                                    justifyContent: 'center',
                                  }}>
                                  ${service?.reqInfo?.priceCharged}
                                </Animatable.Text>
                              </Animatable.View>


                              <Animatable.View
                                duration={400}
                                style={[
                                  styles.content,
                                  //   isActive ? styles.active : styles.inactive,
                                  {
                                    width: wp(90),
                                    backgroundColor: 'lightgray',
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                    // marginBottom: 10,
                                    flexDirection: 'row',
                                    height: wp(10),
                                    opacity: 10,
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                  },
                                ]}
                                transition="backgroundColor">
                                <Animatable.Text
                                  // animation={isActive ? 'bounceIn' : undefined}
                                  style={{
                                    color: '#000',
                                    // textAlign: 'center',
                                    marginTop: wp(6),
                                    //paddingTop: 10,
                                    //width: wp(18),
                                    // backgroundColor: '#2F5597',
                                    borderTopLeftRadius: 10,
                                    //borderTopRightRadius: 10,
                                    height: wp(10),
                                    fontSize: 8,

                                    fontFamily: 'Poppins-SemiBold',
                                    justifyContent: 'center',
                                  }}>
                                  Order ID #{item?.collectionInfo?.invoiceId}
                                  {/* Order ID #{section?.collectionInfo?.orderId} */}
                                </Animatable.Text>
                                <View
                                  style={{
                                    width: wp(12),

                                    alignItems: 'center',
                                  }}>
                                  {item?.serviceInfo?.isActive == 'y' ? (
                                    <Text
                                      style={{
                                        color: Color.white,
                                        fontSize: 10,
                                        backgroundColor: '#1c84c6',

                                        fontFamily: 'Poppins-SemiBold',

                                        padding: 5,
                                        textAlign: 'center',
                                        width: wp(12),
                                      }}>
                                      Active
                                    </Text>
                                  ) : (
                                    <Text
                                      style={{
                                        color: Color.white,
                                        fontSize: 10,
                                        fontFamily: 'Poppins-SemiBold',
                                        backgroundColor: '#1c84c6',
                                        padding: 5,
                                        textAlign: 'center',
                                        width: wp(15),
                                      }}>
                                      Active
                                    </Text>

                                  )}
                                </View>

                                <View style={{
                                  flexDirection: 'row',
                                  width: wp(48),
                                  // backgroundColor: '#fff',
                                  // marginBottom: 17
                                }}>

                                  <TouchableOpacity
                                    onPress={() => {
                                      navigation.navigate('InvoiceView', {
                                        orderId: item?.collectionInfo?.orderId,
                                        countryname: item.countryName
                                        //  orderId: section?.collectionInfo?.invoiceId
                                      })
                                    }}
                                    style={{
                                      // backgroundColor: '#8AB645',
                                  //  paddingTop: 5,
                                      textAlign: 'center',
                                      width: wp(22),
                                      justifyContent:"center",
                                      alignItems:"center",
                                      marginLeft: 0,
                                      flexDirection: 'row',
                                      // borderRadius: 3
                                    }}
                                  >
                                    {/* <Icon
                                      name="eye"
                                      size={20}
                                      color="#8AB645"
                                    /> */}
                                     <Image
                                      source={ require('../Assets/img/icons/viewic.png')}
                                      style={  [styles.icons,]}
                                    />

                                    <Text style={{
                                      color: "#000",
                                      fontSize: 9,

                                      fontFamily: 'Poppins-SemiBold',
                                      // marginTop: 2,
                                      margin: 2

                                    }}>


                                      View Invoice
                                    </Text>
                                  </TouchableOpacity>

                                  <TouchableOpacity
                                    onPress={() => {
                                      navigation.navigate('InvoiceDetails', {
                                        orderId: item?.collectionInfo?.orderId,
                                        countryname: item.countryName
                                      })
                                    }}
                                    style={{
                                      // backgroundColor: '#8AB645',
                                      padding: 5,
                                      justifyContent:"center",
                                      alignItems:"center",
                                      textAlign: 'center',
                                      width: wp(20),
                                      marginLeft: 10,
                                      flexDirection: 'row',
                                      // borderRadius: 3
                                    }}
                                  >
                                    {/* <Icon
                                      name="eye"
                                      size={20}
                                      color="#8AB645"
                                    /> */}
                                      <Image
                  source={ require('../Assets/img/icons/viewic.png')}
                  style={  [styles.icons,]}
                />

                                    <Text style={{
                                      color: "#000",
                                      fontSize: 9,
                                      fontFamily: 'Poppins-SemiBold',
                                      // marginTop: 2,
                                      margin: 2

                                    }}>


                                      View Order
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              </Animatable.View>


                            </>
                          ))
                        )}
                      />

                      <View style={{ height: wp(20), }}></View>
                    </ScrollView>
                  </View>
                );
              } else if (showwhat == 'My Schools') {
                return (
                  <View style={styles.subContainer}>
                    {/* <Text style={styles.subHead}>Paid Invoices (0)</Text> */}
                    <Text style={{ textAlign: 'center' }}>No Data Found</Text>
                    {/* <FlatList
                  data={data}
                  // numColumns={5}
                  keyExtractor={(item, index) => index}
                  renderItem={({item, index}) => (
                    <View
                      style={{
                        width: wp(90),
                        backgroundColor: '#fff',

                        alignItems: 'center',
                        alignSelf: 'center',
                        elevation: 10,

                        marginBottom: 10,
                        flexDirection: 'row',
                        height: wp(15),
                      }}>
                      <View
                        style={{
                          width: wp(15),

                          alignItems: 'center',
                        }}>
                        <Image
                          source={item.img}
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: 50,
                            //alignSelf: 'center',
                          }}
                        />
                      </View>
                      <View
                        style={{
                          width: wp(30),

                          alignItems: 'center',
                        }}>
                        <Text style={{color: '#2F4050', fontSize: 12}}>
                          {item.clintID}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp(30),

                          alignItems: 'center',
                        }}>
                        <Text style={{color: '#2F4050', fontSize: 12}}>
                          {item.clintName}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp(15),

                          alignItems: 'center',
                        }}>
                        <Image
                          source={item.viewicon}
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 50,
                            //alignSelf: 'center',
                          }}
                        />
                      </View>
                    </View>
                  )}
                /> */}
                  </View>
                );
              } else {
                return (
                  <View style={styles.subContainer}>
                    {/* <Text style={styles.subHead}>Plan</Text> */}
                    <Text style={{ textAlign: 'center' }}>No Data Found</Text>
                    {/* <FlatList
                  data={data}
                  // numColumns={5}
                  keyExtractor={(item, index) => index}
                  renderItem={({item, index}) => (
                    <View
                      style={{
                        width: wp(90),
                        backgroundColor: '#fff',

                        alignItems: 'center',
                        alignSelf: 'center',
                        elevation: 10,

                        marginBottom: 10,
                        flexDirection: 'row',
                        height: wp(15),
                      }}>
                      <View
                        style={{
                          width: wp(15),

                          alignItems: 'center',
                        }}>
                        <Image
                          source={item.img}
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: 50,
                            //alignSelf: 'center',
                          }}
                        />
                      </View>
                      <View
                        style={{
                          width: wp(30),

                          alignItems: 'center',
                        }}>
                        <Text style={{color: '#2F4050', fontSize: 12}}>
                          {item.clintID}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp(30),

                          alignItems: 'center',
                        }}>
                        <Text style={{color: '#2F4050', fontSize: 12}}>
                          {item.clintName}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp(15),

                          alignItems: 'center',
                        }}>
                        <Image
                          source={item.viewicon}
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 50,
                            //alignSelf: 'center',
                          }}
                        />
                      </View>
                    </View>
                  )}
                /> */}
                  </View>
                );
              }
            })()}
          </View>
          </View >
        </ScrollView >

        {/* </ImageBackground> */}

     
      <CustomBottomTab />
     
    </SafeAreaView >
  );
};

export default Payments;
const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    color: '#000',
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 20,
    width: '50%',
    backgroundColor: '#9DB436',
    padding: 5,
  },
  infoText: {
    fontSize: 15,
    color: 'black',
    alignSelf: 'center',
  },
  infoText1: {
    fontSize: 15,
    color: 'black',
    alignSelf: 'center',
    marginTop: 5,
    color: 'grey',
  },
  line: {
    height: 40,
    width: 2,
    backgroundColor: 'grey',
    marginTop: 5,
  },
  FavBooKChat: {
    height: 50,
    width: 50,
    backgroundColor: 'black',
    borderRadius: 25,
    marginHorizontal: 5,
    marginTop: -20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  FavBooKChatContainer: {
    height: 30,
    width: '33%',
  },
  icons:{
    alignSelf: 'center',
    height:15,
    resizeMode:'contain',
    width:15,
    marginRight:5
 
  },
  moblieSec1: {
    backgroundColor: '#fff',
    // height: 20,
    borderRadius: 50,
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 10,
    // marginBottom: 30,
    width: wp(90),
    marginLeft: 10,
    flexDirection: 'row',
    // alignSelf: "center",
  },
  emailtoch1: {
    //  backgroundColor: "lightgray",
    width: wp(30),
    height: 50,
    justifyContent: 'center',
    // borderRadius: 10,
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    paddingHorizontal: 20
  },
  emailtoch2: {
    //  backgroundColor: "lightgray",
    width: wp(30),
    height: 50,
    alignItems: "center",
    justifyContent: 'center',
    // borderRadius: 10,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20
  },
  ButtonText1: {
    color: '#000',
    fontSize: 10,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  ButtonTextW: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 10,
    textAlign: 'center',
  },
  mobiletochP: {
    // backgroundColor: showwhat == "My Schools" ? "#2F5597" : "lightgray",
    width: wp(30),
    height: 50,
    // borderRadius: 10,
    alignItems: "center",
    justifyContent: 'center',
  },
  subContainer: {
    //backgroundColor: '#fff',
    //width: wp(90),

    alignSelf: 'center',
    marginTop: 10,
    //height: hp(75),
    height: wp(80),

    // alignItems: 'center',
  },
  subHead: {
    fontSize: 14,
    color: '#000',
    padding: 10,
    marginBottom: 20,
    // backgroundColor: Color.darkGreen,
    textAlign: 'center'
  },
  icon: { alignSelf: 'center', marginTop: 5 },

  mobiletoch1: {
    // backgroundColor: showwhat == "My Schools" ? "#2F5597" : "lightgray",
    // width: 70,
    // height: 45,
    width: wp(13),
    height: wp(13),
    //marginTop: 10,
    paddingTop: 5,
    borderRadius: 50,
    // justifyContent: 'center',
    marginRight: 5,
  },
  slideContainer: {
    // backgroundColor: '#fff',
    width: wp(95),
    justifyContent: 'center',
    alignSelf: 'center',
    /// height: 420,
    opacity: 2,
    paddingBottom: 20,
    borderRadius: 10,
    // marginTop: 20,
    // width:'62%'
  },
  moblieSec: {
    // backgroundColor: "lightgrey",
    // height: 20,
    width: wp(85),
    // backgroundColor: 'red',
    //backgroundColor: 'red',
    justifyContent: 'space-between',
    alignSelf: 'center',
    borderRadius: 50,
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 20,
    // marginBottom: 30,

    flexDirection: 'row',
    // alignSelf: "center",
  },
  emailtoch: {
    //  backgroundColor: "lightgray",
    width: wp(13),
    height: wp(13),
    paddingTop: 5,
    //  justifyContent: 'center',
    borderRadius: 50,
    //marginRight: 6,
    //marginTop: 10,
  },
  ButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 9,
  },
  mobiletoch: {
    // backgroundColor: showwhat == "My Schools" ? "#2F5597" : "lightgray",
    // width: 70,
    // height: 45,
    width: wp(13),
    height: wp(13),
    //marginTop: 10,
    paddingTop: 5,
    borderRadius: 50,
    // justifyContent: 'center',
    // marginRight: 5,
    marginLeft: 6
  },
  bgImg: {
    height: hp(80)
  },
  emailtochO: {
    //  backgroundColor: "lightgray",
    width: wp(13),
    height: wp(13),
    paddingTop: 5,
    //  justifyContent: 'center',
    borderRadius: 50,
    //marginRight: 6,
    //marginTop: 10,
  },
  part: {
    borderWidth: 0.5,
    borderColor: '#A7B1C2',
    marginTop: 10,
    width: '90%',
    alignSelf: 'center',
  },
});
