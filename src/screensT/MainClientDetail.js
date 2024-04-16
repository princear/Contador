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
import HeadTabs from './HeadTabs';

const MainClientDetails = ({ route }) => {
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
    const { PARTNER_INFO } = useSelector(state => state.TaxLeafReducer);
    const { CLIENT_DETAIL } = useSelector(state => state.TaxLeafReducer);

    const ClientData = route.params.clientdetail;
    const manager = MANAGER_INFO;
    const partner = PARTNER_INFO;
    console.log(ClientData, 'ClientDataClientDataClientDataClientData');

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

    console.log(
        infoData,
        'XXXXXXXXXXXXXXXXXXXX',

    );

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
                <HeadTabs/>



              
                <View>
          <View style={styles.infoSec}>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Image
                source={require('../Assets/layer_36.png')}
                style={{
                  width: 100,
                  height: 70,
                  resizeMode: 'contain',
                  //  borderRadius: 50,
                  alignSelf: 'center',
                  marginLeft: 10
                }}
              />
            <View style={{
                width:wp(60),
              //  backgroundColor:"red",
                justifyContent:"center",
                alignItems:"center"
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#fff',
                  //  marginTop: 10,
                    fontFamily: 'Poppins-Bold',
                    fontSize: 18,
                   // marginLeft: 10
                  }}>
                  Hello  {route.params.companyInfo?.name}
                   {/* {ClientData.subClientInfo.subClientName} */}
                  {/* {manager?.firstName}{' '}
                      {manager?.lastName} */}
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#90c460',
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: 14,
                   // marginRight: 25
                  }}>
                  Welcome to Taxleaf
                </Text>
              </View>

            </View>

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
              //   alignSelf: 'center',
              //justifyContent: 'center',
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: Color.green,
            }}>
            <Image
              source={require('../Assets/PersonalInfo.png')}
              style={{
                width: 15,
                height: 15,

                marginLeft: 5,
                marginRight: 5,
                //  borderRadius: 50,
                //alignSelf: 'center',
              }}
            />

            <Text style={{ margin: 5, fontSize: 14, fontFamily: 'Poppins-SemiBold', color: '#fff' }}>
              Personal Info
            </Text>

          </View>

          <View
            style={{
              height: 40,
              backgroundColor: '#fff',
              flexDirection:'row',
              padding: 10,
            }}>

