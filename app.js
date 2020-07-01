window.addEventListener('load', () => {

    let temp = document.querySelector('.temp');
    let desc = document.querySelector('.desc');
    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);

            long = position.coords.longitude;
            lat = position.coords.latitude;

            console.log(long, lat);

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=180fd379ded7cc48f53530360a718c44`;

            fetch(api)
                .then(response => {
                    console.log(response.json);
                    return response.json();
                })
                .then(data => {
                    console.log(data);

                    const temperature = `${Math.floor(data.main.temp - 273.15)} C`;
                    const description = data.weather[0].description;
                    console.log(temperature);
                    console.log(description);

                    temp.textContent = temperature;
                    desc.textContent = description;
                })


        })
    } else {
        temp.textContent = "We need your location to run this app."
    }

})