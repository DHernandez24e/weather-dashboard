var submitBtnEl = document.querySelector("#btn-submit");
var pastCallEl = document.querySelector("#past-call-btns");
var history = {};

//City search handler, sends input data to other functions
var citySearch = function () {
    event.preventDefault();

    var city = $("#city-search").val();

    apiCurrentCall(city);
    apiForecastCall(city);
    //searchHistory(city);

    $("#city-search").val("");
}

// Calls Weather API for current weather conditions
var apiCurrentCall = function (city) {

    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=6846f778fdbdbb000e63e44f82ef974e";

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

                //Removes class "d-none" to show element
                $("#current-weather-container").removeClass("d-none");

                //Grabbing weather icons and appending them via img tag
                var iconCode = data.weather[0].icon;
                var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png"

                //Getting date from epoc time, converting to calendar date and appending to element
                var currentDate = new Date(data.dt * 1000);
                $("#current-date").text("(" + currentDate.toLocaleDateString() + ")");

                //Appending weather data from API call to elements.
                $("#city-name").text(data.name);
                $("#w-icon").attr("src", iconUrl);
                $("#current-temp").text("Temperature: " + data.main.temp + " °F");
                $("#current-hum").text("Humidity: " + data.main.humidity + " %");
                $("#current-wind-sp").text("Wind Speed: " + data.wind.speed + " MPH");

                //Grabbing latitude and longitude of location for UV index API call
                var lon = data.coord.lon;
                var lat = data.coord.lat;
                //UV Index API call
                var uvApiUrl = "http://api.openweathermap.org/data/2.5/uvi?appid=6846f778fdbdbb000e63e44f82ef974e&lat=" + lat + "&lon=" + lon;

                fetch(uvApiUrl).then(function (response) {
                    if (response.ok) {
                        response.json().then(function (data) {
                            //Setting UV Index value to variable
                            var uvValue = data.value;

                            //Appending UV Index to appropriate element
                            $("#current-uv").text(uvValue);

                            //If statements for different ratings of UV index
                            // 0-3 Green, 4-7 Yellow, 8-11 Red
                            if (uvValue >= 0 && uvValue <= 3.99 ) {
                                $("#current-uv").removeClass("bg-warning bg-danger").addClass("bg-success");
                            } else if (uvValue >= 4 && uvValue <= 7.99) {
                                $("#current-uv").removeClass("bg-success bg-danger").addClass("bg-warning");
                            } else if (uvValue >= 8 && uvValue <= 12) {
                                $("#current-uv").removeClass("bg-success bg-warning").addClass("bg-danger");
                            }
                        });
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

//Forecast API call
var apiForecastCall = function (city) {

    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=6846f778fdbdbb000e63e44f82ef974e";

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

                //First Forecast Day
                $("#fore-first-temp").text("Temp: " + data.list[1].main.temp + "°F");
                $("#fore-first-hum").text("Humidity: " + data.list[1].main.humidity + "%");
                //First weather icon
                var firstIconCode = data.list[1].weather[0].icon;
                var firstIconUrl = "http://openweathermap.org/img/w/" + firstIconCode + ".png"
                $("#fore-first-icon").attr("src", firstIconUrl);

                //Converting first date and appending to first forecast element
                var foreDateOne = new Date(data.list[1].dt * 1000);
                $("#fore-first-dt").text(foreDateOne.toLocaleDateString());

                //Second Forecast Day
                $("#fore-second-temp").text("Temp: " + data.list[9].main.temp + "°F");
                $("#fore-second-hum").text("Humidity: " + data.list[9].main.humidity + "%");
                //Second weather icon
                var secondIconCode = data.list[9].weather[0].icon;
                var secondIconUrl = "http://openweathermap.org/img/w/" + secondIconCode + ".png"
                $("#fore-second-icon").attr("src", secondIconUrl);

                //Converting second date and appending to second forecast element
                var foreDateTwo = new Date(data.list[9].dt * 1000);
                $("#fore-second-dt").text(foreDateTwo.toLocaleDateString());

                //Third Forecast Day
                $("#fore-third-temp").text("Temp: " + data.list[17].main.temp + "°F");
                $("#fore-third-hum").text("Humidity: " + data.list[17].main.humidity + "%");
                //Third weather icon
                var thirdIconCode = data.list[17].weather[0].icon;
                var thirdIconUrl = "http://openweathermap.org/img/w/" + thirdIconCode + ".png"
                $("#fore-third-icon").attr("src", thirdIconUrl);

                //Converting third date and appending to third forecast element
                var foreDateThree = new Date(data.list[17].dt * 1000);
                $("#fore-third-dt").text(foreDateThree.toLocaleDateString());

                //Fourth Forecast Day
                $("#fore-fourth-temp").text("Temp: " + data.list[25].main.temp + "°F");
                $("#fore-fourth-hum").text("Humidity: " + data.list[25].main.humidity + "%");
                //Fourth weather icon
                var fourthIconCode = data.list[25].weather[0].icon;
                var fourthIconUrl = "http://openweathermap.org/img/w/" + fourthIconCode + ".png"
                $("#fore-fourth-icon").attr("src", fourthIconUrl);

                //Converting fourth date and appending to fourth forecast element
                var foreDateFour = new Date(data.list[25].dt * 1000);
                $("#fore-fourth-dt").text(foreDateFour.toLocaleDateString());

                //Fifth Forecast Day
                // console.log(data.list[33]);
                $("#fore-fifth-temp").text("Temp: " + data.list[33].main.temp + "°F");
                $("#fore-fifth-hum").text("Humidity: " + data.list[33].main.humidity + "%");
                //Fifth weather icon
                var fifthIconCode = data.list[33].weather[0].icon;
                var fifthIconUrl = "http://openweathermap.org/img/w/" + fifthIconCode + ".png"
                $("#fore-fifth-icon").attr("src", fifthIconUrl);

                //Converting fifth date and appending to fifth forecast element
                var foreDateFive = new Date(data.list[33].dt * 1000);
                $("#fore-fifth-dt").text(foreDateFive.toLocaleDateString());

            })
        } else {
            alert("Error: " + response.statusText);
        }
    })
}

var searchHistory = function (city) {
    console.log(city);

}

submitBtnEl.addEventListener("click", citySearch);