import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup(props) {
  const { text, isOpen, onClose, onAddPlace } = props;

  const [cardData, setCardData] = React.useState({ name: "", link: "" });

  const handleChangeInput = (event) => {
    const { value, name } = event.target;
    setCardData({ ...cardData, [name]: value });
  };

  function clearInput() {
    setCardData({ name: "", link: "" });
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace(cardData, clearInput);
  }

  return (
    <PopupWithForm
      name="cards"
      title="Новое место"
      text={text}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_title"
          id="title-input"
          type="text"
          onChange={handleChangeInput}
          value={cardData.name}
          placeholder="Название"
          name="name"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="popup__input-error title-input-error"></span>
      </label>
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_link"
          id="url-input"
          type="url"
          onChange={handleChangeInput}
          value={cardData.link}
          placeholder="Ссылка на картинку"
          name="link"
          required
        />
        <span className="popup__input-error url-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
