import React, { useState, useEffect } from 'react';

import './MoviesCardList.css';

import Card from '../MoviesCard/MoviesCard.js';

function MoviesCardList(props) {
  const { cards } = props;

  const [isDesktop, setIsDesktop] = useState(
    window.matchMedia('(min-width: 928px)').matches
  );
  const [isMobile, setIsMobile] = useState(
    window.matchMedia('(max-width: 600px)').matches
  );
  const index = (isDesktop && 12) || (isMobile && 5) || 8;

  const [indexArray, setIndexArray] = useState(index);

  const moviesCardList = (
    <ul className='moviesCardList__container'>
      {cards
        .map((card, i) => <Card card={card} key={i} isMobile={isMobile} />)
        .slice(0, indexArray)}
    </ul>
  );

  useEffect(() => {
    setIndexArray(index);
  }, [isDesktop, isMobile]);

  useEffect(() => {
    const handler = (e) => setIsDesktop(e.matches);
    window.matchMedia('(min-width: 928px)').addEventListener('change', handler);
    return () =>
      window
        .matchMedia('(min-width: 928px)')
        .removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const handler = (e) => setIsMobile(e.matches);
    window.matchMedia('(max-width: 600px)').addEventListener('change', handler);
    return () =>
      window
        .matchMedia('(max-width: 600px)')
        .removeEventListener('change', handler);
  }, []);

  const addMovies = () => {
    isDesktop ? setIndexArray(indexArray + 3) : setIndexArray(indexArray + 2);
  };

  return (
    <section className='moviesCardList'>
      <>
        {moviesCardList}
        {moviesCardList.props.children.length < cards.length && (
          <button
            className='moviesCardList__button-else button-hover'
            aria-label='in'
            type='button'
            onClick={addMovies}
          >
            Ещё
          </button>
        )}
      </>
    </section>
  );
}

export default MoviesCardList;
