import React from 'react';
import { login, setVal } from '../reducers/usersReducer';
import { useSelector, useDispatch } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();
  // const fields = useSelector(state => state.fields);
  const errors = useSelector(state => state.errors);

  function submit() {
    dispatch(login());    
  }

  function setField(field, value) {
    dispatch(setVal({ field, value }));
  }

  return(
    <div>
      <h1>
        Log In
      </h1>          
      <label
        htmlFor="username"
      >Username: <span className="red">*</span></label>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="username"
        onChange={(e) => setField('username', e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') submit() }}
      ></input>    
      <label
        htmlFor="password"
      >Password: <span className="red">*</span></label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="password"
        onChange={(e) => setField('username', e.target.value)}
      ></input>   
      <button
        onClick={submit}
      >Log In</button>
    </div>
  );
};

export default Login;