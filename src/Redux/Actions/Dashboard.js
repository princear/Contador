import { DASHBOARD_LIST, DASHBOARD_LIST_TWO, DASHBOARD_MESSAGE_LIST } from './types';

import AsyncStorage from '@react-native-community/async-storage';
import axios, * as others from 'axios';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logistical } from '../../utils';

export const dashboardlist =
  (clientId, clientType, OfficeId, navigation) => dispatch => {


    return new Promise(async (resolve, reject) => {
      let data = {
        GuestInfo: {
          ClientId: clientId,
          ClientType: clientType,
          OfficeId: OfficeId,
        },
        StartDate: "2023-12-15T09:22:46.571Z",
        EndDate: "2023-12-30T09:22:46.571Z",
      };
      // console.log(data, 'payloadDashboard');

      const response = await logistical.post('/Staff/DashboardInfo', data);
      //  console.log(response, 'PaymentListPaymentListPaymentListPaymentList');

      if (response.failureStatus == false) {
       // console.log(response, 'dashboarddashboarddashboard');
        // AsyncStorage.setItem('login', JSON.stringify(response.token));

        dispatch({
          type: DASHBOARD_LIST,
          payload: response?.newsandupdatelist,
        });

        dispatch({
          type: DASHBOARD_MESSAGE_LIST,
          payload: response?.actionmodel,
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



export const dashboardlist2 =
  (clientId, clientType, OfficeId, navigation) => dispatch => {


    return new Promise(async (resolve, reject) => {

      let data = {

        "CLIENTTYPE": clientType,
        "CLIENTID": clientId,
        "STARTDATE": "2020-12-01T10:11:13.733Z",
        "ENDDATE": "2023-12-27T10:11:13.733Z"

      };
      // console.log(data, 'payloadDashboard');

      const response = await logistical.post('/Request/GetNotifications', data);
      //  console.log(response, 'PaymentListPaymentListPaymentListPaymentList');

      if (response.failureStatus == false) {
        //  console.log(response, 'dashboard222222222222');
        // AsyncStorage.setItem('login', JSON.stringify(response.token));

        dispatch({
          type: DASHBOARD_LIST_TWO,
          payload: response?.notificationList,
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
