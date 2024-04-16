import {
  LOGIN_DATA,
  MY_INFO,
  MANAGER_INFO,
  OFFICE_INFO,
  PARTNER_INFO,
  CLIENT_LIST,
  GET_LIB_FILES,
  CLIENT_DETAIL,
  REQUEST_INFO,
  REQUEST_INFO_BY_ID,
  FOLDER_LIST,
  DOCUMENT_INFO_FOLDER,
  FILE_UPLOAD_TOKEN,
  FILE_INFO
} from './types';
import AsyncStorage from '@react-native-community/async-storage';
import axios, * as others from 'axios';
import { Alert, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logistical } from '../../utils';

export const LoginUser = (email, navigation) => dispatch => {
  // dispatch({
  //   type: 'LOADING',
  //   payload: true,
  // });

  return new Promise(async (resolve, reject) => {
    let data = {
      staffview: {
        user: email,
        "clientBrand": "CONTADOR"
      },
    };

    //console.log(data, 'dataaaaaa');

    const response = await logistical.postlogin('/Staff/LoginStaff', data);
    console.log(response.token, 'responseresponseresponseresponse');
    console.log(response.clientSetupStatus, 'responseresponseresponseresponse2222222222222222');

    if (response.statusCode == 200 && response.clientSetupStatus == true) {
      AsyncStorage.setItem('login', JSON.stringify(response.token));
      AsyncStorage.setItem('response', response.staffview.user);


      dispatch({
        type: LOGIN_DATA,
        payload: response.staffview.user,
      });

      resolve(response);
      navigation.navigate('Auth1');
      //navigation.navigate('ClientSetup');
    }

    else if (response.statusCode == 404 && response.clientSetupStatus == true) {

      Alert.alert(response.massage);
      navigation.navigate('home');
    }

    else if (response.statusCode == 200 && response.clientSetupStatus == false) {

      AsyncStorage.setItem('login', JSON.stringify(response.token));
      AsyncStorage.setItem('response', response.staffview.user);

      dispatch({
        type: LOGIN_DATA,
        payload: response.staffview.user,
      });

      resolve(response);
      //  Alert.alert(response.massage);
      navigation.navigate('ClientSetup');

    }

    else {
      // Alert.alert(response.message)
      Alert.alert('Your Account is not Approved');
      navigation.navigate('home');
      // dispatch({
      //   type: 'LOADING',
      //   payload: false,
      // });
      reject(response);
    }
  });
};

