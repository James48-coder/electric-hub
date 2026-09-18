import { createFileRoute } from '@tanstack/react-router'
import React, { useState, useRef, useEffect } from 'react'
import { Zap, Share2, Eye, MessageSquare, Heart, MoreHorizontal, X, Plus, Type, Image as ImageIcon, Video, Trash2, ChevronDown } from 'lucide-react'
// Подключаем наш умный движок для отображения постов
import { ArticleViewer, ArticleBlock } from '../components/ArticleViewer'

export const Route = createFileRoute('/articles')({
  component: ArticlesPage,
})

function ArticlesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  // Состояние нашего нового поста (начинается с одного пустого текстового блока)
  const [draftBlocks, setDraftBlocks] = useState<ArticleBlock[]>([
    { type: 'text', content: '' }
  ])

  // Моковые посты в ленте (один обычный, один созданный через наш движок)
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "ВольтПро",
      role: "АДМИНИСТРАТОР",
      time: "Только что",
      blocks: [
        { type: 'text', content: 'Привет! Это обновленная лента ВольтПро. Теперь сюда можно выкладывать полноценные статьи с картинками и видео.' } as ArticleBlock
      ],
      likes: 0,
      comments: 0,
      views: 12
    }
  ])

  // Закрытие меню кликом снаружи
  const menuRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Функции добавления новых блоков из меню
  const addBlock = (type: 'text' | 'image' | 'video') => {
    if (type === 'text') setDraftBlocks([...draftBlocks, { type: 'text', content: '' }])
    if (type === 'image') setDraftBlocks([...draftBlocks, { type: 'image', url: '', caption: '' }])
    if (type === 'video') setDraftBlocks([...draftBlocks, { type: 'video', url: '' }])
    setIsMenuOpen(false)
  }

  // Обновление содержимого блока
  const updateBlock = (index: number, field: string, value: string) => {
    const newBlocks = [...draftBlocks]
    newBlocks[index] = { ...newBlocks[index], [field]: value } as any
    setDraftBlocks(newBlocks)
  }

  // Удаление блока
  const removeBlock = (index: number) => {
    setDraftBlocks(draftBlocks.filter((_, i) => i !== index))
  }

  // Публикация поста
  const handlePublish = () => {
    // Отфильтровываем пустые блоки перед публикацией
    const validBlocks = draftBlocks.filter(b => {
      if (b.type === 'text') return b.content.trim() !== ''
      if (b.type === 'image') return b.url.trim() !== ''
      if (b.type === 'video') return b.url.trim() !== ''
      return false
    })

    if (validBlocks.length === 0) {
      alert('Добавьте хотя бы немного текста, картинку или видео!')
      return
    }

    const newPost = {
      id: Date.now(),
      author: "ВольтПро",
      role: "АДМИНИСТРАТОР",
      time: "Только что",
      blocks: validBlocks,
      likes: 0,
      comments: 0,
      views: 0
    }

    setPosts([newPost, ...posts])
    setIsModalOpen(false)
    setDraftBlocks([{ type: 'text', content: '' }]) // Сбрасываем форму
  }

  return (
    <div className="container mx-auto max-w-3xl pb-24 px-4 sm:px-6 pt-8 animate-in fade-in duration-500">
      
      {/* КНОПКА ОТКРЫТИЯ МОДАЛКИ */}
      <div 
        onClick={() => setIsModalOpen(true)}
        className="bg-card border border-border rounded-2xl p-4 sm:p-6 mb-8 flex items-center gap-4 cursor-pointer hover:border-primary/50 transition-colors shadow-sm"
      >
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
          <Zap className="w-5 h-5" />
        </div>
        <div className="text-muted-foreground flex-1">Опубликовать новую статью, фото или видео...</div>
      </div>

      {/* ЛЕНТА ПОСТОВ */}
      <div className="space-y-6">
        {posts.map(post => (
          <div key={post.id} className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 sm:p-6 border-b border-border/50 flex justify-between items-start">
              <div className="flex gap-3 items-center">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0 font-bold">
                  В
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-foreground">{post.author}</h3>
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-black tracking-wider">{post.role}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{post.time}</p>
                </div>
              </div>
              <button className="text-muted-foreground hover:text-foreground"><MoreHorizontal className="w-5 h-5" /></button>
            </div>
            
            {/* ИСПОЛЬЗУЕМ НАШ ДВИЖОК ДЛЯ ОТРИСОВКИ КОНТЕНТА */}
            <div className="px-2">
              <ArticleViewer title="" blocks={post.blocks} />
            </div>

            <div className="p-4 sm:p-6 border-t border-border/50 flex justify-between items-center bg-muted/20">
              <div className="flex gap-6">
                <button className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors"><Heart className="w-5 h-5" /> <span className="text-sm font-medium">{post.likes}</span></button>
                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"><MessageSquare className="w-5 h-5" /> <span className="text-sm font-medium">{post.comments}</span></button>
                <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"><Share2 className="w-5 h-5" /></button>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Eye className="w-4 h-4" /> <span className="text-sm font-medium">{post.views}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* === МОДАЛЬНОЕ ОКНО СОЗДАНИЯ СТАТЬИ === */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card border border-border w-full max-w-2xl rounded-2xl shadow-xl flex flex-col max-h-[90vh]">
            
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-border">
              <h2 className="text-lg font-black text-foreground">Создать запись</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted"><X className="w-5 h-5" /></button>
            </div>

            {/* ТЕЛО МОДАЛКИ: СПИСОК БЛОКОВ */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 bg-muted/10">
              {draftBlocks.map((block, index) => (
                <div key={index} className="relative group bg-background border border-border rounded-xl p-3 shadow-sm flex gap-3 items-start">
                  
                  {/* Иконка типа блока */}
                  <div className="mt-2 text-muted-foreground">
                    {block.type === 'text' && <Type className="w-5 h-5" />}
                    {block.type === 'image' && <ImageIcon className="w-5 h-5 text-blue-500" />}
                    {block.type === 'video' && <Video className="w-5 h-5 text-red-500" />}
                  </div>

                  {/* Поля ввода в зависимости от типа блока */}
                  <div className="flex-1 space-y-2">
                    {block.type === 'text' && (
                      <textarea
                        autoFocus
                        placeholder="Напишите текст абзаца..."
                        value={block.content}
                        onChange={(e) => updateBlock(index, 'content', e.target.value)}
                        className="w-full bg-transparent resize-none outline-none min-h-[80px] text-foreground placeholder:text-muted-foreground"
                      />
                    )}
                    
                    {block.type === 'image' && (
                      <>
                        <input
                          type="text"
                          placeholder="Ссылка на фото (например: /test.jpg или https://...)"
                          value={block.url}
                          onChange={(e) => updateBlock(index, 'url', e.target.value)}
                          className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
                        />
                        <input
                          type="text"
                          placeholder="Подпись к фото (необязательно)"
                          value={block.caption}
                          onChange={(e) => updateBlock(index, 'caption', e.target.value)}
                          className="w-full bg-transparent text-sm text-muted-foreground outline-none"
                        />
                      </>
                    )}

                    {block.type === 'video' && (
                      <input
                        type="text"
                        placeholder="Ссылка на видео (VK, YouTube, RuTube или .mp4)"
                        value={block.url}
                        onChange={(e) => updateBlock(index, 'url', e.target.value)}
                        className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
                      />
                    )}
                  </div>

                  {/* Кнопка удаления блока */}
                  <button 
                    onClick={() => removeBlock(index)}
                    className="text-muted-foreground hover:text-red-500 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Удалить блок"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* НИЖНЯЯ ПАНЕЛЬ С ВЫПАДАЮЩИМ МЕНЮ ВК-СТАЙЛ */}
            <div className="p-4 sm:p-6 border-t border-border flex justify-between items-center bg-card rounded-b-2xl">
              
              {/* Меню Создать/Добавить */}
              <div className="relative" ref={menuRef}>
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-2 text-primary hover:bg-primary/10 px-4 py-2 rounded-xl font-bold transition-colors"
                >
                  <Plus className="w-5 h-5" /> Создать <ChevronDown className="w-4 h-4" />
                </button>
                
                {isMenuOpen && (
                  <div className="absolute bottom-full left-0 mb-2 w-48 bg-card border border-border rounded-xl shadow-xl overflow-hidden py-1 z-50 animate-in slide-in-from-bottom-2">
                    <button onClick={() => addBlock('text')} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors">
                      <Type className="w-4 h-4 text-muted-foreground" /> Текст
                    </button>
                    <button onClick={() => addBlock('image')} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors">
                      <ImageIcon className="w-4 h-4 text-blue-500" /> Фото
                    </button>
                    <button onClick={() => addBlock('video')} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors">
                      <Video className="w-4 h-4 text-red-500" /> Видео
                    </button>
                  </div>
                )}
              </div>

              <button 
                onClick={handlePublish}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2.5 px-6 rounded-xl transition-colors shadow-sm"
              >
                Опубликовать
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}
