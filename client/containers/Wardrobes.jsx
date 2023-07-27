import React from 'react';
import { setVal, create } from '../reducers/wardrobesReducer';
import { useDispatch } from 'react-redux';
import { useLoaderData, Form, NavLink, redirect, Link } from 'react-router-dom';

export async function loader({ params }) {
  const res = await fetch(`http://localhost:8080/api/wardrobes/user/${params.userid}`);
  const wardrobes = await res.json();
  return { wardrobes };
}

export async function action({ params }) {
  return redirect(`/wardrobe/edit/`);
}

export default function Wardrobes() {
  const { wardrobes } = useLoaderData();

  return(
    <div>
      <h1>Your Wardrobes</h1>
      <section>
      <nav key="list">
          {wardrobes.length ? (
            <ul>
              {wardrobes.map((wardrobe) => (
                <li key={wardrobes.id}>
                  <Link to={`/clothes/${wardrobe.id}`} >
                    {wardrobe.name}
                  </Link>
                  <Link to={`wardrobe/edit/${wardrobe.id}`}>
                    Edit
                  </Link>
                </li>
              ))}
            </ul>
            ) : (
              <p>
                <i>No Wardrobes</i>
                Why don't you create one?
              </p>
            )
          }
        </nav>
      </section>
      <section id='new'>
        <Form method="post">
          <button type="submit">Create New Wardrobe</button>
        </Form>
      </section>
    </div>
  );
}