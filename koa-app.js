require('dotenv').load()
const Koa = require('koa')
const Router = require('koa-router')
const http = require('http')
const request = require('koa-request')
const app = new Koa()
const router = new Router()
const WEATHER_API_KEY = process.env.WEATHER_API_KEY
// app.proxy = true

app.use(function *(ctx, next) {

  const geoURL = {
    url: 'http://ip-api.com/json/208.80.152.201',
  }


  const geolocation = yield request(geoURL)
  // console.log(geolocation)
  const location = JSON.parse(geolocation.body)

  this.lat = location.lat
  this.lon = location.lon
  this.body = `hello ${this.lat}`

  // const info = JSON.parse(res.body)

  // api call to the weather api and will save to the request

  const weatherURL = {
    url: `http://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&APPID=${WEATHER_API_KEY}`
  }

  const weatherRes = yield request(weatherURL)
  const weatherInfo = JSON.parse(weatherRes.body)

  console.log(weatherInfo)

  this.name = weatherInfo.name
  this.temp = weatherInfo.main.temp
  this.tempMin = weatherInfo.main.temp_min
  this.tempMax = weatherInfo.main.temp_max
  this.humidity = weatherInfo.main.humidity
  this.weatherCode = weatherInfo.cod
})


app.listen(3000, '0.0.0.0');


    // weatherURL: `http://api.openweathermap.org/data/2.5/weather?lat=${info.lat}&lon=${info.lon}&APPID=${WEATHER_API_KEY}`

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
