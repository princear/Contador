import { GET_PAYMENT_LIST, GET_ORDER_DETAILS } from './types';

import AsyncStorage from '@react-native-community/async-storage';
import axios, * as others from 'axios';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logistical } from '../../utils';

export const GetPaymentList =
  (clientId, clientType, navigation) => dispatch => {
    // dispatch({
    //   type: 'LOADING',
    //   payload: true,
    // });

    // console.log(
    //   clientId,
    //   clientType,
    //   'clientId, clientTypeclientId, clientType',
    // );

    return new Promise(async (resolve, reject) => {
      let data = {
        GuestInfo: {
          clientId: clientId,
          clientType: clientType,
        },
        // "GuestInfo": {
        //   "clientId": 684,
        //   "clientType": "company"
        // }

      };
      //console.log(data, 'payloadPaymentInfo')
      const response = await logistical.post('/Staff/PaymentInfo', data);
      //console.log(response, 'PaymentListPaymentListPaymentListPaymentList');

      if (response.failureStatus == false) {
        console.log(
          response.paymentListInfoModel,
          'GET_PAYMENT_LISTGET_PAYMENT_LISTGET_PAYMENT_LISTGET_PAYMENT_LIST',
        );
        // AsyncStorage.setItem('login', JSON.stringify(response.token));

        dispatch({
          type: GET_PAYMENT_LIST,
          payload: response.paymentListInfoModel,
        });

        //   Alert.alert(response.response[0])
        resolve(response);

        // Alert.alert(response.massage);
        // navigation.navigate('ClientInfo');

        // dispatch({
        //   type: 'LOADING',
        //   payload: false,
        // });
      } else {
        // Alert.alert(response.message)
        Alert.alert(response.massage);
        // dispatch({
        //   type: 'LOADING',
        //   payload: false,
        // });
        reject(response);
      }
    });
  };

export const GetDetailsbyOrderId =
  (clientId, clientType, orderId, navigation) => dispatch => {

    //console.log(clientId, clientType, orderId, "GetDetailsbyOrderIdGetDetailsbyOrderIdGetDetailsbyOrderId")
    // dispatch({
    //   type: 'LOADING',
    //   payload: true,
    // });

    // console.log(
    //   clientId,
    //   clientType,
    //   orderId,
    //   'clientId,clientType,orderId',
    // );

    return new Promise(async (resolve, reject) => {
      let data = {

        collectionView: {
          // orderId: orderId,
          // clientType: clientType,
          // client: clientId
          orderId: orderId,
          clientType: clientType,
          client: clientId
        }
      };
      //console.log(data, 'payloadOrderInfo')
      const response = await logistical.post('/Staff/IndividualOrderInfo', data);
      // console.log(response, 'orderInfoResponse');

      if (response.failureStatus == false) {
        // console.log(
        //   response.paymentListInfoModel,
        //   'guestInfoguestInfoguestInfoguestInfoguestInfoguestInfoguestInfoguestInfoguestInfo',
        // );
        // AsyncStorage.setItem('login', JSON.stringify(response.token));

        dispatch({
          type: GET_ORDER_DETAILS,
          payload: response.paymentListInfoModel,
        });

        //   Alert.alert(response.response[0])
        resolve(response);

        // Alert.alert(response.massage);
        // navigation.navigate('ClientInfo');

        // dispatch({
        //   type: 'LOADING',
        //   payload: false,
        // });
      } else {
        // Alert.alert(response.message)
        Alert.alert(response.massage);
        // dispatch({
        //   type: 'LOADING',
        //   payload: false,
        // });
        reject(response);
      }
    });
  };
