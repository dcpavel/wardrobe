import React from 'react';
import { useLoaderData, Form, useNavigation, redirect } from 'react-router-dom';

export async function loader({ params }) {
  let clothing =  [];
  const clothingId = (params.id) ? params.id : '';
  const res = await fetch(`http://localhost:8080/api/clothes/${clothingId}`);
  clothing = await res.json()

  return { clothing };
}

export async function action({ request }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  console.log(updates);
  
  const res = await fetch(
    `http://localhost:8080/api/clothes/${updates.id}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(updates)
    }
  );

  // do something with the response
  if (res.ok) {
    return redirect(`/clothes/${updates.wardrobeid}`);
  }
  return null;
}

export default function Clothing() {
  const { clothing } = useLoaderData();
  const navigate = useNavigation();
  console.log(clothing);

  return (
    <>
      <h1>{clothing.name ? "Edit" : "Add"} Clothing</h1>
      <Form method="POST">
        <label htmlFor='type'>Choose what type of clothing</label>        
        <select
          type="select"
          name='type'
          defaultValue={clothing.typeid}
        >
          {clothing.types.map((type) => (
            <option value={type._id}>{type.name}</option>
          ))};
        </select>
        <label htmlFor='wardrobes'>Choose which wardrobe</label>
        <select 
          type="select"
          name="wardrobe"
          defaultValue={clothing.wardrobeid}
        >
          {clothing.wardrobes.map((wardrobe) => (
            <option value={wardrobe._id}>{wardrobe.name}</option>
          ))};
        </select>
        <label htmlFor='name'>Name</label>
        <input
          type="text"
          name="name"
          defaultValue={clothing.name}
        ></input>
        <label htmlFor="colors">Please enter colors separated by spaces (e.g. blue gray should be blue-gray)</label>
        <input
          type="textbox"
          name="colors"
          defaultValue={clothing.colors}
        ></input>
        <label htmlFor='patterns'>Please enter the patterns separated by spaces</label>
        <input
          type="textbox"
          name='patterns'
          defaultValue={clothing.patterns}
        ></input>
        <label htmlFor='fabric'>Please enter the fabrics separated by spaces</label>
        <input
          type="textbox"
          name='fabrics'
          defaultValue={clothing.patterns}
        ></input>
        <input
          type="hidden"
          name='id'
          defaultValue={clothing._id}
        ></input>
        {/* <label htmlFor='picture'>Please choose a picture</label>
        {(clothing.picture) ? (<img src={`html://localhost:8080/picture/${picture}`} />) : ''}
        <input
          type='file'
          name='picture'
        ></input> */}
        <span className="buttons">
          <button type="submit">
            {(clothing.name) ? 'Save' : 'Add'}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
          >Back</button>
        </span>
      </Form>
    </>
  );
}