import './style.css';

import {SearchMusic, GetVideoAudioUrl} from '../wailsjs/go/main/App';

// Mock data for music
const mockMusicData = [
  {
    id: "dQw4w9WgXcQ",
    title: "Rick Astley - Never Gonna Give You Up",
    thumb: "https://i.ytimg.com/vi/dQw4w9WgXcQ/default.jpg",
    author: "Rick Astley",
    views: "1234567890",
    duration: "3:32"
  },
  {
    id: "JGwWNGJdvx8",
    title: "Ed Sheeran - Shape of You",
    thumb: "https://i.ytimg.com/vi/JGwWNGJdvx8/default.jpg",
    author: "Ed Sheeran",
    views: "987654321",
    duration: "3:53"
  },
  {
    id: "kJQP7kiw5Fk",
    title: "Luis Fonsi - Despacito ft. Daddy Yankee",
    thumb: "https://i.ytimg.com/vi/kJQP7kiw5Fk/default.jpg",
    author: "Luis Fonsi",
    views: "876543210",
    duration: "4:41"
  },
  {
    id: "RgKAFK5djSk",
    title: "Wiz Khalifa - See You Again ft. Charlie Puth",
    thumb: "https://i.ytimg.com/vi/RgKAFK5djSk/default.jpg",
    author: "Wiz Khalifa",
    views: "765432109",
    duration: "3:58"
  },
  {
    id: "9bZkp7q19f0",
    title: "PSY - GANGNAM STYLE",
    thumb: "https://i.ytimg.com/vi/9bZkp7q19f0/default.jpg",
    author: "PSY",
    views: "654321098",
    duration: "4:13"
  }
];

const songsContainer = document.querySelector('.songs-container');

mockMusicData.forEach(song => {
  const row = document.createElement('div');
  row.className = 'song-row';
  row.innerHTML = `
    <h1>${song.title}</h1> <span>${song.duration}</span>
  `;
  row.setAttribute('data-video-id', song.id);
  row.addEventListener('click', () => {
    setPlayingSong(song);
  });
  songsContainer.appendChild(row);
});

// Function to filter mock data
function searchMockMusic(searchTerm) {
  return mockMusicData.filter(song => 
    song.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.Author.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

window.handleSearchKeyUp = function handleSearchKeyUp(event) {
  if (event.key === 'Enter') {
    window.searchMusic();
  }
}

function displaySongs(results) {    
  // Clear existing song rows
  const songsContainer = document.querySelector('.songs-container');
  songsContainer.innerHTML = '';

  // Add new songs to the list
  results.forEach(song => {
    console.log('song', song);
    const row = document.createElement('div');
    row.className = 'song-row';
    row.innerHTML = `
      <h1>${song.title}</h1> <span>${song.duration}</span>
    `;
    row.setAttribute('data-video-id', song.id);
    row.addEventListener('click', () => {
      setPlayingSong(song);
    });
    songsContainer.appendChild(row);
  });
}

window.setPlayingSong = function setPlayingSong(song) {
  GetVideoAudioUrl(song.id).then((result) => {
    const audio = document.getElementById('song');
    audio.src = result;

    const cover = document.querySelector('.cover');
    const nowPlayingBanner = document.querySelector('.now-playing-banner');
    const nowPlayingTitle = document.querySelector('.now-playing-title');
    const nowPlayingImg = document.querySelector('.now-playing-img');
    cover.style.backgroundImage = `url(${song.thumb})`;
    nowPlayingImg.style.backgroundImage = `url(${song.thumb})`;
    nowPlayingBanner.innerHTML = `<p1><b>${song.title}</b>- ${song.author}</p1>`;
    nowPlayingTitle.innerHTML = `<h>${song.title}</h> <p>${song.author}</p>`;

    audio.play();
  }).catch((err) => {
    console.log(err);
  });
}

window.searchMusic = function searchMusic() {
  const searchInput = document.querySelector('.search-input');
  const searchTerm = searchInput.value.toLowerCase();
  
  if (searchTerm === '') return;

  try {
    SearchMusic(searchTerm).then((result) => {
      console.log(result);
      if (result.length < 0) {
        const results = searchMockMusic(searchTerm);
        displaySongs(results);
      } else {
        displaySongs(result);
      }
    }).catch((err) => {
      console.log('error searching music 1', err);
    });
  } catch (err) {
    console.error('error searching music 2', err);
  }
}

window.hideShow = function hideShow() {
  const cover = document.querySelector(".cover");
  const songList = document.querySelector(".song-list");
  const nowPlaying = document.querySelector(".now-playing-wrapper");
  const expandIcon = document.getElementById("expand");

  if (cover.style.display === "none") {
    // Show song list view
    cover.style.display = "block";
    songList.style.display = "flex";
    nowPlaying.style.visibility = "hidden";
    expandIcon.textContent = "keyboard_arrow_up";
  } else {
    // Show now playing view
    cover.style.display = "none";
    songList.style.display = "none";
    nowPlaying.style.visibility = "visible";
    expandIcon.textContent = "keyboard_arrow_down";
  }
}

var song = document.getElementById("song");

window.playAudio = function playAudio() {
  song.play();
}

window.pauseAudio = function pauseAudio() {
  song.pause();
}

var overlay = document.getElementById("nav");

window.openNav = function openNav() {
    const overlay = document.getElementById("nav");
    const playerWrapper = document.querySelector(".player-wrapper");
    overlay.style.width = "70%";
    playerWrapper.style.overflow = "hidden"; // Prevent scrolling when nav is open
}

window.closeNav = function closeNav() {
    const overlay = document.getElementById("nav");
    const playerWrapper = document.querySelector(".player-wrapper");
    overlay.style.width = "0";
    playerWrapper.style.overflow = "auto";
}

// Add click event listeners for nav items
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.overlay-content .row');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Handle navigation item click
            const action = item.textContent.trim().toLowerCase();
            console.log('Navigation action:', action);
            closeNav(); // Close nav after selection
        });
    });
});


