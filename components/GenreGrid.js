import React,{useEffect, useState} from 'react';
import Axios from 'axios';
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

const GenreGrid = (props) => {
  return (
    <View style={styles.grid}>
      <TouchableCmp onPress={props.onSelect}>
        <ImageBackground
          source={{uri: props.imageUrl}}
          style={{height: '100%', width: '100%'}}>
        </ImageBackground>
      </TouchableCmp>
    </View>
  )
  
}

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    margin: 5,
    height: height / 7,
    borderBottomEndRadius: height / 25,
    /* borderColor: 'grey',
    borderWidth: 1, */
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: height / 75,
  },
  title: {
    color: 'white',
    fontSize: height / 41.6,
    textAlign: 'right',
  },
});

export default GenreGrid;
