import axios from 'axios';

import { FETCH_BOOKS_FAILURE, FETCH_BOOKS_REQUEST, FETCH_BOOKS_SUCCESS } from './books-types';

export const fetchBooksRequest = () => ({
  type: FETCH_BOOKS_REQUEST,
});

export const fetchBooksSuccess = (books) => ({
  type: FETCH_BOOKS_SUCCESS,
  payload: books,
});

export const fetchBooksFailure = (error) => ({
  type: FETCH_BOOKS_FAILURE,
  payload: error,
});

export const fetchBooks = () => (dispatch) => {
  dispatch(fetchBooksRequest());

  axios
    .get('https://strapi.cleverland.by/api/books')
    .then((response) => {
      const books = response.data;
      console.log(books);
      dispatch(fetchBooksSuccess(books));
    })
    .catch((error) => {
      dispatch(fetchBooksFailure(error.message));
    });
};
