import React, { useState } from "react";
import "./App.css";
import cloud from "./Images/cloud.png";
import axios from "axios";
function App() {
  const [cityName, setCityName] = useState("");
  const [displayData, setDisplayData] = useState("");
  const moment = require("moment");
  const ClickFunc = () => {
    let body = { cityName };

    axios
      .post("http://localhost:5000/api", body)
      .then(function (response) {
        setDisplayData(response?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  console.log(displayData);
  return (
    <div className="App">
      <div className="App-container">
        <div className="searchContainer">
          <h1>Weather Report</h1>
          <input
            placeholder="Enter City"
            value={cityName}
            onChange={(e) => {
              setCityName(e.target.value);
            }}
          />
          <button onClick={ClickFunc}>Search</button>
        </div>
        <h1>{displayData?.message}</h1>

        {displayData && cityName ? (
          <div className="displayContainer">
            <div className="imageContainer">
              <div>
                <img src={cloud} />
                <br />
              </div>
              <div className="tempContainer">
                <span>
                  Temperature : {Math.trunc(displayData?.wind?.deg / 10)}
                  <sup>0</sup>
                </span>
                <br />
                <span>humidity :{displayData?.main?.humidity}</span>
                <br />
                <span id="locationName">
                  {displayData.weather &&
                    displayData?.weather.map((item) => item.description)}
                </span>
                <br />
              </div>
            </div>

            <div className="dateContainer">
              <span id="weatherName">Weather</span>
              <br />
              <span id="locationName">{displayData.name}</span>
              <br />
              <span>{moment().format("dddd")}</span>
              <br />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
