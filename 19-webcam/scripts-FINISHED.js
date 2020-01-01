let type = 2
const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


function switchType(num){
   type = num
}

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      console.log(localMediaStream);
    
//  DEPRECIATION : 
//       The following has been depreceated by major browsers as of Chrome and Firefox.
//       video.src = window.URL.createObjectURL(localMediaStream);
//       Please refer to these:
//       Depreceated  - https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
//       Newer Syntax - https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject
      
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch(err => {
      console.error(`OH NO!!!`, err);
    });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  switchType()
  let pixels = ctx.getImageData(0, 0, width, height);

  return setInterval(() => {
    //到底要畫多寬, 畫多高, 在畫面上要呈現多少的寬高
    ctx.drawImage(video, 0, 0, 300, 300);
    // take the pixels out
    pixels = ctx.getImageData(0, 0, width, height);
    // mess with them
    // pixels = redEffect(pixels);
    
    switch (type){
      case 1: 
        pixels = redEffect(pixels);
        break;
      case 2:
        pixels = rgbSplit(pixels);
        break;
      case 3:
        pixels = greenScreen(pixels); 
        break;
    }

    
    if(type === 1){

    }
    
    ctx.clearRect(0, 0, width, height)
    ctx.putImageData(pixels, 0, 0);
    // 那為什麼是設計成16ms? 1/60
  }, 16);
}

function takePhoto() {
  // played the sound
  snap.currentTime = 0;
  snap.play();

  // take the data out of the canvas
  // toDataURL => 轉成base64的url, 但只能用在canvas上面
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  // download是新的屬性
  link.setAttribute('download', 'handsome');
  link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;

  // 新的照片可以放在前面, 其實就是prepand
  strip.insertBefore(link, strip.firstChild);
  // 如果是strip.firstChild => null , 那就變成新的照片安插在最後面
}

function redEffect(pixels) {
  // 為什麼是i += 4 , 因為對應到前面的rgba, 紅綠藍和透明度四個參數 所以是0~3, 然後從4開始
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
  }
  return pixels;
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 550] = pixels.data[i + 2]; // Blue
  }
  return pixels;
}

function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // take it out!
      // 把阿法設為0, 這樣那一點就會不見了
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);
