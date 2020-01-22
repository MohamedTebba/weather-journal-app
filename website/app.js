/* Global Variables */

const zipInput = document.getElementById('zip')
const enteryInput = document.getElementById('feelings')
const generate = document.getElementById('generate')

const temperature = document.querySelector('#temp span')
const content = document.querySelector('#content p')
const date = document.querySelector('#date span')
const img = document.querySelector('#icon')


const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
let d = new Date();
let newDate = months[d.getMonth()]+'-'+ d.getDate()+'-'+ d.getFullYear();

const key = '76c63639ba3c5a4b2d0b83a2c10aaf7f'
// zip codes to test '94040, 63101'

const getData = async (url) => {
    const res = await fetch(url)
    try{
        const data = await res.json()
        return data
    }catch(error){

    }
}

const getWeatherData = async (key, zip = '94040', countryCode = '') => {

    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},${countryCode}&APPID=${key}`)
    
    try {

        const data = await res.json()
        const temp = data.main.temp   
        const icon = data.weather[0].icon     
        //return temp in celsius
        return {temp:Math.floor(temp - 273.15),icon}
    } catch (error) {
        alert('an error has occurred!')
    }

}

const postData = async (url = '',data = {}) => {
        
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    })
    
    try{
        const newData = await response.json()
        return newData
    }catch(error){
        alert('an error has occurred while sending data!\n try again!')
    }
    
}
    

const updateUI = async () => {
    const data = await getData('*')
        date.innerHTML = data.date
        temperature.innerHTML = data.temperature+'°'
        content.innerHTML = data.userResponse
        img.setAttribute('src',`https://openweathermap.org/img/wn/${data.icon}@2x.png`)
    }  

updateUI()

generate.addEventListener('click',(e)=> {
    if(zipInput.value && enteryInput.value){
        
        getWeatherData(key,zipInput.value)
        .then((res) => {
            if(res){
                const {temp,icon} = res
            postData('/',{
                temperature:temp,
                date:newDate,
                userResponse:enteryInput.value,
                icon
            })}
        })
        .then(()=> {
            zipInput.value =''
            enteryInput.value = ''
            updateUI()
        })
    }else{
        alert('all fields are required!')
    }
    
})




