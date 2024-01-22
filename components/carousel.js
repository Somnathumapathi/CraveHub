'use client';
import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = ({images}) => {
    const settings = {
        autoplay: true,
        autoplaySpeed: 2500,
        dots: true,
        infinite: true,
        speed: 900,
        slidesToShow: 1,
        slidesToScroll: 1,
        width: 800,
        height:400
      };
      return (
        <div className='w-10/12'>
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index}>
                        <img src={image} alt={`slide-${index + 1}`} />
                    </div>
                ))}
            </Slider>
        </div>
      )
}
export default Carousel;