import React from 'react';
import './Main.css';
import './Promo.css';
import './NavTab.css';

// import Card from './Card.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Main(props) {
  const {
    onEditAvatar,
    onEditProfile,
    onAddPlace,
    onImagePopup,
    onCardLike,
    onCardDelete,
    cards,
  } = props;

  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className='main'>
      <section className='promo main__promo'>
        <h1 className='promo__title'>
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <div className='navTab'>
          <button
            className='navTab__button button-hover'
            onClick={onEditAvatar}
            type='button'
            aria-label='edit'
          >
            О проекте
          </button>
          <button
            className='navTab__button button-hover'
            onClick={onEditProfile}
            type='button'
            aria-label='edit'
          >
            Технологии
          </button>
          <button
            className='navTab__button button-hover'
            onClick={onAddPlace}
            type='button'
            aria-label='add'
          >
            Студент
          </button>
        </div>
      </section>

      <section className='cards main__cards'>
        <ul className='cards__container'>
          {/* {cards.map((card) => (
            <Card
              card={card}
              onImagePopup={onImagePopup}
              key={card._id}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))} */}
        </ul>
      </section>
    </main>
  );
}

export default Main;
