import React, { useCallback } from 'react';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

import './MoviesCard.css';

function MoviesCard(props) {
  const {
    card,
    isMobile,
    deleteCard,
    addCard,
    savedCards,
    initialSavedCards,
    pageSaveMovies,
  } = props;

  const currentUser = React.useContext(CurrentUserContext);

  // Состояние лайка карты -----------------
  const isLiked = useCallback(() => {
    return initialSavedCards.some(
      (i) =>
        i.movieId === card.movieId ||
        (i.owner === currentUser._id && i.movieId === card.id)
    );
  }, [savedCards, pageSaveMovies]);

  // Установка иконок сохраненным фильмам -------------------------
  const iconSavedMovies = pageSaveMovies
    ? 'moviesCard__icon_delete'
    : 'moviesCard__icon_active';

  const cardLikeButtonClassName = `moviesCard__icon button-hover ${
    isLiked() && iconSavedMovies
  }`;
  // --------------------------------------------------------------

  // Добавление и удаление карты -------------------------------
  const handleLike = () => {
    if (!isLiked()) {
      addCard(card);
    } else {
      deleteCard(savedCards.find((i) => i.nameRU === card.nameRU));
    }
  };

  // Перевод времени в часы и минуты ----------
  const getTime = (min) => {
    const hours = Math.trunc(min / 60);
    const minutes = min % 60;
    return hours + 'ч ' + minutes + 'м';
  };

  return (
    <li className='moviesCard'>
      <a href={props.card.trailerLink}>
        {/* Оптимизация изображения*/}
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
