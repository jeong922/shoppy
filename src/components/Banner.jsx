import React, { useEffect, useRef, useState } from 'react';
import BannerBtn from './BannerBtn';
import Pagination from './Pagination';

function useInterval(callback, delay) {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default function Banner() {
  const items = [
    { data: './img/b1.jpg', id: 1, text: 'J Shop' },
    { data: './img/b2.jpg', id: 2, text: 'denim collection' },
    { data: './img/b4.jpg', id: 3, text: 'knitwear' },
  ];
  const SLIDE_PADDING = 40;
  const sliderPaddingStyle = `0 ${SLIDE_PADDING}px`;
  const DATA_COUNT = 2;
  const transitionTime = 300;
  const itemSize = items.length;
  const transitionStyle = `transform ${transitionTime}ms ease 0s`;
  const [slideIndex, setSlideIndex] = useState(DATA_COUNT);
  const [size, setSize] = useState([0, 0]);
  const [stop, setStop] = useState(4000);
  const [slideTransition, setTransition] = useState(transitionStyle);

  const replaceSlide = (index) => {
    setTimeout(() => {
      setTransition('');
      setSlideIndex(index);
    }, transitionTime);
  };

  const slideHandler = (direction) => {
    let index = slideIndex + direction;
    setSlideIndex(index);
    if (index - DATA_COUNT < 0) {
      index += itemSize;
      replaceSlide(index);
    } else if (index - DATA_COUNT >= itemSize) {
      index -= itemSize;
      replaceSlide(index);
    }
    setTransition(transitionStyle);
  };

  const getWindowSize = () => {
    setSize([window.innerWidth, window.innerHeight]);
  };

  const getItemWidth = () => {
    let itemWidth = size[0] * 0.85 - SLIDE_PADDING * 2;
    itemWidth = itemWidth > 1440 ? 1440 : itemWidth > 768 ? itemWidth : size[0];
    return itemWidth;
  };

  const cloneSlide = () => {
    const front = [];
    const back = [];
    let index = 0;

    while (index < DATA_COUNT) {
      back.push(items[index % items.length]);
      front.push(items[items.length - 1 - (index % items.length)]);
      index++;
    }
    return [...front, ...items, ...back];
  };

  const getItemIndex = (index) => {
    index -= DATA_COUNT;
    if (index < 0) {
      index += itemSize;
    } else if (index >= itemSize) {
      index -= itemSize;
    }
    return index;
  };

  useEffect(() => {
    window.addEventListener('resize', getWindowSize);
    return () => window.removeEventListener('resize', getWindowSize);
  }, []);

  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, []);

  useInterval(() => {
    slideHandler(1);
  }, stop);

  return (
    <div
      className='flex justify-center mb-5'
      onMouseEnter={() => setStop(null)}
      onMouseLeave={() => setStop(4000)}
    >
      <div className='relative overflow-hidden '>
        <div className='relative select-none'>
          <BannerBtn direction='left' onClick={() => slideHandler(-1)} />
          <BannerBtn direction='right' onClick={() => slideHandler(1)} />
          <div
            className='relative overflow-hidden'
            style={{ padding: sliderPaddingStyle }}
          >
            <div
              className='relative top-0 flex left-1/2 w-fit'
              style={{
                transform: `translateX(${
                  (-100 / cloneSlide().length) * (0.5 + slideIndex)
                }%)`,
                transition: slideTransition,
              }}
            >
              {cloneSlide().map((item, index) => {
                const itemIndex = getItemIndex(index);
                return (
                  <div
                    key={index}
                    className='relative items-center justify-center px-3 felx h-96'
                    style={{ width: getItemWidth() || 'auto' }}
                  >
                    <img
                      className='z-20 object-cover w-full h-full select-none opacity-90'
                      src={items[itemIndex].data}
                      alt='img'
                    />
                    <div className='absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center text-center text-neutral-100'>
                      <span className='text-2xl font-semibold uppercase md:text-4xl'>
                        {item.text}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Pagination
          itemSize={itemSize}
          setSlideIndex={setSlideIndex}
          slideIndex={slideIndex}
        />
      </div>
    </div>
  );
}
