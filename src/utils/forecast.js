const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'https://api.darksky.net/forecast/28acf101fd287b6d0e2e194db03ad929/' +lat+ ',' +lon+ '?units=si'
    request( {url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to API')
        } else if(body.error) {
            callback('Unable to get location')
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There's a ${body.currently.precipProbability}% chance of rain. Uv Index of ${body.currently.uvIndex}.`)
        }
    })
}

module.exports = forecast