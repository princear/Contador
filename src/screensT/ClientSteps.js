import { StyleSheet,FlatList, Button,
    Text, View, ScrollView, TextInput,Platform, TouchableOpacity,KeyboardAvoidingView, ImageBackground, Image, SafeAreaView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react';
import StepIndicator from 'react-native-step-indicator';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Loader } from '../Component/Loader';
// import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/EvilIcons'
import Icon2 from 'react-native-vector-icons/Feather'
import Icon3 from 'react-native-vector-icons/FontAwesome'
import CheckBox from '@react-native-community/checkbox';
import { Color } from '../Style';
import { Dropdown } from 'react-native-element-dropdown';
import { GetInterestList,GetProfessionList,ConfirmClientSetup } from '../Redux/Actions/ClientSetUp'
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import {
    clientInfo,
    ClientInfoList,
    client_Detail,
    ManagerInfo
  } from '../Redux/Actions/TaxLeaf';


const ClientSteps = () => {
    const labels = ["ABOUT YOURSELF", "REFERRAL SOURCE", "PAYMENT METHOD", "ASSOCIATIONS", "CURRENT PROFESSION", "ARE YOU INTRESTED IN ANY OF THE BELOW"];
    const labels1 = ["ABOUT YOURSELF", " ", " ", "  ", " ", " "];
    const labels2 = [" ", "REFERRAL SOURCE", " ", "  ", " ", " "];
    const labels3 = ["", " ", "PAYMENT METHOD", "  ", " ", " "];
    const labels4 = ["", " ", " ", "ASSOCIATIONS", " ", " "];
    const labels5 = ["", " ", " ", "  ", "CURRENT PROFESSION ", " "];
    const labels6 = ["", " ", " ", "  ", " ", "INTERESTS"];
    const [position, setPosition] = useState(0)
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { LOGIN_DATA } = useSelector(state => state.TaxLeafReducer);
    const { INTEREST_LIST } = useSelector(state => state.ClientSetupReducer);
    const { PROFESSION_LIST } = useSelector(state => state.ClientSetupReducer);
    const { MY_INFO } = useSelector(state => state.TaxLeafReducer);
    const { CLIENT_LIST } = useSelector(state => state.TaxLeafReducer);
    console.log(position, 'position')
    const [selectedOption, setSelectedOption] = useState(0);
    const [associationOption, setAssociationOption] = useState(0);
    const [professionOption, setProfessionOption] = useState(0);
    const [InterestOption, setInterestOption] = useState(0);
    const [profession, setProffession] = useState(0);
    const [interest, setInterest] = useState(0);
 



    const [checkbox1, setCheckbox1] = useState(true);
    const [checkbox2, setCheckbox2] = useState(false);    
  


    const handleCheckbox = (checkbox) => {
        if (checkbox === 'checkbox1') {
            setCheckbox1(true);
            setCheckbox2(false);
        } else if (checkbox === 'checkbox2') {
            setCheckbox1(false);
            setCheckbox2(true);
        }
      };
   
      

    console.log(CLIENT_LIST,'CLIENT_LISTCLIENT_LISTCLIENT_LISTCLIENT_LISTCLIENT_LISTCLIENT_LISTCLIENT_LIST')
   
    const [selectedProfessions, setSelectedProfessions] = useState('');
    const [selectedInterest, setSelectedInterest] = useState([]);
    const [interestList, setInterestList] = useState([])
    const [professionList, setProfessionList] = useState([])
    const [isChecked, setChecked] = useState(false);
    const [firstname, setFirstName] = useState(false);
    const [lastname, setLastName] = useState(false);
    const [email, setEmail] = useState(false);
    const [mobile, setMobile] = useState(false);
    const [whatnumber, setWhatNumber] = useState(false);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [isProfessionChecked, setIsProfessionChecked] = useState(false);
    const [isInterestChecked, setIsInterestChecked] = useState(false);
    const [value, setValue] = useState(null);
    const [REFERREDBYSOURCE, setREFERREDBYSOURCE] = useState('');
    const [otherAsso, setOtherAsso] = useState('');
  
    const [bankname, setBankName] = useState(false);
    const [accountnum, setAccountNum] = useState(false);
    const [currentac, setCurrentAc] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const [routingnum, setRoutingNum] = useState(false);
    const [infoData, setInfoData] = useState({});
    const jsonData = MY_INFO?.guestInfo;
    const staffview = MY_INFO?.staffview;
    const officeInfo = MY_INFO?.officeInfo;
    
    
    console.log(jsonData?.clientId,'kkkkkkk')

    const data1 = [
        { label: 'Saving Account', value: 'Saving Account' },
        { label: 'Current Account', value: 'Current Account' },
       
    
      ];

    const customStyles = {
        stepIndicatorSize: 30,
        currentStepIndicatorSize: 65,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 0,
        stepStrokeCurrentColor: '#ffff',
        stepStrokeWidth: 0,
        stepStrokeFinishedColor: '#fffff',
        stepStrokeUnFinishedColor: '#fffff',
        separatorFinishedColor: '#2F4050',
        separatorUnFinishedColor: '#aaaaaa',
        stepIndicatorFinishedColor: '#3d8087',
        stepIndicatorUnFinishedColor: '#3d8087',
        stepIndicatorCurrentColor:Color.green,
        stepIndicatorLabelFontSize: 14,
        currentStepIndicatorLabelFontSize: 12,
        stepIndicatorLabelCurrentColor: '#fffff',
        stepIndicatorLabelFinishedColor: '#ffffff',
        stepIndicatorLabelUnFinishedColor: '#ffffff',
        labelColor: '#fff',
        labelSize: 8,
    
        currentStepLabelColor: Color.darkGreen,
        labelFontFamily	:'Poppins-Bold'
    }


    useEffect(() => {
        setLoader(true);

        dispatch(GetInterestList( navigation))
        dispatch(GetProfessionList( navigation))
         
            .finally(() => {
                setLoader(false);
            });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
          try {
            setLoader(true);
    
            const [myInfoResponse, clientListResponse] = await Promise.all([
                dispatch(clientInfo(LOGIN_DATA, navigation)),
            
              dispatch(ClientInfoList(jsonData?.clientId, jsonData?.clientType, navigation)),
            ]);
    
            setInfoData(clientListResponse);
            setLoader(false);
          } catch (error) {
            console.error('Error fetching data:', error);
            setLoader(false);
          }
        };
    
        fetchData();
      }, [jsonData?.clientId, jsonData?.clientType,]);

    useEffect(() => {
        // setLoader(true);
        setInfoData(CLIENT_LIST);
        setFirstName(staffview?.firstName)
        setLastName(staffview?.lastName)
        setEmail(staffview?.user)
        setMobile(staffview?.phone)
        setBankName(officeInfo?.bankName)
        setAccountNum(officeInfo?.accNum)
        setRoutingNum(officeInfo?.rountingNum)
       
        // setTimeout(() => {
        //   setLoader(false);
        // }, 2000);
      }, [MY_INFO, CLIENT_LIST]);


      let associationList;
     console.log(infoData,'infodatainfodatainfodatainfodatainfodata')
    if (infoData && Array.isArray(infoData)) {
        // Assuming infoData has a property called "data" that contains an array
        const dataArray = infoData.map(item => item.subClientInfo);
      
        // Now you can use map and join on dataArray
      associationList = dataArray.map(item => item.subClientPracticeId).join(', ');
      

      }

    //   useEffect(() => {
    //     setLoader(true);

    //     dispatch(clientInfo(LOGIN_DATA, navigation))
          
           
    //         .then(() => dispatch(ManagerInfo(jsonData?.clientId, jsonData?.clientType, navigation)))
    //         .finally(() => {
    //             setLoader(false);
    //         });
    // }, [LOGIN_DATA, jsonData?.clientId, jsonData?.clientType,]);

   
    
    useEffect(() => {
        setInterestList(INTEREST_LIST);
        setProfessionList(PROFESSION_LIST);
       
    }, [INTEREST_LIST,PROFESSION_LIST]);

   const onPageChange1 = (position) => {
    if(firstname == "" || lastname == "" || email == "" || mobile == "" || whatnumber == "")
    {
        Alert.alert('Please fill in all required fields')
    }
    else {
        setPosition(position);
    }

   }

   const onPageChange2 = (position) => {
    if(selectedOption == 0 ){
        Alert.alert('Kindly select one from them')
    }
    else {
        setPosition(position);
    }

   }

   const onPageChange3 = (position) => {
    if(bankname == "" || accountnum == "" || routingnum == "" || value == null ){
        Alert.alert('Please fill in all required fields')
    }
    else {
        setPosition(position);
    }

   }

   const onPageChange4 = (position) => {
     if(associationOption == 0 ){
        Alert.alert('Kindly select one from them')
    }
    else {
        setPosition(position);
    }

   }

   const onPageChange5 = (position) => {
    if (selectedProfessions === '' && isProfessionChecked === false) {
        console.log(selectedProfessions, isProfessionChecked); 
        Alert.alert('Kindly select one from them');
    }
       else if (selectedProfessions === '' && isProfessionChecked === true) {
            //console.log(selectedProfessions, isProfessionChecked);
           // Alert.alert('Kindly select one from them111');
            setPosition(position);
          }    
      else {
        setPosition(position);
      }

   }

   

   

   

   


   
    const onPageChange = (position) => {
        console.log(position,'HHHHHHHHHH')
        setPosition(position);
    }


    //console.log(professionList,'WWWWWWWWWWWWWWWWWWWWW')

   // console.log(associationList,'1111111111111');

    //console.log(position, 'position')

    const icons = [
        require("../Assets/img/icons/userGreen.png"),
        require("../Assets/img/icons/connectUser.png"),
        require("../Assets/img/icons/dollarGreen.png"),
        require("../Assets/img/icons/handShake.png"),
        require("../Assets/img/icons/profGreen.png"),
        require("../Assets/img/icons/mind.png")

    ];
    const bgImage = require("../Assets/img/stepsBG.png")
    // let iconNm = require('../Assets/img/icons/msg.png');
    

    const handleToggleCheckbox = (professionName) => {
        if (selectedProfessions.includes(professionName)) {
          // If already selected, remove from the list
          const updatedProfessions = selectedProfessions
            .split(', ')
            .filter((prof) => prof !== professionName)
            .join(', ');
    
          setSelectedProfessions(updatedProfessions);
        } else {
          // If not selected, add to the list
          const updatedProfessions =
            selectedProfessions === ''
              ? professionName
              : `${selectedProfessions}, ${professionName}`;
    
          setSelectedProfessions(updatedProfessions);
        }
      };
    

      console.log(selectedProfessions,'1111111111111')


    //   const handleInterestCheckbox = (professionName) => {
    //     if (selectedInterest.includes(professionName)) {
    //       // If already selected, remove from the list
    //       const updatedProfessions = selectedInterest
    //         .split(', ')
    //         .filter((prof) => prof !== professionName)
    //         .join(', ');
    
    //       setSelectedInterest(updatedProfessions);
    //     } else {
    //       // If not selected, add to the list
    //       const updatedProfessions =
    //       selectedInterest === ''
    //           ? professionName
    //           : `${selectedInterest}, ${professionName}`;
    
    //           setSelectedInterest(updatedProfessions);
    //     }
    //   };

    const CustomRadioButton = ({ label, selected, onPress, selectedInnerColor, unselectedInnerColor }) => {
        return (
          <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center',margin:10 }}>
            <View
              style={{
                width: 15,
                height: 15,
                borderRadius: 10,
                borderWidth: 3,
                backgroundColor:selected ? Color.headerIconBG: '#fff',
                borderColor: Color.headerIconBG,
               //  backgroundColor: selected ? selectedInnerColor : 'transparent',
                marginRight: 5,
              }}
            />
            <Text style={{color:Color.headerIconBG,fontSize:14,fontFamily:'Poppins-SemiBold'}}>{label}</Text>
          </TouchableOpacity>
        );
      };
      
      
      const handleRadioChange = (value) => {
        setSelectedOption(value);
      };

      
      const handleAssociationChange = (value) => {
        setAssociationOption(value);
      };
        
      const handleProfession = (value) => {
        setProfessionOption(value);
      };

      console.log(professionOption,'KKKKKKKKKKKK')


     

    const handleInterestCheckbox = (interestId) => {
        if (selectedInterest.includes(interestId)) {
          // If already selected, remove from the list
          const updatedInterests = selectedInterest.filter((id) => id !== interestId);
          setSelectedInterest(updatedInterests);
        } else {
          // If not selected, add to the list
          const updatedInterests = [...selectedInterest, interestId];
          setSelectedInterest(updatedInterests);
        }
      };

      const interestedAreas = selectedInterest.join(',');

    
      console.log(interestedAreas,'selectedInterestselectedInterestselectedInterest')
    //  console.log(REFERREDBYSOURCE,'selectedInterestselectedInterestselectedInterest')

    
  const FinalConfirm = () => {
   
    console.log(selectedInterest.length,'KKKKKK')

    if (selectedInterest.length === 0 && isInterestChecked === false) {
        console.log(selectedInterest, isInterestChecked); 
        Alert.alert('Kindly select one from them');
    }

       else if (selectedInterest.length === 0 && isInterestChecked === true) {
        console.log(selectedInterest, isInterestChecked); 
        setLoader(true)
            //console.log(selectedProfessions, isProfessionChecked);
           // Alert.alert('Kindly select one from them111');
            setPosition(position);
            console.log(jsonData?.staffId,jsonData?.client,jsonData?.clientType,
                firstname,lastname,email,mobile,whatnumber,selectedOption == 1 ? "website" : REFERREDBYSOURCE,bankname,accountnum,value,routingnum,
                associationOption == 1 ? associationList : otherAsso,
                professionOption != 2 ? selectedProfessions : profession,
                InterestOption != 2 ? interestedAreas : interest
                )
        
        
             dispatch(ConfirmClientSetup(
                jsonData?.staffId,jsonData?.clientId,jsonData?.clientType,
                firstname,lastname,email,mobile,whatnumber,selectedOption == 1 ? "website" : REFERREDBYSOURCE,bankname,accountnum,value,routingnum,
                associationOption == 1 ? associationList : otherAsso,
                professionOption != 2 ? selectedProfessions : profession,
                InterestOption != 2 ? interestedAreas : interest,
                navigation
        
             ))   
             setLoader(false)
          //  Alert.alert('rrrrrrrr')
          }    
      else {
        console.log(typeof(selectedInterest), isInterestChecked); 

      //  Alert.alert('llllllll')
        setPosition(position);
setLoader(true)
        console.log(jsonData?.staffId,jsonData?.client,jsonData?.clientType,
            firstname,lastname,email,mobile,whatnumber,selectedOption == 1 ? "website" : REFERREDBYSOURCE,bankname,accountnum,value,routingnum,
            associationOption == 1 ? associationList : otherAsso,
            professionOption != 2 ? selectedProfessions : profession,
            InterestOption != 2 ? interestedAreas : interest,
          
            )
    
    
         dispatch(ConfirmClientSetup(
            jsonData?.staffId,jsonData?.clientId,jsonData?.clientType,
            firstname,lastname,email,mobile,whatnumber,selectedOption == 1 ? "website" : REFERREDBYSOURCE,bankname,accountnum,value,routingnum,
            associationOption == 1 ? associationList : otherAsso,
            professionOption != 2 ? selectedProfessions : profession,
            InterestOption != 2 ? interestedAreas : interest,  navigation
    
         ))  
    
            setLoader(false)

   // console.log('LLLL')
   

    }
} 


