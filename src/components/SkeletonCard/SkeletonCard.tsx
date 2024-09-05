import React from 'react';

const SkeletonCard = () => {
  return (
    <div
      data-testId='skeleton-card'
      className={`w-[100%] h-[auto] p-2 flex justify-center items-center rounded-lg glowing-border`}
    >
      <div>
        <div className='w-[200px] h-[250px]'></div>
        <div className='p-1 mt-2 bg-opacity-70 text-xs'></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
