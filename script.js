const axios = require("axios");
const { writeFileSync } = require("fs");

access_token = process.argv[2];
const playlist_id = process.argv[3];

axios
  .get(
    `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2C%20contentDetails&playlistId=${playlist_id}&maxResults=500&key=${access_token}`
  )
  .then((response) => {
    let playlist_data = response.data;

    results = [];
    new Promise((resolve) => {
      let i = 0;
      const n = playlist_data.items.length;
      console.log("Number of videos in Playlist:", n);
      playlist_data.items.forEach((video) => {
        let cur_index =
          results.push([
            video.snippet.title,
            `https://www.youtube.com/watch?v=${video.contentDetails.videoId}`,
          ]) - 1;

        // get this video's duration

        axios
          .get(
            `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&id=${
              video.contentDetails.videoId
            }&key=${encodeURIComponent(access_token)}`
          )
          .then((response) => {
            console.log(
              `Information of Video ${i + 1} received from YouTube API.`
            );
            if (response.data.pageInfo.totalResults > 0)
              results[cur_index].push(
                response.data.items[0].contentDetails.duration
              );
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            i++;
            if (i == n) resolve();
          });
      });
    }).then(() => {
      console.log("Data completely received from YouTube API.");

      let csvContent = results
        .map((item) => {
          // Here item refers to a row in that 2D array
          var row = item;

          // Now join the elements of row with "," using join function
          return '"' + row.join('","') + '"';
        }) // At this point we have an array of strings
        .join("\n");

      writeFileSync(`result-${playlist_id}.csv`, csvContent);
      console.log("CSV file created");
    });
  })
  .catch((err) => {
    console.log(err);
  });
