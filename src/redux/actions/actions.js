import axios from 'axios';

import { FAILED, GET_BOOK_BY_ID, GET_BOOKS, GET_CATEGORIES, REQUEST } from './actions-types';

export const fetchBooksRequest = () => ({
  type: REQUEST,
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
  dispatch(getBooks(id));
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
  axios.get('https://strapi.cleverland.by/api/categories').then((response) => {
    const result = response.data;

    dispatch(fetchCategoriesSuccess(result));
  });
};

// export const getBooks = () => async (dispatch) => {
//   dispatch({
//     type: REQUEST,
//   });
//   try {
//     const result = await axios.get('https://strapi.cleverland.by/api/books');

//     dispatch({
//       type: GET_BOOKS,
//       payload: result.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: FAILED,
//       payload: error,
//     });
//   }
// };

// export const getBook = (id) => async (dispatch) => {
//   try {
//     const result = await axios.get(`https://strapi.cleverland.by/api/books/${id}`);

//     dispatch({
//       type: GET_BOOK_BY_ID,
//       payload: result.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: FAILED,
//       payload: error,
//     });
//   }
// };

// export const getPosts = (id) => async (dispatch) => {
//   dispatch(getBook(id));
//   try {
//     const result = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id} `);

//     dispatch({
//       type: GET_POSTS,
//       payload: result.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: FAILED,
//       payload: error,
//     });
//   }
// };

// export const getComments = (id) => async (dispatch) => {
//   try {
//     const result = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId
//         ${id} `);

//     dispatch({
//       type: GET_POSTS_BY_ID,
//       payload: result.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: FAILED,
//       payload: error,
//     });
//   }
// };
