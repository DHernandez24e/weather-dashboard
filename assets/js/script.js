var submitBtnEl = document.querySelector("#btn-submit");

var citySearch = function () {
    event.preventDefault();

    var city = $("#city-search").val();

    console.log(city);
    apiCurrentCall(city);
    // apiForecastCall(city);

    $("#city-search").val("");
    
}

var apiCurrentCall = function (city) {

    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=6846f778fdbdbb000e63e44f82ef974e";

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                
                var iconcode = data.weather[0].icon;
                var iconUrl = "http://openweathermap.org/img/w/" + iconcode + ".png"

                $("#city-name-date").text(data.name);
                $("#w-icon").attr("src", iconUrl);
                $("#current-temp").text(data.main.temp);
                $("#current-hum").text(data.main.humidity);
                $("#current-wind-sp").text(data.wind.speed);
                // $("#current-uv").text(data)

            })
        } else {
            alert("Error: " + response.statusText);
        }
    })
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