<Text style={[styles.LIstText2,{ fontSize: 14, fontFamily: 'Poppins-Bold' }]}>Status:</Text>
          
             
              <View style={{
              height:20,
              width:50,
              justifyContent:'center',
              alignItems:"center",
              marginLeft:5,
    backgroundColor: Color.statusActive

             }}>
  <Text style={styles.LIstText21}>ACTIVE</Text>
            </View>


              {/* {infoData?.managerInfo?.cell ? infoData?.managerInfo?.cell : 'N/A'} */}
              {/* {manager?.phone ? manager?.phone : 'N/A'} */}
           
          </View>
          <View style={styles.partition}></View>
          <View style={{ height: 40, padding: 10 }}>
            <Text style={styles.LIstText2}>
              <Text style={{ fontSize: 14, fontFamily: 'Poppins-Bold' }}>Client ID:</Text>{' '}
              {/* {ClientData.subClientInfo.subClientName} */}
              {MY_INFO?.guestInfo?.client}
            </Text>
          </View>
          <View style={styles.partition}></View>
          <View style={{ height: 40, padding: 10 }}>
            <Text style={styles.LIstText2}>
              <Text style={{ fontSize: 14, fontFamily: 'Poppins-Bold' }}>Office ID:</Text>{' '}
              {/* {ClientData.officeInfo.name} */}
              {MY_INFO?.officeInfo?.name}
            </Text>
          </View>
          <View style={styles.partition}></View>
          <View style={{ height: 40, padding: 10 }}>
            <Text style={styles.LIstText2}>
              <Text style={{ fontSize: 14, fontFamily: 'Poppins-Bold' }}>Manager:</Text>{' '}
              {manager?.firstName}  {manager?.lastName}
              {/* {ClientData.managerInfo.firstName}{' '}
              {ClientData.managerInfo.lastName} */}
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



        <View style={{ padding: 10 ,flexDirection:"row"}}>
          <Text style={[styles.LIstText2, { fontSize: 14, fontFamily: 'Poppins-Bold' }]}>Total Orders:</Text>
            
         
            <View 
              style={{ 
                justifyContent:"center",
                borderRadius:3,
                marginLeft:5,
                backgroundColor: Color.totalOrders,
                height:20,width:20,
                alignItems:"center",
              
              }}
              >
             <Text style={styles.LIstText22}>{MY_INFO?.paymentDetails?.totalOrders}</Text>

              </View>
          </View>
          {/* <View style={{ height: 40, padding: 10 }}>
            <Text style={styles.LIstText2}>
              <Text style={{ fontSize: 14, fontFamily: 'Poppins-Bold' }}>Total Orders:</Text>{' '}
              <Text style={styles.LIstText22}> {MY_INFO?.paymentDetails?.totalOrders}</Text>

            </Text>
          </View> */}
          <View style={styles.partition}></View>
          <View style={{ height: 40, padding: 10 }}>
            <Text style={styles.LIstText2}>
              <Text style={{ fontSize: 14, fontFamily: 'Poppins-Bold' }}>Billed Amount:</Text>{' '}
              <Text style={styles.LIstText2}>${Math.floor(Number(MY_INFO?.paymentDetails?.billedAmount )).toFixed(2)}</Text>

            </Text>
          </View>
          <View style={styles.partition}></View>
          <View style={{ height: 40, padding: 10 }}>
            <Text style={styles.LIstText2}>
              <Text style={{ fontSize: 14, fontFamily: 'Poppins-Bold' }}>Pending Amount:</Text>{' '}
              <Text style={styles.LIstText2}>${Math.floor(Number(MY_INFO?.paymentDetails?.pendingAmount)).toFixed(2)}</Text>

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
            //  paddingBottom: 20,
          }}>
          <View
            style={{
              height: 40,

              width: wp(90),
              paddingLeft: 10,
              flexDirection: "row",
              alignItems: "center",
              fontFamily: "Poppins-SemiBold",

              backgroundColor: Color.SubheaderBack
            }}>
            <Image
              source={require('../Assets/ClientInformation.png')}
              style={{
                width: 25,
                height: 15,
                resizeMode: "cover",
                marginLeft: 5,
                marginRight: 5,
                //  borderRadius: 50,
                //alignSelf: 'center',
              }}
            />

            <Text style={{ fontSize: 14, margin: 5, fontFamily: 'Poppins-SemiBold', color: '#fff' }}>
              Client Information

            </Text>
          </View>
          <View style={styles.partition1}></View>
          <View
            style={{
              height: 40,
              backgroundColor: Color.greenback,
              padding: 10,
              flexDirection: "row",
              width: wp(90),
            }}>


            <Text style={styles.LIstText3}>Client ID:</Text>

            <Text style={styles.LIstText4}>
            {MY_INFO?.guestInfo?.client}
            </Text>


          </View>
          <View style={styles.partition1}></View>
          <View style={{ height: 40, padding: 10, flexDirection: 'row', backgroundColor: Color.greenback }}>
            <Text style={styles.LIstText3}>
              <Text style={{ fontSize: 14, fontFamily: 'Poppins-Bold' }}>Company Name:</Text>{' '}
            </Text>
            <Text style={styles.LIstText4}>

            {infoData?.companyInfo?.name}
            </Text>

          </View>
          <View style={styles.partition1}></View>
          <View style={{ height: 40, flexDirection: 'row', padding: 10, backgroundColor: Color.greenback }}>
            <Text style={styles.LIstText3}>
              <Text style={{ fontSize: 14, fontFamily: 'Poppins-Bold' }}>Type Of Company:</Text>{' '}
            </Text>

            <Text style={styles.LIstText4}>
            {MY_INFO?.companyTypeInfo?.type}
            </Text>
          </View>
          <View style={styles.partition1}></View>
          <View style={{ height: 40, padding: 10, flexDirection: 'row', padding: 10, backgroundColor: Color.greenback }}>

            <Text style={styles.LIstText3}>Fiscal Year End:</Text>

            <Text style={styles.LIstText4}>
              {/* {infoData?.individualInfo?.birthDate} */}

            </Text>
          </View>
          <View style={styles.partition1}></View>
          <View style={{ height: 40, padding: 10, flexDirection: 'row', padding: 10, backgroundColor: Color.greenback }}>

            <Text style={styles.LIstText3}>Federal ID:</Text>

            <Text style={styles.LIstText4}>
            {MY_INFO?.companyInfo?.fein}
            </Text>
          </View>
          <View style={styles.partition1}></View>
          <View style={{ height: 40, padding: 10, flexDirection: 'row', backgroundColor: Color.greenback }}>
            <Text style={styles.LIstText4}>
              <Text style={{ fontSize: 14, fontFamily: 'Poppins-Bold' }}>State of Corporation:</Text>
            </Text>
            <Text style={styles.LIstText4}>
            {MY_INFO?.stateInfo?.stateName}
            </Text>
          </View>
          <View style={styles.partition1}></View>
          <View style={{ height: 40, padding: 10, flexDirection: 'row', backgroundColor: Color.greenback }}>

            <Text style={styles.LIstText3}>Citizenship:</Text>

            <Text style={styles.LIstText4}>
              {/* {ClientData.managerInfo.firstName}{' '}
              {ClientData.managerInfo.lastName} */}
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
            //  paddingBottom: 20,
          }}>
          <View
            style={{
              height: 40,

              width: wp(90),
              paddingLeft: 10,

              fontFamily: "Poppins-SemiBold",
              alignItems: "center",
              flexDirection: "row",
              backgroundColor: Color.SubheaderBack
            }}>
            <Image
              source={require('../Assets/ContactInformation.png')}
              style={{
                width: 15,
                height: 15,

                marginLeft: 5,
                marginRight: 5,
                //  borderRadius: 50,
                //alignSelf: 'center',
              }}
            />

            <Text style={{ margin: 5, fontSize: 14, fontFamily: 'Poppins-SemiBold', color: '#fff' }}>
              Contact Information

            </Text>
          </View>
          <View style={styles.partition1}></View>
          <View
            style={{
              //height: 45,
              backgroundColor: Color.greenback,
              padding: 10,
              flexDirection: "row",
              width: wp(90),
            }}>


            <Text style={styles.LIstText3}>Email:</Text>


            <Text
              style={styles.AddressText}
              onPress={() =>
                Linking.openURL(
                  `mailto:${MY_INFO?.officeInfo?.email}?subject=SendMail&body=Description`,
                )
              }
              title={MY_INFO?.officeInfo?.email}>

                {MY_INFO?.officeInfo?.email}
            </Text>


          </View>
          <View style={styles.partition1}></View>
          <View style={{ height: 40, padding: 10, flexDirection: 'row', backgroundColor: Color.greenback }}>
            <Text style={styles.LIstText3}>
              <Text style={{ fontSize: 14, fontFamily: 'Poppins-Bold' }}>Phone:</Text>{' '}
            </Text>

            <Text
              style={styles.LIstText4}
              onPress={() =>
                Linking.openURL(`tel:${MY_INFO.officeInfo?.phone}`)
              }>
              {' '}
              {MY_INFO.officeInfo?.phone}
            </Text>

          </View>
          <View style={styles.partition1}></View>
          <View style={{  flexDirection: 'row', padding: 10, backgroundColor: Color.greenback }}>
            <Text style={styles.LIstText3}>
              <Text style={{ fontSize: 14, fontFamily: 'Poppins-Bold' }}>Address:</Text>{' '}
            </Text>


            <Text style={styles.AddressText}>

            {MY_INFO.officeInfo?.address}
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
            //  paddingBottom: 20,
          }}>
          <View
            style={{
              height: 40,

              width: wp(90),
              paddingLeft: 10,

              fontFamily: "Poppins-SemiBold",
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: Color.SubheaderBack
            }}>
            <Image
              source={require('../Assets/InternalData.png')}
              style={{
                width: 15,
                height: 15,

                marginLeft: 5,
                marginRight: 5,
                //  borderRadius: 50,
                //alignSelf: 'center',
              }}
            />

            <Text style={{ margin: 5, fontSize: 14, fontFamily: 'Poppins-SemiBold', color: '#fff' }}>
              Internal Data

            </Text>
          </View>

          <View style={styles.partition1}></View>
          <View
            style={{
              height: 40,
              backgroundColor: Color.greenback,
              padding: 10,
              flexDirection: "row",
              width: wp(90),
            }}>


            <Text style={styles.LIstText3}>Office:</Text>


            <Text
              style={styles.LIstText4}
            >

                {MY_INFO.officeInfo?.name}

            </Text>


          </View>
          <View style={styles.partition1}></View>
          <View style={{ height: 40, padding: 10, flexDirection: 'row', backgroundColor: Color.greenback }}>
            <Text style={styles.LIstText3}>
              <Text style={{ fontSize: 14, fontFamily: 'Poppins-Bold' }}>Client Partner:</Text>{' '}
            </Text>

            <Text
              style={styles.LIstText4}
            >
               {partner?.firstName}  {partner?.lastName}
            </Text>

          </View>
          <View style={styles.partition1}></View>
          <View style={{ height: 40, flexDirection: 'row', padding: 10, backgroundColor: Color.greenback }}>
            <Text style={styles.LIstText3}>
              <Text style={{ fontSize: 14, fontFamily: 'Poppins-Bold' }}>Client Manager:</Text>{' '}
            </Text>


            <Text style={styles.LIstText4}>

            {manager?.firstName}  {manager?.lastName}
            </Text>
          </View>


        </View>

              
            </ScrollView>
        </View>
    );
};

