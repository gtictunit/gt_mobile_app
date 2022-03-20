import React, { useEffect, useState } from 'react';
import { Alert, AsyncStorage, AppRegistry } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import DarkLoginScreen from "react-native-dark-login-screen";

export default function LoginScreen(props) {
    console.log("IN LOGIN");
    const isLoggedIn = AsyncStorage.getItem('@isLoggedin');
    console.log("IS LOGGED IN "+ isLoggedIn);
        // if (!isLoggedIn) {
            // }
    const [username, updateUsername] = useState([]);
    const [password, updatePassword] = useState([]);

    const handleSignIn = () => {
        console.log(username + " ==== " + password);
        // const isLoggedIn = AsyncStorage.getItem('isLoggedin');
        // if (!isLoggedIn) {
            if (username == null || password == null || username == '') {
                Alert.alert('Enter Username or Password');
            }
            else {
                AsyncStorage.setItem('@isLoggedin', true);
                props.navigation.navigate('Media');
            }
        // }
        // else{
        //     props.navigation.navigate('Media');
        // }
    }


    return (
        <DarkLoginScreen
            handleSignInButton={() => { handleSignIn() }}
            handleGoogleLogIn={() => { }}
            handleFacebookLogIn={() => { }}
            handleSignUpButton={() => { }}
            enableForgotPassword={true}
            enableAppleLogin={false}
            usernameChangeText={(username) => { updateUsername(username) }}
            passwordChangeText={(password) => { updatePassword(password) }}
            titleText={'Shalom!'}
        />
    );

}