import React,{useEffect, useState} from 'react';
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

let TouchableCmp = TouchableOpacity;

if (Platform.OS === 'android' && Platform.Version >= 21) {
  TouchableCmp = TouchableNativeFeedback; //diff for both ios and android
}

const PostGrid = (props) => {
  return (
    <View style={styles.grid}>
      <TouchableCmp onPress={props.onSelect}>
        <ImageBackground
          source={props.imageUrl}
          style={{height: '100%', width: '100%'}}>
        </ImageBackground>
      </TouchableCmp>
    </View>
  )
  
}

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    // flexDirection: "row",
    // flexWrap: "wrap",
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    height: height / 3.4,
    overflow: 'hidden',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: height / 75,
  },
  heading: {
    color: 'black',
    fontSize: height / 30,
    textAlign: 'right',
    paddingTop: 120,
    fontWeight: 'bold',
  },
  title: {
    color: 'blue',
    fontSize: height / 43,
    textAlign: 'right',
    // paddingTop: 1 ,
    fontWeight: 'bold',
  },
});

export default PostGrid;
