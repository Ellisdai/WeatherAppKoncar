import { useEffect, useRef, useState } from "react";
import axios from "../api/api";
import API from "../api/api";

interface WeatherData {
    city: string;
    temperature: number;
    weather: string;
    humidity: number;
    windSpeed: number;
}


export default function CurrentWeather() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const coordsRef = useRef <{ lat: number; lon: number } | null>(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            coordsRef.current = {
                lat: position.coords.latitude,
                lon: position.coords.longitude
            }
            fetchWeather();
        });
    }, []);

    const fetchWeather = async () => {
        if(!coordsRef.current) return;

        try {
            const response = await API.get(`/weather/current?lat=${coordsRef.current.lat}&lon=${coordsRef.current.lon}`);
            setWeather(response.data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };
    
    useEffect(() => {      
        const interval = setInterval(() => {
            console.log("Interval tick");
            fetchWeather();
        }, 60000); // Osvježava svakih 60 sekundi

        return () => clearInterval(interval);
    }, []);

    if (!weather) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div style={{ border: "1px solid black", padding: "10px", marginBottom: "20px" }}>
                <h3>Current Weather</h3>
                <p>{weather.city}</p>
                <p><strong>Weather:</strong> {weather.weather}</p>
                <p>Temperature: {weather.temperature} °C</p>
                <p>Humidity: {weather.humidity}%</p>
                <p>Wind Speed: {weather.windSpeed} m/s</p>
            </div>
        </div>
    );
}