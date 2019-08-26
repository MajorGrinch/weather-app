const request = require('request')

const geocode = (address, callback) => {
    const mapServiceUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaW5ja2V2aW4iLCJhIjoiY2p6cTM1MThkMGNqcDNtcXNxZm5ncm5rNSJ9.-mFdZUIqMz8Bm2MVQ56fNg&limit=1'
    // console.log(mapServiceUrl)
    request({url: mapServiceUrl, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect map service!', undefined)
        }else if(body.features.length === 0){
            callback('Unable to locate the address. Try another one!', undefined)
        }else{
            const data = body.features[0]
            callback(undefined, {
                latitude: data.center[1],
                longitude: data.center[0],
                location: data.place_name
            })
        }
    })
}

module.exports = geocode