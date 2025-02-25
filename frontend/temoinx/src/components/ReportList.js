import React from 'react';

function ReportList({ reports }) {
  return (
    <div>
      {reports.map((report) => (
        <div key={report.id}>
          <h3>{report.categorie}</h3>
          <p>{report.description}</p>
          <p>Statut: {report.statut}</p>
        </div>
      ))}
    </div>
  );
}

export default ReportList;