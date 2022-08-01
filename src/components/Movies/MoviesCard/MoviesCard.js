import React from 'react';

import './MoviesCard.css';

import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

function MoviesCard(props) {
  const { card, key, onCardLike, onCardDelete } = props;

  // const currentUser = React.useContext(CurrentUserContext);

  // const isOwn = card.owner === currentUser._id;
  // const cardDeleteButtonClassName = `card__basket button-hover ${
  //   !'isOwn' && 'card__basket_hidden'
  // }`;

  // const isLiked = card.likes.some((i) => i === currentUser._id);
  const isLiked = false;
  const cardLikeButtonClassName = `moviesCard__icon button-hover ${
    isLiked && 'moviesCard__icon_active'
  }`;

  const getTime = (min) => {
    const hours = Math.trunc(min / 60);
    const minutes = min % 60;
    return hours + 'ч ' + minutes + 'м';
  };

  // function handleClick() {
  //   onImagePopup(card);
  // }

  // function handleLikeClick() {
  //   onCardLike(card);
  // }

  // function handleDeleteClick() {
  //   onCardDelete(card);
  // }

  return (
    <li className='moviesCard'>
      <a href={props.card.trailerLink}>
        <img
          className='moviesCard__image button-hover'
          src={`https://api.nomoreparties.co/${card.image.url}`}
          alt={card.nameRU}
          // onClick={handleClick}
        />
      </a>
      <div className='moviesCard__info'>
        <h2 className='moviesCard__title'>{card.nameRU}</h2>
        <button
          className={cardLikeButtonClassName}
          type='button'
          // onClick={handleLikeClick}
          aria-label='like'
        ></button>
      </div>
      <p className='moviesCard__duration'>{getTime(card.duration)}</p>
    </li>
  );
}

export default MoviesCard;
