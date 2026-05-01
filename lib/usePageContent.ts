import { useState, useEffect } from 'react';
import { getDocument } from './firebase';

export function usePageContent<T extends Record<string, string>>(
  pageId: string,
  defaults: T,
): T {
  const [content, setContent] = useState<T>(defaults);

  useEffect(() => {
    getDocument<Record<string, string>>('page_content', pageId)
      .then((data) => {
        if (data) setContent({ ...defaults, ...data } as T);
      })
      .catch(() => {});
  }, [pageId]);

  return content;
}
