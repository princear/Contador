import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import StepIndicator from 'react-native-step-indicator';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/EvilIcons'
import Icon2 from 'react-native-vector-icons/Feather'
import Icon3 from 'react-native-vector-icons/FontAwesome'
import CheckBox from '@react-native-community/checkbox';

const clientSteps = () => {
    const labels = ["ABOUT YOURSELF", "REFERRAL SOURCE", "PAYMENT METHOD", "ASSOCIATION IF CORRECT", "CURRENT PROFESSION", "ARE YOU INTRESTED IN ANY OF THE BELOW"];
    const [position, setPosition] = useState(0)
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    const customStyles = {
        stepIndicatorSize: 25,
        currentStepIndicatorSize: 30,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 3,
        stepStrokeCurrentColor: '#2F4050',
        stepStrokeWidth: 4,
        stepStrokeFinishedColor: '#8AB645',
        stepStrokeUnFinishedColor: '#aaaaaa',
        separatorFinishedColor: '#2F4050',
        separatorUnFinishedColor: '#aaaaaa',
        stepIndicatorFinishedColor: '#2F4050',
        stepIndicatorUnFinishedColor: '#ffffff',
        stepIndicatorCurrentColor: '#ffffff',
        stepIndicatorLabelFontSize: 13,
        currentStepIndicatorLabelFontSize: 13,
        stepIndicatorLabelCurrentColor: '#2F4050',
        stepIndicatorLabelFinishedColor: '#ffffff',
        stepIndicatorLabelUnFinishedColor: '#aaaaaa',
        labelColor: '#999999',
        labelSize: 9,
        currentStepLabelColor: '#2F4050'
    }
    const onPageChange = (position) => {
        setPosition(position);
    }
    console.log(position, 'position')
    return (
        <View style={{ width: '95%', alignSelf: 'center' }}>
            <View style={styles.step}>
                <StepIndicator
                    customStyles={customStyles}
                    currentPosition={position}
                    labels={labels}
                    // onPress={onPageChange}
                    stepCount={6}
                />
            </View>

            <View style={styles.subContainer}>


                {(() => {
                    if (position == 0) {
                        return (
                            // <ScrollView>
                            <View style={styles.subContainer1}>
                                <View style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: 20 }}>
                                    <Icon1
                                        style={[
                                            styles.icon,
                                            {
                                                color: '#2F4050',
                                                marginTop:3
                                            },
                                        ]}
                                        name="user"
                                        size={40}
                                        color="#fff"
                                    />
                                    <Text style={styles.subHead}>Contact Information</Text>
                                </View>
                                <View style={{ backgroundColor: '#2F4050', borderRadius: 20, height: hp(60),width:'100%',alignItems:'center'}}>
                                    <TextInput
                                        placeholder='First Name'
                                        style={[styles.input, { marginTop: 50 }]}
                                    />
                                    <TextInput
                                        placeholder='Last Name'
                                        style={styles.input}

                                    />
                                    <TextInput
                                        placeholder='Email Address'
                                        style={styles.input}

                                    />
                                    <TextInput
                                        placeholder='Mobile Number'
                                        style={styles.input}

                                    />
                                    <TextInput
                                        placeholder='Whatsapp Number'
                                        style={styles.input}

                                    />
                                </View>
                                <TouchableOpacity style={styles.btn} onPress={() => { onPageChange(1) }}>
                                    <Text style={{ color: '#fff', marginLeft: 10, fontSize: 15 }}>Confirm</Text>

                                    <Icon
                                        style={[
                                            styles.icon,
                                            {
                                                color: '#fff',
                                            },
                                        ]}
                                        name="arrowright"
                                        size={20}
                                        color="#fff"
                                    />
                                </TouchableOpacity>

                            </View>
                            // </ScrollView>
                        );
                    } else if (position == 1) {
                        return (
                            <ScrollView>
                                <View style={styles.subContainer1}>
                                    <View style={{ flexDirection: 'row', marginBottom: 20, alignSelf: 'center' }}>
                                        <Icon1
                                            style={[
                                                styles.icon,
                                                {
                                                    color: '#2F4050',
                                                    marginTop:3

                                                },
                                            ]}
                                            name="user"
                                            size={40}
                                            color="#fff"
                                        />
                                        <Text style={styles.subHead}>Referral Source and Medium</Text>
                                    </View>
                                    <View style={styles.refContent}>
                                        <Text style={{ fontSize: 20 }}>We are getting you from <Text style={{ backgroundColor: '#2F4050', color: '#fff' }}>Website</Text></Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <TouchableOpacity style={styles.btnPrev}
                                            onPress={() => { onPageChange(0) }}
                                        >
                                            <Icon
                                                style={[
                                                    styles.icon,
                                                    {
                                                        color: '#fff',
                                                    },
                                                ]}
                                                name="arrowleft"
                                                size={20}
                                                color="#fff"
                                            />
                                            <Text style={{ color: '#fff', fontSize: 15 }}>Previous</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.btn} onPress={() => { onPageChange(2) }}>
                                            <Text style={{ color: '#fff', marginLeft: 10, fontSize: 15 }}>Confirm</Text>

                                            <Icon
                                                style={[
                                                    styles.icon,
                                                    {
                                                        color: '#fff',
                                                    },
                                                ]}
                                                name="arrowright"
                                                size={20}
                                                color="#fff"
                                            />
                                        </TouchableOpacity>
                                    </View>


                                </View>
                            </ScrollView>
                        );
                    } else if (position == 2) {
                        return (
                            // <ScrollView>
                            <View style={styles.subContainer1}>
                                <View style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: 20 }}>
                                    <Icon
                                        style={[
                                            styles.icon,
                                            {
                                                color: '#2F4050',
                                                marginTop: 7,
                                                marginLeft: 10,
                                                marginRight: 10
                                            },
                                        ]}
                                        name="creditcard"
                                        size={25}
                                        color="#fff"
                                    />
                                    <Text style={styles.subHead}>Payment Method</Text>
                                </View>
                                <View style={{ backgroundColor: '#2F4050', borderRadius: 20, height: hp(55) }}>

                                    <TextInput
                                        placeholder='Bank Name'
                                        style={[styles.input, { marginTop: 70 }]}

                                    />
                                    <TextInput
                                        placeholder='Email Address'
                                        style={styles.input}

                                    />
                                    <TextInput
                                        placeholder='Account Number'
                                        style={styles.input}

                                    />
                                    <TextInput
                                        placeholder='Routing Number'
                                        style={styles.input}

                                    />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 40 }}>
                                    <TouchableOpacity style={styles.btnPrev}
                                        onPress={() => { onPageChange(1) }}
                                    >
                                        <Icon
                                            style={[
                                                styles.icon,
                                                {
                                                    color: '#fff',
                                                },
                                            ]}
                                            name="arrowleft"
                                            size={20}
                                            color="#fff"
                                        />
                                        <Text style={{ color: '#fff' }}>Previous</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.btn} onPress={() => { onPageChange(3) }}>
                                        <Text style={{ color: '#fff', marginLeft: 10 }}>Confirm</Text>

                                        <Icon
                                            style={[
                                                styles.icon,
                                                {
                                                    color: '#fff',
                                                },
                                            ]}
                                            name="arrowright"
                                            size={20}
                                            color="#fff"
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            // </ScrollView>
                        );
                    } else if (position == 3) {
                        return (
                            <ScrollView>
                                <View style={styles.subContainer1}>
                                    <View style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: 20 }}>
                                        <Icon2
                                            style={[
                                                styles.icon,
                                                {
                                                    color: '#2F4050',
                                                    // marginLeft: 10,
                                                    marginRight: 10

                                                },
                                            ]}
                                            name="user-check"
                                            size={30}
                                            color="#fff"
                                        />
                                        <Text style={styles.subHead}>Associations if Correct</Text>
                                    </View>
                                    <View style={{height:hp(60),justifyContent:'center'}}>
                                        <View style={{ marginTop: 20, marginBottom: 20 }}>
                                            <Text style={{ fontSize: 18, fontWeight: '600' }}>You are associates with these clients</Text>
                                        </View>
                                        <View style={styles.contentView}>
                                            <Text style={styles.client}>client Name 1</Text>

                                            <Text style={styles.client}>
                                                client Name 4
                                            </Text>
                                        </View>
                                        <View style={styles.contentView}>
                                            <Text style={styles.client}>client Name 2</Text>

                                            <Text style={styles.client}>
                                                client Name 5
                                            </Text>
                                        </View>
                                        <View style={styles.contentView}>
                                            <Text style={styles.client}>client Name 3</Text>

                                            <Text style={styles.client}>
                                                client Name 6
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <TouchableOpacity style={styles.btnPrev}
                                            onPress={() => { onPageChange(2) }}
                                        >
                                            <Icon
                                                style={[
                                                    styles.icon,
                                                    {
                                                        color: '#fff',
                                                    },
                                                ]}
                                                name="arrowleft"
                                                size={20}
                                                color="#fff"
                                            />
                                            <Text style={{ color: '#fff' }}>Previous</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.btn} onPress={() => { onPageChange(4) }}>
                                            <Text style={{ color: '#fff', marginLeft: 10 }}>Confirm</Text>

                                            <Icon
                                                style={[
                                                    styles.icon,
                                                    {
                                                        color: '#fff',
                                                    },
                                                ]}
                                                name="arrowright"
                                                size={20}
                                                color="#fff"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ScrollView>
                        );
                    } else if (position == 4) {
                        return (
                            <ScrollView>
                                <View style={styles.subContainer1}>
                                    <View style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: 20 }}>
                                        <Icon3
                                            style={[
                                                styles.icon,
                                                {
                                                    color: '#2F4050',
                                                    marginLeft: 10,
                                                    marginRight: 10,
                                                    marginTop:3
                                                },
                                            ]}
                                            name="suitcase"
                                            size={30}
                                            color="#fff"
                                        />
                                        <Text style={styles.subHead}>Current Profession</Text>
                                    </View>
                                    <View style={{ marginTop: 20, marginBottom: 20 }}>
                                        <Text style={{ fontSize: 15, fontWeight: '600' }}>You are associates with these clients</Text>
                                    </View>
                                    <View style={styles.contentView}>
                                        <View style={styles.client}>
                                            <CheckBox
                                                disabled={false}
                                                value={toggleCheckBox}
                                                onCheckColor='#fff'
                                                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                            />
                                            <Text style={{ color: '#fff', marginTop: 5 }} >

                                                Accountant</Text>
                                        </View>
                                        <View style={styles.client}>
                                            <CheckBox
                                                disabled={false}
                                                value={toggleCheckBox}
                                                onCheckColor='#fff'
                                                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                            />
                                            <Text style={{ color: '#fff', marginTop: 5 }}>
                                                Journalist
                                            </Text>
                                        </View>

                                    </View>
                                    <View style={styles.contentView}>
                                        <View style={styles.client}>
                                            <CheckBox
                                                disabled={false}
                                                value={toggleCheckBox}
                                                onCheckColor='#fff'
                                                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                            />
                                            <Text style={{ color: '#fff', marginTop: 5 }}>Professor</Text>
                                        </View>
                                        <View style={styles.client}>
                                            <CheckBox
                                                disabled={false}
                                                value={toggleCheckBox}
                                                onCheckColor='#fff'
                                                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                            />
                                            <Text style={{ color: '#fff', marginTop: 5 }}>
                                                Author
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.contentView}>
                                        <View style={styles.client}>
                                            <CheckBox
                                                disabled={false}
                                                value={toggleCheckBox}
                                                onCheckColor='#fff'
                                                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                            />
                                            <Text style={{ color: '#fff', marginTop: 5 }}>Lawyer</Text>
                                        </View>
                                        <View style={styles.client}>
                                            <CheckBox
                                                disabled={false}
                                                value={toggleCheckBox}
                                                onCheckColor='#fff'
                                                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                            />
                                            <Text style={{ color: '#fff', marginTop: 5 }}>
                                                Real Estate Agent
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.contentView}>
                                        <View style={styles.client}>
                                            <CheckBox
                                                disabled={false}
                                                value={toggleCheckBox}
                                                onCheckColor='#fff'
                                                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                            />
                                            <Text style={{ color: '#fff', marginTop: 5 }}>Dentist</Text>
                                        </View>
                                        <View style={styles.client}>
                                            <CheckBox
                                                disabled={false}
                                                value={toggleCheckBox}
                                                onCheckColor='#fff'
                                                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                            />
                                            <Text style={{ color: '#fff', marginTop: 5 }}>
                                                Musician
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.contentView}>
                                        <View style={styles.client}>
                                            <CheckBox
                                                disabled={false}
                                                value={toggleCheckBox}
                                                onCheckColor='#fff'
                                                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                            />
                                            <Text style={{ color: '#fff', marginTop: 5 }}>Teacher</Text>
                                        </View>
                                        <View style={styles.client}>
                                            <CheckBox
                                                disabled={false}
                                                value={toggleCheckBox}
                                                onCheckColor='#fff'
                                                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                            />
                                            <Text style={{ color: '#fff', marginTop: 5 }}>
                                                Doctor
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.contentView}>
                                        <View style={styles.client}>
                                            <CheckBox
                                                disabled={false}
                                                value={toggleCheckBox}
                                                onCheckColor='#fff'
                                                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                            />
                                            <Text style={{ color: '#fff', marginTop: 5 }}>Plumber</Text>
                                        </View>
                                        <View style={styles.client}>
                                            <CheckBox
                                                disabled={false}
                                                value={toggleCheckBox}
                                                onCheckColor='#fff'
                                                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                            />
                                            <Text style={{ color: '#fff', marginTop: 5 }}>
                                                Engineer
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <TouchableOpacity style={styles.btnPrev}
                                            onPress={() => { onPageChange(3) }}
                                        >
                                            <Icon
                                                style={[
                                                    styles.icon,
                                                    {
                                                        color: '#fff',
                                                    },
                                                ]}
                                                name="arrowleft"
                                                size={20}
                                                color="#fff"
                                            />
                                            <Text style={{ color: '#fff' }}>Previous</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.btn} onPress={() => { onPageChange(5) }}>
                                            <Text style={{ color: '#fff', marginLeft: 10 }}>Confirm</Text>

                                            <Icon
                                                style={[
                                                    styles.icon,
                                                    {
                                                        color: '#fff',
                                                    },
                                                ]}
                                                name="arrowright"
                                                size={20}
                                                color="#fff"
                                            />
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </ScrollView>
                        );
                    } else {
                        return (
                            <ScrollView>
                                <View style={styles.subContainer1}>
                                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                        <Icon
                                            style={[
                                                styles.icon,
                                                {
                                                    color: '#2F4050',
                                                    // marginLeft: 10,
                                                    marginRight: 10
                                                },
                                            ]}
                                            name="questioncircleo"
                                            size={30}
                                            color="#fff"
                                        />
                                        <Text style={styles.subHead1}>Are you intrested in any of the below</Text>
                                    </View>

                                    <View style={[styles.contentView,{marginTop:30}]}>
                                        <View style={styles.client1}>
                                            <CheckBox
                                                disabled={false}
                                                value={toggleCheckBox}
                                                onCheckColor='#fff'
                                                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                            />
                                            <Text style={styles.checkText} >

                                                Buy Real Estate</Text>
                                        </View>
                                        <View style={styles.client1}>
                                            <CheckBox
                                                disabled={false}
                                                value={toggleCheckBox}
                                                onCheckColor='#fff'
                                                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                            />
                                            <Text style={styles.checkText}>
                                                Immigration Legal Services
                                            </Text>
                                        </View>

                                    </View>
                                    <View style={styles.contentView}>
                                        <View style={styles.client1}>
                                            <CheckBox
                                                disabled={false}
                                                value={toggleCheckBox}
                                                onCheckColor='#fff'
                                                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                            />
                                            <Text style={styles.checkText}>Buy a Franchise</Text>
                                        </View>
                                        <View style={styles.client1}>
                                            <CheckBox
                                                disabled={false}
                                                value={toggleCheckBox}
                                                onCheckColor='#fff'
                                                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                            />
                                            <Text style={styles.checkText}>
                                                Sell Real Estate
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.contentView}>
                                        <View style={styles.client1}>
                                            <CheckBox
                                                disabled={false}
                                                value={toggleCheckBox}
                                                onCheckColor='#fff'
                                                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                            />
                                            <Text style={styles.checkText}>Real Estate Legal Services or Closings </Text>
                                        </View>
                                        <View style={styles.client1}>
                                            <CheckBox
                                                disabled={false}
                                                value={toggleCheckBox}
                                                onCheckColor='#fff'
                                                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                            />
                                            <Text style={styles.checkText}>
                                                Start a New Business
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.contentView}>
                                        <View style={styles.client1}>
                                            <CheckBox
                                                disabled={false}
                                                value={toggleCheckBox}
                                                onCheckColor='#fff'
                                                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                            />
                                            <Text style={styles.checkText}>Need a Loan or Mortgage</Text>
                                        </View>
                                        <View style={styles.client1}>
                                            <CheckBox
                                                disabled={false}
                                                value={toggleCheckBox}
                                                onCheckColor='#fff'
                                                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                            />
                                            <Text style={styles.checkText}>
                                                Insurance Services
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.contentView}>
                                        <View style={styles.client1}>
                                            <CheckBox
                                                disabled={false}
                                                value={toggleCheckBox}
                                                onCheckColor='#fff'
                                                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                            />
                                            <Text style={styles.checkText}>Invest in Somebody Else's Business</Text>
                                        </View>
                                        <View style={styles.client1}>
                                            <CheckBox
                                                disabled={false}
                                                value={toggleCheckBox}
                                                onCheckColor='#fff'
                                                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                            />
                                            <Text style={styles.checkText}>
                                                Business Legal Services
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.contentView}>
                                        <View style={styles.client1}>
                                            <CheckBox
                                                disabled={false}
                                                value={toggleCheckBox}
                                                onCheckColor='#fff'
                                                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                            />
                                            <Text style={styles.checkText}>Buy an Esisting Business</Text>
                                        </View>
                                        <View style={styles.client1}>
                                            <CheckBox
                                                disabled={false}
                                                value={toggleCheckBox}
                                                onCheckColor='#fff'
                                                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                            />
                                            <Text style={styles.checkText}>
                                                Join the Accounting Industry
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' ,marginTop:40}}>
                                        <TouchableOpacity style={styles.btnPrev}
                                            onPress={() => { onPageChange(4) }}
                                        >

                                            <Icon
                                                style={[
                                                    styles.icon,
                                                    {
                                                        color: '#fff',
                                                    },
                                                ]}
                                                name="arrowleft"
                                                size={20}
                                                color="#fff"
                                            />
                                            <Text style={{ color: '#fff' }}>Previous</Text>

                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.btn}

                                        >
                                            <Text style={{ color: '#fff', marginLeft: 10 }}>Submit</Text>

                                            <Icon
                                                style={[
                                                    styles.icon,
                                                    {
                                                        color: '#fff',
                                                    },
                                                ]}
                                                name="arrowright"
                                                size={20}
                                                color="#fff"
                                            />
                                        </TouchableOpacity>
                                    </View>


                                </View>
                            </ScrollView>
                        );
                    }
                })()}
            </View>
        </View>

    )
}

