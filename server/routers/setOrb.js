var express = require('express');
const hueAPI = require('node-hue-api');
const hue = require("node-hue-api");


var bulbNumber=3;
var hueUsername="aDRZYBIO3EJ-JeFSxPQHXZhi2OvclOF7s5ga6jRT";
var huehost = "192.168.1.128";  // Ethernet Adapter
var HueApi = hue.HueApi;
var lightState = hue.lightState;
var brightness = 255;
var api = new HueApi(huehost, hueUsername);


function setHue(weather,bright)
{

  var r,g,b;

  switch (weather){
    case "Thunder":
     break;
    case "Sunny":
        r=255,g=255,b=51;
        break;
    case "Cloudy":
        r=100,g=100,b=100;
        break;
    case "Sunset":
        r=230,g=139,b=0;
        break;
    case "Moonlight":
        r=102,g=0,b=102;
        break;
   case "White":
        r=255, g=255, b=255
         break;
   case "Red":
        r=255,g=0,b=0;
        break;
    case "Green":
        r=0,g=255,b=0;
        break;
    case "Blue":
        r=0,g=0,b=255;
        break;
    case "Yellow":
        r=255,g=255,b=0;
        break;
    case "Orange":
        r=230,g=139,b=0;
        break;
    case "Purple":
        r=102,g=0,b=102;
        break;
    default:
        r=0,g=70,b=100;
    }
    console.log("r="+r+" g="+g+" b="+b);

    var state=lightState.create().on().rgb(r,g,b).brightness(bright);
    api.setLightState(bulbNumber, state)
      .then(displayResult)
      .fail(displayError)
      .done();

    return(state);
}




module.exports = function(app) {
  var router = express.Router();

  router.get('/', function (req, res, next) {
  
     var setWeather = req.query.weather;
     console.log("weather=",setWeather);
     if (setWeather == null) {
        setWeather = "Sunny";
     }
     setHue(setWeather,brightness);

     
    res.json({setOrb: setWeather});
  });

  app.use("/setOrb", router);
}



