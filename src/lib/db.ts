let ydbDriverInstance: any = null;

export async function getDbDriver() {
  // 1. Жесткая защита: блокируем любую попытку вызвать БД из браузера
  if (typeof window !== 'undefined') {
    return null;
  }

  // 2. Если соединение уже установлено — используем его повторно
  if (!ydbDriverInstance) {
    try {
      console.log('Инициализация подключения к Yandex Database...');
      
      // 3. ДИНАМИЧЕСКИЙ ИМПОРТ: именно он прячет серверный код от сборщика Vite!
      const { Driver, getCredentialsFromEnv } = await import('ydb-sdk');
      
      // Твои доступы к базе YDB Serverless
      const endpoint = process.env.YDB_ENDPOINT || 'grpcs://ydb.serverless.yandexcloud.net:2135';
      const database = process.env.YDB_DATABASE || '/ru-central1/b1g668qoqsqc588tnrkf/etnuo4nuong9pf4kqful';

      ydbDriverInstance = new Driver({
        endpoint,
        database,
        // Берет ключи авторизации из системных переменных Timeweb
        authService: getCredentialsFromEnv(), 
      });

      // Даем базе 10 секунд на установку защищенного соединения
      const isReady = await ydbDriverInstance.ready(10000);
      if (!isReady) {
        console.error('Не удалось установить соединение с YDB (таймаут).');
        ydbDriverInstance = null;
        return null;
      }
      
      console.log('✅ Соединение с базой данных YDB успешно установлено!');
    } catch (error) {
      console.error('❌ Критическая ошибка при подключении к YDB:', error);
      ydbDriverInstance = null;
      return null;
    }
  }
  
  return ydbDriverInstance;
}
