import React from 'react';
import usersSlice from '../reducers/usersReducer';
import { useSelector, useDispatch } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();
  // const fields = useSelector(state => state.fields);
  const errors = useSelector(state => state.errors);

  function submit() {
    dispatch(usersSlice.actions.addUser());    
  }

  function setField(field, value) {
    dispatch(usersSlice.actions.setField({ field, value }));
  }

  return(
    <div>
      <h1>
        Sign Up
      </h1>
      <label
        htmlFor="firstname"
      >First Name: <span className="red">*</span></label>
      <input
        type="text"
        id="firstname"
        name="firstname"
        placeholder="Cher"
        onChange={(e) => setField('firstname', e.target.value)}
      ></input>      
      <label
        htmlFor="lastname"
      >Last Name: </label>
      <input
        type="text"
        id="lastname"
        name="lastname"
        placeholder="Horowitz"
        onChange={(e) => setField('lastname', e.target.value)}
      ></input>    
      <label
        htmlFor="username"
      >Username: <span className="red">*</span></label>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="username"
        onChange={(e) => setField('username', e.target.value)}
      ></input>    
      <label
        htmlFor="password"
      >Password: <span className="red">*</span></label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="password"
      ></input>    
      <label
        htmlFor="email"
      >Email: <span className="red">*</span></label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="as@if.com"
        onChange={(e) => setField('email', e.target.value)}
      ></input>    
      <button
        onClick={submit}
      >Sign Up</button>
    </div>
  );
};

export default Login;