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


const CarouselImg = (props) => {
  return (
    <View style={styles.grid}>
        <ImageBackground
          source={{uri: props.imageUrl}}
          style={{height: '100%', width: '100%'}}>
          <View style={{...styles.container, ...props.image}}>
          </View>
        </ImageBackground>
    </View>
  )
  
}

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    margin: 5,
    height: height / 3,
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

export default CarouselImg;
