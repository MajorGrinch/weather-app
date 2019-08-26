const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const weatherUrl = `https://api.darksky.net/forecast/a1299824067665024778623f4bcd20bc/${latitude},${longitude}?units=si`

    request({ url: weatherUrl, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find the location', undefined)
        }
        else {
            const currently = body.currently
            callback(undefined, 'It is currently ' + currently.temperature + ' degrees outside. There is a ' + currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast