import { createFileRoute } from '@tanstack/react-router'
import React, { useState } from 'react'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import { Save, Eye, LayoutTemplate, ShieldAlert } from 'lucide-react'

export const Route = createFileRoute('/admin-editor')({
  component: AdminEditorPage,
})

function AdminEditorPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isPreview, setIsPreview] = useState(false)

  // Убрана кнопка 'clean' (Tx), оставлено только нужное
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image', 'video']
    ],
  }

  const handleSave = () => {
    alert('Статья готова к публикации! Скоро подключим отправку в YDB.')
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 animate-in fade-in duration-500 pb-24">
      
      {/* ИСПРАВЛЕННЫЙ CSS ДЛЯ ТУЛТИПОВ (Всплывающих окон ввода URL) */}
      <style>{`
        .ql-toolbar { 
          background: var(--card); 
          border-color: var(--border) !important; 
          border-top-left-radius: 1rem; 
          border-top-right-radius: 1rem; 
          padding: 12px !important;
        }
        .ql-container { 
          background: var(--card);
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
        
        /* Цвета иконок панели */
        .ql-snow .ql-stroke { stroke: var(--foreground); }
        .ql-snow .ql-fill { fill: var(--foreground); }
        .ql-snow .ql-picker { color: var(--foreground); font-weight: bold; }
        .ql-snow .ql-picker-options { background-color: var(--card); border-color: var(--border); }
        
        /* ВОЗВРАЩАЕМ К ЖИЗНИ ОКНО ВВОДА ССЫЛОК И ВИДЕО */
        .ql-snow .ql-tooltip {
          background-color: var(--card) !important;
          border: 1px solid var(--border) !important;
          color: var(--foreground) !important;
          border-radius: 0.75rem !important;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5) !important;
          z-index: 50 !important;
          padding: 12px 16px !important;
          left: 10px !important; /* Предотвращаем уход за экран */
        }
        .ql-snow .ql-tooltip input[type=text] {
          background-color: var(--background) !important;
          color: var(--foreground) !important;
          border: 1px solid var(--border) !important;
          border-radius: 0.5rem !important;
          padding: 6px 12px !important;
          outline: none !important;
          font-size: 0.875rem !important;
          width: 250px !important;
        }
        .ql-snow .ql-tooltip input[type=text]:focus {
          border-color: var(--primary) !important;
        }
        .ql-snow .ql-tooltip a.ql-action::before {
          color: var(--primary) !important;
          font-weight: bold !important;
          margin-left: 12px !important;
        }
        .ql-snow .ql-tooltip a.ql-preview {
          color: var(--primary) !important;
        }
      `}</style>

      {/* Шапка */}
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
            {isPreview ? 'Редактировать' : 'Предпросмотр'}
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
        <div className="space-y-6">
          <input
            type="text"
            placeholder="Заголовок статьи..."
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
              placeholder="Текст, схемы, видео..."
            />
          </div>
        </div>
      ) : (
        <div className="bg-card border border-border p-6 sm:p-10 rounded-[2rem] shadow-xl min-h-[600px]">
          <h2 className="text-3xl sm:text-4xl font-black mb-8 text-foreground">
            {title || 'Заголовок'}
          </h2>
          <div 
            className="prose prose-invert max-w-none text-foreground"
            dangerouslySetInnerHTML={{ __html: content || '<p>Пусто</p>' }}
          />
        </div>
      )}
    </div>
  )
}
