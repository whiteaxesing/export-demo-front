import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

const ExporterActions = ({ exporterId, initialStatus, updateExporterStatus }) => {
  const [status, setStatus] = useState(initialStatus);

  const activateExporter = () => {
    axios.put(`http://localhost:8080/api/exporters/${exporterId}/activate`)
      .then(response => {
        setStatus('T');
        updateExporterStatus(exporterId, 'T');
      })
      .catch(error => {
        console.error('Error activating exporter:', error);
      });
  };

  const deactivateExporter = () => {
    axios.put(`http://localhost:8080/api/exporters/${exporterId}/deactivate`)
      .then(response => {
        setStatus('F');
        updateExporterStatus(exporterId, 'F');
      })
      .catch(error => {
        console.error('Error deactivating exporter:', error);
      });
  };

  return (
    <div >
      {status === 'F' ? (
        <Button variant="contained"  onClick={activateExporter} style={{ minWidth: '120px' }}>Activate</Button>
      ) : (
        <Button variant="contained" onClick={deactivateExporter} style={{ minWidth: '120px' }}>Deactivate</Button>
      )}
    </div>
  );
};

export default ExporterActions;
