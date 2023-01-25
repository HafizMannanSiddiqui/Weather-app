const express = require('express');
const https = require("https");
const bodyParser = require("body-parser");
 
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

 app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
 });

 app.post("/", function(req, res){
 
    var city = req.body.cityName;
    var unit = "metric";
    var appid = "63e7bb7d9a7910119abd62bed790cc58";

    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&appid=" + appid + "&units=" + unit;
    https.get(url, function(resp){
        console.log(resp.statusCode);

        resp.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageUrl = ("http://openweathermap.org/img/wn/"+ icon + "@2x.png" )

        res.write("<p>The weather is "+ weatherDescription + ".<p/>");
        res.write("<h1>Temperature in "+ city +" is " + temp + " degree Celsius "  + ".<h1/>" );    
        res.write("<img src = " + imageUrl +"><img/>");
        res.send();
        });
    });
 });

 app.listen(3000, function(){
    console.log("server is running at port 3000");
 });