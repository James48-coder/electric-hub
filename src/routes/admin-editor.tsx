import { createFileRoute } from '@tanstack/react-router'
import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Save, Eye, LayoutTemplate, ShieldAlert } from 'lucide-react'

export const Route = createFileRoute('/admin-editor')({
  component: AdminEditorPage,
})

function AdminEditorPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isPreview, setIsPreview] = useState(false)

  // Настройки панели инструментов (тулбара)
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  }

  const handleSave = () => {
    // В будущем здесь будет логика отправки статьи в базу данных Yandex Cloud (YDB)
    alert('Статья готова к публикации! Скоро подключим отправку в YDB.')
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 animate-in fade-in duration-500 pb-24">
      
      {/* Стили для адаптации редактора под наши темные и светлые темы */}
      <style>{`
        .ql-toolbar { 
          background: rgba(150, 150, 150, 0.05); 
          border-color: var(--border) !important; 
          border-top-left-radius: 1rem; 
          border-top-right-radius: 1rem; 
          padding: 12px !important;
        }
        .ql-container { 
          border-color: var(--border) !important; 
          border-bottom-left-radius: 1rem; 
          border-bottom-right-radius: 1rem; 
          font-family: inherit; 
        }
        .ql-editor { 
          min-height: 500px; 
          font-size: 1rem; 
          color: var(--foreground); 
          padding: 1.5rem;
        }
        .ql-snow .ql-stroke { stroke: var(--foreground); }
        .ql-snow .ql-fill { fill: var(--foreground); }
        .ql-snow .ql-picker { color: var(--foreground); font-weight: bold; }
        .ql-snow .ql-picker-options { background-color: var(--card); border-color: var(--border); }
      `}</style>

      {/* Шапка админки */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-destructive/10 text-destructive text-[10px] font-bold uppercase tracking-widest border border-destructive/20 shadow-sm mb-3">
            <ShieldAlert className="w-3.5 h-3.5" /> Зона Администратора
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-foreground flex items-center gap-3">
            <LayoutTemplate className="w-8 h-8 text-primary" />
            Редактор статей
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPreview(!isPreview)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-card border border-border text-foreground hover:bg-muted transition-colors text-sm font-bold shadow-sm"
          >
            <Eye className="w-4 h-4" />
            {isPreview ? 'Вернуться к редактированию' : 'Предпросмотр'}
          </button>
          <button
            onClick={handleSave}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity text-sm font-bold shadow-lg shadow-primary/25"
          >
            <Save className="w-4 h-4" />
            Опубликовать
          </button>
        </div>
      </div>

      {!isPreview ? (
        /* РЕЖИМ РЕДАКТИРОВАНИЯ */
        <div className="space-y-6">
          <input
            type="text"
            placeholder="Введите мощный заголовок статьи..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-card border border-border rounded-2xl px-6 py-4 text-xl sm:text-2xl font-bold focus:outline-none focus:border-primary transition-colors text-foreground shadow-sm placeholder:text-muted-foreground"
          />
          <div className="bg-card rounded-2xl shadow-sm">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              placeholder="Начните писать текст, вставляйте схемы, таблицы и видео..."
            />
          </div>
        </div>
      ) : (
        /* РЕЖИМ ПРЕДПРОСМОТРА (Как это увидят пользователи) */
        <div className="bg-card/60 backdrop-blur-xl border border-border/50 p-6 sm:p-10 rounded-[2rem] shadow-2xl relative min-h-[600px]">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 blur-[50px] rounded-full pointer-events-none"></div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-8 text-foreground leading-[1.2] tracking-tight relative z-10">
            {title || 'Заголовок вашей статьи'}
          </h2>
          
          {/* Класс 'prose' активирует наши глобальные стили для медиа */}
          <div 
            className="prose prose-invert max-w-none relative z-10 text-foreground leading-relaxed text-base sm:text-lg"
            dangerouslySetInnerHTML={{ __html: content || '<p className="text-muted-foreground">Текст статьи пуст. Напишите что-нибудь, чтобы увидеть предпросмотр.</p>' }}
          />
        </div>
      )}
    </div>
  )
}
