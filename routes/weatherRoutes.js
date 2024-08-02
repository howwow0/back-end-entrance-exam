const express = require("express");
const weatherController = require("../controllers/weatherController");
const router = express.Router();

/**
 * @swagger
 * /weather:
 *   get:
 *     summary: Получить данные о погоде для указанного города
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         required: true
 *         description: Название города
 *     responses:
 *       200:
 *         description: Успешное получение данных о погоде
 *       400:
 *         description: Неверный запрос
 *       500:
 *         description: Ошибка сервера
 */
router.get("/", weatherController.getWeather);

/**
 * @swagger
 * /weather/cache/clear:
 *   post:
 *     summary: Очистить кеш
 *     responses:
 *       200:
 *         description: Кеш успешно очищен
 */
router.post("/cache/clear", weatherController.clearCache);

/**
 * @swagger
 * /weather/cache/resize:
 *   post:
 *     summary: Изменить размер кеша
 *     parameters:
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         required: true
 *         description: Новый размер кеша
 *     responses:
 *       200:
 *         description: Размер кеша успешно изменен
 *       400:
 *         description: Неверный запрос
 */
router.post("/cache/resize", weatherController.resizeCache);

module.exports = router;
