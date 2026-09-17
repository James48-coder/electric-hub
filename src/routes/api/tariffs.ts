import { json } from '@tanstack/start'
import { createAPIFileRoute } from '@tanstack/start/api'
// Подключаем наш скрипт работы с базой Яндекса
import { fetchTariffs } from '../../db/getTariffs'

export const APIRoute = createAPIFileRoute('/api/tariffs')({
  GET: async () => {
    console.log('Поступил запрос от интерфейса на загрузку цен...');
    
    // Стучимся в базу YDB
    const tariffs = await fetchTariffs()
    
    // Защита от сбоев: если Яндекс Облако вдруг недоступно, 
    // отдаем стандартные цены, чтобы сайт визуально не сломался
    if (!tariffs) {
      return json([
        { id: 'master', price: 490 },
        { id: 'pro', price: 1490 }
      ])
    }
    
    // Если всё ок — отдаем реальные цены из базы на сайт
    return json(tariffs)
  }
})
