import { createFileRoute } from '@tanstack/react-router'
import { Heart, MessageCircle, Share2, Eye, MoreHorizontal, Zap, Megaphone, Image as ImageIcon } from 'lucide-react'
import React, { useState } from 'react'

export const Route = createFileRoute('/articles')({
  component: ArticlesFeedPage,
})

// Моковые данные для ленты постов (как в соцсетях)
const mockPosts = [
  { 
    id: 1, 
    author: 'ВольтПро', 
    role: 'Администратор',
    date: 'Сегодня в 10:30', 
    text: 'Привет, коллеги! ⚡\nСегодня разберем важную тему: как правильно выбрать УЗО для влажных помещений (ванные комнаты, сауны). \n\nСпойлер: многие ставят стандартные 30мА, но по ПУЭ для выделенных линий на санузел рекомендуется 10мА. Делюсь схемой подключения и частыми ошибками монтажа. Не экономьте на безопасности заказчика!', 
    hasImage: true,
    likes: 124, 
    comments: 18, 
    views: 1500, 
    type: 'post' 
  },
  { 
    id: 2, 
    author: 'ВольтПро', 
    role: 'Администратор',
    date: 'Вчера в 18:15', 
    text: 'Очередной аудит щитка от застройщика. 🤦‍♂️\nНоль и земля на одной шине, автоматы номиналом 25А на розетки (кабель 2.5 квадрата)... Пришлось переделывать всё с нуля. Прикладываю фото "до" и "после".', 
    hasImage: true,
    likes: 342, 
    comments: 56, 
    views: 3200, 
    type: 'post' 
  },
  { 
    id: 3, 
    author: 'Спецпредложение', 
    date: 'Рекламная запись', 
    text: '🔥 Профессиональный инструмент электрика со скидкой 20% по промокоду ВОЛЬТПРО.\n\nНадежные пассатижи, стрипперы, обжимки и диэлектрические отвертки от официального дилера. Бесплатная доставка по всей РФ при заказе от 5000 руб.', 
    hasImage: false,
    type: 'ad' 
  },
  { 
    id: 4, 
    author: 'ВольтПро', 
    role: 'Администратор',
    date: '14 августа в 09:00', 
    text: 'Вышло обновление ГОСТ 31996-2012 по кабельной продукции. Краткая выжимка изменений для тех, кому лень читать 150 страниц официального документа. \n\nВ основном коснулось маркировки и требований к изоляции в общественных зданиях. Сохраняйте в закладки, чтобы не потерять!', 
    hasImage: false,
    likes: 89, 
    comments: 5, 
    views: 980, 
    type: 'post' 
  },
]

function ArticlesFeedPage() {
  // Простой стейт для имитации лайков (только визуально)
  const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>({})

  const toggleLike = (id: number) => {
    setLikedPosts(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 animate-in fade-in duration-500 text-foreground pb-24 flex justify-center">
      
      {/* Ограничиваем ширину ленты, чтобы удобно читалось как на ПК, так и на мобилке */}
      <div className="w-full max-w-2xl space-y-6 sm:space-y-8">
        
        {/* Шапка раздела */}
        <div className="mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-[10px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
            Статьи и Новости
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Лента ВольтПро</h1>
        </div>

        {/* Фиктивное поле "Написать статью" (видно только админу) */}
        <div className="bg-card border border-border rounded-2xl p-4 shadow-sm flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <div className="flex-1 bg-muted rounded-xl px-4 py-2 sm:py-3 text-sm text-muted-foreground cursor-text">
            Опубликовать новую статью...
          </div>
        </div>

        {/* Вывод постов */}
        {mockPosts.map((post) => (
          post.type === 'post' ? (
            // ================= Обычный ПОСТ =================
            <article key={post.id} className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col">
              
              {/* Шапка поста */}
              <div className="p-4 sm:p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                    <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-primary fill-primary/20" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-foreground leading-tight flex items-center gap-2">
                      {post.author}
                      <span className="bg-primary/10 text-primary text-[8px] sm:text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider">
                        {post.role}
                      </span>
                    </h3>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{post.date}</p>
                  </div>
                </div>
                <button className="p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>

              {/* Текст поста */}
              <div className="px-4 sm:px-5 pb-3 sm:pb-4">
                <p className="text-sm sm:text-base text-foreground leading-relaxed whitespace-pre-wrap">
                  {post.text}
                </p>
              </div>

              {/* Картинка (если есть) */}
              {post.hasImage && (
                <div className="w-full bg-muted aspect-video sm:h-[400px] flex flex-col items-center justify-center border-y border-border">
                  <ImageIcon className="h-12 w-12 text-muted-foreground/30 mb-2" />
                  <span className="text-xs text-muted-foreground/50 font-medium">Место для фотографии/схемы</span>
                </div>
              )}

              {/* Подвал (Реакции) */}
              <div className="p-2 sm:p-4 flex items-center justify-between border-t border-border mt-2 sm:mt-0">
                <div className="flex items-center gap-1 sm:gap-2">
                  <button 
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:py-2 rounded-xl transition-colors text-xs sm:text-sm font-bold ${likedPosts[post.id] ? 'bg-red-500/10 text-red-500' : 'hover:bg-muted text-muted-foreground'}`}
                  >
                    <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${likedPosts[post.id] ? 'fill-red-500' : ''}`} /> 
                    {post.likes + (likedPosts[post.id] ? 1 : 0)}
                  </button>
                  <button className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:py-2 rounded-xl hover:bg-muted text-muted-foreground transition-colors text-xs sm:text-sm font-bold">
                    <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" /> {post.comments}
                  </button>
                  <button className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:py-2 rounded-xl hover:bg-muted text-muted-foreground transition-colors text-xs sm:text-sm font-bold">
                    <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground px-3 text-xs sm:text-sm font-medium">
                  <Eye className="h-4 w-4 sm:h-5 sm:w-5 opacity-70" /> {post.views}
                </div>
              </div>
            </article>

          ) : (
            // ================= РЕКЛАМНЫЙ ПОСТ (Нативный) =================
            <article key={post.id} className="bg-amber-500/5 border border-amber-500/20 rounded-2xl overflow-hidden shadow-sm flex flex-col relative">
              <div className="absolute top-4 right-4 sm:top-5 sm:right-5 bg-amber-500/20 text-amber-500 px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-black uppercase tracking-wider">
                Реклама
              </div>
              
              <div className="p-4 sm:p-5 flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 border border-amber-500/30">
                  <Megaphone className="h-5 w-5 sm:h-6 sm:w-6 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-foreground leading-tight">
                    {post.author}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{post.date}</p>
                </div>
              </div>

              <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                <p className="text-sm sm:text-base text-foreground leading-relaxed whitespace-pre-wrap">
                  {post.text}
                </p>
                <button className="mt-4 sm:mt-6 w-full py-2.5 sm:py-3 bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-neutral-950 font-bold rounded-xl text-sm transition-colors">
                  Узнать подробности
                </button>
              </div>
            </article>
          )
        ))}
      </div>
    </div>
  )
}
