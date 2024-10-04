import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";

const ViewWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = '4410fb0ff4f142b15a9ea7639f2a3471'
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Jakarta&appid=${apiKey}&units=metric`);
        setWeatherData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) return <Typography>Loading weather data...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  return (
    <Box sx={{ padding: 2 }}>
      {weatherData && (
        <div>
          <Typography variant="h6">{weatherData.name}</Typography>
          <Typography>Temperature: {weatherData.main.temp} °C</Typography>
          <Typography>Weather: {weatherData.weather[0].description}</Typography>
        </div>
      )}
    </Box>
  );
};

export default ViewWeather;