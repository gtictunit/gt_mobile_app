function sync() {
    // custom logic 

        (async () => {
          const user_id = await AsyncStorage.getItem('@userid');
    
          let res = await fetch(
            WEB_URL+"/subscription/get_user_subscription_status?id="+user_id //example and simple data
           );
           let response = await res.json();
           let rr = response.sub;
           AsyncStorage.setItem('@subtype', rr.type);
           AsyncStorage.setItem('@subexpiry', rr.end_date);
           AsyncStorage.setItem('@substatus', rr.status);
        })();
        
        (async () => {
          let res = await fetch(
            WEB_URL+"/service/get_services" //example and simple data
          );
          let response = await res.json();
          let r = response.data;
          let resp = [];
          r.forEach(item => {    
            var gen = new Genre(item.id,item.name,item.img);
              resp.push(gen);
          });
          //updateGenres(resp);
          AsyncStorage.setItem('@genres',JSON.stringify(resp)); 
        })();
        
        (async () => {
          let res = await fetch(
            WEB_URL+"/carousel/get_carouselitems" //example and simple data
          );
          console.log('Carousel Items  ==>>> '+JSON.stringify(resp))
          let response = await res.json();
          let r = response.data;
          let resp = [];
          r.forEach(item => {    
            var gen = new CarouselItem(item.id,item.img);
              resp.push(gen);
          });
          console.log('Carousel Items  ==>>> '+JSON.stringify(resp))
          //updateCarouselItems(resp);
          // AsyncStorage.setItem('@',JSON.stringify(resp)); 
        })();
        
        (async () => {
          let res = await fetch(
           WEB_URL+"/message/get_messages_by_service?id=1" //example and simple data
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
          //updateThursday(resp);
          AsyncStorage.setItem('@thursday',JSON.stringify(resp)); 
        })();
        
        (async () => {
          let res = await fetch(
           WEB_URL+"/message/get_messages_by_service?id=2" //example and simple data
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
          AsyncStorage.setItem('@sunday',JSON.stringify(resp)); 
          //updateSunday(resp);
        })();
        
        (async () => {
          let res = await fetch(
           WEB_URL+"/message/get_messages_by_service?id=3" //example and simple data
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
          AsyncStorage.setItem('@convention',JSON.stringify(resp)); 
          //updateConvention(resp);
        })();

        (async () => {
          let res = await fetch(
           WEB_URL+"/message/get_messages_by_service?id=4" //example and simple data
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
          AsyncStorage.setItem('@special',JSON.stringify(resp)); 
          //updateSpecial(resp);
        })();
        (async () => {
          let res = await fetch(
           WEB_URL+"/message/get_messages_recent" //example and simple data
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
          //updateRecent(resp);
        })();

        (async () => {
          let res = await fetch(
           WEB_URL+"/posts/get_last_post" //example and simple data
          );
          console.log('Posts:: ---->>>  ')
          let response = await res.json();
          let r = response.data;  
            var gen = new Post(
              r.post_id+"",
              r.title,
              r.posttext,
              r.upload_date,
            );
            let resp = [];
            resp.push(gen)
          console.log('Posts:: ---->>>  '+JSON.stringify(resp))
          //updateLastPost(resp);
          AsyncStorage.setItem('@posts',JSON.stringify(resp)); 
        })();

        AsyncStorage.setItem('@refresh',"REFRESH"); 
}

function backgroundSync() {
    console.log('performing background sync...')
    sync()
}

export {
    sync,
    backgroundSync
}