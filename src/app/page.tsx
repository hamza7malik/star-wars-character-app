'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Character } from '../types/types';
import { useCharacters } from '../hooks/useCharacters';
import CharacterCard from '../components/CharacterCard/CharacterCard';
import CharacterModal from '../components/CharacterModal/CharacterModal';
import LinearLoadingIndicator from '../components/LinearLoadingIndicator/LinearLoadingIndicator';
import Pagination from '../components/Pagination/Pagination';
import SkeletonCard from '../components/SkeletonCard/SkeletonCard';
import Saperator from '../components/Saperator/Saperator';

export default function Home() {
  const {
    characters,
    totalPages,
    loading,
    error,
    currentPage,
    setCurrentPage,
  } = useCharacters();

  const [currentCharacter, setCurrentCharacter] = useState<Character | null>(
    null
  );
  const [open, setOpen] = useState(false);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const openCharacterModal = (character: Character) => {
    setCurrentCharacter(character);
    setOpen(true);
  };

  const closeCharacterModal = () => setOpen(false);

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
        {error && (
          <div className='py-12'>
            <p className='text-red-600 my-4'>{error}</p>
          </div>
        )}
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
                    onClick={() => openCharacterModal(character)}
                  />
                );
              })}
        </div>
      </div>
      <CharacterModal
        character={currentCharacter}
        open={open}
        closeCharacterModal={closeCharacterModal}
      />
    </div>
  );
}
