import { ApiResponseCharacters, ApiResponseHomeworld } from '../types/types';
export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchCharacters = async (
  page: number
): Promise<ApiResponseCharacters> => {
  const response = await fetch(`${BASE_URL}/people/?page=${page}`);
  const data: ApiResponseCharacters = await response.json();
  return data;
};

export const fetchHomeworld = async (
  url: string
): Promise<ApiResponseHomeworld> => {
  const response = await fetch(url);
  const data: ApiResponseHomeworld = await response.json();
  return data;
};