const handleCheckboxChange = () => {
    // Copy or remove the phone number from input1 to input2 based on checkbox state
    if (isCheckboxChecked) {
        setWhatNumber('');
    } else {
     
      setWhatNumber(mobile);
    }
  };
console.log(isProfessionChecked)
  const handleProfessionChange = () => {
    // Copy or remove the phone number from input1 to input2 based on checkbox state
    if (isProfessionChecked) {
        setProfessionOption(0);
    } else {
      
      setProfessionOption(2);
    }
  };


  const handleInterestChange = () => {
    // Copy or remove the phone number from input1 to input2 based on checkbox state
    if (isInterestChecked) {
        setInterestOption(0);
    } else {
      
      setInterestOption(2);
    }
  };




    const renderStepIndicator = params => {
       // console.log(params,'pppppp')

        return (
            

            <View style={styles.customStep}>
                  <Loader flag={loader} />
                {
                    params.position == 0 && params.stepStatus == "current" ?
                        <Image source={icons[params?.position]} style={{ width: 60, height: 60 }} />
                        :
                        params.position == 1 && params.stepStatus == "current" ?
                        <Image source={icons[params?.position]} style={{ width: 60, height: 60 }} />
                        :
                        params.position == 2 && params.stepStatus == "current" ?
                        <Image source={icons[params?.position]} style={{ width: 60, height: 60 }} />
                        :
                        params.position == 3 && params.stepStatus == "current" ?
                        <Image source={icons[params?.position]} style={{ width: 60, height: 60 }} />
                        :
                        params.position == 4 && params.stepStatus == "current" ?
                        <Image source={icons[params?.position]} style={{ width: 60, height: 60 }} />
                        :
                        params.position == 5 && params.stepStatus == "current" ?
                        <Image source={icons[params?.position]} style={{ width: 50, height: 50 }} />
                        :
                        <Text style={{ color: params.stepStatus === 'finished' ? '#ffffff' : '#ffffff' }}>
                            {params.position + 1}
                        </Text>
                }

                {/* <Icon3 name={icons[params?.position]} size={15} color="#8AB645" /> */}

            </View>
        )
    };
    return (

        <SafeAreaView>
          
        <ImageBackground source={bgImage} style={styles.bgImg} >
        <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex:1}}
    >
         
          <View style={{flex:1}}>
            <View style={styles.headBG}>
                <Text style={{ textAlign: 'center', color: '#fff', fontFamily:'Poppins-SemiBold', marginVertical: 15, }}>PLEASE CONFIRM THE FOLLOWING INFORMATION IS CORRECT TO BEGIN</Text>
            </View>
            <View style={{ width: wp(90),alignSelf: 'center'}}>
           {/* <ScrollView> */}
             <StepIndicator
                        customStyles={customStyles}
                        currentPosition={position}

                        labels={position == 0 ? labels1 : position == 1 ? labels2 : position == 2 ? labels3 : position == 3 ? labels4 : position == 4 ? labels5 : position == 5 ? labels6 : labels}
                       // onPress={onPageChange}
                        stepCount={6}
                        renderStepIndicator={renderStepIndicator}
                    />
        {/* </ScrollView> */}
              
               
              
                <View style={styles.subContainer}>
                {/* <ScrollView 
                style={{height:wp(0)}}
                > */}

                    {(() => {
                        if (position == 0) {
                            return (
                                // <ScrollView>
                              
                                <View style={styles.subContainer1}>
                                    <View style={styles.HeadingContainer}>
                                       
                                        <Text style={styles.subHead}>Contact Information</Text>
                                        <Text style={styles.subHead}>STEP 1</Text>
                                    </View>
                                 
                                    <View style={{ backgroundColor: '#f4f8f9', height: hp(40), width: wp(100), alignItems: 'center', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                                        
                                        <TextInput
                                            placeholder='First Name'
                                            value={firstname}
                                            onChangeText={text => {
                                              setFirstName(text);
                                            }}
                                            style={[styles.input, { marginTop: 20 }]}
                                        />
                                        <TextInput
                                            placeholder='Last Name'
                                            value={lastname}
                                            onChangeText={text => {
                                              setLastName(text);
                                            }}
                                            style={styles.input}

                                        />
                                        <TextInput
                                            placeholder='Email Address'
                                            value={email}
                                            onChangeText={text => {
                                              setEmail(text);
                                            }}
                                            style={styles.input}

                                        />
                                        <TextInput
                                            placeholder='Mobile Number'
                                            value={mobile}
                                            onChangeText={text => {
                                              setMobile(text);
                                            }}
                                            style={styles.input}

                                        />
                                        <View 
                                        style={{flexDirection:"row",
                                        alignItems:'center',
                                        alignSelf:"flex-start" ,
                                        paddingBottom:5
                                    }}
                                        >

                                        <CheckBox
                                       boxType='square'
                                         style={{
                                        //    backgroundColor:"#d7eef1",
                                        marginLeft:15,
                                        //height:15,width:15,
                                        }}
                                         onCheckColor={Color.headerIconBG}
                                            //         backgroundColor="#d7eef1"
                                          onTintColor="#d7eef1"
                                        value={isCheckboxChecked}
                                        onValueChange={() => {
                                        setIsCheckboxChecked(!isCheckboxChecked);
                                        handleCheckboxChange();
                                        }}
                                    />
                                    <Text style={{
                                        fontFamily:'Poppins-SemiBold',
                                        fontSize:12,
                                        color:Color.headerIconBG,
                                        marginLeft:5,
                                      
                                        

                                    }}>Copy Mobile Number</Text>
                                        </View>
                                   


                                        <TextInput
                                            placeholder='Whatsapp Number'
                                            value={whatnumber}
                                            onChangeText={text => {
                                              setWhatNumber(text);
                                            }}
                                            style={styles.input}

                                        />
                                            <TouchableOpacity style={styles.btn} onPress={() => { onPageChange1(1) }}>
                                      
                                      <Image
                         source={require('../Assets/img/icons/play.png')}
                         style={{
                           width: 30,
                           height: 30,

                         //  marginTop: 5,
                       
                         }}
                       />
                                       <Text style={styles.ConfirmButton}>Confirm</Text>


                                   </TouchableOpacity>
                                    </View>
                                
                                  
                                  
                                </View>
                              
                            //  </ScrollView>
                            );
                        } else if (position == 1) {
                            return (
                                <ScrollView>
                                    <View style={styles.subContainer1}>
                                    <View style={styles.HeadingContainer}>
                                            {/* <Icon1
                                        style={[
                                            styles.icon,
                                            {
                                                color: '#2F4050',
                                                marginTop:3
                                            },
                                        ]}
                                        name="user"
                                        size={40}
                                        color="#fff"
                                    /> */}
                                            <Text style={styles.subHead}>Referral Source and Medium</Text>
                                            <Text style={styles.subHead}>STEP 2</Text>
                                        </View>

                                        <View style={styles.refContent}>
                                            <Text style={{ fontSize: 20,fontFamily:'Poppins-SemiBold',color:Color.headerIconBG,fontSize:16 }}>How did you hear about us?</Text>
                                          
                                           
                                          <View style={{
                                            flexDirection:"row",
                                            justifyContent:"center",
                                            alignItems:"center"
                                            }}>
                                                  <CustomRadioButton
                                                    label={"Website"}
                                                    
                                                    selected={selectedOption === 1}
                                                    onPress={() => handleRadioChange(1)}
                                                    selectedInnerColor={Color.green}    // Set the inner color for the selected button
                                                   unselectedInnerColor={Color.headerIconBG}  // Set the inner color for the unselected button
                                                />
                                                        <View style={{height:5,width:20}}></View>
                                                        
                                                        <CustomRadioButton
                                                            label={"Other"}
                                                          
                                                            selected={selectedOption === 2}
                                                            onPress={() => handleRadioChange(2)}
                                                            selectedInnerColor={Color.green}  // Set the inner color for the selected button
                                                            unselectedInnerColor={Color.headerIconBG}
                                                            // Set the inner color for the unselected button
                                                        />
           
                                       
                                    

                                          </View>
                                       

                                   

                                     
                                                {selectedOption == 2 ?
                                                <View
                                                                                    
                                                style={{
                                                    width: wp(60),
                                                    justifyContent: 'center',
                                                    alignSelf: 'center',
                                                    height: 50,
                                                    opacity: 2,
                                                    paddingBottom: 20,
                                                    borderRadius: 10,
                                                    marginTop: 20,
                                                    paddingLeft:10
                                                }}
                                                >
                                                <TextInput
                                                    numberOfLines={5}
                                                    multiline={true}
                                                    placeholder="Notes"
                                                    // placeholderTextColor={'lightgrey'}
                                                    style={{color:Color.HeaderBackground,fontFamily:'Poppins-SemiBold',   fontSize:12,
                                                    paddingTop: 10,paddingLeft:10, height: 50, textAlignVertical: 'top',borderColor:Color.headerIconBG,borderWidth:1 }}
                                                 value={REFERREDBYSOURCE}
                                                    onChangeText={text => {
                                                        setREFERREDBYSOURCE(text);
                                                    }}
                                                />
                                                </View>
                                                :null }
                                                                                    


                                        </View>
                                        <View style={{width:wp(80), flexDirection: 'row', justifyContent: 'space-between' }}>
                                          
                                          
                                        <TouchableOpacity style={styles.btn} onPress={() => { onPageChange(0) }}>
                                           
                                           <Image
                                               source={require('../Assets/img/icons/play.png')}
                                               style={{ width: 30,
                                                marginTop:5,
                                                height: 30, transform: [{ rotate: "180deg" }] }}
                                              
                                               />
                                       <Text style={styles.ConfirmButton}>Back</Text>

                                           </TouchableOpacity>

                                            <TouchableOpacity style={styles.btn} onPress={() => { onPageChange2(2) }}>
                                           
                                            <Image
                                                source={require('../Assets/img/icons/play.png')}
                                                style={{
                                                    width: 30,
                                                    height: 30,

                                                //  marginTop: 5,
                                                
                                                }}
                                                />
                                        <Text style={styles.ConfirmButton}>Confirm</Text>

                                            </TouchableOpacity>
                                        </View>


                                    </View>
                                </ScrollView>
                            );
                        } else if (position == 2) {
                            return (
                                // <ScrollView>
                                <View style={styles.subContainer1}>
                                    <View style={styles.HeadingContainer}>  
                                        {/* <Icon1
                                        style={[
                                            styles.icon,
                                            {
                                                color: '#2F4050',
                                                marginTop:3
                                            },
                                        ]}
                                        name="user"
                                        size={40}
                                        color="#fff"
                                    /> */}
                                        <Text style={styles.subHead}>Payment Method</Text>
                                        <Text style={styles.subHead}>STEP 3</Text>
                                    </View>
                                    <View style={{ backgroundColor: '#f4f8f9', height: hp(30), width: '100%', alignItems: 'center', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                                        <TextInput
                                            placeholder='Bank Name'
                                            value={bankname}
                                            onChangeText={text => {
                                              setBankName(text);
                                            }}
                                            style={[styles.input, { marginTop: 20 }]}

                                        />
                                            <TextInput
                                            placeholder='Account Number'
                                            value={accountnum}
                                            onChangeText={text => {
                                              setAccountNum(text);
                                            }}
                                            style={styles.input}

                                        />
                                          <View style={styles.slideContainer}>
                                        <Dropdown
                style={[styles.dropdown, isFocus && {fontSize:12,fontFamily:'Poppins-SemiBold', borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={data1}
                maxHeight={200}
                itemTextStyle={{ fontSize: 12, fontFamily: 'Poppins-SemiBold', color: '#5a5a5a' }} // Set the font size and other styles for dropdown items
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Account Type' : '...'}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue(item.value);
                  setIsFocus(false);
                }}
              
             
              />

              {console.log(value,'LLL')}
              </View>

                                        {/* <TextInput
                                            placeholder='Current Account'
                                            value={currentac}
                                            onChangeText={text => {
                                              setCurrentAc(text);
                                            }}
                                            style={styles.input}

                                        /> */}
                                    
                                        <TextInput
                                            placeholder='Routing Number'
                                            value={routingnum}
                                            onChangeText={text => {
                                              setRoutingNum(text);
                                            }}
                                            style={styles.input}

                                        />
                                    </View>





                                    <View style={{width:wp(80), flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                        {/* <TouchableOpacity style={styles.btnPrev}
                                        onPress={() => { onPageChange(1) }}
                                    >
                                        <Icon
                                            style={[
                                                styles.icon,
                                                {
                                                    color: '#fff',
                                                },
                                            ]}
                                            name="arrowleft"
                                            size={20}
                                            color="#fff"
                                        />
                                        <Text style={{ color: '#fff' }}>Previous</Text>
                                    </TouchableOpacity> */}
                                      <TouchableOpacity style={styles.btn} onPress={() => { onPageChange(1) }}>
                                           
                                      <Image
                                               source={require('../Assets/img/icons/play.png')}
                                               style={{ width: 30,
                                                marginTop:5,
                                                height: 30, transform: [{ rotate: "180deg" }] }}
                                              
                                               />
                                       <Text style={styles.ConfirmButton}>Back</Text>

                                           </TouchableOpacity>
                                           
                                        <TouchableOpacity style={styles.btn} onPress={() => { onPageChange3(3) }}>
                                        {/* <Icon
                                            style={[
                                                styles.icon,
                                                {
                                                    color: '#fff',
                                                },
                                            ]}
                                            name="play"
                                            size={25}
                                            color="#fff"
                                        /> */}

                                            <Image
                                                source={require('../Assets/img/icons/play.png')}
                                                style={{
                                                    width: 30,
                                                    height: 30,

                                                //  marginTop: 5,
                                                
                                                }}
                                                />                                
                                <Text style={styles.ConfirmButton}>Confirm</Text>

                                        </TouchableOpacity>
                                    </View>
                                </View>
                                // </ScrollView>
                            );
                        } else if (position == 3) {
                            return (
                                <ScrollView>
                                    <View style={styles.subContainer1}>
                                    <View style={styles.HeadingContainer}>
                                            {/* <Icon1
                                        style={[
                                            styles.icon,
                                            {
                                                color: '#2F4050',
                                                marginTop:3
                                            },
                                        ]}
                                        name="user"
                                        size={40}
                                        color="#fff"
                                    /> */}
                                            <Text style={styles.subHead}>Associations</Text>
                                            <Text style={styles.subHead}>STEP 4</Text>
                                        </View>
                                        <View style={{height:hp(70), backgroundColor: '#fff', height: hp(35), width: '100%', alignItems: 'center', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                                        <FlatList
                    data={infoData}
                    // numColumns={5}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => (

                        <View style={styles.contentView}>
                        <Text style={styles.clientAssoc}> {item?.subClientInfo?.subClientPracticeId}</Text>


                    </View>
                    )}/>



{associationOption == 2 ?
                                                <View
                                                                                    
                                                style={{
                                                    width: wp(60),
                                                    justifyContent: 'center',
                                                    alignSelf: 'center',
                                                    height: 50,
                                                    opacity: 2,
                                                    flex:1,
                                                   // paddingBottom: 20,
                                                    borderRadius: 10,
                                                  //  marginTop: 20,
                                                    paddingLeft:10
                                                }}
                                                >
                                                <TextInput
                                                    numberOfLines={5}
                                                    multiline={true}
                                                    placeholder="Notes"
                                                    // placeholderTextColor={'lightgrey'}
                                                    style={{color:Color.HeaderBackground,fontFamily:'Poppins-SemiBold',   fontSize:12,
                                                    paddingTop: 10,paddingLeft:10, height: 50, textAlignVertical: 'top',borderColor:Color.headerIconBG,borderWidth:1 }}
                                                 value={otherAsso}
                                                    onChangeText={text => {
                                                        setOtherAsso(text);
                                                    }}
                                                />
                                                </View>
                                                :null }  
                                            <View style={{
                                            flexDirection:"row",
                                            justifyContent:"center",
                                          
                                            alignItems:"center"
                                            }}>
                                                  <CustomRadioButton
                                                    label={"Correct"}
                                                    
                                                    selected={associationOption === 1}
                                                    onPress={() => handleAssociationChange(1)}
                                                    selectedInnerColor={Color.green}    // Set the inner color for the selected button
                                                   unselectedInnerColor={Color.headerIconBG}  // Set the inner color for the unselected button
                                                />
                                                        <View style={{height:5,width:20}}></View>
                                                        
                                                        <CustomRadioButton
                                                            label={"Incorrect"}
                                                          
                                                            selected={associationOption === 2}
                                                            onPress={() => handleAssociationChange(2)}
                                                            selectedInnerColor={Color.green}  // Set the inner color for the selected button
                                                            unselectedInnerColor={Color.headerIconBG}
                                                            // Set the inner color for the unselected button
                                                        />
           
                                       
                                    

                                          </View>    
{/* 
                                          {associationOption == 2 ?
                                                <View
                                                                                    
                                                style={{
                                                    width: wp(60),
                                                    justifyContent: 'center',
                                                    alignSelf: 'center',
                                                    height: 50,
                                                    opacity: 2,
                                                    paddingBottom: 20,
                                                    borderRadius: 10,
                                                    marginTop: 20,
                                                    paddingLeft:10
                                                }}
                                                >
                                                <TextInput
                                                    numberOfLines={5}
                                                    multiline={true}
                                                    placeholder="Notes"
                                                    // placeholderTextColor={'lightgrey'}
                                                    style={{color:Color.HeaderBackground,fontFamily:'Poppins-SemiBold',   fontSize:12,
                                                    paddingTop: 10,paddingLeft:10, height: 50, textAlignVertical: 'top',borderColor:Color.headerIconBG,borderWidth:1 }}
                                                 value={otherAsso}
                                                    onChangeText={text => {
                                                        setOtherAsso(text);
                                                    }}
                                                />
                                                </View>
                                                :null }       */}

                                            {/* <View style={styles.contentView}>
                                                <Text style={styles.clientAssoc}>Client Name 1</Text>


                                            </View>
                                            <View style={styles.contentView}>
                                                <Text style={styles.clientAssoc}>Client Name 2</Text>


                                            </View>

                                            <View style={styles.contentView}>
                                                <Text style={styles.clientAssoc}>Client Name 3</Text>


                                            </View>
                                            <View style={styles.contentView}>
                                                <Text style={styles.clientAssoc}>Client Name 4</Text>


                                            </View>
                                            <View style={styles.contentView}>
                                                <Text style={styles.clientAssoc}>Client Name 5</Text>


                                            </View>
                                            <View style={styles.contentView}>
                                                <Text style={styles.clientAssoc}>Client Name 6</Text>


                                            </View> */}
                                        </View>





                                        <View style={{width:wp(80), flexDirection: 'row', justifyContent: 'space-between' }}>
                                            {/* <TouchableOpacity style={styles.btnPrev}
                                            onPress={() => { onPageChange(2) }}
                                        >
                                            <Icon
                                                style={[
                                                    styles.icon,
                                                    {
                                                        color: '#fff',
                                                    },
                                                ]}
                                                name="arrowleft"
                                                size={20}
                                                color="#fff"
                                            />
                                            <Text style={{ color: '#fff' }}>Previous</Text>
                                        </TouchableOpacity> */}
                                          <TouchableOpacity style={styles.btn} onPress={() => { onPageChange(2) }}>
                                           
                                          <Image
                                               source={require('../Assets/img/icons/play.png')}
                                               style={{ width: 30,
                                                marginTop:5,
                                                height: 30, transform: [{ rotate: "180deg" }] }}
                                              
                                               />
                                       <Text style={styles.ConfirmButton}>Back</Text>

                                           </TouchableOpacity>
                                           
                                            <TouchableOpacity style={styles.btn} onPress={() => { onPageChange4(4) }}>
                                            {/* <Icon
                                            style={[
                                                styles.icon,
                                                {
                                                    color: '#fff',
                                                },
                                            ]}
                                            name="play"
                                            size={25}
                                            color="#fff"
                                        /> */}
                                           <Image
                          source={require('../Assets/img/icons/play.png')}
                          style={{
                            width: 30,
                            height: 30,

                          //  marginTop: 5,
                        
                          }}
                        />
                                        <Text style={styles.ConfirmButton}>Confirm</Text>

                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </ScrollView>
                            );
                        } 
                        else if (position == 4) {
                            return (
                                // <ScrollView>
                                    <View style={styles.subContainerProf}>
                                    <View style={styles.HeadingContainer}>
                                          
                                            <Text style={styles.subHead}>Current Profession</Text>
                                            <Text style={styles.subHead}>STEP 5</Text>
                                        </View>
                <View style={{height:hp(35),paddingBottom:15, backgroundColor: '#fff', borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }}>
                                          
                  
                   {professionOption != 2 ?
                    <FlatList
                    data={professionList}
                    showsVerticalScrollIndicator={false}
                    // numColumns={5}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => (
                        <View style={styles.contentView}>
                        <View style={styles.client}>
                     
                        <CheckBox
                        disabled={false}
                        boxType="square"
                        style={{
                           // backgroundColor:"#d7eef1",
                            //  marginTop:8,
                              marginLeft:10,
                             //height:15,width:15,
                             justifyContent:'center'}}
                        onCheckColor={Color.headerIconBG}
                        // backgroundColor="#d7eef1"
                        onTintColor="#d7eef1"
            
                        value={selectedProfessions.includes(item.professionName)}
                        tintColors={{ true: 'white', false: 'white' }}
                        // tintColors="red"
                        onValueChange={() => handleToggleCheckbox(item.professionName)}
                        //  style={{height:10,width:10}}

                 />
           
                           <Text style={styles.ProfesstionList} >

                               {item.professionName}</Text>
                        </View>


                    </View>


                    )}
                    />
                    :
                    <View
                                                                                    
                    style={{
                        width: wp(90),
                        justifyContent: 'center',
                        alignSelf: 'center',
                        height: 50,
                        opacity: 2,
                        paddingBottom: 20,
                        borderRadius: 10,
                        marginTop: 20,
                        //paddingLeft:10
                    }}
                    >
                    <TextInput
                        numberOfLines={5}
                        multiline={true}
                        placeholder="Enter Your Profession"
                        // placeholderTextColor={'lightgrey'}
                        style={{color:Color.HeaderBackground,fontFamily:'Poppins-SemiBold',   fontSize:12,width:wp(85),
                        alignSelf:'center',
                        paddingTop: 10,paddingLeft:10, height: 50, textAlignVertical: 'top',borderColor:Color.headerIconBG,borderWidth:1 }}
                     value={profession}
                        onChangeText={text => {
                            setProffession(text);
                        }}
                    />
                    </View>
                    }
              
            </View>

                                      <View style={{
                                                marginTop:10,
                                            flexDirection:"row",
                                            justifyContent:"center",
                                            alignItems:"center"
                                            }}>
                                    
                                         <CheckBox
                                       boxType='square'
                                         style={{

                                            //backgroundColor:"#d7eef1",
                                           // marginLeft:15,
                                        //    height:15,width:15,
                                        }}
                                         onCheckColor={Color.headerIconBG}
                                         
                                            //         backgroundColor="#d7eef1"
                                          onTintColor="#d7eef1"
                                        value={isProfessionChecked}
                                        
                                        onValueChange={() => {
                                        setIsProfessionChecked(!isProfessionChecked);
                                        handleProfessionChange();
                                        }}
                                    />  

                                    <Text
                                    style={{color:Color.headerIconBG,
                                       fontFamily:'Poppins-SemiBold',
                                       fontSize:16 ,
                                       marginLeft:5
                                    }}
                                    >
                                        Other
                                    </Text>
   
                                          </View>
                                       

                                   

                                     
                                                {/* {professionOption == 2 ?
                                                <View
                                                                                    
                                                style={{
                                                    width: wp(90),
                                                    justifyContent: 'center',
                                                    alignSelf: 'center',
                                                    height: 50,
                                                    opacity: 2,
                                                    paddingBottom: 20,
                                                    borderRadius: 10,
                                                    marginTop: 20,
                                                    //paddingLeft:10
                                                }}
                                                >
                                                <TextInput
                                                    numberOfLines={5}
                                                    multiline={true}
                                                    placeholder="Enter Your Profession"
                                                    // placeholderTextColor={'lightgrey'}
                                                    style={{color:Color.HeaderBackground,fontFamily:'Poppins-SemiBold',   fontSize:12,width:wp(85),
                                                    alignSelf:'center',
                                                    paddingTop: 10,paddingLeft:10, height: 50, textAlignVertical: 'top',borderColor:Color.headerIconBG,borderWidth:1 }}
                                                 value={profession}
                                                    onChangeText={text => {
                                                        setProffession(text);
                                                    }}
                                                />
                                                </View>
                                                :null }   */}


                                        <View style={{width:wp(80), flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <TouchableOpacity style={styles.btn} onPress={() => { onPageChange(3) }}>
                                           
                                        <Image
                                               source={require('../Assets/img/icons/play.png')}
                                               style={{ width: 30,
                                                marginTop:5,
                                                height: 30, transform: [{ rotate: "180deg" }] }}
                                              
                                               />
                                       <Text style={styles.ConfirmButton}>Back</Text>

                                           </TouchableOpacity>
                                           
                                          
                                            <TouchableOpacity style={styles.btn} onPress={() => { onPageChange5(5) }}>
                                            {/* <Icon
                                            style={[
                                                styles.icon,
                                                {
                                                    color: '#fff',
                                                },
                                            ]}
                                            name="play"
                                            size={25}
                                            color="#fff"
                                        /> */}
                                            <Image
                          source={require('../Assets/img/icons/play.png')}
                          style={{
                            width: 30,
                            height: 30,

                          //  marginTop: 5,
                        
                          }}
                        />
                                        <Text style={styles.ConfirmButton}>Confirm</Text>

                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                // </ScrollView>
                            );
                        } else {
                            return (
                                <ScrollView>
                                    <View style={styles.subContainerInterest}>
                                    <View style={styles.HeadingContainer}>
                                           
                                            <Text style={styles.subHead}>Interests</Text>
                                            <Text style={styles.subHead}>STEP 6</Text>
                                        </View>


                                        <View style={{height:hp(35),paddingBottom:15, backgroundColor: '#fff', borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }}>
                                        
               
                                        {InterestOption != 2 ?
                 <FlatList
                    data={interestList}
                    // numColumns={5}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => (
                        <View style={styles.contentView}>
                        <View style={styles.client}>
                        <CheckBox
            
               disabled={false}
               boxType="square"
              style={{
               // backgroundColor:"#d7eef1", 

                // marginTop:8,
                 marginLeft:10,
                // height:15,
                // width:15,
                //alignSelf:"center",
                //justifyContent:'center'
               }}
              onCheckColor={Color.headerIconBG}
                //         backgroundColor="#d7eef1"
              onTintColor="#d7eef1"
          //  tintColor="#d7eef1"
              value={selectedInterest.includes(item.id)}
              tintColors={{ true: 'white', false: 'white' }}
              onValueChange={() => handleInterestCheckbox(item.id)}
            />

                           <Text style={styles.ProfesstionList} >

                               {item.name}</Text>
                        </View>


                    </View>


                    )}
                    />
                         :
                         
                         <View
                                                                                    
                         style={{
                             width: wp(90),
                             justifyContent: 'center',
                             alignSelf: 'center',
                             height: 50,
                             opacity: 2,
                             paddingBottom: 20,
                             borderRadius: 10,
                             marginTop: 20,
                             //paddingLeft:10
                         }}
                         >
                         <TextInput
                             numberOfLines={5}
                             multiline={true}
                             placeholder="Enter Your Interest"
                             // placeholderTextColor={'lightgrey'}
                             style={{color:Color.HeaderBackground,fontFamily:'Poppins-SemiBold',   fontSize:12,width:wp(85),
                             alignSelf:'center',
                             paddingTop: 10,paddingLeft:10, height: 50, textAlignVertical: 'top',borderColor:Color.headerIconBG,borderWidth:1 }}
                          value={interest}
                             onChangeText={text => {
                                 setInterest(text);
                             }}
                         />
                         </View>
                         }               
                                           
                                        </View>

                                        <View style={{
                                                marginTop:10,
                                            flexDirection:"row",
                                            justifyContent:"center",
                                            alignItems:"center"
                                            }}>
                                    
                                         <CheckBox
                                       boxType='square'
                                         style={{
                                            //backgroundColor:"#d7eef1",
                                            //marginLeft:15,
                                         //   height:15,
                                           // width:15,
                                        }}
                                         onCheckColor={Color.headerIconBG}
                                            //         backgroundColor="#d7eef1"
                                          onTintColor="#d7eef1"
                                        value={isInterestChecked}
                                        onValueChange={() => {
                                        setIsInterestChecked(!isInterestChecked);
                                        handleInterestChange();
                                        }}
                                    />  

                                    <Text
                                    style={{color:Color.headerIconBG,
                                       fontFamily:'Poppins-SemiBold',
                                       fontSize:16 ,
                                       marginLeft:15
                                    }}
                                    >
                                        Other
                                    </Text>
   
                                          </View>  
                                        <View style={{width:wp(80), flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <TouchableOpacity style={styles.btn} onPress={() => { onPageChange(4) }}>
                                           
                                        <Image
                                               source={require('../Assets/img/icons/play.png')}
                                               style={{ width: 30,
                                                marginTop:5,
                                                height: 30, transform: [{ rotate: "180deg" }] }}
                                              
                                               />
                                       <Text style={styles.ConfirmButton}>Back</Text>

                                           </TouchableOpacity>
                                           
                                           
                                            <TouchableOpacity style={styles.btn} onPress={() => FinalConfirm() }>
                                            {/* <Icon
                                            style={[
                                                styles.icon,
                                                {
                                                    color: '#fff',
                                                },
                                            ]}
                                            name="play"
                                            size={25}
                                            color="#fff"
                                        /> */}
                                          <Image
                          source={require('../Assets/img/icons/play.png')}
                          style={{
                            width: 30,
                            height: 30,

                          //  marginTop: 5,
                        
                          }}
                        />
                                        <Text style={styles.ConfirmButton}>Confirm</Text>

                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                </ScrollView>
                            );
                        }
                    })()}
                 {/* </ScrollView> */}
                </View>
                </View>
            </View>
          
            </KeyboardAvoidingView>
        </ImageBackground>
      
        </SafeAreaView>

    )
}

export default ClientSteps

const styles = StyleSheet.create({
    subContainer: {
        // backgroundColor: '#fff',
      //  flex:1,
        width: wp(95),
      //  height: hp(80),
        alignSelf: 'center',
       // marginTop:wp(20),
       // alignItems: 'center',
        // height: 250,
        borderRadius: 10,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 3,
        // },
        // shadowOpacity: 0.27,
        // shadowRadius: 4.65,

        // elevation: 6,
    },
    slideContainer: {
        backgroundColor: Color.white,
        width: wp(90),
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 10,

        fontSize:12,
        borderColor:'#f3f3f3',
         borderWidth: 1,
        // borderRadius: 10,
      
        fontFamily:'Poppins-SemiBold', 
      
      
        borderRadius: 20
      
       // marginTop: 20,
        // width:'62%'
      },
      selectedTextStyle: {
        fontSize: 12,
      paddingLeft:10,
      color:'#5a5a5a',
        fontFamily:'Poppins-SemiBold'
      },
      placeholderStyle:{
        fontSize:12,
        paddingLeft:10,
        color:'#5a5a5a',
        fontFamily:'Poppins-SemiBold'
      },
    
      iconStyle: {
        width: 20,
        height: 20,
      },


    subHead: {
        alignSelf: 'flex-start',
        fontSize: 16,
        fontWeight: '700',
        marginTop: 5,
         fontFamily: 'Poppins-Bold',
        color: '#fff'
    },
    subHead1: {
        alignSelf: 'flex-start',
        fontSize: 17,
        fontWeight: '700',
        marginTop: 5
    },

    subContainer1: {
       
         //backgroundColor: 'red',
        width: wp(95),
        // height:hp(10),
        alignSelf: 'center',
     //marginTop: wp(-15), 
        alignItems: 'center',
         //height: hp(70),

        borderRadius: 10,

    },
    HeadingContainer:{
        fontSize:12,
        fontFamily:'Poppins-SemiBold', 
        flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems:"center",
         height:40, 
         backgroundColor: Color.green,
          width: wp(100),
            paddingHorizontal: 10
    },
    subContainerProf: {
        // backgroundColor: 'red',
        width: wp(95),
        // height:hp(10),
        alignSelf: 'center',
        // marginTop: 10,
        alignItems: 'center',
        // height: 200,
        borderRadius: 10,

    },
    subContainerInterest: {
        // backgroundColor: 'red',
        width: wp(95),
        // height:hp(10),
        alignSelf: 'center',
        // marginTop: 10,
        alignItems: 'center',
        // height: 200,
        borderRadius: 10,

    },
    checkbox:{

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 30, // Adjust the width as needed
        height: 30, // Adjust the height as needed
    },
    btn: {
        width: wp(35),
         height: hp(6),
        //alignSelf: 'center',
         justifyContent: 'center',
        
        flexDirection: 'row',
        marginBottom: 30,
        marginTop: 15,
        backgroundColor: '#8AB645',
        borderRadius: 30,
       // padding: 10,
     // paddingBottom
        alignItems: 'center',
       // marginRight: 10
    },
    ConfirmButton:{
         color: '#fff',
         marginLeft: 10, 
         marginTop:5,
         fontSize: 14,
         fontFamily:'Poppins-SemiBold'
    },
    btnInterest: {
        width: wp(28),
        height: hp(5.5),
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 30,
        marginTop: 20,
        backgroundColor: '#8AB645',
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
        marginRight: 10
    },
    bgImg:{
        height:hp(100),
        resizeMode:'repeat'
    },
    btnPrev: {
        width: wp(28),
        height: hp(7),
        alignSelf: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 30,
        marginTop: 10,
        backgroundColor: '#8AB645',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        marginRight: 80
    },

    input: {
        height: 40,
        marginBottom: 10,
        justifyContent:"center",
        fontSize:12,
        borderColor:'#f3f3f3',
         borderWidth: 1,
         color:'#5a5a5a',
        // borderRadius: 10,
        padding: 10,
           fontFamily:'Poppins-SemiBold', 
        width: wp(90),
        backgroundColor: '#fff',
        borderRadius: 20
    },

    contentView: {

        // backgroundColor: '#fff',
        // marginTop: 10,
        // padding: 10,
        // flexDirection: 'row',
           marginTop:10,
           width:wp(100),
       // alignItems:'center',
       // justifyContent:'center',
    },


    client: {
        backgroundColor: '#39aab8',
        borderRadius: 25,
        color: '#fff',
        // padding: 5,
       marginLeft:10,
        width:wp(90),
      //  alignSelf:"center",
        //alignSelf:"center",
        height: hp(4),
        // marginRight: 10,
        flexDirection: 'row',
       // justifyContent:"center"
      //  textAlign: 'center',
        // paddingBottom: 20
    },
    clientAssoc: {
        backgroundColor: '#39aab8',
        borderRadius: 25,
        color: '#fff',
        fontFamily:'Poppins-SemiBold',
        padding: 5,
        width: wp(90),
    marginLeft:10,
     fontSize:14,
        // marginRight: 10,
      // alignSelf:"center",
        textAlign: 'center',
        // paddingBottom: 20
    },

    ProfesstionList: {
      //  backgroundColor: '#39aab8',
        borderRadius: 25,
        color: '#fff',
        fontFamily:'Poppins-SemiBold',
        padding: 5,
      
        width:wp(80),
          fontSize:14,
        // marginRight: 10,
     
        textAlign: 'center',
        // paddingBottom: 20
    },
    
    client1: {
        // backgroundColor: '#2596be',
        // borderRadius: 20,
        color: '#fff',
        padding: 5,
        width: 130,
        textAlign: 'center',
        marginRight: 30,
        flexDirection: 'row'
    },
    step: {
        marginTop: 10,
    //    flex:1
       
    },
    checkText: {
        color: '#000', fontFamily: 'Poppins-Light', fontSize: 12
    },
    refContent: {
        marginBottom: 20,
         height: hp(30),
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    headBG: {
        backgroundColor: "#3d8087",
        marginBottom:10
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 17,
        height: 17,
        borderWidth: 1,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    customStep: {
        
        // width: 40,
        // height: 40,
        // borderRadius: 20,
        // backgroundColor: '#4aae4f',
        // justifyContent: 'center',
        // alignItems: 'center',
       // flex:1
      }

})