const request = require('request')
 
const forecast = (lat, long , callback) => {
    const url = 'https://api.darksky.net/forecast/5381a237b853aa073ecbd0d1da5379ab/' + lat+',' + long+'?units=si&lang=ro' 

    request({url, json:true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the location services !', undefined)
        } else if (body.error) {
            callback('Unable to find location !', undefined)
        } else {
            callback(undefined,`${body.daily.data[0].summary} Acum sunt ${body.currently.temperature} grade. Sunt ${body.currently.precipProbability*100} % sanse de precipatii. Vor fi temperaturi intre ${body.daily.data[0].temperatureLow} si ${body.daily.data[0].temperatureHigh} grade`)
        }
    })
}

module.exports = forecast
