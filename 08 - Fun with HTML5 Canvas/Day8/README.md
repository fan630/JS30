# Canvas

第一次嘗試Canvas畫布, 沒有想像中難, 這樣下一次有人提到Canvas比較有概念了!

## 主題:
使用HTML5的Canvas來製作一個畫布， 透過滑鼠來繪製彩色粗細不一的線條～

## HTML5語法&備註
這篇幾乎都是使用到canvas的功能，
紀錄若要製作像這樣的畫布效果在canvas中的使用順序：

### 定義線條樣式:

(1) strokeStyle線條顏色  
(2) lineWidth線條寬度   
(3) lineJoin線條的轉角樣式   
(4) lineCap線條的結束樣式

### 移動順序:

(1) beginPath()開啟一個新的繪製路徑  
(2) moveTo()將繪製路徑的起點移動到指定的座標中   
(3) lineTo()連接路徑終點到指定的座標中  
(4) stroke()繪製路徑

> [參考:CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)

## JavaScript語法&備註

mouseout: 是連續觸發, mouseleave不是. 

## 探索

增加雙判斷, 當畫筆離開畫布時. 不會因為延續性而多一筆
在建立一個`flag -> down: false` , double判斷.

在`mousedown`時 -> `down: true`
在`mousemove`時 -> 雙判斷, 如果狀態是false, 那就都不要畫, 只有在按下去且移動時才能畫畫. 



[此範例以Alex宅幹嘛的教學為主](https://www.youtube.com/watch?v=3862i0RdKLU&t=6m51s)