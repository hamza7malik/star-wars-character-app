import React, { useEffect, useState } from 'react';

const PaginationInput = ({
  onPageChange,
  currentPage,
}: {
  onPageChange: (page: number) => void;
  currentPage: number;
}) => {
  const [inputValue, setInputValue] = useState('1');

  useEffect(() => {
    setInputValue(`${currentPage}`);
  }, [currentPage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if ((Number(value) <= 9 && Number(value) >= 1) || value === '') {
      setInputValue(`${value}`);
      if (value !== '') {
        onPageChange(Number(value));
      }
    }
    console.log(inputValue);
  };
  return (
    <span className='px-4 py-2 text-xs text-yellow-400'>
      Go to:{' '}
      <input
        type='text'
        className='text-white bg-black px-2 ml-2 w-9'
        value={inputValue}
        onChange={handleInputChange}
      />
    </span>
  );
};

export default PaginationInput;
