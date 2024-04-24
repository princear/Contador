import React, { useState, useEffect, useCallback } from 'react';

import { Linking } from 'react-native';

import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Button,
  ScrollView,
  Modal,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ImageBackground
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { DataTable } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import CustomHeader from '../Component/CustomHeader';
import CustomBottomTab from '../Component/CustomBottomTab';
import { Color } from '../Style';
import { folderNameList, documentInfobyFolder, uploadFile, AssouploadFile, generateFileToken, getFileInfo, GetAllLibraryFiles } from '../Redux/Actions/TaxLeaf';
import { Loader } from '../Component/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import DocumentPicker from 'react-native-document-picker'
import MyInfo from './MyInfo';
import RNFS from 'react-native-fs';
import HeadTabs from './HeadTabs';

let iconNm = require('../Assets/img/icons/msg.png');
let usericon = require('../Assets/img/icons/user-icon.png');
const AssoFileCabinet = ({ route }) => {

  const [idRow, setIdRow] = useState();
  const [selectedData, setSelectedData] = useState();
  const [documentId, setdocumentId] = useState();

  const [press, setPress] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState(null);
  const [value1, setValue1] = useState(null);
  const [period, setPeriod] = useState(null);
  const [periodValue, setPeriodValue] = useState(null)
  const [year, setYear] = useState(null);
  const [yearText, setYearText] = useState(null);
  const [description, setDescription] = useState(null);

  const [isFocus, setIsFocus] = useState(false);
  const [loader, setLoader] = useState(false);
  const [filesInFolder, setFIlesInFolder] = useState([])
  const [officeId, setOfficeId] = useState()
  const [ClientId, setClientId] = useState()
  const [clientType, setClientType] = useState()
  const [shareFolderName, setSharepointFolderName] = useState()
  const [brandName, setBrand] = useState()


  const [filteredReq, setFilteredReq] = useState();
  const [docTypeById, setDocTypeById] = useState();
  const [base64File, setBase64File] = useState();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { MY_INFO } = useSelector(state => state.TaxLeafReducer);
  const { FOLDER_LIST } = useSelector(state => state.TaxLeafReducer);
  const { GET_LIB_FILES } = useSelector(state => state.TaxLeafReducer);
  const { DOCUMENT_INFO_FOLDER } = useSelector(state => state.TaxLeafReducer)
  const { FILE_UPLOAD_TOKEN } = useSelector(state => state.TaxLeafReducer)
  const { FILE_INFO } = useSelector(state => state.TaxLeafReducer)
  //console.log(FILE_UPLOAD_TOKEN, 'FILE_UPLOAD_TOKEN')
  //console.log(FILE_INFO, 'FILE_INFO')

  const bgImage = require('../Assets/img/guest_shape.png');
  // console.log(docTypeById, 'docTypeById')
  // console.log(value, 'kkkkkk')
  // console.log(FOLDER_LIST, 'FOLDER_LIST')
  // console.log(DOCUMENT_INFO_FOLDER, 'DOCUMENT_INFO_FOLDER')
  //console.log(selectedData, 'selectedData')
  // console.log(value1, 'value1')

  const AclientID = route.params.clientID;
  const AclientType = route.params.clientType;
  const Aclient = route.params.client;
  const clientName = route.params.clientName;
  console.log(AclientID, AclientType, Aclient, 'ASSOOOOOOOOOO')

  const jsonData = Aclient; // MY_INFO.guestInfo;
  const dataArray = DOCUMENT_INFO_FOLDER ? Object.values(DOCUMENT_INFO_FOLDER) : [];
  const isYearPresent = value1?.variables.includes("year");
  const isPeriodPresent = value1?.variables.includes("period");
  const isdescriptionPresent = value1?.variables.includes("description");
  const documentsLibraryId = FILE_UPLOAD_TOKEN?.librarylist?.find(library => library?.name === 'Documents')?.id;
  const referenceFiles = FILE_INFO[0]?.referenceFiles
  const UploadedByName = MY_INFO?.staffview?.firstName + ' ' + MY_INFO?.staffview?.lastName
  const UploadedBy = MY_INFO?.staffview?.id
  //console.log(documentsLibraryId, 'documentsLibraryId')
  // console.log(MY_INFO, 'jsonData')



  // console.log(base64File,'baseeee')

  // console.log(jsonData?.client, jsonData?.clientType, 'KKKKKKKKKK')

  // console.log(Array.isArray(dataArray), 'isArray');
  const [fileResponse, setFileResponse] = useState();
  const [fileExt, setFileExt] = useState();




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
  // console.log(fileResponse[0]?.uri, 'fileResponse')
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  //console.log(filteredReq, 'filteredReq');

  // console.log(selectedData, 'selll');
  const data = [
    {
      id: 1,
      name: 'Tax Documents',
      leafCloud: 2,
      myFiles: 6,
    },
    {
      id: 2,
      name: 'Fax Documents',
      leafCloud: 2,
      myFiles: 5,
    },
    {
      id: 3,

      name: 'GST',
      leafCloud: 2,
      myFiles: 3,
    },
    {
      id: 4,

      name: 'Finance',
      leafCloud: 2,
      myFiles: 1,
    },
    {
      id: 5,

      name: 'Personal Docs',
      leafCloud: 2,
      myFiles: 0,
    },
    {
      id: 6,

      name: 'Family Docs',
      leafCloud: 2,
      myFiles: 2,
    },
  ];
  const dataPeriod = [
    { label: 'JAN', value: '0' },
    { label: 'FEB', value: '1' },
    { label: 'MAR', value: '2' },
    { label: 'APR', value: '3' },
    { label: 'MAY', value: '4' },
    { label: 'JUN', value: '5' },
    { label: 'JUL', value: '6' },
    { label: 'AUG', value: '7' },
    { label: 'SEP', value: '8' },
    { label: 'OCT', value: '9' },
    { label: 'NOV', value: '10' },
    { label: 'DEC', value: '11' },
    { label: 'Q1 (JAN-MAR)', value: '12' },
    { label: 'Q2 (APR-JUN)', value: '13' },
    { label: 'Q3 (JUL-SEP)', value: '14' },
    { label: 'Q4 (OCT-DEC)', value: '15' },

  ];

  const dataYear = [
    { label: '2001', value: '1' },
    { label: '2002', value: '2' },
    { label: '2003', value: '3' },
    { label: '2004', value: '4' },
    { label: '2005', value: '5' },
    { label: '2006', value: '6' },
    { label: '2007', value: '7' },
    { label: '2008', value: '8' },
    { label: '2009', value: '9' },
    { label: '2010', value: '10' },
    { label: '2011', value: '11' },
    { label: '2012', value: '12' },
    { label: '2013', value: '13' },
    { label: '2014', value: '14' },
    { label: '2015', value: '15' },
    { label: '2016', value: '16' },
    { label: '2017', value: '17' },
    { label: '2018', value: '18' },
    { label: '2019', value: '19' },
    { label: '2020', value: '20' },
    { label: '2021', value: '21' },
    { label: '2022', value: '22' },
    { label: '2023', value: '23' },
    { label: '2024', value: '24' },
    { label: '2025', value: '25' },
    { label: '2026', value: '26' },
    { label: '2027', value: '27' },
    { label: '2028', value: '28' },
    { label: '2029', value: '29' },
    { label: '2030', value: '30' },
    { label: '2031', value: '31' },
    { label: '2032', value: '32' },
    { label: '2033', value: '33' },
    { label: '2034', value: '34' },
    { label: '2035', value: '35' },
  ];



  const sortedDataYear = [...dataYear].sort((a, b) => b.label - a.label);

  const handleRow = item => {



    getFilesByFolder(selectedData?.azureFolderName, referenceFiles);

    setIdRow(item.id);
    setPress(true);
    setSelectedData(item);
    setdocumentId(item?.documentTypeIds)

    //   if (!filesInFolder.length) {
    //   getAllLibraryFiles(officeId, clientType, ClientId, item.azureFolderName, brandName, navigation);
    // }


    //  dispatch(GetAllLibraryFiles(officeId, clientType, ClientId, item.azureFolderName, brandName, navigation))
    //console.log(officeId, clientType, ClientId, item.azureFolderName, brandName, "PPPPPPP")
    console.log(item.azureFolderName, "KKKKKKKK")



  };


  // const handleRow = async (item) => {
  //   setLoader(true);

  //   // Assuming getFilesByFolder returns a Promise
  //   await getFilesByFolder(selectedData?.azureFolderName, referenceFiles, item.azureFolderName);

  // //  dispatch(GetAllLibraryFiles(officeId, clientType, ClientId, item.azureFolderName, brandName, navigation));



  //   console.log(officeId, clientType, ClientId, item.azureFolderName, brandName, "PPPPPPP");
  //   console.log(item, "KKKKKKKK");

  //   setIdRow(item.id);
  //   setPress(true);
  //   setSelectedData(item);
  //   setDocumentId(item?.documentTypeIds);

  //   setTimeout(() => {
  //     setLoader(false);
  //   }, 2000);
  // };

  const handleRowOFF = item => {
    setIdRow(item.id);
    setPress(false);
    setSelectedData(item);
    setdocumentId(item?.documentTypeIds)
  };

  useEffect(() => {
    setLoader(true);

    dispatch(
      folderNameList(AclientID, AclientType, navigation),
    );
    // dispatch(
    //   getFileInfo(jsonData?.client, jsonData?.clientType, navigation),
    // );
    setTimeout(() => {
      setLoader(false);
    }, 2000);

    // setInfoData(CLIENT_LIST);
  }, []);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setYear(currentYear);
    setYearText(currentYear.toString());
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();
    const currentMonth = dataPeriod[currentMonthIndex].label;

    setPeriod(currentMonth);
    setPeriodValue(dataPeriod[currentMonthIndex].value);
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts


  useEffect(() => {
    // setLoader(true);


    dispatch(
      getFileInfo(Aclient, AclientType, navigation),
    );
    // setTimeout(() => {
    //   setLoader(false);
    // }, 2000);

    // setInfoData(CLIENT_LIST);
  }, [filteredReq]);

  useEffect(() => {
    if (Array.isArray(FOLDER_LIST)) {
      const filteredFolders = FOLDER_LIST.filter(folder => {
        return folder.azureFolderName !== "Temporary Folder" && folder.azureRenameFolderName1 !== "";
      });

      setFilteredReq(filteredFolders)
      // console.log(filteredFolders, 'filteredFolders')
    }
  }, [FOLDER_LIST])





  useEffect(() => {

    setFIlesInFolder(GET_LIB_FILES)
  }, [FILE_INFO, GET_LIB_FILES])






  useEffect(() => {
    //  setLoader(true);

    dispatch(
      documentInfobyFolder(documentId, navigation),
    );
    // setTimeout(() => {
    //   setLoader(false);
    // }, 2000);
    // setInfoData(CLIENT_LIST);
  }, [documentId]);


  useEffect(() => {
    documentTypes(value)
  }, [value])

  useEffect(() => {
    dispatch(
      generateFileToken()
    )


  }, [])


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // setLoader(true);
      dispatch(
        getFileInfo(Aclient, AclientType, navigation),
      );
      // setTimeout(() => {
      //   setLoader(false);
      // }, 2000);

    });
    return unsubscribe;
  }, [navigation,]);


  //console.log(GET_LIB_FILES, 'GET_LIB_FILESGET_LIB_FILESGET_LIB_FILESGET_LIB_FILES')


  useEffect(() => {


    const filesInFolder = getFilesByFolder(selectedData?.azureFolderName, referenceFiles);
    //  getFilesByFolder(selectedData?.azureFolderName, referenceFiles);

    //setFIlesInFolder(filesInFolder)

    //console.log(filesInFolder, 'filesInFolder')
  }, [selectedData, FILE_UPLOAD_TOKEN])



  //console.log(FilesInFolder[0].name, 'FilesInFolderFilesInFolderFilesInFolderFilesInFolderFilesInFolderFilesInFolder')

  // const submitUpload = () => {
  //   setLoader(true);
  //   dispatch(
  //     uploadFile(MY_INFO, value?.azureFolderName, value1?.documentType, year, period, description, base64File, FILE_UPLOAD_TOKEN?.accessToken, documentsLibraryId, navigation),
  //   );
  //   dispatch(
  //     getFileInfo(jsonData?.clientId, jsonData?.clientType, navigation),
  //   );
  //   cancelModal()

  //   setTimeout(() => {
  //     setLoader(false);
  //   }, 2000);
  //   // cancelModal()
  // }


  // const submitUpload = async () => {
  //   setLoader(true);
  //   await dispatch(
  //     uploadFile(
  //       MY_INFO,
  //       value?.azureFolderName,
  //       value1?.documentType,
  //       year,
  //       period,
  //       description,
  //       base64File,
  //       FILE_UPLOAD_TOKEN?.accessToken,
  //       documentsLibraryId,
  //       navigation
  //     )
  //   );

  //   await dispatch(getFileInfo(jsonData?.clientId, jsonData?.clientType, navigation));

  //   // Access numberOfMatchingResults after getFileInfo has completed
  //   const numberOfMatchingResults = FILE_INFO[0]?.referenceFiles
  //     ?.filter(file => file.sharepointFolderName === selectedData?.azureFolderName)?.length;

  //   console.log(numberOfMatchingResults, 'numberOfMatchingResults');

  //   setLoader(false);
  //   cancelModal();
  // };

  const downloadFile = async (url, fileName) => {
    try {
      // Send a GET request to the SharePoint download URL
      const response = await fetch(url, { method: 'GET' });
      // Extract the final download URL after any redirects
      const finalUrl = response.url;

      console.log(finalUrl, 'responseresponseresponseresponseresponseresponseresponseresponse')

      Linking.openURL(finalUrl)
      // Create a config object for the download
      // const config = {
      //   fileCache: true,
      //   addAndroidDownloads: {
      //     useDownloadManager: true,
      //     notification: true,
      //     mediaScannable: true,
      //     title: fileName,
      //     path: `${RNFetchBlob.fs.dirs.DownloadDir}/${fileName}`,
      //   },
      // };

      // Start the download using the final URL
      // RNFetchBlob
      //   .config(config)
      //   .fetch('GET', finalUrl)
      //   .then((res) => {
      //     // Open the downloaded file
      //     Linking.openURL(res.path());
      //   })
      //   .catch((error) => {
      //     console.error('Download error:', error);
      //   });
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  // Example usage:
  const handleDownloadPress = (item) => {


    // dispatch(GetAllLibraryFiles(officeId, clientType, ClientId, SharepointFolderName, Brand, navigation))


    console.log(item, 'WWWWWWWW')


    // const downloadUrl = "https://taxleaf.sharepoint.com/sites/Leafcabinet/_layouts/15/download.aspx?UniqueId=b01b1016-df13-4c53-96e1-783861a1b9fb&Translate=false&tempauth=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvdGF4bGVhZi5zaGFyZXBvaW50LmNvbUA5NzI4ZmNmOC1mMDRiLTQyNzEtYjM1Mi0wMjJhMzNmYmZjYzQiLCJpc3MiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAiLCJuYmYiOiIxNzAyOTc4NzE5IiwiZXhwIjoiMTcwMjk4MjMxOSIsImVuZHBvaW50dXJsIjoiSmNvUm0yQ0FUdnlNcXJqUDcwMW5aMUZOWjhMK2lxWGw0RHNpdUNVV2NSRT0iLCJlbmRwb2ludHVybExlbmd0aCI6IjEzNiIsImlzbG9vcGJhY2siOiJUcnVlIiwiY2lkIjoiR1NnZmJUQmF2RUtSUjM1ZXVDMm9EQT09IiwidmVyIjoiaGFzaGVkcHJvb2Z0b2tlbiIsInNpdGVpZCI6IlpHSTNOVFJsTW1VdFpUQXdPQzAwWkRoaUxUa3hOV1V0TURsbU5UZG1ZVGd4TW1aaiIsImFwcF9kaXNwbGF5bmFtZSI6IkNsaWVudHBvcnRhbC1TaGFyZXBvaW50LW1vYmlsZSIsIm5hbWVpZCI6IjA5ZjYxZWM0LTJhMjMtNDU5Mi04YjA2LWViNWNhN2U0NTMyYkA5NzI4ZmNmOC1mMDRiLTQyNzEtYjM1Mi0wMjJhMzNmYmZjYzQiLCJyb2xlcyI6ImFsbHNpdGVzLndyaXRlIiwidHQiOiIxIiwiaXBhZGRyIjoiMjAuMTkwLjE2MS44OCJ9.pQHK6wEXwgKKskNE_Nhq1Je8n60k2mJ-hgAkP2ZUx6U&ApiVersion=2.0"
    //const fileName = 'examplefile'; // Replace with your desired file name

    Linking.openURL(item)

    // downloadFile(downloadUrl, fileName);
  };

  const submitUpload = async () => {

    console.log(value?.azureFolderName,
      value1?.documentType, "SSSSSSSSSSSSSSSS", fileExt)
    setLoader(true);
    await dispatch(
      AssouploadFile(
        MY_INFO,
        Aclient,
        AclientType,
        value?.azureFolderName,
        value1?.documentType,
        fileExt,
        year,
        period,
        description,
        base64File,
        FILE_UPLOAD_TOKEN?.accessToken,
        documentsLibraryId,
        periodValue,
        UploadedByName,
        UploadedBy,
        navigation
      )
    );

    await dispatch(getFileInfo(Aclient, AclientType, navigation));

    // Access numberOfMatchingResults after getFileInfo has completed
    const numberOfMatchingResults = FILE_INFO[0]?.referenceFiles
      ?.filter(file => file.sharepointFolderName === selectedData?.azureFolderName)?.length;

    // console.log(numberOfMatchingResults, 'numberOfMatchingResults');


    setTimeout(() => {
      setLoader(false);
    }, 2000);
    cancelModal();
  };



  const cancelModal = () => {
    setModalVisible(!modalVisible)
    setValue(null)
    setValue1(null)
    setFileResponse()
  }



  const documentTypes = (item) => {
    console.log(item, 'itemitemitemitemitem')
    setLoader(true);
    // Alert.alert(item?.documentTypeIds)
    setdocumentId(item?.documentTypeIds)
    // dispatch(
    //   documentInfobyFolder(item?.documentTypeIds, navigation)
    // )
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }


  const getFilesByFolder = (azureFolderName, referenceFiles) => {
    setLoader(true)
    setFIlesInFolder([])
    const matchingFiles = referenceFiles?.filter(file => file.sharepointFolderName === azureFolderName)?.map(file => file?.fileName);
    const officeId = referenceFiles?.filter(file => file.sharepointFolderName === azureFolderName)?.map(file => file?.officeId);
    const clientType = referenceFiles?.filter(file => file.sharepointFolderName === azureFolderName)?.map(file => file?.clientType);
    const ClientId = referenceFiles?.filter(file => file.sharepointFolderName === azureFolderName)?.map(file => file?.clientId);
    const SharepointFolderName = referenceFiles?.filter(file => file.sharepointFolderName === azureFolderName)?.map(file => file?.sharepointFolderName);
    const Brand = referenceFiles?.filter(file => file.sharepointFolderName === azureFolderName)?.map(file => file?.brand);

    console.log(officeId, clientType, ClientId, SharepointFolderName, Brand, 'JJJJJJJJJ', azureFolderName)


    dispatch(GetAllLibraryFiles(officeId, clientType, ClientId, azureFolderName, Brand, navigation));




    setTimeout(() => {
      setLoader(false)
    }, 3000);

    // setOfficeId(officeId)
    // setClientType(clientType)
    // setClientId(ClientId)
    // setSharepointFolderName(SharepointFolderName)
    // setBrand(Brand)







    return matchingFiles;
  }

  const renderItem = ({ item }) => {


    const matchingReferenceFiles = referenceFiles?.filter(
      (file) =>
        file.sharepointFolderName.trim().toLowerCase() ===
        item?.azureFolderName.trim().toLowerCase()
    );

    const numberOfMatchingResults = matchingReferenceFiles?.length;

    // Count occurrences of Admin and Clients
    const adminCount = matchingReferenceFiles?.filter(
      (file) => file.uploadedFrom === "Admin"
    ).length;

    const clientCount = matchingReferenceFiles?.filter(
      (file) => file.uploadedFrom.trim().toLowerCase() === "client"
    ).length;

    // console.log(clientCount, 'clientCountclientCountclientCountclientCount')


    // const referenceFiles = FILE_INFO[0]?.referenceFiles




    // const matchingReferenceFiles = referenceFiles?.filter(
    //   (file) => file.sharepointFolderName.trim().toLowerCase() === item?.azureFolderName.trim().toLowerCase()
    // );

    // const numberOfMatchingResults = matchingReferenceFiles?.length;
    // const matchingLeafCloud = referenceFiles?.filter(file => file.sharepointFolderName.trim().toLowerCase() === item?.azureFolderName.trim().toLowerCase())?.map(file => file?.uploadedFrom);

    //  console.log(referenceFiles, 'numberOfMatchingResultsnumberOfMatchingResultsnumberOfMatchingResults')
    // console.log(matchingLeafCloud, 'matchingLeafCloudmatchingLeafCloudmatchingLeafCloudmatchingLeafCloud')

    return (
      <>
        {
          press == true && idRow == item.id ? null :
            <DataTable.Row
              key={item.id}
              onPress={() => { handleRow(item) }}

              style={{
                backgroundColor:
                  idRow == item.id && press == true ? '#fff' : '#fff', borderBottomWidth: 1, borderColor: '#d0e4e6'
              }}>
              <DataTable.Cell style={{ flex: 2 }}  >
                <Text
                  style={{
                    fontSize: 12,
                    color:
                      idRow == item.id && press == true
                        ? '#2F4050'
                        : Color.headerIconBG,
                    fontFamily: 'Poppins-SemiBold'
                  }}>
                  {item?.azureRenameFolderName1}
                </Text>
              </DataTable.Cell>
              <DataTable.Cell style={{ width: wp(30), alignItems: "center", justifyContent: "center" }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'Poppins-SemiBold',
                    width: 20,
                    color:
                      idRow == item.id && press == true
                        ? '#2F4050'
                        : '#676A6C',
                  }}>

                  {/* {item?.status} */}
                  {/* {matchingLeafCloud?.includes("Admin") ? 0 : 0} */}
                  {adminCount ? adminCount : 0}
                </Text>
              </DataTable.Cell>
              <DataTable.Cell style={{ width: wp(30), alignItems: "center", justifyContent: "center" }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'Poppins-SemiBold',
                    color:
                      idRow == item.id && press == true
                        ? '#2F4050'
                        : '#676A6C',
                  }}>
                  {/* {idRow == item.id && press == true && DOCUMENT_INFO_FOLDER ? DOCUMENT_INFO_FOLDER.length : '0'} */}
                  {/* {numberOfMatchingResults} */}
                  {clientCount ? clientCount : 0}

                </Text>
              </DataTable.Cell>
            </DataTable.Row>

        }

        {press == true && idRow == item.id ? (
          <View style={styles.popup}>
            <TouchableOpacity onPress={() => { handleRowOFF(item) }}>
              <Text style={styles.popupHead}>{selectedData?.azureRenameFolderName1}</Text>

            </TouchableOpacity>

            {/* <View style={styles.row}>
                          <Text style={styles.popupYear}>2023</Text>
                          <Text style={{ alignSelf: 'center', marginLeft: 10, fontSize: 14 }}>
                            (Total :  {DOCUMENT_INFO_FOLDER && DOCUMENT_INFO_FOLDER.length})
                          </Text>
                        </View> */}





            <DataTable style={styles.container}>
              <DataTable.Header style={styles.tableHeader1}>
                <DataTable.Title style={{ flex: 3 }}>
                  <Text style={styles.headerText1}>Document Type</Text>
                </DataTable.Title>
                <DataTable.Title style={{ flex: 1 }}>
                  <Text style={styles.headerText1}>CreatedAt</Text>
                </DataTable.Title>


              </DataTable.Header>




              <FlatList
                contentContainerStyle={{ paddingBottom: 200 }}
                data={filesInFolder}
                //data={GET_LIB_FILES}
                // numColumns={5}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <DataTable.Row
                    key={index}
                    style={{
                      backgroundColor:
                        idRow == item.id && press == true ? '#e8f1f2' : '#e8f1f2',
                    }}>

                    <TouchableOpacity
                      onPress={() => handleDownloadPress(item.downloadUrl)}
                      style={{ flex: 2.8 }}  >
                      {/* <TouchableOpacity
                        onPress={() => handleDownloadPress(item.downloadUrl)}
                      > */}
                      {/* <Image source={require('../Assets/img/icons/smallFile.png')}

                        style={{ height: 10, width: 10, }} /> */}
                      <Text
                        style={{

                          fontSize: 12,
                          fontFamily: 'Poppins-SemiBold',

                          color:
                            idRow == item.id && press == true
                              ? '#2F4050'
                              : '#676A6C',

                        }}>
                        {item.name}
                      </Text>

                      {/* </TouchableOpacity> */}
                    </TouchableOpacity>

                    <DataTable.Cell style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: 'Poppins-SemiBold',

                          color:
                            idRow == item.id && press == true
                              ? '#2F4050'
                              : '#676A6C',
                        }}>
                        {moment(item?.createdDateTime).format('MM-DD-YYYY')}
                        {/* {moment(item?.createdAt).format('MM-DD-YYYY')} */}
                      </Text>
                    </DataTable.Cell>


                  </DataTable.Row>
                )}
              />


            </DataTable>
          </View>
        ) : null}
      </>
    )
  }





  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View

        style={{ backgroundColor: '#d5e3e5' }}
      >
        <ScrollView showsVerticalScrollIndicator={false}
          style={{}}
        >
          <HeadTabs

          />
          <Loader flag={loader} />

          {/* <CustomHeader /> */}
          <View style={{ opacity: modalVisible == true ? 0.2 : null }}>
            {/* <Text style={styles.header}>
                    File{' '}
                    <Text style={{backgroundColor: '#9DB436', padding: 2}}>Cabinet</Text>
                  </Text> */}
            <View
              style={{
                width: wp(90),
                // backgroundColor: "red",
                alignSelf: "center",
                //     justifyContent: 'center',
                //  alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,

              }}>


              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  width: wp(45),
                  //  marginTop: 5,
                  //marginLeft: 10,
                  // marginBottom: wp(5),
                }}>
                {/* <Image source={usericon} style={{ width: 20, height: 20 }} /> */}
                <Text style={{ color: Color.headerIconBG, fontSize: 20, fontFamily: 'Poppins-Bold', }}>File Cabinet</Text>
                {/* <Text style={styles.client}>Client ID : {clientName}</Text> */}
              </View>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: wp(30),
                  // padding: 5,
                  alignItems: "center",
                  borderRadius: 20,
                  marginLeft: 15,

                  // marginBottom: wp(2),
                  backgroundColor: '#fff',
                  //paddingHorizontal: 10,
                  height: hp(5),
                  marginTop: 10
                }}>
                <Image source={require('../Assets/img/icons/createAction.png')} style={{ width: 25, height: 25, alignSelf: 'center' }} />
                <Text style={[styles.client, { alignSelf: 'center', fontSize: 12, paddingTop: 3, paddingLeft: 5, fontFamily: 'Poppins-Bold', }]}>Add File</Text>
              </TouchableOpacity>
            </View>

            <View style={{ width: wp(90), alignSelf: "center" }}>
              <DataTable style={{}}>
                <DataTable.Header style={{ backgroundColor: Color.green }}>
                  <DataTable.Title style={{ flex: 2, width: wp(40) }}>
                    <Text style={styles.headerText}>Folder Name</Text>
                  </DataTable.Title>
                  <DataTable.Title style={{ justifyContent: "center", width: wp(20) }}>
                    <Text style={styles.headerText}>Leafcloud</Text>
                  </DataTable.Title>
                  <DataTable.Title style={{ justifyContent: 'flex-end', width: wp(20) }}>
                    <Text style={styles.headerText}>My Files</Text>
                  </DataTable.Title>
                </DataTable.Header>
                <FlatList
                  contentContainerStyle={{ paddingBottom: 100 }}
                  data={filteredReq}
                  // numColumns={5}
                  keyExtractor={(item, index) => index}
                  renderItem={renderItem}

                />


              </DataTable>
            </View>

          </View>
          {/* <CustomBottomTab /> */}
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
                    marginBottom: 20,
                    width: wp(90),
                    alignSelf: 'center',
                  }}>
                  <Text style={styles.Subheading}>Upload File</Text>
                  <TouchableOpacity
                    onPress={() => cancelModal()}
                    style={{
                      backgroundColor: '#8AB645',
                      height: wp(10),
                      width: wp(10),
                      borderRadius: 40,
                      position: 'absolute',
                      right: -10,
                      top: -25,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{ color: '#fff' }}>X</Text>
                  </TouchableOpacity>
                </View>
                {/* <View style={{flexDirection: 'row', marginBottom: 20}}>
              <Text style={styles.Subheading}>Upload File</Text>
              <Text
                style={{position: 'absolute', left: 180}}
                onPress={() => setModalVisible(!modalVisible)}>
                close
              </Text>
            </View> */}
                <View style={styles.formContainer}>
                  <View style={{ marginBottom: 10 }}>
                    <Text
                      style={{ alignSelf: 'flex-start', padding: 5, color: '#fff' }}>
                      Folder *
                    </Text>

                    <Dropdown
                      style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      itemTextStyle={styles.selectedTextStyle}
                      iconStyle={styles.iconStyle}
                      data={filteredReq}
                      maxHeight={200}
                      labelField="azureRenameFolderName1"
                      valueField="azureRenameFolderName1"
                      placeholder={!isFocus ? 'Select item' : '...'}
                      value={value?.azureRenameFolderName1}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      // onConfirmSelectItem={(item)=>{documentTypes(item)}}
                      onChange={item => {
                        setValue(item);
                        setIsFocus(false);
                        // documentTypes(item)

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
                  </View>
                  <View style={{ marginBottom: 10 }}>
                    <Text
                      style={{ alignSelf: 'flex-start', padding: 5, color: '#fff' }}>
                      Document Type*
                    </Text>

                    <Dropdown
                      style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      itemTextStyle={styles.selectedTextStyle}
                      iconStyle={styles.iconStyle}
                      data={dataArray}
                      maxHeight={200}
                      labelField="documentType"
                      valueField="documentType"
                      placeholder={!isFocus ? 'Select item' : '...'}
                      value={value1?.documentType}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setValue1(item);
                        setIsFocus(false);
                      }}

                    />
                  </View>
                  {
                    isPeriodPresent == true ?
                      <View style={{ marginBottom: 10 }}>
                        <Text
                          style={{ alignSelf: 'flex-start', padding: 5, color: '#fff' }}>
                          Period*
                        </Text>

                        <Dropdown
                          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          itemTextStyle={styles.selectedTextStyle}
                          iconStyle={styles.iconStyle}
                          data={dataPeriod}
                          maxHeight={200}
                          labelField="label"
                          valueField="label"
                          placeholder={!isFocus ? 'Select item' : '...'}
                          value={period}
                          onFocus={() => setIsFocus(true)}
                          onBlur={() => setIsFocus(false)}
                          onChange={item => {
                            setPeriod(item.label);
                            setPeriodValue(item.value);
                            setIsFocus(false);
                          }}

                        />
                      </View>
                      : null
                  }
                  {
                    isYearPresent == true ?
                      <View style={{ marginBottom: 10 }}>
                        <Text
                          style={{ alignSelf: 'flex-start', padding: 5, color: '#fff' }}>
                          Year*
                        </Text>

                        <Dropdown
                          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          itemTextStyle={styles.selectedTextStyle}
                          iconStyle={styles.iconStyle}
                          data={sortedDataYear}
                          maxHeight={200}
                          labelField="label"
                          valueField="label"
                          placeholder={!isFocus ? 'Select item' : '...'}
                          value={yearText}
                          onFocus={() => setIsFocus(true)}
                          onBlur={() => setIsFocus(false)}
                          onChange={item => {
                            setYear(item.value);
                            setYearText(item.label)
                            setIsFocus(false);
                          }}

                        />
                      </View>
                      : null
                  }

                  {
                    isdescriptionPresent == true ?
                      <View style={{ marginBottom: 10 }}>
                        <Text
                          style={{ alignSelf: 'flex-start', padding: 5, color: '#fff' }}>
                          Description*
                        </Text>

                        <TextInput
                          style={styles.input}
                          onChangeText={(text) => { setDescription(text) }}
                        />
                      </View>
                      : null
                  }

                  <View style={{ marginBottom: 10 }}>
                    <Text
                      style={{ alignSelf: 'flex-start', padding: 5, color: '#fff' }}>
                      Attachments*
                    </Text>
                    <Text
                      // key={index.toString()}
                      style={styles.uri}
                      numberOfLines={1}
                      ellipsizeMode={'middle'}>
                      {fileResponse ? fileResponse[0]?.name : null}
                    </Text>
                    <Text></Text>
                    <Button title="Select 📑" onPress={handleDocumentSelection} />
                  </View>
                  <View style={{ marginBottom: 10 }}>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => submitUpload()}
                    >
                      <Text style={styles.textStyle}>Upload</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View >
    </SafeAreaView >
  );
};

