# Array reference and Copying

## 主題:

面試必考題, call by reference. 

## 陣列實作淺拷貝

1. slice 
```javascript
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
const team = players.slice()
console.log(players === team) // false
```

2. concat 
```javascript
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
const team2 = [].concat(players)
console.log(players === team2) 
```

3. spread opreator(我自己最常用的)

```javascript
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
const team3 = [...players]
console.log(players === team3) 
```

4. Array.from 

這招也才常用來把類陣列轉變為陣列的用法, 例如用在querySelectorAll, 之後可以用這招把它轉變為陣列
當然如果後面的東西可以用forEach做掉就算了. 

```javascript
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
const team4 = Array.from(players)
console.log(players === team4) 
```

## 物件實作淺拷貝

Object.assign , 示範如果要增key和value的用法
```javascript
const person = {
    name: 'Wes Bos',
    age: 80
};

const team6 = Object.assign({}, person, {number:99})
console.log(team6) // 這樣就會增加{number: 99}
```
但是要記得這樣做的話只有一層複製

```javascript
const team6 = Object.assign({}, person)
const team7 = JSON.parse(JSON.stringify(person))
team7.social.facebook = '123'

console.table(team6, team7)
```

而`JSON.parse(JSON.stringly)`
如果是不帶fucntion就會做到深拷貝, 如果有帶可能就要用prototype去做


## alex 補充

```javascript
//數字
let g = 'A'
let h = 'A'
let i = 'A'

(h = 'B'), (i = 'C'), (g += h), (g += i)
console.log(g, h, i)

```

```javascript
// 字串
function createObj(name){
        return {
          name
        }
    }

let p1 = createObj('alex')
let p2 = createObj('sara')
let p3 = createObj('howard')
let p4= createObj('thor')

let f1 = [p1, p2, p3, p4]
let f2 = f1.slice()

f2[0].name = 'alexander';
f2[0] = {name: 'alexander'};

console.log(f1[0].name)
```

```javascript
// 物件
let person = {
    name: 'wes', 
    age: 80
}

let p2 = person

case 1: person = 'xxx'
console.log(person, p2)

case 2: person.name = 'xxx'
console.log(person, p2)
```

```javascript
// object.assign
let a = {name: 'alex', age: 36}
let b = {name: 'sara'}

// 後往前覆蓋
let c = Object.assign(a, b)

console.log(c)
// {name: 'sara', age: 36}
```

```javascript
// 概念, 未被收入到sheet中
let aa = {
    name: 'alex', 
    age: 36, 
    sayhi:function(){
        console.log('hi')
    }
}

aa.sayhi() // hi

let bb = JSON.parse(JSON.stringly(aa))

bb.sayhi()// undefined 

let cc = Object.assign({}, aa)

cc.sayhi() // hi

```
```javascript
// 直接看sheet, 這是obj.assign和json.parse(json.stringly)的比較

let wes = {
    name: 'wes', 
    age: 80, 
    social:{
        facebook:'wes', 
        twitter: 'wes developer'
    }
}
```

```javascript
let ary = [{a: 1}, {b: 2}, {c:3}]
ary.forEach(item =>{
    for(let key in item){
        console.log(key, item[key])
    }
})

//a 1
//b 2
//c 3
```

```javascript
let ary = [{a: 1}, {b: 2}, {c:3}]
ary.forEach((item, index) =>{
    Object.keys(item).forEach(key =>{
        console.log(index, key, item[key])
    })
})

//0 "a" 1
//1 "b" 2
//2 "c" 3
```


### 結論:

洋洋灑灑寫了一堆, 這場蠻值得的, 要常回來多看(腦袋清楚的時候...), 不敢說自己已經百分百掌握. 
總之概念就是要先存值, 在賦值, 往這個概念走就八九不離十, 存值比較重要的是, 如果沒有這個值, 得要開新的記憶體空間. 

[ans](https://docs.google.com/spreadsheets/d/11WNMzrYUtRxN5WOCDFtv5RzIKsKYEC_slBYtjMHkFDU/edit#gid=0)

[此範例以Alex宅幹嘛的教學和wes bros為主](https://www.youtube.com/watch?v=sxe-oahUARI)