# Array Cardio Day 1

## 主題:

今天練習超棒的！ 讓我更了解了, filter, map, sort, reduce的用法


### 練習1:
Filter the list of inventors for those who were born in the 1500's 

我這邊是使用ES6的語法, 寫起來直覺也更簡潔
```javascript
const inventor = inventors.filter(item => item.year >= 1500 && item.year < 1600)
console.table(inventor)
```
---
### 練習2:
Give us an array of the inventors' first and last names
這題我把他各自轉為陣列的形式, 但其實用string就可以了

```javascript
const inventor = inventors.map(item =>[item.first,item.last])
console.table(inventor)
```
```javascript
const inventor = inventors.map(item => `${item.first} ${item.last}`)
console.table(inventor)
```
作者有提到map像是工廠一樣, 輸入和輸出的數量都是一樣的, 只是輸出的東西會經過加工

#### forEach比較

```javascript
const ans = []
const inventor = inventors.forEach(item => ans.push(item.first + '' + item.last))
console.table(ans) // undefined. 
```
會出現`undefined`最簡單的原因是他沒有辦法回傳, 比較像是對每一個item做一件事, 就像對每一個item都加上`addEventListenr`, 最簡單的差別就是產不產生陣列, 另外forEach比較難控制順序問題.

```javascript
const ans = []
inventors.forEach(item => ans.push(`${item.first } ${item.last}`))
console.table(ans)
```

---
### 練習3:
Sort the inventors by birthdate, oldest to youngest

先透過map把他轉成只有year的陣列, 再透過sort反轉
```javascript
const inventor = inventors.map(item => item.year).sort((a,b) => b-a)
console.log(inventor)
```
作者的作法更好, 不用先透過map, 直接用三元運算子做判斷, 這樣可以顯示出所有的人物
```javascript
const inventor = inventors.sort((a,b) => a.year > b.year ? 1 : -1)
console.table(inventor)
```

alex的作法, 用數值相減會比較穩定一點, 因為可以判斷到相減等於0的部分
```javascript
const inventor = inventors.sort((a,b) => b.year - a.year)
console.table(inventor)
```

#### sort補充

sort的概念就是抽兩個東西比較, 相減出來的結果可能會 <0, ==0 , >0
==0 順序不移動
<0的擺前面
>0的交換位置, b就擺在前面, a就擺在後面

以往sort會因為資料的不同而有所謂穩定排序(每次排出來資料都一樣)和非穩定排序
在chrome已經更新到穩定排序.

---

### 練習4:
How many years did all the inventors live?

這題我不太確定作者的意思是說把所有人的歲數做累加嗎? 
所以我先個別算出每一個人活了幾年, 在全部累加.

```javascript
const inventor = inventors.map(item => (item.passed - item.year))
console.log(inventor)
const reducer = ((x, y) => x + y)
var result = inventor.reduce(reducer)
console.log(result) // 861
```

作者的作法

```javascript
const totolYear = inventors.reduce((total, inventor) =>{
    return total + (inventor.passed - inventor.year)
}, 0)

console.log(totolYear) // 861

1 => total = 0, inventor = { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 }
2 => totoal = 0 + (1955 - 1879), inventor = { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
3 => total = 0 + (1955 - 1879) + (1727 - 1643) , inventor = { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 }, 
```

### reduce 

第一段是要去執行的funciton, 第二段是初始
```javascript
const reducer = inventors.reduce(()=>{},0)
```
---

### 練習5:
Sort the inventors by years lived(大到小)

我的作法是先透過map, 把歲數都列出來, 再透過sort來排序

```javascript
const inventor = inventors.map(item => (item.passed - item.year)).sort((a,b) => a-b)
console.log(inventor)
```

```javascript
const oldest = inventors.sort((a, b) =>{
    const lastGuy = a.passed - a.year
    const nextGuy = b.passed -b.year 
    return lastGuy > next ? -1 : 1 
})
console.table(oldest)
```

alex的作法, 更直覺更好懂
```javascript
const oldest = inventors.sort((a, b) =>{
    return (a.passed - a.year) - (b.passed - b.year)
})
console.table(oldest)
```

