import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getCategorie } from '../../../redux/actions/actions';
import { Rating } from '../rating/rating';

import './cards.css';

export const Cards = (props) => {
  const [isVisibleMessage, setIsVisibleMessage] = useState(false);
  const search = useSelector((state) => state.reducer.search);
  const dispatch = useDispatch();

  useEffect(() => {
    if (search && props.books.length === 0) {
      setIsVisibleMessage(true);
    } else {
      setIsVisibleMessage(false);
    }
  }, [props.books, search]);

  return (
    <div className={props.state === 'grid' ? 'books-grid' : 'books-list'}>
      {isVisibleMessage ? (
        <div data-test-id='search-result-not-found' className=''>
          По запросу ничего не найдено
        </div>
      ) : (
        <React.Fragment>
          {props.books.map((book) => (
            <div data-test-id='highlight-matches'>
              <NavLink
                onClick={() => dispatch(getCategorie(book.categories))}
                to={`/books/${book.categories}/${book.id}`}
                key={book.id}
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
                          {book.title}
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
