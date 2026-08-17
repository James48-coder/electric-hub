import { createFileRoute } from '@tanstack/react-router'
import { Heart, MessageCircle, Share2, Eye, MoreHorizontal, Zap, Megaphone, Image as ImageIcon, Send, X, CheckCircle2 } from 'lucide-react'
import React, { useState } from 'react'

export const Route = createFileRoute('/articles')({
  component: ArticlesFeedPage,
})

// Базовые посты
const initialPosts = [
  { id: 1, author: 'ВольтПро', role: 'Администратор', date: 'Сегодня в 10:30', text: 'Привет, коллеги! ⚡\nСегодня разберем важную тему: как правильно выбрать УЗО для влажных помещений...', hasImage: true, likes: 124, views: 1500, type: 'post' },
  { id: 2, author: 'ВольтПро', role: 'Администратор', date: 'Вчера в 18:15', text: 'Очередной аудит щитка от застройщика. 🤦‍♂️\nНоль и земля на одной шине, автоматы номиналом 25А на розетки...', hasImage: true, likes: 342, views: 3200, type: 'post' },
  { id: 3, author: 'Спецпредложение', date: 'Рекламная запись', text: '🔥 Профессиональный инструмент электрика со скидкой 20% по промокоду ВОЛЬТПРО.\n\nНадежные пассатижи, стрипперы...', hasImage: false, type: 'ad' },
  { id: 4, author: 'ВольтПро', role: 'Администратор', date: '14 августа в 09:00', text: 'Вышло обновление ГОСТ 31996-2012 по кабельной продукции...', hasImage: false, likes: 89, views: 980, type: 'post' },
]

// Базовые комментарии
const initialComments: Record<number, any[]> = {
  1: [{ id: 1, author: 'Илья_Монтаж', text: 'Всегда ставлю 10мА на бойлер, проблем никаких!' }],
  2: [{ id: 1, author: 'Сергей В.', text: 'Классика от застройщика. Они еще ПВС любят вместо ВВГ кидать.' }],
  4: [{ id: 1, author: 'ЭлектроПроф', text: 'Спасибо за выжимку, как раз искал это.' }]
}

