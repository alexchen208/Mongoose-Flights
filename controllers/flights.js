const Flight = require('../models/flight')

module.exports = {
    new: newFlight,
    create,
    index,
    show
  }

function newFlight(req, res) {
    res.render('flights/new')
}

function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  const flight = new Flight(req.body)
  flight.save(function(err) {
    if (err) {
      return res.redirect('/flights/new')
    }
    res.redirect('/flights')
  })
}


function index(req, res) {
  Flight.find({}, function(err, flights) {
      res.render('flights/index', {
          flights
      })
  })
}

function show(req, res) {
  Flight.findById(req.params.id, function(err, flight) {
    res.render('flights/show', {title: 'Flight Details', flight})
  })
}