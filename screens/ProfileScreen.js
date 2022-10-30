import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, StyleSheet, AsyncStorage, Dimensions, TouchableOpacity} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import {
  isAndroid,
  isIPhoneNotchFamily, getStatusBarHeight
} from "@freakycoder/react-native-helpers";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TrackPlayer from 'react-native-track-player';

const logo = require('./login/logo.png');
const { width, height } = Dimensions.get('window');

function ProfileScreen (props) {
  const [name, updateName] = useState('')
  const [email, updateEmail] = useState('')
  const [phone, updatePhone] = useState('')
  const [subStatus, updateSubStatus] = useState('')
  const [subPeriod, updateSubPeriod] = useState('')
  const [subExpiry, updatesubExpiry] = useState('')
  const [uId, updateUId] = useState('')
  const [sType, updateSType] = useState(false)


  useEffect(() => {
    (async () => {
      const namer = await AsyncStorage.getItem('@username');
      const emailr = await AsyncStorage.getItem('@useremail');
      const phoner = await AsyncStorage.getItem('@userphone');
      const status = await AsyncStorage.getItem('@substatus');
      const period = await AsyncStorage.getItem('@subtype');
      const expiry = await AsyncStorage.getItem('@subexpiry');
      const userId = await AsyncStorage.getItem('@userid');
      console.log('Name:  '+namer)
      if(status !== "ACTIVE") updateSType(true);
      updateName(namer);
      updateEmail(emailr);
      updatePhone(phoner);
      updateSubStatus(status);
      updateSubPeriod(period);
      updatesubExpiry(expiry);
      updateUId(userId);
    })();
  }, []);

  const renderSubscriptionContainer = () => (
    <View style={styles.signUpButtonContainer}>
      <TouchableOpacity
        style={styles.signUpButtonStyle}
        onPress={() => {}}
      >
        <Text style={[styles.signUpButtonTextStyle]}>
          {'Add Subscription'}
        </Text>
      </TouchableOpacity>
    </View>
  );


  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image 
            source={logo}
            size={80}
          />
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>{name}</Title>
            <Caption style={styles.caption}>@{name}</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>Nigeria</Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{phone}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{email}</Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>{subStatus} - {subPeriod}</Title>
            <Caption>Subscription Status</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>{subExpiry}</Title>
            <Caption>EXPIRES</Caption>
          </View>
      </View>
      {sType&&<View
          style={{
            // position: "absolute",
            bottom: isIPhoneNotchFamily() ? getStatusBarHeight() : 8,
          }}
        >
          {renderSubscriptionContainer()}
        </View>}
      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {props.navigation.navigate('Fav')}}>
          <View style={styles.menuItem}>
            <Icon name="heart-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Your Favorites</Text>
          </View>
        </TouchableRipple>
        {/* <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="credit-card" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Payment</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() =>{}}>
          <View style={styles.menuItem}>
            <Icon name="share-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Tell Your Friends</Text>
          </View>
        </TouchableRipple> */}
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-settings-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple             
        onPress={() => {
              TrackPlayer.stop()
              AsyncStorage.setItem('@isLoggedIn', '99')
              props.navigation.navigate('Login');//added just for test purpose
            }}>
          <View style={styles.menuItem}>
            <Icon name="power" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Logout</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
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
    color: "#000",
  },
  signUpButtonTextStyle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});