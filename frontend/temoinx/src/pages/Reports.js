import React, { useState, useEffect } from 'react';
import ReportList from '../components/ReportList';
import ReportForm from '../components/ReportForm';
import { getSignalements } from '../api/ApiTemoinX';

function Reports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSignalements();
        console.log('signalement ok', response);
        setReports(response)
      } catch (error) {
        console.error('erreur lors de la création du signalement');
      }
    };
    fetchData();
  }, []);
    

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Liste des signalements</h2>
      <ReportList reports={reports} />
      <ReportForm />
    </div>
  );
}

export default Reports;