function ArticlesFeedPage() {
  const [posts, setPosts] = useState(initialPosts)
  const [commentsData, setCommentsData] = useState(initialComments)
  
  // Стейты интерактива
  const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>({})
  const [openComments, setOpenComments] = useState<Record<number, boolean>>({})
  const [newCommentText, setNewCommentText] = useState('')
  const [activeCommentPost, setActiveCommentPost] = useState<number | null>(null)
  
  // Стейты публикации
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false)
  const [newPostText, setNewPostText] = useState('')
  
  // Стейт Share (Тост)
  const [showToast, setShowToast] = useState(false)

  // Лайки
  const toggleLike = (id: number) => setLikedPosts(prev => ({ ...prev, [id]: !prev[id] }))

  // Открыть/закрыть комментарии
  const toggleComments = (id: number) => {
    setOpenComments(prev => ({ ...prev, [id]: !prev[id] }))
    setActiveCommentPost(id)
  }

  // Отправить комментарий
  const handleSendComment = (postId: number) => {
    if (!newCommentText.trim()) return
    const newComment = { id: Date.now(), author: 'Вы (Специалист)', text: newCommentText }
    setCommentsData(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment]
    }))
    setNewCommentText('')
  }

  // Опубликовать пост
  const handlePublishPost = () => {
    if (!newPostText.trim()) return
    const newPost = {
      id: Date.now(), author: 'Вы (Администратор)', role: 'Автор', date: 'Только что',
      text: newPostText, hasImage: false, likes: 0, views: 0, type: 'post'
    }
    setPosts([newPost, ...posts])
    setNewPostText('')
    setIsPublishModalOpen(false)
  }

  // Поделиться
  const handleShare = () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 animate-in fade-in duration-500 text-foreground pb-24 flex justify-center relative">
      
      {/* Тост "Ссылка скопирована" */}
      {showToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[200] bg-green-500 text-white px-4 py-2 rounded-full font-bold text-xs sm:text-sm shadow-xl flex items-center gap-2 animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4" /> Ссылка скопирована
        </div>
      )}

      {/* Модальное окно публикации */}
      {isPublishModalOpen && (
        <div className="fixed inset-0 z-[150] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border w-full max-w-lg rounded-2xl shadow-2xl flex flex-col animate-in zoom-in-95">
            <div className="flex justify-between items-center p-4 border-b border-border">
              <h3 className="font-bold text-lg">Новая статья</h3>
              <button onClick={() => setIsPublishModalOpen(false)} className="p-1 hover:bg-muted rounded-lg"><X className="w-5 h-5"/></button>
            </div>
            <div className="p-4">
              <textarea 
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                placeholder="Что нового на объекте? Поделитесь опытом..."
                className="w-full h-32 sm:h-40 bg-muted border border-border rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              ></textarea>
            </div>
            <div className="p-4 border-t border-border flex justify-end">
              <button onClick={handlePublishPost} className="bg-primary text-primary-foreground px-6 py-2 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">
                Опубликовать
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-2xl space-y-6 sm:space-y-8">
        <div className="mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-[10px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Статьи и Новости</div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Лента ВольтПро</h1>
        </div>

        {/* Кнопка "Написать статью" */}
        <div onClick={() => setIsPublishModalOpen(true)} className="bg-card border border-border rounded-2xl p-4 shadow-sm flex items-center gap-3 sm:gap-4 cursor-pointer hover:border-primary/50 transition-colors">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <div className="flex-1 bg-muted rounded-xl px-4 py-2 sm:py-3 text-sm text-muted-foreground select-none">
            Опубликовать новую статью...
          </div>
        </div>

        {/* Лента постов */}
        {posts.map((post) => {
          const postComments = commentsData[post.id] || []
          const isCommentsOpen = openComments[post.id]

          return post.type === 'post' ? (
            <article key={post.id} className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col">
              <div className="p-4 sm:p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                    <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-primary fill-primary/20" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-foreground leading-tight flex items-center gap-2">
                      {post.author}
                      <span className="bg-primary/10 text-primary text-[8px] sm:text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider">{post.role}</span>
                    </h3>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{post.date}</p>
                  </div>
                </div>
                <button className="p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors"><MoreHorizontal className="h-5 w-5" /></button>
              </div>

              <div className="px-4 sm:px-5 pb-3 sm:pb-4"><p className="text-sm sm:text-base text-foreground leading-relaxed whitespace-pre-wrap">{post.text}</p></div>

              {post.hasImage && (
                <div className="w-full bg-muted aspect-video sm:h-[400px] flex flex-col items-center justify-center border-y border-border">
                  <ImageIcon className="h-12 w-12 text-muted-foreground/30 mb-2" />
                  <span className="text-xs text-muted-foreground/50 font-medium">Место для фотографии/схемы</span>
                </div>
              )}

              {/* Панель кнопок */}
              <div className="p-2 sm:p-4 flex items-center justify-between border-t border-border mt-2 sm:mt-0">
                <div className="flex items-center gap-1 sm:gap-2">
                  <button onClick={() => toggleLike(post.id)} className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:py-2 rounded-xl transition-colors text-xs sm:text-sm font-bold ${likedPosts[post.id] ? 'bg-red-500/10 text-red-500' : 'hover:bg-muted text-muted-foreground'}`}>
                    <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${likedPosts[post.id] ? 'fill-red-500' : ''}`} /> 
                    {post.likes + (likedPosts[post.id] ? 1 : 0)}
                  </button>
                  <button onClick={() => toggleComments(post.id)} className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:py-2 rounded-xl transition-colors text-xs sm:text-sm font-bold ${isCommentsOpen ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-muted-foreground'}`}>
                    <MessageCircle className={`h-4 w-4 sm:h-5 sm:w-5 ${isCommentsOpen ? 'fill-primary/20' : ''}`} /> 
                    {postComments.length}
                  </button>
                  <button onClick={handleShare} className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:py-2 rounded-xl hover:bg-muted text-muted-foreground transition-colors text-xs sm:text-sm font-bold">
                    <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground px-3 text-xs sm:text-sm font-medium">
                  <Eye className="h-4 w-4 sm:h-5 sm:w-5 opacity-70" /> {post.views}
                </div>
              </div>

              {/* Блок комментариев (Разворачивается) */}
              {isCommentsOpen && (
                <div className="bg-muted/30 border-t border-border p-4 space-y-4 animate-in slide-in-from-top-2">
                  {postComments.map((c, i) => (
                    <div key={i} className="bg-background border border-border p-3 rounded-xl rounded-tl-sm text-sm">
                      <p className="text-[10px] sm:text-xs font-bold text-primary mb-1">{c.author}</p>
                      <p className="text-foreground">{c.text}</p>
                    </div>
                  ))}
                  <div className="flex gap-2 pt-2">
                    <input 
                      type="text" 
                      value={activeCommentPost === post.id ? newCommentText : ''}
                      onChange={(e) => { setActiveCommentPost(post.id); setNewCommentText(e.target.value) }}
                      placeholder="Написать комментарий..." 
                      className="flex-1 bg-background border border-border rounded-xl px-3 sm:px-4 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button onClick={() => handleSendComment(post.id)} className="bg-primary text-primary-foreground h-9 w-9 sm:h-10 sm:w-10 rounded-xl flex items-center justify-center hover:opacity-90 shrink-0">
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </article>

          ) : (
            // Рекламный пост
            <article key={post.id} className="bg-amber-500/5 border border-amber-500/20 rounded-2xl overflow-hidden shadow-sm flex flex-col relative">
              <div className="absolute top-4 right-4 sm:top-5 sm:right-5 bg-amber-500/20 text-amber-500 px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-black uppercase tracking-wider">Реклама</div>
              <div className="p-4 sm:p-5 flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 border border-amber-500/30"><Megaphone className="h-5 w-5 sm:h-6 sm:w-6 text-amber-500" /></div>
                <div><h3 className="text-sm sm:text-base font-bold text-foreground leading-tight">{post.author}</h3><p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{post.date}</p></div>
              </div>
              <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                <p className="text-sm sm:text-base text-foreground leading-relaxed whitespace-pre-wrap">{post.text}</p>
                <button className="mt-4 sm:mt-6 w-full py-2.5 sm:py-3 bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-neutral-950 font-bold rounded-xl text-sm transition-colors">Узнать подробности</button>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
