import Popup from "./Popup.js";

function PopupWithForm(props) {
  const { text, isOpen, name, title, onClose, onSubmit, children } = props;

  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <h2 className={`popup__title popup__title_type_${name}`}>{title}</h2>
      <form
        onSubmit={onSubmit}
        action="#"
        name={name}
        className={`popup__form popup__form_type_${name}`}
      >
        {children}
        <button className="popup__submit button-hover" type="submit">
          {text}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