---

### 練習6: 
create a list of Boulevards in Paris that contain 'de' anywhere in the name => 這題不會

這題我連題目都搞錯了, 我以為是在說上面的people陣列...原來是要在頁面上透過dom啊....

https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris

```javascript
const category  = document.querySelector('.mw-category')
const links = Array.from(category.querySelectorAll('a')) //這邊學到我要query可以不用透過document直接在dom在搜尋一次就好了....
const de = links
        .map(item => item.textContent) // 此時的item其實就是item.textContent
        .filter(item => item.includes('de'))
console.log(de)
```

alex的做法

```javascript
let ary = []
document.querySelectorAll('.mw-category li a').forEach((a) =>{
    return ary.push(a.title)
})
// 透過forEach先把它轉成陣列

let ans = ary.filter(title => title.indexOf('de') !== -1)

```

---
### 練習7: 

Sort the people alphabetically by last name

這邊先來科普一下, lastname是姓氏, 所以一般去旅館登記, 都是 lastname, firstname, 例如 WU, JUO-FAN
所以這題的意思就是, 第一個姓氏要按照英文字母順序排列

```javascript
const alpha = people.sort((lastOne, nextOne)=>{
    const [aLast, aFirst] = lastOne.split(', ') 
    const [bLast, bFirst] = nextOne.split(', ')
    return aLast > bLast ? 1: -1
})

console.table(alpha)
```
alex的作法
```javascript
const alpha = people.sort((lastOne, nextOne)=>{
    const [aLast, aFirst] = lastOne.split(', ') 
    const [bLast, bFirst] = nextOne.split(', ')
    //連續的三元運算子
    return aLast > bLast ? 1: bLast > aLast ? -1 : 0
    
    //可以看成這樣
    // if(aLast > bLast){
    //     return 1
    // }else if(bLast > aLast){
    //     return -1 
    // }else{
    //     0
    // }

})

console.table(alpha)
```

這邊先在sort裡面放入兩個名稱, 例如 "Beck, Glenn" 和 "Becker, Carl" 
因為都是在陣列裡面, 所以透過解構, 把lastOne改為字串 => Beck, Glenn, nextOne同理
最後在透過三元運算子按照字母順序排列

### 補充- 解構賦值

把切出來的東西做快速命名

```javascript
const ary = 'a, b, c, d, e'
ary.split(',')
console.log(ary) // ['a', 'b', 'c', 'd', 'e']

const [first, second, ...third] = ary.split(',')
console.log(first) = 'a'
console.log(second) = 'b'
console.log(third) = ["c", "d", "e"]

```
### 12/14 更新
可以這樣看, 一開始的時候先放入兩組不確定的名稱
例如
```
{ first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
{ first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
```
但其實我只要他的前面兩個名稱而已, 所以這邊才用解構的方式拿取.


---

### 練習8: 

Sum up the instances of each of these  
這題就是可以做出一個function算出說重複的字串有多少個? 
我直接放棄, 直接參考了[stackoverflow](https://stackoverflow.com/questions/19395257/how-to-count-duplicate-value-in-an-array-in-javascript)的答案

但是作者的作法實在太神了!!!

```javascript
const transportation = data.reduce(function(obj, item){
    if(!obj[item]){
        obj[item] =0 
    }
    obj[item]++
    return obj
}, {})

console.log(transportation)
```

這題關鍵就是要讓他最後的形式變為物件. 所以裡面要帶上兩個參數`obj`, `item`
這邊用到的作法是透過`obj[key]`來提取物件中的值

```javascript
obj = {
    car: 0, 
    walk: 0, 
}
```

先判斷是否有這個key, 若是沒有就設定為0, 最後再以物件的形式匯出. 

## 結語

最後作者提到如果你有點shaky, 需要繼續一而再的練習. 
對我來說最不熟的就是sort和reduce...

以下的methods會回傳什麼?

filter -> 陣列  
map -> 陣列  
forEach -> undefined   
sort -> 陣列  
reduce -> 值

[此範例以Alex宅幹嘛的教學和wes bros為主](https://www.youtube.com/watch?v=8JzVwrzkUrM)