import React from 'react';

function ReportList({ reports }) {
  return (
    <div className="grid gap-4 sm:gap-6">
      {reports.map(report => (
        <div 
          key={report.id} 
          className="bg-white rounded-lg shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">{report.categorie}</h3>
              <p className="text-gray-600 text-sm sm:text-base mb-2">{report.description}</p>
              <p className="text-gray-500 text-sm">
                📍 {report.localisation} • 🕒 {new Date(report.date).toLocaleDateString()}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className={`px-3 py-1 rounded-full text-sm ${
                report.statut ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {report.statut ? 'Actif' : 'Expiré'}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReportList;