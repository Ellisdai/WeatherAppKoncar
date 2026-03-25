🌦 Weather App

Full-stack web aplikacija za prikaz vremenske prognoze s autentikacijom korisnika.

🚀 Tehnologije

Frontend: React (TypeScript)

Backend: .NET 8 Web API

Baza: PostgreSQL

Autentikacija: JWT + Refresh Token

API: OpenWeather

🔐 Funkcionalnosti
Registracija i login korisnika
JWT autentikacija
Refresh token sustav
Trenutno vrijeme (geolokacija)
Pretraga prognoze (5 dana)
Spremanje pretraga u bazu
Povijest pretraga

Statistika:
Top 3 grada
Zadnje 3 pretrage
Distribucija vremenskih uvjeta
Graf + grid prikaz istih podataka

⚙️ Pokretanje projekta
1️⃣ Backend
cd WeatherWebAPIKoncar
dotnet restore
dotnet ef database update
dotnet run

Backend radi na:
https://localhost:7071/

2️⃣ Frontend
cd weather-frontend
npm install
npm start


Frontend radi na:
http://localhost:3000/


🔑 Konfiguracija

Napraviti appsettings.Development.json:
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=weatherdb;Username=postgres;Password=yourpassword"
  },

  "Jwt": {
    "Key": "your_secret_key",
    "Issuer": "WeatherApp",
    "Audience": "WeatherAppUsers",
    "ExpiresInMinutes": 60
  },

  "OpenWeather": {
    "ApiKey": "your_api_key"
  }
}


Napomena!
appsettings.Development.json nije uključen u repo zbog sigurnosti
Potrebno je dodati vlastiti API key i connection string
