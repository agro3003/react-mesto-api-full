import avatar from '../images/header-logo.svg';
import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';


export default function Header(props) {
  const [state, setState] = React.useState(false);
  
  function toggleState() {
    if (!state) {
      return setState(true);
    }
    setState(false);
  }

  const loggedOut = () => {
    props.handleLoggedOut();
    setState(false);
  }
  return (
    <header className='header  body__content body__content_position_header'>
      <img className="header__logo" src={avatar} alt="Логотип Место" />
      <Switch>
        <Route path="/sing-up">
          <Link className={`header__link ${!props.loggedIn && 'header__link_logged-out'}`} to="sing-in">Войти</Link >
        </Route>
        <Route path="/sing-in">
          <Link className={`header__link ${!props.loggedIn && 'header__link_logged-out'}`} to="sing-up">Регистрация</Link >
        </Route>
        <Route path="/">
          <div className={`header__content-block ${state && 'header_content-block_active'}`}>
            <p className="header__email">{props.userEmail}</p>
            <Link className="header__link" to="sing-in" onClick={loggedOut}>Выход</Link >
          </div>
          <button className={`header__toggle-button ${state && 'header__toggle-button_close'}`} onClick={toggleState}></button>
        </Route>
      </Switch>
    </header>
  );
}