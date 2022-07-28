import Popup from "./Popup.js";

function ImagePopup(props) {
  const { card, name, onClose } = props;
  return (
    <Popup isOpen={card.link} name={name} onClose={onClose}>
      <img className="popup__image" src={card.link} alt={card.name} />
      <p className="popup__caption">{card.name}</p>
    </Popup>
  );
}

export default ImagePopup;
