import React, { useState, useEffect } from 'react';
import ReportList from '../components/ReportList';
import ReportForm from '../components/ReportForm';

function Reports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/signalement')
      .then((res) => res.json())
      .then((data) => setReports(data));
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