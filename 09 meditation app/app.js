// Meditation App

const song = document.querySelector('.song');
const play = document.querySelector('.play');
const replay = document.querySelector('.replay');
const outline = document.querySelector('.moving-outline circle');
const video = document.querySelector('.vid-container video');
// sounds
const sounds = document.querySelectorAll('.sound-picker button');
// time display
const timeDisplay = document.querySelector('.time-display');
// circle outline lenght
const outlineLength = outline.getTotalLength();
// duration
const timeSelect = document.querySelectorAll('.time-select button');
let fakeDuration = 600;

outline.style.strokeDasharray = outlineLength;
outline.style.strokeDashoffset = outlineLength;

// play sound
play.addEventListener("click", function () {
	checkPlaying(song);
});

// picked different sound
sounds.forEach(sounds => {
	sounds.addEventListener('click', function(){
		song.src = this.getAttribute('data-sound');
		video.src = this.getAttribute('data-video');
		checkPlaying(song);
	})
})


// select time
timeSelect.forEach(option => {
	option.addEventListener("click", function () {
		fakeDuration = this.getAttribute("data-time");
		timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
			fakeDuration % 60
		)}`;
	});
});

// play and stop sound
const checkPlaying = song => {
	if (song.paused) {
		song.play();
		video.play();
		play.src = 'svg/pause.svg';
	} else {
		song.pause();
		video.pause();
		play.src = 'svg/play.svg';
	}
};


// check time, animate circle & time text
song.ontimeupdate = () => {
	let currentTime = song.currentTime;
	let elapsedTime = fakeDuration - currentTime;
	let seconds = Math.floor(elapsedTime % 60);
	let minutes = Math.floor(elapsedTime / 60);

	let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
	outline.style.strokeDashoffset = progress;

	timeDisplay.textContent = `${minutes}:${seconds}`

	if(currentTime > fakeDuration) {
		song.pause();
		song.currentTime = 0;
		song.src = 'svg/play.svg';
		video.pause();
	}

}
