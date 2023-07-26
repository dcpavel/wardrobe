import React from 'react';
import { useSelector } from 'react-redux';

const wardrobe = ({ match }) => {
  const { wardrobeId } = match.params;

  const wardrobe = useSelector((state) => {
    state.wardrobe.find(wardrobe => wardrobe._id === wardrobeId);
  });

  if (!wardrobe) {
    return (
      <div>
        <h2>Wardrobe not Found</h2>
      </div>
    );
  }

  return (
    <div>
      <h2>{wardrobe.name}</h2>
      <section className="clothes">
        The clothes found will go here.
      </section>
      <section>
        Add new clothing will go here.
      </section>
    </div>
  );
}