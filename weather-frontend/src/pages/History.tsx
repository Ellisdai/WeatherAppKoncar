import React, {use, useEffect, useState} from "react";
import axios from "axios";
import API from "../api/api";

type HistoryItem = {
    id: number;
    city: string;
    searchDate: string;
    weatherCondition: string;
};

const History: React.FC = () => {
    const [history, setHistory] = useState<HistoryItem[]>([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await API.get("/search/history");
                console.log("Search history response:", response.data);
                setHistory(response.data);
            } catch (error) {
                console.error("Error fetching search history:", error);
            }
        };

        fetchHistory();
    }, []);

    return (
        <div>
            <h2>Search History</h2>
            
            <table>
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Date</th>
                        <th>Forecast Data</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((f) => (
                        <tr key={f.id}>
                            <td>{f.city}</td>
                            <td>{f.searchDate}</td>
                            <td>{f.weatherCondition}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default History;
export {};