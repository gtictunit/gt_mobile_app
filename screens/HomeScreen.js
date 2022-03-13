import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, FlatList} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

import Genre from '../models/Genre';
import {GENRES, SONGS} from '../components/data';
import GenreGrid from '../components/GenreGrid';
import Recomm from '../components/Recomm';

const {width, height} = Dimensions.get('window');


function HomeScreen (props) {
  console.log("HAVE RENDERED?");
  const [genres, updateGenres] = useState([]);

  useEffect(() => {
    (async () => {
      let res = await fetch(
        "https://gt.pario.com.ng/backend/service/get_services" //example and simple data
      );
      let response = await res.json();
      let r = response.data;
      console.log("GEN=====>>>     "+JSON.stringify(r))
      let resp = [];
      r.forEach(item => {    
        console.log("ITEM=====>>>     "+JSON.stringify(item))
        var gen = new Genre(item.id,item.name,item.img);
          resp.push(gen);
        console.log("ARRAY[] ===> "+JSON.stringify(resp));
      });
      updateGenres(resp);
    })();
  }, []);

  

  const renderGenreItem = ({item, index}) => {
    return (
      <GenreGrid
        imageUrl={item.imageUrl}
        title={item.title}
        onSelect={() => {
          props.navigation.navigate('SongsList', {gid: item.id}); //passing the id of genre as params to view its songs in the next screens
        }}
      />
    );
  };

  const renderSongItem = ({item, index}) => {
    return (
      <Recomm
        artwork={item.artwork}
        title={item.title}
        artist={item.artist}
        onSelect={() =>
          props.navigation.navigate('SongsPlay', {
            sid: item.id,
            gid: item.genre,
          })
        }
      />
    );
  };

  return (
    <View style={{backgroundColor: 'black', padding: 10}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.header}>Shalom!</Text>
          {/* <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Search');//added just for test purpose
            }}>
            <Text>Search</Text>
          </TouchableOpacity> */}
        </View>
        <Text style={styles.subHeader}>Services</Text>

        <View style={styles.listOfGenres}>
          <FlatList
            keyExtractor={(item, index) => item.id}
            key={genres} //new thing, Changing numColumns on the fly is not supported. Change the key prop on FlatList when changing the number of columns to force a fresh render of the component.
            data={genres}
            renderItem={renderGenreItem}
            numColumns={2}
          />
        </View>
        <View style={styles.recomm}>
          <Text style={styles.recommText}>Recent Uploads</Text>
          <FlatList
            horizontal
            data={SONGS}
            renderItem={renderSongItem}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  welcome: {
    padding: height / 37,
  },
  header: {
    color: 'white',
    fontSize: height / 25,
    paddingBottom: height / 37,
    paddingTop: height / 50,
    paddingLeft: width / 25,
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: height / 41,
    color: 'gold',
    paddingBottom: height / 75,
    paddingLeft: width / 25,
    fontWeight: 'bold',
  },
  listOfGenres: {
    flex: 1,
    marginBottom: height / 37,
  },

  recomm: {
    padding: height / 75,
    height: height / 2,
  },
  recommText: {
    color: 'gray',
    fontSize: height / 41,
    marginBottom: height / 50,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
