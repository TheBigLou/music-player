const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress  = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music array
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design'
    },
    {
        name: 'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Metric/Jacinto Design'
    }
];
const lastSong = songs.length - 1;

// Init with a random song
let songIndex = Math.floor(Math.random() * (songs.length - 1) + Math.random());

// Check if song currently playing
let isPlaying = false;

// Play song function
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause song');
    music.play();
}

// Pause song function
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play song');
    music.pause();
}

// Play or pause event listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Calculate duration of song
function calcDuration() {
    // Calculate display for duration
    const duration = music.duration;
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
    }
    // Delay duration element display to avoid NaN
    if (durationSeconds) {
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
}

// Update progress bar and time
function updateProgressBar(e) {
    const { duration, currentTime } = e.srcElement;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`
    // Display current time
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
    }
    // Delay element display to avoid NaN
    if (currentSeconds) {
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Set progress bar
function setProgressBar(e) {
    const width = this.clientWidth; // in this case, 'this' refers to the element that received the click event, which called setProgressBar() -- i.e. progressContainer
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = clickX / width * duration;
}

// Previous song
function prevSong() {
    progress.style.width = '0%';
    songIndex--;
    if (songIndex < 0) {
        songIndex = lastSong;
    }
    loadSong(songs[songIndex]);
    if (isPlaying) {
        playSong();
    }
}

// Next song
function nextSong() {
    progress.style.width = '0%';
    songIndex++;
    if (songIndex > lastSong) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    if (isPlaying) {
        playSong();
    }
}

// On load
loadSong(songs[songIndex]);

// Event listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('durationchange', calcDuration);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgressBar);