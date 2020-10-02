function checkForm(form)
  {
    // validation fails if the input is blank
    if(form.cityName.value == "") {
      alert("Error: Input is empty!");
      form.cityName.focus();
      return false;
    }

    // regular expression to match only alphanumeric characters and spaces
    var re = /^[\w ]+$/;

    // validation fails if the input doesn't match our regular expression
    if(!re.test(form.cityName.value)) {
      alert("Error: Input contains invalid characters!");
      form.cityName.focus();
      return false;
    }

    // validation was successful
    return true;
  }

newCity.addEventListener("submit",(event)=>{
    event.preventDefault();
    let newCity = document.querySelector('#cityName');
    const cityName=newCity.value;

const apiKey = "b4cf7292e90bcd61f5eb671a54de8b10";
const url= `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;



const createCardHtml = (name,temp,emoji,country,newDate,wind,description) =>`
<div class="card">
    <div class="row no-gutters align-items-center">    
      <div class="col-2 h2 pl-1 pt-1 text-center">                
      
      </div>
      <div class="col-10">
        <div class="card-body">
          <div class="row card-title justify-content-between align-items-center mr-3 mb-1">
            <h4>${name}</h4>
            <span class="badge badge-warning">${country}</span>
            <h5>${day}</h5>
            </div> 
            <div class="row card-title justify-content-between align-items-center mr-3 mb-1">
            <h5>${temp}&#8451;</h5>
            ${emoji}
            <h5>${newDate}</h5>
          </div>
          <div class="d-flex w-100 mb-3 justify-content-between">
            <h5 class="card-subtitle text-info">${description}</h5>
            <h5 class="card-subtitle text-muted">wind ${wind} knots</h5>
          </div>
        </div>
      </div>
    </div>
  </div>

  `;
  

const date = new Date();
const month = date.toLocaleString('default', { month: 'short' });
const day = date.toLocaleString('default',{ weekday: 'short' });
const numDay = date.getDate();
const newDate= numDay +"-"+ month;



  const emojis = {
  '01d': '☀️',
  '02d': '⛅️',
  '03d': '☁️',
  '04d': '☁️',
  '09d': '🌧',
  '10d': '🌦',
  '11d': '⛈',
  '13d': '❄️',
  '50d': '💨',
  '01n': '☀️',
  '02n': '⛅️',
  '03n': '☁️',
  '04n': '☁️',
  '09n': '🌧',
  '10n': '🌦',
  '11n': '⛈',
  '13n': '❄️',
  '50n': '💨',
};
fetch(url)
.then (response=>response.json())
.then(data=>{
    const name = data.name;
    const temp =data.main.temp;
    const country=data.sys.country;
    const wind=data.wind.speed;
    const description=data.weather[0].description;
    const emoji = emojis[data.weather[0].icon];
;
 

  const cardHtml= createCardHtml(name,temp,emoji,country,newDate,wind,description);
  const weatherContainer=document.querySelector("#weather-container");
  weatherContainer.innerHTML=cardHtml;

})})