import { Driver, getCredentialsFromEnv, getSACredentialsFromJson } from 'ydb-sdk';

const endpoint = 'grpcs://ydb.serverless.yandexcloud.net:2135';
const database = '/ru-central1/b1g668qoqsqc588tnrkf/etnuo4nuong9pf4kqful';

// Храним единственный экземпляр подключения
let driverInstance: Driver | null = null;

export async function getDbDriver() {
  // Если уже подключились ранее — просто отдаем готовое соединение
  if (driverInstance) return driverInstance;

  console.log('Попытка инициализации YDB...');
  try {
    const saJson = process.env.YDB_SA_JSON;
    
    // Парсим ключ, если он есть, иначе пытаемся найти стандартные ключи
    const authService = saJson 
      ? getSACredentialsFromJson(saJson) 
      : getCredentialsFromEnv();

    const newDriver = new Driver({ 
      endpoint, 
      database, 
      authService 
    });

    const timeout = 10000;
    // Ждем готовности драйвера
    if (!newDriver.ready(timeout)) {
      await newDriver.ready(timeout);
    }
    
    console.log('Успешное подключение к YDB!');
    driverInstance = newDriver;
    return driverInstance;

  } catch (error) {
    // Перехватываем ошибку, выводим в консоль, но НЕ роняем весь сайт
    console.error('Критическая ошибка подключения к YDB:', error);
    return null; 
  }
}
