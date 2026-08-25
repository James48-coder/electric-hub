import { json } from '@tanstack/start'
import { createAPIFileRoute } from '@tanstack/react-router'

export const APIRoute = createAPIFileRoute('/api/ping')({
  GET: () => {
    return json({ message: 'Бэкенд на связи! Ошибки 404 больше нет.' })
  },
})
