import axios from 'axios';

import {
  CATEGORIE,
  ERROR,
  FAILED,
  GET_BOOK_BY_ID,
  GET_BOOKS,
  GET_CATEGORIES,
  REQUEST,
  SEARCH,
  SORTING,
} from './actions-types';

export const fetchBooksRequest = () => ({
  type: REQUEST,
});

export const fetchCategoriesRequest = () => ({
  type: REQUEST,
});

export const fetchError = (error) => ({
  type: ERROR,
  payload: error,
});

export const fetchCategorie = (categorie) => ({
  type: CATEGORIE,
  payload: categorie,
});

export const fetchBooksSuccess = (books) => ({
  type: GET_BOOKS,
  payload: books,
});

export const fetchCategoriesSuccess = (categories) => ({
  type: GET_CATEGORIES,
  payload: categories,
});

export const fetchBookSuccess = (book) => ({
  type: GET_BOOK_BY_ID,
  payload: book,
});

export const fetchBooksFailure = (error) => ({
  type: FAILED,
  payload: error,
});

export const fetchCategoriesFailure = (error) => ({
  type: FAILED,
  payload: error,
});

export const fetchSearch = (search) => ({
  type: SEARCH,
  payload: search,
});

export const fetchSort = (sort) => ({
  type: SORTING,
  payload: sort,
});

export const getBooks = () => (dispatch) => {
  dispatch(fetchBooksRequest());

  axios
    .get('https://strapi.cleverland.by/api/books')
    .then((response) => {
      const result = response.data;

      dispatch(fetchBooksSuccess(result));
    })
    .catch((error) => {
      dispatch(fetchBooksFailure(error.message));
    });
};

export const getBook = (id) => async (dispatch) => {
  dispatch(fetchBooksRequest());

  axios
    .get(`https://strapi.cleverland.by/api/books/${id}`)
    .then((response) => {
      const result = response.data;

      dispatch(fetchBookSuccess(result));
    })
    .catch((error) => {
      dispatch(fetchBooksFailure(error.message));
    });
};

export const getCategories = () => async (dispatch) => {
  dispatch(fetchCategoriesRequest());

  axios
    .get('https://strapi.cleverland.by/api/categories')
    .then((response) => {
      const result = response.data;

      dispatch(fetchCategoriesSuccess(result));
    })
    .catch((error) => {
      dispatch(fetchCategoriesFailure(error.message));
    });
};

export const getError = (error) => async (dispatch) => {
  dispatch(fetchError(error.message));
};

export const getCategorie = (categorie) => async (dispatch) => {
  dispatch(fetchCategorie(categorie));
};

export const getSearch = (search) => async (dispatch) => {
  dispatch(fetchSearch(search));
};

export const getSort = (sort) => async (dispatch) => {
  dispatch(fetchSort(sort));
};
