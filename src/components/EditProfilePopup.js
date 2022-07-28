import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const { text, isOpen, onClose, onUpdateUser } = props;

  const currentUser = React.useContext(CurrentUserContext);

  const [description, setDescription] = React.useState("");
  const [name, setName] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      text={text}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_name"
          id="name-input"
          type="text"
          value={name ?? ""}
          name="inputName"
          onChange={handleChangeName}
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="popup__input-error name-input-error"></span>
      </label>
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_about-me"
          id="about-me-input"
          type="text"
          onChange={handleChangeDescription}
          value={description ?? ""}
          placeholder="О себе"
          name="inputAboutMe"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="popup__input-error about-me-input-error"></span>
      </label>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
