const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils.js/geocode.js");
const forecast = require("./utils.js/forecast.js");

const app = express();

// Define paths of Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");
// Setup handlebar engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);
// Setup static to server
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "T",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About weather",
    name: "T",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "T",
    helpText: "Help...!!!",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "T",
    errorMessage: "Help article not found",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an adress",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "T",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000!!!");
});
