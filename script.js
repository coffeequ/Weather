
const mp = new Map();

mp.set("Clouds", "☁");
mp.set("Clear", "🌤");
mp.set("Rain", "🌧");
mp.set("Snow", "🌨");
mp.set("Drizzle", "🌦")
mp.set("Thunderstorm", "⛈");

const btn = document.getElementById("btnSearch");

async function GetWeatherApi(city){

    const apiKey = "b9ae8530a4ef5b8ff54c11066d97a13b";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        let response = await fetch(url);

        if(!response.ok){
            document.getElementById("cityName").textContent = "Город не был найден!";
            throw new Error(`Ошибка по адресу ${url}. Код ошибки ${response.status}`);
        }
        if(response.ok){

            let data = await response.json();

            document.getElementById("cityName").textContent = data.name + " " + data.sys.country;

            document.getElementById("pressure").textContent = `Давление, мм рт. ст.: ${data.main.pressure}`

            document.getElementById("temperature").textContent = `Температура составит: ${data.main.temp} C`;

            document.getElementById("description").textContent = `Описание: ${data.weather[0].description}`;

            document.getElementById("weather-image").textContent = mp.get(data.weather[0].main);

            document.getElementById("humidity").textContent = `Влажность: ${data.main.humidity} %`;
        }

    } catch (error) {
        console.log(error);
    }
}

btn.addEventListener("click", (e) =>{
    e.preventDefault();
    const city = document.getElementById("searchData").value;
    GetWeatherApi(city);
});















































//TODO Прочитать про event.