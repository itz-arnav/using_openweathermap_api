const express = require("express")
const path = require("path")
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
      res.sendFile(path.join(__dirname, "index.html"));
})


app.post("/", function(req, res){
      var city = req.body.cityName;
      console.log("Fetched city " + city);
      var APIkey = "670b73b45bc7e23dd413a7f038baf08a";
      const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city  + "&appid=670b73b45bc7e23dd413a7f038baf08a&units=metric";
      https.get(url, function(response){
            console.log(response.statusCode);

            response.on("data", function(data){
                  const weatherData = JSON.parse(data);
                  const temp = weatherData.main.temp;
                  const desc = weatherData.weather[0].description;
                  const icid = weatherData.weather[0].icon;
                  const icon = "http://openweathermap.org/img/wn/" + icid + "@2x.png"
                  const city = weatherData.name;
                  res.write("<h1>The place is  " + city + "</h1>");
                  res.write("<h1>The description is  " + desc + "</h1>");
                  res.write("<h1>The temperature is " + temp + "degrees.</h1>")
                  res.write(`<img src="` + icon + `" >`)
                  res.write("<br> <br> <br> ");
                  res.write(`<a href="/">Try again</a>`);
                  res.send();
            })

      })
})




app.listen(3000, function(){
      console.log("Starting port ...");
});