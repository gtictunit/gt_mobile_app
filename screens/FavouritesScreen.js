import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions, AsyncStorage} from 'react-native';

import SongItem from '../components/SongItem';
import Genre from '../models/Genre';
import Song from '../models/Song';
import { WEB_URL } from '../constant/urls';


const {width, height} = Dimensions.get('window');

function FavouritesScreen(props){
  const [favSongs, updateFavSongs] = useState([]);
  const [genres, updateGenres] = useState([]);
  const [thursday, updateThursday] = useState([]);
  const [sunday, updateSunday] = useState([]);
  const [special, updateSpecial] = useState([]);
  const [convention, updateConvention] = useState([]);

  useEffect(() => {
    (async () => {
      const GENRES = await AsyncStorage.getItem('@genres');
      const THURSDAY = await AsyncStorage.getItem('@thursday');
      const SUNDAY = await AsyncStorage.getItem('@sunday');
      const CONVENTIONS = await AsyncStorage.getItem('@convention');
      const SPECIAL = await AsyncStorage.getItem('@special');

      // console.log("Thursday data ==> "+THURSDAY);      

      let resp = [];

      const g = JSON.parse(GENRES);
      g.forEach(item => {    
        var gen = new Genre(item.id,item.title,item.url);
          resp.push(gen);
      });
      updateGenres(resp);

      const t = JSON.parse(THURSDAY);
      resp = [];
      t.forEach(item => {   
        if(item.title) 
        var gen = new Song(
          item.id,
          item.genre,
          item.title,
          item.artist,
          item.artwork,
          item.url,
          item.service_date,
        );
          resp.push(gen);
      });
      updateThursday(resp);

      const s = JSON.parse(SUNDAY);
      resp = [];
      s.forEach(item => {    
        var gen = new Song(
          item.id,
          item.genre,
          item.title,
          item.artist,
          item.artwork,
          item.url,
          item.service_date,
        );
          resp.push(gen);
      });
      updateSunday(resp);


      const c = JSON.parse(CONVENTIONS);
      resp = [];
      c.forEach(item => {    
        var gen = new Song(
          item.id,
          item.genre,
          item.title,
          item.artist,
          item.artwork,
          item.url,
          item.service_date,
        );
          resp.push(gen);
      });
      updateConvention(resp);

      const sp = JSON.parse(SPECIAL);
      resp = [];
      sp.forEach(item => {    
        var gen = new Song(
          item.id,
          item.genre,
          item.title,
          item.artist,
          item.artwork,
          item.url,
          item.service_date,
        );
          resp.push(gen);
      });
      updateSpecial(resp);      
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const user_id = await AsyncStorage.getItem('@userid');
      let res = await fetch(
       WEB_URL+"/favorites/get_user_favs_by_id?user_id="+user_id //example and simple data
      );
      let response = await res.json();
      let r = response.data;
      let resp = [];
      r.forEach(item => {    
        var gen = new Song(
          item.message_id,
          item.service,
          item.title,
          item.preacher,
          item.img_url,
          item.media_file_url,
          item.service_date,
        );
          resp.push(gen);
      });
      updateFavSongs(resp);
      AsyncStorage.setItem('@favs',JSON.stringify(resp)); 
    })();
  }, []);

  if (favSongs.length === 0) {
    return (
      <View style={styles.screen}>
        <Text style={styles.fav}>Your Favourites</Text>
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text style={styles.noFav}>No favourites added!</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.fav}>Your Favourites</Text>
      </View>
      <ScrollView style={{marginTop: 20}}>
        <View>
          {favSongs.map((item) => (
            <SongItem
              artwork={item.artwork}
              title={item.title}
              artist={item.artist}
              onSelect={() =>
                props.navigation.navigate('SongsPlay', {
                  sid: item.id,
                  gid: item.genre,
                  genres: genres, 
                  thursday:thursday, 
                  sunday:sunday, 
                  convention:convention, 
                  special:special
                })
              }
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: height/37,
    flex: 1,
    backgroundColor: 'black',
  },
  fav: {
    color: 'white',
    fontSize: height/25,
    fontWeight: 'bold',
    paddingVertical: height/75,
    paddingRight: height/75
  },
  noFav: {
    color: '#a6a6a6',
  },
  header: {
    flexDirection: 'row',
    
  },
});

export default FavouritesScreen;