export default AssoFileCabinet;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center'
  },
  container1: {
    width: wp(90),
    backgroundColor: Color.green,
    alignSelf: 'center'
  },
  popupHead: {
    fontSize: 14,
    color: '#fff',
    //  width: wp(50),
    alignItems: 'baseline',
    backgroundColor: '#2F4050',
    padding: 10,
    height: wp(12),
    fontFamily: 'Poppins-SemiBold'
  },
  Subheading: {
    fontSize: 20,
    color: '#3B71CA',
    fontWeight: '600',
    textAlign: 'center',
  },
  popupYear: {
    fontSize: 16,
    color: '#2F4050',
  },
  popup: {
    width: '100%',
    alignSelf: 'center',
    //height: 90,
    // padding: 10,
    opacity: 10,
    // marginTop: 50,
  },
  formContainer: {
    backgroundColor: '#2F4050',
    width: wp(90),
    padding: 10,
    alignSelf: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  row: { flexDirection: 'row', alignItems: 'baseline', width: wp(100) },

  tableHeader1: {
    backgroundColor: 'lightblue',
  },

  headerText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14
    //width: wp(30),
    // backgroundColor: "red",
    //alignItems: 'center',
    // justifyContent: 'center'
  },
  headerText1: {
    color: '#444747',
    fontFamily: 'Poppins-SemiBold'
  },
  header: {
    fontSize: 28,
    color: '#000',
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 20,
    width: '50%',
    padding: 5,
  },

  client: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold'
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    //justifyContent: 'flex-end',
  },

  modalView: {
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
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: wp(80),
    alignSelf: 'center',
    //alignSelf: 'flex-end',
  },
  buttonOpen: {
    backgroundColor: '#8AB645',
  },
  buttonClose: {
    backgroundColor: '#8AB645',
  },
  dropdown: {
    height: 40,
    borderColor: 'gray',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderRadius: 8,
    width: '100%',
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
    fontSize: 12,
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
  uri: {
    color: '#fff'
  },
  input: {
    height: 60,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: '100%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    borderColor: 'gray',
  },
});
