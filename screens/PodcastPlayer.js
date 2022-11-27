import * as React from 'react';

import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    Image,
    Dimensions
} from 'react-native';

const Dev_Height = Dimensions.get("window").height
const Dev_Width = Dimensions.get("window").width

import AntDesign from "react-native-vector-icons/AntDesign"
import Entypo from "react-native-vector-icons/Entypo"
import Feather from "react-native-vector-icons/Feather"
import PodcastSlider from '../components/PodcastSlider';

function PodcastPlayer(props) {
    return (
        <SafeAreaView style={styles.contanier}>
            <View style={styles.mainbar}>
                <AntDesign name="left" size={24} style={{ marginLeft: "5%" }} />
                <Text style={styles.now_playing_text}> Now Playing </Text>
                <Entypo name="dots-three-horizontal" size={24} style={{ marginLeft: "20%" }} />
            </View>

            <View style={styles.music_logo_view}>
                <Image source={require("./assets/logo.jpg")} style={styles.image_view} />
            </View>

            <View style={styles.name_of_song_View} >
                <Text style={styles.name_of_song_Text1}>#02 - Practice</Text>
                <Text style={styles.name_of_song_Text2}>Digital Marketing - By Setup Cast</Text>
            </View>

            <PodcastSlider />

            <View style={styles.functions_view}>
                <Entypo name="loop" size={24} color="#e75480" style={{ marginLeft: "9%" }} />
                <Entypo name="controller-jump-to-start" size={24} color="#e75480" style={{ marginLeft: "12%" }} />
                <AntDesign name="pausecircle" size={50} color="#e75480" style={{ marginLeft: "12%" }} />
                <Entypo name="controller-next" size={24} color="#e75480" style={{ marginLeft: "12%" }} />
                <Feather name="download" size={20} color="#e75480" style={{ marginLeft: "10%" }} />
            </View>
        </SafeAreaView>
    )
}

export default PodcastPlayer;

const styles = StyleSheet.create({
    contanier: {
        height: Dev_Height,
        width: Dev_Width
    },
    mainbar: {
        height: "10%",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
    },
    now_playing_text: {
        fontSize: 19,
        marginLeft: "24%"
    },
    music_logo_view: {
        height: "30%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    image_view: {
        height: "100%",
        width: "50%",
        borderRadius: 10
    },
    name_of_song_View: {
        height: "15%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    name_of_song_Text1: {
        fontSize: 19,
        fontWeight: "500"
    },
    name_of_song_Text2: {
        color: "#808080",
        marginTop: "4%"
    },
    functions_view: {
        flexDirection: "row",
        height: "10%",
        width: "100%",
        alignItems: "center"
    },
})
