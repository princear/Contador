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
//import { ScrollView } from 'react-native-virtualized-view'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useIsFocused, useNavigation } from '@react-navigation/native';
let iconm = require('../Assets/img/icons/msg.png');
// let iconmw = require('../Assets/img/icons/msg-white.png');
// let iconP = require('../Assets/img/icons/agreement.png');
// let iconS = require('../Assets/img/icons/proposal.png');
// let iconR = require('../Assets/img/icons/reminder.png');
// let iconC = require('../Assets/img/icons/checklist.png');
// let iconE = require('../Assets/img/icons/error.png');
let iconmw = require('../Assets/img/icons/messageGreen.png');
let iconP = require('../Assets/img/icons/proposalGreen.png');
let iconS = require('../Assets/img/icons/signatureGreen.png');
let iconR = require('../Assets/img/icons/reminderGreen.png');
let iconC = require('../Assets/img/icons/incompleteGreen.png');
let iconE = require('../Assets/img/icons/completeGreen.png');
import { Color } from '../Style';
import { RequestInfoList } from '../Redux/Actions/TaxLeaf';
import { Loader } from '../Component/Loader';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Icon from 'react-native-vector-icons/AntDesign';
import HeadTabs from './HeadTabs';

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


  // const ListData = REQUEST_INFO?.requestInfoListModel
  //const sortedData = [...REQUEST_INFO?.requestInfoListModel].sort((a, b) => b.id.localeCompare(a.id));

  const jsonData = MY_INFO.guestInfo;

  const showwhatfunc = data => {
    setshowwhat(data);
    console.log(data);
  };
  const showwhatfunc1 = data => {
    setshowwhat1(data);
    console.log(data);
  };
  // console.log(REQUEST_INFO?.requestInfoListModel, 'REQUEST_INFO')


  const fetchData = async () => {
    setLoader(true);
    try {
      await dispatch(RequestInfoList(jsonData?.clientId, navigation));
    } finally {
      setTimeout(() => {
        setLoader(false);
      }, 500);

    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch, jsonData?.clientId, navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchData);
    return unsubscribe;
  }, [navigation, fetchData]);

  // useEffect(() => {
  //   setLoader(true);
  //   dispatch(RequestInfoList(jsonData?.clientId, navigation));

  //   setRequestInfoData(REQUEST_INFO?.requestInfoListModel);
  //   setTimeout(() => {
  //     setLoader(false);
  //   }, 2000);
  // }, []);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     setLoader(true);
  //     dispatch(RequestInfoList(jsonData?.clientId, navigation));

  //     setRequestInfoData(REQUEST_INFO?.requestInfoListModel);
  //     setTimeout(() => {
  //       setLoader(false);
  //     }, 2000);
  //   });

  //   // Return the function to unsubscribe from the event so it gets removed on unmount
  //   return unsubscribe;
  // }, [navigation]);
  // // console.log(requestInfoData, 'requestInfoData')



  return (
    <SafeAreaView style={{ backgroundColor: '#d5e3e5' }}>
      <Loader flag={loader} />

      <View >
        <ScrollView nestedScrollEnabled={true}>
          <HeadTabs />
          {/* <View style={styles.headerView}>
          <Text style={styles.header}>Requests</Text>
        </View> */}
          <View


          >
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
                <Text style={{ fontSize: 22, fontFamily: 'Poppins-Bold', color: Color.headerIconBG }}>Requests</Text>

              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('CreateNewAction')}
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
                 }]}>New Request</Text>
              </TouchableOpacity>
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
              {/* {(() => {
                if (showwhat1 == 'Message') {
                  return (
                    // <View style={styles.moblieSec}>
                    <View style={styles.MessageContainer}>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: wp(10),
                          justifyContent: 'flex-start',
                          // marginBottom: 20,
                        }}>

                        <TouchableOpacity
                          style={[
                            styles.emailtoch,
                            {
                              backgroundColor:
                                showwhat1 == 'Message' ? '#d5e3e5' : Color.green,
                            },
                          ]}
                          onPress={() => showwhatfunc1('Message')}>
                          <View
                            style={{
                              width: 35,
                              height: 35,
                              justifyContent: 'center',
                              // borderWidth: 1,
                              // borderRadius: 50,
                              // borderColor: '#fff',
                              alignSelf: 'center',
                            }}>
                            <Image
                              source={iconmw}
                              style={{
                                width: 40,
                                height: 40,

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
                                showwhat1 == 'Proposal' ? Color.green : '',
                            },
                          ]}
                          onPress={() => showwhatfunc1('Proposal')}>
                          <View
                            style={{
                              width: 35,
                              height: 35,
                              justifyContent: 'center',
                              // borderWidth: 1,
                              // borderRadius: 50,
                              // borderColor: '#2F4050',
                              alignSelf: 'center',
                            }}>
                            <Image
                              source={iconP}
                              style={{
                                width: 40,
                                height: 40,

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
                          width: wp(20),
                          justifyContent: 'flex-end',
                          // backgroundColor: 'yellow',
                          // marginBottom: 20,
                        }}>
                        <TouchableOpacity
                          disabled={true}
                          style={[
                            styles.mobiletoch,
                            {
                              backgroundColor:
                                showwhat1 == 'Signature' ? '#2F5597' : '',
                              marginBottom: 10,
                              marginRight: wp(1.5),
                              //marginLeft: 10,
                            },
                          ]}
                          onPress={() => showwhatfunc1('Signature')}>
                          <View
                            style={{
                              width: 35,
                              height: 35,
                              justifyContent: 'center',
                              // borderWidth: 1,
                              // borderRadius: 50,
                              // borderColor: '#2F4050',
                              alignSelf: 'center',
                            }}>
                            <Image
                              source={iconS}
                              style={{
                                width: 40,
                                height: 40,
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
                              // borderWidth: 1,
                              // borderRadius: 50,
                              // borderColor: '#2F4050',
                              alignSelf: 'center',
                            }}>
                            <Image
                              source={iconR}
                              style={{
                                width: 40,
                                height: 40,

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
              })()} */}
              <View style={{ width: wp(90), marginTop: 20 }}>
                {(() => {
                  if (showwhat == 'Experience') {
                    return (
                      <View style={styles.moblieSec}>
                        <View
                          style={{
                            flexDirection: 'row',
                            width: wp(60),
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
                                // borderWidth: 1,
                                // borderRadius: 50,
                                // borderColor: '#2F4050',
                                alignSelf: 'center',
                              }}>
                              <Image
                                source={iconC}
                                style={{
                                  width: 40,
                                  height: 40,

                                  borderColor: '#fff',
                                  alignSelf: 'center',
                                }}
                              />
                            </View>
                            <Text style={styles.ButtonText}>Incomplete</Text>
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
                                // borderWidth: 1,
                                // borderRadius: 50,
                                // borderColor: '#2F4050',
                                alignSelf: 'center',
                              }}>
                              <Image
                                source={iconE}
                                style={{
                                  width: 40,
                                  height: 40,
                                  borderColor: '#fff',
                                  alignSelf: 'center',
                                }}
                              />
                            </View>
                            <Text style={styles.ButtonText}>Complete</Text>
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
                            width: wp(50),
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
                                // borderWidth: 1,
                                // borderRadius: 50,
                                // borderColor: '#2F4050',
                                alignSelf: 'center',
                              }}>
                              <Image
                                source={iconC}
                                style={{
                                  width: 40,
                                  height: 40,
                                  borderColor: '#fff',
                                  alignSelf: 'center',
                                }}
                              />
                            </View>
                            <Text style={styles.ButtonText}>Incomplete</Text>
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
                                // borderWidth: 1,
                                // borderRadius: 50,
                                // borderColor: '#2F4050',
                                alignSelf: 'center',
                              }}>
                              <Image
                                source={iconE}
                                style={{
                                  width: 40,
                                  height: 40,

                                  borderColor: '#fff',
                                  alignSelf: 'center',
                                }}
                              />
                            </View>

                            <Text style={styles.ButtonText}>Complete</Text>
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
            </View>


            <View style={styles.subContainer}>

              {(() => {
                if (showwhat == 'Experience') {
                  return (
                    <>
                      <View
                        style={{
                          width: wp(90),
                          backgroundColor: Color.green,

                          alignItems: 'center',
                          alignSelf: 'center',


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
                            width: wp(30),
                            paddingLeft: 10

                            // alignItems: 'center',
                          }}>
                          <Text style={{ color: Color.white, fontSize: 14, fontFamily: 'Poppins-SemiBold' }}>
                            Action ID
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
                            width: wp(30),

                            alignItems: 'center',
                          }}>
                          <Text style={{ color: Color.white, fontSize: 13, fontFamily: 'Poppins-SemiBold' }}>
                            Created On
                          </Text>
                        </View>
                        <View
                          style={{
                            width: wp(30),

                            alignItems: 'center',
                          }}>
                          <Text style={{ color: Color.white, fontSize: 13, fontFamily: 'Poppins-SemiBold' }}>
                            Subject
                          </Text>
                        </View>

                      </View>
                      <View>
                        <View style={styles.subContainer}>

                          <FlatList
                            // contentContainerStyle={{ paddingBottom: 100 }}
                            data={REQUEST_INFO && REQUEST_INFO?.requestInfoListModel}
                            showsVerticalScrollIndicator={false}
                            // numColumns={5}
                            keyExtractor={(item, index) => index}

                            renderItem={({ item, index }) => (
                              <>
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
                                    // elevation: 10,

                                    // marginBottom: 10,
                                    flexDirection: 'row',
                                    height: wp(15),
                                  }}>





                                  <View
                                    style={{
                                      width: wp(30),
                                      paddingLeft: 10
                                      // alignItems: 'center',
                                    }}>
                                    <Text style={{ color: Color.headerIconBG, fontSize: 13, fontFamily: 'Poppins-SemiBold' }}>
                                      {item?.actionStaffModel?.actionId ? item?.actionStaffModel?.actionId : 'N/A'}
                                    </Text>
                                  </View>


                                  <View
                                    style={{
                                      width: wp(30),
                                      alignItems: 'center',
                                    }}>
                                    <Text style={{ color: '#2F4050', fontSize: 11, fontFamily: 'Poppins-SemiBold' }}>
                                      {
                                        moment(item?.actionModel?.creationDate).format('MM-DD-YYYY')}
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      width: wp(30),

                                      alignItems: 'center',
                                    }}>
                                    <Text
                                      style={{
                                        color: '#2F4050', fontSize: 11, fontFamily: 'Poppins-SemiBold'
                                      }}>
                                      {item?.actionModel?.subject}
                                    </Text>
                                  </View>

                                </TouchableOpacity>
                                <View style={styles.part}></View>
                              </>

                            )}

                          // reverse={true}
                          />

                          <View style={{ height: wp(20), backgroundColor: "red" }}></View>

                        </View>
                        {/* </View> */}
                      </View>
                    </>
                  );
                } else {
                  return (
                    <View>
                      {/* <View style={styles.subContainer}> */}
                      <Text style={styles.subHead}>0 Results Found</Text>

                      {/* </View> */}
                    </View>
                  );
                }
              })()}

            </View>
          </View>
        </ScrollView>
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
    width: wp(90),
    alignSelf: "center",
    // backgroundColor: "red",
    flexDirection: 'row',
    justifyContent: 'center',
    //  borderRadius: 50,
    height: hp(11),
    // marginTop: 20,
    // marginLeft: 90
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

    // height: 20,
    borderRadius: 10,
    justifyContent: 'space-between',
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 20,
    // marginBottom: 30,
    width: wp(60),
    //backgroundColor: 'red',
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
    width: wp(30),

    //  flexDirection: 'row',
    // alignSelf: "center",
  },

  emailtoch: {
    //  backgroundColor: "lightgray",
    width: wp(15),
    height: 60,
    // borderRadius: 10,
    // marginRight: wp(3),
    justifyContent: 'center',
    // borderRadius: 10,
  },
  ButtonText: {
    color: "#000",
    textAlign: 'center',
    height: 20,
    fontSize: 9,
    marginTop:5,
    fontFamily: 'Poppins-Regular'
  },
  newRText: {
    color: '#2F4050',
    marginLeft: 0,
    alignSelf: 'center',
    fontSize: 12,
  },
  DarkButtonText: {
    color: '#000',
    textAlign: 'center',
    height: 20,
    fontSize: 9,
    marginTop:5,
    fontFamily: 'Poppins-Regular'
  },
  mobiletoch: {
    // backgroundColor: showwhat == "My Schools" ? "#2F5597" : "lightgray",
    width: wp(14),
    // marginLeft: wp(5),
    height: 60,
    //borderRadius: 10,
    justifyContent: 'center',
  },
  subContainer: {
    // backgroundColor: 'red',
    width: wp(90),
    alignSelf: 'center',
    // marginTop: 20,
    alignItems: 'center',
    height: 300,
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
  },
  part: {
    borderWidth: 0.8,
    borderColor: '#A7B1C2',
    // marginTop: 10,
    // width: '90%',
    alignSelf: 'center',
  },

});
