'use client';

import { useEffect, useMemo, useState } from 'react';

/**
 * Simple favourites store using localStorage.
 * Stores an array of hotel IDs under key `favorites`.
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load favourites from localStorage on mount
  useEffect(() => {
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('favorites') : null;
      setFavorites(stored ? JSON.parse(stored) : []);
    } catch (_) {
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveFavorites = (next) => {
    setFavorites(next);
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('favorites', JSON.stringify(next));
      }
    } catch (_) {
      // ignore storage errors
    }
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((x) => x !== id) : [...prev, id];
      saveFavorites(next);
      return next;
    });
  };

  const isFavorite = useMemo(() => {
    const set = new Set(favorites);
    return (id) => set.has(id);
  }, [favorites]);

  return { favorites, isFavorite, toggleFavorite, loading };
}