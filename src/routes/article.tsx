import { createFileRoute } from '@tanstack/react-router'
// Подключаем наш умный движок для статей
import { ArticleViewer, ArticleBlock } from '../components/ArticleViewer'
import React from 'react'

export const Route = createFileRoute('/article')({
  component: ArticlePage,
})

// Наша первая статья. Просто пишем текст, даем ссылки на картинки из папки public и ID видео с YouTube
const myArticleBlocks: ArticleBlock[] = [
  {
    type: 'text',
    content: 'Привет! Это моя первая тестовая статья на ВольтПро. Ниже я покажу, как легко вставлять картинки и обучающие видео по электрике. Всё это автоматически адаптируется под экраны телефонов, чтобы мастерам было удобно читать прямо на объекте.'
  },
  {
    type: 'image',
    url: '/test.jpg', // Название картинки, которую ты загрузил в папку public!
    caption: 'Пример качественного электромонтажа'
  },
  {
    type: 'text',
    content: 'А вот так выглядит встроенное видео с YouTube. Оно не грузит наш сервер (потому что работает через сервера самого YouTube), но выглядит так, будто это часть нашего сайта ВольтПро:'
  },
  {
    type: 'youtube',
    videoId: 'vU4PqM-QdKk' // Это кусок ссылки на видео (например про электрику)
  }
]

function ArticlePage() {
  return (
    <div className="pb-24">
      {/* Передаем заголовок и наши блоки в умный движок */}
      <ArticleViewer 
        title="Как работает новый движок статей ВольтПро" 
        blocks={myArticleBlocks} 
      />
    </div>
  )
}
