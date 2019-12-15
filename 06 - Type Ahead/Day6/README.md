#Type Ahead

## 主題:

利用fetch()來取回json檔案，並透過filter()及RegExp()等語法來製作搜尋即時顯示關聯效果！

這題我又誤會了, 這邊要實現的是可以動態產生資料, 例如說我輸入"B", 那就有100筆, 我輸入"BO", 就有10筆, 輸入"BOS", 出現2筆. 資料是動態產生出來的. 

我原本的作法是把資料都先掛在上面, 透過輸入的值, 來HL顏色, 但其實這樣做不對, 等於說資料一直都在那邊等著被HL

廢話不多說, 這個範例也學到很多, 下面來講解下

## JavaScript語法&備註

### fetch 
透過fetch回傳的不是data, 而是promise, 因此可以用then繼續追續下去, 這有點像是cb的概念. 

```javaScript
fetch(endpoint)
  .then(res => res.json()) 
  .then(data => console.log(data))
```
另外如果我要給整筆資料命名可以怎麼做?
這邊不知道為什麼有兩種方法, 也是坐等alex解釋

方法1: 
```javaScript
//和var的差別在於作用域, let的作用域是block
let cities = null

fetch(endpoint)
  .then(res => res.json()) 
  .then(data => (cities = data))
  //.then(data => (data = cities)) 這樣就不行, 因為程式是從右邊讀到左邊
```

方法2: 運用展開式, 代表說我只要data的資料
```javaScript
// const 代表資料無法在做變動, 所以不能重新賦予值(pass by reference), 但是可以透過push改變裡面的值
const cities = []

fetch(endpoint)
  .then(res => res.json()) 
  .then(data => cities.push(...data))
```
### 正則運算式(regular expression)(RegExp)

g: 全域搜尋
i: 不分大小寫

搭配replace使用
在一般來說replace只會改變第一個string 

```javaScript
let a = 'Norris Wu'
a.replace('r','R')
console.log(a) // "NoRris Wu"
```
透過正則運算式

```javaScript
let a = 'Norris Wu'
let regexp = new RegExp('r', 'gi')// 注意大小寫
a.replace(regexp,'R')

console.log(a) // "NoRRis Wu"
```

### toLocaleString()

返回这个数字在特定语言环境下的表示字符串
但是在這邊還是無法使用, 因為原始資料是用string, 不是用數字

```javaScript
var number = 3500;

console.log(number.toLocaleString()); // Displays "3,500" if in U.S. English locale

```

> [toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString)

### 函式的執行順序

let a = 1
是先`let a`, 還是先執行 `a = 1`???


[此範例以Alex宅幹嘛的教學和wes bros為主](https://www.youtube.com/watch?v=_TbG2iuN9kM)