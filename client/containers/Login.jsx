import React from 'react';
import { login, setVal } from '../reducers/usersReducer';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Link, useSubmit, redirect, json } from 'react-router-dom';

export async function action({ request }) {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);

  // error handling goes here?
  const credentials = {
    username: values.username,
    password: values.password
  };
  const res = await fetch(
    `http://localhost:8080/api/users/login/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(credentials)
    }
  )
  let user = await res.json();

  if (res.ok) {
    return redirect(`/wardrobes/${user._id}`);
  } else {
    // we need to do something here
    return null;
  }
}

export default function Login() {
  const submit = useSubmit();

  return(
    <div>
      <h2>
        Log In
      </h2>
      <Form method='post'>
        <label
          htmlFor="username"
        >Username: <span className="red">*</span></label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="username"
          // onKeyDown={(e) => { if (e.key === 'Enter') submit(e.currentTarget.form)}}
        ></input>    
        <label
          htmlFor="password"
        >Password: <span className="red">*</span></label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          // onKeyDown={(e) => { if (e.key === 'Enter') submit(e.currentTarget.form)}}
        ></input>
        <Link to="/signup">Signup</Link>   
        <button
          type="submit"
        >Log In</button>
      </Form>         
    </div>
  );
};