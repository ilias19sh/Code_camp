import React from 'react';

function ReportList({ reports }) {
  return (
    <div className="container mx-auto">
      {reports.length === 0 ? (
        <p className="text-center text-gray-400">Aucun signalement trouvé</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report, index) => (
            <div 
              key={report.id} 
              className="card" 
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <h3 className="text-xl font-bold mb-3">{report.categorie}</h3>
              <p className="text-gray-300 mb-4">{report.description}</p>
              <div className="flex justify-between items-center">
                <span className={`status-badge ${
                  report.statut === 'en attente' ? 'status-pending' : 
                  report.statut === 'examiné' ? 'status-reviewed' : 
                  'status-resolved'
                }`}>
                  {report.statut}
                </span>
                {report.localisation && (
                  <span className="text-gray-400 text-sm">
                    <i className="fas fa-map-marker-alt mr-1"></i> {report.localisation}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReportList;