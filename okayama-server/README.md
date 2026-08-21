# 🚌 Okayama Transit Server

Сервер для отображения общественного транспорта в реальном времени с использованием стандартов **GTFS** и **GTFS-RT**. Разработан для города Окаяма (Япония) с поддержкой японских расширений GTFS.

## 📋 Описание

Проект представляет собой полноценный сервер с веб-интерфейсом для отслеживания положения транспортных средств на карте в реальном времени. Сервер обрабатывает:

- **Статические данные GTFS** (маршруты, остановки, расписания)
- **Динамические данные GTFS-RT** (позиции транспорта в реальном времени)

## 🏗️ Архитектура

```
okayama-server/
├── src/
│   ├── index.js          # Главный сервер (Express + WebSocket)
│   ├── config.js         # Конфигурация
│   ├── db.js             # Подключение к PostgreSQL + PostGIS
│   ├── gtfs-importer.js  # Импорт статических GTFS данных
│   └── rt-fetcher.js     # Получение и парсинг GTFS-RT
├── public/
│   ├── index.html        # Веб-интерфейс
│   ├── style.css         # Стили
│   └── app.js            # Клиентская логика с картой Leaflet
├── data/                 # Данные GTFS (статика и кэш)
├── package.json
├── .env.example
└── README.md
```

## 🚀 Быстрый старт

### Требования

- Node.js 16+
- PostgreSQL 13+ с расширением PostGIS
- Redis (опционально, для кэширования)

### Установка

1. **Клонируйте репозиторий и перейдите в папку проекта:**
```bash
cd okayama-server
```

2. **Установите зависимости:**
```bash
npm install
```

3. **Настройте переменные окружения:**
```bash
cp .env.example .env
```

Отредактируйте `.env` файл с вашими параметрами:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=okayama_transit

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379

# Server Configuration
PORT=3001
HOST=0.0.0.0

# GTFS-RT Feed URL (Okayama)
GTFS_RT_URL=https://www.okayama-bus.co.jp/gtfs-rt/vehicle_positions.pb
GTFS_STATIC_PATH=./data/gtfs-static.zip

# Update interval (ms)
RT_UPDATE_INTERVAL=5000
```

4. **Запустите PostgreSQL с PostGIS:**

Убедитесь, что PostgreSQL запущен и расширение PostGIS доступно:

```sql
CREATE DATABASE okayama_transit;
\c okayama_transit
CREATE EXTENSION IF NOT EXISTS postgis;
```

5. **Импортируйте статические данные GTFS (опционально):**

Скачайте GTFS-файл для Окаямы и поместите его в `data/gtfs-static.zip`, затем выполните:

```bash
npm run import-gtfs
```

6. **Запустите сервер:**
```bash
npm start
```

## 🌐 Доступ

После запуска сервер будет доступен по адресу:

- **Веб-интерфейс:** http://localhost:3001
- **API Vehicles:** http://localhost:3001/api/vehicles
- **API Routes:** http://localhost:3001/api/routes
- **API Stops:** http://localhost:3001/api/stops
- **API Info:** http://localhost:3001/api/info
- **WebSocket:** ws://localhost:3001

## 📡 API Endpoints

### GET /api/info
Информация о сервере и доступных эндпоинтах.

### GET /api/vehicles
Текущие позиции всех транспортных средств.

**Ответ:**
```json
[
  {
    "vehicle_id": "vehicle_1",
    "trip_id": "trip_1_1234567890",
    "route_id": "1",
    "latitude": 34.655,
    "longitude": 133.92,
    "bearing": 45,
    "speed": 35,
    "timestamp": "2024-01-01T12:00:00Z",
    "occupancy_status": "MANY_SEATS_AVAILABLE",
    "current_stop_sequence": 5
  }
]
```

### GET /api/routes
Список всех маршрутов из статических данных GTFS.

### GET /api/stops
Список остановок (лимит 1000).

## 🔌 WebSocket

Сервер использует Socket.IO для передачи обновлений в реальном времени.

**Подключение клиента:**
```javascript
const socket = io('http://localhost:3001');

socket.on('vehicles-update', (vehicles) => {
  console.log('Получено обновление:', vehicles);
});
```

**События:**
- `vehicles-update` — массив текущих позиций транспортных средств

## 🗺️ Веб-интерфейс

Интерактивная карта с:
- Отображением транспорта цветными маркерами
- Всплывающими подсказками с информацией
- Статистикой в реальном времени
- Легендой маршрутов
- Индикатором подключения

## 📊 GTFS-RT Поддержка

Сервер поддерживает следующие типы GTFS-RT сообщений:

- **VehiclePosition** — позиции транспортных средств
  - Координаты (широта, долгота)
  - Направление (bearing)
  - Скорость
  - Статус заполненности
  - Текущая остановка

- **TripUpdate** — обновления рейсов (в разработке)
- **Alert** — уведомления о сбоях (в разработке)

### Японские расширения (GTFS-JP)

Сервер готов к обработке японских расширений GTFS:
- UTF-8 кодировка
- Расширенные поля маршрутов (`ja_route_name` и др.)
- Специфичные форматы времени

## 🛠️ Разработка

### Режим разработки с авто-перезагрузкой:
```bash
npm run dev
```

### Структура модулей:

| Модуль | Описание |
|--------|----------|
| `config.js` | Конфигурация из переменных окружения |
| `db.js` | Подключение к PostgreSQL, инициализация таблиц PostGIS |
| `gtfs-importer.js` | Парсинг ZIP архива GTFS, импорт CSV файлов |
| `rt-fetcher.js` | Загрузка Protobuf GTFS-RT, декодирование, обновление БД |
| `index.js` | Express сервер, REST API, WebSocket, раздача статики |

## 📦 Зависимости

- **express** — HTTP сервер
- **socket.io** — WebSocket коммуникация
- **pg** — PostgreSQL клиент
- **protobufjs** — Парсинг GTFS-RT Protobuf
- **axios** — HTTP запросы к GTFS-RT фиду
- **csv-parser** — Парсинг CSV файлов GTFS
- **unzipper** — Распаковка GTFS ZIP архивов
- **leaflet** — Интерактивная карта (клиент)

## 🔧 Конфигурация

### Переменные окружения:

| Переменная | Описание | По умолчанию |
|------------|----------|--------------|
| `DB_HOST` | Хост PostgreSQL | `localhost` |
| `DB_PORT` | Порт PostgreSQL | `5432` |
| `DB_USER` | Пользователь БД | `postgres` |
| `DB_PASSWORD` | Пароль БД | `postgres` |
| `DB_NAME` | Имя базы данных | `okayama_transit` |
| `REDIS_HOST` | Хост Redis | `localhost` |
| `REDIS_PORT` | Порт Redis | `6379` |
| `PORT` | Порт сервера | `3001` |
| `HOST` | Хост сервера | `0.0.0.0` |
| `GTFS_RT_URL` | URL GTFS-RT фида | — |
| `GTFS_STATIC_PATH` | Путь к GTFS ZIP | `./data/gtfs-static.zip` |
| `RT_UPDATE_INTERVAL` | Интервал обновления (мс) | `5000` |

## 📝 Лицензия

MIT

## 🤝 Вклад

Проект открыт для улучшений. Пожалуйста, создавайте Pull Requests для:
- Добавления поддержки новых GTFS-RT типов
- Улучшения производительности
- Добавления тестов
- Обновления документации

## 📞 Контакты

Вопросы и предложения приветствуются!
