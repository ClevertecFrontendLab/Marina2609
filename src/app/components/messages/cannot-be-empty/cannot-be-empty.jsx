import React from 'react';
import { useSelector } from 'react-redux';

export const CannotBeEmpty = () => {
  const message = useSelector((state) => state.message.message);

  return (
    <p className='authentication__input-error' data-test-id='hint'>
      <span>{message}</span>
    </p>
  );
};

export const CannotBeEmpty2 = () => {
  const message2 = useSelector((state) => state.message.message2);

  return (
    <p className='authentication__input-error' data-test-id='hint'>
      <span>{message2}</span>
    </p>
  );
};
