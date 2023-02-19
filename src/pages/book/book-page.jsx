import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useParams } from 'react-router-dom';

import { Rating } from '../../app/components/rating/rating';
import { Slider } from '../../app/components/slider/slider';
import { getBook } from '../../redux/actions/actions';

import './book-page.css';

export const BookPage = () => {
  const { id } = useParams();
  const [arrow, setArrow] = useState('down');
  const [isReviewOpen, toggleReview] = useState(true);
  const book = useSelector((state) => state.reducer.book);
  const isLoading = useSelector((state) => state.reducer.isLoading);
  const error = useSelector((state) => state.reducer.error);
  const dispatch = useDispatch();
  const location = useLocation();
  let currentLink = '';
  const crumbs = location.pathname
    .split('/')
    .filter((cramb) => cramb !== '')
    .map((cramb) => {
      currentLink += `/${cramb}`;

      return (
        <div className='cramb' key={cramb}>
          <NavLink to={currentLink}>Бизнес</NavLink>
        </div>
      );
    });

  const toggleReviewMode = () => {
    if (arrow === 'up') {
      setArrow('down');
    } else {
      setArrow('up');
    }
    toggleReview(!isReviewOpen);
  };

  const closeError = () => {
    dispatch(getBook(false));
  };

  useEffect(() => {
    dispatch(getBook(id));
  }, [dispatch, id]);

  return (
    <section className='book-page'>
      <div className='navigation-menu'>
        <div className='book-title'>
          {crumbs[1]}
          <div />
          <div className='crambs'> {book.title}</div>
        </div>
      </div>
      {isLoading ? (
        <div className='loader-container' data-test-id='loader'>
          <div className='loader' />
        </div>
      ) : error ? (
        <div className='error-container' data-test-id='error'>
          <div className='error-content'>
            <div className='warning' />
            <h3 className='error-message'>Что-то пошло не так. Обновите страницу через некоторое время.</h3>
            <button type='button' className='close-message' aria-label='button' onClick={closeError} />
          </div>
        </div>
      ) : (
        book && (
          <div className='book-container'>
            <div className=' book-content'>
              <div className='row-span-3 book-slider'>
                <Slider book={book} />
              </div>

              <div className='col-span-2 book-description'>
                <div className='title'>{book.title}</div>
                <div className='autor'>
                  {book.authors}, {book.issueYear}
                </div>
                {book.booking ? (
                  <button type='button' className='reserve booked'>
                    Забронирована
                  </button>
                ) : (
                  <button type='button' className='reserve'>
                    Забронировать
                  </button>
                )}
                {book.delivery && (
                  <button type='button' className=' reserve busy'>
                    Занята до {book.delivery.dateHandedTo}
                  </button>
                )}
              </div>
              <div className='row-span-2 col-span-2 about-book'>
                <div className='about'>О книге</div>
                <div className='about-content'>
                  <p>{book.description}</p>
                </div>
              </div>
            </div>
            <div className='rating'>
              <div className='rating-title'>Рейтинг</div>

              {book.rating === null ? (
                <div className='not-star'>ещё нет оценок</div>
              ) : (
                <div className='rating-stars'>
                  <Rating rating={book.rating} />
                  <div className='rating-count'>{book.rating}</div>
                </div>
              )}
            </div>
            <div className='book-info'>
              <div className='information-title'>Подробная информация</div>
              <div className='information'>
                <div className='left-content'>
                  <div className='left-column'>
                    <div className='information-publishing'>Издательство</div>
                    <div className='information-year'>Год издания</div>
                    <div className='information-pages'>Страниц</div>
                    <div className='information-binding'>Переплёт</div>
                    <div className='information-format'>Формат</div>
                  </div>
                  <div className='right-column'>
                    <div className='publishing'>{book.producer}</div>
                    <div className='year'>{book.issueYear}</div>
                    <div className='pages'>{book.pages}</div>
                    <div className='binding'>{book.cover}</div>
                    <div className='format'>{book.format}</div>
                  </div>
                </div>
                <div className='right-content'>
                  <div className='left-column'>
                    <div className='information-category'>Жанр</div>
                    <div className='information-weight'>Вес</div>
                    <div className='information-isbn'>ISBN</div>
                    <div className='information-manufacturer'>Изготовитель</div>
                  </div>
                  <div className='right-column'>
                    <div className='category'>{book.categories}</div>
                    <div className='weight'>{book.weight}</div>
                    <div className='isbn'>{book.ISBN}</div>
                    <div className='manufacturer'>{book.publish}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className='review' aria-hidden={true} onClick={toggleReviewMode}>
              Отзывы
              {book.comments ? (
                <span className='review-count'>{book.comments.length}</span>
              ) : (
                <span className='review-count'>0</span>
              )}
              <div aria-hidden={true} data-test-id='button-rating' className={`arrow ${arrow}`} />
            </div>
            <div data-test-id='button-hide-reviews' className='review-container'>
              {isReviewOpen && (
                <div>
                  {book.comments && (
                    <div>
                      {book.comments.map((comment) => (
                        <div className='review-content'>
                          <div className='review-header'>
                            <div className='img-autor' />
                            <div className='review-autor'>{comment.user.firstName}</div>
                            <div className='review-date'>{comment.createdAt.split('T')[0]}</div>
                          </div>
                          <div className='review-stars'>
                            <Rating rating={comment.rating} />
                          </div>
                          {comment.text === '' ? (
                            <div className='review-not-description' />
                          ) : (
                            <div className='review-description'>{comment.text}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            <button type='button' className='btn-review'>
              оценить книгу
            </button>
          </div>
        )
      )}
    </section>
  );
};
