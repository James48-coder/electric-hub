import { json } from '@tanstack/start'
import { createAPIFileRoute } from '@tanstack/start/api'
import { getDbDriver } from '../../lib/db'

export const APIRoute = createAPIFileRoute('/api/auth')({
  POST: async ({ request }) => {
    try {
      const body = await request.json()
      const { action, email, password, name } = body

      if (!email || !password) {
        return json({ error: 'Email и пароль обязательны' }, { status: 400 })
      }

      const db = await getDbDriver()
      if (!db) {
        return json({ error: 'Сервер базы данных недоступен' }, { status: 500 })
      }

      // Твой личный доступ: если заходишь под этой почтой, система дает права ADMIN
      // Обязательно впиши сюда свою реальную почту!
      const role = email === 'admin@voltpro.ru' ? 'ADMIN' : 'USER'
      const userName = name || 'Мастер'

      return await db.tableClient.withSession(async (session: any) => {
        // Динамический импорт типизации, чтобы сборщик Vite не сломался
        const { TypedValues } = await import('ydb-sdk');

        try {
          if (action === 'register') {
            // Запись нового пользователя в таблицу
            const query = `
              DECLARE $email AS Utf8;
              DECLARE $name AS Utf8;
              DECLARE $password AS Utf8;
              DECLARE $role AS Utf8;
              
              UPSERT INTO users (email, name, password, role)
              VALUES ($email, $name, $password, $role);
            `;
            
            await session.executeQuery(query, {
              '$email': TypedValues.utf8(email),
              '$name': TypedValues.utf8(userName),
              '$password': TypedValues.utf8(password), 
              '$role': TypedValues.utf8(role)
            });
            
            return json({ user: { email, name: userName, role } })
          } 
          
          if (action === 'login') {
            // Проверка логина и пароля при входе
            const query = `
              DECLARE $email AS Utf8;
              SELECT email, name, password, role FROM users WHERE email = $email;
            `;
            
            const { resultSets } = await session.executeQuery(query, {
              '$email': TypedValues.utf8(email)
            });
            
            const rows = resultSets[0].rows;
            
            if (rows.length === 0) {
              return json({ error: 'Пользователь не найден' }, { status: 401 })
            }
            
            const user = rows[0];
            if (user.password !== password) {
              return json({ error: 'Неверный пароль' }, { status: 401 })
            }
            
            return json({ 
              user: { email: user.email, name: user.name, role: user.role } 
            })
          }
        } catch (dbError: any) {
          console.error('Ошибка выполнения YQL запроса:', dbError);
          if (dbError.message && dbError.message.includes('Cannot find table')) {
            return json({ error: 'Таблица users еще не создана в базе данных!' }, { status: 500 })
          }
          throw dbError;
        }
      })
    } catch (error: any) {
      console.error('Ошибка API авторизации:', error)
      return json({ error: 'Внутренняя ошибка сервера' }, { status: 500 })
    }
  }
})
