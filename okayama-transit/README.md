# Okayama Transit Server

Сервер для отображения общественного транспорта города Окаяма (Япония) с использованием GTFS и GTFS-RT.

## Возможности

- 🚌 Отображение транспорта в реальном времени на карте
- 🔄 Обновление данных каждые 5 секунд через WebSocket
- 🗺️ Интерактивная карта Leaflet с OpenStreetMap
- 🎨 Цветовая индикация маршрутов
- 📊 Информация о скорости, направлении и заполненности транспорта
- 🌐 REST API и WebSocket для интеграции

## Структура проекта

```
okayama-transit/
├── server/
│   ├── index.js          # Основной серверный код
│   └── gtfs-realtime.js  # Protobuf схема GTFS-RT
├── public/
│   └── index.html        # Веб-интерфейс с картой
├── data/                 # Данные GTFS (для будущего импорта)
├── schema.proto          # Protobuf определение
├── package.json
└── README.md
```

## Установка

```bash
npm install
```

## Запуск

```bash
npm start
```

Сервер запустится на порту 3000 (или укажите PORT переменной окружения).

## API Endpoints

### GET /api/vehicles
Возвращает текущее положение всех транспортных средств.

```json
{
  "timestamp": 1234567890,
  "count": 15,
  "vehicles": [
    {
      "id": "vehicle_0",
      "routeId": "1",
      "routeName": "Route 1",
      "routeColor": "#FF0000",
      "latitude": 34.6551,
      "longitude": 133.9195,
      "speed": 35,
      "bearing": 180,
      "timestamp": 1234567890,
      "currentStatus": "IN_TRANSIT_TO",
      "occupancyStatus": "FEW_SEATS_AVAILABLE"
    }
  ]
}
```

### GET /api/info
Возвращает информацию о сервере.

```json
{
  "name": "Okayama Transit Server",
  "version": "1.0.0",
  "description": "GTFS-RT сервер для отображения транспорта Окаямы",
  "location": "Okayama, Japan",
  "coordinates": {"lat": 34.6551, "lon": 133.9195},
  "updateInterval": 5000,
  "vehicleCount": 15
}
```

### WebSocket
Подключение к WebSocket для получения обновлений в реальном времени.

Формат сообщений:
```json
{
  "type": "init|update",
  "timestamp": 1234567890,
  "vehicles": [...]
}
```

## Веб-интерфейс

Откройте http://localhost:3000 в браузере для просмотра карты с транспортом.

Функции интерфейса:
- Отображение всех активных транспортных средств
- Цветовая индикация маршрутов
- Всплывающие подсказки с детальной информацией
- Панель статуса с количеством транспорта и временем обновления
- Легенда маршрутов

## Тестовые данные

В текущей версии используются сгенерированные тестовые данные для эмуляции движения транспорта по городу Окаяма. Координаты находятся в пределах:
- Широта: 34.62 - 34.69
- Долгота: 133.88 - 133.96

## Интеграция с реальными данными GTFS-RT

Для подключения к реальному фиду GTFS-RT необходимо:

1. Найти URL GTFS-RT фид для Окаямы (например, через ODPT или местные транспортные операторы)
2. Модифицировать `server/index.js` для загрузки и парсинга реальных данных
3. Использовать модуль `gtfs-realtime.js` для декодирования Protobuf сообщений

Пример источника данных:
- ODPT (Open Data Challenge for Public Transportation in Tokyo): https://www.odpt.org/
- Местные транспортные операторы Окаямы

## Технологии

- **Backend**: Node.js, Express, WebSocket (ws)
- **Frontend**: Leaflet, OpenStreetMap
- **Data Format**: GTFS-RT (Protobuf)
- **Protocol**: WebSocket для реального времени, REST API для запросов

## Лицензия

ISC
