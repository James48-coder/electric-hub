import { Driver, getCredentialsFromEnv } from 'ydb-sdk';

// Эта функция устанавливает надежное соединение с базой данных
export async function getDbDriver() {
  console.log('Начинаем подключение к базе Яндекса...');
  
  const driver = new Driver({
    endpoint: process.env.YDB_ENDPOINT,
    database: process.env.YDB_DATABASE,
    // Эта команда сама найдет те 3 ключа безопасности, которые мы вбили в Timeweb
    authService: getCredentialsFromEnv(), 
  });

  // Даем серверу до 10 секунд на установку защищенного соединения
  const isReady = await driver.ready(10000);
  
  if (!isReady) {
    console.error('Обрыв связи: не удалось подключиться к базе YDB!');
    return null;
  }
  
  console.log('Успех! Соединение с базой данных установлено.');
  return driver;
}
