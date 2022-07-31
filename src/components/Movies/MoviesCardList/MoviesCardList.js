import React from 'react';

import './MoviesCardList.css';

import Card from '../MoviesCard/MoviesCard.js';

function MoviesCardList(props) {
  const { onCardLike, onCardDelete, cards } = props;

  return (
    <section className='moviesCardList'>
      <ul className='moviesCardList__container'>
        {/* {cards.map((card) => (
            <Card
            card={card}
            key={'card._id'}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            />
          ))} */}
      </ul>
      <button
        className='moviesCardList__button-else button-hover'
        aria-label='in'
        type='button'
        // onClick={''}
      >
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;
