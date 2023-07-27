import React from 'react';
import { setVal, create } from '../reducers/clothingTypesReducer';
import { useDispatch } from 'react-redux';

const ClothingTypes = () => {
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
      >Type name: <span className="red">*</span></label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Shirts..."
        onChange={(e) => setField('name', e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') submit()}}
      ></input>
      <label
        htmlFor="bodyPosition"
      >Body position: <span className="red">*</span></label>
      <select
        id="bodyPosition"
        name="podyPosition"
        placeholder="Torso..."
        onChange={(e) => setField('bodyPosition', e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') submit()}}
      ></select>
      <button
        onClick={submit}
      >Create</button>
    </section>
  );
}

export default ClothingTypes;