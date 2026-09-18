import React from 'react'

// Описываем, из каких кирпичиков может состоять наша статья
export type ArticleBlock =
  | { type: 'text'; content: string }
  | { type: 'image'; url: string; caption?: string }
  | { type: 'youtube'; videoId: string }

export function ArticleViewer({ title, blocks }: { title: string, blocks: ArticleBlock[] }) {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-in fade-in duration-500">
      <h1 className="text-2xl sm:text-4xl font-black text-foreground mb-8 tracking-tight">
        {title}
      </h1>

      <div className="space-y-6">
        {blocks.map((block, index) => {
          // Если это ТЕКСТ
          if (block.type === 'text') {
            return (
              <p key={index} className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {block.content}
              </p>
            )
          }

          // Если это КАРТИНКА (сама сожмется под размер телефона)
          if (block.type === 'image') {
            return (
              <figure key={index} className="my-8">
                <img
                  src={block.url}
                  alt={block.caption || 'Иллюстрация к статье'}
                  className="w-full h-auto rounded-2xl shadow-sm border border-border object-cover"
                />
                {block.caption && (
                  <figcaption className="text-center text-xs text-muted-foreground mt-3 font-medium">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            )
          }

          // Если это ВИДЕО (автоматически держит пропорции 16:9)
          if (block.type === 'youtube') {
            return (
              <div key={index} className="my-8 aspect-video w-full rounded-2xl overflow-hidden shadow-sm border border-border bg-muted">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${block.videoId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )
          }

          return null
        })}
      </div>
    </article>
  )
}
