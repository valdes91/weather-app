const searchBar = document.getElementById('searchbar');
const loc = document.getElementById('location');
const temp = document.getElementById('temp');
const description = document.getElementById('description');
const hiLow = document.getElementById('hi-low')
const icon = document.querySelector('.weather-icon');

function displayWeather(data) {
  loc.innerText = `${data.name}, ${data.sys.country}`;
  temp.innerText = `${Math.round(data.main.temp)}°F`; 
  description.innerText = `${data.weather[0].description}`;
  hiLow.innerText = `High: ${Math.round(data.main.temp_max)}°F | Low: ${Math.round(data.main.temp_min)}°F`;

  while(icon.firstChild) icon.removeChild(icon.firstChild);

  const img = document.createElement('img');
  img.src = ` http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  icon.appendChild(img);
}

function displayError() {
  loc.innerText = ``;
  temp.innerText = `Sorry, Location Not Found`;
  description.innerText = `Please try again`;
  hiLow.innerText = '';
  while(icon.firstChild) icon.removeChild(icon.firstChild);
}

searchBar.addEventListener('keyup', (e) => {
  if(e.key === 'Enter') {
    const where = e.target.value;
    fetch(`.netlify/functions/getKey?q=${where}`)
    .then(res => res.json())
    .then(data => {
      if(Object.keys(data).length === 0) throw Error();
      displayWeather(data);
    })
    .catch(err => displayError());
  }
});