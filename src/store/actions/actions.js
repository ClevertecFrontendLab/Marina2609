import { axiosInstance, baseUrl } from '../../api/api';
import { fetchMessage, fetchMessage2 } from '../reducers/message-reducer';
import {
  fetchBooksFailure,
  fetchBooksRequest,
  fetchBooksSuccess,
  fetchBookSuccess,
  fetchCategorie,
  fetchCategoriesFailure,
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
  fetchError,
  fetchFilter,
  fetchSearch,
  fetchSearchValue,
} from '../reducers/reducer';

export const fetchBooks = () => (dispatch) => {
  dispatch(fetchBooksRequest());

  axiosInstance
    .get(`${baseUrl}/api/books`)
    .then((response) => {
      dispatch(fetchBooksSuccess(response.data));
    })
    .catch((error) => {
      dispatch(fetchBooksFailure(error.message));
    });
};

export const fetchCategories = () => (dispatch) => {
  dispatch(fetchCategoriesRequest());

  axiosInstance
    .get(`${baseUrl}/api/categories`)
    .then((response) => {
      dispatch(fetchCategoriesSuccess(response.data));
    })
    .catch((error) => {
      dispatch(fetchCategoriesFailure(error.message));
    });
};

export const getBook = (id) => (dispatch) => {
  dispatch(fetchBooksRequest());

  axiosInstance
    .get(`${baseUrl}/api/books/${id}`)
    .then((response) => {
      dispatch(fetchBookSuccess(response.data));
    })
    .catch((error) => {
      dispatch(fetchBooksFailure(error.message));
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

export const getSearchValue = (value) => async (dispatch) => {
  dispatch(fetchSearchValue(value));
};

export const getFilter = (filter) => async (dispatch) => {
  dispatch(fetchFilter(filter));
};

export const getMessage = (message) => async (dispatch) => {
  dispatch(fetchMessage(message));
};

export const getMessage2 = (message2) => async (dispatch) => {
  dispatch(fetchMessage2(message2));
};
