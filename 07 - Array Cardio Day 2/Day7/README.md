# Array Cardio Day 1

## 主題:

### 練習1:
is at least one person 19 or older?

is everyone 19 or older?

我這邊是使用ES6的語法, 寫起來直覺也更簡潔

```javascript
const isAdult = people.some(item => ((new Date().getFullYear() - item.year) >= 19 )
console.log(isAdult)// true
```

```javascript
const allAdult = people.every(item => ((new Date().getFullYear()- item.year) >= 19)
console.log(allAdult) //false
```
其實兩個寫起來都一樣, 但是有不同的結果, 這就是表示用不同函式會有不一樣的結果
值得一提的是, 他是輸出false, true, 這樣前面也要透過新的變數存取喔!

---
### 練習2:
find the comment with the ID of 823423

find很像是filter, 但是不會回傳剩餘的陣列給你, 而是回傳找到符合的第一項.
所以如果有兩筆資料一樣, 也只會找到第一筆. 
簡單來講, 就是找本體.

```javascript
const comment = comments.find(comment => comment.id === 823423)
console.log(comment.text)// super good 
```

常用場景:
檢查購物車有沒有特定項目, 有的話可以在做其他操作, 例如更新.

### 練習3:
Find the comment with this ID
delete the comment with the ID of 823423

這題順便練習了, 拿到index後怎麼刪除資料這件事

```javascript
const index = comments.findIndex(comment => comment.id === 823423)
console.log(index) //1 
```

常用場景:
檢查購物車有沒有特定項目, 有的話可以在做其他操作, 例如刪除.

### slice, splice 整理

改變原本的結構, 就像是push一樣
```javascript
comments.splice(index, 1) 
console.log(comments)
```
那被刪掉怎麼辦? 除非把它給記下來!
```javascript
const ans = comments.splice(index, 1) 
console.log(ans) // {text: "Super good", id: 823423}
```

不改變原本的結構
```javascript
const newComments = [
    ...comments.slice(0, index)
    ...comments.slice(index+1)
]
console.log(newComments)
```

alex 示範的解法, 好像更容易理解, 雖然是一樣的東西...

```javascript
const ans1 = comments.slice(0 , index)
const ans2 = comments.slice(index + 1)
const ans3 = [...ans1, ...ans2]
```
另外在框架操作上, 建議的作法是資料先複製, 在進行操作. 
資料來源最好都是從server端拿, 而不是直接改變資料庫的東西

```javascript
const ans4 = [...comments].splice(ans3, 1)
```

### 額外補充

```javascript
let cart = [
    {id : 1, count : 1},
    {id : 2, count : 1},
    {id : 3, count : 1},
    {id : 4, count : 1}
]
```
更新id: 3的數量變成5

```javascript
const item = cart.find(item => item.id === 3)
item.count = 5 
console.log(cart)
```

```javascript
let newCart = [...cart]
newCart[0].count = 5 
console.log(cart[0], newCart[0]) //兩者相同
```

```javascript

let obj1 = {count : 1} // 5 
let obj2 = obj1 // 5 
let obj3 = object.assign({}, obj2)
obj1.count = 5  
let obj4 = JSON.parse(JSON.stringly(obj3))

console.log(obj1.count + obj2.count + obj3.count + obj4.count) //16


```
[講解](https://www.youtube.com/watch?v=OdNA37WSwzc&t=51m34s)

---

## 結語

以下的methods會回傳什麼?

some -> true/false  
every -> true/false  
find -> 回傳值  
findIndex -> 回傳值

[此範例以Alex宅幹嘛的教學和wes bros為主](https://www.youtube.com/watch?v=OdNA37WSwzc&t=10m10s)