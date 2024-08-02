const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

/**
 * @swagger
 * tags:
 *   name: Weather
 *   description: Операции с данными о погоде
 */

/**
 * @swagger
 * /weather:
 *   get:
 *     summary: Получить данные о погоде
 *     tags:
 *       - Weather
 *     parameters:
 *       - name: city
 *         in: query
 *         required: true
 *         description: Название города
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Данные о погоде для указанного города
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     coord:
 *                       type: object
 *                       properties:
 *                         lon:
 *                           type: number
 *                         lat:
 *                           type: number
 *                     weather:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           main:
 *                             type: string
 *                           description:
 *                             type: string
 *                           icon:
 *                             type: string
 *                     main:
 *                       type: object
 *                       properties:
 *                         temp:
 *                           type: number
 *                         feels_like:
 *                           type: number
 *                         temp_min:
 *                           type: number
 *                         temp_max:
 *                           type: number
 *                         pressure:
 *                           type: integer
 *                         humidity:
 *                           type: integer
 *                     wind:
 *                       type: object
 *                       properties:
 *                         speed:
 *                           type: number
 *                         deg:
 *                           type: integer
 *                     clouds:
 *                       type: object
 *                       properties:
 *                         all:
 *                           type: integer
 *                     sys:
 *                       type: object
 *                       properties:
 *                         country:
 *                           type: string
 *                         sunrise:
 *                           type: integer
 *                         sunset:
 *                           type: integer
 *                     name:
 *                       type: string
 *                     timezone:
 *                       type: integer
 *                 source:
 *                   type: string
 *                   example: 'api'
 *       400:
 *         description: Параметр `city` отсутствует или пустой
 *       500:
 *         description: Ошибка при получении данных о погоде
 */
router.get('/', weatherController.getWeather);

/**
 * @swagger
 * /weather/cache/clear:
 *   post:
 *     summary: Очистить кеш
 *     tags:
 *       - Weather
 *     responses:
 *       200:
 *         description: Кеш успешно очищен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: 'Cache cleared'
 */
router.post('/cache/clear', weatherController.clearCache);

/**
 * @swagger
 * /weather/cache/resize:
 *   post:
 *     summary: Изменить размер кеша
 *     tags:
 *       - Weather
 *     parameters:
 *       - name: size
 *         in: query
 *         required: true
 *         description: Новый размер кеша
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Размер кеша успешно обновлен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: 'Cache size updated'
 *                 newSize:
 *                   type: integer
 *                   example: 200
 *       400:
 *         description: Параметр `size` отсутствует или не является числом
 */
router.post('/cache/resize', weatherController.resizeCache);

module.exports = router;
