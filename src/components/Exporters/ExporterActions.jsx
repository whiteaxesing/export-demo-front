import React, { useState } from 'react';
import axios from 'axios';
import { Button, Snackbar, Alert } from '@mui/material';

const ExporterActions = ({ exporterId, initialStatus, updateExporterStatus }) => {
  const [status, setStatus] = useState(initialStatus);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const activateExporter = () => {
    axios.put(`http://localhost:8080/api/exporters/${exporterId}/activate`)
      .then(response => {
        setStatus('T');
        updateExporterStatus(exporterId, 'T');
        setSnackbarMessage('Exporter activated successfully.');
        setSnackbarOpen(true);
      })
      .catch(error => {
        console.error('Error activating exporter:', error);
        setSnackbarMessage('Error activating exporter. Please try again.');
        setSnackbarOpen(true);
      });
  };

  const deactivateExporter = () => {
    axios.put(`http://localhost:8080/api/exporters/${exporterId}/deactivate`)
      .then(response => {
        setStatus('F');
        updateExporterStatus(exporterId, 'F');
        setSnackbarMessage('Exporter deactivated successfully.');
        setSnackbarOpen(true);
      })
      .catch(error => {
        console.error('Error deactivating exporter:', error);
        setSnackbarMessage('Error deactivating exporter. Please try again.');
        setSnackbarOpen(true);
      });
  };

  return (
    <div>
      {status === 'F' ? (
        <Button variant="contained" onClick={activateExporter} style={{ minWidth: '120px' }}>Activate</Button>
      ) : (
        <Button variant="contained" onClick={deactivateExporter} style={{ minWidth: '120px' }}>Deactivate</Button>
      )}

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ExporterActions;
