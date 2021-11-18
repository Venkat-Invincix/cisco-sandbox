import "./App.css";
import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap"; //Component from react-bootstrap we installed
import "bootstrap/dist/css/bootstrap.min.css"; //import bootstrap for enhanced UI

function SearchForm({ onSubmit }) {
  const [value, setValue] = React.useState(""); //useState for state managment ReactHooks

  //it handles the submit in the form on submit press it sends data to the parent Component using callback
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    onSubmit(value);
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* handleSubmit gets called when hit the submit button */}
      <Form.Group>
        <Form.Label>
          <b> Search Weather</b>
        </Form.Label>
        <Form.Control
          type="text"
          className="input"
          // in react we use className not class for css
          value={value}
          // value is a state it holds the value of input
          onChange={(e) => setValue(e.target.value)}
          // onchange of the input field a callback called and setValue set the new value
          placeholder="Search by city"
        />
      </Form.Group>
      {/* Button is a component imported from react-bootstrap */}
      <Button variant="primary mt-3 mb-3" type="submit">
        Search
      </Button>
    </Form>
  );
}

function App() {
  const [cityName, setcityName] = useState("");  //useState for state managment for the cityName from Form
  const [weatherDeatils, setWeatherDetails] = useState(null);  //useState for state managment for weatherData 
  //useEffect ReactHooks : it is used to run a set of codes on component load
  useEffect(() => {
    if (cityName) {
      //fetch function is used to call API or get data from URL
      //appid is the api key you need to generate from the openweathermap.org current weather data API
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=df7edfb9dd04675cc1c7d9a38830b9a4`
      )
        .then((res) => {
          // the api gives the json data in promise
          return res.json();
        })
        .then((data) => {
          setWeatherDetails(data);
          // after geting the data set the data to the state using setWeatherDetails() updater function 
        })
        .catch((err) => {
          console.log(err);
          // if error is there then just console log the error . so we can get the error in console
        });
    }
  }, [cityName]);
  // [cityName] is a dependency array , if the cityName state changes then the useEffect() gets called 

  // when the form submited onSubmit() function gets called
  const onSubmit = (city) => {
    // if city is there then set the city using setcityName() updater function
    if (city) {
      setcityName(city)
    }
  }

  return (
    <div className="App">
      <div className="container">
        <h1 className="text-center mb-5">Weather App</h1>
        {/* we just use the  SearchForm component and pass the callback as a props so we can use that callback in children component*/}
        <SearchForm onSubmit={onSubmit} />
        <div>
          {/* Card is a react-boostarap component */}
          <Card>
            {/* if wetherDeatils is present show the card */}
            {weatherDeatils && (
              <Card.Body>
                <div className="weather">
                  <b>{weatherDeatils.name}</b>
                  {/* from  weatherDeatils object we get the name using weatherDeatils.name*/}
                  <div>
                    <p>{'Temp: ' + weatherDeatils.main.temp + ' F'}</p>
                    {/* from  weatherDeatils object has a propert main and inside the property temp is a property 
                     we can access using weatherDeatils.main.temp*/}
                    <p>{'Weather: ' + weatherDeatils.weather[0].main}</p>
                    {/* from weatherDeatils object has a property weather and weather is an array and inside array main is a property 
                    so we can access that using  weatherDeatils.weather[0].main */}
                  </div>
                </div>
              </Card.Body>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
// export is used so we can access the component in different component