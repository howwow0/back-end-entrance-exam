const weatherService = require("../services/weatherService");

class WeatherController {
  async getWeather(req, res) {
    const city = req.query.city;
    if (!city) {
      return res.status(400).json({ error: "City parameter is required" });
    }

    try {
      const weatherData = await weatherService.getWeather(city);
      return res.json(weatherData);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  clearCache(req, res) {
    weatherService.clearCache();
    return res.json({ status: "Cache cleared" });
  }

  resizeCache(req, res) {
    const newSize = parseInt(req.query.size, 10);
    if (isNaN(newSize) || newSize <= 0) {
      return res.status(400).json({ error: "Invalid size parameter" });
    }

    weatherService.resizeCache(newSize);
    return res.json({ status: "Cache size updated", newSize });
  }
}

module.exports = new WeatherController();
