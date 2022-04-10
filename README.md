# youtube-playlist-to-csv

To run the script, install NodeJS and NPM on your system. Install all the required packages by running:
<code>npm install</code><br>

Then run the script using the following command:<br>
<code>node script.js <google_api_access_token> <youtube_playlist_id></code>

To generate the google_api_access_token, go to the <a href="https://console.cloud.google.com/apis/credentials">Google API Credentials page</a> and generate an access key.

  Note: The youtube_playlist_id is not the URL of the playlist. If the url of a playlist is <code>https://www.youtube.com/playlist?list=PLkt3DFCNIchE9iqT1vmgTnBhUeKI4Thdr</code> then only the part after <code>list=</code> is the playlist_id. <br>In the case of the URL mentioned above, the playlist ID would be <code>PLkt3DFCNIchE9iqT1vmgTnBhUeKI4Thdr</code>.
  
  For example, if your Google Access Token is abcd and your playlist ID is xyz, then the command you would run would be:<br>
  <code>node script.js abcd xyz</code>
