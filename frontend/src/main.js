import './style.css';

import {SearchMusic, GetVideoAudioUrl} from '../wailsjs/go/main/App';

// Mock data for music
const mockMusicData = [
  {
    ID: "dQw4w9WgXcQ",
    Title: "Rick Astley - Never Gonna Give You Up",
    Thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/default.jpg",
    Author: "Rick Astley",
    Views: "1234567890",
    Duration: "3:32"
  },
  {
    ID: "JGwWNGJdvx8",
    Title: "Ed Sheeran - Shape of You",
    Thumbnail: "https://i.ytimg.com/vi/JGwWNGJdvx8/default.jpg",
    Author: "Ed Sheeran",
    Views: "987654321",
    Duration: "3:53"
  },
  {
    ID: "kJQP7kiw5Fk",
    Title: "Luis Fonsi - Despacito ft. Daddy Yankee",
    Thumbnail: "https://i.ytimg.com/vi/kJQP7kiw5Fk/default.jpg",
    Author: "Luis Fonsi",
    Views: "876543210",
    Duration: "4:41"
  },
  {
    ID: "RgKAFK5djSk",
    Title: "Wiz Khalifa - See You Again ft. Charlie Puth",
    Thumbnail: "https://i.ytimg.com/vi/RgKAFK5djSk/default.jpg",
    Author: "Wiz Khalifa",
    Views: "765432109",
    Duration: "3:58"
  },
  {
    ID: "9bZkp7q19f0",
    Title: "PSY - GANGNAM STYLE",
    Thumbnail: "https://i.ytimg.com/vi/9bZkp7q19f0/default.jpg",
    Author: "PSY",
    Views: "654321098",
    Duration: "4:13"
  }
];

const songsContainer = document.querySelector('.songs-container');

mockMusicData.forEach(song => {
  const row = document.createElement('div');
  row.className = 'song-row';
  row.innerHTML = `
    <h1>${song.Title}</h1> <span>${song.Duration}</span>
  `;
  row.setAttribute('data-video-id', song.ID);
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
  songsContainer.removeChild(songsContainer.firstChild);

  // Add new songs to the list
  results.forEach(song => {
    console.log('song', song);
    const row = document.createElement('div');
    row.className = 'song-row';
    row.innerHTML = `
      <h1>${song.Title}</h1> <span>${song.Duration}</span>
    `;
    row.setAttribute('data-video-id', song.ID);
    row.addEventListener('click', () => {
      setPlayingSong(song);
    });
    songsContainer.appendChild(row);
  });
}

window.setPlayingSong = function setPlayingSong(song) {
  GetVideoAudioUrl(song.ID).then((result) => {
    const audio = document.getElementById('song');
    audio.src = result;

    const cover = document.querySelector('.cover');
    const nowPlayingBanner = document.querySelector('.now-playing-banner');
    const nowPlayingTitle = document.querySelector('.now-playing-title');
    const nowPlayingImg = document.querySelector('.now-playing-img');
    cover.style.backgroundImage = `url(${song.Thumbnail})`;
    nowPlayingImg.style.backgroundImage = `url(${song.Thumbnail})`;
    nowPlayingBanner.innerHTML = `<p1><b>${song.Title}</b>- ${song.Author}</p1>`;
    nowPlayingTitle.innerHTML = `<h>${song.Title}</h> <p>${song.Author}</p>`;

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
      const results = searchMockMusic(searchTerm);
      displaySongs(results);
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


