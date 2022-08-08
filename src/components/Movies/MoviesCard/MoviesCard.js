import React, { useCallback } from 'react';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

import './MoviesCard.css';

function MoviesCard(props) {
  const { card, isMobile, deleteCard, addCard, savedCards, pageSaveMovies } =
    props;

  const currentUser = React.useContext(CurrentUserContext);

  const isLiked = useCallback(() => {
    return savedCards.some(
      (i) =>
        i.movieId === card.movieId ||
        (i.owner === currentUser._id && i.movieId === card.id)
    );
  }, [savedCards]);

  const iconSavedMovies = pageSaveMovies
    ? 'moviesCard__icon_delete'
    : 'moviesCard__icon_active';

  const cardLikeButtonClassName = `moviesCard__icon button-hover ${
    isLiked() && iconSavedMovies
  }`;

  const handleLike = () => {
    if (!isLiked()) {
      addCard(card);
    } else {
      deleteCard(savedCards.find((i) => i.nameRU === card.nameRU));
    }
  };

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
              ? card.image.url
                ? `https://api.nomoreparties.co/${card.image.formats.thumbnail.url}`
                : card.thumbnail
              : card.image.url
              ? `https://api.nomoreparties.co/${card.image.url}`
              : card.image
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
          onClick={handleLike}
        ></button>
      </div>
      <p className='moviesCard__duration'>{getTime(card.duration)}</p>
    </li>
  );
}

export default MoviesCard;
