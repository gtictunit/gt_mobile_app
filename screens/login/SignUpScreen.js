import React, { useEffect, useState } from 'react';
import { Alert, AsyncStorage, AppRegistry, StyleSheet, KeyboardAvoidingView , Dimensions, View, TextInput, Text  } from 'react-native';
import {
    isAndroid,
    isIPhoneNotchFamily,
  } from "@freakycoder/react-native-helpers";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

export default function SignUpScreen(props) {
    console.log("IN LOGIN");
    const [username, updateUsername] = useState([]);
    const [password, updatePassword] = useState([]);
    const [fullname, updateFullname] = useState([]);
    const [email, updateEmail] = useState([]);
    const [phone, updatePhone] = useState([]);
    const [user, updateUser] = useState([])

    const renderSignUpButtonContainer = () => (
        <View style={styles.signUpButtonContainer}>
          <Text style={[styles.signUpTextStyle]}>
            {"Have An Accout ?"}
          </Text>
          <TouchableOpacity
            style={styles.signUpButtonStyle}
            onPress={() => {props.navigation.navigate('Login', {newAccount:false})}}
          >
            <Text style={[styles.signUpButtonTextStyle]}>
              {'Sign In'}
            </Text>
          </TouchableOpacity>
        </View>
      );
    
    const handleSignUp = () => {
        console.log(email + " ==== " + fullname);
        let _data = {
            email: email,
            full_name: fullname, 
            login:username,
            phone:phone,
            password:password
          }
          console.log("DATA  ==== " + JSON.stringify(_data));
        (async () => {
            let res = await fetch(
              "https://gt.pario.com.ng/backend/user/create_new_user", {
                method: "POST",
                body: JSON.stringify(_data),
                headers: {"Content-type": "application/json; charset=UTF-8"}
              })
            let response = await res.json();
            let r = response.data;
            if(r.data.code === "99"){
                Alert.alert('Error in Registration! \n Please try again later');
            }
            else {
                Alert.alert('Registration Successful!');
                props.navigation.navigate('Login');
            }
          })();
    }


    return (
        <KeyboardAvoidingView>
      <ScrollView style={styles.textInputContainer}>
      <TextInput        
        placeholder={"Full Name"}
        placeholderTextColor={"#6C6D72"}
        style={[styles.textInputStyle]}
        onChangeText={(fullname) => {updateFullname(fullname)}}
      />
      <TextInput        
        placeholder={'Email'}
        placeholderTextColor={"#6C6D72"}
        style={[styles.textInputStyle]}
        onChangeText={(email) => {updateEmail(email)}}
      />
            <TextInput        
        placeholder={'Phone Number'}
        placeholderTextColor={"#6C6D72"}
        style={[styles.textInputStyle]}
        onChangeText={(phone) => {updatePhone(phone)}}
      />
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

    <View style={styles.signUpButtonContainer}>
      <TouchableOpacity
        style={[styles.signUpButtonStyle]}
        onPress={()=>{handleSignUp()}}
      >
        <Text style={[styles.signUpButtonTextStyle]}>
          {'Sign Up'}
        </Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
    {renderSignUpButtonContainer}
    </KeyboardAvoidingView>
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
  });
