//var items = document.querySelectorAll("[data-key]")
// var key = document.querySelectorAll('.key')
// console.log(key)

//轉換為陣列

window.addEventListener('keydown', playSound)
var keys= [...document.querySelectorAll('.key')]

keys.forEach(key => key.addEventListener('transitionend', removeTransition))
keys.forEach(key => key.addEventListener('click', playSound))

function playSound(e) {
    var keyCode = e.keyCode || this.dataset.key 
    console.log(e.keyCode)
    var audio = document.querySelector(`audio[data-key="${keyCode}"]`)
    var key = document.querySelector(`.key[data-key="${keyCode}"]`)

    key.classList.add('playing')

    if (!audio) return;
    audio.currentTime = 0
    audio.play()
}

function removeTransition(e){
    if(e.propertyName !== "transform") return 
    this.classList.remove('playing')
}

