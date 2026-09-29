import { Driver, getCredentialsFromEnv, getSACredentialsFromJson } from 'ydb-sdk';

const endpoint = 'grpcs://ydb.serverless.yandexcloud.net:2135';
const database = '/ru-central1/b1g668qoqsqc588tnrkf/etnuo4nuong9pf4kqful';

// Получаем текст ключа из переменных окружения Timeweb
const saJson = process.env.YDB_SA_JSON;

// Инициализация драйвера YDB
export const dbDriver = new Driver({
  endpoint,
  database,
  // Если переменная есть — парсим её, иначе используем стандартный поиск файлов
  authService: saJson ? getSACredentialsFromJson(saJson) : getCredentialsFromEnv(),
});

// Функция для безопасной инициализации соединения
export async function initDb() {
  const timeout = 10000;
  if (!dbDriver.ready(timeout)) {
    console.log('Подключение к Yandex Cloud YDB...');
    try {
      await dbDriver.ready(timeout);
      console.log('Успешное подключение к базе данных YDB!');
    } catch (error) {
      console.error('Ошибка подключения к YDB:', error);
    }
  }
}
