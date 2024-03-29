import * as React from 'react';

import { 
  Text, 
  View, 
  Image,
  Dimensions
 } from 'react-native';


import {AntDesign} from "react-native-vector-icons"
import PodcastSlider from '../components/PodcastSlider';



function Podcast (props){

    return(
        <View style={styles.recently_played_view}>
        <Text style={styles.recently_played_text}> Recently Played </Text>
        <View style={styles.recently_played_list}>
          <Image source={require("./assets/logo.jpg")} style={styles.recently_played_image} />
           <View style={styles.recently_played_list_text}>
              <Text style={styles.recently_played_list_text1}> #01 - Start With SEO </Text>
              <Text style={styles.recently_played_list_text2}> By Setup Cast - 15: 35 </Text>
           </View>
           <View>
              <ProgressCircle
              percent={40}
              radius={25}
              borderWidth={5}
              color="#e75480"
              shadowColor="#FFF"
              bgColor="#fff">
                   <AntDesign name="play" size={37} color="#e75480" style={{marginTop:"4%"}}/>
              </ProgressCircle>
        </View>
        <PodcastSlider/>
      </View>
    </View>
    );
}

export default Podcast;

const styles = StyleSheet.create({
  recently_played_view: {
    height: "25%",
    width: "100%",
},
recently_played_text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#808080",
    marginLeft: "5%",
    marginTop: "6%"
},
recently_played_list: {
    backgroundColor: "#FFE3E3",
    height: "50%",
    width: "90%",
    borderRadius: 10,
    marginLeft: "5%",
    marginTop: "5%",
    alignItems: "center",
    flexDirection: "row"
},
recently_played_image: {
    height: "80%",
    width: "20%",
    borderRadius: 10
},
recently_played_list_text: {
    height: "100%",
    width: "60%",
    justifyContent: "center"
},
recently_played_list_text1: {
    fontSize: 15,
    marginLeft: "8%"
},
recently_played_list_text2: {
    fontSize: 16,
    color: "#808080",
    marginLeft: "8%"
},
});