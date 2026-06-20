const songs = [
{
    title: "Life of Ram",
    artist: "Pradeep Kumar",
    src: "life of ram.mp3"
},
{
    title: "Nenjukkul Peidhidum",
    artist: "Hariharan",
    src: "nejjukul peidhidum.mp3"
},
{
    title: "The Life of Pazham",
    artist: "Anirudh",
    src: "life of pazham.mp3"
}
];

let currentSong = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const album = document.getElementById("album");
const playlist = document.getElementById("playlist");

function loadSong(index){
    audio.src = songs[index].src;
    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;
    audio.load();
}

loadSong(currentSong);

function playPause(){
    if(audio.paused){
        audio.play();
        playBtn.textContent = "⏸";
        album.classList.add("rotate");
    }else{
        audio.pause();
        playBtn.textContent = "▶";
        album.classList.remove("rotate");
    }
}

function nextSong(){
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    audio.play();
    playBtn.textContent = "⏸";
    album.classList.add("rotate");
}

function prevSong(){
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    audio.play();
    playBtn.textContent = "⏸";
    album.classList.add("rotate");
}

audio.addEventListener("loadedmetadata", () => {
    progress.max = audio.duration;
    document.getElementById("duration").textContent =
    formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    progress.value = audio.currentTime;

    document.getElementById("current").textContent =
    formatTime(audio.currentTime);
});

progress.addEventListener("input", () => {
    audio.currentTime = progress.value;
});

volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

audio.addEventListener("ended", nextSong);

function formatTime(time){
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);

    if(sec < 10){
        sec = "0" + sec;
    }

    return `${min}:${sec}`;
}

songs.forEach((song,index) => {

    const li = document.createElement("li");

    li.textContent = `${song.title} - ${song.artist}`;

    li.addEventListener("click", () => {
        currentSong = index;
        loadSong(index);
        audio.play();
        playBtn.textContent = "⏸";
        album.classList.add("rotate");
    });

    playlist.appendChild(li);

});