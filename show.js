import { audio } from "./music.js";
const display = document.querySelector(".tracks-cont")
let html=""

// function sound(){
//     audio.forEach((audios)=> {
//         html+=`
//         <div class="tracks">
//             <img src="${audios.image}"></img>
//             <h1>${audios.name}</h1>
//             <audio controls> <source src="${audios.track}"></audio>
//         </div>`
//     });
//     display.innerHTML=html
// }

// sound()

const clientId = 'b6de4b6b6c044849a3514b7fa5100209';
const clientSecret = '429c195ec2074d579e4271dde07fc6e9';

async function getAccessToken() {
  const tokenUrl = 'https://accounts.spotify.com/api/token';
  const headers = {
    'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  const body = 'grant_type=client_credentials';
  
  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: headers,
    body: body
  });

  const data = await response.json();
  return data.access_token; 
}

async function searchTrack(query, token) {
    const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`;
    const headers = {
      'Authorization': `Bearer ${token}`
    };
  
    const response = await fetch(searchUrl, {
      method: 'GET',
      headers: headers
    });
  
    const data = await response.json();
    const tracks = data.tracks.items;
    
    tracks.forEach(track => { 
        console.log(tracks);
               
        html+=`
        <a href="${track.href}">
        <div class="tracks">
            <img src="${track.album.images[0].url}"></img>
            <div>
                <h3>${track.name}</h3>
                <small>${track.album.artists[0].name}</small>
            </div>
        </div>
        </a>`
        display.innerHTML=html
    });
  }

  
async function main(queryy) {
    const token = await getAccessToken();
    console.log('Access token:', token);
    
    searchTrack(queryy, token);
  }
  

  document.querySelector('.search-button').onclick = function() {
    main(document.querySelector('.q').value);
};
  
  
