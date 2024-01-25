import {
  Image,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Platform,
} from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import HomeScreen from '../screens/Home';
import ClientInfo from '../screens/ClientInfo';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { enableScreens } from 'react-native-screens';
import Splash from '../screens/Splash';
import Drawer from './Drawer';
import Request from '../screens/Request';
import MyInfo from '../screens/MyInfo';
import Payments from '../screens/Payments';
import ClientDetails from '../screens/ClientDetails';
import CreateNewAction from '../screens/CreateNewAction';
import FileCabinet from '../screens/FileCabinet';
import Manager from '../screens/Manager';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomHeader from '../Component/CustomHeader';
import { Color } from '../Style';
import { Provider } from 'react-redux';
import store from '../Redux/Store/index';
import Login from '../screens/Login';
import ContactUs from '../screens/ContactUs';
import ViewOrder from '../screens/ViewOrder';
import InvoiceView from '../screens/InvoiceView';
import ViewRequest from '../screens/ViewRequest';
import SplashScreen from '../screens/SplashScreen';
import InvoiceDetails from '../screens/InvoiceDetails';
import MainClientDetails from '../screens/MainClientDetail';
import ClientSteps from '../screens/ClientSteps'; 
import Paypal from '../screens/Paypal';


enableScreens();

// const SignStack = createStackNavigator();

// function SignInScreen() {
//   return (
//     <SignStack.Navigator
//     //  initialRouteName='AuthCheck'
//     >
//       <Stack.Screen
//         name="SplashScreen"
//         component={Splash}
//         options={{
//           headerShown: false,
//         }}
//       />
//       <Stack.Screen
//         name="HomeScreen"
//         component={HomeScreen}
//         options={{
//           title: 'Chats',
//           headerShown: false,
//           headerStyle: {
//             backgroundColor: '#e85b3d',
//           },

//           headerTintColor: '#fff',
//           headerTitleAlign: 'center',
//           headerTitleStyle: {
//             fontWeight: 'bold',
//           },
//         }}
//       />
//       <Stack.Screen
//         name="ClientInfo"
//         component={ClientInfo}
//         options={{
//           title: 'YourProfle',

//           headerStyle: {
//             backgroundColor: '#e85b3d',
//           },

//           headerShown: false,
//           headerTintColor: '#fff',
//           headerTitleAlign: 'center',
//           headerTitleStyle: {
//             fontWeight: 'bold',
//           },
//         }}
//       />
//     </SignStack.Navigator>
//   );
// }

const Drawer3 = createDrawerNavigator();

