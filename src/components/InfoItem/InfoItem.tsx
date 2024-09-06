import React from 'react';
import LinearLoadingIndicator from '../LinearLoadingIndicator/LinearLoadingIndicator';

const InfoItem = ({
  label,
  value,
}: {
  label: string;
  value: string | undefined;
}) => {
  return (
    <p className='text-[--accent-color]'>
      <span className='font-bold text-white'>{label}: </span>
      {value ? value : <LinearLoadingIndicator />}
    </p>
  );
};

export default InfoItem;
