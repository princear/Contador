
import React, { useState, useEffect } from 'react';
import { View, Text, Image, Linking, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Color } from '../Style';
import { dashboardlist, dashboardlist2 } from '../Redux/Actions/Dashboard';
import { clientInfo, ManagerInfo } from '../Redux/Actions/TaxLeaf';
import { useDispatch, useSelector } from 'react-redux';


const CustomHeader = () => {
  const navigation = useNavigation();
  let iconNm = require('../Assets/img/icons/hamburger-green.png');
  let logo = require('../Assets/img/contadoramerica.png');
  let bell = require('../Assets/img/icons/bell-green.png');
  let profile = require('../Assets/img/icons/profile-green.png');
  let chaticon = require('../Assets/img/bubble-chat.png');



  const dispatch = useDispatch();
  const [dashboardList, setDashboardList] = useState([]);
  const [dashboardList2, setDashboardList2] = useState([]);
  const [loader, setLoader] = useState(false);
  const [dashboardMessageList, setDashboardMessageList] = useState([]);
  const { MY_INFO } = useSelector(state => state.TaxLeafReducer);
  const { DASHBOARD_LIST } = useSelector(state => state.DashboardReducer);
  const { DASHBOARD_MESSAGE_LIST } = useSelector(state => state.DashboardReducer);
  const { DASHBOARD_LIST_TWO } = useSelector(state => state.DashboardReducer);
  const { LOGIN_DATA } = useSelector(state => state.TaxLeafReducer);
  const [refreshCount, setRefreshCount] = useState(0);
  const jsonData = MY_INFO.guestInfo;
  const officeInfo = MY_INFO.officeInfo;





  useEffect(() => {
    setLoader(true);
    // setInterval(() => {

    dispatch(clientInfo(LOGIN_DATA, navigation))
      .then(() => dispatch(dashboardlist(jsonData?.clientId, jsonData?.clientType, officeInfo?.id, navigation)))
      .then(() => dispatch(dashboardlist2(jsonData?.clientId, jsonData?.clientType, officeInfo?.id, navigation)))
      .then(() => dispatch(ManagerInfo(jsonData?.clientId, jsonData?.clientType, navigation)))
      .finally(() => {
        setLoader(false);
      });
    // }, 5000);
  }, [LOGIN_DATA, jsonData?.clientId, jsonData?.clientType, officeInfo?.id]);


  useEffect(() => {


    setDashboardList(DASHBOARD_LIST);
    setDashboardList2(DASHBOARD_LIST_TWO);
    setDashboardMessageList(DASHBOARD_MESSAGE_LIST);

  }, [DASHBOARD_LIST, DASHBOARD_MESSAGE_LIST, DASHBOARD_LIST_TWO]);




  const HolidaysNewsType = 'Holidays';
  const TaxNewsType = 'Tax Deadlines';
  const EventsType = 'Events';
  const OrderType = 'order';
  const GovernmentType = 'government_payment';
  const TaxReturnsType = 'tax_returns';
  const BookKeepingType = 'bookkeeping';

  const HolidaysfilteredList =
    dashboardList &&
    dashboardList.filter(item => item.newsType === HolidaysNewsType);

  const TaxfilteredList =
    dashboardList &&
    dashboardList.filter(item => item.newsType === TaxNewsType);

  const EventsfilteredList =
    dashboardList &&
    dashboardList.filter(item => item.newsType === EventsType);


  const orderfilteredList =
    dashboardList2 &&
    dashboardList2.filter(item => item.section === OrderType);

  const GovfilteredList =
    dashboardList2 &&
    dashboardList2.filter(item => item.reference === GovernmentType);

  const taxreturnfilteredList =
    dashboardList2 &&
    dashboardList2.filter(item => item.reference === TaxReturnsType);

  const BookKeepingfilteredList =
    dashboardList2 &&
    dashboardList2.filter(item => item.reference === BookKeepingType);



  let UnreadTaxDeadCount = 0;
  let UnreadMessagesCount = 0;
  let UnreadHolidaysCount = 0;
  let UnreadEventCount = 0;
  let UnreadOrderCount = 0;
  let UnreadTaxReturnCount = 0;
  let UnreadBookCount = 0;
  let UnreadGovCount = 0;
  let AllUnreadNotifications = 0;



  // Iterate over the array
  for (const item of dashboardMessageList) {
    // Check if the property "isNotificationRead" is false
    if (item.isNotificationRead === false) {
      // Increment counter
      UnreadMessagesCount++;
    }
  }


  const HolidaysfilteredList1 =
    dashboardList &&
    dashboardList.filter(item => item.newsType === HolidaysNewsType && item.isNotificationRead === false);

  UnreadHolidaysCount = HolidaysfilteredList1 && HolidaysfilteredList1.length || 0;


  const TaxfilteredList1 =
    dashboardList &&
    dashboardList.filter(item => item.newsType === TaxNewsType && item.isNotificationRead === false);


  UnreadTaxDeadCount = TaxfilteredList1 && TaxfilteredList1.length || 0;


  const EventsfilteredList1 =
    dashboardList &&
    dashboardList.filter(item => item.newsType === EventsType && item.isNotificationRead === false);

  UnreadEventCount = EventsfilteredList1 && EventsfilteredList1.length || 0;


  const orderfilteredList1 =
    dashboardList2 &&
    dashboardList2.filter(item => item.section === OrderType && item.isNotificationRead === false);

  UnreadOrderCount = orderfilteredList1 && orderfilteredList1.length || 0;




  const GovfilteredList1 =
    dashboardList2 &&
    dashboardList2.filter(item => item.reference === GovernmentType && item.isNotificationRead === false);


  UnreadGovCount = GovfilteredList1 && GovfilteredList1.length || 0;



  const taxreturnfilteredList1 =
    dashboardList2 &&
    dashboardList2.filter(item => item.reference === TaxReturnsType && item.isNotificationRead === false);


  UnreadTaxReturnCount = taxreturnfilteredList1 && taxreturnfilteredList1.length || 0;


  const BookKeepingfilteredList1 =
    dashboardList2 &&
    dashboardList2.filter(item => item.reference === BookKeepingType && item.isNotificationRead === false);

  UnreadBookCount = BookKeepingfilteredList1 && BookKeepingfilteredList1.length || 0;



  console.log("TaxDeadCount", UnreadTaxDeadCount);
  console.log("messageCount", UnreadMessagesCount);
  console.log("HolidaysCount", UnreadHolidaysCount);
  console.log("EventsCount", UnreadEventCount);


  AllUnreadNotifications = UnreadTaxDeadCount + UnreadMessagesCount + UnreadHolidaysCount + UnreadEventCount + UnreadOrderCount +
    UnreadTaxReturnCount + UnreadBookCount + UnreadGovCount;


  console.log(AllUnreadNotifications, 'AllUnreadNotificationsAllUnreadNotifications')



  return (
    <SafeAreaView
      style={{
        backgroundColor: Color.white,
        // backgroundColor: '',
        borderBottomWidth: 1,

        borderBottomColor: 'orange',
        justifyContent: 'center',
        // alignItems:"center",
        padding: 15,
        // paddingBottom:10
      }}>
      <View
        style={{
          //backgroundColor: 'green',
          width: wp(90),
          flexDirection: 'row',
          alignSelf: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            //backgroundColor: 'green',
            width: wp(20),
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            {/* Hamburger icon or any other icon you prefer */}
            <Image source={iconNm} style={{ width: 25, height: 25 }} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            //backgroundColor: 'red',
            width: wp(50),
            justifyContent: "center",
            alignItems: "center",
            //height: 10,
          }}>
          <Image
            source={logo}
            style={{
              width: 200, height: 50,
              marginBottom: 10,
            }}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            // backgroundColor: 'green',
            width: wp(20),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() =>

            Linking.openURL('whatsapp://send?text=Hello! I Would Like to Know More About Your Tax and Accounting Services in the USA.&phone=13058335457')}

          >
            {/* Hamburger icon or any other icon you prefer */}
            <Image source={chaticon} style={{ width: 25, height: 25 }} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => navigation.navigate('MyInfo')}>
            {/* Hamburger icon or any other icon you prefer */}
            <Image source={profile} style={{ width: 25, height: 25 }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => navigation.openDrawer()}>
            {/* Hamburger icon or any other icon you prefer */}

            <Image source={bell} style={{ width: 25, height: 25 }} />
          </TouchableOpacity>
          {AllUnreadNotifications > 0 ?
            <View
              style={{
                position: 'absolute',
                top: -2,
                right: 0,
                height: 25,

                width: 25,
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: Color.white,
                backgroundColor: 'red',
                borderRadius: 50,
              }}>
              <Text
                style={{
                  color: Color.white,
                  alignSelf: 'center',
                  fontSize: 12,
                }}>
                {AllUnreadNotifications}
              </Text>
            </View>
            : null}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CustomHeader;
