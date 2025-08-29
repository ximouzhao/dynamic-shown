'use client';

import { useEffect } from 'react';

interface ConceptRendererProps {
  htmlContent: string;
  title: string;
}

export default function ConceptRenderer({ htmlContent, title }: ConceptRendererProps) {
  
  useEffect(() => {
    // Execute any scripts that are in the HTML content
    const executeEmbeddedScripts = () => {
      const scripts = document.querySelectorAll('.concept-content script');
      scripts.forEach((oldScript) => {
        if (oldScript.getAttribute('data-executed')) return;
        
        try {
          const newScript = document.createElement('script');
          
          // Copy attributes
          Array.from(oldScript.attributes).forEach((attr) => {
            newScript.setAttribute(attr.name, attr.value);
          });
          
          // Copy content and execute
          newScript.textContent = oldScript.textContent;
          newScript.setAttribute('data-executed', 'true');
          
          document.head.appendChild(newScript);
          document.head.removeChild(newScript);
          
          // Mark original as executed
          oldScript.setAttribute('data-executed', 'true');
        } catch (error) {
          console.error('ConceptRenderer: Error executing script:', error);
        }
      });
    };

    // Execute scripts after a short delay to ensure DOM is ready
    const timer = setTimeout(executeEmbeddedScripts, 100);
    
    return () => clearTimeout(timer);
  }, [htmlContent]);

  return (
    <div 
      className="concept-content max-w-none"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
