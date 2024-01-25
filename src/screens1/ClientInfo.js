import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ImageBackground
} from 'react-native';
import { DataTable } from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import {
  clientInfo,
  ClientInfoList,
  client_Detail,
} from '../Redux/Actions/TaxLeaf';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Loader } from '../Component/Loader';
import { Color } from '../Style';

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
  console.log(LOGIN_DATA.staffview.user, 'Login_DataLogin_DataLogin_Data');
  // console.log(MY_INFO.guestInfo, 'CLIENT_LISTCLIENT_LISTCLIENT_LIST');
  // console.log(MY_INFO.guestInfo, 'CLIENT_LISTCLIENT_LISTCLIENT_LIST');
  //console.log(CLIENT_LIST, 'CLIENT_LISTCLIENT_LISTCLIENT_LIST');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const jsonData = MY_INFO?.guestInfo;
  //const ClinetCount = MY_INFO?.guestInfo;
  let countIndividuals = 0;
  let countBusiness = 0;
  const bgImage = require('../Assets/img/guest_shape.png');

  const [infoData, setInfoData] = useState({});
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    dispatch(clientInfo(LOGIN_DATA.staffview.user, navigation));

    setInfoData(CLIENT_LIST);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);

  useEffect(() => {
    dispatch(
      ClientInfoList(jsonData?.clientId, jsonData?.clientType, navigation),
    );
    setInfoData(CLIENT_LIST);
  }, []);

  useEffect(() => {
    // setLoader(true);
    setInfoData(CLIENT_LIST);
    // setTimeout(() => {
    //   setLoader(false);
    // }, 2000);
  }, [MY_INFO, CLIENT_LIST]);

  // console.log(infoData, 'infoDatainfoDatainfoDatainfoData');

  // infoData.forEach(item => {
  //   if (
  //     item.subClientInfo &&
  //     item.subClientInfo.subClientType === 'individual'
  //   ) {
  //     countIndividuals++;
  //   } else if (
  //     item.subClientInfo &&
  //     item.subClientInfo.subClientType === 'Business'
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

  return (
    <View style={[styles.main]}>
      <View

        style={{ backgroundColor: '#d5e3e5', height: hp(85) }}
      >
        <Loader flag={loader} />
        {/* <Text
        style={{fontSize: 28, color: '#000', marginTop: 10, marginLeft: 20}}>
        Clients
      </Text> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
            width: wp(100),
          }}>
          <View
            style={{
              width: wp(30),
              height: 50,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: Color.geen,
              justifyContent: 'center',
              backgroundColor: Color.white,
              alignItems: 'center',
            }}>
            <Text style={[styles.head]}>
              Total Clients {infoData.length}
              {/* <View style={[styles.headNum]}>
              <Text style={[styles.textNum]}>3</Text>
            </View> */}
            </Text>
          </View>
          <View
            style={{
              width: wp(30),
              height: 50,
              marginLeft: 10,
              marginRight: 10,
              justifyContent: 'center',
              borderWidth: 1,
              borderRadius: 10,
              borderColor: Color.geen,
              justifyContent: 'center',
              backgroundColor: Color.white,
              alignItems: 'center',
            }}>
            <Text style={[styles.head]}>
              Business {countBusiness}
              {/* <View style={[styles.headNum]}>
              <Text style={[styles.textNum]}>3</Text>
            </View> */}
            </Text>
          </View>
          <View
            style={{
              width: wp(30),
              height: 50,
              justifyContent: 'center',
              borderWidth: 1,
              borderRadius: 10,
              borderColor: Color.geen,
              justifyContent: 'center',
              backgroundColor: Color.white,
              alignItems: 'center',
            }}>
            <Text style={[styles.head]}>
              Individual {countIndividuals}
              {/* <View style={[styles.headNum]}>
              <Text style={[styles.textNum]}>3</Text>
            </View> */}
            </Text>
          </View>

          {/* <Text style={[styles.head]}>
          Business{' '}
          <View style={[styles.headNum1]}>
            <Text style={[styles.textNum]}>2</Text>
          </View>{' '}
          ||{' '}
        </Text>
        <Text style={[styles.head]}>
          Individual{' '}
          <View style={[styles.headNum2]}>
            <Text style={[styles.textNum]}>0</Text>
          </View>
        </Text> */}
        </View>
        <View
          style={{
            width: wp(90),
            backgroundColor: Color.geen,
            alignItems: 'center',
            alignSelf: 'center',
            elevation: 10,
            marginTop: 30,
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
            <Text style={{ color: '#fff', fontSize: 12 }}>Client ID</Text>
          </View>
          <View
            style={{
              width: wp(25),

              alignItems: 'center',
            }}>
            <Text style={{ color: '#fff', fontSize: 12 }}> Client Name</Text>
          </View>
          <View
            style={{
              width: wp(25),

              alignItems: 'center',
            }}>
            <Text style={{ color: '#fff', fontSize: 12 }}> Type</Text>
          </View>

          <View
            style={{
              width: wp(20),

              alignItems: 'center',
            }}>
            <Text style={{ color: '#fff', fontSize: 12 }}>Client</Text>
          </View>
        </View>

        <FlatList
          data={infoData}
          // numColumns={5}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => (
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
              {/* <View
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
            </View> */}
              <View
                style={{
                  width: wp(20),
                  paddingLeft: 10,
                  //  backgroundColor: 'red',
                  //   alignItems: 'center',
                }}>
                <Text
                  numberOfLines={1}
                  style={{ color: Color.darkGreen, fontSize: 10 }}>
                  {item?.subClientInfo?.subClientPracticeId}
                </Text>
              </View>
              <View
                style={{
                  width: wp(25),

                  alignItems: 'center',
                }}>
                <Text style={{ color: Color.darkGreen, fontSize: 10 }}>
                  {item?.subClientInfo?.subClientName}
                </Text>
              </View>

              <View
                style={{
                  width: wp(25),

                  alignItems: 'center',
                }}>
                <Text style={{ color: Color.darkGreen, fontSize: 10 }}>
                  {item?.subClientInfo?.subClientType}
                </Text>
              </View>

              <View
                style={{
                  width: wp(20),

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
            </View>
          )}
        />

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

  icons: {
    height: 30,
    width: 30,
    marginRight: 10,
    alignSelf: 'center',
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
  }
});
