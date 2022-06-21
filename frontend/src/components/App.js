import React from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRouter from './ProtectedRoute';
import * as apiAuth from '../utils/apiAuth';

function App() {
  const history = useHistory();

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState({ isOpen: false, succes: false });
  const [userEmail, setUserEmail] = React.useState('');
  const [key, setKey] = React.useState('');

  React.useEffect(() => {
    tokenCheck();
  }, []);

  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (!token) return;    
    return apiAuth.getContent(token)
      .then((res) => {
        setKey(token);
        if (!res) return;
        setLoggedIn(true);
        history.push('/');
        setUserEmail(res.email);
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  }

  function handleLogin(token) {
    if (!token) return;
    localStorage.setItem('token', token);
    setLoggedIn(true);
    history.push('/');
  }

  function handleRegister() {
    history.push('/sing-in');
  }

  function handleLoggedOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setUserEmail('');
    setKey('');
  }

  function handleSingIn(email, password) {
    apiAuth.authorize(email, password)
      .then((data) => {
        setKey(data.token);
        handleLogin(data.token);
        setUserEmail(email);
        return data
      })
      .catch((err) => {
        setIsInfoTooltipOpen({ isOpen: true, succes: false })
        console.log(`Ошибка: ${err}`)
      })
  }

  function handleSingUp(email, password) {
    apiAuth.register(email, password)
      .then((res) => {
        handleRegister()
        setIsInfoTooltipOpen({ isOpen: true, succes: true })
        return res;
      })
      .catch((err) => {
        setIsInfoTooltipOpen({ isOpen: true, succes: false })
        console.log(`Ошибка: ${err}`)
      })
  }

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ state: false, url: '', name: '' });
  const [currentUser, setCurrentUser] = React.useState(
    {
      name: 'Жак-Ив Кусто',
      about: 'Иследователь океана',
      avatar: 'Аватар'
    });
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    if (!loggedIn) return;
    api(key).getInitialInfo()
      .then((data) => {
        return setCurrentUser(data)
      })
      .catch(err => console.log(`Ошибка: ${err}`));
    api(key).getInitialCards()
      .then(data => setCards(data))
      .catch(err => console.log(`Ошибка: ${err}`));
  }, [, loggedIn])

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ state: false, url: '', name: '' });
    setIsInfoTooltipOpen({ isOpen: false, succes: false });
  };

  function handleCardClick(data) {
    setSelectedCard({ state: true, url: data.url, name: data.name });
  };
  function handleUpdateUser(data) {
    api(key).setUserInfo(data)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  };
  function handleUpdateAvatar(data) {
    api(key).setAvatarInfo(data)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  };
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api(key).changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  };
  function handleCardDelete(card) {
    api(key).deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id))
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  };
  function handleAddPlaceSubmit(data) {
    api(key).setCardInfo(data)
      .then((newCards) => {
        setCards([newCards, ...cards])
        closeAllPopups()
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <Header handleLoggedOut={handleLoggedOut} userEmail={userEmail} loggedIn={loggedIn} />
        <Switch>
          <Route path="/sing-in">
            <Login onSingIn={handleSingIn} />
          </Route>
          <Route path="/sing-up">
            <Register onSingUp={handleSingUp} />
          </Route>
          <ProtectedRouter
            component={Main}
            path="/"
            loggedIn={loggedIn}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sing-in" />}
          </Route>
        </Switch>
        <Footer loggedIn={loggedIn} />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <PopupWithForm name="type_delete" title="Вы уверены?" />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          isInfoTooltipOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
