require('dotenv').load()
const Koa = require('koa')
const request = require('koa-request')
const app = new Koa()
const WEATHER_API_KEY = process.env.WEATHER_API_KEY

app.use(function *(next) {
  // const ip = this.request.ip // this should be grabbing the ip address
  const ip = '208.80.152.201' // dummy ip data

  const geoURL = {
    url: `http://ip-api.com/json/${ip}`,
  }

  const geolocation = yield request(geoURL)
  const location = JSON.parse(geolocation.body)

  this.lat = location.lat
  this.lon = location.lon

  // api call to the weather api and will save to the request
  const weatherURL = {
    url: `http://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&APPID=${WEATHER_API_KEY}`
  }
  const weatherRes = yield request(weatherURL)
  const weather = JSON.parse(weatherRes.body)

  this.name = weather.name
  this.temp = weather.main.temp
  this.tempMin = weather.main.temp_min
  this.tempMax = weather.main.temp_max
  this.humidity = weather.main.humidity
  this.weatherCode = weather.cod

  yield next
})

app.listen(3000, '0.0.0.0');

// The middleware should do this
// ● get the IP address of the request


/************     DONE    ************/
// ● call an external API to geo­locate that IP address using a free service (like
// http://ip­api.com/ )
// ● store the geo­location data in the request (ex. this.lat = /* latitude */; this.lon = /*
// longitude */)
// ● store the weather data in the request (ex. this.temp = /* temperature */; this.weatherCode = /* weather code */;)

// ● call an external API to get weather data for that geo­location (like
// http://openweathermap.org/api)

// ● call the next middleware.
// Zip up the entire project and send it to us with some quick instructions to get it running.
