class Recent {
  
    constructor(id, genre, title, artist, artwork, url, service_date) { //to provide a blueprint for how our Recents will look like, what all it will contain
      this.id = id;
      this.genre = genre;
      this.title = title;
      this.artist = artist;
      this.artwork = artwork;
      this.url = url;
      this.service_date = service_date;
    }
  }
  
  export default Recent;