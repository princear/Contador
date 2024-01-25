import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {LOGIN_DATA} from '../Redux/Actions/types';
import {DataTable} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {clientInfo} from '../Redux/Actions/TaxLeaf';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Loader} from '../Component/Loader';
import CustomHeader from '../Component/CustomHeader';
import {Color} from '../Style';
import CustomBottomTab from '../Component/CustomBottomTab';

const MyInfo = () => {
  const {MY_INFO} = useSelector(state => state.TaxLeafReducer);
  const {LOGIN_DATA} = useSelector(state => state.TaxLeafReducer);
  console.log(LOGIN_DATA.staffview.user, 'Login_DataLogin_DataLogin_Data');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const jsonData = MY_INFO.staffview;

  // console.log(MY_INFO, 'jsonDatajsonDatajsonDatajsonDatajsonData');
  const [infoData, setInfoData] = useState({});
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    dispatch(clientInfo(LOGIN_DATA.staffview.user, navigation));
    setInfoData(MY_INFO);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);

  useEffect(() => {
    setInfoData(MY_INFO);
  }, []);

  useEffect(() => {
    // setLoader(true);
    setInfoData(MY_INFO);
    // setTimeout(() => {
    //   setLoader(false);
    // }, 2000);
  }, [MY_INFO]);

  // console.log(infoData, 'infoDatainfoDatainfoDatainfoDatainfoDatainfoData');

  return (
    <View style={{flex: 1}}>
      <Loader flag={loader} />
      <CustomHeader />
      <ScrollView>
        {/* <Text
        style={{fontSize: 16, color: '#000', marginTop: 20, marginLeft: 20}}>
        My Profile
      </Text> */}

        <View
          style={{
            backgroundColor: '#fff',
            width: wp(100),
            padding: 20,
            opacity: 2,
            borderRadius: 10,
            //  marginLeft: 20,
            //marginTop: 20,
          }}>
          <View style={{textAlign: 'center'}}>
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
              {jsonData?.firstName} {''} {jsonData?.lastName}
              {/* Prince Eastsons */}
            </Text>
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
                backgroundColor: Color.geen,
              }}>
              <Text style={styles.LIstText2}>
                <Text style={{fontSize: 15, fontWeight: '600', color: '#fff'}}>
                  Personal Info
                </Text>
              </Text>
            </View>

            <View style={styles.contentView}>
              <Text style={styles.subHead}>Date Of Birth:</Text>
              <Text style={styles.LIstText2}> </Text>
            </View>

            <View style={styles.contentView}>
              <Text style={styles.subHead}>Office:</Text>

              <Text style={styles.LIstText2}></Text>
            </View>
            <View style={styles.contentView}>
              <Text style={styles.subHead}>Department:</Text>

              <Text style={styles.LIstText2}></Text>
            </View>
            <View style={styles.contentView}>
              <Text style={styles.subHead}>Contact Info:</Text>
              <Text style={styles.LIstText2}>
                {jsonData?.mobileNo ? jsonData?.mobileNo : 'NA'}
              </Text>
            </View>
            <View style={styles.contentView}>
              <Text style={styles.subHead}>CellPhone:</Text>

              <Text style={styles.LIstText2}>{jsonData?.phone}</Text>
            </View>
            <View style={styles.contentView}>
              <Text style={styles.subHead}>Extensions:</Text>

              <Text style={styles.LIstText2}>
                {jsonData?.extension ? jsonData?.extension : 'NA'}
              </Text>
            </View>
            <View style={styles.contentView}>
              <Text style={styles.subHead}>Social Security Number:</Text>
              <Text style={styles.LIstText2}> </Text>
            </View>
            <View style={styles.contentView}>
              <Text style={styles.subHead}>Username:</Text>

              <Text style={styles.LIstText2}>{jsonData?.user}</Text>
            </View>
            <View style={styles.contentView}>
              <Text style={styles.subHead}>Time Of Expiration:</Text>
              <Text style={styles.LIstText2}> </Text>
            </View>
            <View style={styles.contentView}>
              <Text style={styles.subHead}>Status:</Text>

              <Text style={styles.LIstText2}>{jsonData?.status}</Text>
            </View>
            <View style={styles.contentView}>
              <Text style={styles.subHead}>Type:</Text>

              <Text style={styles.LIstText2}>{jsonData?.type}</Text>
            </View>
          </View>
          {/* <View
          style={{
            width: wp(90),
            backgroundColor: '#fff',
            //padding: 10,
            elevation: 10,
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
              backgroundColor: '#2F4050',
            }}>
            <Text style={styles.LIstText2}>
              <Text style={{fontSize: 15, fontWeight: '600', color: '#fff'}}>
                Address Detail
              </Text>
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: wp(80),
            }}>
            <View
              style={{height: 40, marginTop: 10, width: wp(45), padding: 10}}>
              <Text style={styles.LIstText2}>
                <Text style={{fontSize: 15, fontWeight: '600'}}>Office:</Text>{' '}
                Noida
              </Text>
            </View>
            <View
              style={{
                height: 40,
                //  backgroundColor: '#fff',
                alignSelf: 'flex-start',
                marginTop: 10,
                width: wp(35),
                padding: 10,
              }}>
              <Text style={styles.LIstText2}>
                <Text style={{fontSize: 15, fontWeight: '600'}}>
                  Department:
                </Text>{' '}
                IT
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: wp(80),
            }}>
            <View
              style={{height: 40, width: wp(45), marginTop: 10, padding: 10}}>
              <Text style={styles.LIstText2}>
                <Text style={{fontSize: 15, fontWeight: '600'}}>Contact :</Text>{' '}
                9865478934
              </Text>
            </View>
            <View
              style={{
                height: 40,
                //  backgroundColor: '#fff',
                width: wp(45),
                marginTop: 10,
                padding: 10,
              }}>
              <Text style={styles.LIstText2}>
                <Text style={styles.LIstText2}>
                  <Text style={{fontSize: 15, fontWeight: '600'}}>
                    Extensions:
                  </Text>{' '}
                  +91
                </Text>
                <Text style={{fontSize: 15, fontWeight: '600'}}>
                  CellPhone:
                </Text>{' '}
                +1 378498
              </Text>
            </View>
          </View>

          <View style={{height: 40, marginTop: 10, padding: 10}}>
            <Text style={styles.LIstText2}>
              <Text style={{fontSize: 15, fontWeight: '600'}}>Extensions:</Text>{' '}
              +91
            </Text>
          </View>
         
        </View> */}
        </View>

        <View style={{height: wp(10)}}></View>
      </ScrollView>
      <CustomBottomTab />
    </View>
  );
};

export default MyInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
  },
  LIstText2: {
    color: '#000',
  },
  subHead: {
    width: 150,
    fontSize: 15,
    fontWeight: '600',
    color: Color.darkGreen,
    // backgroundColor: 'red',
  },
  contentView: {
    height: 40,
    //  backgroundColor: '#fff',
    marginTop: 10,
    padding: 10,
    flexDirection: 'row',
  },
});
