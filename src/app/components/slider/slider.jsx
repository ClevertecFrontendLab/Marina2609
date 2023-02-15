import React, { useState } from 'react';
import { FreeMode, Navigation, Pagination, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import './slider.css';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';

export const Slider = (props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // {props.imgSrc ? (
  //   <img src={props.imgSrc} alt='book_image' className='book-image' />
  // ) : (
  //   <div className='cover-container'>
  //     <div className='cat' />
  //   </div>
  // )}
  // props.imgSrc.map((el) => console.log(el));

  return (
    <React.Fragment>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        loop={true}
        spaceBetween={5}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Navigation, Thumbs, Pagination]}
        className='mySwiper2'
        data-test-id='slide-big'
        pagination={{
          clickable: true,
        }}
      >
        {props.images.length !== 0 ? (
          <React.Fragment>
            {props.images.map((pic) => (
              <SwiperSlide>
                <img className='big-slider__img' src={pic.img} alt='big img' />
              </SwiperSlide>
            ))}
          </React.Fragment>
        ) : (
          <SwiperSlide>
            <div className='cover-container'>
              <div className='cat' />
            </div>
          </SwiperSlide>
        )}
      </Swiper>

      {props.images.length !== 0 && props.images.length !== 1 ? (
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={5}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className='mySwiper'
          data-test-id='slide-mini'
        >
          {props.images.map((pic) => (
            <SwiperSlide>
              <img className='mini-slider__img' src={pic.img} alt='mini img' />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        ''
      )}
    </React.Fragment>
  );
};

// <img className='mini-slider__img' src='../../assets/img/cat.png' alt='mini img' />
