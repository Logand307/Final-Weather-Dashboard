var APIKey = "2dd64feb8132b85a8a95f90d2cff6658";
var city = "";
var currentDate = "";
var tempF = "";
var humidityValue = "";
var windSpeed = "";
var uvIndexValue = "";
var latitude = "";
var longitude = "";
var minTempK = "";
var maxTempK = "";
var minTempF = "";
var maxTempF = "";
var dayhumidity = "";
var currentWeatherIconCode = "";
var currentWeatherIconUrl = "";
var iconcode = "";
var iconurl = "";
var country = "";

var listOfSearchedCities = [];

var getSeachedCitiesFromLS = JSON.parse(localStorage.getItem("searched-cities"));

if (getSeachedCitiesFromLS !== null) {
    getSeachedCitiesFromLS.forEach(function(city) { city.toUpperCase(); });
    listOfSearchedCities = getSeachedCitiesFromLS;
}

$(document).ready(function() {
    displayCities(listOfSearchedCities);
    if (getSeachedCitiesFromLS !== null) {
        var lastCity = listOfSearchedCities[0];
        searchCity(lastCity);
    }
});

$("#search-btn").on("click", function() {
    event.preventDefault();
    clearDisplayedWeatherInfo()
    resetGlobalVariables()
    var cityName = $("input").val().toUpperCase().trim();
    $("#search-input").val("");
    searchCity(cityName);

    if (cityName !== "" && listOfSearchedCities[0] !== cityName) {
        listOfSearchedCities.unshift(cityName);
        localStorage.setItem("searched-cities", JSON.stringify(listOfSearchedCities));
        if (listOfSearchedCities.length === 1) {
            $("#searched-cities-card").removeClass("hide");
        }

        console.log($("ul#searched-cities-list a").length);
        if ($("ul#searched-cities-list a").length >= 5) {
            ($("ul#searched-cities-list a:eq(4)").remove());
        }
        $("#searched-cities-list").prepend(`<a href="#" class="list-group-item" style="text-decoration: none; color: black;">
      <li>${cityName}</li>
      </a>`);
    }
});