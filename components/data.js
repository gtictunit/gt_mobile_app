import Song from '../models/Song';
import Genre from '../models/Genre';
import Axios from 'axios'
import { WB_URL } from '../constant/urls';

const onSunday = async ()=>{
  const res = await Axios.get('https://gt.pario.com.ng/backend/message/get_messages_by_service?id=2');
//  console.log(res.data);

  let resp = [];

  Object.keys(res.data.data).forEach(key => {    
    var item = res.data.data[key];
    // console.log("ITEM[] ===> "+JSON.stringify(item));
      resp.push(   new Song(
        item.id,
        item.service,
        item.title,
        item.preacher,
        item.img_url,
        item.media_file_url,
      ))
    })

    // console.log("ARRAY[] ===> "+JSON.stringify(resp));
    return resp;
  };

const onThursday = async ()=>{
  const res = await Axios.get('https://gt.pario.com.ng/backend/message/get_messages_by_service?id=1');
//  console.log(res.data);
  let resp = [];

  Object.keys(res.data.data).forEach(key => {    
    var item = res.data.data[key];
    // console.log("ITEM[] ===> "+JSON.stringify(item));
      resp.push(   new Song(
        item.id,
        item.service,
        item.title,
        item.preacher,
        item.img_url,
        item.media_file_url,
      ))
    })

    // console.log("ARRAY[] ===> "+JSON.stringify(resp));
    return resp;

};

const getGenres = async ()=>{
  const res = await Axios.get('https://gt.pario.com.ng/backend/service/get_services');
//  console.log(res.data);

  let resp = [];

  Object.keys(res.data.data).forEach(key => {    
    var item = res.data.data[key];
    // console.log("ITEM[] ===> "+JSON.stringify(item));
      resp.push(   new Genre(
        item.id,
        item.name,
        item.img
      ))
    })

    console.log("ARRAY[] ===> "+JSON.stringify(resp));
    return resp;

};

export const THURSDAY = onThursday();
export const SUNDAY = onSunday();

export const GENRES = getGenres();

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
