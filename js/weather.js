fetch('https://api.openweathermap.org/data/2.5/weather?q=Almaty,KZ&appid=fe7799bd40bb2ed809e70b363e1637d0')
    .then(function (resp) {return resp.json()})
    .then(function (data) {
        console.log(data);
        document.querySelector('.city-name').textContent = data.name;
        document.querySelector('.weather-description').textContent = data.weather[0]['description'];
        document.querySelector('.weather-icon').innerHTML = '<img src="https://openweathermap.org/img/wn/' + data.weather[0]['icon'] + '@2x.png">';
        //https://openweathermap.org/img/wn/02d@2x.png
        document.querySelector('.temperature').innerHTML = Math.round(data.main.temp - 273) + '&deg;';
    })
    .catch(function () {
        //errors
    });