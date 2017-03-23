require('dotenv').load()
const Koa = require('koa')
const Router = require('koa-router')
const http = require('http')
const request = require('koa-request')
const app = new Koa()
const router = new Router()
const WEATHER_API_KEY = process.env.WEATHER_API_KEY
// app.proxy = true

app.use(async (ctx, next) => {

  // const res = await request(options)
  console.log(ctx.response.body)

  // const info = JSON.parse(res.body)

  // api call to the weather api and will save to the request
  // const weatherLocation = {
  //   url: `http://api.openweathermap.org/data/2.5/weather?lat=${info.lat}&lon=${info.lon}&APPID=${WEATHER_API_KEY}`
  // }

  // const weatherRes = await request(weatherLocation)
  // const weatherInfo = JSON.parse(weatherRes.body)

  // ctx.name = weatherInfo.name
  // ctx.temp = weatherInfo.main.temp
  // ctx.tempMin = weatherInfo.main.temp_min
  // ctx.tempMax = weatherInfo.main.temp_max
  // ctx.humidity = weatherInfo.main.humidity
  // ctx.weatherCode = weatherInfo.cod

  await next()
})

function *grabGeolocation(ctx) {
  console.log(ctx)

  // api call to the geolocation api and will save the lat and lon to the request
  const options = {
    url: 'http://ip-api.com/json/208.80.152.201'
  }

  const location = yield request(this)
  console.log(location.body)
}

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
