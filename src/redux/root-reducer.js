import { combineReducers } from 'redux';

import { booksReducer } from './books/books-reducer';

export const rootReducer = combineReducers({
  books: booksReducer,
});
