const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'HJ'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'HJ'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'Enter the location in the placeholder in Weather page',
        title: 'Help',
        name: 'HJ' 
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Address must be provided.'
        })
    } 

    forecast(req.query.address, (error, data) => {

        if (error) {
            return res.send({
                error: error
            })
        }
        
        res.send({
            forecast: data.forecast,
            location: data.location
        })
    })  

    
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        })
    } else {
        console.log(req.query.search)
        res.send({
            products: []
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'HJ',
        errorMessage: 'Help article not found'

    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        name: 'HJ',
        error: 'Page not found'
    })
})

app.listen(process.env.PORT, () => {
    console.log('Server is up on port ' + process.env.PORT)
})