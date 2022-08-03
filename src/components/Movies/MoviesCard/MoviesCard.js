import React from 'react';

import './MoviesCard.css';

function MoviesCard(props) {
  const { card, isMobile } = props;

  const isLiked = false;
  const cardLikeButtonClassName = `moviesCard__icon button-hover ${
    isLiked && 'moviesCard__icon_active'
  }`;

  const getTime = (min) => {
    const hours = Math.trunc(min / 60);
    const minutes = min % 60;
    return hours + 'ч ' + minutes + 'м';
  };

  return (
    <li className='moviesCard'>
      <a href={props.card.trailerLink}>
        <img
          className='moviesCard__image button-hover'
          src={
            isMobile
              ? `https://api.nomoreparties.co/${card.image.formats.thumbnail.url}`
              : `https://api.nomoreparties.co/${card.image.url}`
          }
          alt={card.nameRU}
        />
      </a>
      <div className='moviesCard__info'>
        <h2 className='moviesCard__title'>{card.nameRU}</h2>
        <button
          className={cardLikeButtonClassName}
          type='button'
          aria-label='like'
        ></button>
      </div>
      <p className='moviesCard__duration'>{getTime(card.duration)}</p>
    </li>
  );
}

export default MoviesCard;
