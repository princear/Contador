import React, { useState, useEffect, useCallback } from 'react';
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
import { folderNameList, documentInfobyFolder } from '../Redux/Actions/TaxLeaf';
import { Loader } from '../Component/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import DocumentPicker from 'react-native-document-picker'

let iconNm = require('../Assets/img/icons/msg.png');
let usericon = require('../Assets/img/icons/user-icon.png');
const FileCabinet = () => {
  const [idRow, setIdRow] = useState();
  const [selectedData, setSelectedData] = useState();
  const [documentId, setdocumentId] = useState();

  const [press, setPress] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState(null);
  const [value1, setValue1] = useState(null);

  const [isFocus, setIsFocus] = useState(false);
  const [loader, setLoader] = useState(false);
  const [filteredReq, setFilteredReq] = useState();
  const [docTypeById, setDocTypeById] = useState();

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { MY_INFO } = useSelector(state => state.TaxLeafReducer);
  const { FOLDER_LIST } = useSelector(state => state.TaxLeafReducer);
  const { DOCUMENT_INFO_FOLDER } = useSelector(state => state.TaxLeafReducer)
  // console.log(DOCUMENT_INFO_FOLDER.length, 'DOCUMENT_INFO_FOLDER')
  const bgImage = require('../Assets/img/guest_shape.png');
  console.log(docTypeById, 'docTypeById')
  console.log(value, 'kkkkkk')
  console.log(FOLDER_LIST, 'FOLDER_LIST')
  console.log(DOCUMENT_INFO_FOLDER, 'DOCUMENT_INFO_FOLDER')
  const jsonData = MY_INFO.guestInfo;
  const dataArray = docTypeById ? Object.values(docTypeById) : [];
  console.log(Array.isArray(dataArray), 'isArray');
  const [fileResponse, setFileResponse] = useState([]);

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });
      setFileResponse(response);
    } catch (err) {
      console.warn(err);
    }
  }, []);
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

  console.log(filteredReq, 'filteredReq');

  console.log(selectedData, 'selll');
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
  const handleRow = item => {
    setIdRow(item.id);
    setPress(true);
    setSelectedData(item);
    setdocumentId(item?.documentTypeIds)
  };
  const handleRowOFF = item => {
    setIdRow(item.id);
    setPress(false);
    setSelectedData(item);
    setdocumentId(item?.documentTypeIds)
  };
  useEffect(() => {
    setLoader(true);

    dispatch(
      folderNameList(jsonData?.clientId, jsonData?.clientType, navigation),
    );

    setTimeout(() => {
      setLoader(false);
    }, 2000);

    // setInfoData(CLIENT_LIST);
  }, []);
  useEffect(() => {
    if (Array.isArray(FOLDER_LIST)) {
      const filteredFolders = FOLDER_LIST.filter(folder => {
        return folder.azureFolderName !== "Temporary Folder" && folder.azureRenameFolderName1 !== "";
      });

      setFilteredReq(filteredFolders)
      console.log(filteredFolders, 'filteredFolders')
    }
  }, [FOLDER_LIST])


  const documentTypes = (item) => {
    setLoader(true);
    // Alert.alert(item?.documentTypeIds)
    dispatch(
      documentInfobyFolder(item?.documentTypeIds, navigation)
    )
    setDocTypeById(DOCUMENT_INFO_FOLDER)
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }


  useEffect(() => {
    setLoader(true);

    dispatch(
      documentInfobyFolder(documentId, navigation),
    );
    setTimeout(() => {
      setLoader(false);
    }, 2000);
    // setInfoData(CLIENT_LIST);
  }, [documentId]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View

        style={{ backgroundColor: '#d5e3e5' }}
      >
        <ScrollView>

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
                //     justifyContent: 'center',
                //  alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 20,
                marginTop: 20,
              }}>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: wp(25),
                  borderWidth: 1,
                  padding: 5,
                  borderRadius: 10,
                  marginLeft: 15,
                  marginBottom: wp(5),
                }}>
                <Image source={iconNm} style={{ width: 20, height: 20 }} />
                <Text style={styles.client}>Add File</Text>
              </TouchableOpacity>
              {/* <View
            style={{
              width: '40%',
            }}>
            <Button
              title="+ Add File"
              color="#8AB645"
              onPress={() => setModalVisible(true)}
            />
          </View> */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  width: wp(65),
                  marginTop: 5,
                  marginLeft: 15,
                  marginBottom: wp(5),
                }}>
                <Image source={usericon} style={{ width: 20, height: 20 }} />
                <Text style={styles.client}>Client ID : EASTSONSPRI</Text>
              </View>
              {/* <View style={{width: '40%', marginLeft: 20}}>
            <Button
              title="Back To Home"
              color="#2F4050"
              // onPress={() => setModalVisible(true)}
            />
          </View> */}
            </View>

            <View>
              <DataTable style={styles.container}>
                <DataTable.Header style={styles.tableHeader}>
                  <DataTable.Title style={{ flex: 3 }}>
                    <Text style={styles.headerText}>Folder Name</Text>
                  </DataTable.Title>
                  <DataTable.Title>
                    <Text style={styles.headerText}>Leafcloud</Text>
                  </DataTable.Title>
                  <DataTable.Title>
                    <Text style={styles.headerText}>My Files</Text>
                  </DataTable.Title>
                </DataTable.Header>
                <FlatList
                  contentContainerStyle={{ paddingBottom: 200 }}
                  data={filteredReq}
                  // numColumns={5}
                  keyExtractor={(item, index) => index}
                  renderItem={({ item, index }) => (
                    <DataTable.Row
                      key={item.id}
                      onPress={() => { handleRow(item) }}
                      style={{
                        backgroundColor:
                          idRow == item.id && press == true ? '#fff' : null,
                      }}>
                      <DataTable.Cell style={{ flex: 3 }}  >
                        <Text
                          style={{
                            fontSize: 12,
                            color:
                              idRow == item.id && press == true
                                ? '#2F4050'
                                : '#676A6C',
                            fontWeight: '700'
                          }}>
                          {item?.azureRenameFolderName1}
                        </Text>
                      </DataTable.Cell>
                      <DataTable.Cell >
                        <Text
                          style={{
                            fontSize: 12,
                            width: 20,
                            color:
                              idRow == item.id && press == true
                                ? '#2F4050'
                                : '#676A6C',
                          }}>
                          {item?.status}
                        </Text>
                      </DataTable.Cell>
                      <DataTable.Cell>
                        <Text
                          style={{
                            fontSize: 12,
                            color:
                              idRow == item.id && press == true
                                ? '#2F4050'
                                : '#676A6C',
                          }}>
                          {/* {idRow == item.id && press == true && DOCUMENT_INFO_FOLDER ? DOCUMENT_INFO_FOLDER.length : '0'} */}
                          {item.documentTypeIds.split(',').length}

                        </Text>
                      </DataTable.Cell>
                    </DataTable.Row>
                  )}
                />


              </DataTable>
            </View>
            {press == true ? (
              <View style={styles.popup}>
                <Text style={styles.popupHead}>{selectedData.azureFolderName}</Text>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#3B71CA',
                    marginVertical: 10,
                  }}></View>
                <View style={styles.row}>
                  <Text style={styles.popupYear}>2023</Text>
                  <Text style={{ alignSelf: 'center', marginLeft: 10, fontSize: 14 }}>
                    (Total :  {DOCUMENT_INFO_FOLDER && DOCUMENT_INFO_FOLDER.length})
                  </Text>
                </View>





                <DataTable style={styles.container}>
                  <DataTable.Header style={styles.tableHeader1}>
                    <DataTable.Title style={{ flex: 4 }}>
                      <Text style={styles.headerText1}>Document Type</Text>
                    </DataTable.Title>
                    <DataTable.Title>
                      <Text style={styles.headerText1}>CreatedAt</Text>
                    </DataTable.Title>


                  </DataTable.Header>
                  <FlatList
                    contentContainerStyle={{ paddingBottom: 200 }}
                    data={DOCUMENT_INFO_FOLDER}
                    // numColumns={5}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => (
                      <DataTable.Row
                        key={item.id}
                        style={{
                          backgroundColor:
                            idRow == item.id && press == true ? '#fff' : null,
                        }}>
                        <DataTable.Cell style={{ flex: 4 }}  >
                          <Text
                            style={{
                              fontSize: 12,
                              color:
                                idRow == item.id && press == true
                                  ? '#2F4050'
                                  : '#676A6C',
                            }}>
                            {item?.documentType}
                          </Text>
                        </DataTable.Cell>

                        <DataTable.Cell >
                          <Text
                            style={{
                              fontSize: 12,
                              width: 20,
                              color:
                                idRow == item.id && press == true
                                  ? '#2F4050'
                                  : '#676A6C',
                            }}>
                            {moment(item?.createdAt).format('MM-DD-YYYY')}
                          </Text>
                        </DataTable.Cell>


                      </DataTable.Row>
                    )}
                  />


                </DataTable>
              </View>
            ) : null}
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
                    onPress={() => setModalVisible(!modalVisible)}
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
                      iconStyle={styles.iconStyle}
                      data={filteredReq}
                      maxHeight={200}
                      labelField="azureRenameFolderName1"
                      valueField="azureRenameFolderName1"
                      placeholder={!isFocus ? 'Select item' : '...'}
                      value={value?.azureRenameFolderName1}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setValue(item);
                        setIsFocus(false);
                        documentTypes(item)

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
                      iconStyle={styles.iconStyle}
                      data={dataArray}
                      maxHeight={200}
                      labelField="documentType"
                      valueField="documentType"
                      placeholder={!isFocus ? 'Select item' : '...'}
                      value={value1}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setValue1(item.documentType);
                        setIsFocus(false);
                      }}

                    />
                  </View>
                  <View style={{ marginBottom: 10 }}>
                    <Text
                      style={{ alignSelf: 'flex-start', padding: 5, color: '#fff' }}>
                      Attachments*
                    </Text>
                    {fileResponse.map((file, index) => (
                      <Text
                        key={index.toString()}
                        style={styles.uri}
                        numberOfLines={1}
                        ellipsizeMode={'middle'}>
                        {file?.uri}
                      </Text>
                    ))}
                    <Button title="Select 📑" onPress={handleDocumentSelection} />
                  </View>
                  <View style={{ marginBottom: 10 }}>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonClose]}
                    // onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text style={styles.textStyle}>Upload</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default FileCabinet;
const styles = StyleSheet.create({
  popupHead: {
    fontSize: 14,
    color: '#fff',
    //  width: wp(50),
    alignItems: 'baseline',
    backgroundColor: '#2F4050',
    padding: 10,
    height: wp(10),
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
    width: wp(100),
    alignSelf: 'center',
    //height: 90,
    backgroundColor: '#fff',
    padding: 10,
    opacity: 10,
    marginTop: 50,
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
  tableHeader: {
    backgroundColor: '#2F4050',
  },
  tableHeader1: {
    backgroundColor: 'lightblue',
  },

  headerText: {
    color: '#fff',
  },
  headerText1: {
    color: '#000',
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
    marginLeft: 10,
    fontSize: 12,
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
});
