import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Snackbar, Alert } from '@mui/material';

const ExporterForm = ({ updateExportersList }) => {
  const [exporterData, setExporterData] = useState({
    identification: '',
    identificationType: '',
    name: '',
    acceptance: '',
    expiration: '',
    province: '',
    canton: '',
    district: '',
    email: '',
    sector: '',
    status: 'T'
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'province' || name === 'canton' || name === 'district') {
      if (value.length > 2) return; 
    } else if (name === 'sector') {
      if (value.length > 4) return;
    }

    setExporterData({ ...exporterData, [name]: value });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = () => {
    const {
      identification,
      identificationType,
      name,
      acceptance,
      expiration,
      province,
      canton,
      district,
      email,
      sector
    } = exporterData;

    if (!identification || !identificationType || !name || !acceptance || !expiration || !province || !canton || !district || !email || !sector) {
      setErrorMessage('Please fill out all fields.');
      setSnackbarOpen(true);
      return;
    }

    axios.post('http://localhost:8080/api/exporters', exporterData)
      .then(response => {
        console.log('Exporter created:', response.data);
        setSuccessMessage('Exporter created successfully.');
        setSnackbarOpen(true);
        updateExportersList();
        setExporterData({
          identification: '',
          identificationType: '',
          name: '',
          acceptance: '',
          expiration: '',
          province: '',
          canton: '',
          district: '',
          email: '',
          sector: '',
          status: 'T'
        });
      })
      .catch(error => {
        console.error('Error creating exporter:', error);
        setErrorMessage('Error creating exporter. Please try again.');
        setSnackbarOpen(true);
      });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Identification"
          name="identification"
          value={exporterData.identification}
          onChange={handleInputChange}
          inputProps={{
            maxLength: 35,
            pattern: "[A-Za-z0-9]+",
          }}
          helperText="Alphanumeric, max 35 characters"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Identification Type"
          name="identificationType"
          value={exporterData.identificationType}
          onChange={handleInputChange}
          inputProps={{
            maxLength: 1,
            pattern: "[A-Za-z0-9]+",
          }}
          helperText="Alphanumeric, max 1 character"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={exporterData.name}
          onChange={handleInputChange}
          inputProps={{
            maxLength: 100,
          }}
          helperText="Max 100 characters"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={exporterData.email}
          onChange={handleInputChange}
          inputProps={{
            maxLength: 100,
          }}
          helperText="Max 100 characters"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Acceptance Date"
          name="acceptance"
          type="date"
          value={exporterData.acceptance}
          onChange={handleInputChange}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Expiration Date"
          name="expiration"
          type="date"
          value={exporterData.expiration}
          onChange={handleInputChange}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Province"
          name="province"
          type="number"
          value={exporterData.province}
          onChange={handleInputChange}
          inputProps={{
            maxLength: 2,
          }}
          helperText="Max 2 digits"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Canton"
          name="canton"
          type="number"
          value={exporterData.canton}
          onChange={handleInputChange}
          inputProps={{
            maxLength: 2,
          }}
          helperText="Max 2 digits"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="District"
          name="district"
          type="number"
          value={exporterData.district}
          onChange={handleInputChange}
          inputProps={{
            maxLength: 2,
          }}
          helperText="Max 2 digits"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Sector"
          name="sector"
          value={exporterData.sector}
          onChange={handleInputChange}
          inputProps={{
            maxLength: 4,
          }}
          helperText="Max 4 characters"
        />
      </Grid>
      <Grid item xs={12} style={{ textAlign: 'right' }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Create Exporter
        </Button>
      </Grid>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={successMessage ? 'success' : 'error'} variant="filled" sx={{ width: '100%' }}>
          {successMessage || errorMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default ExporterForm;
