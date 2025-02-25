import React, { useState } from 'react';

function UserForm() {
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { pseudo, email, mot_de_passe: motDePasse };

    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={pseudo} onChange={(e) => setPseudo(e.target.value)} placeholder="Pseudo" required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} placeholder="Mot de passe" required />
      <button type="submit">Créer un utilisateur</button>
    </form>
  );
}

export default UserForm;