import { createFileRoute } from '@tanstack/react-router'
import { getDbDriver } from '../../lib/db'

export const Route = createFileRoute('/api/auth')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json()
          const { action, email, password, name } = body

          if (!email || !password) {
            return Response.json({ error: 'Email и пароль обязательны' }, { status: 400 })
          }

          const db = await getDbDriver()
          if (!db) {
            return Response.json({ error: 'Сервер базы данных недоступен' }, { status: 500 })
          }

          // Выдача прав админа
          const role = email === 'admin@voltpro.ru' ? 'ADMIN' : 'USER'
          const userName = name || 'Мастер'

          return await db.tableClient.withSession(async (session: any) => {
            const { TypedValues } = await import('ydb-sdk');

            try {
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
                
                return Response.json({ user: { email, name: userName, role } })
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
                  return Response.json({ error: 'Пользователь не найден' }, { status: 401 })
                }
                
                const user = rows[0];
                if (user.password !== password) {
                  return Response.json({ error: 'Неверный пароль' }, { status: 401 })
                }
                
                return Response.json({ 
                  user: { email: user.email, name: user.name, role: user.role } 
                })
              }

              return Response.json({ error: 'Неизвестное действие' }, { status: 400 })
            } catch (dbError: any) {
              console.error('Ошибка выполнения YQL запроса:', dbError);
              if (dbError.message && dbError.message.includes('Cannot find table')) {
                return Response.json({ error: 'Таблица users еще не создана в базе данных!' }, { status: 500 })
              }
              throw dbError;
            }
          })
        } catch (error: any) {
          console.error('Ошибка API авторизации:', error)
          return Response.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 })
        }
      }
    }
  }
})
