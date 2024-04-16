
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import { Color } from '../Style';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Fontisto';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Icon4 from 'react-native-vector-icons/FontAwesome6';


const HeaderIcons = () => {

    const [showwhat1, setshowwhat1] = useState('');
    const [showwhat2, setshowwhat2] = useState('');

    const navigation = useNavigation();
    return (
        <View style={styles.tabsContainer}>
        <View style={styles.mainTab}>
          {(() => {
            if (showwhat1 == 'Message') {
              return (
                <View style={styles.moblieSec}>
                  {/* <View style={{ flexDirection: "column", justifyContent: 'space-between' }}> */}
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.emailtoch,
                        {
                          backgroundColor:
                            showwhat1 == 'Message' ? Color.geen : Color.darkGreen,
                        },
                      ]}
                      onPress={() =>
                        showwhat1 == 'Message'
                          ? setshowwhat1('')
                          : showwhatfunc1('Message')
                      }>
                      <Icon3
                        style={[
                          styles.icon,
                          {
                            color: showwhat1 == 'Message' ? '#fff' : '#fff',
                          },
                        ]}
                        name="money-check-alt"
                        size={25}
                        color="#fff"
                      />


                      {/* <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Message'
                              ? Color.white
                              : Color.darkGreen,
                        },
                      ]}>
                      (1)
                    </Text> */}
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Message'
                              ? Color.darkGreen
                              : Color.darkGreen,
                        },
                      ]}>
                      Tax
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch1,
                        {
                          backgroundColor:
                            showwhat1 == 'Proposal' ? '#2F4050' : Color.darkGreen,
                        },
                      ]}
                      onPress={() =>
                        showwhat1 == 'Proposal'
                          ? setshowwhat1('')
                          : showwhatfunc1('Proposal')
                      }>
                      <Icon
                        style={[
                          styles.icon,
                          {
                            color:
                              showwhat1 == 'Proposal'
                                ? Color.white
                                : Color.white,
                          },
                        ]}
                        name="message1"
                        size={25}
                        color="#fff"
                      />


                      {/* <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Proposal'
                              ? Color.white
                              : Color.darkGreen,
                        },
                      ]}>
                      ({dashboardMessageList.length})
                    </Text> */}
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Message'
                              ? Color.darkGreen
                              : Color.darkGreen,
                        },
                      ]}>
                      Messages
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch1,
                        {
                          backgroundColor:
                            showwhat1 == 'Signature' ? '#2F4050' : Color.darkGreen,
                        },
                      ]}
                      onPress={() =>
                        showwhat1 == 'Signature'
                          ? setshowwhat1('')
                          : showwhatfunc1('Signature')
                      }>
                      <Icon1
                        style={[
                          styles.icon,
                          {
                            color:
                              showwhat1 == 'Signature'
                                ? Color.white
                                : Color.white,
                          },
                        ]}
                        name="event"
                        size={25}
                        color="#fff"
                      />


                      {/* <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Signature'
                              ? Color.white
                              : Color.darkGreen,
                        },
                      ]}>
                      (0)
                    </Text> */}
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Message'
                              ? Color.darkGreen
                              : Color.darkGreen,
                        },
                      ]}>
                      Events
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch1,
                        {
                          backgroundColor:
                            showwhat1 == 'Reminders' ? '#2F4050' : Color.darkGreen,
                        },
                      ]}
                      onPress={() =>
                        showwhat1 == 'Reminders'
                          ? setshowwhat1('')
                          : showwhatfunc1('Reminders')
                      }>
                      <Icon2
                        style={[
                          styles.icon,
                          {
                            color:
                              showwhat1 == 'Reminders'
                                ? Color.white
                                : Color.white,
                          },
                        ]}
                        name="holiday-village"
                        size={25}
                        color="#fff"
                      />


                      {/* <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Reminders'
                              ? Color.white
                              : Color.darkGreen,
                        },
                      ]}>
                      (1)
                    </Text> */}
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Message'
                              ? Color.darkGreen
                              : Color.darkGreen,
                        },
                      ]}>
                      Holidays
                    </Text>
                  </View>
                  {/* </View> */}
                </View>
              );
            } else if (showwhat1 == 'Proposal') {
              return (
                <View style={styles.moblieSec}>
                  {/* <View style={{ flexDirection: "column", justifyContent: 'space-between' }}> */}
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.emailtoch,
                        {
                          backgroundColor:
                            // showwhat1 == 'Message' ? '#2F4050' : '#fff',
                            showwhat1 == 'Message' ? Color.geen : Color.darkGreen,

                        },
                      ]}
                      onPress={() =>
                        showwhat1 == 'Message'
                          ? setshowwhat1('')
                          : showwhatfunc1('Message')
                      }>
                      <Icon3
                        style={[
                          styles.icon,
                          {
                            color: showwhat1 == 'Message' ? '#fff' : '#fff',
                          },
                        ]}
                        name="money-check-alt"
                        size={25}
                        color="#fff"
                      />

                      {/* <Text
                      style={[
                        styles.ButtonText,
                        {
                          color: showwhat1 == 'Message' ? '#fff' : '#000',
                        },
                      ]}>
                      (1)
                    </Text> */}
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Message'
                              ? Color.darkGreen
                              : Color.darkGreen,
                        },
                      ]}>
                      Tax
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch1,
                        {
                          backgroundColor:
                            showwhat1 == 'Proposal' ? Color.geen : Color.darkGreen,
                        },
                      ]}
                      onPress={() =>
                        showwhat1 == 'Proposal'
                          ? setshowwhat1('')
                          : showwhatfunc1('Proposal')
                      }>
                      <Icon
                        style={[
                          styles.icon,
                          {
                            color: showwhat1 == 'Proposal' ? '#fff' : '#fff',
                          },
                        ]}
                        name="message1"
                        size={25}
                        color="#fff"
                      />


                      {/* <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Proposal'
                              ? Color.white
                              : Color.darkGreen,
                        },
                      ]}>
                      ({dashboardMessageList.length})
                    </Text> */}
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Message'
                              ? Color.darkGreen
                              : Color.darkGreen,
                        },
                      ]}>
                      Messages
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch1,
                        {
                          backgroundColor:
                            showwhat1 == 'Signature' ? '#2F4050' : Color.darkGreen,
                        },
                      ]}
                      onPress={() =>
                        showwhat1 == 'Signature'
                          ? setshowwhat1('')
                          : showwhatfunc1('Signature')
                      }>
                      <Icon1
                        style={[
                          styles.icon,
                          { color: showwhat1 == 'Signature' ? '#fff' : '#fff' },
                        ]}
                        name="event"
                        size={25}
                        color="#fff"
                      />


                      {/* <Text
                      style={[
                        styles.ButtonText,
                        {
                          color: showwhat1 == 'Signature' ? '#fff' : '#000',
                        },
                      ]}>
                      (0)
                    </Text> */}
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Message'
                              ? Color.darkGreen
                              : Color.darkGreen,
                        },
                      ]}>
                      Events
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch1,
                        {
                          backgroundColor:
                            showwhat1 == 'Reminders' ? '#2F4050' : Color.darkGreen,
                        },
                      ]}
                      onPress={() =>
                        showwhat1 == 'Reminders'
                          ? setshowwhat1('')
                          : showwhatfunc1('Reminders')
                      }>
                      <Icon2
                        style={[
                          styles.icon,
                          {
                            color: showwhat1 == 'Reminders' ? '#fff' : '#fff',
                          },
                        ]}
                        name="holiday-village"
                        size={25}
                        color="#fff"
                      />


                      {/* <Text
                      style={[
                        styles.ButtonText,
                        {
                          color: showwhat1 == 'Reminders' ? '#fff' : '#000',
                        },
                      ]}>
                      (1)
                    </Text> */}
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Message'
                              ? Color.darkGreen
                              : Color.darkGreen,
                        },
                      ]}>
                      Holidays
                    </Text>
                  </View>
                  {/* </View> */}
                </View>
              );
            } else if (showwhat1 == 'Signature') {
              return (
                <View style={styles.moblieSec}>
                  {/* <View style={{ flexDirection: "column", justifyContent: 'space-between' }}> */}
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.emailtoch,
                        {
                          backgroundColor:
                            showwhat1 == 'Message' ? '#2F4050' : Color.darkGreen,
                        },
                      ]}
                      onPress={() =>
                        showwhat1 == 'Message'
                          ? setshowwhat1('')
                          : showwhatfunc1('Message')
                      }>
                      <Icon3
                        style={[
                          styles.icon,
                          {
                            color: showwhat1 == 'Message' ? '#fff' : '#fff',
                          },
                        ]}
                        name="money-check-alt"
                        size={25}
                        color="#fff"
                      />


                      {/* <Text
                      style={[
                        styles.ButtonText,
                        {
                          color: showwhat1 == 'Message' ? '#fff' : '#000',
                        },
                      ]}>
                      (1)
                    </Text> */}
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Message'
                              ? Color.darkGreen
                              : Color.darkGreen,
                        },
                      ]}>
                      Tax
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch1,
                        {
                          backgroundColor:
                            showwhat1 == 'Proposal' ? '#2F4050' : Color.darkGreen,
                        },
                      ]}
                      onPress={() =>
                        showwhat1 == 'Proposal'
                          ? setshowwhat1('')
                          : showwhatfunc1('Proposal')
                      }>
                      <Icon
                        style={[
                          styles.icon,
                          {
                            color: showwhat1 == 'Proposal' ? '#fff' : '#fff',
                          },
                        ]}
                        name="message1"
                        size={25}
                        color="#fff"
                      />


                      {/* <Text
                      style={[
                        styles.ButtonText,
                        {
                          color: showwhat1 == 'Proposal' ? '#fff' : '#000',
                        },
                      ]}>
                      ({dashboardMessageList.length})
                    </Text> */}
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Message'
                              ? Color.darkGreen
                              : Color.darkGreen,
                        },
                      ]}>
                      Messages
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch1,
                        {
                          backgroundColor:
                            showwhat1 == 'Signature' ? Color.geen : Color.darkGreen,
                        },
                      ]}
                      onPress={() =>
                        showwhat1 == 'Signature'
                          ? setshowwhat1('')
                          : showwhatfunc1('Signature')
                      }>
                      <Icon1
                        style={[
                          styles.icon,
                          { color: showwhat1 == 'Signature' ? '#fff' : '#fff' },
                        ]}
                        name="event"
                        size={25}
                        color="#fff"
                      />


                      {/* <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Signature'
                              ? Color.white
                              : Color.darkGreen,
                        },
                      ]}>
                      (0)
                    </Text> */}
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Message'
                              ? Color.darkGreen
                              : Color.darkGreen,
                        },
                      ]}>
                      Events
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch1,
                        {
                          backgroundColor:
                            showwhat1 == 'Reminders' ? '#2F4050' : Color.darkGreen,
                        },
                      ]}
                      onPress={() =>
                        showwhat1 == 'Reminders'
                          ? setshowwhat1('')
                          : showwhatfunc1('Reminders')
                      }>
                      <Icon2
                        style={[
                          styles.icon,
                          {
                            color: showwhat1 == 'Reminders' ? '#fff' : '#fff',
                          },
                        ]}
                        name="holiday-village"
                        size={25}
                        color="#fff"
                      />


                      {/* <Text
                      style={[
                        styles.ButtonText,
                        {
                          color: showwhat1 == 'Reminders' ? '#fff' : '#000',
                        },
                      ]}>
                      (1)
                    </Text> */}
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Message'
                              ? Color.darkGreen
                              : Color.darkGreen,
                        },
                      ]}>
                      Holidays
                    </Text>
                  </View>
                  {/* </View> */}
                </View>
              );
            } else {
              return (
                <View style={styles.moblieSec}>
                  {/* <View style={{ flexDirection: "column", justifyContent: 'space-between' }}> */}
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.emailtoch,
                        {
                          backgroundColor:
                            showwhat1 == 'Message' ? '#2F4050' : Color.darkGreen,
                        },
                      ]}
                      onPress={() =>
                        showwhat1 == 'Message'
                          ? setshowwhat1('')
                          : showwhatfunc1('Message')
                      }>
                      <Icon3
                        style={[
                          styles.icon,
                          {
                            color: showwhat1 == 'Message' ? '#fff' : '#fff',
                          },
                        ]}
                        name="money-check-alt"
                        size={25}
                        color="#fff"
                      />


                      {/* <Text
                      style={[
                        styles.ButtonText,
                        {
                          color: showwhat1 == 'Message' ? '#fff' : '#000',
                        },
                      ]}>
                      (1)
                    </Text> */}
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Message'
                              ? Color.darkGreen
                              : Color.darkGreen,
                        },
                      ]}>
                      Tax
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch1,
                        {
                          backgroundColor:
                            showwhat1 == 'Proposal' ? '#2F4050' : Color.darkGreen,
                        },
                      ]}
                      onPress={() => showwhatfunc1('Proposal')}>
                      <Icon
                        style={[
                          styles.icon,
                          {
                            color: showwhat1 == 'Proposal' ? '#fff' : '#fff',
                          },
                        ]}
                        name="message1"
                        size={25}
                        color="#fff"
                      />


                      {/* <Text
                      style={[
                        styles.ButtonText,
                        {
                          color: showwhat1 == 'Proposal' ? '#fff' : '#000',
                        },
                      ]}>
                      ({dashboardMessageList.length})
                    </Text> */}
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Message'
                              ? Color.darkGreen
                              : Color.darkGreen,
                        },
                      ]}>
                      Messages
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch1,
                        {
                          backgroundColor:
                            showwhat1 == 'Signature' ? '#2F4050' : Color.darkGreen,
                        },
                      ]}
                      onPress={() =>
                        showwhat1 == 'Signature'
                          ? setshowwhat1('')
                          : showwhatfunc1('Signature')
                      }>
                      <Icon1
                        style={[
                          styles.icon,
                          { color: showwhat1 == 'Signature' ? '#fff' : '#fff' },
                        ]}
                        name="event"
                        size={25}
                        color="#fff"
                      />


                      {/* <Text
                      style={[
                        styles.ButtonText,
                        {
                          color: showwhat1 == 'Signature' ? '#fff' : '#000',
                        },
                      ]}>
                      (0)
                    </Text> */}
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Message'
                              ? Color.darkGreen
                              : Color.darkGreen,
                        },
                      ]}>
                      Events
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch1,
                        {
                          backgroundColor:
                            showwhat1 == 'Reminders' ? Color.geen : Color.darkGreen,
                        },
                      ]}
                      onPress={() =>
                        showwhat1 == 'Reminders'
                          ? setshowwhat1('')
                          : showwhatfunc1('Reminders')
                      }>
                      <Icon2
                        style={[
                          styles.icon,
                          {
                            color: showwhat1 == 'Reminders' ? '#fff' : '#fff',
                          },
                        ]}
                        name="holiday-village"
                        size={25}
                        color="#fff"
                      />


                      {/* <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Reminders'
                              ? Color.white
                              : Color.darkGreen,
                        },
                      ]}>
                      (1)
                    </Text> */}
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Message'
                              ? Color.darkGreen
                              : Color.darkGreen,
                        },
                      ]}>
                      Holidays
                    </Text>
                  </View>
                  {/* </View> */}
                </View>
              );
            }
          })()}


          {(() => {
            if (showwhat2 == 'orders') {
              return (
                <View style={styles.moblieSec}>
                  {/* <View style={{ flexDirection: "column", justifyContent: 'space-between' }}> */}
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.emailtochO,
                        {
                          backgroundColor:
                            showwhat2 == 'orders' ? Color.geen : Color.darkGreen,
                        },
                      ]}
                      onPress={() =>
                        showwhat2 == 'orders'
                          ? setshowwhat2('')
                          : showwhatfunc2('orders')
                      }>
                      <Icon4
                        style={[
                          styles.icon,
                          {
                            color: showwhat2 == 'orders' ? '#fff' : '#fff',
                          },
                        ]}
                        name="list-check"
                        size={25}
                        color="#fff"
                      />


                      {/* <Text
                    style={[
                      styles.ButtonText,
                      {
                        color:
                          showwhat1 == 'Message'
                            ? Color.white
                            : Color.darkGreen,
                      },
                    ]}>
                    (1)
                  </Text> */}
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Message'
                              ? Color.darkGreen
                              : Color.darkGreen,
                        },
                      ]}>
                      Orders
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch,
                        {
                          backgroundColor:
                            showwhat2 == 'taxReturn' ? Color.geen : Color.darkGreen,
                        },
                      ]}
                      onPress={() =>
                        showwhat2 == 'taxReturn'
                          ? setshowwhat2('')
                          : showwhatfunc2('taxReturn')
                      }>
                      <Icon4
                        style={[
                          styles.icon,
                          {
                            color:
                              showwhat2 == 'taxReturn'
                                ? Color.white
                                : Color.white,
                          },
                        ]}
                        name="money-bills"
                        size={25}
                        color="#fff"
                      />


                      {/* <Text
                    style={[
                      styles.ButtonText,
                      {
                        color:
                          showwhat1 == 'Proposal'
                            ? Color.white
                            : Color.darkGreen,
                      },
                    ]}>
                    ({dashboardMessageList.length})
                  </Text> */}
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Message'
                              ? Color.darkGreen
                              : Color.darkGreen,
                        },
                      ]}>
                      Tax Returns
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch,
                        {
                          backgroundColor:
                            showwhat2 == 'book' ? Color.geen : Color.darkGreen,
                        },
                      ]}
                      onPress={() =>
                        showwhat2 == 'book'
                          ? setshowwhat2('')
                          : showwhatfunc2('book')
                      }>
                      <Icon4
                        style={[
                          styles.icon,
                          {
                            color:
                              showwhat2 == 'book'
                                ? Color.white
                                : Color.white,
                          },
                        ]}
                        name="calculator"
                        size={25}
                        color="#fff"
                      />


                      {/* <Text
                    style={[
                      styles.ButtonText,
                      {
                        color:
                          showwhat1 == 'Signature'
                            ? Color.white
                            : Color.darkGreen,
                      },
                    ]}>
                    (0)
                  </Text> */}
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Message'
                              ? Color.darkGreen
                              : Color.darkGreen,
                        },
                      ]}>
                      Book Keeping
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch,
                        {
                          backgroundColor:
                            showwhat2 == 'Gov' ? Color.geen : Color.darkGreen,
                        },
                      ]}
                      onPress={() =>
                        showwhat2 == 'Gov'
                          ? setshowwhat2('')
                          : showwhatfunc2('Gov')
                      }>
                      <Icon4
                        style={[
                          styles.icon,
                          {
                            color:
                              showwhat2 == 'Gov'
                                ? Color.white
                                : Color.white,
                          },
                        ]}
                        name="hand-holding-dollar"
                        size={25}
                        color="#fff"
                      />


                      {/* <Text
                    style={[
                      styles.ButtonText,
                      {
                        color:
                          showwhat1 == 'Reminders'
                            ? Color.white
                            : Color.darkGreen,
                      },
                    ]}>
                    (1)
                  </Text> */}
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Message'
                              ? Color.darkGreen
                              : Color.darkGreen,
                        },
                      ]}>
                      Gov. Payments
                    </Text>
                  </View>
                  {/* </View> */}
                </View>
              );
            } else if (showwhat2 == 'taxReturn') {
              return (
                <View style={styles.moblieSec}>
                  {/* <View style={{ flexDirection: "column", justifyContent: 'space-between' }}> */}
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.emailtochO,
                        {
                          backgroundColor:
                            showwhat2 == 'orders' ? Color.geen : Color.darkGreen,
                        },
                      ]}
                      onPress={() =>
                        showwhat2 == 'orders'
                          ? setshowwhat2('')
                          : showwhatfunc2('orders')
                      }>
                      <Icon4
                        style={[
                          styles.icon,
                          {
                            color: showwhat2 == 'orders' ? '#fff' : '#fff',
                          },
                        ]}
                        name="list-check"
                        size={25}
                        color="#fff"
                      />


                      {/* <Text
                    style={[
                      styles.ButtonText,
                      {
                        color:
                          showwhat1 == 'Message'
                            ? Color.white
                            : Color.darkGreen,
                      },
                    ]}>
                    (1)
                  </Text> */}
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Message'
                              ? Color.darkGreen
                              : Color.darkGreen,
                        },
                      ]}>
                      Orders
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch,
                        {
                          backgroundColor:
                            showwhat2 == 'taxReturn' ? Color.geen : Color.darkGreen,
                        },
                      ]}
                      onPress={() =>
                        showwhat2 == 'taxReturn'
                          ? setshowwhat2('')
                          : showwhatfunc2('taxReturn')
                      }>
                      <Icon4
                        style={[
                          styles.icon,
                          {
                            color:
                              showwhat2 == 'taxReturn'
                                ? Color.white
                                : Color.white,
                          },
                        ]}
                        name="money-bills"
                        size={25}
                        color="#fff"
                      />


                      {/* <Text
                    style={[
                      styles.ButtonText,
                      {
                        color:
                          showwhat1 == 'Proposal'
                            ? Color.white
                            : Color.darkGreen,
                      },
                    ]}>
                    ({dashboardMessageList.length})
                  </Text> */}
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Message'
                              ? Color.darkGreen
                              : Color.darkGreen,
                        },
                      ]}>
                      Tax Returns
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch,
                        {
                          backgroundColor:
                            showwhat2 == 'book' ? Color.geen : Color.darkGreen,
                        },
                      ]}
                      onPress={() =>
                        showwhat2 == 'book'
                          ? setshowwhat2('')
                          : showwhatfunc2('book')
                      }>
                      <Icon4
                        style={[
                          styles.icon,
                          {
                            color:
                              showwhat2 == 'book'
                                ? Color.white
                                : Color.white,
                          },
                        ]}
                        name="calculator"
                        size={25}
                        color="#fff"
                      />


                      {/* <Text
                    style={[
                      styles.ButtonText,
                      {
                        color:
                          showwhat1 == 'Signature'
                            ? Color.white
                            : Color.darkGreen,
                      },
                    ]}>
                    (0)
                  </Text> */}
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Message'
                              ? Color.darkGreen
                              : Color.darkGreen,
                        },
                      ]}>
                      Book Keeping
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch,
                        {
                          backgroundColor:
                            showwhat2 == 'Gov' ? Color.geen : Color.darkGreen,
                        },
                      ]}
                      onPress={() =>
                        showwhat2 == 'Gov'
                          ? setshowwhat2('')
                          : showwhatfunc2('Gov')
                      }>
                      <Icon4
                        style={[
                          styles.icon,
                          {
                            color:
                              showwhat2 == 'Gov'
                                ? Color.white
                                : Color.white,
                          },
                        ]}
                        name="hand-holding-dollar"
                        size={25}
                        color="#fff"
                      />


                      {/* <Text
                    style={[
                      styles.ButtonText,
                      {
                        color:
                          showwhat1 == 'Reminders'
                            ? Color.white
                            : Color.darkGreen,
                      },
                    ]}>
                    (1)
                  </Text> */}
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Message'
                              ? Color.darkGreen
                              : Color.darkGreen,
                        },
                      ]}>
                      Gov. Payments
                    </Text>
                  </View>
                  {/* </View> */}
                </View>
              );
            } else if (showwhat2 == 'book') {
              return (
                <View style={styles.moblieSec}>
                  {/* <View style={{ flexDirection: "column", justifyContent: 'space-between' }}> */}
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.emailtochO,
                        {
                          backgroundColor:
                            showwhat2 == 'orders' ? Color.geen : Color.darkGreen,
                        },
                      ]}
                      onPress={() =>
                        showwhat2 == 'orders'
                          ? setshowwhat2('')
                          : showwhatfunc2('orders')
                      }>
                      <Icon4
                        style={[
                          styles.icon,
                          {
                            color: showwhat2 == 'orders' ? '#fff' : '#fff',
                          },
                        ]}
                        name="list-check"
                        size={25}
                        color="#fff"
                      />


                      {/* <Text
                    style={[
                      styles.ButtonText,
                      {
                        color:
                          showwhat1 == 'Message'
                            ? Color.white
                            : Color.darkGreen,
                      },
                    ]}>
                    (1)
                  </Text> */}
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Message'
                              ? Color.darkGreen
                              : Color.darkGreen,
                        },
                      ]}>
                      Orders
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch,
                        {
                          backgroundColor:
                            showwhat2 == 'taxReturn' ? Color.geen : Color.darkGreen,
                        },
                      ]}
                      onPress={() =>
                        showwhat2 == 'taxReturn'
                          ? setshowwhat2('')
                          : showwhatfunc2('taxReturn')
                      }>
                      <Icon4
                        style={[
                          styles.icon,
                          {
                            color:
                              showwhat2 == 'taxReturn'
                                ? Color.white
                                : Color.white,
                          },
                        ]}
                        name="money-bills"
                        size={25}
                        color="#fff"
                      />

                      {/* <Text
                    style={[
                      styles.ButtonText,
                      {
                        color:
                          showwhat1 == 'Proposal'
                            ? Color.white
                            : Color.darkGreen,
                      },
                    ]}>
                    ({dashboardMessageList.length})
                  </Text> */}
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Message'
                              ? Color.darkGreen
                              : Color.darkGreen,
                        },
                      ]}>
                      Tax Returns
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch,
                        {
                          backgroundColor:
                            showwhat2 == 'book' ? Color.geen : Color.darkGreen,
                        },
                      ]}
                      onPress={() =>
                        showwhat2 == 'book'
                          ? setshowwhat2('')
                          : showwhatfunc2('book')
                      }>
                      <Icon4
                        style={[
                          styles.icon,
                          {
                            color:
                              showwhat2 == 'book'
                                ? Color.white
                                : Color.white,
                          },
                        ]}
                        name="calculator"
                        size={25}
                        color="#fff"
                      />


                      {/* <Text
                    style={[
                      styles.ButtonText,
                      {
                        color:
                          showwhat1 == 'Signature'
                            ? Color.white
                            : Color.darkGreen,
                      },
                    ]}>
                    (0)
                  </Text> */}
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Message'
                              ? Color.darkGreen
                              : Color.darkGreen,
                        },
                      ]}>
                      Book Keeping
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch,
                        {
                          backgroundColor:
                            showwhat2 == 'Gov' ? Color.geen : Color.darkGreen,
                        },
                      ]}
                      onPress={() =>
                        showwhat2 == 'Gov'
                          ? setshowwhat2('')
                          : showwhatfunc2('Gov')
                      }>
                      <Icon4
                        style={[
                          styles.icon,
                          {
                            color:
                              showwhat2 == 'Gov'
                                ? Color.white
                                : Color.white,
                          },
                        ]}
                        name="hand-holding-dollar"
                        size={25}
                        color="#fff"
                      />


                      {/* <Text
                    style={[
                      styles.ButtonText,
                      {
                        color:
                          showwhat1 == 'Reminders'
                            ? Color.white
                            : Color.darkGreen,
                      },
                    ]}>
                    (1)
                  </Text> */}
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Message'
                              ? Color.darkGreen
                              : Color.darkGreen,
                        },
                      ]}>
                      Gov. Payments
                    </Text>
                  </View>
                  {/* </View> */}
                </View>
              );
            } else {
              return (
                <View style={styles.moblieSec}>
                  {/* <View style={{ flexDirection: "column", justifyContent: 'space-between' }}> */}
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.emailtochO,
                        {
                          backgroundColor:
                            showwhat2 == 'orders' ? Color.geen : Color.darkGreen,
                        },
                      ]}
                      onPress={() =>
                        showwhat2 == 'orders'
                          ? setshowwhat2('')
                          : showwhatfunc2('orders')
                      }>
                      <Icon4
                        style={[
                          styles.icon,
                          {
                            color: showwhat2 == 'orders' ? '#fff' : '#fff',
                          },
                        ]}
                        name="list-check"
                        size={25}
                        color="#fff"
                      />


                      {/* <Text
                    style={[
                      styles.ButtonText,
                      {
                        color:
                          showwhat1 == 'Message'
                            ? Color.white
                            : Color.darkGreen,
                      },
                    ]}>
                    (1)
                  </Text> */}
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Message'
                              ? Color.darkGreen
                              : Color.darkGreen,
                        },
                      ]}>
                      Orders
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch,
                        {
                          backgroundColor:
                            showwhat2 == 'taxReturn' ? Color.geen : Color.darkGreen,
                        },
                      ]}
                      onPress={() =>
                        showwhat2 == 'taxReturn'
                          ? setshowwhat2('')
                          : showwhatfunc2('taxReturn')
                      }>
                      <Icon4
                        style={[
                          styles.icon,
                          {
                            color:
                              showwhat2 == 'taxReturn'
                                ? Color.white
                                : Color.white,
                          },
                        ]}
                        name="money-bills"
                        size={25}
                        color="#fff"
                      />


                      {/* <Text
                    style={[
                      styles.ButtonText,
                      {
                        color:
                          showwhat1 == 'Proposal'
                            ? Color.white
                            : Color.darkGreen,
                      },
                    ]}>
                    ({dashboardMessageList.length})
                  </Text> */}
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Message'
                              ? Color.darkGreen
                              : Color.darkGreen,
                        },
                      ]}>
                      Tax Returns
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch,
                        {
                          backgroundColor:
                            showwhat2 == 'book' ? Color.geen : Color.darkGreen,
                        },
                      ]}
                      onPress={() =>
                        showwhat2 == 'book'
                          ? setshowwhat2('')
                          : showwhatfunc2('book')
                      }>
                      <Icon4
                        style={[
                          styles.icon,
                          {
                            color:
                              showwhat2 == 'book'
                                ? Color.white
                                : Color.white,
                          },
                        ]}
                        name="calculator"
                        size={25}
                        color="#fff"
                      />


                      {/* <Text
                    style={[
                      styles.ButtonText,
                      {
                        color:
                          showwhat1 == 'Signature'
                            ? Color.white
                            : Color.darkGreen,
                      },
                    ]}>
                    (0)
                  </Text> */}
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Message'
                              ? Color.darkGreen
                              : Color.darkGreen,
                        },
                      ]}>
                      Book Keeping
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.mobiletoch,
                        {
                          backgroundColor:
                            showwhat2 == 'Gov' ? Color.geen : Color.darkGreen,
                        },
                      ]}
                      onPress={() =>
                        showwhat2 == 'Gov'
                          ? setshowwhat2('')
                          : showwhatfunc2('Gov')
                      }>
                      <Icon4
                        style={[
                          styles.icon,
                          {
                            color:
                              showwhat2 == 'Gov'
                                ? Color.white
                                : Color.white,
                          },
                        ]}
                        name="hand-holding-dollar"
                        size={25}
                        color="#fff"
                      />


                      {/* <Text
                    style={[
                      styles.ButtonText,
                      {
                        color:
                          showwhat1 == 'Reminders'
                            ? Color.white
                            : Color.darkGreen,
                      },
                    ]}>
                    (1)
                  </Text> */}
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.ButtonText,
                        {
                          color:
                            showwhat1 == 'Message'
                              ? Color.darkGreen
                              : Color.darkGreen,
                        },
                      ]}>
                      Gov. Payments
                    </Text>
                  </View>
                  {/* </View> */}
                </View>
              );
            }
          })()}
        </View>
        {(() => {
          if (showwhat1 == 'Message') {
            return (
              <ScrollView>
                {/* <View style={styles.subContainer}> */}
                <TouchableOpacity onPress={() => setshowwhat1('')}>
                  <View style={styles.part}></View>
                  {TaxfilteredList &&
                    TaxfilteredList.map(item => (
                      <View key={item.id} style={{ padding: 20 }}>
                        <Text
                          style={{
                            backgroundColor: '#23c6c8',
                            fontSize: 12,
                            padding: 3,
                          }}>
                          {item.subject}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '700',
                            padding: 3,
                          }}>
                          Message:
                          <Text
                            style={{
                              fontSize: 10,
                              fontWeight: 'normal',
                              padding: 3,
                            }}>
                            {item.message}
                          </Text>
                        </Text>
                      </View>
                    ))}

                  {/* <Text style={styles.subHead}> Message Not Found</Text> */}

                  {/* </View> */}
                </TouchableOpacity>
              </ScrollView>
            );
          } else if (showwhat1 == 'Proposal') {
            return (
              <ScrollView>
                <TouchableOpacity onPress={() => setshowwhat1('')}>
                  <View style={styles.part}></View>

                  {dashboardMessageList &&
                    dashboardMessageList.map(item => (
                      <View
                        key={item.id}
                        style={{
                          paddingLeft: 20,
                          //paddingBottom: 10,
                          paddingTop: 10,
                        }}>
                        <Text
                          style={{
                            backgroundColor: '#23c6c8',
                            fontSize: 12,
                            width: wp(15),
                            padding: 3,
                            textAlign: 'center',
                          }}>
                          Action
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '700',
                            padding: 3,
                          }}>
                          Notification:
                          <Text
                            style={{
                              fontSize: 10,
                              fontWeight: 'normal',
                              padding: 3,
                            }}>
                            You have created new action #{item.id}
                          </Text>
                        </Text>
                      </View>
                    ))}

                  {/* <View style={styles.subContainer}> */}
                  {/* <Text style={styles.subHead}>Proposal Results Found</Text> */}

                  {/* </View> */}
                </TouchableOpacity>
              </ScrollView>
            );
          } else if (showwhat1 == 'Signature') {
            return (
              <ScrollView>
                <TouchableOpacity onPress={() => setshowwhat1('')}>
                  <View style={styles.part}></View>

                  {/* <View style={styles.subContainer}> */}
                  <Text style={styles.subHead}>Events not found</Text>

                  {/* </View> */}
                </TouchableOpacity>
              </ScrollView>
            );
          } else if (showwhat1 == 'Reminders') {
            return (
              <TouchableOpacity onPress={() => setshowwhat1('')}>
                <View style={{ height: 200 }}>
                  <View style={styles.part}></View>
                  {filteredList &&
                    filteredList.map(item => (
                      <View key={item.id} style={{ height: 200, padding: 20 }}>
                        <Text
                          style={{
                            backgroundColor: '#23c6c8',
                            fontSize: 12,
                            padding: 3,
                          }}>
                          {item.subject}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '700',
                            padding: 3,
                          }}>
                          Message:
                          <Text
                            style={{
                              fontSize: 10,
                              fontWeight: 'normal',
                              padding: 3,
                            }}>
                            {item.message}
                          </Text>
                        </Text>
                      </View>
                    ))}
                  {/* <View style={styles.subContainer}> */}
                  {/* <Text style={styles.subHead}>Reminders Not Found1</Text> */}
                  {/* </View> */}
                </View>
              </TouchableOpacity>
            );
          }
        })()}
        {(() => {

          if (showwhat2 == 'orders') {
            return (
              <TouchableOpacity onPress={() => setshowwhat2('')}>
                <View style={styles.part}></View>

                <View style={{ height: 200 }}>

                  <Text style={{ alignSelf: 'center', marginTop: 20 }}>No Orders</Text>
                </View>
              </TouchableOpacity>
            );
          } else if (showwhat2 == 'taxReturn') {
            return (
              <TouchableOpacity onPress={() => setshowwhat2('')}>
                <View style={styles.part}></View>

                <View style={{ height: 200 }}>
                  <Text style={{ alignSelf: 'center', marginTop: 20 }}>No Tax Returns</Text>
                </View>
              </TouchableOpacity>
            );
          } else if (showwhat2 == 'book') {
            return (
              <TouchableOpacity onPress={() => setshowwhat2('')}>
                <View style={styles.part}></View>

                <View style={{ height: 200 }}>
                  <Text style={{ alignSelf: 'center', marginTop: 20 }}>No Book Keeping</Text>
                </View>
              </TouchableOpacity>
            );
          } else if (showwhat2 == 'Gov') {
            return (
              <TouchableOpacity onPress={() => setshowwhat2('')}>
                <View style={styles.part}></View>

                <View style={{ height: 200 }}>
                  <Text style={{ alignSelf: 'center', marginTop: 20 }}>No Gov. Payments</Text>
                </View>
              </TouchableOpacity>
            );
          }
        })()}

      </View>
    );
};

