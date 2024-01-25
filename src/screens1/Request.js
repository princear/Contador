import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Button,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ImageBackground,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useIsFocused, useNavigation } from '@react-navigation/native';
let iconm = require('../Assets/img/icons/msg.png');
let iconmw = require('../Assets/img/icons/msg-white.png');
let iconP = require('../Assets/img/icons/agreement.png');
let iconS = require('../Assets/img/icons/proposal.png');
let iconR = require('../Assets/img/icons/reminder.png');
let iconC = require('../Assets/img/icons/checklist.png');
let iconE = require('../Assets/img/icons/error.png');
import { Color } from '../Style';
import { RequestInfoList } from '../Redux/Actions/TaxLeaf';
import { Loader } from '../Component/Loader';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Icon from 'react-native-vector-icons/AntDesign';

const Request = () => {
  const [showwhat, setshowwhat] = useState('Experience');
  const [showwhat1, setshowwhat1] = useState('Message');
  const bgImage = require('../Assets/img/guest_shape.png');
  const [requestInfoData, setRequestInfoData] = useState({});
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const { REQUEST_INFO } = useSelector(state => state.TaxLeafReducer);
  const { MY_INFO } = useSelector(state => state.TaxLeafReducer);

  const jsonData = MY_INFO.guestInfo;

  const showwhatfunc = data => {
    setshowwhat(data);
    console.log(data);
  };
  const showwhatfunc1 = data => {
    setshowwhat1(data);
    console.log(data);
  };
  console.log(REQUEST_INFO, 'REQUEST_INFO')
  useEffect(() => {
    setLoader(true);
    dispatch(RequestInfoList(jsonData?.clientId, navigation));

    setRequestInfoData(REQUEST_INFO?.requestInfoListModel);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);



  //console.log(requestInfoData, 'requestInfoData')
  return (
    <SafeAreaView>
      <Loader flag={loader} />

      <View>
        {/* <View style={styles.headerView}>
          <Text style={styles.header}>Requests</Text>
        </View> */}
        <View

          style={{ backgroundColor: '#d5e3e5' }}
        >
          <View
            style={{
              width: '40%',
              alignSelf: 'flex-start',
              // marginTop: 10,
              // marginBottom: 20,
              marginLeft: 20,
            }}>

            {/* <Button
            title="+ New Request"
            color="#2F4050"

            // onPress={() => setModalVisible(true)}
          /> */}
          </View>
          {/* <ImageBackground source={bgImage} 
        //style={styles.bgImg}
        > */}
          <View style={styles.mainTab}>
            {(() => {
              if (showwhat1 == 'Message') {
                return (
                  // <View style={styles.moblieSec}>
                  <View style={styles.MessageContainer}>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: wp(40),
                        justifyContent: 'flex-start',
                        marginBottom: 20,
                      }}>
                      <TouchableOpacity
                        style={[
                          styles.emailtoch,
                          {
                            backgroundColor:
                              showwhat1 == 'Message' ? '#2F4050' : 'lightgray',
                          },
                        ]}
                        onPress={() => showwhatfunc1('Message')}>
                        <View
                          style={{
                            width: 35,
                            height: 35,
                            justifyContent: 'center',
                            borderWidth: 1,
                            borderRadius: 50,
                            borderColor: '#fff',
                            alignSelf: 'center',
                          }}>
                          <Image
                            source={iconmw}
                            style={{
                              width: 20,
                              height: 20,

                              borderColor: '#fff',
                              alignSelf: 'center',
                            }}
                          />
                        </View>

                        <Text style={styles.DarkButtonText}>Message</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        disabled={true}
                        style={[
                          styles.mobiletoch,
                          {
                            backgroundColor:
                              showwhat1 == 'Proposal' ? '#2F5597' : '',
                          },
                        ]}
                        onPress={() => showwhatfunc1('Proposal')}>
                        <View
                          style={{
                            width: 35,
                            height: 35,
                            justifyContent: 'center',
                            borderWidth: 1,
                            borderRadius: 50,
                            borderColor: '#2F4050',
                            alignSelf: 'center',
                          }}>
                          <Image
                            source={iconP}
                            style={{
                              width: 20,
                              height: 20,

                              borderColor: '#fff',
                              alignSelf: 'center',
                            }}
                          />
                        </View>
                        <Text style={styles.ButtonText}>Proposal</Text>
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        width: wp(40),
                        justifyContent: 'flex-end',
                        // backgroundColor: 'yellow',
                        marginBottom: 20,
                      }}>
                      <TouchableOpacity
                        disabled={true}
                        style={[
                          styles.mobiletoch,
                          {
                            backgroundColor:
                              showwhat1 == 'Signature' ? '#2F5597' : '',
                            marginBottom: 10,
                            marginRight: wp(3),
                            //marginLeft: 10,
                          },
                        ]}
                        onPress={() => showwhatfunc1('Signature')}>
                        <View
                          style={{
                            width: 35,
                            height: 35,
                            justifyContent: 'center',
                            borderWidth: 1,
                            borderRadius: 50,
                            borderColor: '#2F4050',
                            alignSelf: 'center',
                          }}>
                          <Image
                            source={iconS}
                            style={{
                              width: 20,
                              height: 20,

                              borderColor: '#fff',
                              alignSelf: 'center',
                            }}
                          />
                        </View>
                        <Text style={styles.ButtonText}>Signature</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        disabled={true}
                        style={[
                          styles.mobiletoch,
                          {
                            backgroundColor:
                              showwhat1 == 'Reminders' ? '#2F5597' : '',
                          },
                        ]}
                        onPress={() => showwhatfunc1('Reminders')}>
                        <View
                          style={{
                            width: 35,
                            height: 35,
                            justifyContent: 'center',
                            borderWidth: 1,
                            borderRadius: 50,
                            borderColor: '#2F4050',
                            alignSelf: 'center',
                          }}>
                          <Image
                            source={iconR}
                            style={{
                              width: 20,
                              height: 20,

                              borderColor: '#fff',
                              alignSelf: 'center',
                            }}
                          />
                        </View>
                        <Text style={styles.ButtonText}>Reminders</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              } else if (showwhat1 == 'Proposal') {
                return (
                  <View style={styles.moblieSec}>
                    <TouchableOpacity
                      style={[
                        styles.emailtoch,
                        {
                          backgroundColor:
                            showwhat1 == 'Message' ? '#2F5597' : 'lightgray',
                        },
                      ]}
                      onPress={() => showwhatfunc1('Message')}>
                      <Text style={styles.ButtonText}>Message</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch,
                        {
                          backgroundColor:
                            showwhat1 == 'Proposal' ? '#2F5597' : 'lightgray',
                        },
                      ]}
                      onPress={() => showwhatfunc1('Proposal')}>
                      <Text style={styles.ButtonText}>Proposal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch,
                        {
                          backgroundColor:
                            showwhat1 == 'Signature' ? '#2F5597' : 'lightgray',
                        },
                      ]}
                      onPress={() => showwhatfunc1('Signature')}>
                      <Text style={styles.ButtonText}>Signature Requests</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch,
                        {
                          backgroundColor:
                            showwhat1 == 'Reminders' ? '#2F5597' : 'lightgray',
                        },
                      ]}
                      onPress={() => showwhatfunc1('Reminders')}>
                      <Text style={styles.ButtonText}>Reminders</Text>
                    </TouchableOpacity>
                  </View>
                );
              } else if (showwhat1 == 'Signature') {
                return (
                  <View style={styles.moblieSec}>
                    <TouchableOpacity
                      style={[
                        styles.emailtoch,
                        {
                          backgroundColor:
                            showwhat1 == 'Message' ? '#2F5597' : 'lightgray',
                        },
                      ]}
                      onPress={() => showwhatfunc1('Message')}>
                      <Text style={styles.ButtonText}>Message</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch,
                        {
                          backgroundColor:
                            showwhat1 == 'Proposal' ? '#2F5597' : 'lightgray',
                        },
                      ]}
                      onPress={() => showwhatfunc1('Proposal')}>
                      <Text style={styles.ButtonText}>Proposal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch,
                        {
                          backgroundColor:
                            showwhat1 == 'Signature' ? '#2F5597' : 'lightgray',
                        },
                      ]}
                      onPress={() => showwhatfunc1('Signature')}>
                      <Text style={styles.ButtonText}>Signature Requests</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch,
                        {
                          backgroundColor:
                            showwhat1 == 'Reminders' ? '#2F5597' : 'lightgray',
                        },
                      ]}
                      onPress={() => showwhatfunc1('Reminders')}>
                      <Text style={styles.ButtonText}>Reminders</Text>
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
                            showwhat1 == 'Message' ? '#2F5597' : 'lightgray',
                        },
                      ]}
                      onPress={() => showwhatfunc1('Message')}>
                      <Text style={styles.ButtonText}>Message</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch,
                        {
                          backgroundColor:
                            showwhat1 == 'Proposal' ? '#2F5597' : 'lightgray',
                        },
                      ]}
                      onPress={() => showwhatfunc1('Proposal')}>
                      <Text style={styles.ButtonText}>Proposal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch,
                        {
                          backgroundColor:
                            showwhat1 == 'Signature' ? '#2F5597' : 'lightgray',
                        },
                      ]}
                      onPress={() => showwhatfunc1('Signature')}>
                      <Text style={styles.ButtonText}>Signature Requests</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch,
                        {
                          backgroundColor:
                            showwhat1 == 'Reminders' ? '#2F5597' : 'lightgray',
                        },
                      ]}
                      onPress={() => showwhatfunc1('Reminders')}>
                      <Text style={styles.ButtonText}>Reminders</Text>
                    </TouchableOpacity>
                  </View>
                );
              }
            })()}
          </View>

          <View style={[styles.mainTab, { marginBottom: 10 }]}>
            <View style={{ width: wp(55), height: hp(10) }}>
              {(() => {
                if (showwhat == 'Experience') {
                  return (
                    <View style={styles.moblieSec}>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: wp(90),
                          // justifyContent: 'space-between',
                          marginBottom: 20,
                        }}>
                        <TouchableOpacity
                          style={[
                            styles.emailtoch,
                            // {
                            //   backgroundColor:
                            //     showwhat == 'Experience' ? '#2F4050' : 'lightgray',
                            // },
                          ]}
                          onPress={() => showwhatfunc('Experience')}>
                          <View
                            style={{
                              width: 35,
                              height: 35,
                              justifyContent: 'center',
                              borderWidth: 1,
                              borderRadius: 50,
                              borderColor: '#2F4050',
                              alignSelf: 'center',
                            }}>
                            <Image
                              source={iconC}
                              style={{
                                width: 20,
                                height: 20,

                                borderColor: '#fff',
                                alignSelf: 'center',
                              }}
                            />
                          </View>
                          <Text style={styles.ButtonText}>Incomplete (0)</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.mobiletoch,
                            // {
                            //   backgroundColor:
                            //     showwhat == 'My Schools' ? '#2F5597' : '',
                            // },
                          ]}
                          onPress={() => showwhatfunc('My Schools')}>
                          <View
                            style={{
                              width: 35,
                              height: 35,
                              justifyContent: 'center',
                              borderWidth: 1,
                              borderRadius: 50,
                              borderColor: '#2F4050',
                              alignSelf: 'center',
                            }}>
                            <Image
                              source={iconE}
                              style={{
                                width: 20,
                                height: 20,
                                borderColor: '#fff',
                                alignSelf: 'center',
                              }}
                            />
                          </View>
                          <Text style={styles.ButtonText}>Complete (0)</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                } else if (showwhat == 'My Schools') {
                  return (
                    <View style={styles.moblieSec}>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: wp(90),
                          // justifyContent: 'space-between',
                          marginBottom: 20,
                        }}>
                        <TouchableOpacity
                          style={[
                            styles.emailtoch,
                            // {
                            //   backgroundColor: showwhat == 'My Schools' ? '' : '',
                            // },
                          ]}
                          onPress={() => showwhatfunc('Experience')}>
                          <View
                            style={{
                              width: 35,
                              height: 35,
                              justifyContent: 'center',
                              borderWidth: 1,
                              borderRadius: 50,
                              borderColor: '#2F4050',
                              alignSelf: 'center',
                            }}>
                            <Image
                              source={iconS}
                              style={{
                                width: 20,
                                height: 20,

                                borderColor: '#fff',
                                alignSelf: 'center',
                              }}
                            />
                          </View>
                          <Text style={styles.ButtonText}>Incomplete(0)</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.mobiletoch,
                            // {
                            //   backgroundColor:
                            //     showwhat == 'My Schools' ? '#2F4050' : 'lightgray',
                            //   borderRadius: 10,
                            // },
                          ]}
                          onPress={() => showwhatfunc('My Schools')}>
                          <View
                            style={{
                              width: 35,
                              height: 35,
                              justifyContent: 'center',
                              borderWidth: 1,
                              borderRadius: 50,
                              borderColor: '#2F4050',
                              alignSelf: 'center',
                            }}>
                            <Image
                              source={iconS}
                              style={{
                                width: 20,
                                height: 20,

                                borderColor: '#fff',
                                alignSelf: 'center',
                              }}
                            />
                          </View>

                          <Text style={styles.ButtonText}>Complete (0)</Text>
                        </TouchableOpacity>
                      </View>
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
                              showwhat == 'Experience' ? '#2F5597' : '',
                          },
                        ]}
                        onPress={() => showwhatfunc('Experience')}>
                        <Text style={styles.ButtonText}>Incomplete ({requestInfoData.length})</Text>
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
                        <Text style={styles.ButtonText}>Complete (0)</Text>
                      </TouchableOpacity>
                    </View>
                  );
                }
              })()}
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('CreateNewAction')}
              // onPress={() => setModalVisible(true)}
              style={{
                flexDirection: 'row',
                width: wp(35),
                // justifyContent: 'center',
                borderWidth: 1,
                borderRadius: 10,
                marginTop: 5,
                height: hp(6),
                padding: 5,
              }}>
              <View
                style={{
                  width: 35,
                  height: 35,
                  justifyContent: 'center',
                  // borderWidth: 1,
                  borderRadius: 50,
                  borderColor: '#2F4050',
                  // alignSelf: 'center',
                }}>
                <Image
                  source={iconm}
                  style={{
                    width: 20,
                    height: 20,

                    borderColor: '#fff',
                    alignSelf: 'center',
                  }}
                />
              </View>
              <Text style={styles.newRText}>New Request</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.subContainer}>

            {(() => {
              if (showwhat == 'Experience') {
                return (
                  <>
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
                          width: wp(25),

                          alignItems: 'center',
                        }}>
                        <Text style={{ color: Color.darkGreen, fontSize: 14, fontWeight: '600' }}>
                          Action Id
                        </Text>
                      </View>

                      {/* <View
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
                      </View> */}
                      <View
                        style={{
                          width: wp(25),

                          alignItems: 'center',
                        }}>
                        <Text style={{ color: Color.darkGreen, fontSize: 14, fontWeight: '600' }}>
                          Created On
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp(35),

                          alignItems: 'center',
                        }}>
                        <Text style={{ color: Color.darkGreen, fontSize: 14, fontWeight: '600' }}>
                          Subject
                        </Text>
                      </View>

                    </View>
                    <View>
                      {/* <View style={styles.subContainer}> */}
                      <View style={styles.subContainer}>
                        {/* <Text style={styles.subHead}>
                      Pending Invoices
                      ({infoData.length})
                    </Text> */}

                        <FlatList
                          contentContainerStyle={{ paddingBottom: 200 }}
                          data={REQUEST_INFO?.requestInfoListModel}
                          // numColumns={5}
                          keyExtractor={(item, index) => index}
                          renderItem={({ item, index }) => (
                            <TouchableOpacity
                              onPress={() => {
                                navigation.navigate('ViewRequest', {
                                  actionId: item?.actionModel?.id
                                })
                              }}
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
                                  width: wp(25),
                                  alignItems: 'center',
                                }}>
                                <Text style={{ color: '#2F4050', fontSize: 13 }}>
                                  {item?.actionStaffModel?.actionId ? item?.actionStaffModel?.actionId : 'N/A'}
                                </Text>
                              </View>


                              <View
                                style={{
                                  width: wp(25),

                                  alignItems: 'center',
                                }}>
                                <Text style={{ color: '#2F4050', fontSize: 12 }}>
                                  {
                                    moment(item?.actionModel?.creationDate).format('MM-DD-YYYY')}
                                </Text>
                              </View>
                              <View
                                style={{
                                  width: wp(35),

                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    color: '#2F4050', fontSize: 12
                                  }}>
                                  {item?.actionModel?.subject}
                                </Text>
                              </View>

                            </TouchableOpacity>
                          )}
                        />
                      </View>
                      {/* </View> */}
                    </View>
                  </>
                );
              } else {
                return (
                  <ScrollView>
                    {/* <View style={styles.subContainer}> */}
                    <Text style={styles.subHead}>0 Results Found</Text>

                    {/* </View> */}
                  </ScrollView>
                );
              }
            })()}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Request;
