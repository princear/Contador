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
  const [dashboardList, setDashboardList] = useState([]);
  const [dashboardMessageList, setDashboardMessageList] = useState([]);
  const [showwhat1, setshowwhat1] = useState('');
  const [showwhat2, setshowwhat2] = useState('');
  const { MY_INFO } = useSelector(state => state.TaxLeafReducer);
  const { GET_PAYMENT_LIST } = useSelector(state => state.PaymentReducer);
  const { DASHBOARD_LIST } = useSelector(state => state.DashboardReducer);
  const { DASHBOARD_MESSAGE_LIST } = useSelector(state => state.DashboardReducer);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [activeSections, setActiveSection] = useState([]);
  const { GET_ORDER_DETAILS } = useSelector(state => state.PaymentReducer);
  const serviceListModel = GET_ORDER_DETAILS[0]?.serviceListModel[0]
  const bgImage = require('../Assets/img/guest_shape.png');
  const [orderIDAcc, setOrderID] = useState()
  const navigation = useNavigation();
  const showwhatfunc = data => {
    setshowwhat(data);
    console.log(data);
  };
  console.log(orderIDAcc, 'orderIDAcc')
  console.log(GET_PAYMENT_LIST, 'GET_PAYMENT_LIST')
  const jsonData = MY_INFO.guestInfo;
  const officeInfo = MY_INFO.officeInfo;

  console.log(GET_ORDER_DETAILS, 'orderInfoPAymentScreen')
  const showwhatfunc1 = data => {
    setshowwhat1(data);
    console.log(data);
  };
  const showwhatfunc2 = data => {
    setshowwhat2(data);
    console.log(data);
  };
  useEffect(() => {
    if (showwhat1) {
      setshowwhat2('')

    }
  }, [showwhat1])
  useEffect(() => {
    if (showwhat2) {
      setshowwhat1('')

    }
  }, [showwhat2])
  useEffect(() => {
    setLoader(true);
    dispatch(
      GetPaymentList(jsonData?.clientId, jsonData?.clientType, navigation),
    );

    setInfoData(GET_PAYMENT_LIST);
    dispatch(
      dashboardlist(
        jsonData?.clientId,
        jsonData?.clientType,
        officeInfo?.id,
        navigation,
      ),
    );
    setDashboardList(DASHBOARD_LIST);
    setDashboardMessageList(DASHBOARD_MESSAGE_LIST);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);
  console.log(infoData, 'infoData');
  useEffect(() => {
    setInfoData(GET_PAYMENT_LIST);
  }, [GET_PAYMENT_LIST]);

  useEffect(() => {
    // setLoader(true);
    setInfoData(GET_PAYMENT_LIST);
    // setTimeout(() => {
    //   setLoader(false);
    // }, 2000);
    getorderbyId()
  }, [GET_PAYMENT_LIST]);
// useEffect(() => {
//   infoData?.collectionInfo.map((item)=>{
//     getorderbyId(item?.orderId)
//   })
// }, [infoData])


  const getorderbyId = (orderId) => {
    // Alert.alert('hii')
    console.log(orderId, 'orderIDDDD')
    // setLoader(true);

    dispatch(
      GetDetailsbyOrderId(jsonData?.clientId, jsonData?.clientType, orderId, navigation),
    );
    //   setTimeout(() => {
    //     setLoader(false);
    // }, 2000);
  }
  console.log(
    infoData.length,
    'GET_PAYMENT_LISTGET_PAYMENT_LISTGET_PAYMENT_LIST',
  );
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

  const desiredNewsType = 'Holidays ';
  const TaxNewsType = 'Tax Deadlines';
  const filteredList =
    dashboardList &&
    dashboardList.filter(item => item.newsType === desiredNewsType);

  const TaxfilteredList =
    dashboardList &&
    dashboardList.filter(item => item.newsType === TaxNewsType);

  console.log(TaxfilteredList, 'TaxfilteredListt');
  const renderSectionTitle = section => {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  };

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
          <Animatable.View
            duration={400}
            style={[
              styles.content,
              isActive ? styles.active : styles.inactive,
              {
                width: wp(90),
                backgroundColor: Color.geen,
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
                color: '#fff',
                textAlign: 'center',
                marginTop: 4,
                paddingTop: 3,
                width: wp(15),
                // backgroundColor: '#2F5597',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                height: wp(10),
                fontSize: 12,
                fontWeight: '700',
                justifyContent: 'center',
              }}>
              Category
            </Animatable.Text>
            <Animatable.Text
              animation={isActive ? 'bounceIn' : undefined}
              style={{
                color: '#fff',
                textAlign: 'center',
                marginTop: 4,
                paddingTop: 3,
                width: wp(20),

                // backgroundColor: '#2F5597',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                height: wp(10),
                fontSize: 12,
                fontWeight: '700',
                justifyContent: 'center',
              }}>
              Service Name
            </Animatable.Text>
            <Animatable.Text
              animation={isActive ? 'bounceIn' : undefined}
              style={{
                color: '#fff',
                textAlign: 'center',
                marginTop: 4,
                paddingTop: 3,
                width: wp(17),

                // backgroundColor: '#2F5597',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                height: wp(10),
                fontSize: 12,
                fontWeight: '700',
                justifyContent: 'center',
              }}>
              Retail Price
            </Animatable.Text>
            <Animatable.Text
              animation={isActive ? 'bounceIn' : undefined}
              style={{
                color: '#fff',
                textAlign: 'center',
                marginTop: 4,
                paddingTop: 3,
                width: wp(18),

                // backgroundColor: '#2F5597',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                height: wp(10),
                fontSize: 12,
                fontWeight: '700',
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
                paddingTop: 6,
                width: wp(17),

                backgroundColor: Color.darkGreen,
                // borderTopLeftRadius: 10,
                // borderTopRightRadius: 10,
                height: wp(10),
                fontSize: 12,
                fontWeight: '700',
                justifyContent: 'center',
              }}>
              Total Price
            </Animatable.Text>
          </Animatable.View>
          <FlatList
            data={GET_ORDER_DETAILS[0]?.serviceListModel}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => (
              <Animatable.View
                duration={400}
                style={[
                  styles.content,
                  isActive ? styles.active : styles.inactive,
                  {
                    width: wp(90),
                    // backgroundColor: '#fff',
                    alignItems: 'center',
                    // marginBottom: 10,
                    flexDirection: 'row',
                    // height: wp(15),


                    alignSelf: 'center',

                    opacity: 10,
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingBottom: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  },
                ]}
                transition="backgroundColor">
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
                    fontSize: 12,
                    justifyContent: 'center',
                  }}>
                  {item?.serviceInfo?.category?.name}
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
                    fontSize: 12,
                    justifyContent: 'center',
                  }}>
                  {item?.serviceInfo?.description}
                </Animatable.Text>
                <Animatable.Text
                  animation={isActive ? 'bounceIn' : undefined}
                  style={{
                    color: '#000',
                    textAlign: 'center',
                    width: wp(17),

                    // backgroundColor: '#2F5597',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    height: wp(10),
                    fontSize: 12,
                    justifyContent: 'center',
                  }}>
                  ${item?.reqInfo?.retailPrice}
                </Animatable.Text>
                <Animatable.Text
                  animation={isActive ? 'bounceIn' : undefined}
                  style={{
                    color: '#000',
                    textAlign: 'center',
                    width: wp(18),

                    // backgroundColor: '#2F5597',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    height: wp(10),
                    fontSize: 12,
                    justifyContent: 'center',
                  }}>
                  {item?.reqInfo?.quantity}
                </Animatable.Text>
                <Animatable.Text
                  animation={isActive ? 'bounceIn' : undefined}
                  style={{
                    color: '#000',
                    textAlign: 'center',
                    width: wp(17),

                    // backgroundColor: '#2F5597',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    height: wp(10),
                    fontSize: 12,
                    justifyContent: 'center',
                  }}>
                  ${item?.reqInfo?.priceCharged}
                </Animatable.Text>
              </Animatable.View>
            )}
          />
          <Animatable.View
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
                textAlign: 'center',
                marginTop: 10,
                paddingTop: 3,
                width: wp(18),
                // backgroundColor: '#2F5597',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                height: wp(10),
                fontSize: 10,
                fontWeight: '700',
                justifyContent: 'center',
              }}>
              Order ID #{section?.collectionInfo?.orderId}
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
                    fontSize: 8,
                    backgroundColor: '#1c84c6',
                    padding: 5,
                    textAlign: 'center',
                    width: wp(15),
                  }}>
                  Active
                </Text>
              ) : (
                <Text
                  style={{
                    color: Color.white,
                    fontSize: 8,
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
                  })
                }}
                style={{
                  // backgroundColor: '#8AB645',
                  padding: 5,
                  textAlign: 'center',
                  width: wp(22),
                  marginLeft: 10,
                  flexDirection: 'row',
                  // borderRadius: 3
                }}
              >
                <Icon
                  name="eye"
                  size={17}
                  color="#8AB645"
                />
                <Text style={{
                  color: "#000",
                  fontSize: 11,
                  // marginTop: 2,
                  marginLeft: 4

                }}>


                  View Invoice
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ViewOrder', {
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
                  size={17}
                  color="#8AB645"
                />
                <Text style={{
                  color: "#000",
                  fontSize: 11,
                  // marginTop: 2,
                  marginLeft: 4

                }}>


                  View Order
                </Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </Animatable.View>
      </>
    );
  };
  const setSections = sections => {
    //setting up a active section state
    console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH');
    console.log(sections, 'PPPPPPPPPPPPPPPPPPPP');
    setActiveSection(sections.includes(undefined) ? [] : sections);
    // getorderbyId(sections?.collectionInfo?.orderId)
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Loader flag={loader} />
      <CustomHeader />
      <View style={{ height: hp(80), backgroundColor: '#d5e3e5' }}>

        {/* <ImageBackground

          source={bgImage}
          style={styles.bgImg}
          resizeMode="cover"> */}

        <ScrollView nestedScrollEnabled={true}>

          <View style={styles.slideContainer}>
            <View style={styles.mainTab}>
              {(() => {
                if (showwhat1 == 'Message') {
                  return (
                    <View style={styles.moblieSec}>
                      {/* <View style={{ flexDirection: "column", justifyContent: 'space-between' }}> */}
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.emailtoch,
                            {
                              backgroundColor:
                                showwhat1 == 'Message' ? Color.geen : Color.darkGreen,
                            },
                          ]}
                          onPress={() =>
                            showwhat1 == 'Message'
                              ? setshowwhat1('')
                              : showwhatfunc1('Message')
                          }>
                          <Icon3
                            style={[
                              styles.icon,
                              {
                                color: showwhat1 == 'Message' ? '#fff' : '#fff',
                              },
                            ]}
                            name="money-check-alt"
                            size={25}
                            color="#fff"
                          />


                          {/* <Text
                        style={[
                          styles.ButtonText,
                          {
                            color:
                              showwhat1 == 'Message'
                                ? Color.white
                                : Color.darkGreen,
                          },
                        ]}>
                        (1)
                      </Text> */}
                        </TouchableOpacity>
                        <Text
                          style={[
                            styles.ButtonText,
                            {
                              color:
                                showwhat1 == 'Message'
                                  ? Color.darkGreen
                                  : Color.darkGreen,
                            },
                          ]}>
                          Tax
                        </Text>
                      </View>
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.mobiletoch1,
                            {
                              backgroundColor:
                                showwhat1 == 'Proposal' ? '#2F4050' : Color.darkGreen,
                            },
                          ]}
                          onPress={() =>
                            showwhat1 == 'Proposal'
                              ? setshowwhat1('')
                              : showwhatfunc1('Proposal')
                          }>
                          <Icon
                            style={[
                              styles.icon,
                              {
                                color:
                                  showwhat1 == 'Proposal'
                                    ? Color.white
                                    : Color.white,
                              },
                            ]}
                            name="message1"
                            size={25}
                            color="#fff"
                          />


                          {/* <Text
                        style={[
                          styles.ButtonText,
                          {
                            color:
                              showwhat1 == 'Proposal'
                                ? Color.white
                                : Color.darkGreen,
                          },
                        ]}>
                        ({dashboardMessageList.length})
                      </Text> */}
                        </TouchableOpacity>
                        <Text
                          style={[
                            styles.ButtonText,
                            {
                              color:
                                showwhat1 == 'Message'
                                  ? Color.darkGreen
                                  : Color.darkGreen,
                            },
                          ]}>
                          Messages
                        </Text>
                      </View>
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.mobiletoch1,
                            {
                              backgroundColor:
                                showwhat1 == 'Signature' ? '#2F4050' : Color.darkGreen,
                            },
                          ]}
                          onPress={() =>
                            showwhat1 == 'Signature'
                              ? setshowwhat1('')
                              : showwhatfunc1('Signature')
                          }>
                          <Icon1
                            style={[
                              styles.icon,
                              {
                                color:
                                  showwhat1 == 'Signature'
                                    ? Color.white
                                    : Color.white,
                              },
                            ]}
                            name="event"
                            size={25}
                            color="#fff"
                          />


                          {/* <Text
                        style={[
                          styles.ButtonText,
                          {
                            color:
                              showwhat1 == 'Signature'
                                ? Color.white
                                : Color.darkGreen,
                          },
                        ]}>
                        (0)
                      </Text> */}
                        </TouchableOpacity>
                        <Text
                          style={[
                            styles.ButtonText,
                            {
                              color:
                                showwhat1 == 'Message'
                                  ? Color.darkGreen
                                  : Color.darkGreen,
                            },
                          ]}>
                          Events
                        </Text>
                      </View>
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.mobiletoch1,
                            {
                              backgroundColor:
                                showwhat1 == 'Reminders' ? '#2F4050' : Color.darkGreen,
                            },
                          ]}
                          onPress={() =>
                            showwhat1 == 'Reminders'
                              ? setshowwhat1('')
                              : showwhatfunc1('Reminders')
                          }>
                          <Icon2
                            style={[
                              styles.icon,
                              {
                                color:
                                  showwhat1 == 'Reminders'
                                    ? Color.white
                                    : Color.white,
                              },
                            ]}
                            name="holiday-village"
                            size={25}
                            color="#fff"
                          />


                          {/* <Text
                        style={[
                          styles.ButtonText,
                          {
                            color:
                              showwhat1 == 'Reminders'
                                ? Color.white
                                : Color.darkGreen,
                          },
                        ]}>
                        (1)
                      </Text> */}
                        </TouchableOpacity>
                        <Text
                          style={[
                            styles.ButtonText,
                            {
                              color:
                                showwhat1 == 'Message'
                                  ? Color.darkGreen
                                  : Color.darkGreen,
                            },
                          ]}>
                          Holidays
                        </Text>
                      </View>
                      {/* </View> */}
                    </View>
                  );
                } else if (showwhat1 == 'Proposal') {
                  return (
                    <View style={styles.moblieSec}>
                      {/* <View style={{ flexDirection: "column", justifyContent: 'space-between' }}> */}
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.emailtoch,
                            {
                              backgroundColor:
                                // showwhat1 == 'Message' ? '#2F4050' : '#fff',
                                showwhat1 == 'Message' ? Color.geen : Color.darkGreen,

                            },
                          ]}
                          onPress={() =>
                            showwhat1 == 'Message'
                              ? setshowwhat1('')
                              : showwhatfunc1('Message')
                          }>
                          <Icon3
                            style={[
                              styles.icon,
                              {
                                color: showwhat1 == 'Message' ? '#fff' : '#fff',
                              },
                            ]}
                            name="money-check-alt"
                            size={25}
                            color="#fff"
                          />

                          {/* <Text
                        style={[
                          styles.ButtonText,
                          {
                            color: showwhat1 == 'Message' ? '#fff' : '#000',
                          },
                        ]}>
                        (1)
                      </Text> */}
                        </TouchableOpacity>
                        <Text
                          style={[
                            styles.ButtonText,
                            {
                              color:
                                showwhat1 == 'Message'
                                  ? Color.darkGreen
                                  : Color.darkGreen,
                            },
                          ]}>
                          Tax
                        </Text>
                      </View>
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.mobiletoch1,
                            {
                              backgroundColor:
                                showwhat1 == 'Proposal' ? Color.geen : Color.darkGreen,
                            },
                          ]}
                          onPress={() =>
                            showwhat1 == 'Proposal'
                              ? setshowwhat1('')
                              : showwhatfunc1('Proposal')
                          }>
                          <Icon
                            style={[
                              styles.icon,
                              {
                                color: showwhat1 == 'Proposal' ? '#fff' : '#fff',
                              },
                            ]}
                            name="message1"
                            size={25}
                            color="#fff"
                          />


                          {/* <Text
                        style={[
                          styles.ButtonText,
                          {
                            color:
                              showwhat1 == 'Proposal'
                                ? Color.white
                                : Color.darkGreen,
                          },
                        ]}>
                        ({dashboardMessageList.length})
                      </Text> */}
                        </TouchableOpacity>
                        <Text
                          style={[
                            styles.ButtonText,
                            {
                              color:
                                showwhat1 == 'Message'
                                  ? Color.darkGreen
                                  : Color.darkGreen,
                            },
                          ]}>
                          Messages
                        </Text>
                      </View>
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.mobiletoch1,
                            {
                              backgroundColor:
                                showwhat1 == 'Signature' ? '#2F4050' : Color.darkGreen,
                            },
                          ]}
                          onPress={() =>
                            showwhat1 == 'Signature'
                              ? setshowwhat1('')
                              : showwhatfunc1('Signature')
                          }>
                          <Icon1
                            style={[
                              styles.icon,
                              { color: showwhat1 == 'Signature' ? '#fff' : '#fff' },
                            ]}
                            name="event"
                            size={25}
                            color="#fff"
                          />


                          {/* <Text
                        style={[
                          styles.ButtonText,
                          {
                            color: showwhat1 == 'Signature' ? '#fff' : '#000',
                          },
                        ]}>
                        (0)
                      </Text> */}
                        </TouchableOpacity>
                        <Text
                          style={[
                            styles.ButtonText,
                            {
                              color:
                                showwhat1 == 'Message'
                                  ? Color.darkGreen
                                  : Color.darkGreen,
                            },
                          ]}>
                          Events
                        </Text>
                      </View>
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.mobiletoch1,
                            {
                              backgroundColor:
                                showwhat1 == 'Reminders' ? '#2F4050' : Color.darkGreen,
                            },
                          ]}
                          onPress={() =>
                            showwhat1 == 'Reminders'
                              ? setshowwhat1('')
                              : showwhatfunc1('Reminders')
                          }>
                          <Icon2
                            style={[
                              styles.icon,
                              {
                                color: showwhat1 == 'Reminders' ? '#fff' : '#fff',
                              },
                            ]}
                            name="holiday-village"
                            size={25}
                            color="#fff"
                          />


                          {/* <Text
                        style={[
                          styles.ButtonText,
                          {
                            color: showwhat1 == 'Reminders' ? '#fff' : '#000',
                          },
                        ]}>
                        (1)
                      </Text> */}
                        </TouchableOpacity>
                        <Text
                          style={[
                            styles.ButtonText,
                            {
                              color:
                                showwhat1 == 'Message'
                                  ? Color.darkGreen
                                  : Color.darkGreen,
                            },
                          ]}>
                          Holidays
                        </Text>
                      </View>
                      {/* </View> */}
                    </View>
                  );
                } else if (showwhat1 == 'Signature') {
                  return (
                    <View style={styles.moblieSec}>
                      {/* <View style={{ flexDirection: "column", justifyContent: 'space-between' }}> */}
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.emailtoch,
                            {
                              backgroundColor:
                                showwhat1 == 'Message' ? '#2F4050' : Color.darkGreen,
                            },
                          ]}
                          onPress={() =>
                            showwhat1 == 'Message'
                              ? setshowwhat1('')
                              : showwhatfunc1('Message')
                          }>
                          <Icon3
                            style={[
                              styles.icon,
                              {
                                color: showwhat1 == 'Message' ? '#fff' : '#fff',
                              },
                            ]}
                            name="money-check-alt"
                            size={25}
                            color="#fff"
                          />


                          {/* <Text
                        style={[
                          styles.ButtonText,
                          {
                            color: showwhat1 == 'Message' ? '#fff' : '#000',
                          },
                        ]}>
                        (1)
                      </Text> */}
                        </TouchableOpacity>
                        <Text
                          style={[
                            styles.ButtonText,
                            {
                              color:
                                showwhat1 == 'Message'
                                  ? Color.darkGreen
                                  : Color.darkGreen,
                            },
                          ]}>
                          Tax
                        </Text>
                      </View>
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.mobiletoch1,
                            {
                              backgroundColor:
                                showwhat1 == 'Proposal' ? '#2F4050' : Color.darkGreen,
                            },
                          ]}
                          onPress={() =>
                            showwhat1 == 'Proposal'
                              ? setshowwhat1('')
                              : showwhatfunc1('Proposal')
                          }>
                          <Icon
                            style={[
                              styles.icon,
                              {
                                color: showwhat1 == 'Proposal' ? '#fff' : '#fff',
                              },
                            ]}
                            name="message1"
                            size={25}
                            color="#fff"
                          />


                          {/* <Text
                        style={[
                          styles.ButtonText,
                          {
                            color: showwhat1 == 'Proposal' ? '#fff' : '#000',
                          },
                        ]}>
                        ({dashboardMessageList.length})
                      </Text> */}
                        </TouchableOpacity>
                        <Text
                          style={[
                            styles.ButtonText,
                            {
                              color:
                                showwhat1 == 'Message'
                                  ? Color.darkGreen
                                  : Color.darkGreen,
                            },
                          ]}>
                          Messages
                        </Text>
                      </View>
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.mobiletoch1,
                            {
                              backgroundColor:
                                showwhat1 == 'Signature' ? Color.geen : Color.darkGreen,
                            },
                          ]}
                          onPress={() =>
                            showwhat1 == 'Signature'
                              ? setshowwhat1('')
                              : showwhatfunc1('Signature')
                          }>
                          <Icon1
                            style={[
                              styles.icon,
                              { color: showwhat1 == 'Signature' ? '#fff' : '#fff' },
                            ]}
                            name="event"
                            size={25}
                            color="#fff"
                          />


                          {/* <Text
                        style={[
                          styles.ButtonText,
                          {
                            color:
                              showwhat1 == 'Signature'
                                ? Color.white
                                : Color.darkGreen,
                          },
                        ]}>
                        (0)
                      </Text> */}
                        </TouchableOpacity>
                        <Text
                          style={[
                            styles.ButtonText,
                            {
                              color:
                                showwhat1 == 'Message'
                                  ? Color.darkGreen
                                  : Color.darkGreen,
                            },
                          ]}>
                          Events
                        </Text>
                      </View>
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.mobiletoch1,
                            {
                              backgroundColor:
                                showwhat1 == 'Reminders' ? '#2F4050' : Color.darkGreen,
                            },
                          ]}
                          onPress={() =>
                            showwhat1 == 'Reminders'
                              ? setshowwhat1('')
                              : showwhatfunc1('Reminders')
                          }>
                          <Icon2
                            style={[
                              styles.icon,
                              {
                                color: showwhat1 == 'Reminders' ? '#fff' : '#fff',
                              },
                            ]}
                            name="holiday-village"
                            size={25}
                            color="#fff"
                          />


                          {/* <Text
                        style={[
                          styles.ButtonText,
                          {
                            color: showwhat1 == 'Reminders' ? '#fff' : '#000',
                          },
                        ]}>
                        (1)
                      </Text> */}
                        </TouchableOpacity>
                        <Text
                          style={[
                            styles.ButtonText,
                            {
                              color:
                                showwhat1 == 'Message'
                                  ? Color.darkGreen
                                  : Color.darkGreen,
                            },
                          ]}>
                          Holidays
                        </Text>
                      </View>
                      {/* </View> */}
                    </View>
                  );
                } else {
                  return (
                    <View style={styles.moblieSec}>
                      {/* <View style={{ flexDirection: "column", justifyContent: 'space-between' }}> */}
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.emailtoch,
                            {
                              backgroundColor:
                                showwhat1 == 'Message' ? '#2F4050' : Color.darkGreen,
                            },
                          ]}
                          onPress={() =>
                            showwhat1 == 'Message'
                              ? setshowwhat1('')
                              : showwhatfunc1('Message')
                          }>
                          <Icon3
                            style={[
                              styles.icon,
                              {
                                color: showwhat1 == 'Message' ? '#fff' : '#fff',
                              },
                            ]}
                            name="money-check-alt"
                            size={25}
                            color="#fff"
                          />


                          {/* <Text
                        style={[
                          styles.ButtonText,
                          {
                            color: showwhat1 == 'Message' ? '#fff' : '#000',
                          },
                        ]}>
                        (1)
                      </Text> */}
                        </TouchableOpacity>
                        <Text
                          style={[
                            styles.ButtonText,
                            {
                              color:
                                showwhat1 == 'Message'
                                  ? Color.darkGreen
                                  : Color.darkGreen,
                            },
                          ]}>
                          Tax
                        </Text>
                      </View>
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.mobiletoch1,
                            {
                              backgroundColor:
                                showwhat1 == 'Proposal' ? '#2F4050' : Color.darkGreen,
                            },
                          ]}
                          onPress={() => showwhatfunc1('Proposal')}>
                          <Icon
                            style={[
                              styles.icon,
                              {
                                color: showwhat1 == 'Proposal' ? '#fff' : '#fff',
                              },
                            ]}
                            name="message1"
                            size={25}
                            color="#fff"
                          />


                          {/* <Text
                        style={[
                          styles.ButtonText,
                          {
                            color: showwhat1 == 'Proposal' ? '#fff' : '#000',
                          },
                        ]}>
                        ({dashboardMessageList.length})
                      </Text> */}
                        </TouchableOpacity>
                        <Text
                          style={[
                            styles.ButtonText,
                            {
                              color:
                                showwhat1 == 'Message'
                                  ? Color.darkGreen
                                  : Color.darkGreen,
                            },
                          ]}>
                          Messages
                        </Text>
                      </View>
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.mobiletoch1,
                            {
                              backgroundColor:
                                showwhat1 == 'Signature' ? '#2F4050' : Color.darkGreen,
                            },
                          ]}
                          onPress={() =>
                            showwhat1 == 'Signature'
                              ? setshowwhat1('')
                              : showwhatfunc1('Signature')
                          }>
                          <Icon1
                            style={[
                              styles.icon,
                              { color: showwhat1 == 'Signature' ? '#fff' : '#fff' },
                            ]}
                            name="event"
                            size={25}
                            color="#fff"
                          />


                          {/* <Text
                        style={[
                          styles.ButtonText,
                          {
                            color: showwhat1 == 'Signature' ? '#fff' : '#000',
                          },
                        ]}>
                        (0)
                      </Text> */}
                        </TouchableOpacity>
                        <Text
                          style={[
                            styles.ButtonText,
                            {
                              color:
                                showwhat1 == 'Message'
                                  ? Color.darkGreen
                                  : Color.darkGreen,
                            },
                          ]}>
                          Events
                        </Text>
                      </View>
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.mobiletoch1,
                            {
                              backgroundColor:
                                showwhat1 == 'Reminders' ? Color.geen : Color.darkGreen,
                            },
                          ]}
                          onPress={() =>
                            showwhat1 == 'Reminders'
                              ? setshowwhat1('')
                              : showwhatfunc1('Reminders')
                          }>
                          <Icon2
                            style={[
                              styles.icon,
                              {
                                color: showwhat1 == 'Reminders' ? '#fff' : '#fff',
                              },
                            ]}
                            name="holiday-village"
                            size={25}
                            color="#fff"
                          />


                          {/* <Text
                        style={[
                          styles.ButtonText,
                          {
                            color:
                              showwhat1 == 'Reminders'
                                ? Color.white
                                : Color.darkGreen,
                          },
                        ]}>
                        (1)
                      </Text> */}
                        </TouchableOpacity>
                        <Text
                          style={[
                            styles.ButtonText,
                            {
                              color:
                                showwhat1 == 'Message'
                                  ? Color.darkGreen
                                  : Color.darkGreen,
                            },
                          ]}>
                          Holidays
                        </Text>
                      </View>
                      {/* </View> */}
                    </View>
                  );
                }
              })()}



              {(() => {
                if (showwhat2 == 'orders') {
                  return (
                    <View style={styles.moblieSec}>
                      {/* <View style={{ flexDirection: "column", justifyContent: 'space-between' }}> */}
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.emailtochO,
                            {
                              backgroundColor:
                                showwhat2 == 'orders' ? Color.geen : Color.darkGreen,
                            },
                          ]}
                          onPress={() =>
                            showwhat2 == 'orders'
                              ? setshowwhat2('')
                              : showwhatfunc2('orders')
                          }>
                          <Icon4
                            style={[
                              styles.icon,
                              {
                                color: showwhat2 == 'orders' ? '#fff' : '#fff',
                              },
                            ]}
                            name="list-check"
                            size={25}
                            color="#fff"
                          />


                          {/* <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Message'
                              ? Color.white
                              : Color.darkGreen,
                        },
                      ]}>
                      (1)
                    </Text> */}
                        </TouchableOpacity>
                        <Text
                          style={[
                            styles.ButtonText,
                            {
                              color:
                                showwhat1 == 'Message'
                                  ? Color.darkGreen
                                  : Color.darkGreen,
                            },
                          ]}>
                          Orders
                        </Text>
                      </View>
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.mobiletoch,
                            {
                              backgroundColor:
                                showwhat2 == 'taxReturn' ? Color.geen : Color.darkGreen,
                            },
                          ]}
                          onPress={() =>
                            showwhat2 == 'taxReturn'
                              ? setshowwhat2('')
                              : showwhatfunc2('taxReturn')
                          }>
                          <Icon4
                            style={[
                              styles.icon,

                              {
                                color:
                                  showwhat2 == 'taxReturn'
                                    ? Color.white
                                    : Color.white,
                              },
                            ]}
                            name="money-bills"
                            size={25}
                            color="#fff"
                          />


                          {/* <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Proposal'
                              ? Color.white
                              : Color.darkGreen,
                        },
                      ]}>
                      ({dashboardMessageList.length})
                    </Text> */}
                        </TouchableOpacity>
                        <Text
                          style={[
                            styles.ButtonText,
                            {
                              color:
                                showwhat1 == 'Message'
                                  ? Color.darkGreen
                                  : Color.darkGreen,
                            },
                          ]}>
                          Tax Returns
                        </Text>
                      </View>
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.mobiletoch,
                            {
                              backgroundColor:
                                showwhat2 == 'book' ? Color.geen : Color.darkGreen,
                            },
                          ]}
                          onPress={() =>
                            showwhat2 == 'book'
                              ? setshowwhat2('')
                              : showwhatfunc2('book')
                          }>
                          <Icon4
                            style={[
                              styles.icon,

                              {
                                color:
                                  showwhat2 == 'book'
                                    ? Color.white
                                    : Color.white,
                              },
                            ]}
                            name="calculator"
                            size={25}
                            color="#fff"
                          />


                          {/* <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Signature'
                              ? Color.white
                              : Color.darkGreen,
                        },
                      ]}>
                      (0)
                    </Text> */}
                        </TouchableOpacity>
                        <Text
                          style={[
                            styles.ButtonText,
                            {
                              color:
                                showwhat1 == 'Message'
                                  ? Color.darkGreen
                                  : Color.darkGreen,
                            },
                          ]}>
                          Book Keeping
                        </Text>
                      </View>
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.mobiletoch,
                            {
                              backgroundColor:
                                showwhat2 == 'Gov' ? Color.geen : Color.darkGreen,
                            },
                          ]}
                          onPress={() =>
                            showwhat2 == 'Gov'
                              ? setshowwhat2('')
                              : showwhatfunc2('Gov')
                          }>
                          <Icon4
                            style={[
                              styles.icon,

                              {
                                color:
                                  showwhat2 == 'Gov'
                                    ? Color.white
                                    : Color.white,
                              },
                            ]}
                            name="hand-holding-dollar"
                            size={25}
                            color="#fff"
                          />


                          {/* <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Reminders'
                              ? Color.white
                              : Color.darkGreen,
                        },
                      ]}>
                      (1)
                    </Text> */}
                        </TouchableOpacity>
                        <Text
                          style={[
                            styles.ButtonText,
                            {
                              color:
                                showwhat1 == 'Message'
                                  ? Color.darkGreen
                                  : Color.darkGreen,
                            },
                          ]}>
                          Gov. Payments
                        </Text>
                      </View>
                      {/* </View> */}
                    </View>
                  );
                } else if (showwhat2 == 'taxReturn') {
                  return (
                    <View style={styles.moblieSec}>
                      {/* <View style={{ flexDirection: "column", justifyContent: 'space-between' }}> */}
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.emailtochO,
                            {
                              backgroundColor:
                                showwhat2 == 'orders' ? Color.geen : Color.darkGreen,
                            },
                          ]}
                          onPress={() =>
                            showwhat2 == 'orders'
                              ? setshowwhat2('')
                              : showwhatfunc2('orders')
                          }>
                          <Icon4
                            style={[
                              styles.icon,
                              {
                                color: showwhat2 == 'orders' ? '#fff' : '#fff',
                              },
                            ]}
                            name="list-check"
                            size={25}
                            color="#fff"
                          />


                          {/* <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Message'
                              ? Color.white
                              : Color.darkGreen,
                        },
                      ]}>
                      (1)
                    </Text> */}
                        </TouchableOpacity>
                        <Text
                          style={[
                            styles.ButtonText,
                            {
                              color:
                                showwhat1 == 'Message'
                                  ? Color.darkGreen
                                  : Color.darkGreen,
                            },
                          ]}>
                          Orders
                        </Text>
                      </View>
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.mobiletoch,
                            {
                              backgroundColor:
                                showwhat2 == 'taxReturn' ? Color.geen : Color.darkGreen,
                            },
                          ]}
                          onPress={() =>
                            showwhat2 == 'taxReturn'
                              ? setshowwhat2('')
                              : showwhatfunc2('taxReturn')
                          }>
                          <Icon4
                            style={[
                              styles.icon,
                              {
                                color:
                                  showwhat2 == 'taxReturn'
                                    ? Color.white
                                    : Color.white,
                              },
                            ]}
                            name="money-bills"
                            size={25}
                            color="#fff"
                          />


                          {/* <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Proposal'
                              ? Color.white
                              : Color.darkGreen,
                        },
                      ]}>
                      ({dashboardMessageList.length})
                    </Text> */}
                        </TouchableOpacity>
                        <Text
                          style={[
                            styles.ButtonText,
                            {
                              color:
                                showwhat1 == 'Message'
                                  ? Color.darkGreen
                                  : Color.darkGreen,
                            },
                          ]}>
                          Tax Returns
                        </Text>
                      </View>
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.mobiletoch,
                            {
                              backgroundColor:
                                showwhat2 == 'book' ? Color.geen : Color.darkGreen,
                            },
                          ]}
                          onPress={() =>
                            showwhat2 == 'book'
                              ? setshowwhat2('')
                              : showwhatfunc2('book')
                          }>
                          <Icon4
                            style={[
                              styles.icon,
                              {
                                color:
                                  showwhat2 == 'book'
                                    ? Color.white
                                    : Color.white,
                              },
                            ]}
                            name="calculator"
                            size={25}
                            color="#fff"
                          />


                          {/* <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Signature'
                              ? Color.white
                              : Color.darkGreen,
                        },
                      ]}>
                      (0)
                    </Text> */}
                        </TouchableOpacity>
                        <Text
                          style={[
                            styles.ButtonText,
                            {
                              color:
                                showwhat1 == 'Message'
                                  ? Color.darkGreen
                                  : Color.darkGreen,
                            },
                          ]}>
                          Book Keeping
                        </Text>
                      </View>
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.mobiletoch,
                            {
                              backgroundColor:
                                showwhat2 == 'Gov' ? Color.geen : Color.darkGreen,
                            },
                          ]}
                          onPress={() =>
                            showwhat2 == 'Gov'
                              ? setshowwhat2('')
                              : showwhatfunc2('Gov')
                          }>
                          <Icon4
                            style={[
                              styles.icon,
                              {
                                color:
                                  showwhat2 == 'Gov'
                                    ? Color.white
                                    : Color.white,
                              },
                            ]}
                            name="hand-holding-dollar"
                            size={25}
                            color="#fff"
                          />


                          {/* <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Reminders'
                              ? Color.white
                              : Color.darkGreen,
                        },
                      ]}>
                      (1)
                    </Text> */}
                        </TouchableOpacity>
                        <Text
                          style={[
                            styles.ButtonText,
                            {
                              color:
                                showwhat1 == 'Message'
                                  ? Color.darkGreen
                                  : Color.darkGreen,
                            },
                          ]}>
                          Gov. Payments
                        </Text>
                      </View>
                      {/* </View> */}
                    </View>
                  );
                } else if (showwhat2 == 'book') {
                  return (
                    <View style={styles.moblieSec}>
                      {/* <View style={{ flexDirection: "column", justifyContent: 'space-between' }}> */}
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.emailtochO,
                            {
                              backgroundColor:
                                showwhat2 == 'orders' ? Color.geen : Color.darkGreen,
                            },
                          ]}
                          onPress={() =>
                            showwhat2 == 'orders'
                              ? setshowwhat2('')
                              : showwhatfunc2('orders')
                          }>
                          <Icon4
                            style={[
                              styles.icon,
                              {
                                color: showwhat2 == 'orders' ? '#fff' : '#fff',
                              },
                            ]}
                            name="list-check"
                            size={25}
                            color="#fff"
                          />


                          {/* <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Message'
                              ? Color.white
                              : Color.darkGreen,
                        },
                      ]}>
                      (1)
                    </Text> */}
                        </TouchableOpacity>
                        <Text
                          style={[
                            styles.ButtonText,
                            {
                              color:
                                showwhat1 == 'Message'
                                  ? Color.darkGreen
                                  : Color.darkGreen,
                            },
                          ]}>
                          Orders
                        </Text>
                      </View>
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.mobiletoch,
                            {
                              backgroundColor:
                                showwhat2 == 'taxReturn' ? Color.geen : Color.darkGreen,
                            },
                          ]}
                          onPress={() =>
                            showwhat2 == 'taxReturn'
                              ? setshowwhat2('')
                              : showwhatfunc2('taxReturn')
                          }>
                          <Icon4
                            style={[
                              styles.icon,
                              {
                                color:
                                  showwhat2 == 'taxReturn'
                                    ? Color.white
                                    : Color.white,
                              },
                            ]}
                            name="money-bills"
                            size={25}
                            color="#fff"
                          />

                          {/* <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Proposal'
                              ? Color.white
                              : Color.darkGreen,
                        },
                      ]}>
                      ({dashboardMessageList.length})
                    </Text> */}
                        </TouchableOpacity>
                        <Text
                          style={[
                            styles.ButtonText,
                            {
                              color:
                                showwhat1 == 'Message'
                                  ? Color.darkGreen
                                  : Color.darkGreen,
                            },
                          ]}>
                          Tax Returns
                        </Text>
                      </View>
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.mobiletoch,
                            {
                              backgroundColor:
                                showwhat2 == 'book' ? Color.geen : Color.darkGreen,
                            },
                          ]}
                          onPress={() =>
                            showwhat2 == 'book'
                              ? setshowwhat2('')
                              : showwhatfunc2('book')
                          }>
                          <Icon4
                            style={[
                              styles.icon,
                              {
                                color:
                                  showwhat2 == 'book'
                                    ? Color.white
                                    : Color.white,
                              },
                            ]}
                            name="calculator"
                            size={25}
                            color="#fff"
                          />


                          {/* <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Signature'
                              ? Color.white
                              : Color.darkGreen,
                        },
                      ]}>
                      (0)
                    </Text> */}
                        </TouchableOpacity>
                        <Text
                          style={[
                            styles.ButtonText,
                            {
                              color:
                                showwhat1 == 'Message'
                                  ? Color.darkGreen
                                  : Color.darkGreen,
                            },
                          ]}>
                          Book Keeping
                        </Text>
                      </View>
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.mobiletoch,
                            {
                              backgroundColor:
                                showwhat2 == 'Gov' ? Color.geen : Color.darkGreen,
                            },
                          ]}
                          onPress={() =>
                            showwhat2 == 'Gov'
                              ? setshowwhat2('')
                              : showwhatfunc2('Gov')
                          }>
                          <Icon4
                            style={[
                              styles.icon,
                              {
                                color:
                                  showwhat2 == 'Gov'
                                    ? Color.white
                                    : Color.white,
                              },
                            ]}
                            name="hand-holding-dollar"
                            size={25}
                            color="#fff"
                          />


                          {/* <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Reminders'
                              ? Color.white
                              : Color.darkGreen,
                        },
                      ]}>
                      (1)
                    </Text> */}
                        </TouchableOpacity>
                        <Text
                          style={[
                            styles.ButtonText,
                            {
                              color:
                                showwhat1 == 'Message'
                                  ? Color.darkGreen
                                  : Color.darkGreen,
                            },
                          ]}>
                          Gov. Payments
                        </Text>
                      </View>
                      {/* </View> */}
                    </View>
                  );
                } else {
                  return (
                    <View style={styles.moblieSec}>
                      {/* <View style={{ flexDirection: "column", justifyContent: 'space-between' }}> */}
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.emailtochO,
                            {
                              backgroundColor:
                                showwhat2 == 'orders' ? Color.geen : Color.darkGreen,
                            },
                          ]}
                          onPress={() =>
                            showwhat2 == 'orders'
                              ? setshowwhat2('')
                              : showwhatfunc2('orders')
                          }>
                          <Icon4
                            style={[
                              styles.icon,
                              {
                                color: showwhat2 == 'orders' ? '#fff' : '#fff',
                              },
                            ]}
                            name="list-check"
                            size={25}
                            color="#fff"
                          />


                          {/* <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Message'
                              ? Color.white
                              : Color.darkGreen,
                        },
                      ]}>
                      (1)
                    </Text> */}
                        </TouchableOpacity>
                        <Text
                          style={[
                            styles.ButtonText,
                            {
                              color:
                                showwhat1 == 'Message'
                                  ? Color.darkGreen
                                  : Color.darkGreen,
                            },
                          ]}>
                          Orders
                        </Text>
                      </View>
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.mobiletoch,
                            {
                              backgroundColor:
                                showwhat2 == 'taxReturn' ? Color.geen : Color.darkGreen,
                            },
                          ]}
                          onPress={() =>
                            showwhat2 == 'taxReturn'
                              ? setshowwhat2('')
                              : showwhatfunc2('taxReturn')
                          }>
                          <Icon4
                            style={[
                              styles.icon,
                              {
                                color:
                                  showwhat2 == 'taxReturn'
                                    ? Color.white
                                    : Color.white,
                              },
                            ]}
                            name="money-bills"
                            size={25}
                            color="#fff"
                          />


                          {/* <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Proposal'
                              ? Color.white
                              : Color.darkGreen,
                        },
                      ]}>
                      ({dashboardMessageList.length})
                    </Text> */}
                        </TouchableOpacity>
                        <Text
                          style={[
                            styles.ButtonText,
                            {
                              color:
                                showwhat1 == 'Message'
                                  ? Color.darkGreen
                                  : Color.darkGreen,
                            },
                          ]}>
                          Tax Returns
                        </Text>
                      </View>
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.mobiletoch,
                            {
                              backgroundColor:
                                showwhat2 == 'book' ? Color.geen : Color.darkGreen,
                            },
                          ]}
                          onPress={() =>
                            showwhat2 == 'book'
                              ? setshowwhat2('')
                              : showwhatfunc2('book')
                          }>
                          <Icon4
                            style={[
                              styles.icon,
                              {
                                color:
                                  showwhat2 == 'book'
                                    ? Color.white
                                    : Color.white,
                              },
                            ]}
                            name="calculator"
                            size={25}
                            color="#fff"
                          />


                          {/* <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Signature'
                              ? Color.white
                              : Color.darkGreen,
                        },
                      ]}>
                      (0)
                    </Text> */}
                        </TouchableOpacity>
                        <Text
                          style={[
                            styles.ButtonText,
                            {
                              color:
                                showwhat1 == 'Message'
                                  ? Color.darkGreen
                                  : Color.darkGreen,
                            },
                          ]}>
                          Book Keeping
                        </Text>
                      </View>
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.mobiletoch,
                            {
                              backgroundColor:
                                showwhat2 == 'Gov' ? Color.geen : Color.darkGreen,
                            },
                          ]}
                          onPress={() =>
                            showwhat2 == 'Gov'
                              ? setshowwhat2('')
                              : showwhatfunc2('Gov')
                          }>
                          <Icon4
                            style={[
                              styles.icon,
                              {
                                color:
                                  showwhat2 == 'Gov'
                                    ? Color.white
                                    : Color.white,
                              },
                            ]}
                            name="hand-holding-dollar"
                            size={25}
                            color="#fff"
                          />


                          {/* <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Reminders'
                              ? Color.white
                              : Color.darkGreen,
                        },
                      ]}>
                      (1)
                    </Text> */}
                        </TouchableOpacity>
                        <Text
                          style={[
                            styles.ButtonText,
                            {
                              color:
                                showwhat1 == 'Message'
                                  ? Color.darkGreen
                                  : Color.darkGreen,
                            },
                          ]}>
                          Gov. Payments
                        </Text>
                      </View>
                      {/* </View> */}
                    </View>
                  );
                }
              })()}
            </View>
            {(() => {
              if (showwhat1 == 'Message') {
                return (
                  <ScrollView>
                    {/* <View style={styles.subContainer}> */}
                    <TouchableOpacity onPress={() => setshowwhat1('')}>
                      <View style={styles.part}></View>
                      {TaxfilteredList &&
                        TaxfilteredList.map(item => (
                          <View key={item.id} style={{ padding: 20 }}>
                            <Text
                              style={{
                                backgroundColor: '#23c6c8',
                                fontSize: 12,
                                padding: 3,
                              }}>
                              {item.subject}
                            </Text>
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: '700',
                                padding: 3,
                              }}>
                              Message:
                              <Text
                                style={{
                                  fontSize: 10,
                                  fontWeight: 'normal',
                                  padding: 3,
                                }}>
                                {item.message}
                              </Text>
                            </Text>
                          </View>
                        ))}

                      {/* <Text style={styles.subHead}> Message Not Found</Text> */}

                      {/* </View> */}
                    </TouchableOpacity>
                  </ScrollView>
                );
              } else if (showwhat1 == 'Proposal') {
                return (
                  <ScrollView>
                    <TouchableOpacity onPress={() => setshowwhat1('')}>
                      <View style={styles.part}></View>

                      {dashboardMessageList &&
                        dashboardMessageList.map(item => (
                          <View
                            key={item.id}
                            style={{
                              paddingLeft: 20,
                              //paddingBottom: 10,
                              paddingTop: 10,
                            }}>
                            <Text
                              style={{
                                backgroundColor: '#23c6c8',
                                fontSize: 12,
                                width: wp(15),
                                padding: 3,
                                textAlign: 'center',
                              }}>
                              Action
                            </Text>
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: '700',
                                padding: 3,
                              }}>
                              Notification:
                              <Text
                                style={{
                                  fontSize: 10,
                                  fontWeight: 'normal',
                                  padding: 3,
                                }}>
                                You have created new action #{item.id}
                              </Text>
                            </Text>
                          </View>
                        ))}

                      {/* <View style={styles.subContainer}> */}
                      {/* <Text style={styles.subHead}>Proposal Results Found</Text> */}

                      {/* </View> */}
                    </TouchableOpacity>
                  </ScrollView>
                );
              } else if (showwhat1 == 'Signature') {
                return (
                  <ScrollView>
                    <TouchableOpacity onPress={() => setshowwhat1('')}>
                      <View style={styles.part}></View>

                      {/* <View style={styles.subContainer}> */}
                      <Text style={styles.subHead}>Events not found</Text>

                      {/* </View> */}
                    </TouchableOpacity>
                  </ScrollView>
                );
              } else if (showwhat1 == 'Reminders') {
                return (
                  <TouchableOpacity onPress={() => setshowwhat1('')}>
                    <View style={{ height: 200 }}>
                      <View style={styles.part}></View>
                      {filteredList &&
                        filteredList.map(item => (
                          <View key={item.id} style={{ height: 200, padding: 20 }}>
                            <Text
                              style={{
                                backgroundColor: '#23c6c8',
                                fontSize: 12,
                                padding: 3,
                              }}>
                              {item.subject}
                            </Text>
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: '700',
                                padding: 3,
                              }}>
                              Message:
                              <Text
                                style={{
                                  fontSize: 10,
                                  fontWeight: 'normal',
                                  padding: 3,
                                }}>
                                {item.message}
                              </Text>
                            </Text>
                          </View>
                        ))}
                      {/* <View style={styles.subContainer}> */}
                      {/* <Text style={styles.subHead}>Reminders Not Found1</Text> */}
                      {/* </View> */}
                    </View>
                  </TouchableOpacity>
                );
              }
            })()}
            {(() => {

              if (showwhat2 == 'orders') {
                return (
                  <TouchableOpacity onPress={() => setshowwhat2('')}>
                    <View style={styles.part}></View>

                    <View style={{ height: 200 }}>

                      <Text style={{ alignSelf: 'center', marginTop: 20 }}>No Orders</Text>
                    </View>
                  </TouchableOpacity>
                );
              } else if (showwhat2 == 'taxReturn') {
                return (
                  <TouchableOpacity onPress={() => setshowwhat2('')}>
                    <View style={styles.part}></View>

                    <View style={{ height: 200 }}>
                      <Text style={{ alignSelf: 'center', marginTop: 20 }}>No Tax Returns</Text>
                    </View>
                  </TouchableOpacity>
                );
              } else if (showwhat2 == 'book') {
                return (
                  <TouchableOpacity onPress={() => setshowwhat2('')}>
                    <View style={styles.part}></View>

                    <View style={{ height: 200 }}>
                      <Text style={{ alignSelf: 'center', marginTop: 20 }}>No Book Keeping</Text>
                    </View>
                  </TouchableOpacity>
                );
              } else if (showwhat2 == 'Gov') {
                return (
                  <TouchableOpacity onPress={() => setshowwhat2('')}>
                    <View style={styles.part}></View>

                    <View style={{ height: 200 }}>
                      <Text style={{ alignSelf: 'center', marginTop: 20 }}>No Gov. Payments</Text>
                    </View>
                  </TouchableOpacity>
                );
              }
            })()}

          </View>
          {/* <View style={styles.headerView}>
          <Text style={styles.header}>Plan Invoices</Text>
        </View> */}
          <Text style={{ fontSize: 19, marginLeft: 20, color: '#2F4050', fontWeight: 700, marginTop: 20 }}>Payments</Text>
          <View style={{ width: wp(95), alignSelf: 'center', height: hp(46) }}>
            {(() => {
              if (showwhat == 'Experience') {
                return (
                  <View style={styles.moblieSec1}>
                    <TouchableOpacity
                      style={[
                        styles.emailtoch1,
                        {
                          backgroundColor:
                            showwhat == 'Experience' ? Color.geen : '#fff',
                          flexDirection: 'row',
                          paddingTop: 12,

                        },
                      ]}
                      onPress={() => showwhatfunc('Experience')}>
                      <Icon
                        style={[
                          { marginRight: 5 }

                        ]}
                        name="clockcircle"
                        size={20}
                        color="#fff"
                      />
                      <Text style={showwhat == 'My Schools' ? styles.ButtonText1 : styles.ButtonTextW}>
                        Pending ({infoData.length})
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.mobiletochP,
                        {
                          backgroundColor:
                            showwhat == 'My Schools' ? Color.geen : '#fff',
                          flexDirection: 'row',
                          paddingTop: 12
                        },
                      ]}
                      onPress={() => showwhatfunc('My Schools')}>
                      <IconF
                        style={{ backgroundColor: showwhat == 'My Schools' ? 'lightgray' : Color.geen, width: wp(6), borderRadius: 15, paddingLeft: 7, height: hp(2.8), marginRight: 4, color: showwhat == 'My Schools' ? Color.geen : '#fff' }}
                        name="dollar"
                        size={20}
                        color={Color.geen}
                      />
                      <Text style={showwhat == 'My Schools' ? styles.ButtonTextW : styles.ButtonText1}>Paid (0)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.emailtoch2,
                        {
                          backgroundColor:
                            showwhat == 'Reviews' ? Color.geen : '#fff',
                          flexDirection: 'row',
                          paddingTop: 12
                        },
                      ]}
                      onPress={() => showwhatfunc('Reviews')}>
                      <Icon
                        style={[
                          { marginRight: 5 }

                        ]}
                        name="checkcircle"
                        size={18}
                        color={Color.geen}
                      />
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
                          paddingTop: 12

                        },
                      ]}
                      onPress={() => showwhatfunc('Experience')}>
                      <Icon
                        style={[
                          { marginRight: 5 }

                        ]}
                        name="clockcircle"
                        size={20}
                        color={showwhat == 'My Schools' ? Color.geen : 'lightgray'}
                      />
                      <Text style={showwhat == 'My Schools' ? styles.ButtonText1 : styles.ButtonTextW}>
                        Pending ({infoData.length})
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.mobiletochP,
                        {
                          backgroundColor:
                            showwhat == 'My Schools' ? Color.geen : '#fff',
                          flexDirection: 'row',
                          paddingTop: 12
                        },
                      ]}
                      onPress={() => showwhatfunc('My Schools')}>
                      <IconF
                        style={{ backgroundColor: showwhat == 'My Schools' ? '#fff' : '#fff', width: wp(6), borderRadius: 15, paddingLeft: 7, height: hp(2.8), marginRight: 4, color: showwhat == 'My Schools' ? Color.geen : 'lightgray' }}
                        name="dollar"
                        size={20}
                        color="#fff"
                      />
                      <Text style={showwhat == 'My Schools' ? styles.ButtonTextW : styles.ButtonText1}>Paid (0)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.emailtoch2,
                        {
                          backgroundColor:
                            showwhat == 'Reviews' ? Color.geen : '#fff',
                          flexDirection: 'row',
                          paddingTop: 12
                        },
                      ]}
                      onPress={() => showwhatfunc('Reviews')}>
                      <Icon
                        style={[
                          { marginRight: 5 }
                        ]}
                        name="checkcircle"
                        size={18}
                        color={showwhat == 'My Schools' ? Color.geen : 'lightgray'}
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
                          paddingTop: 12

                        },
                      ]}
                      onPress={() => showwhatfunc('Experience')}>
                      <Icon
                        style={[
                          { marginRight: 5 }

                        ]}
                        name="clockcircle"
                        size={20}
                        color={showwhat == 'My Schools' ? 'lightgray' : Color.geen}
                      />
                      <Text style={showwhat == 'Experience' ? styles.ButtonTextW : styles.ButtonText1}>
                        Pending ({infoData.length})
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.mobiletochP,
                        {
                          backgroundColor:
                            showwhat == 'My Schools' ? Color.geen : '#fff',
                          flexDirection: 'row',
                          paddingTop: 12
                        },
                      ]}
                      onPress={() => showwhatfunc('My Schools')}>
                      <IconF
                        style={{ backgroundColor: showwhat == 'My Schools' ? 'lightgray' : Color.geen, width: wp(6), borderRadius: 15, paddingLeft: 7, height: hp(2.8), marginRight: 4, color: showwhat == 'My Schools' ? Color.geen : '#fff' }}
                        name="dollar"
                        size={20}
                        color="#fff"
                      />
                      <Text style={showwhat == 'My Schools' ? styles.ButtonTextW : styles.ButtonText1}>Paid (0)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.emailtoch2,
                        {
                          backgroundColor:
                            showwhat == 'Reviews' ? Color.geen : '#fff',
                          flexDirection: 'row',
                          paddingTop: 12
                        },
                      ]}
                      onPress={() => showwhatfunc('Reviews')}>
                      <Icon
                        style={[
                          { marginRight: 5 }

                        ]}
                        name="checkcircle"
                        size={18}
                        color="#fff"
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

                    <ScrollView style={{ height: hp(40) ,paddingBottom:30}}>


                      <Accordion
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
                      />
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
        </ScrollView>

        {/* </ImageBackground> */}

      </View>
      <CustomBottomTab />
    </SafeAreaView>
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
    width: wp(32),
    height: 50,
    justifyContent: 'center',
    // borderRadius: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    paddingHorizontal: 20
  },
  emailtoch2: {
    //  backgroundColor: "lightgray",
    width: wp(28),
    height: 50,
    justifyContent: 'center',
    // borderRadius: 10,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20
  },
  ButtonText1: {
    color: '#000',
    textAlign: 'center',
  },
  ButtonTextW: {
    color: '#fff',
    textAlign: 'center',
  },
  mobiletochP: {
    // backgroundColor: showwhat == "My Schools" ? "#2F5597" : "lightgray",
    width: wp(30),
    height: 50,
    // borderRadius: 10,
    justifyContent: 'center',
  },
  subContainer: {
    // backgroundColor: '#fff',
    width: wp(90),
    alignSelf: 'center',
    marginTop: 20,
    // height: hp(75),

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
