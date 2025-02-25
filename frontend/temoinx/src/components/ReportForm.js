import React, { useState } from 'react';

function ReportForm() {
  const [description, setDescription] = useState('');
  const [categorie, setCategorie] = useState('');
  const [localisation, setLocalisation] = useState('');
  const [statut, setStatut] = useState('en attente');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const report = { description, categorie, localisation, statut, preuves: [], id_utilisateur: 1 }; // Changer l'id_utilisateur en fonction de l'utilisateur connecté

    const response = await fetch('http://localhost:3000/signalement', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(report),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <input type="text" value={categorie} onChange={(e) => setCategorie(e.target.value)} placeholder="Catégorie" required />
      <input type="text" value={localisation} onChange={(e) => setLocalisation(e.target.value)} placeholder="Localisation" />
      <select value={statut} onChange={(e) => setStatut(e.target.value)}>
        <option value="en attente">En attente</option>
        <option value="examiné">Examiné</option>
        <option value="résolu">Résolu</option>
      </select>
      <button type="submit">Créer un signalement</button>
    </form>
  );
}

export default ReportForm;