function MyDrawer3({ navigation, route }) {
  return (
    <Drawer3.Navigator
      defaultStatus="closed"
      screenOptions={{
        //  drawerPosition: 'left',
        headerShown: false,
        // drawerActiveBackgroundColor: '#FAFAFC',
      }}
      //initialRouteName="Home"
      drawerContent={props => <Drawer {...props} />}>
      <Drawer3.Screen
        navigation={navigation}
        name="Home"
        component={MainNavigation1}
      />
      <Drawer3.Screen
        navigation={navigation}
        name="PaymentsContain"
        component={PaymentScreenStack}
        initialParams={{ screen: 'Payments' }}
        

      />
      <Drawer3.Screen
        navigation={navigation}
        name="MyInfo"
        component={MyInfo}
      />
      {/* <Drawer3.Screen
        navigation={navigation}
        name="FileCabinet"
        component={FileCabinet}
      /> */}
      <Drawer3.Screen
        navigation={navigation}
        name="Manager"
        component={Manager}
        
      />
      {/* <Drawer.Screen name="Home2" component={MainNavigation2} /> */}

      {/* <Drawer.Screen name="Home" component={MainNavigation1} /> */}
    </Drawer3.Navigator>
  );
}

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        // position:'absolute',
        bottom: 0,
        alignSelf: 'center',
       
        borderTopColor: '#E5E5E5',
        borderTopWidth: 1,
        width: wp(112),
        //   justifyContent: 'space-between',
        backgroundColor: Color.darkGreen,
        height: 80,
        color: '#fff',
        paddingHorizontal: 22
      }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;
        let showlabel = '';
        let iconNm = '';

        if (label == 'Dashboard') {
          showlabel = 'Home';
          // iconNm = require('../Assets/img/icons/home.png');

          {
            isFocused
              ? (iconNm = require('../Assets/img/icons/home-green.png'))
              : (iconNm = require('../Assets/img/icons/home.png'));
          }
        }

        if (label == 'ClientInfo') {
          showlabel = 'Clients';
          // iconNm = require('../Assets/img/icons/group.png');

          {
            isFocused
              ? (iconNm = require('../Assets/img/icons/group-green.png'))
              : (iconNm = require('../Assets/img/icons/group.png'));
          }
        }

        if (label == 'FileCabinet') {
          showlabel = 'File Cabinet';
          // iconNm = require('../Assets/img/icons/profile-user.png');
          {
            isFocused
              ? (iconNm = require('../Assets/img/icons/files-green.png'))
              : (iconNm = require('../Assets/img/icons/files-white.png'));
          }
        }
        if (label == 'Requests') {
          showlabel = 'Requests';
          // iconNm = require('../Assets/img/icons/profile-user.png');

          {
            isFocused
              ? (iconNm = require('../Assets/img/icons/product-request-green.png'))
              // : (iconNm = require('../Assets/img/icons/dots-white.png'));
              : (iconNm = require('../Assets/img/icons/product-request.png'));

          }
        }
       

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, justifyContent: 'center' }}
            key={route.key}>
            {/* <Icon size={24} name={iconNm} color={isFocused ? '#FFFFFF' : '#d3d3d3'} />  */}
            <View
              style={{
                // flexDirection: 'row',
                padding: 8,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Image source={iconNm} style={{ width: 25, height: 25 }} />

              <Text
                style={{
                  alignSelf: 'center',
                  color: isFocused ? Color.geen : Color.white,
                  // borderBottomWidth: 2,
                  // borderBottomColor: isFocused ? Color.geen : Color.white,
                  paddingBottom: 5,
                  fontSize: 10,
                  fontWeight: 'bold',
                }}>
                {showlabel}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MainNavigation1() {
  return (
    <Tab.Navigator
      // activeColor="#2F4050"
      // inactiveColor="#3e2465"
      options={{
        headerShown: false,
      }}
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        name="Dashboard"
        component={HomeScreenStack}
        initialParams={{ screen: 'HomeScreen' }}
        options={{
          header: () => <CustomHeader />, // Include the custom header
        }}
      />

      <Tab.Screen
        name="ClientInfo"
        component={ClientScreenStack}
        initialParams={{ screen: 'ClientHome' }}
        options={{
          header: () => <CustomHeader />, // Include the custom header
        }}
      />
      <Tab.Screen
        name="FileCabinet"
        component={FileCabinet}
        options={{
          header: () => <CustomHeader />, // Include the custom header
        }}
      />
      <Tab.Screen
        name="Requests"
        component={RequestScreenStack}
        initialParams={{ screen: 'Request' }}
        options={{
          header: () => <CustomHeader />, // Include the custom header
        }}
      />
    </Tab.Navigator>
  );
}

const SignStack = createStackNavigator();

function SignInScreen() {
  return (
    <SignStack.Navigator
    //  initialRouteName='AuthCheck'
    >
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />


    </SignStack.Navigator>
  );
}

const HomeStack = createStackNavigator();

function HomeScreenStack() {
  return (
    <HomeStack.Navigator
    //  initialRouteName='AuthCheck'
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ContactUs"
        component={ContactUs}
        options={{
          headerShown: false,
        }}
      />

<Stack.Screen
        name="ClientSteps"
        component={ClientSteps}
        options={{
          headerShown: false,
        }}
  />
      <Stack.Screen
        name="MyInfo"
        component={MyInfo}
        options={{
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
}

const ClientStack = createStackNavigator();

function ClientScreenStack() {
  return (
    <ClientStack.Navigator
    //  initialRouteName='AuthCheck'
    >
      <Stack.Screen
        name="ClientHome"
        component={ClientInfo}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ClientDetails"
        component={ClientDetails}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="MainClientDetails"
        component={MainClientDetails}
        options={{
          headerShown: false,
        }}
      />


    </ClientStack.Navigator>
  );
}

const RequestStack = createStackNavigator();

function RequestScreenStack() {
  return (
    <RequestStack.Navigator
    //  initialRouteName='AuthCheck'
    >
      <Stack.Screen
        name="Request"
        component={Request}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateNewAction"
        component={CreateNewAction}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ContactUs"
        component={ContactUs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ViewRequest"
        component={ViewRequest}
        options={{
          headerShown: false,
        }}
      />

    </RequestStack.Navigator>
  );
}
const PaymentStack = createStackNavigator();

function PaymentScreenStack() {
  return (
    <PaymentStack.Navigator
    //  initialRouteName='AuthCheck'
    >
      <Stack.Screen
        name="Payments"
        component={Payments}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="InvoiceView"
        component={InvoiceView}
        options={{
          header: () => <CustomHeader />, // Include the custom header
        }}
      />
       <Stack.Screen
        name="Paypal"
        component={Paypal}
        // options={{
        //   header: () => <CustomHeader />, // Include the custom header
        // }}
      />
      <Stack.Screen
        name="ViewOrder"
        component={ViewOrder}
        options={{
          header: () => <CustomHeader />, // Include the custom header
        }}
      />
      <Stack.Screen
        name="InvoiceDetails"
        component={InvoiceDetails}
        options={{
          header: () => <CustomHeader />, // Include the custom header
        }}
      />


    </PaymentStack.Navigator>
  );
}


const Stack = createNativeStackNavigator();

function MainNavigation() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="home" component={SignInScreen} />
          <Stack.Screen name="Auth" component={MyDrawer3} />
          <Stack.Screen name="ClientSetup" component={ClientSteps} />
          {/* <Stack.Screen name="home" component={MyDrawer2} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
export default MainNavigation;
