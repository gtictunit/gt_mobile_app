import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";

function PodcastList(props) {
  return (
    <View style={styles.container}>
      <View style={styles.imageRow}>
        <Image
          source={require("./assets/logo.jpg")}
          resizeMode="contain"
          style={styles.image}
        ></Image>
        <View style={styles.loremIpsumColumn}>
          <Text style={styles.loremIpsum}>This is the podcast description</Text>
          <Text style={styles.authorSomeone}>Author: Someone</Text>
          <Text style={styles.uploadDate}>Upload Date</Text>
        </View>
      </View>

      <View style={styles.imageRow}>
        <Image
          source={require("./assets/logo.jpg")}
          resizeMode="contain"
          style={styles.image}
        ></Image>
        <View style={styles.loremIpsumColumn}>
          <Text style={styles.loremIpsum}>This is the podcast description</Text>
          <Text style={styles.authorSomeone}>Author: Someone</Text>
          <Text style={styles.uploadDate}>Upload Date</Text>
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
    marginLeft: 3
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
    marginRight: 33
  },
  image1: {
    width: 62,
    height: 56,
    marginTop: 4
  },
  loremIpsum1: {
    fontFamily: "calibri-regular",
    color: "#121212",
    textAlign: "left",
    fontSize: 20
  },
  authorSomeone1: {
    fontFamily: "calibri-regular",
    color: "#121212",
    marginTop: 1,
    marginLeft: 3
  },
  uploadDate1: {
    fontFamily: "calibri-regular",
    color: "#121212",
    marginTop: 2,
    marginLeft: 3
  },
  loremIpsum1Column: {
    width: 245,
    marginLeft: 9
  },
  image1Row: {
    height: 61,
    flexDirection: "row",
    marginTop: 19,
    marginLeft: 26,
    marginRight: 33
  }
});

export default PodcastList;
