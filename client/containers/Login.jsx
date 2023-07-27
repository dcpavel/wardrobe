import React from 'react';
import { login, setVal } from '../reducers/usersReducer';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Link } from 'react-router-dom';

export async function loginAction() {
  const user = await login();
  console.log(user);
  return { user };
}

const Login = () => {
  const dispatch = useDispatch();
  // const fields = useSelector(state => state.fields);
  const errors = useSelector(state => state.errors);

  const loggedIn = useSelector(state => state.loggedIn);
  if (loggedIn) {
    return <Redirect to="/wardrobe" />
  }
  console.log(loggedIn);

  async function submit() {
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
      {/* <Form method='post' action='/api/users/login'> */}
        <label
          htmlFor="username"
        >Username: <span className="red">*</span></label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="username"
          onChange={(e) => setField('username', e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') submit()}}
        ></input>    
        <label
          htmlFor="password"
        >Password: <span className="red">*</span></label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          onChange={(e) => setField('password', e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') submit()}}
        ></input>   
        <button
          onClick={submit}
        >Log In</button>
      {/* </Form>          */}
    </div>
  );
};

export default Login;