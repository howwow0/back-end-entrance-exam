const express = require("express");
const swaggerUi = require("swagger-ui-express");
const weatherRoutes = require("./routes/weatherRoutes");
const swaggerSetup = require("./swagger");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
swaggerSetup(app); // Интеграция Swagger
app.use("/weather", weatherRoutes);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
