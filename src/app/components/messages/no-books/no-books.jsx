import React from 'react';

import './no-books.css';

export const NoBooks = () => (
  <div data-test-id='empty-category' className='empty-category'>
    В этой категории книг ещё нет
  </div>
);
