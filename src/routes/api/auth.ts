import { json } from '@tanstack/start'
import { createAPIFileRoute } from '@tanstack/start/api'

export const APIRoute = createAPIFileRoute('/api/auth')({
  POST: async () => {
    // ПИНГ-ТЕСТ: Никаких баз данных. Никаких проверок. 
    // Просто мгновенно возвращаем успех, чтобы проверить, работает ли API.
    return json({ 
      user: { email: 'admin@voltpro.ru', name: 'Проверка Связи', role: 'ADMIN' } 
    })
  }
})
