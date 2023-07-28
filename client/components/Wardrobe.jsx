import React from 'react';
import { Form, useLoaderData, redirect, useNavigate } from 'react-router-dom';

export async function loader({ params }) {
  let wardrobe = { userid: params.id };
  
  if (params.id) {  
    const res = await fetch(`http://localhost:8080/api/wardrobes/${params.id}`);
    wardrobe = await res.json();
  }

  return { wardrobe };
}

export async function action({ request }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  console.log(updates);

  const res = await fetch(
    `http://localhost:8080/api/wardrobes/${updates._id}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(updates)
    }
  )

  // do something with the response
  if (res.ok) {
    return redirect(`/wardrobes/${updates.userid}`);
  }
  return null;
}

export default function Wardrobe() {
  const { wardrobe } = useLoaderData();
  const navigate = useNavigate();

  return(
    <Form method="post">
      <h1>
        { (wardrobe.name) ? `Update ${wardrobe.name}` : 'Create' } Wardrobe</h1>
      <label
        htmlFor="name"
      >Wardrobe name: <span className="red">*</span></label>
      <input
        type="text"
        id="name"
        name="name"
        defaultValue={wardrobe.name}
      ></input>
      <input
        type="hidden"
        name="_id"
        defaultValue={wardrobe._id}
      ></input>
      <input
        type="hidden"
        name="userid"
        value={wardrobe.userid}
      ></input>
      <button type="submit" >Save Wardrobe</button>
      <button
        type="button"
        onClick={() => navigate(-1)}
      >Back</button>
    </Form>
  );
}