export default MainClientDetails;

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
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        color: Color.headerIconBG,
      },
      LIstText3: {
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        color: Color.white,
        width: wp(40),
        // backgroundColor: "red"
      },
      LIstText4: {
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        color: Color.white,
        width: wp(40),
        //  backgroundColor: "red"
      },
      AddressText: {
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        color: Color.white,
        width: wp(45),
      //  backgroundColor: "red"
      },
      LIstText22: {
        fontSize: 12,
    // textAlign:"center",
        fontFamily: 'Poppins-SemiBold',
       // backgroundColor: Color.totalOrders,
        color: '#fff'
      },
      LIstText21: {
        color: '#fff',
        fontSize: 10,
    
        fontFamily: 'Poppins-SemiBold',
        backgroundColor: Color.statusActive
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
        height: 50,
        backgroundColor: '#fff',
        marginTop: 10,
        padding: 10,
        flexDirection: 'row',
        borderRadius: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    infoSec: {
        // backgroundColor: Color.darkGreen,
        backgroundColor: Color.HeaderBackground,
    
        borderRadius: 10,
        padding: 10,
        //height: 190,
        width: wp(90),
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
      },
      partition: {
        borderWidth: 0.3,
        borderColor: '#A7B1C2',
    
      },
      partition1: {
        borderWidth: 0.3,
        borderColor: Color.white
    
      },
});
