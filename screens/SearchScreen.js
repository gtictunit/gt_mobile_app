import React, {useState} from 'react';
import {View, Dimensions} from 'react-native';
import {SearchBar} from 'react-native-elements';

import SongItem from '../components/SongItem';
import Colors from '../components/Colors';
import {ScrollView} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

function SearchScreen(props) {
  const GENRES = AsyncStorage.getItem('@genres');
  const THURSDAY = AsyncStorage.getItem('@thursday');
  const SUNDAY = AsyncStorage.getItem('@sunday');
  const CONVENTIONS = AsyncStorage.getItem('@convention');
  const SPECIAL = AsyncStorage.getItem('@special');
  
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const arrayHolder = [
    ...THURSDAY,
    ...SUNDAY,
    ...CONVENTIONS,
    ...SPECIAL,
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
