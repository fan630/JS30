#  Stripe Follow Along Nav

## 主題:

今天就是在navbar上有一個滑動內層li的效果. 

## JavaScript語法&備註

接續上一次講到的delegation

```JavaScript
const ul = document.querySelector('.cool')
ul.addEventListener('mouseover', inHandler)
ul.addEventListener('mouseout', outHandler)

function inHandler(e) {
    const path =  e.composedPath()
    if(path[0].nodeName === 'A'){
    console.log('in')
    }
}

function outHandler(e) {
    const path = e.composedPath()
    if (path[0].nodeName === 'A') {
    console.log('out')
    }
}
// jQuery的寫法

$('ul').on('mouseover', '.cool', e =>{
    console.log('in', e.originalEvent.composedPath())
})

```

## getBoundingClientRect

1. rect 是一个具有四个属性left、top、right、bottom的DOMRect对象
2. DOMRect 对象包含了一组用于描述边框的只读属性——left、top、right和bottom，单位为像素。除了 width 和 height 外的属性都是相对于视口的左上角位置而言的。


[mdn支援](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)

## 為什麼要兩段式的加上class(trigger-open, trigger-enter)

控制畫面操作, 背景和畫面可以控制成同時出現

## alex補充

事件委派 => 適用於`mouseover`和`mouseout`

而`mouseenter`和`mouseleave`是針對一般綁定, `e.currentTarget`去做事
所以若是在做委派事件, 那`mouseenter`和`mouseleave`無效

[此範例以Alex宅幹嘛的教學和wes bros為主](https://www.youtube.com/watch?v=ndcl4hiyhQY&list=PLEfh-m_KG4dYbxVoYDyT_fmXZHnuKg2Fq&index=26)