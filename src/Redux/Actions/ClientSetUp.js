import {
    INTEREST_LIST,PROFESSION_LIST,
    ADD_CLIENT_SETUP
  } from './types';
  import AsyncStorage from '@react-native-community/async-storage';
  import axios, * as others from 'axios';
  import { Alert } from 'react-native';
  import { useDispatch, useSelector } from 'react-redux';
  import { logistical } from '../../utils';



  export const GetInterestList = ( navigation) => dispatch => {
   
  
    return new Promise(async (resolve, reject) => {
      let data ={

        "clientInterestedAreaList": []
      
      };

      const response = await logistical.post('/StaffLogin/GetInterests', data);
      // console.log(response, 'respppClientInforespppClientInfo');
  
      if (response.failureStatus == false) {
       
  
  
        // AsyncStorage.setItem('login', JSON.stringify(response.token));
  
        dispatch({
          type: INTEREST_LIST,
          payload: response.clientInterestedAreaList,
        });
  
        //   Alert.alert(response.response[0])
        resolve(response);
     

  
      } else {
        // Alert.alert(response.message)
        Alert.alert(response.massage);
      //  navigation.navigate('home');

       
        reject(response);
      }
    });
  };
  


  export const GetProfessionList = ( navigation) => dispatch => {
   
  
    return new Promise(async (resolve, reject) => {
      let data ={

        "clientInterestedAreaList": []
      
      };

      const response = await logistical.post('/StaffLogin/GetProfessions', data);
      // console.log(response, 'respppClientInforespppClientInfo');
  
      if (response.failureStatus == false) {
        // console.log(
        //   response,"clientInterestedAreaListclientInterestedAreaListclientInterestedAreaList"
        
        // );
  
  
        // AsyncStorage.setItem('login', JSON.stringify(response.token));
  
        dispatch({
          type: PROFESSION_LIST,
          payload: response.professionListView,
        });
  
        //   Alert.alert(response.response[0])
        resolve(response);
  
      } else {
        // Alert.alert(response.message)
        Alert.alert(response.massage);
       
        reject(response);
      }
    });
  };



  export const ConfirmClientSetup = (
    STAFFID,CLIENTID,CLIENTTYPE,FIRSTNAME,LASTNAME,EMAIL,
    PHONE,WHATSAPP,REFERREDBYSOURCE,BankName,AccountNumber,AccountType,RoutingNumber,
    AssociationList,PROFESSIONLIST,INTERESTEDAREAS,
    
    navigation
     
     ) => dispatch => {
   
  
    return new Promise(async (resolve, reject) => {
      let data ={
        "STAFFDATA": {
            "STAFFID": STAFFID,
            "CLIENTTYPE": CLIENTTYPE,
            "CLIENTID": CLIENTID,
            "FIRSTNAME": FIRSTNAME,
            "LASTNAME": LASTNAME,
            // "LANGUAGE":"1",
            // "COUNTRY":"72",
            "EMAIL": EMAIL,
            "PHONE": PHONE,
            "WHATSAPP": WHATSAPP,
            "REFERREDBYSOURCE": REFERREDBYSOURCE,
            "PROFESSIONLIST": PROFESSIONLIST,
            "INTERESTEDAREAS": INTERESTEDAREAS,
            // "HAVERETAILER":"YES",
            // "RETAILERNAME":"TEST NAME",
            // "RETAILERPHONE":"5985695748",
            // "RETAILEREMAIL":"TEST@GMAIL.COM",
            "BankName": BankName,
            "AccountNumber":AccountNumber,
            "AccountType": AccountType,
            "RoutingNumber": RoutingNumber,
            "AssociationList": AssociationList
        }
    }

    console.log(data,'finalllllllllll')

     const response = await logistical.post('/StaffLogin/Setup', data);
      console.log(response, 'respppClientInforespppClientInfo');
  
      if (response.failureStatus == false) {
        console.log(
          response,"SetupSetupSetupSetupSetupSetupSetupSetup"
        
        );
  
  
        // AsyncStorage.setItem('login', JSON.stringify(response.token));
  
        dispatch({
          type: ADD_CLIENT_SETUP,
          payload: response,
        });
  
        //   Alert.alert(response.response[0])
        Alert.alert(response.massage);
        resolve(response);
        navigation.navigate('Auth');
  
      } else {
        // Alert.alert(response.message)
        Alert.alert(response.massage);
        navigation.navigate('home');

       
        reject(response);
      }
    });
  };
  
  
  