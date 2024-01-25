import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
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
import HeaderIcons from '../Component/HeaderIcons';

const HomeScreen = () => {
  const width = Dimensions.get('window').width;
  const [showwhat1, setshowwhat1] = useState('');
  const [showwhat2, setshowwhat2] = useState('');
  const [infoData, setInfoData] = useState({});
  const [dashboardList, setDashboardList] = useState([]);
  const [dashboardMessageList, setDashboardMessageList] = useState([]);
  const { MY_INFO } = useSelector(state => state.TaxLeafReducer);
  const { DASHBOARD_LIST } = useSelector(state => state.DashboardReducer);
  const { DASHBOARD_MESSAGE_LIST } = useSelector(state => state.DashboardReducer);
  const { MANAGER_INFO } = useSelector(state => state.TaxLeafReducer);
  const { LOGIN_DATA } = useSelector(state => state.TaxLeafReducer);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const jsonData = MY_INFO.guestInfo;
  const officeInfo = MY_INFO.officeInfo;
  //   useEffect(() => {
  //     console.log(MY_INFO,'Hooooooooo')

  //    Alert.alert('Hello World')
  //     dispatch(ManagerInfo(jsonData?.clientId, jsonData?.clientType, navigation));
  // console.log(MY_INFO,'Hooooooooo')
  //   }, []);
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
  console.log(showwhat1, 'showWhat');
  console.log(dashboardMessageList?.length, 'messageList')

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
      footHead: 'Call Us To Learn More!',
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
      footHead: 'Contact Us TO Book It!',
      img: require('../Assets/img/gdb-img6.png'),
    },
  ];
  const bgImage = require('../Assets/img/guest_shape.png');

  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    dispatch(clientInfo(LOGIN_DATA.staffview.user, navigation));
    dispatch(ManagerInfo(jsonData?.clientId, jsonData?.clientType, navigation));
    dispatch(
      dashboardlist(
        jsonData?.clientId,
        jsonData?.clientType,
        officeInfo?.id,
        navigation,
      ),
    );

    setInfoData(MANAGER_INFO);
    setDashboardList(DASHBOARD_LIST);
    setDashboardMessageList(DASHBOARD_MESSAGE_LIST);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);
  useEffect(() => {
    setInfoData(MANAGER_INFO);
    setDashboardList(DASHBOARD_LIST);
    setDashboardMessageList(DASHBOARD_MESSAGE_LIST);
    dispatch(
      dashboardlist(
        jsonData?.clientId,
        jsonData?.clientType,
        officeInfo?.id,
        navigation,
      ),
    );
    dispatch(ManagerInfo(jsonData?.clientId, jsonData?.clientType, navigation));
  }, [LOGIN_DATA]);

  useEffect(() => {
    setInfoData(MANAGER_INFO);
    setDashboardList(DASHBOARD_LIST);
    setDashboardMessageList(DASHBOARD_MESSAGE_LIST);
  }, []);
  useEffect(() => {
    setInfoData(MANAGER_INFO);
    setDashboardList(DASHBOARD_LIST);
    setDashboardMessageList(DASHBOARD_MESSAGE_LIST);
    dispatch(
      dashboardlist(
        jsonData?.clientId,
        jsonData?.clientType,
        officeInfo?.id,
        navigation,
      ),
    );
    dispatch(ManagerInfo(jsonData?.clientId, jsonData?.clientType, navigation));

  }, [showwhat1]);


  useEffect(() => {
    // setLoader(true);
    setInfoData(MANAGER_INFO);
    setDashboardList(DASHBOARD_LIST);
    setDashboardMessageList(DASHBOARD_MESSAGE_LIST);
    // setTimeout(() => {
    //   setLoader(false);
    // }, 2000);
  }, [MY_INFO, MANAGER_INFO, DASHBOARD_LIST, DASHBOARD_MESSAGE_LIST]);

  console.log(
    dashboardList,
    'newsandupdatelistnewsandupdatelistnewsandupdatelistnewsandupdatelistnewsandupdatelist',
  );

  const desiredNewsType = 'Holidays ';
  const TaxNewsType = 'Tax Deadlines';
  const filteredList =
    dashboardList &&
    dashboardList.filter(item => item.newsType === desiredNewsType);

  const TaxfilteredList =
    dashboardList &&
    dashboardList.filter(item => item.newsType === TaxNewsType);

  console.log(TaxfilteredList, 'TaxfilteredListt');

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cardSlider}
    // onPress={toggleModal}
    >
      <View style={styles.cardShadow}>
        <Image
          source={item.img}
          style={
            item.id == 1 || item.id == 2
              ? styles.Slidericons1
              : styles.Slidericons
          }
        />
      </View>
      <View>
        <Text style={styles.postText}>{item.Title}</Text>
      </View>
      <View style={{ padding: 5 }}>
        <Text numberOfLines={3} style={styles.sliderText}>
          {item.subHead}
        </Text>
        <Text style={styles.info}>{item.footHead}</Text>
        <TouchableOpacity style={styles.btn}>
          <Icon1
            style={[
              styles.icon,
              {
                color: '#fff',
              },
            ]}
            name="phone-in-talk"
            size={20}
            color="#fff"
          />
          <Text style={{ color: '#fff', marginLeft: 10 }}>987654</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      {/* <ImageBackground
          source={bgImage}
          style={styles.bgImg}
          resizeMode="cover"> */}
      <Loader flag={loader} />
      <ScrollView>
        {/* <Text style={styles.heading}>
          Thank you for being our client since 2023
        </Text> */}
        <HeaderIcons />


        <View style={{ flex: 1, marginTop: 20, marginLeft: 20 }}>
          <Carousel
            loop
            width={width}
            height={width}
            autoPlay={true}
            data={data}
            scrollAnimationDuration={3000}
            onSnapToItem={index => console.log('current index:', index)}
            renderItem={renderItem}
          />
        </View>

        <View style={styles.slideContainer}>
          <Image
            source={require('../Assets/profileBlank.png')}
            style={styles.profileImg}
          />
          <Text style={styles.headText}>
            {MANAGER_INFO?.managerInfo?.firstName}{' '}
            {MANAGER_INFO?.managerInfo?.lastName}
          </Text>
          <Text style={styles.headText1}>Get in Touch !</Text>
          <ScrollView nestedScrollEnabled={true}>
            <View style={styles.infoHead}>
              <Text style={styles.infoHeadText}> Office Information</Text>
            </View>
            <Text style={styles.ofcInfotxt1}>
              {' '}
              <Icon
                style={styles.icon}
                name="phone"
                size={20}
                color="#000"
              />{' '}
              {MANAGER_INFO?.officeInfo?.phone}
            </Text>
            <Text style={styles.ofcInfotxt}>
              <Icon style={styles.icon} name="mail" size={20} color="#000" />{' '}
              {MANAGER_INFO?.officeInfo?.email}
            </Text>
            <View style={styles.infoHead}>
              <Text style={styles.infoHeadText}> Staff Information</Text>
            </View>
            <Text style={styles.ofcInfotxt1}>
              {' '}
              <Icon
                style={styles.icon}
                name="phone"
                size={20}
                color="#000"
              />{' '}
              {MANAGER_INFO?.managerInfo?.phone ? MANAGER_INFO?.managerInfo?.phone : 'N/A'}
            </Text>
            <Text style={styles.ofcInfotxt}>
              <Icon style={styles.icon} name="mail" size={20} color="#000" />{' '}
              {MANAGER_INFO?.managerInfo?.user}
            </Text>
          </ScrollView>
        </View>
        <View style={{ height: wp(5) }}></View>
      </ScrollView>
      {/* </ImageBackground> */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d5e3e5'
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
    borderRadius: 10,
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
  Slidericons: {
    width: '80%',
    height: 160,
    resizeMode: 'contain',

    // marginTop: 10,
    // marginLeft: 20,
    alignSelf: 'center',
  },
  Slidericons1: {
    width: '60%',
    height: 140,
    resizeMode: 'contain',
    // marginLeft: 20,
    alignSelf: 'center',
  },
  postText: {
    alignSelf: 'center',
    color: Color.geen,
    fontSize: 20,
    fontWeight: '600',
    // marginTop: 20,
  },
  sliderText: {
    color: Color.darkGreen,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '700'
  },
  cardSlider: {
    flex: 1,
    //borderWidth: 1,
    backgroundColor: '#fff',
    width: wp(90),
    justifyContent: 'center',
  },
  info: {
    color: Color.geen,
    alignSelf: 'center',
    fontSize: 14,
    marginTop: 10,
    fontWeight: '700'
  },
  btn: {
    width: wp(40),
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 30,
    marginTop: 10,
    backgroundColor: Color.darkGreen,
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
    fontWeight: '600',
  },
  headText1: {
    color: Color.darkGreen,
    marginTop: 30,
    fontWeight: '600',
    fontSize: 20,
    marginLeft: 30,
  },
  infoHead: {
    backgroundColor: Color.geen,
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
    color: Color.darkGreen,
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
  icon: { alignSelf: 'center', marginTop: 5 },
  cardShadow: {
    // backgroundColor: 'red',
    // height: 300,
    paddingTop: 20,
  },
  bgImg: {
    height: hp(85)
  }
});
