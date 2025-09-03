'use client';

import { useEffect, useRef } from 'react';

interface ConceptRendererProps {
  htmlContent: string;
  title: string;
}

export default function ConceptRenderer({ htmlContent, title }: ConceptRendererProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (doc) {
        // 设置完整的HTML文档
        doc.open();
        doc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <title>${title}</title>
              <style>
                body { 
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                  margin: 0;
                  padding: 0;
                  line-height: 1.6;
                  /* 确保内容完全展开 */
                  min-height: 100%;
                }
                * { box-sizing: border-box; }
                /* 优化滚动性能 */
                html {
                  scroll-behavior: auto;
                }
                /* 确保所有内容都能正常显示 */
                img, video, iframe {
                  max-width: 100%;
                  height: auto;
                }
              </style>
            </head>
            <body>
              ${htmlContent}
            </body>
          </html>
        `);
        doc.close();
        
        // 一次性设置高度，避免频繁调整
        const setHeightOnce = () => {
          if (iframe.contentWindow) {
            const body = iframe.contentWindow.document.body;
            const html = iframe.contentWindow.document.documentElement;
            
            // 计算实际内容高度
            const height = Math.max(
              body.scrollHeight,
              body.offsetHeight,
              html.scrollHeight,
              html.offsetHeight
            );
            
            // 设置一个足够大的高度，避免后续调整
            iframe.style.height = `${height + 100}px`;
          }
        };
        
        // 等待内容加载完成后设置一次高度
        setTimeout(setHeightOnce, 200);
      }
    }
  }, [htmlContent, title]);

  return (
    <iframe
      ref={iframeRef}
      className="w-full border-0"
      style={{ 
        height: '100vh', // 初始高度
        overflow: 'visible' // 确保内容不会被截断
      }}
    />
  );
}
