import React, { useEffect, useState} from "react";
import axios from "axios";
import { set } from "react-hook-form";
import API from "../api/api";

type Weather = {
    city: string;
    temperature: number;
    weather: string;
    humidity: number;
    windSpeed: number;
};

const WeatherWidget: React.FC<{ city: string }> = ({ city }) => {
    const [weather, setWeather] = useState<Weather | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await API.get(`/weather/current?city=${city}`);
                setWeather(response.data);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };

        fetchWeather();
    }, [city]);

    if (!weather) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h3>{weather.city}</h3>
            <p>Temperature: {weather.temperature} °C</p>
            <p>Weather: {weather.weather}</p>
            <p>Humidity: {weather.humidity}%</p>
            <p>Wind Speed: {weather.windSpeed} m/s</p>
        </div>
    );
}

export default WeatherWidget;