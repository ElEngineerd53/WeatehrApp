weatherApp.service("cityService",function(){this.city=""}),weatherApp.service("weatherService",["$resource",function(e){this.GetWeather=function(t,r){var a=e("http://api.openweathermap.org/data/2.5/forecast/daily?",{callback:"JSON_CALLBACK"},{get:{method:"JSONP"}});return weatherResult=a.get({q:t,cnt:r})}}]);