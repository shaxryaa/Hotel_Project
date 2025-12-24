'use client';

import { useMemo, useState } from 'react';

export function useSearch(items, selector) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    try {
      return items.filter((item) => {
        const value = selector(item);
        return typeof value === 'string' && value.toLowerCase().includes(q);
      });
    } catch (_) {
      return items;
    }
  }, [items, query, selector]);

  return { query, setQuery, filtered };
}