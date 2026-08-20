-- Удаляем таблицы, если они уже существуют (полезно при пересоздании базы)
DROP TABLE IF EXISTS estimates;
DROP TABLE IF EXISTS subscriptions;
DROP TABLE IF EXISTS users;

-- 1. Таблица ПОЛЬЗОВАТЕЛИ
CREATE TABLE users (
  id TEXT PRIMARY KEY,           -- Уникальный ID пользователя
  email TEXT UNIQUE NOT NULL,    -- Почта (по ней будем логиниться)
  name TEXT,                     -- Имя (например, Иван Иванов)
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Таблица ПОДПИСКИ И ТАРИФЫ
CREATE TABLE subscriptions (
  user_id TEXT PRIMARY KEY,
  tariff_id TEXT NOT NULL DEFAULT 'free', -- 'free', 'master' или 'pro'
  estimates_limit INTEGER DEFAULT 0,      -- Лимит смет (0 для free, 10 для master, -1 для безлимита pro)
  estimates_used INTEGER DEFAULT 0,       -- Сколько смет уже сгенерировано в этом месяце
  expires_at DATETIME,                    -- Дата окончания подписки (NULL для free)
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Таблица ИСТОРИЯ СМЕТ (Для тарифов Master и PRO)
CREATE TABLE estimates (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  room_type TEXT NOT NULL,       -- Тип (например, "Квартира (Новостройка)")
  area REAL,                     -- Площадь в квадратах
  raw_result TEXT NOT NULL,      -- Сама смета в формате JSON (чтобы удобно выводить)
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Создаем индексы для быстрого поиска (чтобы база летала даже при 10 000+ пользователей)
CREATE INDEX idx_subscriptions_tariff ON subscriptions(tariff_id);
CREATE INDEX idx_estimates_user ON estimates(user_id);
