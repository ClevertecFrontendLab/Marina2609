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
      {props.cards.length === 0 ? (
        <div>В данном разделе нет книг</div>
      ) : (
        <React.Fragment>
          {props.cards.map((card) => (
            <NavLink to={`/book/${card.id}`} state={{ props: card }} aria-hidden={false} onClick={asideClose}>
              <div
                data-test-id='card'
                className={props.state === 'grid' ? 'book-grid-container' : 'book-list-container'}
              >
                <div className={props.state === 'grid' ? '' : 'book-cover'}>
                  {card.imgSrc.length !== 0 ? (
                    <img
                      src={card.imgSrc[0].img}
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
                      {card.rating === 0 ? (
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
                    </div>
                    <div className={props.state === 'grid' ? 'book-title-container' : ''}>
                      <div className={props.state === 'grid' ? 'book-grid-title' : 'book-list-title'}>{card.title}</div>
                    </div>
                    <div className={props.state === 'grid' ? 'book-grid-autor' : 'book-list-autor'}>{card.autor}</div>

                    {card.reserve === null ? (
                      <button type='button' className={props.state === 'grid' ? 'grid-reserve' : 'list-reserve'}>
                        Забронировать
                      </button>
                    ) : card.reserve === 'busy' ? (
                      <button
                        type='button'
                        className={props.state === 'grid' ? 'grid-reserve  grid-busy' : 'list-reserve  list-busy'}
                      >
                        Занята до {card.date}
                      </button>
                    ) : (
                      <button
                        type='button'
                        className={props.state === 'grid' ? 'grid-reserve grid-booked' : 'list-reserve list-booked'}
                      >
                        Забронирована
                      </button>
                    )}
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
