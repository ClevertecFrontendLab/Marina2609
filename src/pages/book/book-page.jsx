import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Slider } from '../../app/components/slider/slider';

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
  const [data] = useState(props);
  const [category] = useState(props.category);
  const [arrow, setArrow] = useState('down');
  const [isReviewOpen, toggleReview] = useState(true);

  const toggleReviewMode = () => {
    if (arrow === 'up') {
      setArrow('down');
    } else {
      setArrow('up');
    }
    toggleReview(!isReviewOpen);
  };

  useEffect(() => {
    const menu = document.getElementById('aside-container');

    menu.style.display = 'none';
    document.querySelector('.book-page').parentNode.classList.add('wrapper-book');
  }, []);

  return (
    <section className='book-page'>
      <div className='navigation-menu'>
        <div className='book-title'>
          {category}
          <div className='slash' />
          {props.title}
        </div>
      </div>
      <div className='book-container'>
        <div className=' book-content'>
          <div className='row-span-3 book-slider'>
            <Slider images={data.imgSrc} />
          </div>
          {/* {props.imgSrc ? (
            <img src={props.imgSrc} alt='book_image' className='book-image' />
          ) : (
            <div className='cover-container'>
              <div className='cat' />
            </div>
          )} */}

          <div className='col-span-2 book-description'>
            <div className='title'>{props.title}</div>
            <div className='autor'>{props.autor}</div>
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
              <p>
                Алгоритмы — это всего лишь пошаговые алгоритмы решения задач, и большинство таких задач уже были
                кем-тоmрешены, протестированы и проверены. Можно, конечно, погрузится в глубокую философию гениального
                Кнута, изучить многостраничные фолианты с доказательствами и обоснованиями, но хотите ли вы тратить на
                это свое время?
              </p>
              <p>
                Откройте великолепно иллюстрированную книгу и вы сразу поймете, что алгоритмы — это просто. А грокать
                алгоритмы — это веселое и увлекательное занятие.
              </p>
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
                  <div className='publishing'>{props.publishing}</div>
                  <div className='year'>{props.year}</div>
                  <div className='pages'>{props.pages}</div>
                  <div className='binding'>{props.binding}</div>
                  <div className='format'>{props.format}</div>
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
                  <div className='category'>{props.category}</div>
                  <div className='weight'>{props.weight}</div>
                  <div className='isbn'>{props.isbn}</div>
                  <div className='manufacturer'>{props.manufacturer}</div>
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
    </section>
  );
};
