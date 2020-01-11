# Countdown Timer

一開始看wesbos的作法就和我不一樣, 但是alex起手式跟我差不多!
覺得這個範例很好, 因為我覺得我對於API的處理已經蠻熟的
但是對於coundown說真的不是很懂

## 主題:

## CSS語法&備註

## JavaScript語法&備註

```JavaScript
// 整體的code和備註
;(function(){

    let timer; 

    const timeLeft = document.querySelector('.display__time-left')
    const endTime = document.querySelector('.display__end-time')

    const startTimer = function(sec){
        const now = Date.now()
        // now的單位是毫秒, 所以sec要乘上1000
        const end = now + sec * 1000

        // 倒數計時
        setCountDown(end)

        // 顯示時間還剩下多少時間
        showEndTime(end)
    }

    function setCountDown(end){
        // 這個clear寫在這邊是因為我點選別的時間, 就會把現在的時間去除掉
        clearInterval(timer)
        // 要針對setInterval加上name才可以清除掉
        timer = setInterval(function () {
            const secLeft = Math.floor((end - Date.now()) / 1000)
            if (secLeft >= 0) {
                const displayMin = Math.floor(secLeft / 60)
                let displaySec = secLeft % 60
                // 補零
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
        
        // 真正的值是建立在input form上而不是form表上
        const value = parseFloat(this.minutes.value)

        // 然後因為怕會出現NaN就沒有辦法經過判斷
        // 因為前面的範例都是以秒為單位, 所以這邊要乘上60

        if(value){
            startTimer(value * 60)
            this.reset()
        }
    }

})()


```

```JavaScript

// 會hoisting
var setTimer = function (){

}

// hoisting 
function setTimer(){
    
}


// 不會hosting, TDZ, 宣告式的方法命名
const setTimer = function (){
    
}

console.log(1)
//紫色的, 數字

console.log('1')
//白色的, 文字

```

## getTime 寫法

1. `new Date().getTime()`
2. `+new Date()`
4. `new Date().valueOf()`
3. `Date.now()`

## innerText, innerHTML, textContent 

innerHTML 相容性最佳
innerText的相容性比較差
textContent更差

## switch的簡化

```JavaScript
function tet(aa){
    switch (aa) {
        case 1:
            A()
            break;
        case 2:
            B()
            break;
        case 3:
            C()
            break;  
        default:
            D()
            break;
    }
}

---
// 這個也太高級了吧...
const switchMap = {
    1: A,
    2: B, 
    3: C
}

function tet(aa){
    if(switchMap[aa]) switchMap[aa]();
    else D();
}

```

## requestAnimationFrame

畫面類的動畫效果. 搭配canvas. 不用設定時間.
一般功能用setTimeout.

```JavaScript
let limit = 100

const rafCallback = function (){
    console.log(limit)
    if(limit > 0){
        limit -- 
        requestAnimationFrame(rafCallback)
    }
}
```
`requestAnimationFrame(cb)` 這個在用的時候, 裡面要傳一個cb. 
這是在走硬體的更新頻率(fps), 所以每16毫秒就更新一次. (1000/60)

透過`requestAnimationFrame`改寫
```JavaScript
function setAnimationFrame(end){
    window.cancelAnimationFrame(timer)
    timer = window.requestAnimationFrame(function(){
         const secLeft = Math.floor((end - Date.now()) / 1000)
            if (secLeft >= 0) {
                const displayMin = Math.floor(secLeft / 60)
                let displaySec = secLeft % 60
                displaySec = displaySec < 10 ? "0" + displaySec : displaySec
                timeLeft.innerText = `${displayMin}:${displaySec}`
                setAnimationFrame(end)
            } else {
                timeLeft.innerText = 'Happy Coding!!!'
                 window.cancelAnimationFrame(timer)
            }
    })
}
```

[此範例以Alex宅幹嘛的教學和wes bros為主](https://www.youtube.com/watch?v=ucqq20gVBic&t=8s)