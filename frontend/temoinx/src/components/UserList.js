import React from 'react';

function UserList({ users }) {
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <h3>{user.pseudo}</h3>
          <p>Email: {user.email}</p>
        </div>
      ))}
    </div>
  );
}

export default UserList;