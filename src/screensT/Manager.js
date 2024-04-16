import React, { useState, useEffect } from 'react';
import {
  Alert,
  Modal,
  View,
  Button,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
} from 'react-native';
import * as Progress from 'react-native-progress';
import CustomHeader from '../Component/CustomHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { ManagerInfo } from '../Redux/Actions/TaxLeaf';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Loader } from '../Component/Loader';
import CustomBottomTab from '../Component/CustomBottomTab';
import { Color } from '../Style';
import HeadTabs from './HeadTabs';

const Manager = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [infoData, setInfoData] = useState({});
  const { MY_INFO } = useSelector(state => state.TaxLeafReducer);
  const { MANAGER_INFO } = useSelector(state => state.TaxLeafReducer);
  const { LOGIN_DATA } = useSelector(state => state.TaxLeafReducer);
  const { OFFICE_INFO } = useSelector(state => state.TaxLeafReducer);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const manager = MANAGER_INFO;
  const jsonData = MY_INFO.guestInfo;
  const manageroffice = OFFICE_INFO
  console.log(LOGIN_DATA, 'LOGIN_DATALOGIN_DATALOGIN_DATALOGIN_DATA', MY_INFO);

  const [loader, setLoader] = useState(false);


  // useEffect(() => {
  //   setLoader(true);
  //   dispatch(ManagerInfo(jsonData?.clientId, jsonData?.clientType, navigation));

  //   setInfoData(MANAGER_INFO);
  //   setTimeout(() => {
  //     setLoader(false);
  //   }, 2000);
  // }, []);

  // useEffect(() => {
  //   setInfoData(MANAGER_INFO);
  // }, []);

  // useEffect(() => {
  //   // setLoader(true);
  //   setInfoData(MANAGER_INFO);
  //   // setTimeout(() => {
  //   //   setLoader(false);
  //   // }, 2000);
  // }, [MANAGER_INFO]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);

        // Fetch manager info
        await dispatch(ManagerInfo(jsonData?.clientId, jsonData?.clientType, navigation));

        // Assuming MANAGER_INFO is updated in the redux store after the API call.
        setInfoData(MANAGER_INFO);
      } catch (error) {
        console.error("Error fetching manager info:", error);
      } finally {
        setLoader(false);
      }
    };

    fetchData();
  }, [jsonData?.clientId, jsonData?.clientType]);



  console.log(infoData?.managerInfo?.user, 'MANAGER_INFOMANAGER_INFO');

  return (
    <SafeAreaView style={{ backgroundColor:'#fff',flex:1 }}>
      <Loader flag={loader} />
      <CustomHeader />
      <ScrollView style={{ height: hp(80) }}>

        <View style={{ backgroundColor: '#d5e3e5' }}>
          <HeadTabs />

          <View
            style={modalVisible ? styles.mainContainer1 : styles.mainContainer}>
            <View
              style={{
                width: wp(90),
                // marginTop: 10,
                // marginBottom: 20,
                alignSelf: "center",
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
              <Text style={{ fontSize: 20, fontFamily: 'Poppins-Bold', color: Color.headerIconBG }}>Manager</Text>
              <TouchableOpacity
               // onPress={() => setModalVisible(true)}
                onPress={() => navigation.navigate('ContactUs')}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: wp(50),

                  borderRadius: 20,
                  // marginLeft: 15,
                  // marginBottom: wp(2),
                  backgroundColor: '#fff',
                  // paddingHorizontal: 10,
                  height: hp(5),
                  //padding: 4
                }}>
                <Image source={require('../Assets/img/icons/createAction.png')} style={{ width: 25, height: 25, alignSelf: 'center' }} />
                <Text style={[styles.client, { alignSelf: 'center', marginLeft: 5, fontFamily: 'Poppins-Bold', fontSize: 12, marginTop: 5 }]}>Submit Your Request</Text>
              </TouchableOpacity>
              {/* <Button
            title="+ New Request"
            color="#2F4050"

            // onPress={() => setModalVisible(true)}
          /> */}
            </View>
            <View>
              <View style={styles.infoSec}>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <Image
                    source={require('../Assets/profileBlank.png')}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 50,
                      alignSelf: 'center',
                      marginLeft: 10
                    }}
                  />
                  <View>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#fff',
                        marginTop: 10,
                        fontFamily: 'Poppins-Bold',
                        fontSize: 18,
                        marginLeft: 10
                      }}>
                      {manager?.firstName}{' '}
                      {manager?.lastName}
                    </Text>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#90c460',

                        fontFamily: 'Poppins-SemiBold',
                        fontSize: 14,
                        marginRight: 25
                      }}>
                      Manager
                    </Text>
                  </View>

                </View>
                <Text style={styles.infoSecText}>
                  Hi! My name is{' '}
                  <Text style={{ fontFamily: 'Poppins-Bold' }}>
                    {manager?.firstName}{' '}
                    {manager?.lastName}
                  </Text>{' '}
                  . I'm your manager at TAXLEAF. This is my contact information.
                  You can reach me through the portal or direct at any time.
                  Thanks and have a great day!
                </Text>
              </View>
            </View>
            <View
              style={{
                width: wp(90),
                backgroundColor: '#fff',
                //padding: 10,
                elevation: 10,
                marginBottom: 20,
                alignSelf: 'center',
                // borderRadius: 10,
                paddingBottom: 20,
              }}>
              <View
                style={{
                  height: 40,

                  width: wp(90),
                  paddingLeft: 10,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  backgroundColor: Color.green,
                }}>
                <Text style={styles.LIstText2}>
                  <Text style={{ fontSize: 14, fontFamily: 'Poppins-SemiBold', color: '#fff' }}>
                    My Info
                  </Text>
                </Text>
              </View>

              <View
                style={{
                  height: 40,
                  backgroundColor: '#fff',
                  padding: 10,
                }}>

                <Text style={styles.LIstText2}>
                  <Text style={{ fontSize: 14, fontFamily: 'Poppins-Bold' }}>Phone:</Text>{' '}
                  {/* {infoData?.managerInfo?.cell ? infoData?.managerInfo?.cell : 'N/A'} */}
                  {manager?.phone ? manager?.phone : 'N/A'}
                </Text>
              </View>
              <View style={styles.partition}></View>
              <View style={{ height: 40, padding: 10 }}>
                <Text style={styles.LIstText2}>
                  <Text style={{ fontSize: 14, fontFamily: 'Poppins-Bold' }}>Email:</Text>{' '}
                  {manager?.user}
                </Text>
              </View>
              <View style={styles.partition}></View>

              {/* <View style={styles.progress}>
                <Progress.Bar
                  progress={0.3}
                  height={8}
                  borderRadius={10}
                  width={260}
                  unfilledColor="#2F4050"
                  color="#8ab645"
                  borderColor="#fff"
                />
              </View> */}
            </View>
            <View
              style={{
                width: wp(90),
                backgroundColor: '#fff',
                //padding: 10,
                elevation: 10,
                marginBottom: 20,
                alignSelf: 'center',
                paddingBottom: 20,
              }}>
              <View
                style={{
                  height: 40,

                  width: wp(90),
                  paddingLeft: 10,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  backgroundColor: Color.green,
                }}>
                <Text style={styles.LIstText2}>
                  <Text style={{ fontSize: 14, fontFamily: 'Poppins-SemiBold', color: '#fff' }}>
                    Office Info
                  </Text>
                </Text>
              </View>

              <View
                style={{
                  height: 40,
                  backgroundColor: '#fff',

                  padding: 10,
                }}>
                <Text style={styles.LIstText2}>
                  <Text style={{ fontSize: 15, fontFamily: 'Poppins-Bold' }}>Name:</Text>{' '}
                  {manageroffice?.name}
                </Text>
              </View>
              <View style={styles.partition}></View>

              <View style={{ height: 40, padding: 10 }}>
                <Text style={styles.LIstText2}>
                  <Text style={{ fontSize: 15, fontFamily: 'Poppins-Bold' }}>Email:</Text>{' '}
                  {manageroffice?.email}
                </Text>
              </View>
              <View style={styles.partition}></View>

              <View
                style={{
                  height: 40,
                  backgroundColor: '#fff',
                  padding: 10,
                }}>
                <Text style={styles.LIstText2}>
                  <Text style={{ fontSize: 15, fontFamily: 'Poppins-Bold' }}>Phone:</Text>{' '}
                  {manageroffice?.phone}
                </Text>
              </View>
              <View style={styles.partition}></View>

              <View style={{ height: 40, padding: 10 }}>
                <Text style={styles.LIstText2}>
                  <Text style={{ fontSize: 15, fontFamily: 'Poppins-Bold' }}>Office:</Text>{' '}
                  {manageroffice?.address} {manageroffice?.city}, {manageroffice?.zip}
                </Text>
              </View>
              <View style={styles.partition}></View>

              {/* <View style={styles.progress}>
                <Progress.Bar
                  progress={0.5}
                  height={8}
                  borderRadius={10}
                  width={260}
                  unfilledColor="#2F4050"
                  color="#8ab645"
                  borderColor="#fff"
                />
              </View> */}
            </View>
            {/* <View>
            <View style={styles.infoSec}>
              <Text style={styles.infoSecText}>
                Hi! My name is John Smith . I'm your manager at TAXLEAF. This is
                my contact information. You can reach me through the portal or
                direct at any time. Thanks and have a great day!
              </Text>
            </View>
          </View> */}
          </View>
          <View style={{ height: wp(15) }}></View>
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
              <Text style={styles.Subheading}>Submit Your Request11</Text>
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
              <TextInput
                style={styles.input}
                placeholder="Name"
              // onChangeText={onChangeText}
              // value={text}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone"

              // onChangeText={onChangeText}
              // value={text}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"

              // onChangeText={onChangeText}
              // value={text}
              />
              <TextInput
                style={[styles.input, { Height: 50 }]}
                placeholder="Messsage"
                editable
                multiline
                numberOfLines={4}
                maxLength={40}
              // onChangeText={onChangeText}
              // value={text}
              />
              <TextInput
                style={styles.input}
                placeholder="Country"

              // onChangeText={onChangeText}
              // value={text}
              />
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
              // onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Manager;
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#d5e3e5',
    // padding: 20,
    opacity: 2,
    borderRadius: 10,
  },
  mainContainer1: {
    backgroundColor: '#d5e3e5',
    // padding: 20,
    opacity: 0.2,
    borderRadius: 10,
    // marginLeft: 20,
    marginTop: 20,
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
  formContainer: {
    backgroundColor: '#2F4050',
    width: wp(90),
    padding: 10,
    alignSelf: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  head: {
    fontSize: 14.5,
    color: '#000',
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
    fontFamily: 'Poppins-SemiBold',
    color: Color.headerIconBG,
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
  Subheading: {
    fontSize: 16,
    color: '#000',
    paddingLeft: 20,
    fontWeight: '700',
  },
  partition: {
    borderWidth: 0.3,
    borderColor: '#A7B1C2',

  },
  infoSec: {
    backgroundColor: Color.darkGreen,
    borderRadius: 10,
    padding: 10,
    //height: 190,
    width: wp(90),
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  infoSecText: {
    color: '#fff',
    fontSize: 11,
    lineHeight: 18,
    width: wp(80),
    alignSelf: "center",
    //textAlign: "center",
    fontFamily: 'Poppins-SemiBold',
    // marginLeft: 10
  },
  progress: {
    marginLeft: 11,
    marginTop: 20,
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
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: 120,
    alignSelf: 'center',
  },
  buttonOpen: {
    backgroundColor: '#8AB645',
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
