# Okayama Transit Server (GTFS & GTFS-RT)

Серверное приложение для отображения общественного транспорта в реальном времени на основе стандартов **GTFS** (статическое расписание) и **GTFS-RT** (данные в реальном времени). Ориентировано на данные города Окаяма (Япония), но архитектура универсальна.

## Особенности

- 🚌 **Поддержка GTFS/GTFS-RT**: Парсинг статических расписаний и потоковых данных через Protocol Buffers.
- 🌏 **Японская локализация**: Учет специфических полей и кодировок (UTF-8).
- 🗺️ **Интерактивная карта**: Визуализация транспорта в реальном времени (Leaflet + OpenStreetMap).
- ⚡ **Real-time обновления**: WebSocket для мгновенной передачи данных на клиент.
- 🐳 **Docker Ready**: Легкий запуск всех зависимостей (PostgreSQL/PostGIS, Redis, Node.js).
- 📡 **REST API & WebSocket**: Гибкая интеграция с внешними системами.

## Архитектура

1. **Importer**: Загружает и распаковывает GTFS ZIP, парсит CSV, сохраняет в PostgreSQL (PostGIS).
2. **RT Fetcher**: Периодически опрашивает URL GTFS-RT, декодирует Protobuf, обновляет позиции в Redis/DB.
3. **API Server**: Отдает статику, предоставляет REST endpoints (`/api/vehicles`) и WebSocket соединение.
4. **Client**: Веб-интерфейс с картой, подписывается на WebSocket и рендерит маркеры.

## Технологический стек

- **Backend**: Node.js (Express, ws, protobufjs, pg, ioredis)
- **Database**: PostgreSQL + PostGIS (гео-данные)
- **Cache**: Redis (быстрый доступ к позициям)
- **Frontend**: HTML5, CSS3, Vanilla JS, Leaflet
- **DevOps**: Docker, Docker Compose

## Быстрый старт

### Требования
- Docker & Docker Compose
- Node.js 18+ (если запуск без Docker)

### Установка и запуск (Docker)

1. Клонируйте репозиторий:
   ```bash
   git clone <your-repo-url>
   cd okayama-transit-server
   ```

2. Настройте переменные окружения (опционально, есть значения по умолчанию):
   ```bash
   cp .env.example .env
   ```

3. Запустите контейнеры:
   ```bash
   docker-compose up --build
   ```

4. Откройте браузер:
   - Веб-интерфейс: [http://localhost:3001](http://localhost:3001)
   - API Vehicles: [http://localhost:3001/api/vehicles](http://localhost:3001/api/vehicles)
   - API Info: [http://localhost:3001/api/info](http://localhost:3001/api/info)

### Запуск без Docker (Локальная разработка)

1. Установите зависимости:
   ```bash
   cd server
   npm install
   ```

2. Убедитесь, что PostgreSQL (с PostGIS) и Redis запущены.

3. Импортируйте GTFS данные (единовременно):
   ```bash
   node src/gtfs-importer.js
   ```

4. Запустите сервер:
   ```bash
   node src/index.js
   ```

## Конфигурация

Основные настройки находятся в `.env` или `server/src/config.js`:
- `GTFS_RT_URL`: Ссылка на фид GTFS-RT (по умолчанию тестовый URL для Окаямы).
- `GTFS_STATIC_PATH`: Путь к ZIP-архиву со статическим GTFS.
- `DB_HOST`, `REDIS_HOST`: Адреса сервисов базы данных.

## Структура API

### REST
- `GET /api/info`: Статус сервера, версия, количество транспортных средств.
- `GET /api/vehicles`: Массив объектов транспорта (id, lat, lon, bearing, speed, route_id).

### WebSocket
- Подключение: `ws://localhost:3001`
- Формат сообщения: JSON объект с массивом `vehicles`.

## Данные (Okayama, Japan)

Проект настроен на работу с данными Окаямы.
- Статические данные должны быть загружены вручную в папку `data/` или указаны в конфиге.
- RT фид берется из публичных источников (требуется актуальная ссылка в `.env`).

## Лицензия
MIT

---
*Создано для демонстрации работы с GTFS/GTFS-RT стандартами.*