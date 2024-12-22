import { useCallback, useEffect } from 'react';

export function useTextareaAutosize() {
  const adjustTextareaHeight = useCallback((element: HTMLTextAreaElement) => {
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  }, []);

  useEffect(() => {
    const textarea = document.querySelector('.message-input-field') as HTMLTextAreaElement;
    if (textarea) {
      adjustTextareaHeight(textarea);
    }
  }, [adjustTextareaHeight]);

  return { adjustTextareaHeight };
}