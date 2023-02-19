/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import { Rating } from '../../app/components/rating/rating';
import { Slider } from '../../app/components/slider/slider';
import { getBook } from '../../redux/actions/actions';

import './book-page.css';

export const BookPage = () => {
  // const [category] = useState(props.categories);
  const [arrow, setArrow] = useState('down');
  const [isReviewOpen, toggleReview] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBook(id));
  }, [dispatch, id]);

  const book = useSelector((state) => state.reducer.book);
  const isLoading = useSelector((state) => state.reducer.isLoading);
  const error = useSelector((state) => state.reducer.error);

  const toggleReviewMode = () => {
    if (arrow === 'up') {
      setArrow('down');
    } else {
      setArrow('up');
    }
    toggleReview(!isReviewOpen);
  };

  const closeError = () => {
    // dispatch(getError(false));
  };
  console.log(book);

  return (
    <section className='book-page'>
      {isLoading ? (
        <div className='loader-container' data-test-id='loader'>
          <div className='loader' />
        </div>
      ) : error ? (
        <div className='error-container' data-test-id='error'>
          <div className='error-content'>
            <div className='warning' />
            <h3 className='error-message'>Что-то пошло не так. Обновите страницу через некоторое время.</h3>
            <button type='button' className='close-message' onClick={closeError} />
          </div>
        </div>
      ) : (
        book && (
          <React.Fragment>
            <div className='navigation-menu'>
              <div className='book-title'>
                {/* {category} */}
                <div className='slash' />
                {book.title}
              </div>
            </div>
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
                  {book.booking === null ? (
                    <button type='button' className='reserve'>
                      Забронировать
                    </button>
                  ) : (
                    <button type='button' className='reserve booked'>
                      Забронирована
                    </button>
                  )}
                  {book.delivery !== null && (
                    <button type='button' className=' reserve busy'>
                      {/* Занята до {book.delivery.dateHandedTo} */}
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
                {/* Отзывы <span className='review-count'>{book.comments}</span> */}
                <div aria-hidden={true} data-test-id='button-rating' className={`arrow ${arrow}`} />
              </div>
              {/* <div data-test-id='button-hide-reviews' className='review-container'>
              {isReviewOpen && (
                <React.Fragment>
                  {book.comments.map((review) => (
                    <div className='review-content'>
                      <div className='review-header'>
                        <div className='img-autor' />
                        <div className='review-autor'>{review.user.firstName}</div>
                        <div className='review-date'>{review.createdAt}</div>
                      </div>
                      <div className='review-stars'>
                        <div className='star checked' />
                        <div className='star checked' />
                        <div className='star checked' />
                        <div className='star checked' />
                        <div className='star unchecked' />
                      </div>
                      {review.text === '' ? (
                        <div className='review-not-description' />
                      ) : (
                        <div className='review-description'>{review.text}</div>
                      )}
                    </div>
                  ))}
                </React.Fragment>
              )}
            </div> */}

              <button type='button' className='btn-review'>
                оценить книгу
              </button>
            </div>
            ;
          </React.Fragment>
        )
      )}
    </section>
  );
};
