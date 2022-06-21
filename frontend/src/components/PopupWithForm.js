import buttonClose from '../images/profile-Add-Button.svg';

export default function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button className="popup__button-close" type="button" onClick={props.onClose}><img className="popup__button-close-img"
          src={buttonClose} alt="кнопка закрыть" /></button>
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" name={props.name} onSubmit={props.onSubmit} >
          {props.children}
          <button className="popup__button" type="submit">Сохранить</button>
        </form>
      </div>
    </div>
  );
}