'use client';

import { useState, useEffect } from 'react';
import { contentfulClient, ContentfulImage, getImageUrl } from '@/lib/contentful';

// Hook para buscar dados do Contentful
export function useContentful<T>(
  contentType: string,
  options?: {
    limit?: number;
    order?: string | string[];
    where?: Record<string, any>;
    include?: number;
  }
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const query: any = {
          content_type: contentType,
          limit: options?.limit || 100,
          include: options?.include || 2,
        };

        if (options?.order) {
          query.order = Array.isArray(options.order) ? options.order : [options.order];
        }

        if (options?.where) {
          Object.assign(query, options.where);
        }

        const response = await contentfulClient.getEntries(query);
        setData(response.items as T[]);
      } catch (err) {
        console.error(`Erro ao buscar ${contentType}:`, err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [contentType, JSON.stringify(options)]);

  return { data, loading, error };
}

// Hook para buscar um item específico por ID
export function useContentfulEntry<T>(entryId: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await contentfulClient.getEntry(entryId);
        setData(response as T);
      } catch (err) {
        console.error(`Erro ao buscar entrada ${entryId}:`, err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    if (entryId) {
      fetchEntry();
    }
  }, [entryId]);

  return { data, loading, error };
}

// Hook para buscar dados com cache
export function useContentfulWithCache<T>(
  contentType: string,
  cacheKey: string,
  options?: {
    limit?: number;
    order?: string | string[];
    where?: Record<string, any>;
    include?: number;
  }
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Verificar cache local
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const { data: cachedData, timestamp } = JSON.parse(cached);
          const now = Date.now();
          const cacheAge = 5 * 60 * 1000; // 5 minutos

          if (now - timestamp < cacheAge) {
            setData(cachedData);
            setLoading(false);
            return;
          }
        }

        const query: any = {
          content_type: contentType,
          limit: options?.limit || 100,
          include: options?.include || 2,
        };

        if (options?.order) {
          query.order = Array.isArray(options.order) ? options.order : [options.order];
        }

        if (options?.where) {
          Object.assign(query, options.where);
        }

        const response = await contentfulClient.getEntries(query);
        const responseData = response.items as T[];

        // Salvar no cache
        localStorage.setItem(cacheKey, JSON.stringify({
          data: responseData,
          timestamp: Date.now(),
        }));

        setData(responseData);
      } catch (err) {
        console.error(`Erro ao buscar ${contentType}:`, err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [contentType, cacheKey, JSON.stringify(options)]);

  return { data, loading, error };
}
