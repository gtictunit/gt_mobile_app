import Song from '../models/Song';
import Genre from '../models/Genre';
import Axios from 'axios'
import { WB_URL } from '../constant/urls';

export const SUNDAY = async ()=>{
  const res = await Axios.get('https://gt.pario.com.ng/backend/message/get_messages_by_service?id=2');
 //console.log(res.data);

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

  export const THURSDAY = async ()=>{
  const res = await Axios.get('https://gt.pario.com.ng/backend/message/get_messages_by_service?id=1');
 //console.log(res.data);

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

async function genreList (){
  const res = await Axios.get('https://gt.pario.com.ng/backend/service/get_services');
 //console.log(res.data);
 users.map((user) => {
  return (
    <Text style={styles.paragraph}>{user.id} - {user.name}</Text>
  )
})
  let resp = [];

  Object.keys(res.data.data).forEach(key => {    
    var item = res.data.data[key];
    console.log("ITEM[] ===> "+JSON.stringify(item));
    var g = new Genre(
      item.id,
      item.name,
      item.img
    );
      resp.push(g);
    });

    console.log("ARRAY[] ===> "+JSON.stringify(resp));
    return resp;

}

export const GENRES = [new Genre(
  '1',
  'Thursday',
  'https://gt.pario.com.ng/images/gt_logo.jpg'
),
new Genre(
  '2',
  'Sunday',
  'https://gt.pario.com.ng/images/gt_logo.jpg'
)]

export const SONGS = async ()=>{
  const res = await Axios.get('https://gt.pario.com.ng/backend/message/get_messages_recent');
 //console.log(res.data);

  let resp = [];

  Object.keys(res.data.data).forEach(key => {    
    var item = res.data.data[key];
    // console.log("ITEM[] ===> "+JSON.stringify(item));
    resp.push(new Song(
      '0',
      '1',
      'Death Bed',
      'Powfu',
      'https://samplesongs.netlify.app/album-arts/death-bed.jpg',
      'https://res.cloudinary.com/dht1rd0lr/video/upload/v1600018774/song2_bxpoj6.mp3',
    ))
  })

    console.log("ARRAY[] ===> "+JSON.stringify(resp));
    return resp;
};