export default clientSteps

const styles = StyleSheet.create({
    subContainer: {
        backgroundColor: '#fff',
        width: wp(95),
        height: hp(79),
        alignSelf: 'center',
        marginTop: 20,
        alignItems: 'center',
        // height: 250,
        borderRadius: 10,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 3,
        // },
        // shadowOpacity: 0.27,
        // shadowRadius: 4.65,

        // elevation: 6,
    },
    subHead: {
        alignSelf: 'flex-start',
        fontSize: 20,
        // fontWeight: '700',
        marginTop: 5,
        fontFamily:'Poppins-Bold'
    },
    subHead1: {
        alignSelf: 'flex-start',
        fontSize: 17,
        fontWeight: '700',
        marginTop: 5
    },
    subContainer1: {
        // backgroundColor: 'red',
        width: wp(95),
        // height:hp(10),
        alignSelf: 'center',
        marginTop: 10,
        alignItems: 'center',
        // height: 200,
        borderRadius: 10,

    },

    btn: {
        width: wp(28),
        height: hp(7),
        alignSelf: 'flex-end',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 30,
        marginTop: 10,
        backgroundColor: '#8AB645',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        marginRight: 10
    },
    btnPrev: {
        width: wp(28),
        height: hp(7),
        alignSelf: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 30,
        marginTop: 10,
        backgroundColor: '#8AB645',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        marginRight: 80
    },

    input: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        width: wp(80),
        backgroundColor: '#fff',
    },

    contentView: {
        //  backgroundColor: '#fff',
        // marginTop: 10,
        padding: 10,
        flexDirection: 'row',
        // justifyContent:'center',
    },
    client: {
        backgroundColor: '#2596be',
        borderRadius: 25,
        color: '#fff',
        padding: 5,
        width: 130,
        height:hp(6),
        marginRight: 10,
        flexDirection: 'row',
        textAlign:'center',
        paddingTop:10
    },
    client1: {
        // backgroundColor: '#2596be',
        // borderRadius: 20,
        color: '#fff',
        padding: 5,
        width: 130,
        textAlign: 'center',
        marginRight: 30,
        flexDirection: 'row'
    },
    step: {
        marginTop: 40
    },
    checkText: {
        color: '#000', fontFamily: 'Poppins-Light', fontSize: 12
    },
    refContent: {
        marginTop: 20, marginBottom: 20, height: hp(55),
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center'
    }

})