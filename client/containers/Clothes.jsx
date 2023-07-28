import React from 'react';
import { useLoaderData, redirect, Link, useNavigation, Form } from 'react-router-dom';

export async function loader({ params }) {
  const wardrobeId = params.wardrobeid;
  const res = await fetch(`http://localhost:8080/api/clothes/wardrobe/${wardrobeId}`);
  const clothes = await res.json();
  console.log(clothes);

  return { clothes };
}

export async function action() {
  return redirect(`/clothing/`)
}

export default function Clothes() {
  const { clothes } = useLoaderData();
  console.log(clothes);

  return(
    <>
      <nav key="clothes_list">
        {clothes.length ? (
          <ul>
            {clothes.map((clothing) => (
              <li key={clothing._id}>
                <img src={clothing.thumbnail} />
                <span className='clothing'>{clothing.name}</span>
                <span className='moreInfo'></span>
                <Link to={`/clothing/${clothing._id}`}>Edit</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            <i>No clothing in your wardrobe</i>
            Why don't you add one?
          </p>
        )
        }
      </nav>
      <section key="add_new">
        <Form method="post">
          <button type="submit">
            Add New
          </button>
        </Form>
      </section>
    </>
  );
}