import { StyleSheet, Text, View, TouchableOpacity,
    Modal,TextInput, ScrollView, ImageBackground, Image,Button } from 'react-native'
    import React, { useState, useEffect, useCallback } from 'react';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import RNFS from 'react-native-fs';
import { Color } from '../Style';
import { Dropdown } from 'react-native-element-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../Component/Loader';
import { RequestInfoById } from '../Redux/Actions/TaxLeaf';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import HeadTabs from './HeadTabs';
import DocumentPicker from 'react-native-document-picker'

const ViewRequest = ({ route }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [actionmodalVisible, setActionModalVisible] = useState(false);
    const [trackingmodalVisible, setTrackingModalVisible] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const [value, setValue] = useState(null);
    const [fileResponse, setFileResponse] = useState();
    const [fileExt, setFileExt] = useState();
    const [base64File, setBase64File] = useState();
    const [newt, setNew] = useState();
    const [started, setStarted] = useState(false);
    const [resolved, setResolved] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [cancelled, setCancelled] = useState(false);
    const [buttonSelection, setButonSelection] = useState('New');
  
  
    const navigation = useNavigation();
    const actionId = route.params.actionId;
    const { MY_INFO } = useSelector(state => state.TaxLeafReducer);
    const { REQUEST_INFO_BY_ID } = useSelector(state => state.TaxLeafReducer);
    const { MANAGER_INFO } = useSelector(state => state.TaxLeafReducer);
    const { PARTNER_INFO } = useSelector(state => state.TaxLeafReducer);
    const { OFFICE_INFO } = useSelector(state => state.TaxLeafReducer);
    console.log(REQUEST_INFO_BY_ID, 'REQUEST_INFO_BY_ID')
    const bgImage = require('../Assets/img/guest_shape.png');
    const manager = MANAGER_INFO;
    const partner = PARTNER_INFO;
    const managerOffice = OFFICE_INFO;
    const jsonData = MY_INFO.staffview;
    const officeInfo = MY_INFO.officeInfo;

    console.log(actionId, 'LLLLLL')
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             setLoader(true);
    //             await dispatch(RequestInfoById(actionId, navigation));
    //         } finally {
    //             setLoader(false);
    //         }
    //     };

    //     fetchData();
    // }, [REQUEST_INFO_BY_ID, navigation]);



    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching data...');
                setLoader(true);
                await dispatch(RequestInfoById(actionId, navigation));
                console.log('Data fetched successfully');

                setTimeout(() => {
                    setLoader(false);
                }, 1000);

            }
            catch (error) {
                console.error('Error fetching data:', error);
                // setTimeout(() => {
                //     setLoader(false);
                // }, 1000);
            }

        };

        fetchData();
    }, []);

    async function convertUriToBase64(uri) {
        try {
          // Use RNFS to read the file content
          const fileContent = await RNFS.readFile(uri, 'base64');
    
          return fileContent;
        } catch (error) {
          console.error('Error converting URI to base64:', error);
          return null;
        }
      }
    

    const handleDocumentSelection = useCallback(async () => {
        try {
          const response = await DocumentPicker.pick({
            presentationStyle: 'fullScreen',
          });
    
    
          const fileName = response[0]?.name;
          const fileExtension = fileName.split('.').pop();
          setFileExt(fileExtension)
          console.log('File Extension:', fileExtension);
    
          // console.log(response, 'fileee')
          setFileResponse(response);
          if (response) {
            convertUriToBase64(response[0]?.uri)
              .then(base64 => {
                //  console.log('Base64:', base64)
                setBase64File(base64)
              })
          }
        }
        catch (err) {
          console.warn(err);
        }
      });

            const SelectButton = (buttontext) => {

                setButonSelection(buttontext)



                
            } 

    const removeHtmlTags = (htmlString) => {
        if (!htmlString) {
            return ''; // or handle it in another way based on your requirements
          }
        // Use a regular expression to remove HTML tags
        return htmlString.replace(/<[^>]*>/g, '');
      };  

    // useEffect(() => {
    //     setLoader(true);
    //     dispatch(RequestInfoById(actionId, navigation));

    //     setTimeout(() => {
    //         setLoader(false);
    //     }, 2000);
    // }, [REQUEST_INFO_BY_ID]);
    return (

        <View style={{ backgroundColor: '#d5e3e5' }}>

            <Loader flag={loader} />
            <ScrollView style={{ marginBottom: 10 }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <HeadTabs />
                <Text style={{ fontSize: 20, marginLeft: 30, marginBottom: 10, fontFamily: 'Poppins-Bold', color: Color.headerIconBG }}>Requests</Text>
                <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: "center", }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('CreateNewAction')}
                        style={{
                            backgroundColor: '#fff',
                            // paddingTop: 10,
                            textAlign: 'center',
                            width: wp(45),
                            // marginLeft: 60,
                            flexDirection: 'row',
                            borderRadius: 25,
                            height: hp(5),
                            alignItems: "center",
                            justifyContent: 'center'
                        }}
                    >
                        <Image source={require('../Assets/img/icons/createAction.png')} />

                        <Text style={{
                            color: Color.headerIconBG,
                            fontSize: 12,
                            marginTop: 2,
                            marginLeft: 4,
                            fontFamily: 'Poppins-Bold',

                        }}>


                            Create New Action
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}
                        style={{
                            backgroundColor: '#fff',
                            // paddingTop: 10,
                            alignItems: "center",
                            textAlign: 'center',
                            width: wp(45),
                            marginLeft: 10,
                            flexDirection: 'row',
                            borderRadius: 25,
                            height: hp(5),
                            justifyContent: 'center'
                        }}
                    >
                        <Image source={require('../Assets/img/icons/actionDashboard.png')} style={{ marginTop: 1 }} />
                        <Text style={{
                            color: Color.headerIconBG,
                            fontSize: 12,
                            marginTop: 2,
                            marginLeft: 4,
                            fontFamily: 'Poppins-Bold',

                        }}>


                            Action Dashboard
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", justifyContent: 'space-between', width: '90%', alignSelf: 'center' }}>
                    <Text style={{ color: Color.darkGreen, fontSize: 12, fontFamily: 'Poppins-SemiBold', }}>Action ID #{REQUEST_INFO_BY_ID?.actionModel?.id}</Text>
                    <Text style={{ color: Color.darkGreen, fontSize: 12, fontFamily: 'Poppins-SemiBold', }}>Client ID: {REQUEST_INFO_BY_ID?.actionModel?.clientId}</Text>

                </View>


                <View
                    // source={bgImage}
                    style={styles.bgImg}
                >
                    <View style={styles.container}>


                        <View style={styles.slideContainerClient}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', alignSelf: 'center', marginBottom: 10 }}>


                                <Text style={styles.headingClient}>
                                    {/* {manager?.id}
                                    {REQUEST_INFO_BY_ID?.actionStaffModel?.staffId} {partner?.id} */}
                                    {REQUEST_INFO_BY_ID?.actionStaffModel?.staffId === manager?.id ?

                                        manager?.firstName + " " + manager?.lastName
                                        :
                                        partner?.firstName + " " + partner?.lastName

                                    }
                                </Text>
                                <Text style={styles.headingClient}>Assign</Text>

                            </View>

                            <View style={styles.contentView}>
                                <Text style={styles.subHead}>Department:</Text>
                                <Text style={styles.LIstText2}>
                                    N/A
                                </Text>
                            </View>
                            <View style={styles.contentView}>
                                <Text style={styles.subHead}>Office:</Text>
                                {/* {REQUEST_INFO_BY_ID?.actionStaffModel?.staffId} */}
                                <Text style={styles.LIstText2}>

                                    {managerOffice?.officeId}

                                </Text>
                            </View>
                        </View>

                        <View style={{ backgroundColor: '#fff', paddingBottom: 20, width: wp(90), alignSelf: 'center', marginTop: 20 }}>
                            <View style={styles.slideContainerClient1}>
                                <View style={{
                                    flexDirection: 'row', marginLeft: 15,
                                    //marginTop: 10
                                }}>
                                    {/* <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: '#fff', fontFamily: 'Poppins-SemiBold', marginTop: 5 }}>Notes</Text>
                                        <Text style={styles.notes}>2</Text>
                                    </View> */}
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: '#fff', fontFamily: 'Poppins-SemiBold', marginTop: 5 }}>SOS</Text>
                                      <TouchableOpacity
                                       onPress={() => setModalVisible(true)}
                                      >
                                        <Text style={styles.sos}>+</Text>
                                      </TouchableOpacity>
                                       
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: '#fff', fontFamily: 'Poppins-SemiBold', marginTop: 5 }}>Action Files</Text>
                                       
                                        <TouchableOpacity
                                       onPress={() => setActionModalVisible(true)}
                                      >
                                        <Text style={styles.action}>0</Text>
                                      </TouchableOpacity>
                                      
                                    </View>

                                </View>
                            </View>
                            <View style={{ marginLeft: 15, marginBottom: 10, marginTop: 10 }}>
                                <Text style={{ fontSize: 12, fontFamily: 'Poppins-SemiBold', color: Color.headerIconBG, }}>Subject: <Text style={{ fontSize: 12, color: Color.darkGreen }}>{REQUEST_INFO_BY_ID?.actionModel?.subject}</Text> </Text>

                            </View>
                            <View style={styles.part}></View>
                            
                            <View style={{ marginLeft: 15, justifyContent: "center", marginTop: 10 }}>
                                <Text style={{ fontSize: 12, fontFamily: 'Poppins-SemiBold', color: Color.headerIconBG, }}>Message:  <Text style={{ fontSize: 12, color: Color.darkGreen }}> 
                                {removeHtmlTags(REQUEST_INFO_BY_ID?.actionModel?.message)} 
                                {/* {REQUEST_INFO_BY_ID?.actionModel?.message} */}
                                </Text></Text>
                            </View>

                        </View>

                        <View style={{ backgroundColor: '#fff', paddingBottom: 20, width: wp(90), alignSelf: 'center', marginTop: 20 }}>
                            <View style={[styles.slideContainerClient1, { backgroundColor: '#254768' }]}>
                                <View style={{ marginLeft: 15, }}>
                                    <Text style={{ fontSize: 14, color: '#fff', fontFamily: 'Poppins-SemiBold', }}>Action Notification</Text>

                        </View>
                            </View>
                            <View style={{ marginLeft: 15, marginTop: 10 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 14, fontFamily: 'Poppins-SemiBold', color: Color.headerIconBG, marginBottom: 10, }}>Tracking</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                           setTrackingModalVisible(true)
                                        }}
                                        style={{
                                            backgroundColor: '#2b9df1',
                                            padding: 5,
                                            textAlign: 'center',
                                            width: wp(20),
                                            marginLeft: 20,
                                            flexDirection: 'row',
                                            borderRadius: 3,
                                            height: hp(4),
                                            justifyContent: 'center'
                                        }}
                                    >
                                        {/* <Icon
                                  name="eye"
                                  size={14}
                                  color="#fff"
                                /> */}
                                        <Text style={{
                                            color: Color.white,
                                            fontSize: 12,
                                            fontFamily: 'Poppins-SemiBold',
                                            // marginTop: 2,
                                            marginLeft: 4,
                                            // fontWeight: '700'

                                        }}>


                                            NEW
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.part}></View>
                            <View style={{ marginLeft: 15, marginTop: 10 }}>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={{ fontSize: 14, fontFamily: 'Poppins-SemiBold', color: Color.headerIconBG, }}>Priority</Text>
                                  
                                  
                                    <TouchableOpacity
                                        onPress={() => {
                                            // navigation.navigate('ViewRequest', {
                                            // })
                                        }}
                                        style={{
                                            backgroundColor:   REQUEST_INFO_BY_ID?.actionModel?.priority == 1 ? '#e00101':  REQUEST_INFO_BY_ID?.actionModel?.priority == 2 ? "orange": 'blue',
                                            //padding: 5,
                                            textAlign: 'center',
                                            width: wp(25),
                                            marginLeft: 30,
                                            flexDirection: 'row',
                                            borderRadius: 3,
                                            //  height: hp(4),
                                            justifyContent: 'center'
                                        }}
                                    >
                                      
                                        <Text style={{
                                            color: Color.white,
                                            fontSize: 12,
                                            marginTop: 2,
                                            marginLeft: 4,
                                            fontFamily: 'Poppins-SemiBold',
                                            // fontWeight: '700'

                                        }}>
                                            {
                                                
                                                REQUEST_INFO_BY_ID?.actionModel?.priority === 1 ?
                                                    'URGENT'
                                                    :
                                                    REQUEST_INFO_BY_ID?.actionModel?.priority === 2 ?
                                                        'IMPORTANT'
                                                        :
                                                        REQUEST_INFO_BY_ID?.actionModel?.priority === 3 ?
                                                            'REGULAR'
                                                            : null
                                            }

                                        </Text>
                                    </TouchableOpacity>

                                    
                                </View>

                            </View>

                        </View>


                    </View>
                </View>

                <Modal
         animationType="slide"
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
                marginBottom: 10,
                width: wp(90),
                alignSelf: 'center',
              }}>
            
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
               // onPress={() => navigation.navigate('ContactUs')}
              
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

            <View style={{
                flexDirection:'row',
              //  justifyContent:"center",
               // alignItems:"center",
               borderBottomWidth:1,
                width:wp(90),
              //  backgroundColor:'red',
                 height:wp(15),
                 marginBottom:10
                }}>
                    <View
                     style={{
                       
                        width:wp(30),
                       // backgroundColor:'yellow',
                        height:20
                        }}
                    >
                        <Text
                        style={{
                            textAlign:"left", fontSize: 12, fontFamily: 'Poppins-SemiBold', }}
                        >SOS</Text>
                        {/* <View
                         style={{
                            width:wp(20),
                            height:50,
                            justifyContent:"center",
                            alignItems:"center",
                            backgroundColor:"green"}}   
                        > */}
                       <Text style={{ textAlign:"left", color: Color.darkGreen, fontSize: 12, fontFamily: 'Poppins-SemiBold', }}
                        >INACTIVE</Text>
                        {/* </View> */}
                         
                    </View>
                     <View
                     style={{
                       
                        width:wp(30),
                       // backgroundColor:'orange',
                        height:20
                        }}
                    >
                           <Text
                            style={{
                                textAlign:"center",
                                fontSize: 12, fontFamily: 'Poppins-SemiBold', 
                            }}
                           >Action ID</Text>
                            <Text style={{ textAlign:"center", color: Color.darkGreen, fontSize: 12, fontFamily: 'Poppins-SemiBold', }}>#{REQUEST_INFO_BY_ID?.actionModel?.id}</Text>


                           
                    </View>
                      <View
                     style={{
                        height:20,
                        width:wp(30),
                       // backgroundColor:'green',
                       
                        }}
                    >
                         <Text
                          style={{
                            textAlign:"right",
                            fontSize: 12, fontFamily: 'Poppins-SemiBold', 
                        }}
                         >Client ID</Text>
                    <Text style={{ textAlign:"right", color: Color.darkGreen, fontSize: 12, fontFamily: 'Poppins-SemiBold', }}> {REQUEST_INFO_BY_ID?.actionModel?.clientId}</Text>

                    </View>

            </View>
             <View style={{height:40,}}>
                    <Text style={styles.Subheading}>Create New SOS</Text>

            </View>           

            <View style={styles.formContainer}>
                  <View style={{ marginBottom: 0,flexDirection:'row' }}>
                    <Text
                      style={{ alignSelf: 'flex-start', padding: 5, color: '#fff' }}>
                      Assign From:
                    </Text>
                    <Text
                      style={{ alignSelf: 'flex-start', fontFamily:'Poppins-SemiBold', padding: 5, color: '#fff' }}>
                       {jsonData?.firstName} {''} {jsonData?.lastName}
                    </Text>

                   

                
                  </View>
                  <View style={{ marginBottom: 10 }}>
                    
                     <View style={{
                        height:40,
                      justifyContent:"center",
                        backgroundColor:"#fff"
                        

                     }}>
                    <Text style={styles.LIstText3}>{officeInfo?.name}</Text>

                        </View>   
                   


                
                  </View>
                  <View style={{ marginBottom: 10 }}>
                    <Text
                      style={{ alignSelf: 'flex-start', padding: 5, color: '#fff' }}>
                    Assigned To
                    </Text>

                    <View style={{
                        height:40,
                      justifyContent:"center",
                        backgroundColor:"#fff"
                        

                     }}>
                    <Text style={styles.LIstText3}>Select an option</Text>

             </View>   
                   
                  </View>
                 


             <View style={{ marginBottom: 10 }}>
                    <Text
                      style={{ alignSelf: 'flex-start', padding: 5, color: '#fff' }}>
                  SOS Message:
                    </Text>

                    <View style={{
                        height:40,
                      justifyContent:"center",
                        backgroundColor:"#fff"
                        

                     }}>
                    <Text style={styles.LIstText3}>Add Text Message</Text>

             </View>  
                   
                  </View>
                 
                  <View style={{ marginBottom: 10 }}>
                    <Text
                      style={{ alignSelf: 'flex-start', padding: 5, color: '#fff' }}>
                     SOS Attachments*
                    </Text>
                    <Text
                      // key={index.toString()}
                      style={styles.uri}
                      numberOfLines={1}
                      ellipsizeMode={'middle'}>
                      {fileResponse ? fileResponse[0]?.name : null}
                    </Text>
                    <Text></Text>
                    <Button title="Select 📑" 
                    onPress={handleDocumentSelection} 
                    />
                  </View>

                  <View style={{marginTop:10, marginBottom: 10, flexDirection:"row",justifyContent:'space-between',
                    width:wp(85)
                }}>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonClose]}
                     // onPress={() => submitUpload()}
                    >
                      <Text style={styles.textStyle}>Save</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.button, styles.buttonClose]}
                     // onPress={() => submitUpload()}
                    >
                      <Text style={styles.textStyle}>Close</Text>
                    </TouchableOpacity>
                  </View>

                       
                      </View>
                    

                       
                      </View>
                    

                 

                 
             
                </View>
        
      
      </Modal>


      <Modal
         animationType="slide"
         transparent={true}
      
        visible={actionmodalVisible}
        onRequestClose={() => {
          setActionModalVisible(!actionmodalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 10,
                width: wp(90),
                alignSelf: 'center',
              }}>
            
              <TouchableOpacity
                onPress={() => setActionModalVisible(!actionmodalVisible)}
               // onPress={() => navigation.navigate('ContactUs')}
              
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

            <View style={{
              //  flexDirection:'row',
              //  justifyContent:"center",
               // alignItems:"center",
               borderBottomWidth:1,
                width:wp(90),
              //  backgroundColor:'red',
                 height:wp(15),
                 marginBottom:10
                }}>
                    {/* <View
                     style={{
                       
                        width:wp(30),
                       // backgroundColor:'yellow',
                        height:20
                        }}
                    >
                        <Text
                        style={{
                            textAlign:"left", fontSize: 12, fontFamily: 'Poppins-SemiBold', }}
                        >SOS</Text>
                       
                       <Text style={{ textAlign:"left", color: Color.darkGreen, fontSize: 12, fontFamily: 'Poppins-SemiBold', }}
                        >INACTIVE</Text>
                       
                         
                    </View> */}
                     <View
                     style={{
                       alignSelf:"center",
                       
                        }}
                    >
                           <Text
                            style={{
                                textAlign:"center",
                                fontSize: 12, fontFamily: 'Poppins-SemiBold', 
                            }}
                           >Files</Text>
                            <Text style={{ textAlign:"center", color: Color.darkGreen, fontSize: 12, fontFamily: 'Poppins-SemiBold', }}>Action ID #{REQUEST_INFO_BY_ID?.actionModel?.id}</Text>


                           
                    </View>
                      {/* <View
                     style={{
                        height:20,
                        width:wp(30),
                       // backgroundColor:'green',
                       
                        }}
                    >
                         <Text
                          style={{
                            textAlign:"right",
                            fontSize: 12, fontFamily: 'Poppins-SemiBold', 
                        }}
                         >Client ID</Text>
                    <Text style={{ textAlign:"right", color: Color.darkGreen, fontSize: 12, fontFamily: 'Poppins-SemiBold', }}> {REQUEST_INFO_BY_ID?.actionModel?.clientId}</Text>

                    </View> */}

            </View>
                     

            <View style={styles.formContainer}>
                 
               
                
                 


            
                 
                  <View style={{ marginBottom: 10 }}>
                    <Text
                      style={{ alignSelf: 'flex-start', padding: 5, color: '#fff' }}>
                    Upload File
                    </Text>
                    <Text
                      // key={index.toString()}
                      style={styles.uri}
                      numberOfLines={1}
                      ellipsizeMode={'middle'}>
                      {fileResponse ? fileResponse[0]?.name : null}
                    </Text>
                    <Text></Text>
                    <Button title="Select 📑" 
                    onPress={handleDocumentSelection} 
                    />
                  </View>

                  <View style={{marginTop:10, marginBottom: 10, flexDirection:"row",justifyContent:'space-between',
                    width:wp(85)
                }}>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonClose1]}
                     // onPress={() => submitUpload()}
                    >
                      <Text style={styles.textStyle}>Upload</Text>
                    </TouchableOpacity>

                  
                  </View>

                       
                      </View>
                    

                       
                      </View>
                    

                 

                 
             
                </View>
        
      
      </Modal>

      <Modal
         animationType="slide"
         transparent={true}
      
        visible={trackingmodalVisible}
        onRequestClose={() => {
          setTrackingModalVisible(!trackingmodalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 10,
                width: wp(90),
                alignSelf: 'center',
              }}>
            
              <TouchableOpacity
                onPress={() => setTrackingModalVisible(!trackingmodalVisible)}
               // onPress={() => navigation.navigate('ContactUs')}
              
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

            <View style={{
              //  flexDirection:'row',
              //  justifyContent:"center",
               // alignItems:"center",
               borderBottomWidth:1,
                width:wp(90),
              //  backgroundColor:'red',
                 height:wp(15),
                 marginBottom:10
                }}>
                    {/* <View
                     style={{
                       
                        width:wp(30),
                       // backgroundColor:'yellow',
                        height:20
                        }}
                    >
                        <Text
                        style={{
                            textAlign:"left", fontSize: 12, fontFamily: 'Poppins-SemiBold', }}
                        >SOS</Text>
                       
                       <Text style={{ textAlign:"left", color: Color.darkGreen, fontSize: 12, fontFamily: 'Poppins-SemiBold', }}
                        >INACTIVE</Text>
                       
                         
                    </View> */}
                     <View
                     style={{
                       alignSelf:"center",
                       
                        }}
                    >
                           <Text
                            style={{
                                textAlign:"center",
                                fontSize: 12, fontFamily: 'Poppins-SemiBold', 
                            }}
                           >Tracking Status</Text>
                            <Text style={{ textAlign:"center", color: Color.darkGreen, fontSize: 12, fontFamily: 'Poppins-SemiBold', }}>Action ID #{REQUEST_INFO_BY_ID?.actionModel?.id}</Text>


                           
                    </View>
                    

            </View>
                     

            <View style={styles.formContainer}>
              
                  <View style={{ marginBottom: 10 }}>
                    {buttonSelection == 'New' ?
                    
                    <TouchableOpacity
                    style={[styles.button, styles.buttonClose1,{marginBottom:10}]}
                    onPress={() => SelectButton('New')}
                  >
                    <Text style={styles.activetextStyle}>New</Text>
                  </TouchableOpacity>
                    :

                    <TouchableOpacity
                    style={[styles.button, styles.inactivebutton,{marginBottom:10}]}
                    onPress={() => SelectButton('New')}
                  >
                    <Text style={styles.inactivetextStyle}>New</Text>
                  </TouchableOpacity>
                    
                    }
                


                {buttonSelection == 'Started' ?     
                 
                    <TouchableOpacity
                      style={[styles.button, styles.orangebutton,{marginBottom:10}]}
                      onPress={() => SelectButton('Started')}
                    >
                      <Text style={styles.activetextStyle}>Started</Text>
                    </TouchableOpacity>

                    :

                    <TouchableOpacity
                    style={[styles.button, styles.inactivebutton,{marginBottom:10}]}
                    onPress={() => SelectButton('Started')}
                  >
                    <Text style={styles.inactivetextStyle}>Started</Text>
                  </TouchableOpacity>
                }

                    { buttonSelection == 'Resolved' ?   
                       <TouchableOpacity
                       style={[styles.button, styles.greenbutton,{marginBottom:10}]}
                       onPress={() => SelectButton('Resolved')}
                     >
                       <Text style={styles.activetextStyle}>Resolved</Text>
                     </TouchableOpacity>
                     :
                     <TouchableOpacity
                     style={[styles.button, styles.inactivebutton,{marginBottom:10}]}
                     onPress={() => SelectButton('Resolved')}
                   >
                     <Text style={styles.inactivetextStyle}>Resolved</Text>
                   </TouchableOpacity>
                    } 

                    { buttonSelection == 'Completed' ? 

                    <TouchableOpacity
                    style={[styles.button, styles.pinkbutton,{marginBottom:10}]}
                    onPress={() => SelectButton('Completed')}
                    >
                    <Text style={styles.activetextStyle}>Completed</Text>
                    </TouchableOpacity>
                    :
                 
                    <TouchableOpacity
                      style={[styles.button, styles.inactivebutton,{marginBottom:10}]}
                      onPress={() => SelectButton('Completed')}
                    >
                      <Text style={styles.inactivetextStyle}>Completed</Text>
                    </TouchableOpacity>

                }


                { buttonSelection == 'Cancelled' ? 

                    <TouchableOpacity
                    style={[styles.button, styles.redbutton,{marginBottom:10}]}
                    onPress={() => SelectButton('Cancelled')}
                    >
                    <Text style={styles.activetextStyle}>Cancelled</Text>
                    </TouchableOpacity>
                    :

                    <TouchableOpacity
                      style={[styles.button, styles.inactivebutton,{marginBottom:10}]}
                      onPress={() => SelectButton('Cancelled')}
                    >
                      <Text style={styles.inactivetextStyle}>Cancelled</Text>
                    </TouchableOpacity>
}
                  
                  
                  </View>

                  <View style={{marginTop:10, marginBottom: 10, flexDirection:"row",justifyContent:'space-between',
                    width:wp(85)
                }}>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonClose]}
                     // onPress={() => submitUpload()}
                    >
                      <Text style={styles.textStyle}>Close</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.button, styles.buttonClose]}
                     // onPress={() => submitUpload()}
                    >
                      <Text style={styles.textStyle}>Save Changes</Text>
                    </TouchableOpacity>

                  
                  </View>

                       
                      </View>
                    

                       
                      </View>
                    

                 

                 
             
                </View>
        
      
      </Modal>
            </ScrollView>


        </View>

    )
}

