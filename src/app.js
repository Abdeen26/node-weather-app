const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// Loading Express
const express = require('express')
// Loading HBS Module
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000
//Static Public Folder declaration
const publicDirPath = path.join(__dirname, '../public')
//changing hbs default views path
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// loading hbs engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('', (req, res) => {
  res.render('index', { title: 'Weather', name: 'Abdeen' })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'Please Provide an address to get the Weather' })
  }
  geocode(req.query.address, (error, data) => {
    if (error || !data) {
      return res.status(500).send({ error })
    }
    const { latitude, longitude, location } = data
    // console.log("City Info:", location);
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.status(500).send({ error })
      }
      // console.log(forecastData);
      res.send({
        forecast: forecastData,
        location: location,
      })
    })
  })
})

app.get('/about/', (req, res) => {
  res.render('about', { title: 'About Page' })
})
app.get('/help/', (req, res) => {
  res.render('help', {
    title: 'Help Page',
  })
})

app.get('/*/', (req, res) => {
  res.render('error-page')
})

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})
