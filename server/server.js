const express = require("express");
const request = require("request");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); 


app.post("/api", (req, res) => {
  const city = req.body.cityName; 
  request(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=93a10343ca2dbed467201d842ad49f63`,
    function (error, response, body) {
      let data = JSON.parse(body);

      if (response.statusCode == 200) {
        res.send(data);
      } else {
        res.send({ cod: "404", message: "City not found" });
      }
    }
  );
});

app.listen(5000, () => console.log("Server Started"));
