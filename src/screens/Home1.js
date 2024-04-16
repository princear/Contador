import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Thank you for being our client since 2023
      </Text>
      <View style={styles.slideContainer}>
        <ScrollView contentContainerStyle={{padding: 5}} horizontal={true}>
          <TouchableOpacity
            style={styles.cardSlider}
            // onPress={toggleModal}
          >
            <View style={styles.cardShadow}>
              <Image
                source={require('../Assets/img/gdb-img1.png')}
                style={styles.Slidericons}
              />
            </View>
            <View>
              <Text style={styles.postText}>Need Payroll?</Text>
            </View>
            <View style={{padding: 5}}>
              <Text numberOfLines={3} style={styles.sliderText}>
                We Can Help You With Your Company’s Payroll!
              </Text>
              <Text style={styles.info}>Contact Us For More Info!</Text>
              <TouchableOpacity style={styles.btn}>
                <Text style={{color: '#fff'}}>987654</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.cardSlider, styles.shadowPropSlider]}
            // onPress={toggleModal}
          >
            <View style={styles.cardShadow}>
              <Image
                source={require('../Assets/img/gdb-img2.png')}
                style={styles.Slidericons}
              />
            </View>
            {/* <Image source={require('../Assets/OurTutors.png')}
                                style={styles.Slidericons}
                            /> */}
            <Text style={styles.postText}>Bring a friend!</Text>
            <View style={{padding: 5}}>
              <Text numberOfLines={3} style={styles.sliderText}>
                Earn $50 In Your Next Order By Referring a{'\n'} Friend To Us By
                Using The Code FRIEND50OFF
              </Text>
              <Text style={styles.info}>Call Us To Learn More!</Text>
              <TouchableOpacity style={styles.btn}>
                <Text style={{color: '#fff'}}>987654</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.cardSlider, styles.shadowPropSlider]}
            // onPress={toggleModal}
          >
            <View style={styles.cardShadow}>
              <Image
                source={require('../Assets/img/gdb-img3.png')}
                style={styles.Slidericons}
              />
            </View>
            {/* <Image source={require('../Assets/OurService.png')}
                                style={styles.Slidericons}
                            /> */}
            <Text style={styles.postText}>
              You Still Haven’t{'\n'} File Your Taxes?
            </Text>
            <View style={{padding: 5}}>
              <Text numberOfLines={3} style={styles.sliderText}>
                Schedule Your Virtual Tax Return Now!
              </Text>
              <Text style={styles.info}>Call Us For More Information!</Text>
              <TouchableOpacity style={styles.btn}>
                <Text style={{color: '#fff'}}>987654</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.cardSlider, styles.shadowPropSlider]}
            // onPress={toggleModal}
          >
            <View style={styles.cardShadow}>
              <Image
                source={require('../Assets/img/gdb-img4.png')}
                style={styles.Slidericons}
              />
            </View>
            {/* <Image source={require('../Assets/MyActivities.png')}
                                style={styles.Slidericons}
                            /> */}
            <Text style={styles.postText}>Incorporations</Text>
            <View style={{padding: 5}}>
              <Text numberOfLines={3} style={styles.sliderText}>
                Create A New Company Today!
              </Text>
              <Text style={styles.info}>
                Learn The Benefits of Having A US Company
              </Text>
              <TouchableOpacity style={styles.btn}>
                <Text style={{color: '#fff'}}>987654</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.cardSlider, styles.shadowPropSlider]}
            // onPress={toggleModal}
          >
            <View style={styles.cardShadow}>
              <Image
                source={require('../Assets/img/gdb-img5.png')}
                style={styles.Slidericons}
              />
            </View>
            {/* <Image source={require('../Assets/Promotion.png')}
                                style={styles.Slidericons}
                            /> */}
            <Text style={styles.postText}>Wanna Move To The{'\n'} USA? </Text>
            <View style={{padding: 5}}>
              <Text numberOfLines={3} style={styles.sliderText}>
                Franchise With Us!
              </Text>
              <Text style={styles.info}>Contact Us For More Info!</Text>
              <TouchableOpacity style={styles.btn}>
                <Text style={{color: '#fff'}}>987654</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.cardSlider, styles.shadowPropSlider]}
            // onPress={toggleModal}
          >
            <View style={styles.cardShadow}>
              <Image
                source={require('../Assets/img/gdb-img6.png')}
                style={styles.Slidericons}
              />
            </View>
            {/* <Image source={require('../Assets/Promotion.png')}
                                style={styles.Slidericons}
                            /> */}
            <Text style={styles.postText}>Need Bookkeeping? </Text>
            <View style={{padding: 5}}>
              <Text numberOfLines={3} style={styles.sliderText}>
                Add A Bookkeeping Plan To Your Business!
              </Text>
              <Text style={styles.info}>Contact Us TO Book It!</Text>
              <TouchableOpacity style={styles.btn}>
                <Text style={{color: '#fff'}}>987654</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '95%',
  },
  heading: {
    fontSize: 16,
    color: '#676A6C',
    marginTop: 20,
    fontWeight: '600',
  },
  slideContainer: {
    backgroundColor: '#fff',
    marginLeft: 20,
    height: 420,
    opacity: 2,
    borderRadius: 10,
    marginTop: 20,
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
    marginTop: 10,
  },
  sliderText: {
    color: '#9BB33D',
    fontSize: 14,
    alignSelf: 'center',
    marginTop: 10,
  },
  cardSlider: {
    width: 300,
    marginTop: 50,
  },
  info: {
    color: '#1F3E50',
    alignSelf: 'center',
    fontSize: 15,
    marginTop: 10,
  },
  btn: {
    width: '30%',
    alignSelf: 'center',
    marginBottom: 30,
    marginTop: 10,
    backgroundColor: '#94B520',
    borderRadius: 30,
    padding: 10,
    alignItems: 'center',
  },
});
