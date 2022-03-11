const request = require('request')

const forecast = (location,callback) => {

    const apiKey = process.env.API_KEY
    const unit = 'metric'
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + encodeURIComponent(location) + '&appid=' + encodeURIComponent(apiKey) + '&units=' + encodeURIComponent(unit)

    request({url: url, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect to weather service!',undefined)
        } else if(response.body.cod === '404') {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                forecast: response.body.weather[0].main + '. It is currently ' + response.body.main.temp + ' degrees out but it feels like ' + response.body.main.feels_like + ' degrees out.',
                location: response.body.name + ', ' + response.body.sys.country
            })
        }
    })
}

module.exports = forecast
