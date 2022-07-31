// import React from 'react';
// import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

// function MoviesCard(props) {
//   const { card, onImagePopup, onCardLike, onCardDelete } = props;

//   const currentUser = React.useContext(CurrentUserContext);

//   // const isOwn = card.owner === currentUser._id;
//   const cardDeleteButtonClassName = `card__basket button-hover ${
//     !'isOwn' && 'card__basket_hidden'
//   }`;

//   // const isLiked = card.likes.some((i) => i === currentUser._id);
//   const cardLikeButtonClassName = `card__icon ${
//     'isLiked' && 'card__icon_active'
//   }`;

//   function handleClick() {
//     onImagePopup(card);
//   }

//   function handleLikeClick() {
//     onCardLike(card);
//   }

//   function handleDeleteClick() {
//     onCardDelete(card);
//   }

//   return (
//     <li className='card'>
//       <img
//         className='card__image'
//         // src={card.link}
//         // alt={card.name}
//         onClick={handleClick}
//       />
//       <button
//         className={cardDeleteButtonClassName}
//         type='button'
//         aria-label='basket'
//         onClick={handleDeleteClick}
//       ></button>
//       <div className='card__info'>
//         <h2 className='card__title'>{'card.name'}</h2>
//         <div className='card__likes-info'>
//           <button
//             className={cardLikeButtonClassName}
//             type='button'
//             onClick={handleLikeClick}
//             aria-label='like'
//           ></button>
//           <p className='card__likes-num'>{'card.likes.length'}</p>
//         </div>
//       </div>
//     </li>
//   );
// }

// export default MoviesCard;
