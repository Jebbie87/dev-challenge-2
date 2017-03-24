'use strict'

require('dotenv').load()
const Koa = require('koa')
const request = require('koa-request')
const app = new Koa()
const WEATHER_API_KEY = process.env.WEATHER_API_KEY

app.proxy = true

app.use(function *(next) {
  // const ip = this.request.ip // this should be grabbing the ip address
  console.log(this.request.ip)
  const ip = '208.80.152.201' // dummy ip data

  // api call to grab lat and lon
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

  this.body =
  `  City name = ${this.name}
  City temp = ${this.temp}
  City temp min = ${this.tempMin}
  City temp max = ${this.tempMax}
  City weather code = ${this.weatherCode}
  City longitude = ${this.lon}
  City latitude = ${this.lat}
  `
  return yield next
})

app.listen(3000, '0.0.0.0');