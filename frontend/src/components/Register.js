import React from 'react';
import { Link } from 'react-router-dom';

export default function Register(props) {
  const [state, setState] = React.useState({
    email: "",
    password: ""
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setState(old => ({
      ...old,
      [name]: value
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { password, email } = state;
    return props.onSingUp(email, password);
  }

  return (
    <section className='sing'>
      <h2 className='sing__title'>Регистрация</h2>
      <form onSubmit={handleSubmit} className='sing__form'>
        <input name="email" value={state.email} type="email" onChange={handleChange} className='sing__input' placeholder='Email' required />
        <input name="password" value={state.password} type="password" onChange={handleChange} className='sing__input' placeholder='Пароль' minLength="4" maxLength="32" required />
        <button type="submit" className='sing__button'>Зарегистрироваться</button>
      </form>
      <div className='sing__sign-in'>
        <p>Уже зарегистрированны? </p>
        <Link to="sing-in">&nbsp;Войти</Link>
      </div>
    </section>
  );
}