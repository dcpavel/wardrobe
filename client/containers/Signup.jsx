import React from 'react';
import usersSlice from '../reducers/usersReducer';
import { useSelector, useDispatch } from 'react-redux';
import { Form, redirect } from 'react-router-dom';

export async function action({ request }) {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);

  // error handling goes here?
  const res = await fetch(
    `http://localhost:8080/api/users/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(values)
    }
  )
  let user = await res.json();
  console.log(user);

  if (res.ok) {
    return redirect(`/login`);
  } else {
    // we need to do something here
    return null;
  }
}

const Signup = () => {
  return(
    <div>
      <h1>
        Sign Up
      </h1>
      <Form method="POST">
      <label
        htmlFor="firstname"
      >First Name: <span className="red">*</span></label>
      <input
        type="text"
        id="firstname"
        name="firstname"
        placeholder="Cher"
        // onChange={(e) => setField('firstname', e.target.value)}
      ></input>      
      <label
        htmlFor="lastname"
      >Last Name: </label>
      <input
        type="text"
        id="lastname"
        name="lastname"
        placeholder="Horowitz"
        // onChange={(e) => setField('lastname', e.target.value)}
      ></input>    
      <label
        htmlFor="username"
      >Username: <span className="red">*</span></label>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="username"
        // onChange={(e) => setField('username', e.target.value)}
      ></input>    
      <label
        htmlFor="password"
      >Password: <span className="red">*</span></label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="password"
        // onChange={(e) => setField('username', e.target.value)}
      ></input>    
      <label
        htmlFor="email"
      >Email: <span className="red">*</span></label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="as@if.com"
        // onChange={(e) => setField('email', e.target.value)}
      ></input>    
      <button
        type="submit"
      >Sign Up</button>
      </Form>
    </div>
  );
};

export default Signup;