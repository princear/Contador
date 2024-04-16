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
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
 
 

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
import HeadTabs from './HeadTabs';

const CreateNewAction = () => {
  const width = Dimensions.get('window').width;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [showwhat1, setshowwhat1] = useState('Message');
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [error, setError] = useState('');

  const [selectedId, setSelectedId] = useState();
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [actionSubject, setActionSubject] = useState();
  const [actionMessage, setActionMessage] = useState();
  const [notes, setNotes] = useState();
  const [loader, setLoader] = useState(false);
  const [descriptionText, setDescriptionText] = useState('')
  const { MY_INFO } = useSelector(state => state.TaxLeafReducer);
  const { MANAGER_INFO } = useSelector(state => state.TaxLeafReducer);
  const { PARTNER_INFO } = useSelector(state => state.TaxLeafReducer);
  const { EDITOR_TEXT } = useSelector(state => state.TaxLeafReducer);
  const bgImage = require('../Assets/img/guest_shape.png');
  const [selectedOption, setSelectedOption] = useState(0);


  const staffview = MY_INFO.staffview;
  const officeInfo = MY_INFO.officeInfo;
  const managerInfo = MANAGER_INFO;
  const partnerInfo = PARTNER_INFO;
  const jsonData = MY_INFO.guestInfo;
  //const contentInsideDiv = EDITOR_TEXT?.replace(/<\/?div>/g, '');
  const contentInsideDiv = EDITOR_TEXT;
  console.log(contentInsideDiv, 'contentInsideDivcontentInsideDivcontentInsideDivcontentInsideDiv')

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

  var radio_props = [
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

    if (handleValidation()) {
      // Proceed with your form submission or other actions
   
    let data = {
      "actionTime": "2023-10-20T05:05:54.895Z",
      "actionModel": {
        "createdOffice": MY_INFO?.officeInfo?.id,
        "assignTo": 1,
        "clientId": jsonData?.client,
        "subject": actionSubject,
        "message": descriptionText,
        "priority": parseInt(value, 10),
        "status": parseInt(jsonData?.status, 10),
        "addedByUser": MY_INFO?.staffview?.id,
        "dueDate": moment(date).format('YYYY-MM-DD'),
        "isCreatedFromAction": "n",
        "clientIdForGuest": jsonData?.clientId.toString(),
        "assignWhom": selectedOption == 1 ? 'Manager' : 'Partner'
      },
      "actionStaffModel": {
        "staffId": selectedId == 1 ? managerInfo.id : partnerInfo?.id
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

    
    console.log(data, 'datatatatatatatdatatatatatatatdatatatatatatat', data1)
    dispatch(RequestSubmit(data, navigation));
    console.log('Form submitted with value:', value);
  }


  };

  const handleValidation = () => {
    if (!value) {
      setError('Please select an option');
      return false;
    }
    setError('');
    return true;
  };

  const handleDropdownChange = (item) => {
    console.log(item,'IIIII')
    setValue(item.value);
    setIsFocus(false);
    setError(''); // Clear the error message when a value is selected
  };

  const handleBlur = () => {
    setIsFocus(false);
    handleValidation(); // Validate on blur
  };


  const CustomRadioButton = ({ label, selected, onPress, selectedInnerColor, unselectedInnerColor }) => {
    return (
      <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            width: 15,
            height: 15,
            borderRadius: 10,
            borderWidth: 3,
            backgroundColor:selected ? Color.green: '#fff' ,
            borderColor: '#fff',
           
          //  backgroundColor: selected ? selectedInnerColor : 'transparent',
            marginRight: 10,
          }}
        />
        <Text style={{color:Color.white,fontSize:10,fontFamily:'Poppins-SemiBold'}}>{label}</Text>
      </TouchableOpacity>
    );
  };

  const handleRadioChange = (value) => {
    setSelectedOption(value);
  };
 

  console.log(selectedOption)

  return (
    <View style={styles.container}>
      <Loader flag={loader} />
      <View

        style={{ backgroundColor: Color.bgColor }}
      >
        <ScrollView>
          <HeadTabs/>
          <Text style={styles.heading}>Create New Action</Text>

          <View style={styles.slideContainerFrom}>
            <Text style={{color:Color.white,fontFamily:'Poppins-SemiBold', textAlign: 'center', fontSize: 16, marginTop: 10 }}>
              From
            </Text>
          
           
            <TextInput
              placeholder="First Name"
              style={[styles.input]}
              editable={false}
              value={staffview?.firstName + ' ' + staffview?.lastName}
            />
          
            <TextInput
              placeholder="First Name"
              style={[styles.input]}
              editable={false}
              value={officeInfo?.name}
            />
           
        
          </View>
          <View style={styles.slideContainerTo}>
            <Text style={{color:Color.white,fontFamily:'Poppins-SemiBold', textAlign: 'center', fontSize: 16, marginTop: 10 }}>
              To
            </Text>
            <View style={styles.part}></View>
            <View
              style={{
               width:wp(80),
                alignSelf: 'center',
                //alignItems: 'center',
                justifyContent: 'center',
              }}>


              
{/* <RadioForm
        radio_props={radio_props}
        initial={0}
        onPress={(value) => {
          setSelectedOption(value);
        }}
       // labelColor={'#fff'}
        buttonColor={'#fff'}
        buttonSize={10}
        selectedButtonColor={'#fff'}
        buttonInnerColor={'#00f'} 
        labelStyle={{fontSize: 12, color: '#fff'}}
      /> */}

      <CustomRadioButton
        label={   managerInfo?.firstName +
          ' ' +
          managerInfo?.lastName 
          //+
        //  ' ' +
        //  '(Manager)'
        }
        selected={selectedOption === 1}
        onPress={() => handleRadioChange(1)}
        selectedInnerColor={Color.green}    // Set the inner color for the selected button
        unselectedInnerColor="#fff"  // Set the inner color for the unselected button
      />
      <View style={{height:5}}></View>

      { managerInfo?.firstName == partnerInfo?.firstName ? 
      
      null
      :
      <CustomRadioButton
      label={ partnerInfo?.firstName +
        ' ' +
        partnerInfo?.lastName 
        //+
        //' ' +
        //'(Partner)'
      }
      selected={selectedOption === 2}
      onPress={() => handleRadioChange(2)}
      selectedInnerColor={Color.green}  // Set the inner color for the selected button
      unselectedInnerColor="#fff"
      // Set the inner color for the unselected button
    />
      
      }
      
    
             
            </View>
          </View>

          <View style={{height:hp(28),paddingTop:10, width: wp(90),backgroundColor:"#c3d2d7", alignSelf: 'center' }}>
           
            <TextInput
              onChangeText={(text) => setActionSubject(text)}
              // placeholder='First Name'
              placeholder="Action Subject"
              style={[styles.input]}
            />

            <View style={styles.slideContainerEdit}>
           

           <TextInput
             numberOfLines={5}
             multiline={true}
              placeholder="Action Message"
             // placeholderTextColor={'lightgrey'}
             style={{color:Color.HeaderBackground,fontFamily:'Poppins-SemiBold',   fontSize:12,
               paddingTop: 10, textAlignVertical: 'top' }}
             value={descriptionText}
             onChangeText={text => {
               setDescriptionText(text);
             }}
           />
        
         </View>

          </View>
       
         
          <View style={styles.slideContainer}>
            <View style={{marginTop:20}}>
             
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={data1}
                maxHeight={200}
                itemTextStyle={{ fontSize: 12, fontFamily: 'Poppins-SemiBold', color: '#5a5a5a' }} // Set the font size and other styles for dropdown items

                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Priority' : '...'}
                value={value}
                onFocus={() => setIsFocus(true)}
              //  onBlur={() => setIsFocus(false)}
                onBlur={handleBlur}
                onChange={ (item) => handleDropdownChange(item)}
              />


              

               {error ? <Text style={styles.errorText}>{error}</Text> : null}
            
              <TouchableOpacity
                style={styles.btn}
                onPress={() => setDatePicker(true)}>
                  <View style={{flexDirection:"row",justifyContent:'space-between',width:wp(75)}}> 
                  <Text style={{ fontFamily:'Poppins-SemiBold', color: '#fff', fontSize: 12 }}>
                  Due Date
                  </Text>
                {date ? (
                  <Text style={{ fontFamily:'Poppins-SemiBold', color: '#fff', fontSize: 12 }}>
                    {moment(date, 'MM-DD-YYYY').format('ddd,DD MMM YYYY')}
                  </Text>
                ) : (
                  <Text style={{ color: '#fff', fontSize: 15 }}>Select</Text>
                )}
                  </View>
                   
              </TouchableOpacity>

              {datePicker && (
                <DateTimePicker
                  value={date}
                  mode={'date'}
                  display={Platform.OS === 'ios' ? "default" : 'default'}
                  //   is24Hour={false}
                  onChange={onDateSelected}
                 style={styles.datePicker}
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
              justifyContent: 'space-between',
              marginTop: 10,
              width:wp(88),
             //  backgroundColor:"red",
              alignSelf:'center'
            }}>
            <TouchableOpacity
              style={styles.btnPrev}
            // onPress={() => { onPageChange(4) }}
            >
             <Image source={require('../Assets/img/icons/close.png')} style={{ width: 25, height: 25,}} />

              <Text style={{ color:'#5a5a5a',fontFamily:'Poppins-SemiBold',fontSize:12,marginLeft: 5 }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSubmit}
              onPress={() => { onSubmit() }}
            >
               <Image source={require('../Assets/img/icons/tickWhite.png')} style={{ width: 25, height: 25,  }} />

              <Text style={{ color: '#fff',fontFamily:'Poppins-SemiBold',fontSize:12, marginLeft: 5 }}>Submit</Text>
             
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
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    // maxWidth:'80%',
    color: Color.headerIconBG,
    // height:40,
    marginTop: 0,
    marginLeft: 20,
    // fontWeight: '600',
    // textAlign: 'center',
  },
  part: {
    borderWidth: 0.3,
    borderColor: '#aaca79',
    margin: 5,
    marginBottom:10,
    width: wp(80),
    alignSelf: 'center',
  },
  slideContainer: {
    backgroundColor: Color.headerIconBG,
    width: wp(90),
    justifyContent: 'center',
    alignSelf: 'center',
  
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
  
   // marginTop: 20,
    // width:'62%'
  },
  slideContainerEdit: {
    backgroundColor: '#fff',
    width: wp(80),
    justifyContent: 'center',
    alignSelf: 'center',
    // height: 220,
    opacity: 2,
    paddingBottom: 20,
    borderRadius: 10,
    marginTop: 10,
    // width:'62%'
  },
  slideContainerFrom: {
    backgroundColor: Color.HeaderBackground,
    width: wp(90),
    justifyContent: 'center',
    alignSelf: 'center',
    /// height: 420,
    opacity: 2,
    paddingBottom: 20,
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
  
    marginTop: 20,
    // width:'62%'
  },
  slideContainerTo: {
    backgroundColor: Color.green,
    width: wp(90),
    justifyContent: 'center',
    alignSelf: 'center',
    /// height: 420,
    opacity: 2,
    paddingBottom: 20,
    //borderRadius: 10,
   // marginTop: 20,
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
  // btn: {
  //   width: wp(40),
  //   alignSelf: 'center',
  //   justifyContent: 'center',
  //   flexDirection: 'row',
  //   marginBottom: 30,
  //   marginTop: 10,
  //   backgroundColor: 'red',
  // //  backgroundColor: '#2F4050',
  //   borderRadius: 10,
  //   padding: 10,
  //   alignItems: 'center',
  // },
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
    height: hp(5),
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
  errorText: {
    color: 'red',
    fontFamily:'Poppins-SemiBold',
    fontSize:12,
    padding:5,
    marginLeft: 15,
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
    fontFamily:'Poppins-SemiBold'
  },
  selectedTextStyle: {
    fontSize: 12,
    fontFamily:'Poppins-SemiBold'
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
    height: hp(5),
    margin: 5,
   // borderWidth: 1,
    borderRadius: 10,
    fontSize:12,
    width: wp(80),
    
    fontFamily:"Poppins-SemiBold",
    color:Color.HeaderBackground,
    backgroundColor: '#fff',
    alignSelf: 'center',
    borderColor: 'gray',
  },
  btn: {
    width: wp(80),
    height: hp(5),
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 30,
    marginTop: 10,
    backgroundColor: '#8AB645',
   // backgroundColor: 'red',
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
    width: wp(40),
    height: hp(5),
    // alignSelf: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 30,
    justifyContent:"center",
    marginTop: 10,
    backgroundColor: Color.green,
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
   // marginRight: 10,
    marginLeft: 10,
  },
  btnPrev: {
    width: wp(40),
    height: hp(5),
    // alignSelf: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 30,
    justifyContent:"center",
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    // marginRight: 80
  },
});
