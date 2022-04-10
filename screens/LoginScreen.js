import React, { useEffect, useState } from 'react';
import { Alert, AsyncStorage, AppRegistry, StyleSheet, Dimensions, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import SignInScreen from './login/SignInScreen';
import SignUpScreen from './login/SignUpScreen';
import {
  isAndroid,
  isIPhoneNotchFamily,
} from "@freakycoder/react-native-helpers";

const {width, height} = Dimensions.get('window');

export default function LoginScreen(props) {
    console.log("IN LOGIN");    
    const isLoggedIn = AsyncStorage.getItem('@isLoggedin');
    console.log("IS LOGGED IN "+ isLoggedIn);
    const [newAccount, setNewAccount] = useState(props.newAccount&&false);

    const renderScreenChange = () => {
      if (!newAccount) {
        return (
          <View style={styles.screenContainer}>
          <SignInScreen />
          </View>
        );
      } else {
        return (
          <View style={styles.screenContainer}>
            <SignUpScreen />
          </View>
        );
      }
    };

    return (
<View style={styles.mainContainer}>{renderScreenChange()}
</View>
      );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#181A1F",
  },
});
