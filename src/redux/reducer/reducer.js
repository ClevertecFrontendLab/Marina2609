import { FAILED, GET_BOOK_BY_ID, GET_BOOKS, GET_CATEGORIES, REQUEST } from '../actions/actions-types';

const initialState = {
  loading: false,
  books: [],
  categories: [],
  book: {},
  error: '',
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_BOOKS:
      return { loading: false, books: payload, error: '' };
    case GET_CATEGORIES:
      return { loading: false, categories: payload, error: '' };
    case GET_BOOK_BY_ID:
      return { loading: false, book: payload, error: '' };

    case FAILED:
      return { loading: false, books: [], error: payload };
    default:
      return state;
  }
};
