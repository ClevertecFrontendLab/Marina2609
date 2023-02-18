import { ERROR, FAILED, GET_BOOK_BY_ID, GET_BOOKS, GET_CATEGORIES, REQUEST } from '../actions/actions-types';

const initialState = {
  isLoading: false,
  isLoadCategories: false,
  books: [],
  categories: [],
  book: {},
  error: '',
  errorCategories: '',
  isShow: false,
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST:
      return {
        ...state,
        isLoading: true,
        isLoadCategories: true,
      };

    case GET_BOOKS:
      return { ...state, isLoading: false, books: payload, error: '' };

    case GET_CATEGORIES:
      return { ...state, isLoadCategories: false, categories: payload, errorCategories: '' };

    case GET_BOOK_BY_ID:
      return { ...state, isLoading: false, book: payload, error: '' };

    case FAILED:
      return { ...state, isLoading: false, books: [], error: payload };

    case ERROR:
      return { ...state, isShow: payload };

    default:
      return state;
  }
};
