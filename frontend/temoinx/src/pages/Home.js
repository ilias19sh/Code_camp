import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

function Home() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic3lsdmFpbmdhbHRpZXIiLCJhIjoiY2tsZ3JoZ3kyMWV3OTJ3cDdrcjM0azh0eiJ9.zH81EkDqnNnXFigXe1f7PQ';

    if (map.current) return; 

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [2.3522, 48.8566],
      zoom: 12
    });

    new mapboxgl.Marker()
    .setLngLat([2.3522, 48.8566]) 
    .setPopup(new mapboxgl.Popup().setHTML('<h3>Paris</h3>')) 
    .addTo(map.current); 

    map.current.on('click', (event) => {
      const { lng, lat } = event.lngLat;
      new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .setPopup(new mapboxgl.Popup().setHTML('<h3>Nouveau Marqueur</h3>'))
        .addTo(map.current);
    });

    
    return () => {
      if (map.current) map.current.remove();
    };
  }, []);

  

  return (
    <div>
      
      <section className="hero min-h-[60vh] flex items-center justify-center p-4 sm:p-8">
        <div className="hero-content text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Plateforme de D'aide citoyenne
          </h1>
          <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
            Signalez vos bons plans de manière simple, anonyme et efficace.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/reports/new" 
              className="btn btn-lg bg-white text-blue-600 hover:bg-gray-100 w-full sm:w-auto px-8"
            >
              Faire un signalement
            </Link>
            <Link 
              to="/analytics" 
              className="btn btn-lg btn-outline text-white border-white hover:bg-blue-700 w-full sm:w-auto px-8"
            >
              Voir les statistiques
            </Link>
          </div>
        </div>
      </section>

      
      <section className="section bg-gray-50">
        <div className="container">
          <h2 className="text-center mb-12">Comment ça marche</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Signalez</h3>
              <p className="text-gray-600">
                Remplissez notre formulaire simple pour signaler un problème dans votre communauté.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Nous vérifions</h3>
              <p className="text-gray-600">
                Notre équipe examine chaque signalement pour s'assurer de sa validité.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Résultats</h3>
              <p className="text-gray-600">
                Les données sont analysées et partagées pour aider à résoudre les problèmes signalés.
              </p>
            </div>
          </div>
        </div>
      </section>

     
      <section className="section bg-gray-50">
        <div className="container">
          <h2 className="text-center mb-12">Catégories de signalements</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Fraude</h3>
                <p className="text-gray-600">
                  Signaler des activités frauduleuses, escroqueries ou abus financiers.
                </p>
              </div>
            </div>
            
            <div className="card">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Pollution</h3>
                <p className="text-gray-600">
                  Signaler des problèmes environnementaux, déchets illégaux ou pollution.
                </p>
              </div>
            </div>
            
            <div className="card">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Sécurité</h3>
                <p className="text-gray-600">
                  Signaler des problèmes de sécurité publique ou d'infrastructures dangereuses.
                </p>
              </div>
            </div>
            
            <div className="card">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Autres</h3>
                <p className="text-gray-600">
                  Tout autre problème qui affecte votre communauté et nécessite attention.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div 
        ref={mapContainer} 
        className="w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-lg shadow-lg my-8"
      />
      
    </div>
  );
}

export default Home;