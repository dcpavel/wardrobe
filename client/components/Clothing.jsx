import React from 'react';
import { setVal, create } from '../reducers/clothesReducer';
import { useDispatch } from 'react-redux';

const Clothing = () => {
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
        htmlFor="type"
      >Type: <span className="red">*</span></label>
      <input
        type="select"
        id="type"
        name="typeId"
        onChange={(e) => setField('type', e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') submit()}}
      ></input>
      <button
        onClick={submit}
      >Create</button>
    </section>
  );
}

export default Clothing;