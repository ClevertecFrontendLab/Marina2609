import { legacy_createStore as createStore } from 'redux';
import { combineReducers } from '@reduxjs/toolkit';

import { booksReducer } from './books/books-reducer';

const rootReducer = combineReducers({
  books: booksReducer,
});

export const store = createStore(rootReducer);
