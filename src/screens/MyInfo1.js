import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {DataTable} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const MyInfo = () => {
  return (
    <ScrollView>
      {/* <Text
        style={{fontSize: 16, color: '#000', marginTop: 20, marginLeft: 20}}>
        My Profile
      </Text> */}

      <View
        style={{
          backgroundColor: '#fff',
          width: wp(100),
          padding: 20,
          opacity: 2,
          borderRadius: 10,
          //  marginLeft: 20,
          //marginTop: 20,
        }}>
        <View style={{textAlign: 'center'}}>
          <Image
            source={require('../Assets/profileBlank.png')}
            style={{
              width: 80,
              height: 80,
              borderRadius: 50,
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              textAlign: 'center',
              color: '#000',
              margin: 10,
              fontWeight: '700',
              fontSize: 16,
            }}>
            Prince Eastsons
          </Text>
        </View>
        <View
          style={{
            width: wp(90),
            backgroundColor: '#fff',
            //padding: 10,
            elevation: 10,
            marginBottom: 20,
            alignSelf: 'center',
            borderRadius: 10,
            paddingBottom: 20,
          }}>
          <View
            style={{
              height: 50,
              borderTopStartRadius: 10,
              borderTopRightRadius: 10,
              width: wp(90),
              paddingLeft: 10,
              alignSelf: 'center',
              justifyContent: 'center',
              backgroundColor: '#2F4050',
            }}>
            <Text style={styles.LIstText2}>
              <Text style={{fontSize: 15, fontWeight: '600', color: '#fff'}}>
                Personal Info
              </Text>
            </Text>
          </View>
          <View
            style={{
              height: 40,
              //  backgroundColor: '#fff',
              marginTop: 10,
              padding: 10,
            }}>
            <Text style={styles.LIstText2}>
              <Text style={{fontSize: 15, fontWeight: '600'}}>
                Date Of Birth:
              </Text>{' '}
              12-09-1990
            </Text>
          </View>
          {/* <View style={{height: 40, marginTop: 10, padding: 10}}>
            <Text style={styles.LIstText2}>
              <Text style={{fontSize: 15, fontWeight: '600'}}>Office:</Text>{' '}
              Noida
            </Text>
          </View> */}
          {/* <View
            style={{
              height: 40,
              //  backgroundColor: '#fff',
              marginTop: 10,
              padding: 10,
            }}>
            <Text style={styles.LIstText2}>
              <Text style={{fontSize: 15, fontWeight: '600'}}>Department:</Text>{' '}
              IT
            </Text>
          </View> */}
          <View style={{height: 40, marginTop: 10, padding: 10}}>
            <Text style={styles.LIstText2}>
              <Text style={{fontSize: 15, fontWeight: '600'}}>
                Contact Info:
              </Text>{' '}
              9865478934
            </Text>
          </View>
          <View
            style={{
              height: 40,
              //  backgroundColor: '#fff',
              marginTop: 10,
              padding: 10,
            }}>
            <Text style={styles.LIstText2}>
              <Text style={{fontSize: 15, fontWeight: '600'}}>CellPhone:</Text>{' '}
              +1 378498
            </Text>
          </View>
          <View style={{height: 40, marginTop: 10, padding: 10}}>
            <Text style={styles.LIstText2}>
              <Text style={{fontSize: 15, fontWeight: '600'}}>Extensions:</Text>{' '}
              +91
            </Text>
          </View>
          {/* <View
            style={{
              height: 40,
              marginTop: 10,
              backgroundColor: '#fff',
              padding: 10,
            }}>
            <Text style={styles.LIstText2}>
              <Text style={{fontSize: 15, fontWeight: '600'}}>
                Social Security Number:
              </Text>{' '}
              7532684
            </Text>
          </View>
          <View style={{height: 40, marginTop: 10, padding: 10}}>
            <Text style={styles.LIstText2}>
              <Text style={{fontSize: 15, fontWeight: '600'}}>Username:</Text>{' '}
              prince@eastsons.com
            </Text>
          </View>
          <View
            style={{
              height: 40,
              marginTop: 10,
              backgroundColor: '#fff',
              padding: 10,
            }}>
            <Text style={styles.LIstText2}>
              <Text style={{fontSize: 15, fontWeight: '600'}}>
                Time Of Expiration:
              </Text>{' '}
              2023-10-06
            </Text>
          </View>
          <View style={{height: 40, marginTop: 10, padding: 10}}>
            <Text style={styles.LIstText2}>
              <Text style={{fontSize: 15, fontWeight: '600'}}>Status:</Text>{' '}
              Active
            </Text>
          </View>
          <View
            style={{
              height: 40,
              marginTop: 10,
              backgroundColor: '#fff',
              padding: 10,
            }}>
            <Text style={styles.LIstText2}>
              <Text style={{fontSize: 15, fontWeight: '600'}}>Type:</Text>{' '}
              Prince
            </Text>
          </View> */}
        </View>
        <View
          style={{
            width: wp(90),
            backgroundColor: '#fff',
            //padding: 10,
            elevation: 10,
            alignSelf: 'center',
            borderRadius: 10,
            paddingBottom: 20,
          }}>
          <View
            style={{
              height: 50,
              borderTopStartRadius: 10,
              borderTopRightRadius: 10,
              width: wp(90),
              paddingLeft: 10,
              alignSelf: 'center',
              justifyContent: 'center',
              backgroundColor: '#2F4050',
            }}>
            <Text style={styles.LIstText2}>
              <Text style={{fontSize: 15, fontWeight: '600', color: '#fff'}}>
                Address Detail
              </Text>
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: wp(80),
            }}>
            <View
              style={{height: 40, marginTop: 10, width: wp(45), padding: 10}}>
              <Text style={styles.LIstText2}>
                <Text style={{fontSize: 15, fontWeight: '600'}}>Office:</Text>{' '}
                Noida
              </Text>
            </View>
            <View
              style={{
                height: 40,
                //  backgroundColor: '#fff',
                alignSelf: 'flex-start',
                marginTop: 10,
                width: wp(35),
                padding: 10,
              }}>
              <Text style={styles.LIstText2}>
                <Text style={{fontSize: 15, fontWeight: '600'}}>
                  Department:
                </Text>{' '}
                IT
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: wp(80),
            }}>
            <View
              style={{height: 40, width: wp(45), marginTop: 10, padding: 10}}>
              <Text style={styles.LIstText2}>
                <Text style={{fontSize: 15, fontWeight: '600'}}>Contact :</Text>{' '}
                9865478934
              </Text>
            </View>
            <View
              style={{
                height: 40,
                //  backgroundColor: '#fff',
                width: wp(45),
                marginTop: 10,
                padding: 10,
              }}>
              <Text style={styles.LIstText2}>
                <Text style={styles.LIstText2}>
                  <Text style={{fontSize: 15, fontWeight: '600'}}>
                    Extensions:
                  </Text>{' '}
                  +91
                </Text>
                <Text style={{fontSize: 15, fontWeight: '600'}}>
                  CellPhone:
                </Text>{' '}
                +1 378498
              </Text>
            </View>
          </View>

          <View style={{height: 40, marginTop: 10, padding: 10}}>
            <Text style={styles.LIstText2}>
              <Text style={{fontSize: 15, fontWeight: '600'}}>Extensions:</Text>{' '}
              +91
            </Text>
          </View>
          {/* <View
            style={{
              height: 40,
              marginTop: 10,
              backgroundColor: '#fff',
              padding: 10,
            }}>
            <Text style={styles.LIstText2}>
              <Text style={{fontSize: 15, fontWeight: '600'}}>
                Social Security Number:
              </Text>{' '}
              7532684
            </Text>
          </View>
          <View style={{height: 40, marginTop: 10, padding: 10}}>
            <Text style={styles.LIstText2}>
              <Text style={{fontSize: 15, fontWeight: '600'}}>Username:</Text>{' '}
              prince@eastsons.com
            </Text>
          </View>
          <View
            style={{
              height: 40,
              marginTop: 10,
              backgroundColor: '#fff',
              padding: 10,
            }}>
            <Text style={styles.LIstText2}>
              <Text style={{fontSize: 15, fontWeight: '600'}}>
                Time Of Expiration:
              </Text>{' '}
              2023-10-06
            </Text>
          </View>
          <View style={{height: 40, marginTop: 10, padding: 10}}>
            <Text style={styles.LIstText2}>
              <Text style={{fontSize: 15, fontWeight: '600'}}>Status:</Text>{' '}
              Active
            </Text>
          </View>
          <View
            style={{
              height: 40,
              marginTop: 10,
              backgroundColor: '#fff',
              padding: 10,
            }}>
            <Text style={styles.LIstText2}>
              <Text style={{fontSize: 15, fontWeight: '600'}}>Type:</Text>{' '}
              Prince
            </Text>
          </View> */}
        </View>
      </View>
    </ScrollView>
  );
};

export default MyInfo;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
  },
  LIstText2: {
    color: '#000',
  },
});