export const clientInfo = (email, navigation) => dispatch => {
  //console.log(email, 'clientInfoclientInfoclientInfoclientInfoclientInfoLLLLLLLLLLLLL')

  //console.log(email, 'IIIIIIIIIIIIIIIIII')
  // dispatch({
  //   type: 'LOADING',
  //   payload: true,
  // });

  return new Promise(async (resolve, reject) => {
    let data = {
      staffview: {
        user: email,
      },
    };
    const response = await logistical.post('/Staff/GetStaffById', data);
    // console.log(response, 'respppClientInforespppClientInfo');

    if (response.failureStatus == false) {
      // console.log(
      //   response.guestInfo,
      //   'guestInfoguestInfoguestInfoguestInfoguestInfoguestInfoguestInfoguestInfoguestInfo',

      // );


      // AsyncStorage.setItem('login', JSON.stringify(response.token));

      dispatch({
        type: MY_INFO,
        payload: response,
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

export const client_Detail = (ClinetId, ClinetType, navigation) => dispatch => {
  // dispatch({
  //   type: 'LOADING',
  //   payload: true,
  // });

  return new Promise(async (resolve, reject) => {

    let data = {
      GuestInfo: {
        clientId: ClinetId,
        clientType: ClinetType,
      },
    };

    const response = await logistical.post('/Staff/IndividualClientInfo', data);
    //console.log(response, 'client_Detailclient_Detailclient_Detail');

    if (response.failureStatus == false) {
      // console.log(
      //   response,
      //   'guestInfoguestInfoguestInfoguestInfoguestInfoguestInfoguestInfoguestInfoguestInfo',
      // );
      // AsyncStorage.setItem('login', JSON.stringify(response.token));

      dispatch({
        type: CLIENT_DETAIL,
        payload: response,
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

export const ManagerInfo = (clientId, clientType, navigation) => dispatch => {

  //console.log(clientId, clientType, 'clientIdclientIdclientIdclientId,clientType')
  // dispatch({
  //   type: 'LOADING',
  //   payload: true,
  // });

  return new Promise(async (resolve, reject) => {
    let data = {
      clientInfo: {
        clientId: clientId,
        clientType: clientType,
      },
    };
    const response = await logistical.post('/Staff/GetManagerInfo', data);

    //console.log(response.managerInfo, 'managerInfomanagerInfomanagerInfomanagerInfo');
    //console.log(response.officeInfo, 'officeInfoofficeInfoofficeInfo');
    //console.log(response, 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');

    if (response) {
      // AsyncStorage.setItem('login', JSON.stringify(response.token));
      // console.log(response.managerInfo, 'managerInfomanagerInfomanagerInfo');

      dispatch({

        type: MANAGER_INFO,
        payload: response.managerInfo,

      });

      dispatch({
        type: OFFICE_INFO,
        payload: response.officeInfo,
      });

      dispatch({
        type: PARTNER_INFO,
        payload: response.partnerInfo,
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
      Alert.alert('No data found');
      //Alert.alert(response.massage);
      // dispatch({
      //   type: 'LOADING',
      //   payload: false,
      // });
      reject(response);
    }
  });
};

export const ClientInfoList =
  (clientId, clientType, navigation) => dispatch => {
    // dispatch({
    //   type: 'LOADING',
    //   payload: true,
    // });

    console.log("AAAAAAAAAA", clientId, clientType)

    return new Promise(async (resolve, reject) => {
      let data = {
        GuestInfo: {
          clientId: clientId,
          clientType: clientType,
        },
      };
      const response = await logistical.post('/Staff/GetAssociateList', data);
      console.log(
        response.associateListInfo,
        'associateListInfoassociateListInfoassociateListInfoassociateListInfoassociateListInfo',
      );

      if (response) {

        // AsyncStorage.setItem('login', JSON.stringify(response.token));

        dispatch({
          type: CLIENT_LIST,
          payload: response.associateListInfo,
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
        Alert.alert('No data found');
        //Alert.alert(response.massage);
        // dispatch({
        //   type: 'LOADING',
        //   payload: false,
        // });
        reject(response);
      }
    });
  };


export const RequestInfoList = (clientId, navigation) => dispatch => {
  // dispatch({
  //   type: 'LOADING',
  //   payload: true,
  // });

  return new Promise(async (resolve, reject) => {
    let data = {
      GuestInfo: {
        ClientId: clientId,
      },
    };
    //  console.log(data, 'requestPayload')
    const response = await logistical.post('/Staff/GetAllRequest', data);
    //console.log(response, 'GetAllRequestInfo');

    if (response) {
      // AsyncStorage.setItem('login', JSON.stringify(response.token));

      dispatch({
        type: REQUEST_INFO,
        payload: response,
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
      Alert.alert('No data found');
      //Alert.alert(response.massage);
      // dispatch({
      //   type: 'LOADING',
      //   payload: false,
      // });
      reject(response);
    }
  });
};

export const RequestSubmit = (data, navigation) => dispatch => {
  // dispatch({
  //   type: 'LOADING',
  //   payload: true,
  // });

  return new Promise(async (resolve, reject) => {

    //console.log(data, 'submitrequestPayload')
    const response = await logistical.post('/Staff/SubmitRequest', data);
    //console.log(response, 'SubmitlRequestInforesponse');

    if (response) {
      // AsyncStorage.setItem('login', JSON.stringify(response.token));

      // dispatch({
      //   type: REQUEST_INFO,
      //   payload: response,
      // });

      //   Alert.alert(response.response[0])
      resolve(response);

      // Alert.alert('Submit Request Sent');
      Alert.alert(
        'Alert',
        'Your request has been submitted',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        {
          // Custom styles for the Alert component
          containerStyle: styles.alertContainer,
          titleStyle: styles.alertTitle,
          messageStyle: styles.alertMessage,
        }
      );
      setTimeout(() => {
        navigation.goBack();
      }, 2000);

      // dispatch({
      //   type: 'LOADING',
      //   payload: false,
      // });
    } else {
      Alert.alert(
        'Alert',
        'No data found',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        {
          // Custom styles for the Alert component
          containerStyle: styles.alertContainer,
          titleStyle: styles.alertTitle,
          messageStyle: styles.alertMessage,
        }
      );
      // Alert.alert('No data found');
      //Alert.alert(response.massage);
      // dispatch({
      //   type: 'LOADING',
      //   payload: false,
      // });
      reject(response);
    }
  });
};

export const RequestInfoById = (id, navigation) => dispatch => {

  // console.log(id, 'UUUUUUUUUUUU')
  // dispatch({
  //   type: 'LOADING',
  //   payload: true,
  // });

  return new Promise(async (resolve, reject) => {
    let data = {
      ActionModel: {
        Id: id
      }
    };
    console.log(data, 'requestIdPayload')
    const response = await logistical.post('/Staff/GetRequestById', data);


    if (response.statusCode == 200) {
      // AsyncStorage.setItem('login', JSON.stringify(response.token));
      //  console.log(response, 'YYYYYYYYYYYYYYY')
      dispatch({
        type: REQUEST_INFO_BY_ID,
        payload: response,
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
      // Alert.alert('No data found');
      Alert.alert(
        'Alert',
        'No data found',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        {
          // Custom styles for the Alert component
          containerStyle: styles.alertContainer,
          titleStyle: styles.alertTitle,
          messageStyle: styles.alertMessage,
        }
      );
      //Alert.alert(response.massage);
      // dispatch({
      //   type: 'LOADING',
      //   payload: false,
      // });
      reject(response);
    }
  });
};


export const folderNameList =
  (clientId, clientType, navigation) => dispatch => {
    // dispatch({
    //   type: 'LOADING',
    //   payload: true,
    // });

    return new Promise(async (resolve, reject) => {
      let data = {
        GuestInfo: {
          clientType: clientType == "company" ? "Business" : clientType,
          //  clientType: "Individual"

        },
      };
      const response = await logistical.post('/FileCabinet/GetFolderList', data);
      // console.log(
      //   response.azureFoldersInfo,
      //   'GetFolderList',
      // );

      if (response) {
        // AsyncStorage.setItem('login', JSON.stringify(response.token));

        dispatch({
          type: FOLDER_LIST,
          payload: response.azureFoldersInfo,
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
        // Alert.alert('No data found');
        Alert.alert(
          'Alert',
          'No data found',
          [
            {
              text: 'OK',
              onPress: () => console.log('OK Pressed'),
            },
          ],
          {
            // Custom styles for the Alert component
            containerStyle: styles.alertContainer,
            titleStyle: styles.alertTitle,
            messageStyle: styles.alertMessage,
          }
        );
        //Alert.alert(response.massage);
        // dispatch({
        //   type: 'LOADING',
        //   payload: false,
        // });
        reject(response);
      }
    });
  };


export const documentInfobyFolder = (documentId, navigation) => dispatch => {
  // dispatch({
  //   type: 'LOADING',
  //   payload: true,
  // });

  return new Promise(async (resolve, reject) => {
    let data = {
      FolderInfo: {
        DocumentTypeIds: documentId
      }
    };
    console.log(data, 'ddd')
    const response = await logistical.post('/FileCabinet/GetDocumentTypes', data);
    //console.log(response.documentInfo, 'hilllloooo');

    if (response) {
      // AsyncStorage.setItem('login', JSON.stringify(response.token));

      dispatch({
        type: DOCUMENT_INFO_FOLDER,
        payload: response.documentInfo,
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
      Alert.alert(
        'Alert',
        'No data found',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        {
          // Custom styles for the Alert component
          containerStyle: styles.alertContainer,
          titleStyle: styles.alertTitle,
          messageStyle: styles.alertMessage,
        }
      );
      // Alert.alert('No data found');
      //Alert.alert(response.massage);
      // dispatch({
      //   type: 'LOADING',
      //   payload: false,
      // });
      reject(response);
    }
  });
};


export const uploadFile = (MY_INFO, FolderName, documentType, fileext, year, period, description, base64File, accessToken, documentsLibraryId, periodValue, UploadedByName, UploadedBy, navigation) => dispatch => {
  // dispatch({
  //   type: 'LOADING',
  //   payload: true,
  // });
  return new Promise(async (resolve, reject) => {


    let data = {
      "FileListModel": [
        {
          "FileModel": {
            "Brand": MY_INFO?.staffview?.clientBrand,
            "OfficeId": MY_INFO?.officeInfo?.officeId,
            "ClientType": MY_INFO?.guestInfo?.clientType,
            "ClientId": MY_INFO?.guestInfo?.client,
            "SharepointFolderName": FolderName,
            "DocumentType": documentType,
            "FileType": fileext,
            "Period": periodValue,
            "PeriodText": period,
            "Year": year.toString(),
            "Description": description,
            "UploadedByName": UploadedByName,
            "UploadedBy": UploadedBy.toString()
          },
          "FileData": base64File
        }
      ],
      "result": {
        "accessToken": accessToken,
        "LibraryId": documentsLibraryId
      }
    }

    console.log(data, 'datadatadatadatadatadatadata')
    console.log(data?.FileListModel[0]?.FileModel, 'uplaodPayload')
    const response = await logistical.post('/FileCabinet/UploadFiles', data);
    // console.log(response, 'UploadFilesResp');

    if (response && response?.statusCode == 200) {
      // AsyncStorage.setItem('login', JSON.stringify(response.token));

      // dispatch({
      //   type: DOCUMENT_INFO_FOLDER,
      //   payload: response.documentInfo,
      // });


      resolve(response);

      Alert.alert(response.massage)
      navigation.navigate('FileCabinet');

      // dispatch({
      //   type: 'LOADING',
      //   payload: false,
      // });
    } else {
      // Alert.alert('Folder does not exist');
      Alert.alert(
        'Alert',
        'Folder does not exist',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        {
          // Custom styles for the Alert component
          containerStyle: styles.alertContainer,
          titleStyle: styles.alertTitle,
          messageStyle: styles.alertMessage,
        }
      );
      //Alert.alert(response.massage);
      // dispatch({
      //   type: 'LOADING',
      //   payload: false,
      // });
      reject(response);
    }
  });
};



export const AssouploadFile = (MY_INFO, Aclient, AclientType, FolderName, documentType, fileext, year, period, description, base64File, accessToken, documentsLibraryId, periodValue, UploadedByName, UploadedBy, navigation) => dispatch => {
  // dispatch({
  //   type: 'LOADING',
  //   payload: true,
  // });
  return new Promise(async (resolve, reject) => {


    let data = {
      "FileListModel": [
        {
          "FileModel": {
            "Brand": MY_INFO?.staffview?.clientBrand,
            "OfficeId": MY_INFO?.officeInfo?.officeId,
            "ClientType": AclientType,
            "ClientId": Aclient,
            "SharepointFolderName": FolderName,
            "DocumentType": documentType,
            "FileType": fileext,
            "Period": periodValue,
            "PeriodText": period,
            "Year": year.toString(),
            "Description": description,
            "UploadedByName": UploadedByName,
            "UploadedBy": UploadedBy.toString()
          },
          "FileData": base64File
        }
      ],
      "result": {
        "accessToken": accessToken,
        "LibraryId": documentsLibraryId
      }
    }

    console.log(data, 'datadatadatadatadatadatadata')
    console.log(data?.FileListModel[0]?.FileModel, 'uplaodPayload')
    const response = await logistical.post('/FileCabinet/UploadFiles', data);
    // console.log(response, 'UploadFilesResp');

    if (response && response?.statusCode == 200) {
      // AsyncStorage.setItem('login', JSON.stringify(response.token));

      // dispatch({
      //   type: DOCUMENT_INFO_FOLDER,
      //   payload: response.documentInfo,
      // });


      resolve(response);

      Alert.alert(response.massage)
      navigation.navigate('FileCabinet');

      // dispatch({
      //   type: 'LOADING',
      //   payload: false,
      // });
    } else {
      // Alert.alert('Folder does not exist');
      Alert.alert(
        'Alert',
        'Folder does not exist',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        {
          // Custom styles for the Alert component
          containerStyle: styles.alertContainer,
          titleStyle: styles.alertTitle,
          messageStyle: styles.alertMessage,
        }
      );
      //Alert.alert(response.massage);
      // dispatch({
      //   type: 'LOADING',
      //   payload: false,
      // });
      reject(response);
    }
  });
};

// export const uploadFile = (MY_INFO, FolderName, documentType, year, period, description, base64File, accessToken, documentsLibraryId, navigation) => dispatch => {
//   // dispatch({
//   //   type: 'LOADING',
//   //   payload: true,
//   // });
//   return new Promise(async (resolve, reject) => {
//     // let data = {
//     //   "FileListModel": [
//     //     {
//     //       "FileModel":
//     //       {
//     //         "Brand": MY_INFO?.staffview?.clientBrand,
//     //         "OfficeId": MY_INFO?.officeInfo?.officeId,
//     //         "ClientType": MY_INFO?.guestInfo?.clientType,
//     //         "ClientId": MY_INFO?.guestInfo?.client,
//     //         "SharepointFolderName": FolderName,
//     //         "DocumentType": documentType,
//     //         "FileType": "pdf",
//     //         "Period": "1",
//     //         "PeriodText": period,
//     //         "Year": year,
//     //         "Description": description,
//     //         "UploadedByName": MY_INFO?.staffview?.firstName + ' ' + MY_INFO?.staffview?.lastName,
//     //         "UploadedBy": MY_INFO?.staffview?.id,
//     //       },
//     //       "FileData":base64File

//     //     }
//     //   ],
//     //   "result": {
//     //     "accessToken": accessToken,
//     //     "LibraryId": documentsLibraryId
//     //   }
//     // };

//     let data = {
//       "FileListModel": [
//         {
//           "FileModel": {
//             "Brand": "TAXLEAF",
//             "OfficeId": "TL MDADE",
//             "ClientType": "individual",
//             "ClientId": "EASTSONSPRI",
//             "SharepointFolderName": FolderName,
//             "DocumentType": documentType,
//             "FileType": "pdf",
//             "Period": "1",
//             "PeriodText": "FEB",
//             "Year": "23",
//             "Description": "Example",
//             "UploadedByName": "Prince Eastsons",
//             "UploadedBy": "973"
//           },
//           "FileData": base64File
//         }
//       ],
//       "result": {
//         "accessToken": accessToken,
//         "LibraryId": documentsLibraryId
//       }
//     }

//     console.log(data?.FileListModel[0]?.FileModel, 'uplaodPayload')
//     const response = await logistical.post('/FileCabinet/UploadFiles', data);
//     // console.log(response, 'UploadFilesResp');

//     if (response && response?.statusCode == 200) {
//       // AsyncStorage.setItem('login', JSON.stringify(response.token));

//       // dispatch({
//       //   type: DOCUMENT_INFO_FOLDER,
//       //   payload: response.documentInfo,
//       // });


//       resolve(response);

//       Alert.alert(response.massage)
//       navigation.navigate('FileCabinet');

//       // dispatch({
//       //   type: 'LOADING',
//       //   payload: false,
//       // });
//     } else {
//       Alert.alert('No data found');
//       //Alert.alert(response.massage);
//       // dispatch({
//       //   type: 'LOADING',
//       //   payload: false,
//       // });
//       reject(response);
//     }
//   });
// };


export const generateFileToken = (documentId, navigation) => dispatch => {
  // dispatch({
  //   type: 'LOADING',
  //   payload: true,
  // });

  return new Promise(async (resolve, reject) => {

    const response = await logistical.post('/FileCabinet/GenerateToken');
    //console.log(response, 'AccessToken');

    if (response) {
      // AsyncStorage.setItem('login', JSON.stringify(response.token));

      //console.log(response, 'FILE_UPLOAD_TOKENFILE_UPLOAD_TOKENFILE_UPLOAD_TOKENFILE_UPLOAD_TOKEN')

      dispatch({
        type: FILE_UPLOAD_TOKEN,
        payload: response,
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
      // Alert.alert('No data found');
      Alert.alert(
        'Alert',
        'No data found',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        {
          // Custom styles for the Alert component
          containerStyle: styles.alertContainer,
          titleStyle: styles.alertTitle,
          messageStyle: styles.alertMessage,
        }
      );
      //Alert.alert(response.massage);
      // dispatch({
      //   type: 'LOADING',
      //   payload: false,
      // });
      reject(response);
    }
  });
};

export const getFileInfo = (client, clientType, navigation) => dispatch => {


  // dispatch({
  //   type: 'LOADING',
  //   payload: true,
  // });

  return new Promise(async (resolve, reject) => {
    let data = {
      "fileListViews": [
        {
          "guestInfo": {
            "client": client,
            //"clientType": clientType == "company" ? "Business" : clientType
            "clientType": clientType
          }
        }
      ]
    };

    // console.log(data, 'ddd')
    const response = await logistical.post('/FileCabinet/GetFiles', data);
    //console.log(response, 'fileResp');

    if (response) {
      // AsyncStorage.setItem('login', JSON.stringify(response.token));

      dispatch({
        type: FILE_INFO,
        payload: response?.fileListViews,
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
      // Alert.alert('No data found');
      Alert.alert(
        'Alert',
        'No data found',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        {
          // Custom styles for the Alert component
          containerStyle: styles.alertContainer,
          titleStyle: styles.alertTitle,
          messageStyle: styles.alertMessage,
        }
      );
      //Alert.alert(response.massage);
      // dispatch({
      //   type: 'LOADING',
      //   payload: false,
      // });
      reject(response);
    }
  });
};




export const GetAllLibraryFiles = (officeId, clientType, ClientId, SharepointFolderName, Brand, navigation) => dispatch => {

  return new Promise(async (resolve, reject) => {
    let data = {
      "LibraryId": "b!Lk512wjgi02RXgn1f6gS_LglI0RARFdPqlWhynyni0PoNyVdBpdDS6rPS1ae4PfD",

      "sharepointInfo": {
        "Brand": Brand[0],
        "OfficeId": officeId[0],
        "ClientType": clientType[0],
        "ClientId": ClientId[0],
        "SharepointFolderName": SharepointFolderName
      }
    }

    console.log(data, '&&&&&&&&&&&&&&&&')
    const response = await logistical.post('/FileCabinet/GetAllLibraryFiles', data);
    // console.log(response, 'fileRespfileRespfileRespfileRespfileRespfileRespfileRespfileRespfileRespfileRespfileResp');

    if (response) {
      // AsyncStorage.setItem('login', JSON.stringify(response.token));

      dispatch({
        type: GET_LIB_FILES,
        payload: response?.driveItemList,
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
      //  Alert.alert('No data found');
      Alert.alert(
        'Alert',
        'No data found',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        {
          // Custom styles for the Alert component
          containerStyle: styles.alertContainer,
          titleStyle: styles.alertTitle,
          messageStyle: styles.alertMessage,
        }
      );
      //Alert.alert(response.massage);
      // dispatch({
      //   type: 'LOADING',
      //   payload: false,
      // });
      reject(response);
    }
  });
};




export const SubmitContactUs = (id, name, phone, email, message, country, navigation) => dispatch => {

  return new Promise(async (resolve, reject) => {
    let data = {
      "ReceiverStaffId": id,
      "receipentName": name,
      "receipentPhoneWhatsapp": phone,
      "receipentEmail": email,
      "receipentMassage": message,
      "receipentCountry": country
    }

    console.log(data, '&&&&&&&&&&&&&&&&')
    const response = await logistical.post('/Request/SendContact', data);
    // console.log(response, 'fileRespfileRespfileRespfileRespfileRespfileRespfileRespfileRespfileRespfileRespfileResp');

    if (response) {
      // AsyncStorage.setItem('login', JSON.stringify(response.token));

      // dispatch({
      //   type: GET_LIB_FILES,
      //   payload: response?.driveItemList,
      // });


      // Alert.alert(response.massage)
      Alert.alert(
        'Success',
        response.massage,
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        {
          // Custom styles for the Alert component
          containerStyle: styles.alertContainer,
          titleStyle: styles.alertTitle,
          messageStyle: styles.alertMessage,
        }
      );
      resolve(response);

      // Alert.alert(response.massage);
      // navigation.navigate('ClientInfo');

      // dispatch({
      //   type: 'LOADING',
      //   payload: false,
      // });
    } else {
      //  Alert.alert('No data found');
      Alert.alert(
        'Alert',
        'No data found',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        {
          // Custom styles for the Alert component
          containerStyle: styles.alertContainer,
          titleStyle: styles.alertTitle,
          messageStyle: styles.alertMessage,
        }
      );
      //Alert.alert(response.massage);
      // dispatch({
      //   type: 'LOADING',
      //   payload: false,
      // });
      reject(response);
    }
  });
};

const styles = StyleSheet.create({
  alertContainer: {
    borderRadius: 10, // Adjust the border radius as needed
    backgroundColor: '#fff', // Adjust the background color as needed
    borderWidth: 1,
    borderColor: '#ccc', // Adjust the border color as needed
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Adjust the title text color as needed
  },
  alertMessage: {
    fontSize: 16,
    color: '#555', // Adjust the message text color as needed
  },
});