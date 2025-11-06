fetch("https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=Seattle", {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "YOUR_API_KEY",
    "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com"
  }
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
    document.body.innerHTML = `<h2>Seattle Weather</h2>
                               <p>Temperature: ${data.temp}°C</p>`;
  })
  .catch(err => console.error(err));

