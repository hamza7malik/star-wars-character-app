import { useState, useCallback, useEffect } from 'react';
import { fetchCharacters } from '../utils/api';
import { Character } from '../types/types';

export const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const { results, count } = await fetchCharacters(page);
      setCharacters(results);
      setTotalPages(Math.ceil(count / 10)); // 10 characters per page
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load characters data. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, fetchData]);

  return {
    characters,
    totalPages,
    loading,
    error,
    currentPage,
    setCurrentPage,
  };
};
