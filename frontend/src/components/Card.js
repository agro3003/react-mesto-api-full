import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.data.owner === currentUser._id;
  const cardDeleteButtonClassName = (
    `element__delete ${isOwn && 'element__delete_unhidden'}`
  );
  const isLiked = props.data.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = (
    `element__heart ${isLiked && 'element__heart_active'}`
  );

  function handleClick() {
    props.onCardClick({ url: props.data.link, name: props.data.name });
  };
  function handleLikeClick() { props.onCardLike(props.data) };
  function handleDeleteClick() { props.onCardDelete(props.data) };

  return (
    <div className="element">
      <img className="element__foto" onClick={handleClick} src={props.data.link} alt={props.data.name} />
      <button type="button" onClick={handleDeleteClick} className={cardDeleteButtonClassName} />
      <div className="element__place-name-heart">
        <h2 className="element__name">{props.data.name}</h2>
        <div className="element__heart-block">
          <button type="button" onClick={handleLikeClick} className={cardLikeButtonClassName} />
          <h3 className="element__heart-counter">{props.data.likes.length}</h3>
        </div>
      </div>
    </div>
  );
}