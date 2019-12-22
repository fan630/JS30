// dom
var toggles = document.querySelector('.toggles')
var viewer = document.querySelector('.viewer')
var sound = document.querySelector('input[name="volume"]')
var playback = document.querySelector('input[name="playbackRate"]')
var skipButton = document.querySelectorAll('[data-skip]')
var progressBar = document.querySelector('.progress__filled')
var progress = document.querySelector('.progress')
var fullscreen = document.querySelector('.fullscreen')

// funciton 

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggles.textContent = icon;
}
function updateClick(){
    viewer.paused ? viewer.play():viewer.pause() 

    // if(viewer.paused){
    //     return toggles.innerText = '||'
    // }else{
    //     return toggles.innerText = '►'
    // }
}

function updateVolume(){
    // console.log(viewer.volume)
    viewer.volume = sound.value/1
}
function updatePlayback(){
   viewer.playbackRate = playback.value/1
}
function handleButton(){
    viewer.currentTime += Number(this.dataset.skip)
}

// 影片和進度條同步, 所以是要監聽影面的timeupdate
function updateProgress(e) {
    const percent = (viewer.currentTime / viewer.duration) * 100;
    //progressBar.style.flexBasis = `${percent}%`;
    progressBar.setAttribute('style', `flex-basis:${percent}%`)
}

function drag(e) {
    const dragTime = (e.offsetX / progress.offsetWidth) * viewer.duration
    viewer.currentTime = dragTime
}

function fullscreenUpdate(){
    viewer.requestFullscreen()
}

// listener
toggles.addEventListener('click', updateClick)
viewer.addEventListener('click', updateClick)

viewer.addEventListener('play', updateButton);
viewer.addEventListener('pause', updateButton);
viewer.addEventListener('timeupdate', updateProgress)

skipButton.forEach(item => item.addEventListener('click', handleButton))
sound.addEventListener('change',updateVolume)
playback.addEventListener('change', updatePlayback)

progress.addEventListener('click', drag)

fullscreen.addEventListener('click',fullscreenUpdate)








