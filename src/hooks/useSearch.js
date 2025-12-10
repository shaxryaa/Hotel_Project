'use client';

import { useMemo, useState } from 'react';

/**
 * Generic search hook for arrays. Provide items and a selector that
 * returns a string to match against (e.g., hotel.title).
 */
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