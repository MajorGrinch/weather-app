const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const staticDirPath = path.join(__dirname, '../static')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(staticDirPath))
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Kevin'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Kevin'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpText: 'This is the help page',
        name: 'Kevin'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({error})
    }
    console.log(req.query.address)
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, weatherData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                location: location,
                forecast: weatherData
            })
        })
    })
})

app.get('/products', (req, res) => {
    console.log(req.query)
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kevin',
        message: 'Help article not found'
    })
})

// match any url that hasn't been matched
app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Kevin',
        message: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000!')
})