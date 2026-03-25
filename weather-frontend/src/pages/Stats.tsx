import React, {useEffect, useState} from "react";
import axios from "axios";
import { Bar, Pie} from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import API from "../api/api";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

interface TopCity {
    city: string;
    count: number;
};

interface LatestSearch {
    city: string;
    weatherCondition: string;
    searchDate: string;
};

interface WeatherCounts {
    weatherCondition: string;
    count: number;
}

interface StatsData {
    topCities: TopCity[];
    latestSearches: LatestSearch[];
    weatherCounts: WeatherCounts[];
};

export default function Stats() {
    const [stats, setStats] = useState<StatsData | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await API.get<StatsData>("/stats");
                console.log("Stats response:", response.data);
                setStats(response.data);
            } catch (error) {
                console.error("Error fetching stats data:", error);
            }
        };

        fetchStats();
    }, []);

    if (!stats) {
        return <div>Loading...</div>;
    }

    const topCitiesData = {
        labels: stats.topCities.map(c => c.city),
        datasets: [
            {
                label: "Search Count",
                data: stats.topCities.map(c => c.count),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
        ],
    };

    console.log("Weather distribution data:", stats.weatherCounts);
    const weatherDistributionData = {
        
        labels: stats.weatherCounts?.map(w => w.weatherCondition) || [],
        datasets: [
        {
            label: "Weather Distribution",
            data: stats.weatherCounts?.map(w => w.count) || [],
            backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 205, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
            ],
        },
        ],
    };

    return (
        <div>
            <h2>Stats</h2>
                <h3>Latest Searches</h3>
                <ul>
                    {stats.latestSearches.map((search, index) => (
                        <li key={index}>
                            {search.city} - {search.searchDate}
                        </li>
                    ))}
                </ul>

                <h3>Top Searched Cities</h3>
                <Bar data={topCitiesData} />

                <h3>Weather Distribution</h3>
                <Pie data={weatherDistributionData} />
        </div>
    );
};
