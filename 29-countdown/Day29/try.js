;(function(){

    let timer;

    const timeLeft = document.querySelector('.display__time-left')
    const endTime = document.querySelector('.display__end-time')

    function startTimer(sec){
        const now = Date.now()
        const end = now + sec * 1000

        countDown(end)
        showTime(end)
        
    }


    function countDown(end) {
        clearInterval(timer)
        timer = setInterval(function () {
            let secLeft = (end - Date.now()) / 1000
            if (secLeft >= 0) {
                let displayMin = Math.floor(secLeft / 60)
                let displaySec = Math.floor(secLeft % 60)
                timeLeft.innerText = `${displayMin}:${displaySec}`
            } else {
                timeLeft.innerText = 'Happy Coding'
            }
        }, 1000)
        
    }
    


    function showTime(end) {
        // 這一步new Date在裡面傳參數是重點, 如果不傳就是現在的時間
        // 如果傳了就是以現在的時間加上參數的時間
        const endDate = new Date(end)
        let hour = endDate.getHours()
        let Min = endDate.getMinutes()
        Min = Min < 10 ? `0${Min}` : Min
        endTime.innerHTML = `Back to ${hour}: ${Min}`
    }


    const btns = document.querySelectorAll('button')
    btns.forEach(btn => btn.addEventListener('click', clickHandler))

    function clickHandler(e){
        const sec = parseInt(e.target.dataset.time)
        startTimer(sec)
    }

    const custom = document.getElementById('custom')
    custom.addEventListener('submit',submitHandler)

    function submitHandler(e){
        e.preventDefault();
        let inputValue = parseInt(this.querySelector('input').value)
        
        if(inputValue){
            startTimer(inputValue * 60)
            this.reset()
        }
        
    }

})()