const styles = StyleSheet.create({
  // bgImg: {
  //   height: 480,
  // },
  mainTab: {
    backgroundColor: '#fff',
    width: wp(100),
    flexDirection: 'row',
    justifyContent: 'center',
    //  borderRadius: 50,
    // height: 120,
    // marginTop: 20,
  },
  header: {
    fontSize: 28,
    color: '#000',
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 20,
    width: '40%',
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

  MessageContainer: {
    // backgroundColor: 'green',

    // height: 20,
    borderRadius: 10,
    justifyContent: 'space-between',
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 20,
    // marginBottom: 30,
    width: wp(90),
    // backgroundColor: 'red',
    flexDirection: 'row',
    // alignSelf: "center",
  },

  moblieSec: {
    // backgroundColor: 'green',

    // height: 20,
    borderRadius: 10,
    // justifyContent: "center",
    // alignItems: "center",
    // marginTop: 20,
    // marginBottom: 30,
    width: wp(90),

    //  flexDirection: 'row',
    // alignSelf: "center",
  },

  emailtoch: {
    //  backgroundColor: "lightgray",
    width: wp(20),
    height: 60,
    borderRadius: 10,
    marginRight: wp(3),
    justifyContent: 'center',
    // borderRadius: 10,
  },
  ButtonText: {
    color: '#2F4050',
    textAlign: 'center',
    height: 20,
    fontSize: 10,
  },
  newRText: {
    color: '#2F4050',
    marginLeft: 0,
    alignSelf: 'center',
    fontSize: 12,
  },
  DarkButtonText: {
    color: '#fff',
    textAlign: 'center',
    height: 20,
    fontSize: 10,
  },
  mobiletoch: {
    // backgroundColor: showwhat == "My Schools" ? "#2F5597" : "lightgray",
    width: wp(20),
    // marginLeft: wp(5),
    height: 60,
    //borderRadius: 10,
    justifyContent: 'center',
  },
  subContainer: {
    // backgroundColor: 'red',
    width: wp(95),
    alignSelf: 'center',
    // marginTop: 20,
    alignItems: 'center',
    height: 380,
    //borderRadius: 20,
  },
  subHead: {
    fontSize: 20,
    color: '#000',
    marginTop: 50,
    // marginLeft: 20,
    //  textAlign:'center'
  },
  bgImg: {
    height: hp(85)
  }
});
