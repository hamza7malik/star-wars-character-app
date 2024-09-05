'use client';
import Image from 'next/image';
import CharacterCard from '../components/CharacterCard/CharacterCard';

export default function Home() {
  const skinColors = 'n/a';
  const hairColors = 'green-tan, brown';
  const eyeColors = 'orange';

  const cardData = [
    {
      name: 'Jabba Desilijic Tiure',
      specieColor: [skinColors, hairColors, eyeColors],
    },
    {
      name: 'Wedge Antilles',
      specieColor: [skinColors, hairColors, eyeColors],
    },
    {
      name: 'Jek Tono Porkins',
      specieColor: [skinColors, hairColors, eyeColors],
    },
  ];

  return (
    <div className='flex justify-center items-center font-oxanium'>
      <div className='text-center'>
        <div className='text-base md:text-lg lg:text-xl xl:text-2xl my-10'>
          <Image
            className='mx-auto'
            src={'/logo.webp'}
            alt='star-wars-logo'
            width={200}
            height={200}
          />
          <h1 className='font-bold'>Star Wars Character App</h1>
          <p className='text-xs'>using</p>
          <h2 className='text-yellow-400'>SWAPI</h2>
          <p className='text-sm'>The Star Wars API</p>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
          {cardData.map((character, index) => (
            <CharacterCard
              key={index}
              id={`${index}`}
              imageUrl={`https://picsum.photos/200/300?random=${index}.webp`}
              name={character.name}
              specieColors={character.specieColor}
              onClick={() => {}}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
