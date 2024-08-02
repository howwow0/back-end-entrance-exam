const https = require("https");
const cacheRepository = require("../repositories/cacheRepository");
const API_KEY = "03153a59bf95b6019492311af76192ba"; // Замените на ваш реальный ключ API

class WeatherService {
  async getWeather(city) {
    let weatherData = cacheRepository.get(city);
    if (weatherData) {
      return { data: weatherData, source: "cache" };
    }

    const { lat, lon } = await this.fetchCoordinates(city);
    weatherData = await this.fetchWeather(lat, lon);
    cacheRepository.set(city, weatherData);
    return { data: weatherData, source: "api" };
  }

  fetchCoordinates(city) {
    return new Promise((resolve, reject) => {
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
      https
        .get(geoUrl, (resp) => {
          let data = "";

          resp.on("data", (chunk) => {
            data += chunk;
          });

          resp.on("end", () => {
            const geoData = JSON.parse(data);
            if (geoData.length === 0) {
              reject("City not found");
            } else {
              resolve({ lat: geoData[0].lat, lon: geoData[0].lon });
            }
          });
        })
        .on("error", (err) => {
          reject("Error fetching coordinates from OpenWeather API");
        });
    });
  }

  fetchWeather(lat, lon) {
    return new Promise((resolve, reject) => {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      https
        .get(weatherUrl, (resp) => {
          let data = "";

          resp.on("data", (chunk) => {
            data += chunk;
          });

          resp.on("end", () => {
            resolve(JSON.parse(data));
          });
        })
        .on("error", (err) => {
          reject("Error fetching weather data from OpenWeather API");
        });
    });
  }

  clearCache() {
    cacheRepository.clear();
  }

  resizeCache(newSize) {
    cacheRepository.resize(newSize);
  }
}

module.exports = new WeatherService();
