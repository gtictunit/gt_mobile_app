import React, {useEffect, useState} from 'react';
import {View, Dimensions, AsyncStorage} from 'react-native';
import {SearchBar} from 'react-native-elements';

import SongItem from '../components/SongItem';
import Colors from '../components/Colors';
import {ScrollView} from 'react-native-gesture-handler';
import Song from '../models/Song';

const {width, height} = Dimensions.get('window');


function SearchScreen(props) {
  const [thursday, updateThursday] = useState([]);
  const [sunday, updateSunday] = useState([]);
  const [special, updateSpecial] = useState([]);
  const [convention, updateConvention] = useState([]);

  useEffect(() => {
    (async () => {
      const THURSDAY = await AsyncStorage.getItem('@thursday');
      const SUNDAY = await AsyncStorage.getItem('@sunday');
      const CONVENTIONS = await AsyncStorage.getItem('@convention');
      const SPECIAL = await AsyncStorage.getItem('@special');

      console.log("Thursday data ==> "+THURSDAY)

      let resp = [];

      const t = JSON.parse(THURSDAY);
      t.forEach(item => {    
        var gen = new Song(
          item.message_id,
          item.service,
          item.title,
          item.preacher,
          item.img_url,
          item.media_file_url,
        );
          resp.push(gen);
      });
      updateThursday(resp);

      const s = JSON.parse(SUNDAY);
      resp = [];
      s.forEach(item => {    
        var gen = new Song(
          item.message_id,
          item.service,
          item.title,
          item.preacher,
          item.img_url,
          item.media_file_url,
        );
          resp.push(gen);
      });
      updateSunday(resp);


      const c = JSON.parse(CONVENTIONS);
      resp = [];
      t.forEach(item => {    
        var gen = new Song(
          item.message_id,
          item.service,
          item.title,
          item.preacher,
          item.img_url,
          item.media_file_url,
        );
          resp.push(gen);
      });
      updateConvention(resp);

      const sp = JSON.parse(SPECIAL);
      resp = [];
      sp.forEach(item => {    
        var gen = new Song(
          item.message_id,
          item.service,
          item.title,
          item.preacher,
          item.img_url,
          item.media_file_url,
        );
          resp.push(gen);
      });
      updateSpecial(resp);      
    })();
  }, []);
  
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const arrayHolder = [
    ...thursday,
    ...sunday,
    ...convention,
    ...special,
  ];

  const searchFilterFunction = (text) => {
    const newData = arrayHolder.filter((item) => {
      const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setSearch(text);
    setData(newData);
  };

  return (
    <View style={{flex: 1, padding: height / 37, backgroundColor: 'black'}}>
      <SearchBar
        round={true}
        containerStyle={{backgroundColor: 'black'}}
        inputContainerStyle={{backgroundColor: '#282828', padding: 5}}
        inputStyle={{color: 'white'}}
        placeholderTextColor="gray"
        placeholder="Search for songs..."
        value={search}
        underlineColorAndroid={Colors.primary}
        onChangeText={(text) => {
          searchFilterFunction(text);
        }}
        onClear={() => searchFilterFunction('')}
        searchIcon={{color: Colors.primary}}
      />

      <ScrollView style={{marginTop: height/37}}>
        <View>
          {data.map((item) => (
            <SongItem
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
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default SearchScreen;
