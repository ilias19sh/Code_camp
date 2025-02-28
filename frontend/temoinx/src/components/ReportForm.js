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
    <form className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <h3 className="text-xl sm:text-2xl font-bold mb-4">Nouveau signalement</h3>
      
      <div className="grid gap-4 sm:gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Catégorie</label>
            <select className="w-full p-2 border rounded-lg">
              {/* ... options ... */}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Localisation</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded-lg"
              placeholder="Entrez une adresse"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Décrivez le signalement en détail..." 
            required 
            className="w-full p-3 border-2 border-gray-700 rounded-lg bg-gray-800 text-gray-200"
            rows="4"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full py-3"
        >
          <span>{isSubmitting ? 'Envoi en cours...' : 'Créer un signalement'}</span>
        </button>
      </div>
    </form>
  );
}

export default ReportForm;