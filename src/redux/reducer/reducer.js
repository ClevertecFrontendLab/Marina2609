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
        loading: true,
      };

    case GET_BOOKS:
      return { isLoading: false, books: payload, error: '' };

    case GET_CATEGORIES:
      return { isLoadCategories: false, categories: payload, errorCategories: '' };

    case GET_BOOK_BY_ID:
      return { isLoading: false, book: payload, error: '' };

    case FAILED:
      return { isLoading: false, books: [], error: payload };

    case ERROR:
      return { isShow: payload };

    default:
      return state;
  }
};
