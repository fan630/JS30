//問題1: search到底要寫在哪?
//問題2: population怎麼到最右邊?

const cors = 'https://cors-anywhere.herokuapp.com/'

const request = new XMLHttpRequest()
request.onload = function(response){
   if(request.status >=200 && request.status < 400){
       const datas = JSON.parse(request.responseText) //換成物件格式

       const data = datas.map(data => `${data.city}, ${data.state} ${data.population}`)

       for(var i =0; i < datas.length; i++){
            const suggestions = document.querySelector('.suggestions')
            const li = document.createElement('li')
            li.textContent = data[i]
            suggestions.append(li)

            // const input = document.querySelector('input[type=text]')

            // function search() {
            //     input.addEventListener('keydown', handleKeydown)
            //   }

            // function handleKeydown(e) {
            //   console.log(e.key)
            //   if (arr[i].includes(e.key)) {
            //     arr[i].includes(e.key).style.color = 'yellow'
            //   }
            // }
       }

       //search()

   }else{
     console.log('error')
   }
}
request.onerror = function (){
   console.log('error')
}

request.open('GET', `${cors}${endpoint}`, 'true')
request.send()