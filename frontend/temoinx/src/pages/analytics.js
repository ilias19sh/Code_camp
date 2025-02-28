import React, { useEffect, useState } from 'react'
import { getSignalements, getUsers } from "../api/ApiTemoinX";
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function Analytics() {
    const [reports, setReports] = useState([]);
    const [users, setUsers] = useState([]);
   
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedCity, setSelectedCity] = useState('all');
    const [dateRange, setDateRange] = useState('all');
    const [filteredReports, setFilteredReports] = useState([]);
    const [chartData, setChartData] = useState({
      labels: [],
      datasets: []
    });
    const [topLocations, setTopLocations] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await getSignalements();
          console.log('Données des signalements:', response);
          setReports(response);
          
         
          const typeCount = response.reduce((acc, report) => {
            
            const reportType = report.categorie||  "Non catégorisé";
            acc[reportType] = (acc[reportType] || 0) + 1;
            return acc;
          }, {});

          console.log('Comptage par type:', typeCount);

          
          setChartData({
            labels: Object.keys(typeCount),
            datasets: [{
              label: 'Types de signalements',
              data: Object.values(typeCount),
              backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)',
                'rgba(201, 203, 207, 0.8)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(201, 203, 207, 1)'
              ],
              borderWidth: 1,
            }],
          });

          
          const locationCount = response.reduce((acc, report) => {
            const location = report.localisation || "Non spécifié";
            acc[location] = (acc[location] || 0) + 1;
            return acc;
          }, {});

      
          const sortedLocations = Object.entries(locationCount)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3)
            .map(([location, count]) => ({ location, count }));

          setTopLocations(sortedLocations);
        } catch (error) {
          console.error('Erreur lors de la récupération des signalements:', error);
        }
        try{
            const response = await getUsers();
            console.log('users ok', response);
            setUsers(response)
        }catch (error) {
            console.error('erreur lors de la récuperation des users')
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
            }
            
            filtered = filtered.filter(report => new Date(report.date) >= filterDate);
        }

        setFilteredReports(filtered);
        
        // Mettre à jour les données du graphique avec les données filtrées
        const typeCount = filtered.reduce((acc, report) => {
            const reportType = report.categorie || "Non catégorisé";
            acc[reportType] = (acc[reportType] || 0) + 1;
            return acc;
        }, {});

        setChartData({
            labels: Object.keys(typeCount),
            datasets: [{
                label: 'Types de signalements',
                data: Object.values(typeCount),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)',
                    'rgba(201, 203, 207, 0.8)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(201, 203, 207, 1)'
                ],
                borderWidth: 1,
            }],
        });

    }, [reports, selectedCategory, selectedCity, dateRange]);
    
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: 'rgb(156, 163, 175)',
            font: {
              size: 12
            }
          }
        },
        title: {
          display: true,
          text: 'Répartition des types de signalements',
          color: 'rgb(156, 163, 175)',
          font: {
            size: 16
          }
        }
      }
    };
    

    const uniqueCities = [...new Set(reports.map(report => report.localisation))].filter(Boolean);
    const categories = [
        'Street food incroyable 🍜🔥',
        'Parking gratuit 🚗✅',
        'Endroits Calmes & Relaxants 🏖️',
        'Spot secret 🌅👀',
        'Bons Plans & Réductions 💰'
    ];

    return (
      <div className="py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800 ">
            Statistiques récentes
          </h2>
          
         
          <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {filteredReports.length || 0}
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                Signalements filtrés
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl sm:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                {reports.length > 0 ? ((reports.filter(report => report.statut === false).length / reports.length) * 100).toFixed(0) + '%' : '0%'}
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                Taux de bons plans expirés
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl sm:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {users.length || 0}
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                Membres actifs
              </div>
            </div>
          </div>
          

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-8">
          <div className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                Graphique des types de signalement
              </div>
            <div className="h-[400px] w-full">
              {chartData.labels.length > 0 && (
                <Pie data={chartData} options={options} />
              )}
            </div>
          </div>
          <br/>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="text-2xl font-bold text-orange-500 dark:text-orange-400 mb-2">
                {reports.filter(report => report.categorie === 'Street food incroyable 🍜🔥').length || 0}
              </div>
              <div className="text-gray-600 dark:text-gray-300">Street food incroyable 🍜🔥</div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="text-2xl font-bold text-blue-500 dark:text-blue-400 mb-2">
                {reports.filter(report => report.categorie === 'Parking gratuit 🚗✅').length || 0}
              </div>
              <div className="text-gray-600 dark:text-gray-300">Parking gratuit 🚗✅</div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="text-2xl font-bold text-green-500 dark:text-green-400 mb-2">
                {reports.filter(report => report.categorie === 'Endroits Calmes & Relaxants 🏖️').length || 0}
              </div>
              <div className="text-gray-600 dark:text-gray-300">Endroits Calmes & Relaxants 🏖️</div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="text-2xl font-bold text-purple-500 dark:text-purple-400 mb-2">
                {reports.filter(report => report.categorie === 'Spot secret 🌅👀').length || 0}
              </div>
              <div className="text-gray-600 dark:text-gray-300">Spot secret 🌅👀</div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="text-2xl font-bold text-yellow-500 dark:text-yellow-400 mb-2">
                {reports.filter(report => report.categorie === 'Bons Plans & Réductions 💰').length || 0}
              </div>
              <div className="text-gray-600 dark:text-gray-300">Bons Plans & Réductions 💰</div>
            </div>
          </div>

          
          <div className="mt-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
              Top 3 des localisations les plus actives
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {topLocations.map((loc, index) => (
                <div 
                  key={loc.location}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 relative overflow-hidden"
                >
                 
                  <div className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold
                    ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-600'}`}
                  >
                    #{index + 1}
                  </div>

                  <div className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
                    {loc.location}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    {loc.count} signalement{loc.count > 1 ? 's' : ''}
                  </div>
                  <div className={`text-sm mt-2 
                    ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : 'text-orange-600'}`}
                  >
                    {index === 0 ? '🥇 Or' : index === 1 ? '🥈 Argent' : '🥉 Bronze'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
}

export default Analytics;