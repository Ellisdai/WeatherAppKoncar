import React from "react";

type ForecastItem = {
    date: string;
    temperature: number;
    weather: string;
    humidity: number;
    windSpeed: number;
};

interface ForecastGridProps {
    forecasts: ForecastItem[];
};

const ForecastGrid: React.FC<ForecastGridProps> = ({ forecasts }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temperature</th>
                    <th>Weather</th>
                    <th>Humidity</th>
                    <th>Wind Speed</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map((f, i) => (
                    <tr key={i}>
                        <td>{f.date}</td>
                        <td>{f.temperature} °C</td>
                        <td>{f.weather}</td>
                        <td>{f.humidity}%</td>
                        <td>{f.windSpeed} m/s</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ForecastGrid;