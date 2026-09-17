import { getDbDriver } from './ydb';

export async function fetchTariffs() {
  console.log('Отправляем запрос тарифов в Яндекс Облако...');
  
  // Вызываем нашу вчерашнюю функцию для подключения
  const driver = await getDbDriver();
  
  if (!driver) {
    console.error('Нет подключения к базе данных!');
    return null;
  }

  try {
    // Открываем рабочую сессию для отправки запроса
    const response = await driver.tableClient.withSession(async (session) => {
      // YQL запрос: берем все данные из таблицы prices
      return await session.executeQuery(`
        SELECT * FROM prices;
      `);
    });
    
    // YDB возвращает ответ в виде массива массивов, нам нужны только сами строки
    const tariffs = response.resultSets[0].rows;
    
    console.log('Успех! Данные о тарифах получены:', tariffs);
    return tariffs;

  } catch (error) {
    console.error('Произошла ошибка при загрузке тарифов:', error);
    return null;
  }
}
