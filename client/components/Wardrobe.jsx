import React from 'react';
import { setVal, create } from '../reducers/wardrobesReducer';
import { useDispatch } from 'react-redux';

export async function loader({ params }) {
  return;
}

const Wardrobe = () => {
  const dispatch = useDispatch();

  async function submit() {
    dispatch(create());
  }

  function setField(field, value) {
    dispatch(setVal({ field, value }));
  }

  return(
    <section>
      <h1>Create Wardrobe</h1>
      <label
        htmlFor="name"
      >Wardrobe name: <span className="red">*</span></label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Summer..."
        onChange={(e) => setField('name', e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') submit()}}
      ></input>
      <button
        onClick={submit}
      >Create</button>
    </section>
  );
}

export default Wardrobe;