# 定位器    

適用場景會在手機上, 主要範例在介紹這組API. 

```javascript
navigator.geolocation.getCurrentPosition()
// 拿到當下的位置和經緯度

navigator.geolocation.watchPosition()
// 實時定位
```
[mdn補充](https://developer.mozilla.org/zh-TW/docs/Web/API/Geolocation/Using_geolocation)

### alex 補充

```javascript
// 如果要確認物件中是否有這個key, 哪一個方法比較好? 

var obj = {
    a: 1, 
    b: 2, 
    c: 3
}

Object.key => obj.a => 1
Object.hasOwnProperty('key') =>  obj.hasOwnProperty('a') // true or false
Object.keys(obj).indexOf('a') => // return 0 表示有, -1 表示沒有

​Object.keys() // 取所有key並轉回陣列
```
```javascript
lodash is equal. 

var cc = {
    a: function(){
        console.log(1)
    }, 
    b: {
        c: 2
    },
    c: 1
}

var dd = {
    a: {
        c: 2
    },
    b: function(){
        console.log(1)
    }, 
    c: 1
}

console.log(aa.sort() === dd.sort()) // false 

// 但是如果把 function 抽出改成共用, 再塞入進去是可以的.

function test(){
    console.log(1)
}


var cc = {
    a: test, 
    b: {
        c: 2
    },
    c: 1
}

var dd = {
    a: {
        c: 2
    },
    b:  test,
    c: 1
}


console.log(aa.sort() === dd.sort())// true
```




[此範例以Alex宅幹嘛的教學為主](https://www.youtube.com/watch?v=1oOxMR_LPb0)