import React from 'react'

export type ArticleBlock =
  | { type: 'text'; content: string }
  | { type: 'image'; url: string; caption?: string }
  | { type: 'video'; url: string } 

export function ArticleViewer({ title, blocks }: { title: string, blocks: ArticleBlock[] }) {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-in fade-in duration-500">
      <h1 className="text-2xl sm:text-4xl font-black text-foreground mb-8 tracking-tight">
        {title}
      </h1>

      <div className="space-y-6">
        {blocks.map((block, index) => {
          if (block.type === 'text') {
            return (
              <p key={index} className="text-base sm:text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {block.content}
              </p>
            )
          }

          if (block.type === 'image') {
            return (
              <figure key={index} className="my-8 flex flex-col items-center">
                <img
                  src={block.url}
                  alt={block.caption || 'Иллюстрация к статье'}
                  // ДОБАВЛЕНО: max-h-[600px] (ограничение высоты) и object-contain (вписывание без обрезки)
                  className="w-full max-h-[600px] rounded-2xl shadow-sm border border-border object-contain bg-muted/10"
                />
                {block.caption && (
                  <figcaption className="text-center text-xs text-muted-foreground mt-3 font-medium">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            )
          }

          if (block.type === 'video') {
            const isDirectVideo = block.url.toLowerCase().endsWith('.mp4');

            return (
              <div key={index} className="my-8 aspect-video w-full rounded-2xl overflow-hidden shadow-sm border border-border bg-muted">
                {isDirectVideo ? (
                  <video 
                    className="w-full h-full object-cover" 
                    controls 
                    src={block.url}
                  >
                    Ваш браузер не поддерживает встроенные видео.
                  </video>
                ) : (
                  <iframe
                    className="w-full h-full"
                    src={block.url}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
              </div>
            )
          }

          return null
        })}
      </div>
    </article>
  )
}
