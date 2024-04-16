import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { ActivityIndicator, Dimensions, Image, View } from 'react-native';
// const CustomIndicator=()=>{
//     return(
//         <View style={{padding:10,}}>
//             <Image

//                 source={require('../../images/GIF-image-2.gif')}

//             />
//         </View>

//     )
// }
export const Loader = props => {
  return (
    <Spinner
      visible={props.flag}
    //  textContent={'Loading...'}
    //textStyle={styles.spinnerTextStyle}
    //  customIndicator={<CustomIndicator/>}
    />
  );
};
