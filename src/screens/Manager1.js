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

const Manager = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [infoData, setInfoData] = useState({});
  const { MY_INFO } = useSelector(state => state.TaxLeafReducer);
  const { MANAGER_INFO } = useSelector(state => state.TaxLeafReducer);
  const { LOGIN_DATA } = useSelector(state => state.TaxLeafReducer);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const jsonData = MY_INFO.guestInfo;
  console.log(LOGIN_DATA, 'LOGIN_DATALOGIN_DATALOGIN_DATALOGIN_DATA', MY_INFO);

  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    dispatch(ManagerInfo(jsonData?.clientId, jsonData?.clientType, navigation));

    setInfoData(MANAGER_INFO);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);

  useEffect(() => {
    setInfoData(MANAGER_INFO);
  }, []);

  useEffect(() => {
    // setLoader(true);
    setInfoData(MANAGER_INFO);
    // setTimeout(() => {
    //   setLoader(false);
    // }, 2000);
  }, [MANAGER_INFO]);

  console.log(infoData?.managerInfo?.user, 'MANAGER_INFOMANAGER_INFO');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Loader flag={loader} />
      <CustomHeader />
      <ScrollView style={{ height: hp(80) }}>
        <View style={{ backgroundColor: '#d5e3e5' }}>
          {/* <Text
          style={{fontSize: 16, color: '#000', marginTop: 10, marginLeft: 20}}>
          Client Manager Profile
        </Text> */}

          <View
            style={modalVisible ? styles.mainContainer1 : styles.mainContainer}>
            <View style={{ textAlign: 'center' }}>
              <View style={{ textAlign: 'center' }}>
                <Image
                  source={require('../Assets/profileBlank.png')}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 50,
                    alignSelf: 'center',
                  }}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#000',
                    margin: 10,
                    fontWeight: '700',
                    fontSize: 16,
                  }}>
                  {infoData?.managerInfo?.firstName}{' '}
                  {infoData?.managerInfo?.lastName}
                </Text>
              </View>
              {/* <Text
              style={{textAlign: 'center', color: '#000', marginBottom: 10}}>
              Prince Eastsons
            </Text> */}
              <View style={{ width: '60%', alignSelf: 'center', marginBottom: 20 }}>
                <Button
                  title="+ Submit Your Request"
                  color="#2F4050"
                  onPress={() => setModalVisible(true)}
                />
              </View>
            </View>
            <View>
              <View style={styles.infoSec}>
                <Text style={styles.infoSecText}>
                  Hi! My name is{' '}
                  <Text style={{ fontWeight: '800' }}>
                    {infoData?.managerInfo?.firstName}{' '}
                    {infoData?.managerInfo?.lastName}
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
                borderRadius: 10,
                paddingBottom: 20,
              }}>
              <View
                style={{
                  height: 50,
                  borderTopStartRadius: 10,
                  borderTopRightRadius: 10,
                  width: wp(90),
                  paddingLeft: 10,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  backgroundColor: Color.darkGreen,
                }}>
                <Text style={styles.LIstText2}>
                  <Text style={{ fontSize: 15, fontWeight: '600', color: '#fff' }}>
                    MY INFO:
                  </Text>
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
                  <Text style={{ fontSize: 15, fontWeight: '600' }}>Phone:</Text>{' '}
                  {infoData?.managerInfo?.cell ? infoData?.managerInfo?.cell :'N/A'}
                </Text>
              </View>
              <View style={{ height: 40, marginTop: 10, padding: 10 }}>
                <Text style={styles.LIstText2}>
                  <Text style={{ fontSize: 15, fontWeight: '600' }}>Email:</Text>{' '}
                  {infoData?.managerInfo?.user}
                </Text>
              </View>
              <View style={styles.progress}>
                <Progress.Bar
                  progress={0.3}
                  height={8}
                  borderRadius={10}
                  width={260}
                  unfilledColor="#2F4050"
                  color="#8ab645"
                  borderColor="#fff"
                />
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
                borderRadius: 10,
                paddingBottom: 20,
              }}>
              <View
                style={{
                  height: 50,
                  borderTopStartRadius: 10,
                  borderTopRightRadius: 10,
                  width: wp(90),
                  paddingLeft: 10,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  backgroundColor: Color.darkGreen,
                }}>
                <Text style={styles.LIstText2}>
                  <Text style={{ fontSize: 15, fontWeight: '600', color: '#fff' }}>
                    OFFICE INFO:
                  </Text>
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
                  <Text style={{ fontSize: 15, fontWeight: '600' }}>Name:</Text>{' '}
                  {infoData?.officeInfo?.name}
                </Text>
              </View>

              <View style={{ height: 40, marginTop: 10, padding: 10 }}>
                <Text style={styles.LIstText2}>
                  <Text style={{ fontSize: 15, fontWeight: '600' }}>Email:</Text>{' '}
                  {infoData?.officeInfo?.email}
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
                  <Text style={{ fontSize: 15, fontWeight: '600' }}>Phone:</Text>{' '}
                  {infoData?.officeInfo?.phone}
                </Text>
              </View>
              <View style={{ height: 40, marginTop: 10, padding: 10 }}>
                <Text style={styles.LIstText2}>
                  <Text style={{ fontSize: 15, fontWeight: '600' }}>Office:</Text>{' '}
                  {infoData?.officeInfo?.address} {infoData?.officeInfo?.city}, {infoData?.officeInfo?.zip}
                </Text>
              </View>
              <View style={styles.progress}>
                <Progress.Bar
                  progress={0.5}
                  height={8}
                  borderRadius={10}
                  width={260}
                  unfilledColor="#2F4050"
                  color="#8ab645"
                  borderColor="#fff"
                />
              </View>
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
              <Text style={styles.Subheading}>Submit Your Request</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
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
    backgroundColor: '#fff',
    padding: 20,
    opacity: 2,
    borderRadius: 10,
  },
  mainContainer1: {
    backgroundColor: '#fff',
    padding: 20,
    opacity: 0.2,
    borderRadius: 10,
    marginLeft: 20,
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
  Subheading: {
    fontSize: 16,
    color: '#000',
    paddingLeft: 20,
    fontWeight: '700',
  },
  partition: {
    borderWidth: 1,
    borderColor: 'grey',
    marginTop: 30,
    marginBottom: 30,
  },
  infoSec: {
    backgroundColor: '#8ab645',
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
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'Italic',
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
