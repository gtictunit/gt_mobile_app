import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Dimensions, PermissionsAndroid, ToastAndroid } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import TrackPlayer from 'react-native-track-player';
import { RepeatMode } from 'react-native-track-player';
import { usePlaybackState } from 'react-native-track-player/lib/hooks';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import RNFetchBlob from 'rn-fetch-blob';
import AwesomeAlert from 'react-native-awesome-alerts';

const { width, height } = Dimensions.get('window');

const Controller = (props) => {
  const playBackState = usePlaybackState(); //custom hook by the react-native-track-player package
  const [isPlaying, setIsPlaying] = useState('paused');
  const [show, updateShow] = useState(false);
  const [successText, updateSuccessText] = useState("You have not subscribed. Buy a subscription and retry!");

  useEffect(() => {
    console.log('playBackState:  ' + playBackState)
    if (playBackState === 'playing' || playBackState === 3) {
      setIsPlaying('playing');
    } else if (playBackState === 'paused' || playBackState === 2) {
      setIsPlaying('paused');
    } else if (playBackState === 'stopped' || playBackState === 0) {
      setIsPlaying('stopped');
    } else {
      setIsPlaying('loading');
    }
  }, [playBackState]);

  const renderPlayPauseButton = () => {
    console.log('ISPLAYING:  ' + isPlaying)
    switch (isPlaying) {
      case 'playing':
        return <Fontisto name="pause" size={height / 25.8} color="white" />;
      case 'paused':
        return <FontAwesome5 name="play" size={height / 25.8} color="white" />;
      case 'stopped':
        return <FontAwesome5 name="play" size={height / 25.8} color="white" />;
      default:
        return <ActivityIndicator size={height / 25} color="gray" />;
    }
  };

  const renderStopButton = () => {
    return <FontAwesome5 name="stop" size={height / 25.8} color="white" />;
  };

  const onPressStop = () => {
    setIsPlaying('stopped');
    TrackPlayer.stop();
  };

  const getFileExtension = fileUrl => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ?
      /[^.]+$/.exec(fileUrl) : undefined;
  };

  const checkPermission = async () => {
    if (props.sub) {
      if (Platform.OS === 'ios') {
        onPressDownload();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission Required',
              message:
                'Application needs access to your storage to download File',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // Start downloading
            onPressDownload();
            console.log('Storage Permission Granted.');
            ToastAndroid.show("Starting download......!", ToastAndroid.SHORT);
          } else {
            // If permission denied then show alert
            Alert.alert('Error', 'Storage Permission Not Granted');
          }
        } catch (err) {
          // To handle permission related exception
          console.log("++++" + err);
        }
      }
    }
    else{
      updateShow(true)
    }
  };

  const onPressDownload = () => {
    // Get today's date to add the time suffix in filename
    let date = new Date();
    // File URL which we want to download
    let FILE_URL = props.sUrl;
    // Function to get extention of the file url
    let file_ext = getFileExtension(FILE_URL);
    console.log(JSON.stringify(file_ext))
    file_ext = '.' + file_ext[0];
    
    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const { config, fs } = RNFetchBlob;
    let RootDir = fs.dirs.MusicDir+"/LifeSprings/Downloads";
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path:
          RootDir +
          '/file_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          file_ext,
        description: 'downloading file...',
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,
      },
    };
    config(options)
      .fetch('GET', FILE_URL)
      .then(res => {
        // Alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        ToastAndroid.show("Downloaded Successfully!", ToastAndroid.LONG);
        // alert('File Downloaded Successfully.');
      });
  };

  const onPlayPause = () => {
    //console.log(playBackState);
    if (playBackState === 'playing' || playBackState === 3) {
      //I couldn't find in the documentation about this, it should be 'playing' but on the console it printed 3 for 'playing' and 2 for 'paused'
      //apparently this is 3 only on android
      TrackPlayer.pause();
    } else if (playBackState === 'stopped' || playBackState === 0) {
      TrackPlayer.skip(props.sId);
      TrackPlayer.play();
    } else if (playBackState === 'paused' || playBackState === 2) {
      TrackPlayer.play();
    }
  };

  const handleClose = () => {
    updateShow(false);
  }

  return (
    <View style={styles.screen}>
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
            confirmButtonColor="#63A3F4"
            onConfirmPressed={() => handleClose()}
          />
        </View>
      }
      <TouchableOpacity onPress={props.goPrev}>
        <AntDesign name="stepbackward" size={height / 25} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPlayPause}>
        {renderPlayPauseButton()}
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressStop}>
        {renderStopButton()}
      </TouchableOpacity>
      <TouchableOpacity onPress={props.goNext}>
        <AntDesign name="stepforward" size={height / 25} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={checkPermission}>
        <AntDesign name="download" size={height / 25} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
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

export default Controller;
