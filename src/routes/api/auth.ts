import { json } from '@tanstack/start'
import { createAPIFileRoute } from '@tanstack/start/api'
import { getDbDriver } from '../../lib/db'

export const APIRoute = createAPIFileRoute('/api/auth')({
  POST: async ({ request }) => {
    try {
      // 1. Безопасное чтение данных
      let body;
      try {
        body = await request.json()
      } catch (e) {
        return json({ error: 'Сервер не смог прочитать данные формы' }, { status: 400 })
      }

      const { action, email, password, name } = body

      if (!email || !password) {
        return json({ error: 'Email и пароль обязательны' }, { status: 400 })
      }

      // 2. Подключение к БД
      const db = await getDbDriver()
      if (!db) {
        return json({ error: 'База YDB недоступна. Проблема с подключением из Timeweb.' }, { status: 500 })
      }

      const role = email === 'admin@voltpro.ru' ? 'ADMIN' : 'USER'
      const userName = name || 'Мастер'

      // 3. Работа с Яндекс Облаком
      return await db.tableClient.withSession(async (session: any) => {
        // Специальный флаг @vite-ignore скрывает эту строку от сборщика, чтобы он не убил сервер
        const { TypedValues } = await import('ydb-sdk' /* @vite-ignore */);

        if (action === 'register') {
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

        return json({ error: 'Неизвестная команда' }, { status: 400 })
      })
    } catch (error: any) {
      console.error('СБОЙ В API AUTH:', error)
      return json({ error: `Жесткий сбой сервера: ${error.message || 'Смотри логи Timeweb'}` }, { status: 500 })
    }
  }
})
