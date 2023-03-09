import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const CannotBeEmpty = () => {
  const message = useSelector((state) => state.message.message);

  return (
    <span className='authentication__input-error' data-test-id='hint'>
      {message}
    </span>
  );
};
