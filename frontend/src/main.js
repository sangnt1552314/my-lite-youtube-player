import './style.css';

// Add search functionality
const searchInput = document.querySelector('.search-input');
const songRows = document.querySelectorAll('.song-row:not(:first-child)');

searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    songRows.forEach(row => {
        const songTitle = row.querySelector('h1').textContent.toLowerCase();
        if (songTitle.includes(searchTerm)) {
            row.style.display = 'flex';
        } else {
            row.style.display = 'none';
        }
    });
});

function hideShow() {
  var cover = document.querySelector(".cover");
  var list = document.querySelector(".song-list");
  var nowPlaying = document.querySelector(".now-playing-wrapper");
  if (cover.style.display === "none" && list.style.display === "none") {
    cover.style.display = "block";
    list.style.display = "block";
    nowPlaying.style.visibility = "none";
  } else {
    cover.style.display = "none";
    list.style.display = "none";
    nowPlaying.style.visibility = "visible";
  }
}
var song = document.getElementById("song");
function playAudio() {
  song.play();
}
function pauseAudio() {
  song.pause();
}
var overlay = document.getElementById("nav");
function openNav(){
    overlay.style.width = "45%";
}
function closeNav() {
    overlay.style.width = "0%";
}
/* inspired by https://dribbble.com/shots/6010742-Music-player */


// import {Greet} from '../wailsjs/go/main/App';

// Setup the greet function
// window.greet = function () {
//     // Get name
//     let name = nameElement.value;

//     // Check if the input is empty
//     if (name === "") return;

//     // Call App.Greet(name)
//     try {
//         Greet(name)
//             .then((result) => {
//                 // Update result with data back from App.Greet()
//                 resultElement.innerText = result;
//             })
//             .catch((err) => {
//                 console.error(err);
//             });
//     } catch (err) {
//         console.error(err);
//     }
// };


