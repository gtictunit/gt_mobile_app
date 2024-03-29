import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, AsyncStorage, RefreshControl, LogBox } from 'react-native';
// import { AsyncStorage } from 'react-native-community';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import Genre from '../models/Genre';
import Song from '../models/Song';
import { WEB_URL } from '../constant/urls';
import GenreGrid from '../components/GenreGrid';
import PostGrid from '../components/PostGrid';
import Recomm from '../components/Recomm';

import TrackPlayer from 'react-native-track-player';
import Carousel from 'react-native-snap-carousel';
import Post from '../models/Post';
import CarouselImg from '../components/CarouselImg';
import CarouselItem from '../models/CarouselItem';
import Sub from '../models/UserSub';

const { width, height } = Dimensions.get('window');

const logo = require('./login/p.png');

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

function HomeScreen(props) {
  const y = useRef()
  const [username, updateUsername] = useState('')
  const [genres, updateGenres] = useState([]);
  const [thursday, updateThursday] = useState([]);
  const [sunday, updateSunday] = useState([]);
  const [special, updateSpecial] = useState([]);
  const [convention, updateConvention] = useState([]);
  const [recent, updateRecent] = useState([]);
  const [lastpost, updateLastPost] = useState([]);
  const [user, updateUser] = useState([]);
  const [uId, updateUId] = useState('');
  const [index, setIndex] = useState(0);
  const [carouselItems, updateCarouselItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [subStatus, updateSubStatus] = useState(false)

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core and will be removed in a future release']);
    LogBox.ignoreLogs(['Required cycle'])
  }, [])

  useEffect(() => {
    (async () => {
      
      const name = await AsyncStorage.getItem('@username');
      const usr = await AsyncStorage.getItem('@user');
      const user_id = await AsyncStorage.getItem('@userid');
      const code = await AsyncStorage.getItem('@isLoggedin');
      let r = JSON.parse(usr);

      let res = await fetch(
        WEB_URL + "/favorites/get_user_favs_by_id?user_id=" + user_id //example and simple data
      );
      let response = await res.json();
      let rr = response.data;
      let resp = [];
      rr.forEach(item => {
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
      //  console.log("FAVS Home Screen ===> "+JSON.stringify(resp))
      AsyncStorage.setItem('@favs', JSON.stringify(resp));
      updateUsername(name);
      updateUser(r)
      updateUId(user_id)
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const user_id = await AsyncStorage.getItem('@userid');

      let res = await fetch(
        WEB_URL + "/subscription/get_user_subscription_status?id=" + user_id //example and simple data
      );
      let response = await res.json();
      let rr = response.sub;
      if(rr != null){
      AsyncStorage.setItem('@subtype', rr.type);
      AsyncStorage.setItem('@subexpiry', rr.end_date);
      AsyncStorage.setItem('@substatus', rr.status);
      if(rr.status === "ACTIVE"){
        updateSubStatus(true);
      }
      }
      else{
        AsyncStorage.setItem('@subtype', "N/A");
        AsyncStorage.setItem('@subexpiry', '****/**/**');
        AsyncStorage.setItem('@substatus', 'No Subscription');
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let res = await fetch(
        WEB_URL + "/service/get_services" //example and simple data
      );
      let response = await res.json();
      let r = response.data;
      let resp = [];
      r.forEach(item => {
        var gen = new Genre(item.id, item.name, item.img);
        resp.push(gen);
      });
      updateGenres(resp);
      AsyncStorage.setItem('@genres', JSON.stringify(resp));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let res = await fetch(
        WEB_URL + "/carousel/get_active_carouselitems" //example and simple data
      );
      console.log('Carousel Items  ==>>> ' + JSON.stringify(resp))
      let response = await res.json();
      let r = response.data;
      let resp = [];
      r.forEach(item => {
        var gen = new CarouselItem(item.id, item.img);
        resp.push(gen);
      });
      console.log('Carousel Items  ==>>> ' + JSON.stringify(resp))
      updateCarouselItems(resp);
      // AsyncStorage.setItem('@',JSON.stringify(resp)); 
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let res = await fetch(
        WEB_URL + "/message/get_messages_by_service?id=1" //example and simple data
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
      updateThursday(resp);
      AsyncStorage.setItem('@thursday', JSON.stringify(resp));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let res = await fetch(
        WEB_URL + "/message/get_messages_by_service?id=2" //example and simple data
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
      AsyncStorage.setItem('@sunday', JSON.stringify(resp));
      updateSunday(resp);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let res = await fetch(
        WEB_URL + "/message/get_messages_by_service?id=3" //example and simple data
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
      AsyncStorage.setItem('@convention', JSON.stringify(resp));
      updateConvention(resp);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let res = await fetch(
        WEB_URL + "/message/get_messages_by_service?id=4" //example and simple data
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
        resp.push(gen)
      });
      AsyncStorage.setItem('@special', JSON.stringify(resp));
      updateSpecial(resp);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let res = await fetch(
        WEB_URL + "/message/get_messages_recent" //example and simple data
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
          item.id,
        );
        resp.push(gen)
      });
      updateRecent(resp);
    })();
  }, []);


  useEffect(() => {
    (async () => {
      let res = await fetch(
        WEB_URL + "/posts/get_last_post" //example and simple data
      );
      console.log('Posts:: ---->>>  ')
      let response = await res.json();
      let r = response.data;
      var gen = new Post(
        r.post_id + "",
        r.title,
        r.posttext,
        r.upload_date,
      );
      let resp = [];
      resp.push(gen)
      console.log('Posts:: ---->>>  ' + JSON.stringify(resp))
      updateLastPost(resp);
      AsyncStorage.setItem('@posts', JSON.stringify(resp));
    })();
  }, []);


  const renderGenreItem = ({ item, index }) => {
    //  console.log("ITEM ===>  "+JSON.stringify(item));
    return (
      <GenreGrid
        imageUrl={item.imageUrl}
        title={""}
        onSelect={() =>props.navigation.navigate('SongsList', {
          
            gid: item.id,
            sub: subStatus,
            genres: genres,
            thursday: thursday,
            sunday: sunday,
            convention: convention,
            special: special
          })
        }
      />
    );
  };

  const renderCarouselItem = ({ item, index }) => {
    return (
      <CarouselImg
        imageUrl={item.imageUrl}
        title={""}
        onSelect={() => { }}
      />
    );
  }

  const renderSongItem = ({ item, index }) => {
    return (
      <Recomm
        artwork={item.artwork}
        title={item.title}
        artist={item.artist}
        serviceDate={item.service_date}
        onSelect={() =>
          props.navigation.navigate('SongsPlay', {
            sid: item.id,
            url: item.url,
            gid: item.genre,
            sub: subStatus,
            genres: genres,
            thursday: thursday,
            sunday: sunday,
            convention: convention,
            special: special
          })
        }
      />
    );
  };

  const renderPostItem = ({ item, index }) => {
    return (
      <PostGrid
        imageUrl={logo}
        title={""}
        onSelect={() =>
          props.navigation.navigate('PastorDesk', {
            title: item.title,
            content: item.content,
            date: item.upload_date
          })
        }
      />
    );
  };

  return (
    <View style={{ backgroundColor: 'black', padding: 10 }}
    // onTouchStart={e=> y.current = e.nativeEvent.pageY}
    // onTouchEnd={e => {
    //   // some threshold. add whatever suits you
    //   if (y.current - e.nativeEvent.pageY < 10) {
    //     onRefresh()
    //   }
    // }}
    >
      <ScrollView showsVerticalScrollIndicator={true}
        // refreshControl={
        //   <RefreshControl
        //     refreshing={refreshing}
        //     onRefresh={() => onRefresh()}
        //     tintColor="red"
        //   />
        // }
        // onTouchStart={e=> y.current = e.nativeEvent.pageY}
        // onTouchEnd={e => {
        //   // some threshold. add whatever suits you
        //   if (y.current - e.nativeEvent.pageY < 10) {
        //     onRefresh()
        //   }
        // }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.header}>Shalom!,  {username} </Text>
          {/* <TouchableOpacity
            onPress={() => {
              TrackPlayer.stop()
              AsyncStorage.setItem('@isLoggedIn', '99')
              props.navigation.navigate('Login');//added just for test purpose
            }}>
            <Text style={styles.login}>Logout</Text>
          </TouchableOpacity> */}
        </View>
        <Carousel
          // ref={(c) => { this._carousel = c; }}
          // keyExtractor={(item, index) => item.id}
          data={carouselItems}
          renderItem={renderCarouselItem}
          sliderWidth={width}
          itemWidth={width}
          // onSnapToItem = { index => setIndex(index) } 
          enableSnap={true}
          loop={true}
          autoplay={true}
        />
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
            keyExtractor={(item, index) => item.list_id}
            horizontal
            data={recent}
            renderItem={renderSongItem}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <Text style={styles.pText}>Pastor's Desk</Text>
        <View style={styles.desk}>
          <FlatList
            // keyExtractor={(item, index) => item.id}
            key={lastpost}
            data={lastpost}
            renderItem={renderPostItem}
            showsHorizontalScrollIndicator={false}
          // numColumns={1}
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
    fontSize: height / 35,
    paddingBottom: height / 37,
    paddingTop: height / 50,
    paddingLeft: width / 25,
    fontWeight: 'bold',
  },
  login: {
    color: 'white',
    fontSize: height / 45,
    paddingBottom: height / 37,
    paddingTop: height / 40,
    paddingLeft: width / 80,
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: height / 30,
    color: 'white',
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
    height: height / 2.7,
  },
  recommText: {
    color: 'gray',
    fontSize: height / 41,
    marginBottom: height / 50,
    fontWeight: 'bold',
  },
  desk: {
    flex: 1,
    marginBottom: height / 37,
  },
  pText: {
    color: 'white',
    fontSize: height / 30,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
