import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/auth')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          // Читаем, что нам прислала форма
          const body = await request.json()

          // Имитируем небольшую задержку сервера (1 секунда), чтобы было видно анимацию
          await new Promise(resolve => setTimeout(resolve, 1000))

          if (body.action === 'register') {
            return Response.json({ 
              success: true, 
              message: `Супер! Аккаунт для ${body.email} успешно создан. Подключаем базу D1...` 
            })
          }

          if (body.action === 'login') {
            return Response.json({ 
              success: true, 
              message: `С возвращением! Данные ${body.email} получены сервером.` 
            })
          }

          return Response.json({ success: false, message: 'Неизвестная команда' }, { status: 400 })

        } catch (error) {
          return Response.json({ success: false, message: 'Ошибка сервера' }, { status: 500 })
        }
      }
    }
  }
})
