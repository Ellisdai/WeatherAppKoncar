import {Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav style={{ marginBottom: "20px", backgroundColor: "#eee" }}>
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/history">Search History</Link></li>
                <li><Link to="/stats">Statistics</Link></li>
            </ul>
        </nav>
    );
}