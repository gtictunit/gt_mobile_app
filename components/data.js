import Song from '../models/Song';
import Genre from '../models/Genre';
import Axios from 'axios'
import { WB_URL } from '../constant/urls';
import React, { useState, useEffect }  from 'react';




export function GENRES(){
  const [genres, updateGenres] = useState([]);
  useEffect(() => {
  (async () => {
    let res = await fetch(
      "https://gtmobile.glorytabernacleibadan.org/backend/service/get_services" //example and simple data
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
return genres;
  }
  
const onThursday = async ()=>{
  const res = await Axios.get('https://gtmobile.glorytabernacleibadan.org/backend/message/get_messages_by_service?id=1');
//  console.log(res.data);
  let resp = [];

  Object.keys(res.data.data).forEach(key => {    
    var item = res.data.data[key];
    console.log("ITEM[] ===> "+JSON.stringify(item));
      resp.push(   new Song(
        item.id,
        item.service,
        item.title,
        item.preacher,
        item.img_url,
        item.media_file_url,
      ))
    })

    console.log("ARRAY[] ===> "+JSON.stringify(resp));
    return resp;

};



export const THURSDAY = [];
export const SUNDAY = [];

// export const GENRES = genres;

export const SONGS = [
  new Song(
    '0',
    '7',
    'Death Bed',
    'Powfu',
    'https://samplesongs.netlify.app/album-arts/death-bed.jpg',
    'https://res.cloudinary.com/dht1rd0lr/video/upload/v1600018774/song2_bxpoj6.mp3',
  ),
  new Song(
    '1',
    '7',
    'Bad Liar',
    'Imagine Dragons',
    'https://samplesongs.netlify.app/album-arts/bad-liar.jpg',
    'https://samplesongs.netlify.app/Bad%20Liar.mp3',
  ),
  new Song(
    '2',
    '7',
    'Faded',
    'Alan Walker',
    'https://samplesongs.netlify.app/album-arts/faded.jpg',
    'https://samplesongs.netlify.app/Faded.mp3',
  ),
  new Song(
    '3',
    '7',
    'Hate Me',
    'Ellie Goulding',
    'https://samplesongs.netlify.app/album-arts/hate-me.jpg',
    'https://samplesongs.netlify.app/Hate%20Me.mp3',
  ),
  new Song(
    '4',
    '7',
    'Solo',
    'Clean Bandit',
    'https://samplesongs.netlify.app/album-arts/solo.jpg',
    'https://samplesongs.netlify.app/Solo.mp3',
  ),
  new Song(
    '5',
    '7',
    'Without Me',
    'Halsey',
    'https://samplesongs.netlify.app/album-arts/without-me.jpg',
    'https://samplesongs.netlify.app/Without%20Me.mp3',
  ),
];
