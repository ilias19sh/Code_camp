import React, { useState } from 'react';

function ReportForm() {
  const [description, setDescription] = useState('');
  const [categorie, setCategorie] = useState('');
  const [localisation, setLocalisation] = useState('');
  const [statut, setStatut] = useState('en attente');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const report = { 
      description, 
      categorie, 
      localisation, 
      statut, 
      preuves: [], 
      id_utilisateur: 1 
    };

    try {
      const response = await fetch('http://localhost:3000/signalement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(report),
      });
      
      const data = await response.json();
      console.log(data);
      
      setSuccess(true);
      setDescription('');
      setCategorie('');
      setLocalisation('');
      setStatut('en attente');
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Erreur lors de l'envoi du signalement:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto">
      <h3 className="text-2xl font-bold mb-6">Créer un nouveau signalement</h3>
      
      {success && (
        <div className="notification bg-indigo-900 text-indigo-200 p-4 rounded-lg mb-6">
          Signalement créé avec succès!
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-300 mb-2">Description</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Décrivez le signalement en détail..." 
            required 
            className="w-full p-3 border-2 border-gray-700 rounded-lg bg-gray-800 text-gray-200"
            rows="4"
          />
        </div>
        
        <div>
          <label className="block text-gray-300 mb-2">Catégorie</label>
          <input 
            type="text" 
            value={categorie} 
            onChange={(e) => setCategorie(e.target.value)} 
            placeholder="Ex: Fraude, Pollution, Harcèlement..." 
            required 
          />
        </div>
        
        <div>
          <label className="block text-gray-300 mb-2">Localisation</label>
          <input 
            type="text" 
            value={localisation} 
            onChange={(e) => setLocalisation(e.target.value)} 
            placeholder="Adresse ou lieu de l'incident" 
          />
        </div>
        
        <div>
          <label className="block text-gray-300 mb-2">Statut</label>
          <select 
            value={statut} 
            onChange={(e) => setStatut(e.target.value)}
            className="w-full p-3 border-2 border-gray-700 rounded-lg bg-gray-800 text-gray-200"
          >
            <option value="en attente">En attente</option>
            <option value="examiné">Examiné</option>
            <option value="résolu">Résolu</option>
          </select>
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full py-3"
        >
          <span>{isSubmitting ? 'Envoi en cours...' : 'Créer un signalement'}</span>
        </button>
      </form>
    </div>
  );
}

export default ReportForm;