export default ViewRequest

const styles = StyleSheet.create({
    container: {
        width: '95%',
        alignSelf: 'center'
    },
    header: {
        backgroundColor: '#CDF2FF',
        alignItems: 'center',
        height: hp(5),
        justifyContent: 'center'
    },
    LIstText2: {
        color: '#000',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 12
    },
    LIstText3: {
        color: '#000',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 12,
        paddingLeft:10
    },

    subHead: {
        width: 100,
        fontSize: 12,
        fontFamily: 'Poppins-SemiBold',
        color: Color.headerIconBG
    },
    headingClient: {
        fontSize: 15,
        fontFamily: 'Poppins-Bold',
        // maxWidth:'80%',
        color: '#fff',
        // height:40,
        marginTop: 10,
        // marginLeft: 20,
        fontWeight: '600',

        // textAlign: 'center',
    },
    contentView: {
        height: 40,
        backgroundColor: '#fff',
        marginTop: 1,
        padding: 10,
        flexDirection: 'row',
        // borderRadius: 20,
        // marginLeft: 10,
        // marginRight: 10,
    },
    contentView1: {
        height: 40,
        backgroundColor: '#FFEFCE',
        marginTop: 10,
        padding: 10,
        flexDirection: 'row',
        borderRadius: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    slideContainerClient: {
        backgroundColor: Color.green,
        width: wp(90),
        justifyContent: 'center',
        alignSelf: 'center',
        // height: hp(2=10),
        opacity: 2,
        // paddingBottom: 20,
        marginTop: 5,
    },
    slideContainerClient1: {
        backgroundColor: Color.headerIconBG,
        width: wp(90),
        height: wp(10),
        justifyContent: 'center',
        // alignSelf: 'center',
        //alignItems: "center",
        /// height: 420,
        // opacity: 2,
        // paddingBottom: 20,
        // marginTop: 20,
    },
    sos: {
        backgroundColor: Color.green, color: '#fff', borderRadius: 3, marginLeft: 10, marginRight: 10, width: wp(6), alignSelf: 'center', marginTop: 5, height: hp(3),
        fontFamily: 'Poppins-Bold', textAlign: "center"
    },
    notes: {
        fontFamily: 'Poppins-Bold', textAlign: "center", backgroundColor: '#ED5565', color: '#fff', borderRadius: 3, marginLeft: 10, marginRight: 10, width: wp(6), alignSelf: 'center', marginTop: 5, height: hp(3),

    },
    action: {
        backgroundColor: '#F8AC59', color: '#fff', borderRadius: 3, marginLeft: 10, marginRight: 4, width: wp(6), alignSelf: 'center', marginTop: 5, height: hp(3),
        fontFamily: 'Poppins-Bold', textAlign: "center",
    },
    bgImg: {
        paddingBottom: 140
    },
    part: {
        borderWidth: 0.5,
        borderColor: 'lightgray',
        // marginTop: 10,
        width: '100%',
        alignSelf: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',

        // flex: 1,
    
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
        // justifyContent: 'flex-end',
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
      Subheading: {
        fontSize: 16,
        color: '#000',
      textAlign:"center",
      fontFamily:'Poppins-SemiBold'
      },


      formContainer: {
        backgroundColor: '#2F4050',
        width: wp(90),
        padding: 10,
        alignSelf: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
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
      buttonClose1: {
        backgroundColor: '#8AB645',
        width: wp(85),
      },
      orangebutton: {
        backgroundColor: 'orange',
        width: wp(85),
      },
      greenbutton: {
        backgroundColor: 'green',
        width: wp(85),
      },
      pinkbutton: {
        backgroundColor: 'pink',
        width: wp(85),
      },
      redbutton: {
        backgroundColor: 'red',
        width: wp(85),
      },


      inactivebutton: {
        backgroundColor: '#fff',
        borderWidth:1,
        width: wp(85),
      },

      buttonClose: {
        backgroundColor: '#8AB645',
        width: wp(40),
      },

      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      inactivetextStyle: {
        color: '#000',
        fontSize:14,
       fontFamily:'Poppins-SemiBold',
        textAlign: 'center',
      },
      activetextStyle: {
        color: '#fff',
        fontSize:14,
       fontFamily:'Poppins-SemiBold',
        textAlign: 'center',
      },
      button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        width: 120,
        alignSelf: 'center',
      },
      uri: {
        color: '#fff'
      },
})