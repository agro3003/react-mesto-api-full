import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup(props) {
  const inputAvatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: inputAvatarRef.current.value,
    });
  }

  return (
    <PopupWithForm name="type_avatar-edit" title="Обновить аватар" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input ref={inputAvatarRef} id="avatar-url" className="popup__input popup__input_type_about" type="url" name="link"
        placeholder="Ссылка на картинку" minLength="2" required />
      <span className="popup__error popup__error_avatar-url"></span>
    </PopupWithForm>
  )
}