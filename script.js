
const btn = document.getElementById("btnSearch");

const mp = new Map();

mp.set("Clouds", "☁");
mp.set("Clear", "🌤");
mp.set("Rain", "🌧");
mp.set("Snow", "🌨");
mp.set("Drizzle", "🌦")
mp.set("Thunderstorm", "⛈");


btn.addEventListener("click", (e) =>{
    e.preventDefault();
    const city = document.getElementById("searchData").value;
    GetWeatherApi(city);
});


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

            console.log(data);

            document.getElementById("cityName").textContent = data.name;

            document.getElementById("temperature").textContent = `Температура составит: ${data.main.temp} C`;

            document.getElementById("description").textContent = `Описание: ${data.weather[0].description}`;

            document.getElementById("weather-image").textContent = mp.get(data.weather[0].main);
        }

    } catch (error) {
        console.log(error);
    }
}













































//TODO Прочитать про event.