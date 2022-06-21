import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup(props) {
  const [inputPlaceName, setInputPlaceName] = React.useState("");
  const [inputPlaceUrl, setInputPlaceUrl] = React.useState("");

  React.useEffect(() => {
    setInputPlaceName("")
    setInputPlaceUrl("")
  }, [props.isOpen]);

  function handleChangeInputPlaceName(e) {
    setInputPlaceName(e.target.value);
  };
  function handleChangeInputPlaceUrl(e) {
    setInputPlaceUrl(e.target.value);
  };
  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: inputPlaceName ,
      link: inputPlaceUrl ,
    })
  };

  return (
    <PopupWithForm name="type_add" title="Новое место" onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose}>
      <input  id="place-name" className="popup__input popup__input_type_name" type="text" name="name"
        placeholder="Название" minLength="2" maxLength="30" value={inputPlaceName} onChange={handleChangeInputPlaceName} required />
      <span className="popup__error popup__error_place-name"></span>
      <input  id="place-url" className="popup__input popup__input_type_about" type="url" name="link"
        placeholder="Ссылка на картинку" minLength="2" value={inputPlaceUrl} onChange={handleChangeInputPlaceUrl} required />
      <span className="popup__error popup__error_place-url"></span>
    </PopupWithForm>
  )
}