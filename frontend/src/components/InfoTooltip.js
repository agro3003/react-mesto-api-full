import React from 'react';
import buttonClose from '../images/profile-Add-Button.svg';
import imageSuccesReg from '../images/succes-regist.svg';
import imageErrorReg from '../images/error-regist.svg';

export default function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isInfoTooltipOpen.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button className="popup__button-close" type="button" onClick={props.onClose}><img className="popup__button-close-img"
          src={buttonClose} alt="кнопка закрыть" /></button>
        <img src={props.isInfoTooltipOpen.succes ? imageSuccesReg : imageErrorReg} className="popup__tooltip-image" alt="попап статуса" />
        <h2 className="popup__tooltip-text">{props.isInfoTooltipOpen.succes ? 'Вы успешно зарегистрировались!' : 'Что то пошло не так! Попробуйте еще раз.'}</h2>
      </div>
    </div>
  );
}


