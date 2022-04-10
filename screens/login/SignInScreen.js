import React, { useEffect, useState } from 'react';
import {
    isAndroid,
    isIPhoneNotchFamily,
  } from "@freakycoder/react-native-helpers";
import { Alert, AsyncStorage, AppRegistry, StyleSheet, Dimensions, KeyboardAvoidingView, View, TextInput, Text, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

const logo = require('../login/splash_icon.png');

export default function SignInScreen(props) {
    console.log("IN SIGN IN");
    const [username, updateUsername] = useState([]);
    const [password, updatePassword] = useState([]);
    const [user, updateUser] = useState([]);


    const renderSignUpButtonContainer = () => (
        <View style={styles.signUpButtonContainer}>
          <Text style={[styles.signUpTextStyle]}>
            {"Don't Have An Account ?"}
          </Text>
          <TouchableOpacity
            style={styles.signUpButtonStyle}
            onPress={() => {props.navigation.navigate('Login')}}
          >
            <Text style={[styles.signUpButtonTextStyle]}>
              {'Sign Up'}
            </Text>
          </TouchableOpacity>
        </View>
      );
    
    const handleSignIn = () => {
        console.log(username + " ==== " + password);
            let _data = { 
                login:username,
                password:password
              }
            if (username == null || password == null || username == '' || password == '') {
                Alert.alert('Enter Username or Password');
            }
            else {
                (async () => {
                    let res = await fetch(
                      "https://gt.pario.com.ng/backend/user/is_login", {
                        method: "POST",
                        body: JSON.stringify(_data),
                        headers: {"Content-type": "application/json; charset=UTF-8"}
                      })
                    let response = await res.json();
                    let r = response.data;
                    updateUser(r);
                    if(r.data.code === "99"){
                        Alert.alert(r.data.message);
                    }
                    else {
                        Alert.alert('Login Successful!');
                        AsyncStorage.setItem('@user',JSON.stringify(user)); 
                        props.navigation.navigate('Media');
                    }
                  })();
            }
    }

    return (
        <View>
        <Image
        style={[styles.logo]}
    source={logo}
/>
        
        <KeyboardAvoidingView>

      <ScrollView style={styles.textInputContainer}>          
     <TextInput
        placeholder={'Username'}
        placeholderTextColor={"#6C6D72"}
        style={[styles.textInputStyle]}
        onChangeText={(username) => {updateUsername(username)}}
      />
      <TextInput        
        placeholder={'Password'}
        placeholderTextColor={"#6C6D72"}
        style={[styles.textInputStyle]}
        secureTextEntry
        onChangeText={(password) =>  {updatePassword(password)}}
      />

    <View style={styles.signInButtonContainer}>
      <TouchableOpacity
        style={[styles.signInButtonStyle]}
        onPress={()=>{handleSignIn()}}
      >
        <Text style={[styles.signInButtonTextStyle]}>
          {'Sign In'}
        </Text>
      </TouchableOpacity>
    </View>    
    </ScrollView>
    <View style={styles.signUpButtonContainer}>
          <Text style={[styles.signUpTextStyle]}>
            {"Don't Have An Account ?"}
          </Text>
          <TouchableOpacity
            style={styles.signUpButtonStyle}
            onPress={() => {props.navigation.navigate('Login')}}
          >
            <Text style={[styles.signUpButtonTextStyle]}>
              {'Sign Up'}
            </Text>
          </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
    </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "#181A1F",
    },
    headerContainer: {
      marginTop: 24,
      alignItems: "center",
      justifyContent: "center",
    },
    titleTextStyle: {
      fontSize: 24,
      color: "#fff",
      fontWeight: "600",
    },
    descriptionTextStyle: {
      fontSize: 15,
      color: "#696A6F",
    },
    textInputContainer: {
      marginTop: 32,
      width: width * 0.85,
    },
    textInputStyle: {
      height: isIPhoneNotchFamily() ? 60 : 55,
      marginBottom: 8,
      fontSize: 16,
      paddingLeft: 32,
      backgroundColor: "#262A34",
      color: "#fff",
      borderRadius: isIPhoneNotchFamily() ? 20 : 16,
    },
    signUpButtonContainer: {
      marginTop: isIPhoneNotchFamily()
        ? height * 0.34
        : isAndroid
        ? height * 0.32
        : height * 0.27,
      width: width * 0.9,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    signUpButtonStyle: {
      backgroundColor: "#5467FF",
      width: width * 0.85,
      height: isIPhoneNotchFamily() ? 60 : 55,
      borderRadius: isIPhoneNotchFamily() ? 20 : 16,
      justifyContent: "center",
      alignItems: "center",
    },
    signUpButtonTextStyle: {
      fontSize: 14,
      color: "#fff",
      fontWeight: "600",
    },
    buttonContainer: {
      position: "absolute",
      bottom: 70,
      height: 100,
      alignItems: "center",
      justifyContent: "space-around",
    },
    signInQuestionTextStyle: {
      fontSize: 14,
      color: "#fff",
    },
    signInButtonStyle: {
      height: 40,
      justifyContent: "center",
      marginLeft: 8,
    },
    signInButtonTextStyle: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#519bf4",
    },
    signInButtonContainer: {
      marginTop: 8,
      width: width * 0.9,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 400,
    },
  });
