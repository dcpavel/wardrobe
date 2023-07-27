import React from 'react';
import { setVal, create } from '../reducers/clothesReducer';
import { useDispatch } from 'react-redux';

export async function loader() {
  
}

export default function Clothing() {
  const dispatch = useDispatch();

  async function submit() {
    dispatch(create());
  }

  function setField(field, value) {
    dispatch(setVal({ field, value }));
  }

  return(
    <Fragment>
      <form 
        onSubmit={(e) => onSubmit(e)}
        encType="multipart/form-data"
        >
        <h1>Create Article of Clothing</h1>
        <label
          htmlFor="type"
        >Clothing Type: <span className="red">*</span></label>
        <input
          type="select"
          id="type"
          name="typeId"
          onChange={(e) => setField('type', e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') submit()}}
        ></input>
        <input
          type="file"
          id="picture"
          name="picture"
        ></input>
        <button
          onClick={submit}
        >Create</button>
      </form>
    </Fragment>
  );
}