export default HeaderIcons;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d5e3e5'
    },
    heading: {
        fontSize: 16,
        // maxWidth:'80%',
        color: Color.darkGreen,
        // height:40,
        marginTop: 20,
        fontWeight: '600',
        textAlign: 'center',
    },
    part: {
        borderWidth: 0.5,
        borderColor: '#A7B1C2',
        marginTop: 10,
        width: '90%',
        alignSelf: 'center',
    },
    slideContainer: {
        backgroundColor: '#fff',
        width: wp(90),
        justifyContent: 'center',
        alignSelf: 'center',
        /// height: 420,
        opacity: 2,
        paddingBottom: 20,
        borderRadius: 10,
        marginTop: 20,
        // width:'62%'
    },
    tabsContainer: {
        // backgroundColor: '#fff',
        width: wp(90),
        justifyContent: 'center',
        alignSelf: 'center',
        /// height: 420,
        opacity: 2,
        paddingBottom: 20,
        borderRadius: 10,
        // marginTop: 20,
        // width:'62%'
    },
    Slidericons: {
        width: '80%',
        height: 160,
        resizeMode: 'contain',

        // marginTop: 10,
        // marginLeft: 20,
        alignSelf: 'center',
    },
    Slidericons1: {
        width: '60%',
        height: 140,
        resizeMode: 'contain',
        // marginLeft: 20,
        alignSelf: 'center',
    },
    postText: {
        alignSelf: 'center',
        color: Color.geen,
        fontSize: 20,
        fontWeight: '600',
        // marginTop: 20,
    },
    sliderText: {
        color: Color.darkGreen,
        fontSize: 14,
        textAlign: 'center',
        marginTop: 10,
        fontWeight: '700'
    },
    cardSlider: {
        flex: 1,
        //borderWidth: 1,
        backgroundColor: '#fff',
        width: wp(90),
        justifyContent: 'center',
    },
    info: {
        color: Color.geen,
        alignSelf: 'center',
        fontSize: 14,
        marginTop: 10,
        fontWeight: '700'
    },
    btn: {
        width: wp(40),
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 30,
        marginTop: 10,
        backgroundColor: Color.darkGreen,
        borderRadius: 30,
        padding: 10,
        alignItems: 'center',
    },
    profileImg: {
        width: 70,
        borderRadius: 80,
        height: 70,
        marginTop: 30,
        alignSelf: 'center',
        // marginLeft:100
    },
    headText: {
        textAlign: 'center',
        // marginLeft:110,
        color: Color.darkGreen,
        marginTop: 10,
        fontWeight: '600',
    },
    headText1: {
        color: Color.darkGreen,
        marginTop: 30,
        fontWeight: '600',
        fontSize: 20,
        marginLeft: 30,
    },
    infoHead: {
        backgroundColor: Color.geen,
        padding: 7,
        marginTop: 20,
        width: '82%',
        marginLeft: 30,
        // alignSelf: 'center',
        marginBottom: 12,
    },
    infoHeadText: {
        color: '#fff',
        fontSize: 14,
        padding: 5,
        fontWeight: '600',
    },
    ofcInfotxt: {
        color: Color.darkGreen,
        marginLeft: 30,
        fontSize: 14,
    },
    ofcInfotxt1: {
        color: '#1F3E50',
        marginLeft: 30,
        justifyContent: 'center',
        margin: 10,
    },
    moblieSec: {
        // backgroundColor: "lightgrey",
        // height: 20,
        width: wp(85),
        // backgroundColor: 'red',
        //backgroundColor: 'red',
        justifyContent: 'space-between',
        alignSelf: 'center',
        borderRadius: 50,
        // justifyContent: "center",
        // alignItems: "center",
        marginTop: 20,
        // marginBottom: 30,

        flexDirection: 'row',
        // alignSelf: "center",
    },
    emailtoch: {
        //  backgroundColor: "lightgray",
        width: wp(13),
        height: wp(13),
        paddingTop: 5,
        //  justifyContent: 'center',
        borderRadius: 50,
        //marginRight: 6,
        //marginTop: 10,
    },
    emailtochO: {
        //  backgroundColor: "lightgray",
        width: wp(13),
        height: wp(13),
        paddingTop: 5,
        //  justifyContent: 'center',
        borderRadius: 50,
        //marginRight: 6,
        //marginTop: 10,
    },
    ButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 9,
    },
    mobiletoch: {
        // backgroundColor: showwhat == "My Schools" ? "#2F5597" : "lightgray",
        // width: 70,
        // height: 45,
        width: wp(13),
        height: wp(13),
        //marginTop: 10,
        paddingTop: 5,
        borderRadius: 50,
        // justifyContent: 'center',
        marginLeft: 5
    },
    mobiletoch1: {
        // backgroundColor: showwhat == "My Schools" ? "#2F5597" : "lightgray",
        // width: 70,
        // height: 45,
        width: wp(13),
        height: wp(13),
        //marginTop: 10,
        paddingTop: 5,
        borderRadius: 50,
        // justifyContent: 'center',
        marginRight: 5,
    },
    subHead: {
        marginLeft: 30,
        marginTop: 20,
    },
    icon: { alignSelf: 'center', marginTop: 5 },
    cardShadow: {
        // backgroundColor: 'red',
        // height: 300,
        paddingTop: 20,
    },
    bgImg: {
        height: hp(85)
    }
});

