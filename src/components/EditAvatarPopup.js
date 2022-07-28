import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup(props) {
  const { text, isOpen, onClose, onUpdateAvatar } = props;
  const textInput = React.useRef({});

  function clearInput() {
    textInput.current.value = "";
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar(
      {
        avatar: textInput.current.value,
      },
      clearInput
    );
  }

  return (
    <PopupWithForm
      name="profile-avatar"
      title="Обновить аватар"
      text={text}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label popup__label_type_profile-avatar">
        <input
          className="popup__input popup__input_type_link"
          id="url-input-avatar"
          type="url"
          ref={textInput}
          placeholder="Ссылка на картинку"
          name="link"
          required
        />
        <span className="popup__input-error url-input-avatar-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
