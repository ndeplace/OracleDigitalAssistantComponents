// =======================
// get the packages we need ============
// =======================

//public libs
const express = require('express');
const OracleBot = require('@oracle/bots-node-sdk');

const app = express();
OracleBot.init(app);
const bodyParser = require('body-parser')

//models Objects


//middleware loading


//util loading
const utils = require('./bin/utils')
const unless = utils.unless;


// =======================
// Start the app controller ============
// =======================
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());


// POST method route
app.post('/googleloc/:city', function (req, res) {
  if (req.params.city == "Toulouse" || req.query.city == "Toulouse") {
    res.json({
      'webview.url': 'https://goo.gl/maps/BhAxT29BgDA2'
    });
  } else if (req.params.city == "Strasbourg" || req.query.city == "Strasbourg") {
    res.json({
      'webview.url': 'https://goo.gl/maps/ToPEbWnocD12'
    });
  } else if (req.params.city == "Nantes" || req.query.city == "Nantes") {
    res.json({
      'webview.url': 'https://goo.gl/maps/8gFyuvp8TD52'
    });
  } else if (req.params.city == "Marseille" || req.query.city == "Marseille") {
    res.json({
      'webview.url': 'https://goo.gl/maps/3GmnvRGbrS42'
    });
  } else if (req.params.city == "Lille" || req.query.city == "Lille") {
    res.json({
      'webview.url': 'https://goo.gl/maps/ZJQUicfNBgD2'
    });
  } else if (req.params.city == "Lyon" || req.query.city == "Lyon") {
    res.json({
      'webview.url': 'https://goo.gl/maps/NqYqhcuyGNy'
    });
  } else {
    res.json({
      'webview.url': 'https://goo.gl/maps/ZJQUicfNBgD2'
    });
  }



});





// implement custom component api
OracleBot.Middleware.customComponent(app, {
  baseUrl: '/',
  cwd: __dirname,
  register: [
    './components/event.desc',
    './components/registration',
    './components/event.list',
    './components/check.email',
    './components/check.live.room',
    './components/live.question'
  ]
});




app.listen(3000, () => console.log(`server listening`));