import React, { useState, useEffect } from 'react';
import ReportList from '../components/ReportList';
import ReportForm from '../components/ReportForm';
import { getSignalements } from '../api/ApiTemoinX';

function Reports() {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSignalements();
        console.log('signalement ok', response);
        setReports(response);
        setFilteredReports(response);
      } catch (error) {
        console.error('erreur lors de la création du signalement');
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...reports];

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(report => report.categorie === selectedCategory);
    }

    if (selectedCity !== 'all') {
      filtered = filtered.filter(report => report.localisation === selectedCity);
    }

    if (dateRange !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch(dateRange) {
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
        default:
          break;
      }
      
      filtered = filtered.filter(report => new Date(report.date) >= filterDate);
    }

    setFilteredReports(filtered);
  }, [reports, selectedCategory, selectedCity, dateRange]);

  const uniqueCities = [...new Set(reports.map(report => report.localisation))].filter(Boolean);
  const categories = [
    'Street food incroyable 🍜🔥',
    'Parking gratuit 🚗✅',
    'Endroits Calmes & Relaxants 🏖️',
    'Spot secret 🌅👀',
    'Bons Plans & Réductions 💰'
  ];

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Liste des signalements</h2>
      
      {/* Filtres */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <select 
          className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">Toutes les catégories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <select 
          className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="all">Toutes les villes</option>
          {uniqueCities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        <select 
          className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
        >
          <option value="all">Toute la période</option>
          <option value="week">7 derniers jours</option>
          <option value="month">30 derniers jours</option>
          <option value="year">12 derniers mois</option>
        </select>
      </div>

      {/* Afficher le nombre de résultats filtrés */}
      <div className="mb-4 text-gray-600">
        {filteredReports.length} signalement(s) trouvé(s)
      </div>

      <ReportList reports={filteredReports} />
      <ReportForm />
    </div>
  );
}

export default Reports;