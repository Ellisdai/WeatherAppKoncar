import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type ForecastItem = {
    date: string;
    temperature: number;
    weather: string;
    humidity: number;
    windSpeed: number;
};

type ForecastChartProps = {
    forecasts: ForecastItem[];
};

const ForecastChart: React.FC<ForecastChartProps> = ({ forecasts }) => {
    const chartData = {
        labels: forecasts.map(f => f.date),
        datasets: [
            {
                label: "Temperature (°C)",
                data: forecasts.map(f => f.temperature),
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
            },
        ],
    };

    return <Line data={chartData} />;
};

export default ForecastChart;