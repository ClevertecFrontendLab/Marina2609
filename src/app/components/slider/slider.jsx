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
  const [data] = useState(props);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

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
        className='swiper'
        data-test-id='slide-big'
        pagination={{
          clickable: true,
        }}
      >
        {data.book.images ? (
          <React.Fragment>
            {data.book.images.map((pic) => (
              <SwiperSlide>
                <img className='big-slider__img' src={`https://strapi.cleverland.by${pic.url}`} alt='big img' />
              </SwiperSlide>
            ))}
          </React.Fragment>
        ) : (
          <SwiperSlide>
            <div className='cover'>
              <div className='cover__cat' />
            </div>
          </SwiperSlide>
        )}
      </Swiper>

      {data.book.images && (
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={5}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className='swiper2'
          data-test-id='slide-mini'
        >
          {data.book.images.map((pic) => (
            <SwiperSlide>
              <img className='mini-slider__img' src={`https://strapi.cleverland.by${pic.url}`} alt='mini img' />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </React.Fragment>
  );
};
