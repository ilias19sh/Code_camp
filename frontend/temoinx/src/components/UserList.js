import React from 'react';

function UserList({ users }) {
  return (
    <div className="container mx-auto p-4">
      {users.map((user) => (
        <div key={user.id} className="bg-white shadow-md rounded p-4 mb-4">
          <h3 className="text-lg font-bold text-gray-800">{user.pseudo}</h3>
          <p className="text-gray-600">Email: {user.email}</p>
        </div>
      ))}
    </div>
  );
}

export default UserList;