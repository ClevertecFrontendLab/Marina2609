/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import { Slider } from '../../app/components/slider/slider';
import { getBook, getError } from '../../redux/actions/actions';

import './book-page.css';

const reviews = [
  {
    autor: 'Иван Иванов',
    date: '5 января 2019',
    review:
      'Учитывая ключевые сценарии поведения, курс на социально-ориентированный национальный проект не оставляет шанса для анализа существующих паттернов поведения. Для современного мира внедрение современных методик предоставляет широкие возможности для позиций, занимаемых участниками в отношении поставленных задач. Как уже неоднократно упомянуто, сделанные на базе интернет-аналитики выводы будут в равной степени предоставлены сами себе. Вот вам яркий пример современных тенденций — глубокий уровень погружения создаёт предпосылки для своевременного выполнения сверхзадачи. И нет сомнений, что акционеры крупнейших компаний, инициированные исключительно синтетически, превращены в посмешище, хотя само их существование приносит несомненную пользу обществу.',
  },
  {
    autor: 'Николай Качков',
    date: '20 июня 2018',
    review:
      'Учитывая ключевые сценарии поведения, курс на социально-ориентированный национальный проект не оставляет шанса для анализа существующих паттернов поведения. Для современного мира внедрение современных методик предоставляет широкие возможности для позиций, занимаемых участниками в отношении поставленных задач. Как уже неоднократно упомянуто, сделанные на базе интернет-аналитики выводы будут в равной степени предоставлены сами себе. Вот вам яркий пример современных тенденций — глубокий уровень погружения создаёт предпосылки для своевременного выполнения сверхзадачи. И нет сомнений, что акционеры крупнейших компаний, инициированные исключительно синтетически, превращены в посмешище, хотя само их существование приносит несомненную пользу обществу.',
  },
  {
    autor: 'Екатерина Беляева',
    date: '18 февраля 2018',
    review: null,
  },
];

export const BookPage = () => {
  const location = useLocation();
  const { props } = location.state;
  const [category] = useState(props.categories);
  const [arrow, setArrow] = useState('down');
  const [isReviewOpen, toggleReview] = useState(true);
  const { id } = useParams();
  const isShow = useSelector((state) => state.reducer.isShow);
  const book = useSelector((state) => state.reducer.book);
  const isLoading = useSelector((state) => state.reducer.isLoading);
  const error = useSelector((state) => state.reducer.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBook(id));

    if (error) {
      dispatch(getError(true));
    }
  }, [dispatch, error, id]);

  console.log(isShow);

  const toggleReviewMode = () => {
    if (arrow === 'up') {
      setArrow('down');
    } else {
      setArrow('up');
    }
    toggleReview(!isReviewOpen);
  };

  const closeError = () => {};

  return (
    <section className='book-page'>
      {isShow ? (
        <div className='error-container' data-test-id='error'>
          <div className='error-content'>
            <div className='warning' />
            <h3 className='error-message'>Что-то пошло не так. Обновите страницу через некоторое время.</h3>
            <button type='button' className='close-message' onClick={closeError} />
          </div>
        </div>
      ) : isLoading ? (
        <div className='loader-container' data-test-id='loader'>
          <div className='loader' />
        </div>
      ) : (
        book && (
          <React.Fragment>
            <div className='navigation-menu'>
              <div className='book-title'>
                {category}
                <div className='slash' />
                {book.title}
              </div>
            </div>
            <div className='book-container'>
              <div className=' book-content'>
                <div className='row-span-3 book-slider'>{/* <Slider images={data.imgSrc} /> */}</div>

                <div className='col-span-2 book-description'>
                  <div className='title'>{book.title}</div>
                  <div className='autor'>
                    {book.authors}, {book.issueYear}
                  </div>
                  {props.reserve === null ? (
                    <button type='button' className='reserve'>
                      Забронировать
                    </button>
                  ) : props.reserve === 'busy' ? (
                    <button type='button' className=' reserve busy'>
                      Занята до {props.date}
                    </button>
                  ) : (
                    <button type='button' className='reserve booked'>
                      Забронирована
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
                {props.rating === 0 ? (
                  <div className='no-star'>
                    <div className='star unchecked' />
                    <div className='star unchecked' />
                    <div className='star unchecked' />
                    <div className='star unchecked' />
                    <div className='star unchecked' />
                    <div className='rating-count'>ещё нет оценок</div>
                  </div>
                ) : (
                  <div className='rating-stars'>
                    <div className='star checked' />
                    <div className='star checked' />
                    <div className='star checked' />
                    <div className='star checked' />
                    <div className='star unchecked' />
                    <div className='rating-count'>4.3</div>
                  </div>
                )}
              </div>
              {reviews !== null ? (
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
                        <div className='year'>{book.year}</div>
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
              ) : (
                <div className='' />
              )}
              <div className='review' aria-hidden={true} onClick={toggleReviewMode}>
                Отзывы <span className='review-count'>2</span>
                <div aria-hidden={true} data-test-id='button-rating' className={`arrow ${arrow}`} />
              </div>
              <div data-test-id='button-hide-reviews' className='review-container'>
                {isReviewOpen ? (
                  <React.Fragment>
                    {reviews.map((review) => (
                      <div className='review-content'>
                        <div className='review-header'>
                          <div className='img-autor' />
                          <div className='review-autor'>{review.autor}</div>
                          <div className='review-date'>{review.date}</div>
                        </div>
                        <div className='review-stars'>
                          <div className='star checked' />
                          <div className='star checked' />
                          <div className='star checked' />
                          <div className='star checked' />
                          <div className='star unchecked' />
                        </div>
                        {review.review === '' ? (
                          <div className='review-not-description' />
                        ) : (
                          <div className='review-description'>{review.review}</div>
                        )}
                      </div>
                    ))}
                  </React.Fragment>
                ) : (
                  ''
                )}
              </div>

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
