#  Adding Up Times with Reduce

## 主題:

今天練習其實我根本看不懂要幹嘛, 所以我就來練習把所以的`data-time`
這個`attribute`加上到每一個item上而已, 只能說`console.dir`真是好用
有時候忘記要用什麼功能, 在裡面查下就好了

這邊又體悟到一點, 如果我在箭頭函式無法一行解決, 那就會加上 `=>{
  //裡面記得要再放上 return
}`

### 練習1:

 ```javascript
    const videos = document.querySelector('.videos')
    const video = Array.from(videos.children).map(item => {
      item.innerHTML = `<li>${item.innerText} 播放時間: ${item.dataset.time}</li>`
    })
```
---
### 練習2: 取得所有時間的加總數字

這部分其實我大概想的7788, 但是reduce操作不太熟, 然後split蠻帥的做完字串切割以後直接解構es6
另外是直接透過map裡面轉換成number蠻帥的

```javascript
    const videoTotal  = Array.from(videos.children).reduce((totalTime, item)=>{
        // 這一段很猛, 做完字串切割以後, 在全部換成數字
        const timeCode = item.dataset.time.split(':').map(parseFloat)
        // es6解構取得min, sec的值
        const [min, sec] = timeCode
        return totalTime + min * 60 + sec
    }, 0)

    let videoTotalLeft = videoTotal 
    const hours = Math.floor(videoTotalLeft / 3600)
    // 這邊一直在代換數字, 取得餘數
    videoTotalLeft = videoTotalLeft % 3600 

    const mins =  Math.floor(videoTotalLeft / 60)
    // 這邊一直在代換數字, 取得餘數
    videoTotalLeft = videoTotalLeft % 60 

    console.log(hours, mins, videoTotalLeft)
```

### alex 補充

```javascript
const li = document.querySelectorAll('li')
// 第一種
Array.from(li.map(item => item))

// 第二種
[...li].map(item => item)

// 第三種
[].map.call(li, (item) => item)

// 第四種, apply要用陣列
[].map.apply(li, [item] => item)

```

#### reduce補充
講難聽點, 必學拉...

```javascript
const ans = ans.reduce((prev, next)=>{

}, //0, [], {})

```
預設值不傳, 是抓陣列第一個值當預設值

其他情景:
例如可以用到物件轉陣列 

### forEach vs for loop
兩者相比不如寫forEach, forEach沒辦法加入條件式, 中斷forEach

```javascript
let array = [1, 2, 3, 4, 5]
let xx = 0 

array.forEach(item => {
   xx += item 
   if(item === 3) return false
   return xx
})
// 答案是15, 而不是中間中斷過後變成 6
console.log(xx) // 15

==forEach(item, index)==
//裡面可以傳 index!!!, 那我這樣還用for迴圈幹嘛！！

```

### 時間算法

用秒數推算
12345秒 

12300 + 45(sec)

205分鐘 + 45(sec)

3.416hour + 45(sec)

3 hour + 25 min + 45s
---


## 結語

這有空再看吧....
```javascript
// 因為改變了陣列長度, 所以forEach就中斷了, 然後把取得到的值, concat到新的記憶體陣列中
// 所以和原本的array是不一樣的

var array = [1, 2, 3, 4, 5];
array.forEach(function(item, index) {
    if (item === 2) {
        array = array.concat(array.splice(index, array.length - index));
    }
    console.log(item); //只输出1,2
});
```

[神奇改數大法!](https://jser.me/2014/04/02/%E5%A6%82%E4%BD%95%E5%9C%A8Array.forEach%E7%9A%84%E5%BE%AA%E7%8E%AF%E9%87%8Cbreak.html)

[此範例以Alex宅幹嘛的教學和wes bros為主](https://www.youtube.com/watch?v=fOZGTOTKHXs#t=16m57s)
