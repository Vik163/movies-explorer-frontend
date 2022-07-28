import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

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
    <main className="content">
      <section className="profile content__profile">
        <div className="profile__container">
          <div className="profile__avatar-container">
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="аватар"
            />
            <button
              className="profile__avatar-button button-hover"
              onClick={onEditAvatar}
              type="button"
              aria-label="edit"
            ></button>
          </div>
          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              className="profile__edit-button button-hover"
              onClick={onEditProfile}
              type="button"
              aria-label="edit"
            ></button>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button button-hover"
          onClick={onAddPlace}
          type="button"
          aria-label="add"
        ></button>
      </section>

      <section className="cards content__cards">
        <ul className="cards__container">
          {cards.map((card) => (
            <Card
              card={card}
              onImagePopup={onImagePopup}
              key={card._id}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
