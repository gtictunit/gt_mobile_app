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
    const [fullname, updateFullname] = useState([]);
    const [email, updateEmail] = useState([]);
    const [phone, updatePhone] = useState([]);
    const [signUpPassword, updateSignUpPassword] = useState([]);
    const [user, updateUser] = useState([])

    const handleSignIn = () => {
        console.log(username + " ==== " + password);
        // const isLoggedIn = AsyncStorage.getItem('@isLoggedin');
        // if (!isLoggedIn) {
            if (username == null || password == null || username == '') {
                Alert.alert('Enter Username or Password');
            }
            else {
                AsyncStorage.setItem('@isLoggedin', 'true');
                AsyncStorage.setItem('@username', username);
                props.navigation.navigate('Media');
            }
        // }
        // else{
        //     props.navigation.navigate('Media');
        // }
    }

    const handleSignUp = () => {
        console.log(email + " ==== " + fullname);
        let _data = {
            email: email,
            full_name: fullname, 
            login:username,
            phone:phone,
            password:signUpPassword
          }
          
        (async () => {
            let res = await fetch(
              "https://gt.pario.com.ng/backend/user/create_new_user", {
                method: "POST",
                body: JSON.stringify(_data),
                headers: {"Content-type": "application/json; charset=UTF-8"}
              })
            let response = await res.json();
            let r = response.data;
            updateUser(r);
            AsyncStorage.setItem('@user',user); 
            props.navigation.navigate('Login');
          })();
    }


    return (
        <DarkLoginScreen
            handleSignInButton={() => { handleSignIn() }}
            handleGoogleLogIn={() => { }}
            handleFacebookLogIn={() => { }}
            handleSignUpButton={() => { handleSignUp }}
            enableForgotPassword={true}
            enableAppleLogin={false}
            usernameChangeText={(username) => { updateUsername(username) }}
            passwordChangeText={(password) => { updatePassword(password) }}
            titleText={'Shalom!'}
            emailOnChange = {(email) => { updateEmail(email) }}
            fullNameOnChange = {(fullname) => { updateFullname(fullname) }}
            userNameOnChange = {(username) => { updateUsername(username) }}
            phoneNameOnChange = {(phone) => { updatePhone(phone) }}
            singUpPasswordChangeText = {(signUpPassword) => { updateSignUpPassword(signUpPassword) }}
        />
    );

}