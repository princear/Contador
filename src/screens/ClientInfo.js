import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,

  ImageBackground
} from 'react-native';
import { ScrollView } from 'react-native-virtualized-view'
import { DataTable } from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import IconF from 'react-native-vector-icons/Foundation';
import {
  clientInfo,
  ClientInfoList,
  client_Detail,
} from '../Redux/Actions/TaxLeaf';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Loader } from '../Component/Loader';
import { Color } from '../Style';
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

const ClientInfo = () => {
  const [showwhat, setshowwhat] = useState('Experience');

  const { MY_INFO } = useSelector(state => state.TaxLeafReducer);
  const { CLIENT_LIST } = useSelector(state => state.TaxLeafReducer);
  const { LOGIN_DATA } = useSelector(state => state.TaxLeafReducer);
  //console.log(LOGIN_DATA.staffview?.user, 'Login_DataLogin_DataLogin_Data');
  // console.log(MY_INFO.guestInfo, 'CLIENT_LISTCLIENT_LISTCLIENT_LIST');
  // console.log(MY_INFO.guestInfo, 'CLIENT_LISTCLIENT_LISTCLIENT_LIST');
  // console.log(CLIENT_LIST, 'CLIENT_LISTCLIENT_LISTCLIENT_LIST');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const jsonData = MY_INFO?.guestInfo;
  const staffview = MY_INFO?.staffview;
  const companyInfo = MY_INFO?.companyInfo;
  //const ClinetCount = MY_INFO?.guestInfo;
  let countIndividuals = 0;
  let countBusiness = 0;
  const bgImage = require('../Assets/img/guest_shape.png');

  const [infoData, setInfoData] = useState({});
  const [loader, setLoader] = useState(false);



  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);

        const [myInfoResponse, clientListResponse] = await Promise.all([
          dispatch(clientInfo(LOGIN_DATA, navigation)),
          dispatch(ClientInfoList(jsonData?.clientId, jsonData?.clientType, navigation)),
        ]);

        setInfoData(clientListResponse);
        setLoader(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoader(false);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   setLoader(true);
  //   dispatch(clientInfo(LOGIN_DATA, navigation));

  //   setInfoData(CLIENT_LIST);
  //   setTimeout(() => {
  //     setLoader(false);
  //   }, 2000);
  // }, []);

  // useEffect(() => {
  //   dispatch(
  //     ClientInfoList(jsonData?.clientId, jsonData?.clientType, navigation),
  //   );
  //   setInfoData(CLIENT_LIST);
  // }, []);

  useEffect(() => {
    // setLoader(true);
    setInfoData(CLIENT_LIST);
    // setTimeout(() => {
    //   setLoader(false);
    // }, 2000);
  }, [MY_INFO, CLIENT_LIST]);

  // console.log(infoData, 'infoDatainfoDatainfoDatainfoData');
  let companyCount = 0;
  let otherCount = 0;
  if (jsonData && jsonData.clientType) {
    if (jsonData.clientType === "company") {
      companyCount++;
    } else {
      otherCount++;
    }
  }


  console.log(companyCount, otherCount, 'companyCountcompanyCountcompanyCountcompanyCount')

  if (Array.isArray(infoData)) {
    // Iterate through the array using forEach
    infoData.forEach(item => {
      if (item.subClientInfo && item.subClientInfo.subClientType === 'individual') {
        countIndividuals++;
      } else if (item.subClientInfo && item.subClientInfo.subClientType === 'company') {
        countBusiness++;
      }
    });
  } else {
    // Handle the case where infoData is not an array
    console.log('infoData is not an array');
  }



  const filteredcompany = infoData && Object.values(infoData).filter(item => item.subClientInfo?.subClientType === "company");

  const filteredindividual = infoData && Object.values(infoData).filter(item => item.subClientInfo?.subClientType === "individual");

  //const filteredindividual = infoData && infoData.filter(item => item.subClientInfo.subClientType === "individual");


  // infoData.forEach(item => {
  //   if (
  //     item.subClientInfo &&
  //     item.subClientInfo.subClientType === 'individual'
  //   ) {
  //     countIndividuals++;
  //   } else if (
  //     item.subClientInfo &&
  //     item.subClientInfo.subClientType === 'company'
  //   ) {
  //     countBusiness++;
  //   }
  // });

  const showwhatfunc = data => {
    setshowwhat(data);
    console.log(data);
    // if (showwhat == 'email')
    //     setshowwhat('mobile')
    // else if (showwhat == 'mobile') {
    //     setshowwhat('email')
    // }
    // else {
    //     setshowwhat('scan')
    // }
  };

  const GetClientDetail = item => {
    console.log(item?.subClientInfo.subClientId,
      item?.subClientInfo.subClientType, 'AAAAAAAAAAAAAAAAA')

    navigation.navigate('ClientDetails', {
      clientdetail: item,
    });

    dispatch(
      client_Detail(
        item?.subClientInfo.subClientId,
        item?.subClientInfo.subClientType,
      ),
    );
  };

  const GetFileCabinetDetail = item => {
    console.log(item?.subClientInfo.subClientId,
      item?.subClientInfo.subClientType, 
      item?.subClientInfo.subClientPracticeId, 'AAAAAAAAAAAAAAAAA')

    navigation.navigate('AssoFileCabinet', {
       clientID : item?.subClientInfo.subClientId,
       clientType:  item?.subClientInfo.subClientType,
       client:  item?.subClientInfo.subClientPracticeId,
    });
  }

  const GetClientDetail1 = (item,companyInfo) => {
    navigation.navigate('MainClientDetails', {
      clientdetail: item,
      companyInfo:companyInfo
    });

    dispatch(
      client_Detail(
        item?.clientId,
        item?.clientType,
      ),
    );
  };


  const GetFileCabinetDetail1 = (item,companyInfo) => {
  //  console.log(item,'KKKKKKKK')
    console.log(item?.clientId,
      item?.clientType, 
      item?.client, 'UUUUUUUUU')

    navigation.navigate('AssoFileCabinet', {
    

      clientID : item?.clientId,
      clientType:  item?.clientType,
      client:  item?.client,
    });
  }



  return (
    <View style={[styles.main]}>
      <View

        style={{ backgroundColor: '#d5e3e5', height: hp(85) }}
      >
        <HeadTabs
          
        />
        <Loader flag={loader} />
        <View
              style={{
                width: wp(90),
                alignSelf: "center",
                // marginTop: 10,
                // marginBottom: 20,
                //  marginLeft: 20,
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
              <View
                style={{
                  width: wp(40),
                }}
              >
        <Text style={{ fontSize: 20,color: Color.headerIconBG, fontFamily: 'Poppins-Bold', }}>Clients ({infoData?.length + companyCount + otherCount})</Text>
            </View>
        <TouchableOpacity
                onPress={() => navigation.navigate('FileCabinet')}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: wp(40),
                  padding: 5,
                  alignItems:'center',
                  borderRadius: 20,
                  // marginLeft: 15,
                  // marginBottom: wp(2),
                  backgroundColor: '#fff',
                  // paddingHorizontal: 10,
                  // height: hp(6),
                //  marginTop: 4
                }}>
                <Image source={require('../Assets/img/icons/tickGreen.png')} style={{ width: 25, height: 25, alignSelf: 'center' }} />
                <Text style={[styles.client, 
                { color: '#2F4050', alignSelf: 'center', marginLeft: 5, fontFamily: 'Poppins-Bold', fontSize: 12,
                 //marginTop: 5 
                 }]}>File Cabinet</Text>
              </TouchableOpacity>
              </View>
       
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
                      {/* <Icon
                        style={[
                          { marginRight: 5 }

                        ]}
                        name="clockcircle"
                        size={20}
                        color="#fff"
                      /> */}
                       <Image
                  source={ require('../Assets/img/icons/pending.png')}
                  style={  [styles.icons,]}
                />
                    </View>

                    <Text style={showwhat == 'My Schools' ? styles.ButtonText1 : styles.ButtonTextW}>
                      Total ({infoData?.length + companyCount + otherCount})
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
                        // backgroundColor: showwhat == 'My Schools' ? 'lightgray' : Color.geen,
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

                    <Text style={showwhat == 'My Schools' ? styles.ButtonTextW : styles.ButtonText1}>Bussiness ({companyCount + countBusiness})</Text>
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
                      {/* <Icon
                        style={[
                          { marginRight: 5 }

                        ]}
                        name="checkcircle"
                        size={20}
                        color={Color.geen}
                      /> */}
                       <Image
                  source={ require('../Assets/img/icons/planicon.png')}
                  style={  [styles.icons,]}
                />
                    </View>

                    <Text style={showwhat == 'My Schools' ? styles.ButtonTextW : styles.ButtonText1}>   Individual ({countIndividuals + otherCount})</Text>
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
                      Total ({infoData?.length + companyCount + otherCount})
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
                      // backgroundColor: showwhat == 'My Schools' ? '#fff' : '#fff', 
                      // width: wp(5), borderRadius: 15, height: wp(5), marginRight: 4, 
                    
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

                    <Text style={showwhat == 'My Schools' ? styles.ButtonTextW : styles.ButtonText1}>Business ({companyCount + countBusiness})</Text>
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
                    <Text style={showwhat == 'My Schools' ? styles.ButtonText1 : styles.ButtonTextW}> Individual ({countIndividuals + otherCount})</Text>
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
                      Total ({infoData?.length + companyCount + otherCount})
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
                         alignItems: "center",
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

                    <Text style={showwhat == 'My Schools' ? styles.ButtonTextW : styles.ButtonText1}>Business ({companyCount + countBusiness})</Text>
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
                    <Text style={showwhat == 'My Schools' ? styles.ButtonText1 : styles.ButtonTextW}> Individual ({countIndividuals + otherCount})</Text>
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

                  <View
                    style={{
                      width: wp(90),
                      backgroundColor: Color.geen,
                      alignItems: 'center',
                      alignSelf: 'center',
                      elevation: 10,
                      marginTop: 10,
                      flexDirection: 'row',
                      height: wp(10),
                    }}>

                    <View
                      style={{
                        width: wp(20),

                        alignItems: 'center',
                      }}>
                      <Text style={{ color: '#fff', fontSize: 12, fontFamily: 'Poppins-SemiBold' }}>Client ID</Text>
                    </View>
                    <View
                      style={{
                        width: wp(25),

                        alignItems: 'center',
                      }}>
                      <Text style={{ color: '#fff', fontSize: 12, fontFamily: 'Poppins-SemiBold' }}> Client Name</Text>
                    </View>
                    <View
                      style={{
                        width: wp(20),

                        alignItems: 'center',
                      }}>
                      <Text style={{ color: '#fff', fontSize: 12, fontFamily: 'Poppins-SemiBold' }}> Type</Text>
                    </View>

                    <View
                      style={{
                        width: wp(10),

                        alignItems: 'center',
                      }}>
                      <Text style={{ color: '#fff', fontSize: 12, fontFamily: 'Poppins-SemiBold' }}>View</Text>
                    </View>

                    <View
                      style={{
                        width: wp(12),
                            alignItems:'flex-end',
                      }}>
                      <Text style={{ color: '#fff', fontSize: 12, fontFamily: 'Poppins-SemiBold' }}>Files</Text>
                    </View>
                  </View>
                  {/* <TouchableOpacity
                        onPress={() => GetClientDetail1(jsonData,companyInfo)}
                      >      */}
                  <TouchableOpacity
                        onPress={() => GetClientDetail1(jsonData,companyInfo)}
                    style={{
                      width: wp(90),
                      backgroundColor: Color.headerIconBG,
                      alignItems: 'center',
                      alignSelf: 'center',
                      elevation: 10,
                      marginBottom: 10,
                      flexDirection: 'row',
                      height: wp(15),
                    }}>

                    <View
                      style={{
                        width: wp(20),
                        paddingLeft: 10,
                        //  backgroundColor: 'red',
                        //   alignItems: 'center',
                      }}>
                      <Text
                        numberOfLines={1}
                        style={{ color: Color.white, fontSize: 10, fontFamily: 'Poppins-SemiBold' }}>
                        {jsonData?.client}
                      </Text>
                    </View>

                    <View
                      style={{
                        width: wp(25),

                        alignItems: 'center',
                      }}>
                      <Text style={{ color: Color.white, fontSize: 10, fontFamily: 'Poppins-SemiBold' }}>
                      {/* {companyInfo?.name} */}
                      {staffview?.firstName}  {staffview?.lastName}{staffview.length}
                      </Text>
                    </View>



                    <View
                      style={{
                        width: wp(20),

                        alignItems: 'center',
                      }}>
                      <Text style={{ color: Color.white, fontSize: 10, fontFamily: 'Poppins-SemiBold' }}>
                        {jsonData?.clientType == "company" ? "Business" : jsonData?.clientType}
                      </Text>
                    </View>

                    <View
                      style={{
                        width: wp(10),
                        alignItems: 'center',
                      }}>
                      {/* <Text style={{color: '#2F4050', fontSize: 12}}>
                {item.associationType}
              </Text> */}
                      <TouchableOpacity
                        onPress={() => GetClientDetail1(jsonData,companyInfo)}
                      >
                        <Image
                          source={require('../Assets/img/icons/view-white.png')}
                          style={{
                            width: 20,
                            height: 20,
                            alignSelf: 'center',
                            borderRadius: 50,
                            //alignSelf: 'center',
                          }}
                        />
                      
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        width: wp(12),
                        alignItems:'flex-end',
                      }}>
                      {/* <Text style={{color: '#2F4050', fontSize: 12}}>
                {item.associationType}
              </Text> */}
                      <TouchableOpacity
                        onPress={() => GetFileCabinetDetail1(jsonData,companyInfo)}
                      >
                        <Image
                          source={require('../Assets/img/icons/files-white.png')}
                          style={{
                            width: 20,
                            height: 20,
                            alignSelf: 'center',
                           // borderRadius: 50,
                            //alignSelf: 'center',
                          }}
                        />
                      
                      </TouchableOpacity>
                    </View>
                  {/* </View> */}
                  </TouchableOpacity>

                  <FlatList
                    data={infoData}
                    // numColumns={5}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity onPress={() => GetClientDetail(item)}
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
                            width: wp(20),
                            paddingLeft: 10,
                            //  backgroundColor: 'red',
                            //   alignItems: 'center',
                          }}>
                          <Text
                            numberOfLines={1}
                            style={{ color: Color.darkGreen, fontSize: 10, fontFamily: 'Poppins-SemiBold' }}>
                            {item?.subClientInfo?.subClientPracticeId}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: wp(25),

                            alignItems: 'center',
                          }}>
                          <Text style={{ color: Color.darkGreen, fontSize: 10, fontFamily: 'Poppins-SemiBold' }}>
                            {item?.subClientInfo?.subClientName}
                          </Text>
                        </View>

                        <View
                          style={{
                            width: wp(20),

                            alignItems: 'center',
                          }}>
                          <Text style={{ color: Color.darkGreen, fontSize: 10, fontFamily: 'Poppins-SemiBold' }}>
                            {item?.subClientInfo?.subClientType == "company" ? "Business" : item?.subClientInfo?.subClientType}
                          </Text>
                        </View>

                        <View
                          style={{
                            width: wp(10),

                            alignItems: 'center',
                          }}>
                          {/* <Text style={{color: '#2F4050', fontSize: 12}}>
                {item.associationType}
              </Text> */}
                          <TouchableOpacity onPress={() => GetClientDetail(item)}>
                            <Image
                              source={require('../Assets/img/icons/view.png')}
                              style={{
                                width: 20,
                                height: 20,
                                alignSelf: 'center',
                                borderRadius: 50,
                                //alignSelf: 'center',
                              }}
                            />
                          </TouchableOpacity>
                        </View>

                        <View
                          style={{
                            width: wp(12),
                            alignItems:'flex-end',
                          }}>
                          {/* <Text style={{color: '#2F4050', fontSize: 12}}>
                {item.associationType}
              </Text> */}
                          <TouchableOpacity onPress={() => GetFileCabinetDetail(item)}>
                            <Image
                              source={require('../Assets/img/icons/files-dark.png')}
                              style={{
                                width: 20,
                                height: 20,
                                alignSelf: 'center',
                              //  borderRadius: 50,
                                //alignSelf: 'center',
                              }}
                            />
                          </TouchableOpacity>
                        </View>

                     </TouchableOpacity>
                    )}
                  />
                </View>
              );
            } else if (showwhat == 'My Schools') {
              return (
                <View style={styles.subContainer}>
                  {/* <Text style={styles.subHead}>Paid Invoices (0)</Text> */}
                  <View style={styles.subContainer}>
                    {/* <Text style={styles.subHead}>
                    Pending Invoices ({infoData.length})
                    </Text> */}

                    <View
                      style={{
                        width: wp(90),
                        backgroundColor: Color.geen,
                        alignItems: 'center',
                        alignSelf: 'center',
                        elevation: 10,
                        marginTop: 10,
                        flexDirection: 'row',
                        height: wp(10),
                      }}>
                      {/* <View
          style={{
            width: wp(15),

            alignItems: 'center',
          }}>
          <Image
            source={require('../Assets/profileBlank.png')}
            style={{
              width: 30,
              height: 30,
              borderRadius: 50,
              //alignSelf: 'center',
            }}
          />
        </View> */}
                      <View
                        style={{
                          width: wp(20),

                          alignItems: 'center',
                        }}>
                        <Text style={{ color: '#fff', fontSize: 12, fontFamily: 'Poppins-SemiBold' }}>Client ID</Text>
                      </View>
                      <View
                        style={{
                          width: wp(25),

                          alignItems: 'center',
                        }}>
                        <Text style={{ color: '#fff', fontSize: 12, fontFamily: 'Poppins-SemiBold' }}> Client Name</Text>
                      </View>
                      <View
                        style={{
                          width: wp(20),

                          alignItems: 'center',
                        }}>
                        <Text style={{ color: '#fff', fontSize: 12, fontFamily: 'Poppins-SemiBold' }}> Type</Text>
                      </View>

                      <View
                        style={{
                          width: wp(10),

                          alignItems: 'center',
                        }}>
                        <Text style={{ color: '#fff', fontSize: 12, fontFamily: 'Poppins-SemiBold' }}>View</Text>
                      </View>
                      <View
                        style={{
                          width: wp(12),
                            alignItems:'flex-end',
                        }}>
                        <Text style={{ color: '#fff', fontSize: 12, fontFamily: 'Poppins-SemiBold' }}>Files</Text>
                      </View>
                    </View>

                    {jsonData?.clientType == "company" ?


                          <TouchableOpacity
                          onPress={() => GetClientDetail1(jsonData,companyInfo)}
                          style={{
                          width: wp(90),
                          backgroundColor: Color.headerIconBG,
                          alignItems: 'center',
                          alignSelf: 'center',
                          elevation: 10,
                          marginBottom: 10,
                          flexDirection: 'row',
                          height: wp(15),
                        }}>

                        <View
                          style={{
                            width: wp(20),
                            paddingLeft: 10,
                            //  backgroundColor: 'red',
                            //   alignItems: 'center',
                          }}>
                          <Text
                            numberOfLines={1}
                            style={{ color: Color.white, fontSize: 10, fontFamily: 'Poppins-SemiBold' }}>
                            {jsonData?.client}
                          </Text>
                        </View>


                        <View
                          style={{
                            width: wp(25),

                            alignItems: 'center',
                          }}>
                          <Text style={{ color: Color.white, fontSize: 10, fontFamily: 'Poppins-SemiBold' }}>
                          {companyInfo?.name}  
                            {/* {staffview?.firstName}  {staffview?.lastName}{staffview.length} */}
                          </Text>
                        </View>

                        <View
                          style={{
                            width: wp(20),

                            alignItems: 'center',
                          }}>
                          <Text style={{ color: Color.white, fontSize: 10, fontFamily: 'Poppins-SemiBold' }}>
                            {jsonData?.clientType == "company" ? "Business" : jsonData?.clientType}
                          </Text>
                        </View>

                        <View
                          style={{
                            width: wp(10),
                            alignItems: 'center',
                          }}>

                          <TouchableOpacity
                            onPress={() => GetClientDetail1(jsonData,companyInfo)}
                          >
                            <Image
                              source={require('../Assets/img/icons/view-white.png')}
                              style={{
                                width: 20,
                                height: 20,
                                alignSelf: 'center',
                                borderRadius: 50,
                                //alignSelf: 'center',
                              }}
                            />
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            width: wp(12),
                            alignItems:'flex-end',
                           
                          }}>

                          <TouchableOpacity
                            onPress={() => GetFileCabinetDetail1(jsonData,companyInfo)}
                          >
                            <Image
                              source={require('../Assets/img/icons/files-white.png')}
                              style={{
                                width: 20,
                                height: 20,
                                alignSelf: 'center',
                               // borderRadius: 50,
                                //alignSelf: 'center',
                              }}
                            />
                          </TouchableOpacity>
                        </View>
                    </TouchableOpacity>


                      :
                      null


                    }



                    <FlatList
                      data={filteredcompany}
                      // numColumns={5}
                      keyExtractor={(item, index) => index}
                      renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => GetClientDetail(item)}
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
                              width: wp(20),
                              paddingLeft: 10,
                              //  backgroundColor: 'red',
                              //   alignItems: 'center',
                            }}>
                            <Text
                              numberOfLines={1}
                              style={{ color: Color.darkGreen, fontSize: 10, fontFamily: 'Poppins-SemiBold' }}>
                              {item?.subClientInfo?.subClientPracticeId}
                            </Text>
                          </View>
                          <View
                            style={{
                              width: wp(25),

                              alignItems: 'center',
                            }}>
                            <Text style={{ color: Color.darkGreen, fontSize: 10, fontFamily: 'Poppins-SemiBold' }}>
                              {item?.subClientInfo?.subClientName}
                            </Text>
                          </View>

                          <View
                            style={{
                              width: wp(20),

                              alignItems: 'center',
                            }}>
                            <Text style={{ color: Color.darkGreen, fontSize: 10, fontFamily: 'Poppins-SemiBold' }}>
                              {item?.subClientInfo?.subClientType == "company" ? "Business" : item?.subClientInfo?.subClientType}
                            </Text>
                          </View>

                          <View
                            style={{
                              width: wp(10),

                              alignItems: 'center',
                            }}>
                            {/* <Text style={{color: '#2F4050', fontSize: 12}}>
                {item.associationType}
              </Text> */}
                            <TouchableOpacity onPress={() => GetClientDetail(item)}>
                              <Image
                                source={require('../Assets/img/icons/view.png')}
                                style={{
                                  width: 20,
                                  height: 20,
                                  alignSelf: 'center',
                                  borderRadius: 50,
                                  //alignSelf: 'center',
                                }}
                              />
                            </TouchableOpacity>
                          </View>
                          <View
                            style={{
                              width: wp(12),
                            alignItems:'flex-end',
                            }}>
                            {/* <Text style={{color: '#2F4050', fontSize: 12}}>
                {item.associationType}
              </Text> */}
                            <TouchableOpacity onPress={() => GetFileCabinetDetail(item)}>
                              <Image
                                source={require('../Assets/img/icons/files-dark.png')}
                                style={{
                                  width: 20,
                                  height: 20,
                                  alignSelf: 'center',
                                  borderRadius: 50,
                                  //alignSelf: 'center',
                                }}
                              />
                            </TouchableOpacity>
                          </View>
                      </TouchableOpacity>
                      )}
                    />
                  </View>
                  {/* <Text style={{ textAlign: 'center', fontFamily: 'Poppins-SemiBold' }}>No Data FoundB</Text> */}
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
                  <View style={styles.subContainer}>
                    {/* <Text style={styles.subHead}>
                    Pending Invoices ({infoData.length})
                    </Text> */}

                    <View
                      style={{
                        width: wp(90),
                        backgroundColor: Color.geen,
                        alignItems: 'center',
                        alignSelf: 'center',
                        elevation: 10,
                        marginTop: 10,
                        flexDirection: 'row',
                        height: wp(10),
                      }}>
                      {/* <View
          style={{
            width: wp(15),

            alignItems: 'center',
          }}>
          <Image
            source={require('../Assets/profileBlank.png')}
            style={{
              width: 30,
              height: 30,
              borderRadius: 50,
              //alignSelf: 'center',
            }}
          />
        </View> */}
                      <View
                        style={{
                          width: wp(20),

                          alignItems: 'center',
                        }}>
                        <Text style={{ color: '#fff', fontSize: 12, fontFamily: 'Poppins-SemiBold' }}>Client ID</Text>
                      </View>
                      <View
                        style={{
                          width: wp(25),

                          alignItems: 'center',
                        }}>
                        <Text style={{ color: '#fff', fontSize: 12, fontFamily: 'Poppins-SemiBold' }}> Client Name</Text>
                      </View>
                      <View
                        style={{
                          width: wp(20),

                          alignItems: 'center',
                        }}>
                        <Text style={{ color: '#fff', fontSize: 12, fontFamily: 'Poppins-SemiBold' }}> Type</Text>
                      </View>

                      <View
                        style={{
                          width: wp(10),

                          alignItems: 'center',
                        }}>
                        <Text style={{ color: '#fff', fontSize: 12, fontFamily: 'Poppins-SemiBold' }}>View</Text>
                      </View>
                      <View
                        style={{
                          width: wp(12),
                          alignItems:'flex-end',
                        }}>
                        <Text style={{ color: '#fff', fontSize: 12, fontFamily: 'Poppins-SemiBold' }}>Files</Text>
                      </View>
                      
                    </View>

                    {jsonData?.clientType == "individual" ?


                        <TouchableOpacity
                        onPress={() => GetClientDetail1(jsonData,companyInfo)}
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
                            width: wp(20),
                            paddingLeft: 10,
                            //  backgroundColor: 'red',
                            //   alignItems: 'center',
                          }}>
                          <Text
                            numberOfLines={1}
                            style={{ color: Color.darkGreen, fontSize: 10, fontFamily: 'Poppins-SemiBold' }}>
                            {jsonData?.client}
                          </Text>
                        </View>


                        <View
                          style={{
                            width: wp(25),

                            alignItems: 'center',
                          }}>
                          <Text style={{ color: Color.darkGreen, fontSize: 10, fontFamily: 'Poppins-SemiBold' }}>
                            {staffview?.firstName}  {staffview?.lastName}{staffview.length}
                          </Text>
                        </View>

                        <View
                          style={{
                            width: wp(20),

                            alignItems: 'center',
                          }}>
                          <Text style={{ color: Color.darkGreen, fontSize: 10, fontFamily: 'Poppins-SemiBold' }}>
                            {jsonData?.clientType == "company" ? "Business" : jsonData?.clientType}
                          </Text>
                        </View>

                        <View
                          style={{
                            width: wp(10),
                            alignItems: 'center',
                          }}>

                          <TouchableOpacity
                            onPress={() => GetClientDetail1(jsonData,companyInfo)}
                          >
                            <Image
                              source={require('../Assets/img/icons/view.png')}
                              style={{
                                width: 20,
                                height: 20,
                                alignSelf: 'center',
                                borderRadius: 50,
                                //alignSelf: 'center',
                              }}
                            />
                          </TouchableOpacity>
                        </View>

                        <View
                          style={{
                            width: wp(12),
                            alignItems:'flex-end',
                          }}>

                          <TouchableOpacity
                            onPress={() => GetFileCabinetDetail1(jsonData,companyInfo)}
                          >
                            <Image
                              source={require('../Assets/img/icons/files-dark.png')}
                              style={{
                                width: 20,
                                height: 20,
                                alignSelf: 'center',
                               // borderRadius: 50,
                                //alignSelf: 'center',
                              }}
                            />
                          </TouchableOpacity>
                        </View>
                    </TouchableOpacity>


                      :
                      null


                    }


                    <FlatList
                      data={filteredindividual}
                      // numColumns={5}
                      keyExtractor={(item, index) => index}
                      renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => GetClientDetail(item)}
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
                              width: wp(20),
                              paddingLeft: 10,
                              //  backgroundColor: 'red',
                              //   alignItems: 'center',
                            }}>
                            <Text
                              numberOfLines={1}
                              style={{ color: Color.darkGreen, fontSize: 10, fontFamily: 'Poppins-SemiBold' }}>
                              {item?.subClientInfo?.subClientPracticeId}
                            </Text>
                          </View>
                          <View
                            style={{
                              width: wp(25),

                              alignItems: 'center',
                            }}>
                            <Text style={{ color: Color.darkGreen, fontSize: 10, fontFamily: 'Poppins-SemiBold' }}>
                              {item?.subClientInfo?.subClientName}
                            </Text>
                          </View>

                          <View
                            style={{
                              width: wp(20),

                              alignItems: 'center',
                            }}>
                            <Text style={{ color: Color.darkGreen, fontSize: 10, fontFamily: 'Poppins-SemiBold' }}>
                              {item?.subClientInfo?.subClientType == "company" ? "Business" : item?.subClientInfo?.subClientType}
                            </Text>
                          </View>

                          <View
                            style={{
                              width: wp(10),

                              alignItems: 'center',
                            }}>
                            {/* <Text style={{color: '#2F4050', fontSize: 12}}>
                {item.associationType}
              </Text> */}
                            <TouchableOpacity onPress={() => GetClientDetail(item)}>
                              <Image
                                source={require('../Assets/img/icons/view.png')}
                                style={{
                                  width: 20,
                                  height: 20,
                                  alignSelf: 'center',
                                  borderRadius: 50,
                                  //alignSelf: 'center',
                                }}
                              />
                            </TouchableOpacity>
                          </View>

                          <View
                            style={{
                              width: wp(12),
                              alignItems:'flex-end',
                             // backgroundColor:"red"
                            }}>
                            {/* <Text style={{color: '#2F4050', fontSize: 12}}>
                {item.associationType}
              </Text> */}
                            <TouchableOpacity onPress={() => GetFileCabinetDetail(item)}>
                              <Image
                                source={require('../Assets/img/icons/files-dark.png')}
                                style={{
                                  width: 20,
                                  height: 20,
                                  alignSelf: 'center',
                                //  borderRadius: 50,
                                  //alignSelf: 'center',
                                }}
                              />
                            </TouchableOpacity>
                          </View>
                      </TouchableOpacity>
                      )}
                    />
                  </View>
                  {/* <Text style={{ textAlign: 'center' }}>No Data FoundI</Text> */}
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




        {/* {(() => {
        if (showwhat == 'Experience') {
          return (
            <View style={styles.moblieSec}>
              <TouchableOpacity
                style={[
                  styles.emailtoch,
                  {
                    backgroundColor:
                      showwhat == 'Experience' ? '#2F5597' : 'lightgray',
                  },
                ]}
                onPress={() => showwhatfunc('Experience')}>
                <Text style={styles.ButtonText}>Total Clients</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.mobiletoch,
                  {
                    backgroundColor:
                      showwhat == 'My Schools' ? '#2F5597' : 'lightgray',
                  },
                ]}
                onPress={() => showwhatfunc('My Schools')}>
                <Text style={styles.ButtonText}>Business</Text>
              </TouchableOpacity>
            </View>
          );
        }

        if (showwhat == 'Bussiness') {
          return (
            <View style={styles.moblieSec}>
              <TouchableOpacity
                style={[
                  styles.emailtoch,
                  {
                    backgroundColor:
                      showwhat == 'Bussiness' ? '#2F5597' : 'lightgray',
                  },
                ]}
                onPress={() => showwhatfunc('Bussiness')}>
                <Text style={styles.ButtonText}>Total Clients</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.mobiletoch,
                  {
                    backgroundColor:
                      showwhat == 'My Schools' ? '#2F5597' : 'lightgray',
                  },
                ]}
                onPress={() => showwhatfunc('My Schools')}>
                <Text style={styles.ButtonText}>Business</Text>
              </TouchableOpacity>
            </View>
          );
        } else {
          return (
            <View style={styles.moblieSec}>
              <TouchableOpacity
                style={[
                  styles.emailtoch,
                  {
                    backgroundColor:
                      showwhat == 'Experience' ? '#2F5597' : 'lightgray',
                  },
                ]}
                onPress={() => showwhatfunc('Experience')}>
                <Text style={styles.ButtonText}>My Info</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.mobiletoch,
                  {
                    backgroundColor:
                      showwhat == 'My Schools' ? '#2F5597' : 'lightgray',
                  },
                ]}
                onPress={() => showwhatfunc('My Schools')}>
                <Text style={styles.ButtonText}>Client Info</Text>
              </TouchableOpacity>
            </View>
          );
        }
      })()} */}

        {/* {(() => {
        if (showwhat == 'Experience') {
          return (
            <View
              style={{
                backgroundColor: '#fff',
                padding: 20,
                opacity: 2,
                borderRadius: 10,
                marginLeft: 20,
                marginTop: 20,
              }}>
              <View style={{textAlign: 'center'}}>
                <Image
                  source={require('../Assets/profileBlank.png')}
                  style={{width: '100%', height: 160}}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#000',
                    marginBottom: 10,
                  }}>
                  Prince Eastsons
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: '#e1f7f7',
                  padding: 10,
                  borderRadius: 10,
                }}>
                <View
                  style={{
                    height: 40,
                    backgroundColor: '#fff',
                    marginTop: 10,
                    padding: 10,
                  }}>
                  <Text style={styles.LIstText2}>
                    <Text style={{fontSize: 15, fontWeight: '600'}}>
                      Date Of Birth:
                    </Text>{' '}
                    12-09-1990
                  </Text>
                </View>
                <View style={{height: 40, marginTop: 10, padding: 10}}>
                  <Text style={styles.LIstText2}>
                    <Text style={{fontSize: 15, fontWeight: '600'}}>
                      Office:
                    </Text>{' '}
                    Noida
                  </Text>
                </View>
                <View
                  style={{
                    height: 40,
                    backgroundColor: '#fff',
                    marginTop: 10,
                    padding: 10,
                  }}>
                  <Text style={styles.LIstText2}>
                    <Text style={{fontSize: 15, fontWeight: '600'}}>
                      Department:
                    </Text>{' '}
                    IT
                  </Text>
                </View>
                <View style={{height: 40, marginTop: 10, padding: 10}}>
                  <Text style={styles.LIstText2}>
                    <Text style={{fontSize: 15, fontWeight: '600'}}>
                      Contact Info:
                    </Text>{' '}
                    9865478934
                  </Text>
                </View>
                <View
                  style={{
                    height: 40,
                    backgroundColor: '#fff',
                    marginTop: 10,
                    padding: 10,
                  }}>
                  <Text style={styles.LIstText2}>
                    <Text style={{fontSize: 15, fontWeight: '600'}}>
                      CellPhone:
                    </Text>{' '}
                    +1 378498
                  </Text>
                </View>
                <View style={{height: 40, marginTop: 10, padding: 10}}>
                  <Text style={styles.LIstText2}>
                    <Text style={{fontSize: 15, fontWeight: '600'}}>
                      Extensions:
                    </Text>{' '}
                    +91
                  </Text>
                </View>
                <View
                  style={{
                    height: 40,
                    marginTop: 10,
                    backgroundColor: '#fff',
                    padding: 10,
                  }}>
                  <Text style={styles.LIstText2}>
                    <Text style={{fontSize: 15, fontWeight: '600'}}>
                      Social Security Number:
                    </Text>{' '}
                    7532684
                  </Text>
                </View>
                <View style={{height: 40, marginTop: 10, padding: 10}}>
                  <Text style={styles.LIstText2}>
                    <Text style={{fontSize: 15, fontWeight: '600'}}>
                      Username:
                    </Text>{' '}
                    prince@eastsons.com
                  </Text>
                </View>
                <View
                  style={{
                    height: 40,
                    marginTop: 10,
                    backgroundColor: '#fff',
                    padding: 10,
                  }}>
                  <Text style={styles.LIstText2}>
                    <Text style={{fontSize: 15, fontWeight: '600'}}>
                      Time Of Expiration:
                    </Text>{' '}
                    2023-10-06
                  </Text>
                </View>
                <View style={{height: 40, marginTop: 10, padding: 10}}>
                  <Text style={styles.LIstText2}>
                    <Text style={{fontSize: 15, fontWeight: '600'}}>
                      Status:
                    </Text>{' '}
                    Active
                  </Text>
                </View>
                <View
                  style={{
                    height: 40,
                    marginTop: 10,
                    backgroundColor: '#fff',
                    padding: 10,
                  }}>
                  <Text style={styles.LIstText2}>
                    <Text style={{fontSize: 15, fontWeight: '600'}}>Type:</Text>{' '}
                    Prince
                  </Text>
                </View>
              </View>
            </View>
          );
        } else { */}
        {/* return ( */}
        <ScrollView></ScrollView>
        {/* //       );
        // }
    //   })()} */}
      </View>
    </View>
  );
};

