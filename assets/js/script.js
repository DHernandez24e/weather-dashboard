var submitBtnEl = document.querySelector("#btn-submit");

//City search handler, sends input data to other functions
var citySearch = function () {
    event.preventDefault();

    var city = $("#city-search").val();

    console.log(city);
    apiCurrentCall(city);
    // apiForecastCall(city);

    $("#city-search").val("");
    
}

var pastSearchHandler = function (city) {

}

// Calls Weather API for current weather conditions
var apiCurrentCall = function (city) {

    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=6846f778fdbdbb000e63e44f82ef974e";

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

                //Removes class "d-none" to show element
                //$("#current-weather-container").removeClass("d-none");

                //Grabbing weather icons and appending them via img tag
                var iconcode = data.weather[0].icon;
                var iconUrl = "http://openweathermap.org/img/w/" + iconcode + ".png"

                //Getting date from epoc time, converting to calendar date and appending to element
                var currentDate = new Date(data.dt * 1000);
                $("#current-date").text("(" + currentDate.toLocaleDateString() + ")");
                console.log(currentDate);

                //Appending weather data from API call to elements.
                $("#city-name").text(data.name);
                $("#w-icon").attr("src", iconUrl);
                $("#current-temp").text("Temperature: " + data.main.temp);
                $("#current-hum").text("Humidity: " + data.main.humidity);
                $("#current-wind-sp").text("Wind Speed: " + data.wind.speed);

                //Grabbing latitude and longitude of location for UV index API call
                var lon = data.coord.lon;
                var lat = data.coord.lat;
                //UV Index API call
                var uvApiUrl = "http://api.openweathermap.org/data/2.5/uvi?appid=6846f778fdbdbb000e63e44f82ef974e&lat=" + lat + "&lon=" + lon;

                fetch(uvApiUrl).then(function (response) {
                    if (response.ok) {
                        response.json().then(function (data) {

                            //Appending UV Index to appropriate element
                            $("#current-uv").text("UV Index: " + data.value);
                        })
                    } else {
                        alert("Error: " + response.statusText);
                    }
                })
            })
        } else {
            alert("Error: " + response.statusText);
        }
    });
}

// var apiForecastCall = function (city) {

//     var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=6846f778fdbdbb000e63e44f82ef974e";

//     fetch(apiUrl).then(function (response) {
//         if (response.ok) {
//             response.json().then(function (data) {
//                 console.log(data);

//                 $("#city-name-date").text(data.city.name);

//             })
//         } else {
//             alert("Error: " + response.statusText);
//         }
//     })
// }

submitBtnEl.addEventListener("click", citySearch);