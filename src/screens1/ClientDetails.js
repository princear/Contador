import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Button,
  TextInput,
  ImageBackground,
  Linking,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'react-native-reanimated-carousel';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Fontisto';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import { Dropdown } from 'react-native-element-dropdown';
import { Loader } from '../Component/Loader';

import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Color } from '../Style';

const ClientDetails = ({ route }) => {
  const width = Dimensions.get('window').width;
  const navigation = useNavigation();
  const [showwhat1, setshowwhat1] = useState('Message');
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const bgImage = require('../Assets/img/guest_shape.png');
  const { MY_INFO } = useSelector(state => state.TaxLeafReducer);
  const { MANAGER_INFO } = useSelector(state => state.TaxLeafReducer);
  const { CLIENT_DETAIL } = useSelector(state => state.TaxLeafReducer);

  const ClientData = route.params.clientdetail;

  //console.log(ClientData, 'ClientDataClientDataClientDataClientData');

  const [infoData, setInfoData] = useState({});
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);

    setInfoData(CLIENT_DETAIL);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);

  useEffect(() => {
    // setLoader(true);
    setInfoData(CLIENT_DETAIL);
    // setTimeout(() => {
    //   setLoader(false);
    // }, 2000);
  }, [CLIENT_DETAIL]);

  // console.log(
  //   infoData,
  //   'infoDatainfoDatainfoDatainfoDatainfoData',
  //   infoData?.individualInfo?.lastName,
  // );

  const showwhatfunc1 = data => {
    setshowwhat1(data);
    console.log(data);
  };
  console.log(date, 'date');
  const showDatePicker = () => {
    setDatePicker(true);
  };

  const onDateSelected = (event, value) => {
    setDate(value);
    setDatePicker(false);
  };
  const data1 = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];
  const radioButtons = useMemo(
    () => [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Jhon smith (Manager)',
        value: 'option1',
      },
      {
        id: '2',
        label: 'Jhon smith (Partner)',
        value: 'option2',
      },
    ],
    [],
  );
  return (
    <View style={styles.container}>
      <Loader flag={loader} />
      <ScrollView>
        <View
          style={{
            width: wp(90),
            // backgroundColor: 'red',
            flexDirection: 'row',
            alignSelf: 'center',
          }}>
          <View style={{ width: wp(50) }}>
            <Text style={styles.heading}>
              {infoData?.individualInfo?.lastName},{' '}
              {infoData?.individualInfo?.firstName}
            </Text>
          </View>

          <View style={{ width: wp(40) }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                //  marginTop: 10,
                //marginLeft: 18,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('FileCabinet')}
                style={styles.btnPrev}
              // onPress={() => { onPageChange(4) }}
              >
                {/* <Icon
                                                style={[
                                                    styles.icon,
                                                    {
                                                        color: '#fff',
                                                    },
                                                ]}
                                                name="arrowleft"
                                                size={20}
                                                color="#fff"
                                            /> */}
                <Image
                  source={require('../Assets/img/icons/files-dark.png')}
                  style={{
                    width: 20,
                    height: 20,
                    alignSelf: 'center',
                    marginBottom: 5,
                    // borderRadius: 50,
                    //alignSelf: 'center',
                  }}
                />
                <Text style={{ color: Color.darkGreen, fontSize: 8 }}>
                  FILE CABINET
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnSubmit}>
                <Image
                  source={require('../Assets/img/icons/dots-dark.png')}
                  style={{
                    width: 20,
                    height: 20,
                    alignSelf: 'center',
                    marginBottom: 5,
                    //  borderRadius: 50,
                    //alignSelf: 'center',
                  }}
                />
                <Text style={{ color: Color.darkGreen, fontSize: 8 }}>
                  REQUEST
                </Text>
                {/* 
                                            <Icon
                                                style={[
                                                    styles.icon,
                                                    {
                                                        color: '#fff',
                                                    },
                                                ]}
                                                name="arrowright"
                                                size={20}
                                                color="#fff"
                                            /> */}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Text style={styles.subheading}>Hello Welcome To TaxLeaf</Text>

        <View style={styles.slideContainer}>
          <View style={styles.contentView}>
            <Text style={styles.subHead1}>Status:</Text>

            <Text style={styles.LIstText21}>Active</Text>
          </View>
          <View style={styles.contentView}>
            <Text style={styles.subHead1}>ClientId:</Text>

            <Text style={styles.LIstText2}>
              {ClientData.subClientInfo.subClientPracticeId}
            </Text>
          </View>
          <View style={styles.contentView}>
            <Text style={styles.subHead1}>OfficeId:</Text>

            <Text style={styles.LIstText2}>{ClientData.officeInfo.name}</Text>
          </View>
          <View style={styles.contentView}>
            <Text style={styles.subHead1}>Manager:</Text>

            <Text style={styles.LIstText2}>
              {ClientData.partnerInfo.firstName}{' '}
              {ClientData.partnerInfo.lastName}
            </Text>
          </View>
        </View>
        <View style={styles.slideContainer}>
          <View style={styles.contentView}>
            <Text style={styles.subHead1}>Total Orders:</Text>

            <Text style={styles.LIstText2}>55 </Text>
          </View>
          <View style={styles.contentView}>
            <Text style={styles.subHead1}>Pending Amount:</Text>

            <Text style={styles.LIstText2}>$66</Text>
          </View>
        </View>
        <View style={styles.slideContainerClient}>
          <Text style={styles.headingClient}>Client Information</Text>
          <View style={styles.contentView}>
            <Text style={styles.subHead}>Client Id:</Text>

            <Text style={styles.LIstText2}>
              {' '}
              {ClientData.subClientInfo.subClientPracticeId}
            </Text>
          </View>
          <View style={styles.contentView}>
            <Text style={styles.subHead}>Individual Name:</Text>

            <Text style={styles.LIstText2}>
              {' '}
              {infoData?.individualInfo?.lastName},{' '}
              {infoData?.individualInfo?.firstName}
            </Text>
          </View>
          <View style={styles.contentView}>
            <Text style={styles.subHead}>SSN/ITIN:</Text>

            <Text style={styles.LIstText2}>
              {' '}
              {infoData?.individualInfo?.ssnItin}
            </Text>
          </View>
          <View style={styles.contentView}>
            <Text style={styles.subHead}>Date of Birth:</Text>

            <Text style={styles.LIstText2}>
              {' '}
              {infoData?.individualInfo?.birthDate}
            </Text>
          </View>
          <View style={styles.contentView}>
            <Text style={styles.subHead}>Language:</Text>

            <Text style={styles.LIstText2}>
              {' '}
              {infoData?.languageInfo?.language1}
            </Text>
          </View>

          <View style={styles.contentView}>
            <Text style={styles.subHead}>Residency:</Text>

            <Text style={styles.LIstText2}>
              {' '}
              {infoData?.residenseInfo?.countryName}
            </Text>
          </View>

          <View style={styles.contentView}>
            <Text style={styles.subHead}>Citizenship:</Text>

            <Text style={styles.LIstText2}>
              {' '}
              {infoData?.citizenInfo?.countryName}
            </Text>
          </View>
        </View>
        <View style={styles.slideContainerClient}>
          <Text style={styles.headingClient}>Contact Information</Text>
          <View style={[styles.contentView, { height: hp(6) }]}>
            <Text style={styles.subHead}>Email:</Text>
            <Text
              style={styles.LIstText2}
              onPress={() =>
                Linking.openURL(
                  `mailto:${ClientData.officeInfo.email}?subject=SendMail&body=Description`,
                )
              }
              title={ClientData.officeInfo.email}>
              {' '}
              {ClientData.officeInfo.email}
            </Text>
          </View>
          <View style={styles.contentView}>
            <Text style={styles.subHead}>Phone Number:</Text>

            <Text
              style={styles.LIstText2}
              onPress={() =>
                Linking.openURL(`tel:${ClientData.officeInfo.phone}`)
              }>
              {' '}
              {ClientData.officeInfo.phone}
            </Text>
          </View>

          <View style={styles.contentView}>
            <Text style={styles.subHead}>Address:</Text>

            <Text style={styles.LIstText2}>
              {' '}
              {ClientData.officeInfo.address}
            </Text>
          </View>
        </View>

        <View style={styles.slideContainerClient}>
          <Text style={styles.headingClient}>Internal Data</Text>
          <View style={[styles.contentView, { height: hp(6) }]}>
            <Text style={styles.subHead}>Office:</Text>
            <Text style={styles.LIstText2}>
              {' '}
              {ClientData.officeInfo.email}
            </Text>
          </View>
          <View style={styles.contentView}>
            <Text style={styles.subHead}>Client Partner:</Text>

            <Text style={styles.LIstText2}>
              {' '}
              {ClientData.partnerInfo.firstName}{' '}
              {ClientData.partnerInfo.lastName}
            </Text>
          </View>
          <TouchableOpacity style={styles.contentView} onPress={() => navigation.navigate('Manager')}>
            <Text style={styles.subHead}>Client Manager:</Text>

            <Text style={styles.LIstText2}>
              {' '}
              {ClientData.managerInfo.firstName}{' '}
              {ClientData.managerInfo.lastName}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ClientDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d5e3e5'
  },
  heading: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    // maxWidth:'80%',
    color: '#8AB645',
    // height:40,
    marginTop: 20,
    //  marginLeft: 20,
    // fontWeight: '600',
    // textAlign: 'center',
  },
  headingClient: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    // maxWidth:'80%',
    color: '#fff',
    // height:40,
    marginTop: 20,
    marginLeft: 20,
    // fontWeight: '600',
    // textAlign: 'center',
  },
  subheading: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    // maxWidth:'80%',
    color: '#676A6C',
    // height:40,
    // marginTop: 10,
    marginLeft: 20,
  },
  part: {
    borderWidth: 0.5,
    borderColor: '#A7B1C2',
    marginTop: 10,
    width: '90%',
    alignSelf: 'center',
  },
  slideContainer: {
    backgroundColor: '#fff',
    width: wp(90),
    justifyContent: 'center',
    alignSelf: 'center',
    /// height: 420,
    opacity: 2,
    paddingBottom: 20,
    borderRadius: 10,
    marginTop: 20,
    // width:'62%'
  },
  slideContainerClient: {
    backgroundColor: '#2F4050',
    width: wp(90),
    justifyContent: 'center',
    alignSelf: 'center',
    /// height: 420,
    opacity: 2,
    paddingBottom: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  slideContainerFrom: {
    backgroundColor: '#CCDEFD',
    width: wp(90),
    justifyContent: 'center',
    alignSelf: 'center',
    /// height: 420,
    opacity: 2,
    paddingBottom: 20,
    borderRadius: 10,
    marginTop: 20,
    // width:'62%'
  },
  slideContainerTo: {
    backgroundColor: '#C3EFA5',
    width: wp(90),
    justifyContent: 'center',
    alignSelf: 'center',
    /// height: 420,
    opacity: 2,
    paddingBottom: 20,
    borderRadius: 10,
    marginTop: 20,
    // width:'62%'
  },
  Slidericons: {
    width: '70%',
    height: 150,
    // marginTop: 10,
    // marginLeft: 20,
    alignSelf: 'center',
  },
  postText: {
    alignSelf: 'center',
    color: '#1F3E50',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
  },
  sliderText: {
    color: '#2F4050',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  cardSlider: {
    flex: 1,
    //borderWidth: 1,
    backgroundColor: '#fff',
    width: wp(90),
    justifyContent: 'center',
  },
  info: {
    color: '#1F3E50',
    alignSelf: 'center',
    fontSize: 14,
    marginTop: 10,
  },
  btn: {
    width: wp(40),
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 30,
    marginTop: 10,
    backgroundColor: '#2F4050',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  profileImg: {
    width: 70,
    borderRadius: 80,
    height: 70,
    marginTop: 30,
    alignSelf: 'center',
    // marginLeft:100
  },
  headText: {
    textAlign: 'center',
    // marginLeft:110,
    color: '#000',
    marginTop: 10,
    fontWeight: '600',
  },
  headText1: {
    color: '#1F3E50',
    marginTop: 30,
    fontWeight: '600',
    fontSize: 20,
    marginLeft: 30,
  },
  infoHead: {
    backgroundColor: '#1F3E50',
    padding: 7,
    marginTop: 20,
    width: '82%',
    marginLeft: 30,
    // alignSelf: 'center',
    marginBottom: 12,
  },
  infoHeadText: {
    color: '#fff',
    fontSize: 14,
    padding: 5,
    fontWeight: '600',
  },
  ofcInfotxt: {
    color: '#1F3E50',
    marginLeft: 30,
    fontSize: 14,
  },
  ofcInfotxt1: {
    color: '#1F3E50',
    marginLeft: 30,
    justifyContent: 'center',
    margin: 10,
  },
  moblieSec: {
    // backgroundColor: "lightgrey",
    // height: 20,
    width: wp(90),
    //backgroundColor: 'red',
    justifyContent: 'space-between',
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
    width: wp(20),
    height: 45,
    justifyContent: 'center',
    borderRadius: 7,
    //marginRight: 6,
    marginTop: 10,
  },
  ButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 10,
  },
  mobiletoch: {
    // backgroundColor: showwhat == "My Schools" ? "#2F5597" : "lightgray",
    width: 70,
    height: 45,
    marginTop: 10,
    borderRadius: 7,
    justifyContent: 'center',
    marginRight: 5,
  },
  subHead: {
    marginLeft: 30,
    marginTop: 20,
    color: 'red',
  },

  icon: { alignSelf: 'center' },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderRadius: 8,
    width: '90%',
    alignSelf: 'center',
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 12,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  textStyle: {
    color: '#fff',
    textAlign: 'center',
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: '90%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    borderColor: 'gray',
  },
  btn: {
    width: '90%',
    height: hp(7),
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 30,
    marginTop: 10,
    backgroundColor: '#8AB645',
    borderRadius: 10,
    // padding: 10,
    alignItems: 'center',
    // marginRight: 10
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: 'gray',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  btnSubmit: {
    // width: wp(20),
    // height: hp(5),
    // alignSelf: 'flex-end',
    justifyContent: 'center',
    //  flexDirection: 'row',
    marginBottom: 30,
    marginTop: 10,
    // backgroundColor: '#8AB645',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 10,
  },
  btnPrev: {
    // width: wp(20),
    // height: hp(5),
    // alignSelf: 'flex-start',
    justifyContent: 'center',
    //flexDirection: 'row',
    marginBottom: 30,
    marginTop: 10,
    // backgroundColor: '#8AB645',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    // marginRight: 80
  },
  LIstText2: {
    color: '#000',
    width: wp(40),
    height: hp(10)
  },
  LIstText21: {
    color: '#fff',
    backgroundColor: '#8AB645',
  },
  subHead: {
    width: 150,
    fontSize: 15,
    fontWeight: '600',
  },
  subHead1: {
    width: 150,
    fontSize: 15,
    fontWeight: '600',
    color: '#8AB645',
  },
  contentView: {
    height: 40,
    backgroundColor: '#fff',
    marginTop: 10,
    padding: 10,
    flexDirection: 'row',
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 10,
  },
});
