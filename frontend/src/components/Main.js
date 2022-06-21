import React from 'react';
import Card from './Card';
import profileEditButton from '../images/profile-Edit-Button.svg';
import profileAddButton from '../images/profile-Add-Button.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile body__content body__content_position_profile">
        <div className="profile__avatar-info">
          <div>
            <button className="profile__button-edit-avatar profile__avatar" onClick={props.onEditAvatar} >
              <img className="profile__avatar" alt="аватар" src={currentUser.avatar} />
            </button>
          </div>
          <div className="profile__info">
            <div className="profile__name-button-edit">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button className="profile__button-edit" type="button" onClick={props.onEditProfile}>
                <img className="profile__button-edit-image " src={profileEditButton} alt="кнопка изменить" />
              </button>
            </div>
            <p className="profile__about">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}>
          <img className="profile__button-add-image " src={profileAddButton} alt="кнонка добавить" />
        </button>
      </section>
      <section className="body__content body__content_position_elements">
        <div className="elements">
          {props.cards.map((item) => <Card onCardDelete={props.onCardDelete} onCardLike={props.onCardLike} key={item._id} data={item} onCardClick={props.onCardClick} />)}
        </div>
      </section>
    </main>
  );
}