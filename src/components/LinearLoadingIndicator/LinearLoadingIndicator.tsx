import React from 'react';
import './LinearLoadingIndicator.css';

const LinearLoadingIndicator = () => {
  return (
    <div
      data-testid='linear-loading'
      className={'w-full loading-indicator h-1'}
    ></div>
  );
};

export default LinearLoadingIndicator;
