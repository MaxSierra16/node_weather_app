const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// Define path for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {title: "Weather", name: "Max Sierra"})
})

app.get('/about', (req, res) => {
    res.render('about', {title: "About me", name: "Max Sierra"})
})

app.get('/help', (req, res) => {
    const message = `Lorem ipsum dolor sit, amet consectetur adipisicing elit.
    Tenetur laborum placeat doloribus. Porro, vero officia deleniti asperiores a rem,
    dolorem consequuntur, minima veritatis voluptatem suscipit laborum blanditiis amet sit dolor?`
    res.render('help', {message, title: "Help", name: "Max Sierra"})
})

app.get('/weather', (req, res) => {
    if(!req.query.address) return res.json({error: "Please provide an address"})

    geocode(req.query.address, (error, {latitud, longitud, location} = {}) => {
        if (error) return res.send({error})
        
        forecast(latitud, longitud, (error, forecast) => {
            if (error) return res.send({error})
            
            res.send({
                forecast,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('/help/*', (req, res) => {
    const error = "Help articule not found"
    res.render('404', {error, title: "404", name: "Max Sierra"})
})

app.get('*', (req, res) => {
    const error = "Page not found"
    res.render('404', {error, title: "404", name: "Max Sierra"})
})

app.listen(3000, () => {
    console.log('Serving up on port 3000')
})