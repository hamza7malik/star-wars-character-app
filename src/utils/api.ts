import { ApiResponseCharacters } from '../types/types';

export const fetchCharacters = async (
  page: number
): Promise<ApiResponseCharacters> => {
  const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
  const data: ApiResponseCharacters = await response.json();
  return data;
};
