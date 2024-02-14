import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
  Image,
  ImageBackground,
  Button,
  
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Color } from '../Style';
import { useDispatch, useSelector } from 'react-redux';
import { clientInfo, ManagerInfo } from '../Redux/Actions/TaxLeaf';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Loader } from '../Component/Loader';

import Carousel from 'react-native-reanimated-carousel';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Fontisto';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Icon4 from 'react-native-vector-icons/FontAwesome6';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { dashboardlist } from '../Redux/Actions/Dashboard';
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import HeadTabs from './HeadTabs';

const HomeScreen = () => {
  const width = Dimensions.get('window').width;

  const [infoData, setInfoData] = useState({});
  const [dashboardList, setDashboardList] = useState([]);
  const [userDetail, setUserDETAIL] = useState([]);
  const [dashboardMessageList, setDashboardMessageList] = useState([]);
  const { MY_INFO } = useSelector(state => state.TaxLeafReducer);
  const { DASHBOARD_LIST } = useSelector(state => state.DashboardReducer);
  const { DASHBOARD_MESSAGE_LIST } = useSelector(state => state.DashboardReducer);
  const { MANAGER_INFO } = useSelector(state => state.TaxLeafReducer);
  const { OFFICE_INFO } = useSelector(state => state.TaxLeafReducer);
  const { PARTNER_INFO } = useSelector(state => state.TaxLeafReducer);
  const { LOGIN_DATA } = useSelector(state => state.TaxLeafReducer);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const jsonData = MY_INFO.guestInfo
  const companyTypeInfo = MY_INFO.companyTypeInfo;
  const stateInfo = MY_INFO.stateInfo;
  const companyInfo = MY_INFO.companyInfo;
  const officeInfo = MY_INFO.officeInfo;
  const manager = MANAGER_INFO;
  const manageroffice = OFFICE_INFO



  //console.log(dashboardMessageList?.length, 'messageList')
  //console.log(companyTypeInfo, 'jsonDatajsonDatajsonDatajsonDatajsonData')
  //console.log(stateInfo, 'jsonDatajsonDatajsonDatajsonDatajsonData')
  //console.log(companyInfo, 'jsonDatajsonDatajsonDatajsonDatajsonData')
  // console.log(officeInfo?.id, 'officeInfoofficeInfoofficeInfoofficeInfo')
  // console.log(manager, 'MANAGER_INFOMANAGER_INFOMANAGER_INFOMANAGER_INFO')
  //console.log(manageroffice, 'HOMEHOMEHOMEHOMEHOMEHOMEHOME')

  // console.log(jsonData?.clientId, jsonData?.clientType)
  //console.log(MY_INFO, 'MY_INFOMY_INFOMY_INFO')


  //console.log(LOGIN_DATA, 'LOGIN_DATALOGIN_DATALOGIN_DATA')
  const jsonString = LOGIN_DATA;
  const Login = jsonString;
  // console.log(jsonString.user, 'jsonStringjsonStringjsonString')
  // console.log(Login, 'LoginLoginLogin')


  const data = [

    {
      id: 1,
      Title: 'Need Payroll?',
      subHead: 'We Can Help You With Your Company’s Payroll!',
      footHead: 'Contact Us For More Info!',
      img: require('../Assets/img/gdb-img1.png'),
    },

    {
      id: 2,
      Title: 'Bring a friend!',
      subHead:
        'Earn $50 In Your Next Order By Referring Friend To Us ByUsing The Code FRIEND50OFF',
      footHead: 'Call Us to Learn More!',
      img: require('../Assets/img/gdb-img2.png'),
    },

    {
      id: 3,
      Title: 'You Still Haven’t File Your Taxes?',
      subHead: 'Schedule Your Virtual Tax Return Now!',
      footHead: 'Call Us For More Information!',
      img: require('../Assets/img/gdb-img3.png'),
    },

    {
      id: 4,
      Title: 'Incorporations',
      subHead: 'Create A New Company Today!',
      footHead: 'Learn The Benefits of Having A US Company',
      img: require('../Assets/img/gdb-img4.png'),
    },

    {
      id: 5,
      Title: 'Wanna Move To The USA?',
      subHead: 'Franchise With Us!',
      footHead: 'Contact Us For More Info!',
      img: require('../Assets/img/gdb-img5.png'),
    },

    {
      id: 6,
      Title: 'Need Bookkeeping?',
      subHead: 'Add A Bookkeeping Plan To Your Business!',
      footHead: 'Contact Us to Book It!',
      img: require('../Assets/img/gdb-img6.png'),
    },


  ];
  const bgImage = require('../Assets/img/guest_shape.png');

  const [loader, setLoader] = useState(false);

  const formatPhoneNumber = (phoneNumber) => {
    // Remove non-digit characters from the phone number
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');

    // Format the phone number (assuming it's a 10-digit number)
    const formattedPhoneNumber = `(${cleanedPhoneNumber.substring(0, 3)})${cleanedPhoneNumber.substring(3, 6)}-${cleanedPhoneNumber.substring(6, 10)}`;

    return formattedPhoneNumber;
  };


  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cardSlider}
    // onPress={toggleModal}
    >
      <View style={styles.cardShadow}>
        <Image
          source={item.img}
          style={styles.Slidericons1}
        // style={
        //   item.id == 1 || item.id == 2
        //     ? styles.Slidericons1
        //     : styles.Slidericons
        // }
        />
      </View>
      <View>
        <Text style={styles.postText}>{item.Title}</Text>
      </View>
      <View style={{ padding: 0 }}>
        <Text style={styles.sliderText}>
          {item.subHead}
        </Text>
        <Text style={styles.info}>{item.footHead}</Text>
        <TouchableOpacity style={styles.btn}>
          {/* <View style={{ width: wp(30) }}> */}
          <Image
                  source={ require('../Assets/img/icons/telefono.png')}
                  style={  [styles.icons,]}
                />
          {/* </View> */}

          <Text style={{marginLeft:10, color: '#fff',textAlign:"center", fontFamily: 'Poppins-SemiBold', fontSize: 12 }}
            onPress={() =>
              Linking.openURL(`tel:${manager?.phone}`)
            }
          >
            {/* 333-888-2345 */}
            {manager?.phone ? manager?.phone && formatPhoneNumber(manager.phone) : 'N/A'}
            </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
    
      <Loader flag={loader} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {/* <Text style={styles.heading}>
          Thank you for being our client since 2023
        </Text> */}

        <HeadTabs />

        <View style={{ flex: 1, marginTop: 0, marginLeft: 20 }}>

          <Carousel
            loop
            width={width}
            height={wp(90)}
            autoPlay={true}
            data={data}
            scrollAnimationDuration={3000}
            // onSnapToItem={index => console.log('current index:', index)}
            renderItem={renderItem}
            style={{
              borderRadius: 20,
              // backgroundColor: 'red'
              // Adjust the value as needed
              //overflow: 'hidden',
            }}

          />

        </View>

        <View style={styles.slideContainer}>
          <Image
            source={require('../Assets/profileBlank1.png')}
            style={styles.profileImg}
          />
          <Text style={styles.headText}>
            {manager?.firstName}{' '}
            {manager?.lastName}
          </Text>
          <Text style={styles.headText1}>Get in Touch!</Text>
          <ScrollView nestedScrollEnabled={true}>
            <View style={styles.infoHead}>
              <Text style={styles.infoHeadText}> Office Information</Text>
            </View>
            <View style={{ marginBottom: 5, marginTop: 5, flexDirection: "row", width: wp(80), alignSelf: "center" }}>
              {/* <Icon
                style={styles.icon}
                name="phone"
                size={20}
                color="#000"
              /> */}
              <TouchableOpacity
               onPress={() =>
                Linking.openURL(`tel:${officeInfo?.phone}`)
              }
              >
              <Image
                
                  source={ require('../Assets/img/icons/phone-icon.png')}
                  style={  [styles.icons,]}
                />
              </TouchableOpacity>
              
              <Text style={styles.ofcInfotxt1}
                onPress={() =>
                  Linking.openURL(`tel:${officeInfo?.phone}`)
                }
              >
                 {officeInfo?.phone && formatPhoneNumber(officeInfo.phone)}
                 {/* {officeInfo?.phone} */}
              </Text>
            </View>


            <View style={{ flexDirection: "row", width: wp(80), alignSelf: "center" }}>
              {/* <Icon style={styles.icon} name="mail" size={20} color="#000" /> */}
              <TouchableOpacity
               onPress={() =>
                Linking.openURL(
                  `mailto:${officeInfo?.email}?subject=SendMail&body=Description`,
                )
              }
              >
              <Image
              
                  source={ require('../Assets/img/icons/email-icon.png')}
                  style={  [styles.icons,]}
                />
              </TouchableOpacity>
             
              <Text style={styles.ofcInfotxt1}
               onPress={() =>
                Linking.openURL(
                  `mailto:${officeInfo?.email}?subject=SendMail&body=Description`,
                )
              }
              title={officeInfo?.email}
              >

                {officeInfo?.email}
              </Text>
            </View>


            <View style={styles.infoHead}>
              <Text style={styles.infoHeadText}> Staff Information</Text>
            </View>
            <View style={{ marginBottom: 5, marginTop: 5, flexDirection: "row", width: wp(80), alignSelf: "center" }}>
              {/* <Icon
                style={styles.icon}
                name="phone"
                size={20}
                color="#000"
              /> */}
              <TouchableOpacity
               onPress={() =>
                Linking.openURL(`tel:${manager?.phone}`)
              }
              >
              <Image
                 
                  source={ require('../Assets/img/icons/phone-icon.png')}
                  style={  [styles.icons,]}
                />

              </TouchableOpacity>
               
              <Text style={styles.ofcInfotxt1}
               onPress={() =>
                Linking.openURL(`tel:${manager?.phone}`)
              }
              >


                {manager?.phone ? manager?.phone && formatPhoneNumber(manager.phone): 'N/A'}
                {/* {manager?.phone ? manager?.phone : 'N/A'} */}
              </Text>
            </View>
            <View style={{ flexDirection: "row", width: wp(80), alignSelf: "center" }}>
              {/* <Icon style={styles.icon} name="mail" size={20} color="#000" /> */}
              <TouchableOpacity
               onPress={() =>
                Linking.openURL(
                  `mailto:${manager?.user}?subject=SendMail&body=Description`,
                )
              }
              >
              <Image
              
                  source={ require('../Assets/img/icons/email-icon.png')}
                  style={  [styles.icons,]}
                />

              </TouchableOpacity>
            
              <Text style={styles.ofcInfotxt1}
              
              onPress={() =>
                Linking.openURL(
                  `mailto:${manager?.user}?subject=SendMail&body=Description`,
                )
              }
              title={manager?.user}

              >

                {manager?.user}
              </Text>
            </View>
          </ScrollView>
        </View>
        <View style={{ height: wp(5) }}></View>
      </ScrollView >
      {/* </ImageBackground> */}
    </View >
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.screenBG
  },
  heading: {
    fontSize: 16,
    // maxWidth:'80%',
    color: Color.darkGreen,
    // height:40,
    marginTop: 20,
    fontWeight: '600',
    textAlign: 'center',
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
    borderRadius: 20,
    marginTop: 20,
    // width:'62%'
  },
  tabsContainer: {
    // backgroundColor: '#fff',
    width: wp(90),
    justifyContent: 'center',
    alignSelf: 'center',
    /// height: 420,
    opacity: 2,
    paddingBottom: 20,
    borderRadius: 10,
    // marginTop: 20,
    // width:'62%'
  },
  icons:{
    alignSelf: 'center',
    height:20,
    resizeMode:'contain',
    width:20,
 
  },
  Slidericons: {
    width: wp(60),
    height: wp(40),
    marginTop: 10,

    resizeMode: 'contain',
    // marginLeft: 20,
    alignSelf: 'center',
  },
  Slidericons1: {
    width: wp(60),
    height: wp(40),
    marginTop: 10,
    justifyContent: "center",
    alignSelf: "center",
    //backgroundColor: "red",
    resizeMode: 'contain',
    // marginLeft: 20,
    alignSelf: 'center',
  },
  postText: {
    alignSelf: 'center',
    color: Color.green,
    width: wp(90),
    textAlign: "center",
    fontSize: 20,
    //backgroundColor: 'red',
    fontFamily: 'Poppins-Bold',
    // marginTop: 20,
  },
  sliderText: {
    color: Color.headerIconBG,
    fontSize: 12,
    alignSelf: "center",
    textAlign: "center",
    //textAlign: 'center',
    //marginTop: 2,
    width: wp(80),
    // backgroundColor: 'orange',
    fontFamily: 'Poppins-SemiBold'
  },
  cardSlider: {
    flex: 1,
    //borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#fff',
    width: wp(90),
    // height: hp(50),
    justifyContent: 'center',
  },
  info: {
    color: Color.green,
    // alignSelf: 'center',
    // backgroundColor: 'yellow',
    alignSelf: "center",
    justifyContent: "center",
    // height: wp(15),
    width: wp(80),
    textAlign: "center",
    fontSize: 16,
    marginTop: 2,
    fontFamily: 'Poppins-SemiBold'
  },
  btn: {
    width: wp(40),
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 30,
    marginTop: 10,
    backgroundColor: Color.headerIconBG,
    borderRadius: 30,
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
    color: Color.darkGreen,
    marginTop: 10,
    fontFamily: 'Poppins-SemiBold'
  },
  headText1: {
    color: Color.green,
    marginTop: 10,
    // fontWeight: '700',
    fontSize: 20,
    textAlign: "center",
   fontFamily: 'Poppins-Bold'

    //marginLeft: 30,
  },
  infoHead: {
    backgroundColor: Color.green,
    padding: 7,
    marginTop: 10,
    width: wp(80),
    alignSelf: "center",

    // alignSelf: 'center',
    marginBottom: 12,
  },
  infoHeadText: {
    color: '#fff',
    fontSize: 14,
    padding: 5,
    fontFamily: 'Poppins-SemiBold',
  },
  ofcInfotxt: {
    color: Color.darkGreen,
    marginLeft: 30,
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  ofcInfotxt1: {
    color: '#1F3E50',
    marginLeft: 10,
    justifyContent: 'center',
    //margin: 10,
    fontFamily: 'Poppins-SemiBold'
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
    marginLeft: 5
  },
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
  subHead: {
    marginLeft: 30,
    marginTop: 20,
  },
  icon: {
    // alignSelf: 'center',
    //marginTop: 0
  },
  cardShadow: {
    //backgroundColor: 'red',
    // height: hp(20),
    // justifyContent: "center"

  },
  bgImg: {
    height: hp(85)
  }
});