export default ClientInfo;
const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
    padding: 15,
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
  },
  head: {
    fontSize: 14,
    color: Color.geen,
  },
  headNum: {
    backgroundColor: 'skyblue',
    borderRadius: 30,
    width: 25,
    height: 25,
    marginTop: 5,
  },
  headNum1: {
    backgroundColor: 'pink',
    borderRadius: 30,
    width: 25,
    height: 25,
    marginTop: 5,
  },
  headNum2: {
    backgroundColor: 'yellow',
    borderRadius: 30,
    width: 25,
    height: 25,
    marginTop: 5,
  },
  textNum: {
    // justifyContent: 'center',
    textAlign: 'center',
    color: '#fff',
    marginTop: 3,
  },
  LIstText: {
    marginLeft: 5,
    fontSize: 13,
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
  },
  LIstText2: {
    fontSize: 14,
    fontFamily: 'Poppins-BoldItalic',
    color: 'black',
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '300',
    marginBottom: 20,
    color: '#000',
  },
  header: {
    backgroundColor: 'purple',
    padding: 10,
    color: '#000',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
    color: '#000',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
    color: '#000',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
    color: '#000',
  },

  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    color: '#000',
    backgroundColor: 'red',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
    color: '#000',
  },
  activeSelector: {
    fontWeight: 'bold',
    color: '#000',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
    textAlign: 'center',
    color: '#000',
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  subContainer: {
    //backgroundColor: 'red',
    width: wp(90),
    alignSelf: 'center',
    // marginTop: 20,
    alignItems: 'center',
    height: wp(80),
    //borderRadius: 20,
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },

  Headers: {
    height: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    width: 100,
  },

  icons:{
    alignSelf: 'center',
    height:15,
    resizeMode:'contain',
    width:15,
    marginRight:5
 
  },
  Bookicons: {
    height: 30,
    width: 30,
    // marginRight: 10,
    alignSelf: 'center',
  },
  Locationicons: {
    height: 20,
    width: 20,
    // marginRight: 10,
    alignSelf: 'center',
  },

  cardCenter: {
    // borderWidth: 0.2,
    height: 210,
    width: '60%',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 50,
    // elevation:2
  },
  shadowPropCenter: {
    shadowOffset: { width: 8, height: 10 },
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  threeDotContainer: {
    height: 40,
    width: 40,
    backgroundColor: '#2F5597',
    alignSelf: 'flex-end',
    marginHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  threeDoticons: {
    height: 30,
    width: 30,
    alignSelf: 'center',
  },

  leftImageWrapper: {
    width: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    height: 50,
    width: '33%',
    justifyContent: 'center',
    alignItems: 'center',
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
  moblieSec: {
    backgroundColor: 'lightgrey',
    // height: 20,
    borderRadius: 50,
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 20,
    // marginBottom: 30,
    width: wp(90),
    marginLeft: 20,
    flexDirection: 'row',
    // alignSelf: "center",
  },
  emailtoch: {
    //  backgroundColor: "lightgray",
    width: wp(30),
    height: 40,
    justifyContent: 'center',
    borderRadius: 30,
  },
  ButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  mobiletoch: {
    // backgroundColor: showwhat == "My Schools" ? "#2F5597" : "lightgray",
    width: wp(45),
    height: 40,
    borderRadius: 30,
    justifyContent: 'center',
  },
  searchSection: {
    justifyContent: 'space-between',
    paddingBottom: 12,
    alignSelf: 'center',
    marginTop: 5,
  },
  TextInputText: {
    color: '#fff',
    // fontFamily: 'SharpSansDispNo1-Book',
    fontSize: 14,
    lineHeight: 16,
    paddingBottom: 8,
    backgroundColor: '#067FD0',
    width: 300,
    marginBottom: 5,
    padding: 10,
    borderRadius: 10,
  },
  bgImg: {
    height: hp(85)
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
});
