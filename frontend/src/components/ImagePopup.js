import buttonClose from '../images/profile-Add-Button.svg';

export default function ImagePopup(props) {
  return (
    <div className={`popup popup_type_image ${props.card.state && 'popup_opened'}`}>
      <div className="popup__container-image">
        <button className="popup__button-close" type="button" onClick={props.onClose}>
          <img className="popup__button-close-img" src={buttonClose} alt="кнопка закрыть" />
        </button>
        <img className="popup__foto" src={props.card.url} alt={props.card.name} />
        <h2 className="popup__name">{props.card.name}</h2>
      </div>
    </div>
  );
}