import React from 'react';
import { NavLink } from 'react-router-dom';

import './cards.css';

export const Cards = (props) => {
  const asideClose = () => {
    const menu = document.getElementById('aside-container');

    menu.style.display = 'none';
  };

  return (
    <div className={props.state === 'grid' ? 'books-grid' : 'books-list'}>
      {props.books.length === 0 ? (
        <div>В данном разделе нет книг</div>
      ) : (
        <React.Fragment>
          {props.books.map((book) => (
            <NavLink to={`/book/${book.id}`} state={{ props: book }} aria-hidden={false} onClick={asideClose}>
              <div
                data-test-id='card'
                className={props.state === 'grid' ? 'book-grid-container' : 'book-list-container'}
              >
                <div className={props.state === 'grid' ? '' : 'book-cover'}>
                  {book.image !== null ? (
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
                    {/* <div className={props.state === 'grid' ? 'grid-rating' : 'list-rating'}>
                      {book.rating === 0 ? (
                        <div className='not-star'>ещё нет оценок</div>
                      ) : (
                        <div className='stars'>
                          <div className='star checked' />
                          <div className='star checked' />
                          <div className='star checked' />
                          <div className='star checked' />
                          <div className='star unchecked' />
                        </div>
                      )}
                    </div> */}
                    <div className={props.state === 'grid' ? 'book-title-container' : ''}>
                      <div className={props.state === 'grid' ? 'book-grid-title' : 'book-list-title'}>{book.title}</div>
                    </div>
                    <div className={props.state === 'grid' ? 'book-grid-autor' : 'book-list-autor'}>
                      {book.authors}, {book.issueYear}
                    </div>

                    {/* {book.reserve === null ? (
                      <button type='button' className={props.state === 'grid' ? 'grid-reserve' : 'list-reserve'}>
                        Забронировать
                      </button>
                    ) : book.reserve === 'busy' ? (
                      <button
                        type='button'
                        className={props.state === 'grid' ? 'grid-reserve  grid-busy' : 'list-reserve  list-busy'}
                      >
                        Занята до {book.date}
                      </button>
                    ) : (
                      <button
                        type='button'
                        className={props.state === 'grid' ? 'grid-reserve grid-booked' : 'list-reserve list-booked'}
                      >
                        Забронирована
                      </button>
                    )} */}
                  </div>
                </div>
              </div>
            </NavLink>
          ))}
        </React.Fragment>
      )}
    </div>
  );
};
