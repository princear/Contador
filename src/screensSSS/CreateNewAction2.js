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
  ImageBackground
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import RadioGroup from 'react-native-radio-buttons-group';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { useIsFocused, useNavigation } from '@react-navigation/native';

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
import Editor from './editor';
import { RequestSubmit, ManagerInfo } from '../Redux/Actions/TaxLeaf';
import { Color } from '../Style';
import { Loader } from '../Component/Loader';

const CreateNewAction = () => {
  const width = Dimensions.get('window').width;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [showwhat1, setshowwhat1] = useState('Message');
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [actionSubject, setActionSubject] = useState();
  const [actionMessage, setActionMessage] = useState();
  const [notes, setNotes] = useState();
  const [loader, setLoader] = useState(false);

  const { MY_INFO } = useSelector(state => state.TaxLeafReducer);
  const { MANAGER_INFO } = useSelector(state => state.TaxLeafReducer);
  const bgImage = require('../Assets/img/guest_shape.png');

  const staffview = MY_INFO.staffview;
  const officeInfo = MY_INFO.officeInfo;
  const managerInfo = MANAGER_INFO.managerInfo;
  const partnerInfo = MANAGER_INFO.partnerInfo;
  const jsonData = MY_INFO.guestInfo;

  console.log(MY_INFO, 'MY_INFO')

  const showwhatfunc1 = data => {
    setshowwhat1(data);
    console.log(data);
  };
  console.log(date, 'date');
  const showDatePicker = () => {
    setDatePicker(true);
  };
  console.log(selectedId, 'selectedIdRadio')
  console.log(MANAGER_INFO, 'MANAGER_INFO')
  console.log(actionSubject, 'actionSubject')
  console.log(value, 'valueIMP')
  console.log(date, 'date')

  const onDateSelected = (event, value) => {
    setDate(value);
    setDatePicker(false);
  };
  const data1 = [
    { label: 'Urgent', value: '1' },
    { label: 'Important', value: '2' },
    { label: 'Regular', value: '3' },

  ];
  const radioButtons = useMemo(
    () => [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        label:
          managerInfo?.firstName +
          ' ' +
          managerInfo?.lastName +
          ' ' +
          '(Manager)',
        value: 'option1',
      },
      {
        id: '2',
        label:
          partnerInfo?.firstName +
          ' ' +
          partnerInfo?.lastName +
          ' ' +
          '(Partner)',
        value: 'option2',
      },
    ],
    [],
  );
  useEffect(() => {
    dispatch(ManagerInfo(jsonData?.clientId, jsonData?.clientType, navigation));

  }, [])

  const onSubmit = () => {
    let data = {
      "actionTime": "2023-10-20T05:05:54.895Z",
      "actionModel": {
        "createdOffice": 17,
        "assignTo": 1,
        "clientId": jsonData?.client,
        "subject": actionSubject,
        "message": "This Is Test Meassage",
        "priority": value,
        "status": jsonData?.status,
        "addedByUser": 973,
        "dueDate": moment(date).format('YYYY-MM-DD'),
        "isCreatedFromAction": "n",
        "clientIdForGuest": "38419",
        "assignWhom": selectedId == 1 ? 'Manager' : 'Partner'
      },
      "actionStaffModel": {
        "staffId": jsonData?.staffId
      },
      "actionClientListModel": {
      },
      "actionNoteListModel": [
        {
          "note": "E"
        }, {
          "note": "F"
        }
      ]
    }

    // let data = {
    //   "actionTime": "2023-10-20T05:05:54.895Z",
    //   "actionModel": {
    //     "createdOffice": 17,
    //     "assignTo": 1,
    //     "clientId": jsonData?.client,
    //     "subject": actionSubject,
    //     "message": "Who Are You?",
    //     "priority": value,
    //     "status": jsonData?.status,
    //     "addedByUser": MY_INFO?.individualInfo?.addedByUser,
    //     "dueDate": moment(date).format('YYYY-MM-DD'),
    //     "isCreatedFromAction": "n",
    //     "clientIdForGuest": jsonData?.clientId.toString(),
    //     "assignWhom": selectedId == 1 ? 'Manager' : 'Partner'
    //   },
    //   "actionStaffModel": {
    //     "staffId": jsonData?.staffId
    //   },
    //   "actionClientListModel": {
    //   },
    //   "actionNoteListModel": [
    //     {
    //       "note": "E"
    //     }, {
    //       "note": "F"
    //     }
    //   ]
    // }
    console.log(data, 'datatatatatatat')
    dispatch(RequestSubmit(data, navigation));


  };
  return (
    <View style={styles.container}>
      <Loader flag={loader} />
      <View

        style={{ backgroundColor: '#d5e3e5' }}
      >
        <ScrollView>
          <Text style={styles.heading}>Create New Action</Text>

          <View style={styles.slideContainerFrom}>
            <Text style={{ textAlign: 'center', fontSize: 18, marginTop: 10 }}>
              From
            </Text>
            <View style={styles.part}></View>
            <Text
              style={{
                alignSelf: 'flex-start',
                padding: 5,
                color: '#000',
                marginLeft: 12,
              }}>
              Name
            </Text>
            <TextInput
              placeholder="First Name"
              style={[styles.input]}
              editable={false}
              value={staffview?.firstName + ' ' + staffview?.lastName}
            />
            <Text
              style={{
                alignSelf: 'flex-start',
                padding: 5,
                color: '#000',
                marginLeft: 12,
              }}>
              My Office *
            </Text>
            <TextInput
              placeholder="First Name"
              style={[styles.input]}
              editable={false}
              value={officeInfo?.name}
            />
            {/* <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={data1}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select item' : '...'}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}
         
          /> */}
          </View>
          <View style={styles.slideContainerTo}>
            <Text style={{ textAlign: 'center', fontSize: 18, marginTop: 10 }}>
              To
            </Text>
            <View style={styles.part}></View>
            <View
              style={{
                alignItems: 'flex-start',
                //alignSelf: 'center',
                //alignItems: 'center',
                //justifyContent: 'center',
              }}>
              <RadioGroup
                radioButtons={radioButtons}
                onPress={setSelectedId}
                selectedId={selectedId}
              />
            </View>
          </View>

          <View style={{ width: '95%', alignSelf: 'center' }}>
            <Text
              style={{
                alignSelf: 'flex-start',
                padding: 5,
                color: '#000',
                marginLeft: 12,
                marginTop: 10,
              }}>
              Action Subject *
            </Text>
            <TextInput
              onChangeText={(text) => setActionSubject(text)}
              // placeholder='First Name'
              style={[styles.input]}
            />
          </View>
          <View style={styles.slideContainerEdit}>
            <Text style={{ alignSelf: 'flex-start', padding: 5, color: '#000' }}>
              Action Message *
            </Text>
            <Editor />
          </View>
          <View style={styles.slideContainer}>
            <View style={{}}>
              <Text
                style={{
                  alignSelf: 'flex-start',
                  padding: 5,
                  color: '#000',
                  marginLeft: 12,
                  marginTop: 10

                }}>
                Priority *
              </Text>
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={data1}
                maxHeight={200}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select item' : '...'}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
              //   renderLeftIcon={() => (
              //     <AntDesign
              //       style={styles.icon}
              //       color={isFocus ? 'blue' : 'black'}
              //       name="Safety"
              //       size={20}
              //     />
              //   )}
              />
              <Text
                style={{
                  alignSelf: 'flex-start',
                  padding: 5,
                  color: '#000',
                  marginLeft: 12,
                  marginTop: 10
                }}>
                Due Date
              </Text>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => setDatePicker(true)}>
                {date ? (
                  <Text style={{ color: '#fff', fontSize: 15 }}>
                    {moment(date, 'MM-DD-YYYY').format('ddd,DD MMM YYYY')}
                  </Text>
                ) : (
                  <Text style={{ color: '#fff', fontSize: 15 }}>Select</Text>
                )}
              </TouchableOpacity>

              {datePicker && (
                <DateTimePicker
                  value={date}
                  mode={'date'}
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  //   is24Hour={false}
                  onChange={onDateSelected}
                //   style={styles.datePicker}
                />
              )}

              {/* <Text
              style={{
                alignSelf: 'flex-start',
                padding: 5,
                color: '#000',
                marginLeft: 12,
              }}>
              Notes
            </Text>
            <TextInput
              multiline={true}
              numberOfLines={6}
              onChangeText={(text) => setNotes(text)}
              style={styles.textArea}
            /> */}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: 40,
            }}>
            <TouchableOpacity
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
              <Text style={{ color: '#fff' }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSubmit}
              onPress={() => { onSubmit() }}
            >
              <Text style={{ color: '#fff', marginLeft: 10 }}>Submit</Text>
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
        </ScrollView>
      </View>
    </View>
  );
};

export default CreateNewAction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    // maxWidth:'80%',
    color: '#676A6C',
    // height:40,
    marginTop: 20,
    marginLeft: 20,
    // fontWeight: '600',
    // textAlign: 'center',
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
  slideContainerEdit: {
    backgroundColor: '#fff',
    width: wp(90),
    justifyContent: 'center',
    alignSelf: 'center',
    // height: 220,
    opacity: 2,
    paddingBottom: 20,
    borderRadius: 10,
    marginTop: 20,
    // width:'62%'
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
    width: wp(28),
    height: hp(7),
    // alignSelf: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 30,
    marginTop: 10,
    backgroundColor: 'purple',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 10,
  },
  btnPrev: {
    width: wp(28),
    height: hp(7),
    // alignSelf: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 30,
    marginTop: 10,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    // marginRight: 80
  },
});
