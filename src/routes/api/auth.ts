import { json } from '@tanstack/react-start'
import { createAPIFileRoute } from '@tanstack/react-start/api'

export const Route = createAPIFileRoute('/api/auth')({
  POST: async ({ request }) => {
    try {
      // Читаем, что нам прислала форма
      const body = await request.json()

      // Имитируем небольшую задержку сервера (1 секунда), чтобы было видно анимацию
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (body.action === 'register') {
        return json({ 
          success: true, 
          message: `Супер! Аккаунт для ${body.email} успешно создан. Подключаем базу D1...` 
        })
      }

      if (body.action === 'login') {
        return json({ 
          success: true, 
          message: `С возвращением! Данные ${body.email} получены сервером.` 
        })
      }

      return json({ success: false, message: 'Неизвестная команда' }, { status: 400 })

    } catch (error) {
      return json({ success: false, message: 'Ошибка сервера' }, { status: 500 })
    }
  },
})
