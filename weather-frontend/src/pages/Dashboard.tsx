import React, { useEffect, useState} from "react";
import axios from "axios";
import API from "../api/api";
import WeatherWidget from "../components/WeatherWidget";
import ForecastChart from "../components/ForecastChart";
import ForecastGrid from "../components/ForecastGrid";
import CurrentWeather from "../components/CurrentWeather";


type ForecastItem = {
    date: string;
    temperature: number;
    weather: string;
    humidity: number;
    windSpeed: number;
};

const Dashboard: React.FC = () => {
    const [city, setCity] = useState("Zagreb");
    const [selectedCity, setSelectedCity] = useState("");
    const [forecast, setForecast] = useState<ForecastItem[]>([]);

    const fetchForecast = async (city: string) => {
        try {
            const response = await API.get(`/weather/forecast?city=${city}`);
            setForecast(response.data.forecasts);

            await API.post("/search/save", {
            city: response.data.city,
            searchdate : new Date().toISOString(),
            weatherCondition: response.data.forecasts[0].weather,
        });
        } catch (error) {
            console.error("Error fetching forecast data:", error);
        }
    };

    useEffect(() => {
        if(!selectedCity) return;
        fetchForecast(selectedCity);
    }, [selectedCity]);

    const handleSearch = () => {
        if(!city) return;
        setSelectedCity(city);
    };

    return (
        <div>
            <input value = {city} onChange={(e) => setCity(e.target.value)}/>
            <button onClick={handleSearch}>Search</button>
            <ForecastChart forecasts={forecast} />
            <ForecastGrid forecasts={forecast} />
        </div>
    );
};

export default Dashboard;