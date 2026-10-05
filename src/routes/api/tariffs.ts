import { json } from '@tanstack/start'
import { createAPIFileRoute } from '@tanstack/start/api'
// Подключаем наш НОВЫЙ безопасный драйвер базы данных
import { getDbDriver } from '../../lib/db'

export const APIRoute = createAPIFileRoute('/api/tariffs')({
  GET: async () => {
    console.log('Поступил запрос от интерфейса на загрузку цен...');
    
    try {
      // Стучимся в базу YDB через динамический импорт, чтобы Vite не ругался
      const db = await getDbDriver();
      
      if (db) {
        console.log('API тарифов: соединение с YDB активно. (Позже добавим SQL-запрос)');
        // Как только мы создадим таблицу в Яндексе, здесь будет db.tableClient.withSession(...)
      } else {
        console.log('API тарифов: YDB недоступна, используем резервные данные.');
      }
    } catch (error) {
      console.error('Ошибка при обращении к БД:', error);
    }
    
    // Железобетонная защита от сбоев: отдаем утвержденные цены 
    // Это гарантирует, что сайт визуально не сломается и красная ошибка в консоли исчезнет
    return json([
      { id: 'master', name: 'Master', price: 490 },
      { id: 'pro', name: 'PRO', price: 1490 }
    ])
  }
})
