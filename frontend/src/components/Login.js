import React from 'react';

export default function Login(props) {
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

  function handleSubmit(evt) {
    evt.preventDefault();
    const { email, password } = state;

    if (!email || !password) {
      return;
    }
    return props.onSingIn(email, password)
  };

  return (
    <section className='sing'>
      <h2 className='sing__title'>Вход</h2>
      <form onSubmit={handleSubmit} className='sing__form'>
        <input name="email" value={state.email} type="email" onChange={handleChange} className='sing__input' placeholder='Email' required />
        <input name="password" value={state.password} type="password" onChange={handleChange} className='sing__input' minLength="4" maxLength="32" placeholder='Password' required />
        <button type="submit" className='sing__button'>Войти</button>
      </form>
    </section>
  );
}