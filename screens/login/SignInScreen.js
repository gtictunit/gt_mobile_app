import React, { useEffect, useState } from 'react';
import {
  isAndroid,
  isIPhoneNotchFamily, getStatusBarHeight
} from "@freakycoder/react-native-helpers";
import { Alert, AsyncStorage, AppRegistry, StyleSheet, Dimensions, KeyboardAvoidingView, SafeAreaView, View, TextInput, Text, Image } from 'react-native';
import { ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const logo = require('../login/logo.png');

export default function SignInScreen(props) {
  // console.log("IN SIGN IN");

  const renderHeaderTextContainer = () => (
    <View style={styles.headerContainer}>
      <Image style={styles.logoImageStyle} source={logo}/>
      <Text style={[styles.titleTextStyle]}>Welcome!</Text>
      <View style={styles.descriptionContainer}>
        <Text style={[styles.descriptionTextStyle]}>
          {"Glory Tabernacle Mobile Streaming App"}
        </Text>
      </View>
    </View>
  );

  const renderInputContainer = () => (
    <View style={styles.textInputContainer}>
      <TextInput
        placeholder="Username"
        placeholderTextColor="#6C6D72"
        style={[styles.textInputStyle]}
        onChangeText={props.usernameChangeText}
        // editable={props.enabled}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#6C6D72"
        style={[styles.textInputStyle]}
        secureTextEntry
        onChangeText={props.passwordChangeText}
        // editable={props.enabled}
      />
      <TouchableOpacity
        style={styles.forgotButtonStyle}
        onPress={props.handleForgotPassword}
      >
        <Text
          style={[styles.forgotPasswordTextStyle]}
        >
          {"Forgot Password"}

        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.signInButtonStyle]}
        onPress={props.handleSignInButton}
      >
        <Text style={[styles.signInButtonTextStyle]}>
          {"Sign In"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderSignUpButtonContainer = () => (
    <View style={styles.signUpButtonContainer}>
      <Text style={[styles.signUpTextStyle]}>
        {"Don't Have An Account ?"}
      </Text>
      <TouchableOpacity
        style={styles.signUpButtonStyle}
        onPress={props.handleSignUp}
      >
        <Text style={[styles.signUpButtonTextStyle]}>
          {'Sign Up'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.newAccountContainer}>
      <ScrollView>
      <KeyboardAvoidingView
        enabled
        behavior="padding"
        style={styles.keyboardAvoidingViewStyle}
      >
        <SafeAreaView
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          {renderHeaderTextContainer()}
          {renderInputContainer()}
        </SafeAreaView>
        <View
          style={{
            // position: "absolute",
            bottom: isIPhoneNotchFamily() ? getStatusBarHeight() : 8,
          }}
        >
          {renderSignUpButtonContainer()}
        </View>
      </KeyboardAvoidingView>
      </ScrollView>
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
    backgroundColor: "#181A1F",
    alignItems: "center",
    flex: 1,
  },
  headerContainer: {
    marginTop: 16,
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
    marginTop: 24,
    justifyContent: "center",
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
  forgotPasswordTextStyle: {
    color: "#6C6D72",
  },
  forgotButtonStyle: {
    height: 30,
    justifyContent: "center",
    marginLeft: "auto",
  },
  signInButtonStyle: {
    marginTop: 24,
    backgroundColor: "#5467FF",
    width: width * 0.85,
    height: isIPhoneNotchFamily() ? 60 : 55,
    borderRadius: isIPhoneNotchFamily() ? 20 : 16,
    justifyContent: "center",
    alignItems: "center",
  },
  signInButtonTextStyle: {
    color: "#fff",
    fontWeight: "600",
  },
  logoImageStyle: {
    // width: 80,
    // height: 80,
    marginBottom: 30,
  },
  googleButtonStyle: {
    backgroundColor: "#FFFFFF",
    width: width * 0.85,
    height: isIPhoneNotchFamily() ? 60 : 55,
    marginTop: 8,
    borderRadius: isIPhoneNotchFamily() ? 20 : 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  googleButtonTextStyle: {
    color: "#181A1F",
    fontWeight: "600",
  },
  facebookButtonStyle: {
    backgroundColor: "#3A579B",
    width: width * 0.85,
    height: isIPhoneNotchFamily() ? 60 : 55,
    marginTop: 8,
    borderRadius: isIPhoneNotchFamily() ? 20 : 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  facebookButtonTextStyle: {
    color: "#FFF",
    fontWeight: "600",
  },
  signUpButtonContainer: {
    marginTop: 8,
    width: width * 0.9,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  signUpButtonStyle: {
    height: 40,
    justifyContent: "center",
    marginLeft: 8,
  },
  signUpTextStyle: {
    fontSize: 14,
    color: "#fff",
  },
  signUpButtonTextStyle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#519bf4",
  },
  appleButtonStyle: {
    backgroundColor: "#FFFFFF",
    width: width * 0.85,
    height: isIPhoneNotchFamily() ? 60 : 55,
    marginTop: 8,
    borderRadius: isIPhoneNotchFamily() ? 20 : 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  appleButtonTextStyle: {
    color: "#181A1F",
    fontWeight: "600",
  },
  newAccountContainer: {
    flex: 1,
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  keyboardAvoidingViewStyle: {
    flex: 1,
  },
  descriptionContainer: {
    marginTop: 16,
  },
});
