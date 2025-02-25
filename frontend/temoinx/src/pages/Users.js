import React, { useState, useEffect } from 'react';
import UserList from '../components/UserList';
import UserForm from '../components/UserForm';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <h2>Liste des utilisateurs</h2>
      <UserList users={users} />
      <UserForm />
    </div>
  );
}

export default Users;