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
    <div className='info-item flex items-center gap-2'>
      <p className='text-white font-thin'>
        {label}: {value}
      </p>
    </div>
  );
};

export default InfoItem;
