import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

import { getCategorie } from '../../../redux/actions/actions';
import { BookTitle } from '../book-title/book-title';
import { BookNotFound } from '../messages/book-not-found/book-not-found';
import { NoBooks } from '../messages/no-books/no-books';
import { Rating } from '../rating/rating';

import './cards.css';

export const Cards = (props) => {
  const [isVisibleMessage, setIsVisibleMessage] = useState(false);
  const [isMessage, setIsMessage] = useState(false);
  const search = useSelector((state) => state.reducer.search);
  const searchValue = useSelector((state) => state.reducer.searchValue);
  const filter = useSelector((state) => state.reducer.filter);
  const dispatch = useDispatch();
  const { category } = useParams();

  useEffect(() => {
    if (filter && search && search.length === 0) {
      setIsVisibleMessage(true);
      setIsMessage(false);
    } else if (!filter && search && search.length === 0) {
      setIsVisibleMessage(false);
      setIsMessage(true);
    } else {
      setIsVisibleMessage(false);
      setIsMessage(false);
    }
  }, [filter, props.books, search]);

  return (
    <div className={props.state === 'grid' ? 'books__grid' : 'books__list'}>
      {isMessage ? (
        <BookNotFound />
      ) : isVisibleMessage ? (
        <NoBooks />
      ) : (
        <React.Fragment>
          {props.books.map((book) => (
            <div key={book.id}>
              <NavLink
                onClick={() => {
                  dispatch(getCategorie(book.categories));
                }}
                to={`/books/${category}/${book.id}`}
                aria-hidden={false}
              >
                <div
                  data-test-id='card'
                  className={props.state === 'grid' ? 'book-grid-container' : 'book-list-container'}
                >
                  <div className={props.state === 'grid' ? '' : 'book-cover'}>
                    {book.image ? (
                      <img
                        src={`https://strapi.cleverland.by${book.image.url}`}
                        className={props.state === 'grid' ? 'book-grid-cover' : 'book-list-cover'}
                        alt='no book cover'
                      />
                    ) : (
                      <div className={props.state === 'grid' ? 'grid-cover-container' : 'list-cover-container'}>
                        <div className={props.state === 'grid' ? 'grid-cover-cat' : 'list-cover-cat'} />
                      </div>
                    )}
                    <div className={props.state === 'grid' ? 'grid-description' : 'description'}>
                      <div className={props.state === 'grid' ? 'grid-rating' : 'list-rating'}>
                        {book.rating === null ? (
                          <div className='not-star'>ещё нет оценок</div>
                        ) : (
                          <Rating rating={book.rating} />
                        )}
                      </div>
                      <div className={props.state === 'grid' ? 'book-title-container' : ''}>
                        <div className={props.state === 'grid' ? 'book-grid-title' : 'book-list-title'}>
                          <BookTitle title={book.title} filter={searchValue} />
                        </div>
                      </div>
                      <div className={props.state === 'grid' ? 'book-grid-autor' : 'book-list-autor'}>
                        {book.authors}, {book.issueYear}
                      </div>
                      {book.booking ? (
                        <button
                          type='button'
                          className={props.state === 'grid' ? 'grid-reserve grid-booked' : 'list-reserve list-booked'}
                        >
                          Забронирована
                        </button>
                      ) : (
                        <button type='button' className={props.state === 'grid' ? 'grid-reserve' : 'list-reserve'}>
                          Забронировать
                        </button>
                      )}
                      {book.delivery && (
                        <button
                          type='button'
                          className={props.state === 'grid' ? 'grid-reserve grid-booked' : 'list-reserve list-booked'}
                        >
                          Занята до {book.delivery.dateHandedTo}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </NavLink>
            </div>
          ))}
        </React.Fragment>
      )}
    </div>
  );
};
