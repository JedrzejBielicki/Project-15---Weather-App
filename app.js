window.addEventListener("load", () => {
  let temp = document.querySelector(".temp");
  let desc = document.querySelector(".desc");
  let tzone = document.querySelector(".timezone");
  let weekTemp = document.querySelectorAll(".week-temp h3");
  let weekSky = document.querySelectorAll(".week-sky h3");
  let long;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);

      long = position.coords.longitude;
      lat = position.coords.latitude;

      console.log(long, lat);

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=180fd379ded7cc48f53530360a718c44`;

      fetch(api)
        .then((response) => {
          console.log(response.json);
          return response.json();
        })
        .then((data) => {
          console.log(data);

          const temperature = `${Math.floor(data.current.temp - 273.15)} C`;
          const description = data.current.weather[0].description;
          const timezone = data.timezone;

          let dayTemp = [];

          for (let i = 0; i < data.daily.length; i++) {
            let daily = data.daily[i].temp.day;
            dayTemp.push(`${Math.floor(daily - 273.15)} C`);
          }

          let daySky = [];

          for (let i = 0; i < data.daily.length; i++) {
            let daily = data.daily[i].weather[0].description;
            daySky.push(daily);
          }

          console.log(dayTemp);
          console.log(temperature);
          console.log(description);
          console.log(timezone);
          console.log(weekTemp);

          temp.textContent = temperature;
          desc.textContent = description;
          tzone.textContent = `Timezone: ${timezone}`;

          add = (length, array, data) => {
            for (let i = 0; i < length.length; i++) {
              array[i].textContent = data[i];
            }
          };

          let weekTempArr = add(weekTemp, weekTemp, dayTemp);
          let weekSkyArr = add(weekSky, weekSky, daySky);
        });
    });
  } else {
    temp.textContent = "We need your location to run this app.";
  }
});
