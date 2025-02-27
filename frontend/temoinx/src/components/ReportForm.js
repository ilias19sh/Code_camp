import React, { useState } from 'react';
import { PostSignalement } from '../api/ApiTemoinX';
import mapboxClient from '@mapbox/mapbox-sdk';
import mapboxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

const client = mapboxClient({ accessToken: 'pk.eyJ1Ijoic3lsdmFpbmdhbHRpZXIiLCJhIjoiY2tsZ3JoZ3kyMWV3OTJ3cDdrcjM0azh0eiJ9.zH81EkDqnNnXFigXe1f7PQ' });
const geocodingService = mapboxGeocoding(client);

function ReportForm({ onLocationAdded }) {
  const [description, setDescription] = useState('');
  const [categorie, setCategorie] = useState('');
  const [localisation, setLocalisation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const id_utilisateur = localStorage.getItem('utilisateur_id');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Géocodage de la localisation
    const geocodeResponse = await geocodingService
      .forwardGeocode({
        query: localisation,
        limit: 1
      })
      .send();

    const coordinates = geocodeResponse.body.features[0].geometry.coordinates;

    await PostSignalement({
      description: description,
      categorie: categorie,
      localisation: localisation,
      id_utilisateur: id_utilisateur,
    });

    // Appel de la fonction pour ajouter le marqueur
    //onLocationAdded(coordinates);

    alert('Signalement créé avec succès !');
    setSuccess(true);
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
          <select 
            value={categorie} 
            onChange={(e) => setCategorie(e.target.value)} 
            required 
            className="w-full p-3 border-2 border-gray-700 rounded-lg bg-gray-800 text-gray-200"
          >
            <option value="" disabled>Sélectionnez une catégorie</option>
            <option value="Parking gratuit 🚗✅">Parking gratuit 🚗✅</option>
            <option value="Endroits Calmes & Relaxants 🏖️">Endroits Calmes & Relaxants 🏖️ </option>
            <option value="Street food incroyable 🍜🔥">Street food incroyable 🍜🔥</option>
            <option value="Spot secret 🌅👀">Spot secret 🌅👀</option>
            <option value="Bons Plans & Réductions 💰">Bons Plans & Réductions 💰</option>
          </select>
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