const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" +encodeURIComponent(address)+ ".json?access_token=pk.eyJ1IjoibWF4c2llcnJhMTYiLCJhIjoiY2p1c2lpZnF2MGJ1MTQ1bDZjeHR6ZWI1eCJ9.IGAfm4T8_hyMBCIw5SNopg"
    request( {url: url, json: true}, (error, {body}) => {
            if(error) {
                callback('Unable to connect to API', undefined)
            } else if (body.features.length === 0) {
                callback('Unable to find location. Try another search!', undefined)
            } else {
                callback(undefined, {
                    latitud: body.features[0].center[1],
                    longitud: body.features[0].center[0],
                    location: body.features[0].place_name
                })
            }
        })
}

module.exports = geocode