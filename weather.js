const city_input = document.getElementById("city");
const city_temp = document.querySelector("#temp");
const city_weather = document.querySelector("#weather");
const high_low = document.querySelector("#high-low");
const city_location = document.querySelector("#location");
const timestamp = document.querySelector("#curr_timestamp");

city_input.addEventListener('keypress', getWeatherInfo);
const apiKey={token: "92ef1a223226c4b4dd2210a04016b4e4"};
const apicall = "https://api.openweathermap.org/data/2.5/weather?q=";
function getWeatherInfo(event) {
    // alert("Key presses " + city_input.value);
    if(event.key === "Enter") {
        fetch(apicall+ event.target.value + "&appid=" + apiKey.token).then(result => {

            if(result.ok) {
                // const jsonResult = result.json(); 
                // console.log(jsonResult);
                return result.json();
                
            }
        }).then(res => {
            if(res === undefined) {
                console.log("Error");
            } else 
            updateWeatherInfo(res);
        });
    }
}

function dateBuilder() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const todayDate = new Date();
    const dateString = `${weekDays[todayDate.getDay()]}, ${todayDate.getDate()} ${months[todayDate.getMonth()]} ${todayDate.getFullYear()}`;
    return dateString;
}

function updateWeatherInfo(info) {
    console.log(info);
    city_location.innerText = `${info.name}, ${info.sys.country}`;
    city_weather.innerText = info.weather[0].main;
    city_temp.innerHTML = `${Math.round(info.main.temp)/10} <span>&deg;C</span>`; 
    high_low.innerHTML = `${Math.round(info.main.temp_min)/10}/${Math.round(info.main.temp_min)/10} <span>&deg;C</span>`;
    timestamp.innerText = dateBuilder();
}

