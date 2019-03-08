const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

const app = express() 

// Define paths for Express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req, res) => {
    res.render('index',{
       title: 'Weather',
        name: 'GabiG la indicatiile lui Andrew Mead'
    })
})

app.get('/about',(req, res) => {
    res.render('about',{
       title: 'About Me',
        name: 'GabiG la indicatiile lui Andrew Mead'
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
       message: 'Udemy.com The complete nodejs developer course',
       title: 'Help', 
       name: 'GabiG la indicatiile lui Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({error})
    }

    geocode(req.query.address , (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        } 

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: 'Trebuie sa introduci o adresa !!!'
                })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })  
        })
    })
})

app.get('/products',(req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    //res.send('Help article not found')
    res.render('404page',{
        message404: 'Help article not found',
        title: '404',
        name: 'GabiG la indicatiile lui Andrew Mead'
    })
})

app.get('*', (req, res) => {
    //res.send('My 404 page')
    res.render('404page', {
        message404: 'Page not found',
        title: '404',
        name: 'GabiG la indicatiile lui Andrew Mead'
    })
})

app.get('', (req, res) => {
    res.send('<h1>Hello Express!</h1>')
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})