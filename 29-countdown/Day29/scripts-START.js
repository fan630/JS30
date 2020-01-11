;(function(){

    let timer; 

    const timeLeft = document.querySelector('.display__time-left')
    const endTime = document.querySelector('.display__end-time')

    const startTimer = function(sec){
        const now = Date.now()
        const end = now + sec * 1000

        setCountDown(end)

        showEndTime(end)
    }

    function setCountDown(end){
        clearInterval(timer)
        timer = setInterval(function () {
            const secLeft = Math.floor((end - Date.now()) / 1000)
            if (secLeft >= 0) {
                const displayMin = Math.floor(secLeft / 60)
                let displaySec = secLeft % 60
                displaySec = displaySec < 10 ? "0" + displaySec : displaySec
                timeLeft.innerText = `${displayMin}:${displaySec}`
            } else {
                timeLeft.innerText = 'Happy Coding!!!'
                clearInterval(timer)
            }
        }, 1000)
    }

    function showEndTime(end){
        const endDate = new Date(end)
        let hour = endDate.getHours()
        let min = endDate.getMinutes()
        min = min < 10 ? "0" + min : min
        endTime.innerText = `Back at ${hour}:${min}`
    }


    const btns = Array.from(document.querySelectorAll('button'))
    btns.forEach(btn => btn.addEventListener('click', clickHandler))

    function clickHandler(e){
        let sec  = parseInt(e.target.dataset.time)
        startTimer(sec)
        
    }

    document.getElementById('custom').addEventListener('submit', sumbitHandler)

    function sumbitHandler(e){
        e.preventDefault();
        
        const value = parseFloat(this.minutes.value)

        if(value){
            startTimer(value * 60)
            this.reset()
        }
    }

})()