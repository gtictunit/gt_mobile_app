import React, { useEffect, useState } from 'react';
import { Alert, AsyncStorage, AppRegistry, StyleSheet, Dimensions, View, ActivityIndicator } from 'react-native';
import SignInScreen from './login/SignInScreen';
import SignUpScreen from './login/SignUpScreen';
import { WEB_URL } from '../constant/urls';
import AwesomeAlert from 'react-native-awesome-alerts';



const { width, height } = Dimensions.get('window');
const logo = require('./login/logo.png');
export default function LoginScreen(props) {
  // console.log("IN LOGIN");
  const isLoggedIn = AsyncStorage.getItem('@isLoggedin');
  // console.log("IS LOGGED IN " + isLoggedIn);
  const [newAccount, updateNewAccount] = useState(false);
  const [activitySpin, updateActivitySpin] = useState(false);
  const [enabled, updateEnabled] = useState(true);
  const [show, updateShow] = useState(false);
  const [successText, updateSuccessText] = useState("You have logged in successfully!");
  const [success, updateSuccess] = useState("success");
  const [user, updateUser] = useState([]);
  const [username, updateUsername] = useState([]);
  const [password, updatePassword] = useState([]);
  const [fullname, updateFullname] = useState([]);
  const [email, updateEmail] = useState([]);
  const [phone, updatePhone] = useState([]);

  useEffect(() => {
    (async () => {
      let code = AsyncStorage.getItem('@isLoggedin');
      if (code == '00') {
        props.navigation.navigate('Media');
      }
    })();
  }, []);

  const handleClose = () => {
    updateShow(false);
  }

  const handleSignIn = () => {
    updateActivitySpin(true);
    updateEnabled(false);
    let _data = {
      login: username,
      password: password
    }
    if (username == null || password == null || username == '' || password == '') {
      updateActivitySpin(false);
      updateSuccessText('Enter Username or Password');
      updateSuccess('info');
      updateShow(true);
    }
    else {
      (async () => {
        let res = await fetch(
          WEB_URL + "/user/is_login", {
          method: "POST",
          body: JSON.stringify(_data),
          headers: { "Content-type": "application/json; charset=UTF-8" }
        }).catch((error) => {
          updateSuccessText('Failed to Connect to network. Please check your connection and try again!')
          updateSuccess('info');
          updateShow(true);
          updateActivitySpin(false);
          updateEnabled(true);
          updateUsername('');
          updatePassword('');
          console.error(error);
        });
        let response = await res.json();
        let r = response.user;
        updateUser(r);
        if (response.code === "99") {
          updateSuccessText(response.message);
          updateActivitySpin(false);
        }
        else {
          updateSuccessText('Login Successful!');
          updateSuccess('success');
          updateShow(true);
          AsyncStorage.setItem('@isLoggedIn', r.code);
          AsyncStorage.setItem('@user', JSON.stringify(r));
          AsyncStorage.setItem('@username', r.full_name);
          updateActivitySpin(false);
          updateEnabled(true);
          updateUsername('');
          updatePassword('');
          props.navigation.navigate('Media');
        }
      })();
    }
  }

  const handleSignUp = () => {
    console.log(email + " ==== " + fullname);
    updateActivitySpin(true);
    let _data = {
      email: email,
      full_name: fullname,
      login: username,
      phone: phone,
      password: password
    }
    if (username == null || password == null || username == '' || password == '' ||
      phone == null || email == null || email == '' || phone == '' ||
      fullname == null || fullname == ''
    ) {
      updateSuccessText('Enter All Fields');
      updateSuccess('info');
      updateShow(true);
    }
    console.log("DATA  ==== " + JSON.stringify(_data));
    (async () => {
      let res = await fetch(
        WEB_URL + "/user/create_new_user", {
        method: "POST",
        body: JSON.stringify(_data),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      })
      let response = await res.json();
      let r = response;
      // console.log("REG RESPONSE  ==== " + JSON.stringify(r));
      if (r.code === "99") {
        Alert.alert(r.message);
      }
      else {
        updateSuccessText('Registration Successful: ' + r.message);
        updateSuccess('info');
        updateShow(true);
        updateActivitySpin(false);
        updateEnabled(true)
        updateNewAccount(false);
      }
    })();
  }

  const renderScreenChange = () => {
    let code = AsyncStorage.getItem('@isLoggedin');
    if (code == '00') {
      props.navigation.navigate('Media');
    }
    else {
      if (!newAccount) {
        return (
          <SignInScreen
            usernameChangeText={(username) => updateUsername(username)}
            passwordChangeText={(password) => updatePassword(password)}
            handleSignInButton={() => handleSignIn()}
            handleSignUp={() => updateNewAccount(true)}
            enabled={enabled}
          />
        );
      } else {
        return (
          <SignUpScreen
            fullNameOnChange={(fullname) => updateFullname(fullname)}
            emailOnChange={(email) => updateEmail(email)}
            phoneOnChange={(phone) => updatePhone(phone)}
            usernameOnChange={(username) => updateUsername(username)}
            signUpPasswordChangeText={(password) => updatePassword(password)}
            handleSignIn={() => updateNewAccount(false)}
            handleSignUpButton={() => handleSignUp()}
          />
        );
      }
    }
  };

  return (
    <View style={styles.mainContainer}>
      {renderScreenChange()}
      {activitySpin &&
        <View pointerEvents="none" style={styles.activitySpinner}>
          <ActivityIndicator animating={activitySpin} size="large" color="#00ff00" />
        </View>
      }
      {show &&
        <View pointerEvents="none" style={styles.activitySpinner}>
        <AwesomeAlert
          show={show}
          showProgress={false}
          title=""
          message={successText}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showConfirmButton={true}
          confirmText="Close"
          confirmButtonColor="#00ff00"
          onConfirmPressed= {() => handleClose()}
        />
        </View>
      }
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
  activitySpinner: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
    backgroundColor: 'black',
  },
});
