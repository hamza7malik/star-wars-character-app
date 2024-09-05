import {
  createGradientString,
  filterValidColors,
  truncateText,
} from '@/src/utils/helpers';
import Image from 'next/image';
import React from 'react';

export type CharacterCardProps = {
  id: string;
  name: string;
  specieColors: string[];
  imageUrl: string;
  onClick: () => void;
};

const CharacterCard = ({
  id,
  name,
  specieColors,
  imageUrl,
  onClick,
}: CharacterCardProps) => {
  const colors = specieColors;
  const validSpecieColors = filterValidColors(colors.join(','));

  const gradientStyles = createGradientString(validSpecieColors);
  return (
    <div
      data-testid='character-card'
      className={`w-[100%] h-[auto] p-2 flex justify-center items-center rounded-lg shadow-lg hover:shadow-xl hover:scale-95 transition-transform duration-500`}
      style={{ background: gradientStyles }}
      role='button'
      tabIndex={0}
      onClick={onClick}
    >
      <div>
        <Image src={imageUrl} alt={`${name} image`} width={200} height={250} />
        <div className='p-1 mt-2 bg-black bg-opacity-70 text-xs'>
          <p data-testid='card-name' className='font-semibold text-white pl-1'>
            {truncateText(name, 20)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
