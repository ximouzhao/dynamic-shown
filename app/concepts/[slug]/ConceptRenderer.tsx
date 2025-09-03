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
                  overflow-x: hidden;
                }
                * { box-sizing: border-box; }
              </style>
            </head>
            <body>
              ${htmlContent}
            </body>
          </html>
        `);
        doc.close();
        
        // 监听iframe内容高度变化
        const resizeObserver = new ResizeObserver(() => {
          if (iframe.contentWindow) {
            const height = iframe.contentWindow.document.body.scrollHeight;
            iframe.style.height = `${height}px`;
          }
        });
        
        // 监听iframe内容
        if (iframe.contentWindow) {
          resizeObserver.observe(iframe.contentWindow.document.body);
        }
        
        // 初始设置高度
        setTimeout(() => {
          if (iframe.contentWindow) {
            const height = iframe.contentWindow.document.body.scrollHeight;
            iframe.style.height = `${height}px`;
          }
        }, 100);
        
        return () => {
          resizeObserver.disconnect();
        };
      }
    }
  }, [htmlContent, title]);

  return (
    <iframe
      ref={iframeRef}
      className="w-full border-0"
      style={{ height: '100px' }} // 初始高度，会被动态调整
    />
  );
}
