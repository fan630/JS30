# Flex panel

![](./css_flex.png)

## 主題:
用CSS與JS來製作一個點擊後會動畫展開的圖片展示效果，
透過多層flexbox進行排版和CSS transform, transition效果

## 步驟:

### Step1: 

由於整體HTML的tag是由1個panels包覆5個panel，
為了使其設定為flex，先在外層容器panels加上display: flex
接著為每個panel加上flex: 1來使各子元件最大占比為1
也就會變成同容器中的5個元件都設1，那就是每個元件最大占比為20%。

### Step2:
因為這時候字都置中在上一層, 所以還要對panel設定flex, 讓整坨p可以垂直並置中

```css
.panel{
  display: flex; 
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
```

### Step3:

但此時還有沒有完成, 在原始Demo上是各佔1/3, 並且每一個item都是垂直置中.

```css
.panel > * {
    /* flex的簡寫，第一個為占比、第二個為壓縮值、第三個為默認尺寸 */
    flex: 1 0 auto; 
    display: flex; 
    justify-content: center;
    align-items: center;
}
```

### Step4:

接下來要針對p的上, 下半部設定屬性, 在原本的狀況應該都是要消失不見. 
所以設定如下

```css
  .panel > *:first-child{
      transform: translateY(-100%);
  }
  
  .panel > *:last-child{
      transform: translateY(100%);
  }
```
並假設如果加上class後可以保持原位
```css
  .panel.open-active > *:first-child{
      transform: translateY(0%);
  }

  .panel.open-active > *:last-child{
      transform: translateY(0%);
  }
```

也在.panel.open中新增了flex: 5使其觸發時會有展開的效果。

### Step5:

先編寫JS先取得所有panel的節點
```javascript
const panels = document.querySelectorAll('.panel')
panels.forEach(panel => panel.addEventListener('click', handleUpdate))
```
接著設計toggle function使執行的物件藉由.classList.toggle來新增/移除動畫class

並透過addEventListener來監測當transitionend時觸發toggle function。
```javascript
panels.forEach(panel => panel.addEventListener('transitionend', toggleActive))
```
```javascript
function handleUpdate(){
    this.classList.toggle('open')
}

function toggleActive(e){
  this.classList.toggle('open-active')
}
```
transitionend會針對所有的事件觸發, 所以要下判斷, 要針對哪一個event結束後再觸發, 在這個範例中會有兩個屬性觸發
flex-grow/ font-size, 所以沒有判斷式, 一次關, 一次開, 兩者互相抵消, 這樣會造成沒有效果.

```javascript
  function toggleActive(e){
    // console.log(e.propertyName) // flex-grow, font-size
    // 或是可以這樣寫 e.propertyName.indexOf('flex') !== -1
    if(e.propertyName === "flex-grow"){
          this.classList.toggle('open-active')
    }
  }
```


## CSS語法&備註

### 如何改變CSS

在DOM加上css

1. style方法

```javascript
DOM.style.transform = rotate...
```

2. 透過增加class 

```javascript
DOM.classList.add('className')
```

### Flexbox

flex: flex-grow flex-shrink flex-basis
flex的簡寫，第一個為占比、第二個為壓縮值、第三個為默認尺寸

## JavaScript語法&備註



## 探索



[此範例以Alex宅幹嘛的教學和wes bros為主](https://www.youtube.com/watch?v=7hGFTNGommU)