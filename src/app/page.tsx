'use client';

import Image from 'next/image';
import CharacterCard from '../components/CharacterCard/CharacterCard';
import { useCallback, useEffect, useState } from 'react';
import { fetchCharacters } from '../utils/api';
import { Character } from '../types/types';
import Pagination from '../components/Pagination/Pagination';
import SkeletonCard from '../components/SkeletonCard/SkeletonCard';
import LinearLoadingIndicator from '../components/LinearLoadingIndicator/LinearLoadingIndicator';
import Saperator from '../components/Saperator/Saperator';

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(
    async (page: number, charactersPerPage: number) => {
      setLoading(true);
      try {
        const { results, count } = await fetchCharacters(page);
        setCharacters(results);
        setTotalPages(Math.ceil(count / charactersPerPage));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchData(currentPage, 10);
  }, [currentPage]);

  return (
    <div className='flex justify-center items-center font-oxanium'>
      <div className='text-center'>
        <div className='text-base md:text-lg lg:text-xl xl:text-2xl my-10'>
          <Image
            className='mx-auto'
            src='/logo.webp'
            alt='star-wars-logo'
            width={200}
            height={200}
          />
          <h1 className='font-bold'>Star Wars Character App</h1>
          <p className='text-xs'>using</p>
          <h2 className='text-yellow-400'>SWAPI</h2>
          <p className='text-sm'>The Star Wars API</p>
        </div>
        {loading ? <LinearLoadingIndicator /> : <Saperator />}

        <Pagination
          currentPage={currentPage}
          onPageChange={onPageChange}
          totalPages={totalPages}
        />
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 py-12'>
          {loading
            ? Array.from({ length: 10 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : characters.map((character) => {
                const { hair_color, skin_color, eye_color, name, url } =
                  character;
                return (
                  <CharacterCard
                    key={url}
                    id={`${url}`}
                    imageUrl={`https://picsum.photos/200/300?random=${name}.webp`}
                    name={name}
                    specieColors={[hair_color, skin_color, eye_color]}
                    onClick={() => {}}
                  />
                );
              })}
        </div>
      </div>
    </div>
  );
}
