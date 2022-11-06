import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';

import TrackPlayer, { useProgress } from 'react-native-track-player';

import Colors from '../components/Colors';

const { width, height } = Dimensions.get('window');

const PodcastSlider = (props) => {
    const { position, duration } = useProgress(); //destructuring to get the position and duration

    const formatTime = (secs) => {
        let minutes = Math.floor(secs / 60);//returns 2 for 2.4
        let seconds = Math.ceil(secs - minutes * 60);//returns 2 for 1.4

        if (seconds < 10) seconds = `0${seconds}`; //to get the format 0: "05"

        return `${minutes}:${seconds}`; //using back ticks to dynamically inject the time
    };

    const changeSlider = (val) => {
        console.log(val);
        TrackPlayer.seekTo(val);//seeks to a specified time position in secs
    };

    return (
        <View style={styles.slider_view}>
            <Text style={styles.slider_time}> {formatTime(position)} </Text>
            <Slider
                style={styles.slider_style}
                minimumValue={0}
                maximumValue={duration}
                value={position}
                minimumTrackTintColor="#e75480"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="#e75480"
                onSlidingComplete={changeSlider}
            />
            <Text style={styles.slider_time}>{formatTime(duration)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    slider_view: {
        height: "10%",
        width: "100%",
        alignItems: "center",
        flexDirection: "row"
    },
    slider_style: {
        height: "70%",
        width: "60%"
    },
    slider_time: {
        fontSize: 15,
        marginLeft: "6%",
        color: "#808080"
    },
});

export default PodcastSlider;
