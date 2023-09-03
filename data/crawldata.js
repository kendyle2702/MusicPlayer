const crawlTop100 = () => {
  const top100ApiZingmp3 =
    "https://mp3.zing.vn/xhr/chart-realtime?songId=0&videoId=0&albumId=0&chart=song&time=-1";
  let songsResult = [];
  const getIdList = (contentApi) => {
    const idList = contentApi.data.song.map((element) => {
      return element.code;
    });
    return idList;
  };
  function getSongs(idList) {
    return Promise.all(
      idList.map((element) => {
        let songUrl = `https://mp3.zing.vn/xhr/media/get-source?type=audio&key=${element}`;
        return fetch(songUrl)
          .then((response) => {
            return response.json();
          })
          .then((songObj) => {
            let songE = {
              name: songObj.data.name,
              singer: songObj.data.performer,
              path: songObj.data.source["128"],
              image: songObj.data.album.thumbnail,
            };
            return songE;
          });
      })
    );
  }
  return fetch(top100ApiZingmp3)
    .then((response) => {
      return response.json();
    })
    .then((contentApi) => {
      return getIdList(contentApi);
    })
    .then((idList) => {
      return getSongs(idList);
    })
    .then((songs)=>{
        return songs 
    })
    .catch((err) => {
      console.log(err);
    })
};
export default crawlTop100;
