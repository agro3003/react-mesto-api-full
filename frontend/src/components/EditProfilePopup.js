import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  };

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm name="type_edit" title="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input id="name" className="popup__input popup__input_type_name" type="text" name="name" placeholder="Имя пользователя"
        minLength="2" maxLength="40" value={name} onChange={handleChangeName} required />
      <span className="popup__error popup__error_name"></span>
      <input id="about" className="popup__input popup__input_type_about" type="text" name="about" placeholder="О себе"
        minLength="2" maxLength="200" value={description} onChange={handleChangeDescription} required />
      <span className="popup__error popup__error_about"></span>
    </PopupWithForm>

  )
}