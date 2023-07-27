import React from 'react';
import { useSelector } from 'react-redux';
import usersSlice from '../reducers/usersReducer';

const User = ({ match }) => {
  const { userId } = match.params;

  const user = useSelector((state) => {
    state.user.find(user => user._id === userId);
  });

  if (!user) {
    return (
      <div>
        <h2>User not Found</h2>
      </div>
    );
  }

  currentValues = [];
  for (const field in user) {
    currentValues.push(
      <li>
        {field}: {user[field]}
      </li>
    );
  }

  return (
    <div>
      <h2>{user.firstname} {user.lastname} Account</h2>
      <section className="clothes">
        <ul>
          {currentValues};
        </ul>
      </section>
      <section>
        Add new clothing will go here.
      </section>
    </div>
  );
}

export default User;