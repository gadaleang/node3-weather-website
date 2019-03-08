const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZ2FkYWxlYW5nIiwiYSI6ImNqc3gyOXJleDBiM3c0YXBmMXpianZ3ZGoifQ.j7pHwmAJc3N4zaWwMrZCFw' 

    request({url, json:true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the location services !', undefined)
        } else if (body.features.lenght === 0) {
            callback('Unable to find location !', undefined)
        } else {
            callback(undefined,{
                //`${response.body.features.center[0]},${response.body.features.center[1]} .`
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode