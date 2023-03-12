import {
  CATEGORIE,
  ERROR,
  FAILED,
  FILTER,
  GET_BOOK_BY_ID,
  GET_BOOKS,
  GET_CATEGORIES,
  REQUEST,
  SEARCH,
  SEARCH_VALUE,
} from '../actions/actions-types';

const initialState = {
  isLoading: false,
  isLoadCategories: false,
  books: [],
  categories: [],
  book: {},
  categorie: '',
  error: '',
  errorCategories: '',
  isShow: false,
  search: [],
  searchValue: [],
  filter: false,
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST:
      return { ...state, isLoading: true, isLoadCategories: true };

    case GET_BOOKS:
      return { ...state, isLoading: false, books: payload, error: '' };

    case GET_CATEGORIES:
      return { ...state, isLoadCategories: false, categories: payload, errorCategories: '' };

    case GET_BOOK_BY_ID:
      return { ...state, isLoading: false, book: payload, error: '' };

    case FAILED:
      return { ...state, isLoading: false, books: [], error: payload };

    case ERROR:
      return { ...state, isShow: true };

    case CATEGORIE:
      return { ...state, categorie: payload };

    case SEARCH:
      return { ...state, search: payload };

    case SEARCH_VALUE:
      return { ...state, searchValue: payload };

    case FILTER:
      return { ...state, filter: payload };

    default:
      return state;
  }
};

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

export const fetchSearchValue = (value) => ({
  type: SEARCH_VALUE,
  payload: value,
});

export const fetchFilter = (filter) => ({
  type: FILTER,
  payload: filter,
});
