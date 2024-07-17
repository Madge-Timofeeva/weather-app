const api = {
    //ссылка
    endpoint: 'https://api.openweathermap.org/data/2.5/',
    //api key
    key: '93401e7df97c653d4b06d431c7c7ee99'
}

const input = document.querySelector("#input");

input.addEventListener("keypress", function(e) {
  if (e.keyCode === 13) {
    e.preventDefault(); // Предотвращаем действие по умолчанию при нажатии Enter на компьютере
    getInfo(input.value.trim());
    input.value = ''; // Очищаем поле ввода
  }
});

input.addEventListener("input", function(e) {
  if (!isMobileDevice()) {
    getInfo(e.target.value.trim());
    input.value = ''; // Очищаем поле ввода
  }
});

function isMobileDevice() {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('Mobi') !== -1);
}

async function getInfo(data){
const res = await fetch(`${api.endpoint}weather?q=${data}&units=metric&appID=${api.key}`);
const result = await res.json();
displayResult(result);
}

function displayResult(result){
let city = document.querySelector('#city');
city.textContent = `${result.name}`, `${result.sys.countru}`;

getOurDate();

let temperature = document.querySelector('#temperature');
temperature.innerHTML = `${Math.round(result.main.temp)}<span>°</span>`;

let feelsLike = document.querySelector('#feelsLike');
feelsLike.innerHTML = `${Math.round(result.main.feels_like)}<span>°</span>`;

let conditions = document.querySelector('#conditions');
conditions.textContent = `${result.weather[0].main}`;

let variation = document.querySelector('#variation');
variation.innerHTML ='Min: ' + `${Math.round(result.main.temp_min)}<span>°</span>` + ' Max ' + `${Math.round(result.main.temp_max)}<span>°</span>`;

}


function getOurDate(){
    //сегодняшняя дата
    const myDate = new Date;
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // показать день недели
    let day = days[myDate.getDay()];

    //показать дату число
    let todayDate = myDate.getDate();

    //показать месяц
    
    let month = months[myDate.getMonth()];

    //показать год
    
    let year = myDate.getFullYear();

    let showDate = document.querySelector('#date');
    showDate.textContent = `${day}`+ ' ' + `${todayDate}` + ' ' + `${month}` + ' ' + `${year}`
    
}
