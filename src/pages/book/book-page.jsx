import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useParams } from 'react-router-dom';

import { Loader } from '../../app/components/loader/loader';
import { ErrorMessage } from '../../app/components/messages/error-message/error-message';
import { Rating } from '../../app/components/rating/rating';
import { Slider } from '../../app/components/slider/slider';
import { getBook, getCategorie } from '../../redux/actions/actions';

import './book-page.css';

export const BookPage = () => {
  const { id } = useParams();
  const [arrow, setArrow] = useState('down');
  const [isReviewOpen, toggleReview] = useState(true);
  const book = useSelector((state) => state.reducer.book);
  const isLoading = useSelector((state) => state.reducer.isLoading);
  const error = useSelector((state) => state.reducer.error);
  const categories = useSelector((state) => state.reducer.categories);
  const dispatch = useDispatch();
  const [categorieValue, setCategorieValue] = useState('');

  const { category } = useParams();

  const toggleReviewMode = () => {
    if (arrow === 'up') {
      setArrow('down');
    } else {
      setArrow('up');
    }
    toggleReview(!isReviewOpen);
  };

  useEffect(() => {
    dispatch(getBook(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (category === 'all') {
      setCategorieValue('Все книги');
    } else {
      const arr = categories.filter((e) => e.path.includes(category));

      arr.map((el) => setCategorieValue(el.name));
    }
  }, [categories, category]);

  return (
    <section className='book-page'>
      <div className='navigation-menu'>
        <div className='book-title'>
          <NavLink data-test-id='breadcrumbs-link' to={`/books/${category}`}>
            {categorieValue}
          </NavLink>
          <div className='slash' />
          <div className='crambs' data-test-id='book-name'>
            {book.title}
          </div>
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage />
      ) : (
        book && (
          <div className='book-container'>
            <div className=' book-content'>
              <div className='row-span-3 book-slider'>
                <Slider book={book} />
              </div>

              <div className='col-span-2 book-description'>
                <div className='title' data-test-id='book-title'>
                  {book.title}
                </div>
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
