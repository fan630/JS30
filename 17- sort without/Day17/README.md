# Sort Without Articles

## 主題:

今天練習讓我悟出了, 原來array遍歷完後是string. 

但是尷尬的是一開始我會錯意, 以為是要刪除包含"The", "An", "A"的字串, 結果是要把裡面包含"The", "An", "A"的字串刪掉, 重新排列成新陣列...(將陣列在排除部分文字的情況下排序), 其實一開始我有想到是要用replace, 但是replace只能一次篩選到一個string, 所以我想說透過&&, 結果無效...答案是要用『正則』

### 練習1:

#### 要把The, An, A開頭的資料篩選掉

 ```javascript
 // 先透過filter並從中把包含那三組字串的刪除掉
 const bandsSorts = 
    bands
        .filter(band => band.search("The") && band.search("An") && band.search("A"))
            .map(band => `<li>${band}</li>`).join('')
 const bandsItems = document.querySelector('#bands')
 bandsItems.innerHTML = bandsSorts
```
---
### 練習2:

```javascript
// 一開始我的作法
const bandsSorts = bands.map(bands => bands.replace('The','')&&bands.replace('An', '')&&bands.replace('A', ''))
console.log(bandsSorts)
```

```javascript
function strip(bandName) {
  // 開頭如果是a, the, an 就把他替換成空字串, 這個i是不區分大小寫的意思
  return bandName.replace(/^(a |the |an )/i, '').trim();
}

```

#### sort補充

sort的概念就是抽兩個東西比較, 相減出來的結果可能會 <0, ==0 , >0
==0 順序不移動
<0的擺前面
>0的交換位置, b就擺在前面, a就擺在後面

以往sort會因為資料的不同而有所謂穩定排序(每次排出來資料都一樣)和非穩定排序
在chrome已經更新到穩定排序.

```javascript
"a" > "b" // false
// why? 
"a".charCodeAt()// 97
"b".charCodeAt()// 98
// 所以是false 

// 那"abc" 和 "abd" => "abc" < "abd"
// 中文字也可以比
// 也可以透過String.fromCharCode回推
```
那sort完後的陣列和原本的陣列是一樣的嗎? 是的！！

```javascript
const sortedBands = [...bands].sort((a, b) => strip(a) > strip(b) ? 1 : -1);
console.log(sortedBands ==== bands) // false
```

---


## 結語


[此範例以Alex宅幹嘛的教學和wes bros為主](https://www.youtube.com/watch?v=_fG7bQTSQ6M&t=15m47s)