import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, Dimensions } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AwesomeAlert from 'react-native-awesome-alerts';

const { width, height } = Dimensions.get('window');

function PodcastList(props) {
  const [show, updateShow] = useState(false);
  const [successText, updateSuccessText] = useState("FEATURE COMING SOON!");

  useEffect(() => {
      updateShow(true)    
  }, []);

  const handleClose = () => {
    props.navigation.goBack();
  }


  return (
    <View style={styles.container}>
      {show&&
      <View pointerEvents="none" style={styles.activitySpinner}>
        <AwesomeAlert
          show={show}
          showProgress={false}
          title=""
          message={successText}
          closeOnHardwareBackPress={true}
          showConfirmButton={true}
          confirmText="Close"
          confirmButtonColor="#63A3F4"
          onConfirmPressed={() => handleClose()}
        />
      </View>
}
      <View style={styles.icon}>
        <Ionicons
          name="arrow-back"
          size={height / 30}
          color='black'
          onPress={() => props.navigation.goBack()}
        />
      </View>
      <View style={styles.imageRow}>
        <Image
          source={require("./assets/logo.jpg")}
          resizeMode="contain"
          style={styles.image}
        ></Image>
        <View style={styles.loremIpsumColumn}>
          <Text style={styles.loremIpsum}>Monday Morning Musing</Text>
          <Text style={styles.authorSomeone}>By: Richard Omidiwura</Text>
        </View>
      </View>

      <View style={styles.imageRow}>
        <Image
          source={require("./assets/logo.jpg")}
          resizeMode="contain"
          style={styles.image}
        ></Image>
        <View style={styles.loremIpsumColumn}>
          <Text style={styles.loremIpsum}>Throne of Grace</Text>
          <Text style={styles.authorSomeone}>By: Gabriel Akinbola</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: 62,
    height: 56,
    marginTop: 4
  },
  loremIpsum: {
    fontFamily: "calibri-regular",
    color: "#121212",
    textAlign: "left",
    fontSize: 20
  },
  authorSomeone: {
    fontFamily: "calibri-regular",
    color: "#121212",
    marginTop: 1,
    marginLeft: 3,
    fontSize: 13
  },
  uploadDate: {
    fontFamily: "calibri-regular",
    color: "#121212",
    marginTop: 2,
    marginLeft: 3
  },
  loremIpsumColumn: {
    width: 245,
    marginLeft: 9
  },
  imageRow: {
    height: 61,
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 26,
    marginRight: 33,
  },
  icon: {
    padding: height / 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default PodcastList;
