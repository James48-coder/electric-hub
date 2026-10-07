import { createFileRoute } from '@tanstack/react-router'
import React, { useState, useEffect } from 'react'
import { Share2, Eye, MessageSquare, Heart, MoreHorizontal, Loader2, Trash2 } from 'lucide-react'

export const Route = createFileRoute('/articles')({
  component: ArticlesPage,
})

function ArticlesPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // === ПРОВЕРКА РОЛИ ПРИ ЗАГРУЗКЕ ===
  useEffect(() => {
    const authData = localStorage.getItem('voltpro_auth')
    if (authData) {
      try {
        const user = JSON.parse(authData)
        if (user.role === 'ADMIN') {
          setIsAdmin(true)
        }
      } catch (e) {}
    }
  }, [])

  // === ЗАГРУЗКА СТАТЕЙ ИЗ YANDEX CLOUD ===
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('https://functions.yandexcloud.net/d4erd6lhieqorscbm1qb', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'get_articles' })
        })

        const data = await response.json()
        if (data.articles) {
          const formattedPosts = data.articles.map((article: any) => ({
            id: article.id,
            author: "ВольтПро",
            role: "АДМИНИСТРАТОР",
            time: new Date(article.created_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }),
            title: article.title,
            htmlContent: article.content,
            likes: Math.floor(Math.random() * 50) + 10,
            isLiked: false,
            comments: Math.floor(Math.random() * 10),
            views: Math.floor(Math.random() * 500) + 50
          }))
          setPosts(formattedPosts)
        }
      } catch (error) {
        console.error("Ошибка загрузки статей:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchArticles()
  }, [])

  // === ФУНКЦИЯ УДАЛЕНИЯ СТАТЬИ ===
  const handleDelete = async (id: string) => {
    if (!window.confirm('Вы уверены, что хотите удалить эту статью? Это действие нельзя отменить.')) {
      return;
    }

    setDeletingId(id);
    try {
      const response = await fetch('https://functions.yandexcloud.net/d4erd6lhieqorscbm1qb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete_article', id: id })
      });

      const data = await response.json();
      
      if (data.success) {
        // Убираем статью из интерфейса без перезагрузки страницы
        setPosts(posts.filter(post => post.id !== id));
      } else {
        alert('Не удалось удалить статью.');
      }
    } catch (error) {
      alert('Ошибка соединения с сервером.');
    } finally {
      setDeletingId(null);
    }
  }

  const toggleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { 
          ...post, 
          isLiked: !post.isLiked, 
          likes: post.isLiked ? post.likes - 1 : post.likes + 1 
        }
      }
      return post
    }))
  }

  const showComingSoon = () => alert("Эта функция скоро будет доступна!")

  return (
    <div className="container mx-auto max-w-3xl pb-24 px-4 sm:px-6 pt-8 animate-in fade-in duration-500">
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="w-8 h-8 animate-spin mb-4 text-primary" />
          <p>Загрузка статей из базы данных...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 bg-card border border-border rounded-2xl shadow-sm">
          <p className="text-muted-foreground mb-4">В базе пока нет ни одной статьи.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 sm:p-6 border-b border-border/50 flex justify-between items-start">
                <div className="flex gap-3 items-center">
                  <div className="w-11 h-11 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white shrink-0 font-black text-xl shadow-md border-2 border-background ring-1 ring-primary/20">
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
                <button onClick={showComingSoon} className="text-muted-foreground hover:text-foreground p-2 rounded-full hover:bg-muted transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-4 sm:p-6">
                <h2 className="text-2xl font-black mb-4 text-foreground">{post.title}</h2>
                <div 
                  className="prose prose-invert max-w-none text-foreground prose-img:rounded-xl prose-img:border prose-img:border-border"
                  dangerouslySetInnerHTML={{ __html: post.htmlContent }}
                />
              </div>

              <div className="p-4 sm:p-6 border-t border-border/50 flex justify-between items-center bg-muted/20">
                <div className="flex gap-6 items-center flex-1">
                  <button 
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-2 transition-colors ${post.isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'}`}
                  >
                    <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} /> 
                    <span className="text-sm font-medium">{post.likes}</span>
                  </button>
                  
                  <button onClick={showComingSoon} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <MessageSquare className="w-5 h-5" /> 
                    <span className="text-sm font-medium">{post.comments}</span>
                  </button>
                  
                  <button onClick={showComingSoon} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>

                  {/* КНОПКА УДАЛЕНИЯ ТОЛЬКО ДЛЯ АДМИНА */}
                  {isAdmin && (
                    <button 
                      onClick={() => handleDelete(post.id)} 
                      disabled={deletingId === post.id}
                      className="flex items-center gap-2 ml-auto text-muted-foreground hover:text-destructive transition-colors px-3 py-1 rounded-lg hover:bg-destructive/10"
                      title="Удалить статью"
                    >
                      {deletingId === post.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                    </button>
                  )}

                </div>
                
                <div className="flex items-center gap-2 text-muted-foreground ml-6">
                  <Eye className="w-4 h-4" /> <span className="text-sm font-medium">{post.views}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
