import React, { useEffect, useState } from 'react'
import { getSignalements, getUsers } from "../api/ApiTemoinX";

function Analytics() {
    const [reports, setReports] = useState([]);
    const [users, setUsers] = useState([])

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await getSignalements();
          console.log('signalement ok', response);
          setReports(response)
        } catch (error) {
          console.error('erreur lors de la récuperation des signalement');
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
    
    return (
      <div className="py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800 dark:text-white">
            Statistiques récentes
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {reports.length || 0}
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                Signalements ce mois
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl sm:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                {reports.length > 0 ? ((reports.filter(report => report.statut === false).length / reports.length) * 100).toFixed(0) + '%' : '0%'}
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                Taux de résolution
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
        </div>
      </div>
    );
}

export default Analytics;