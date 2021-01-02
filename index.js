const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const PORT = process.env.PORT || 5000;

// express()
//   .use(express.static(path.join(__dirname, "public")))
//   .get("/", (req, res) => res.render({ hello: "world" }))
//   .listen(PORT, () => console.log(`Listening on ${PORT}`));

var app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.post("/", function (req, res) {
  console.log(req.body);

  var requestOptions = {
    method: "POST",
    headers: { Accept: "application/json" },
    redirect: "follow",
  };
  fetch(
    `https://github.com/login/oauth/access_token?code=${req.body.code}&client_id=${req.body.client_id}&client_secret=${req.body.client_secret}`,
    requestOptions
  )
    .then((response) => response.json())
    .then(function (result) {
      console.log(result);
      res.send(result);
    })
    .catch((error) => console.log("error", error));
});

app.get("/", function (req, res) {
  console.log(req.params);
  res.send({ hello: "world" });
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
