import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Snackbar, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SearchExporterById = () => {
  const [exporterId, setExporterId] = useState('');
  const [exporterInfo, setExporterInfo] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleInputChange = (e) => {
    setExporterId(e.target.value);
  };

  const handleSearch = () => {
    axios.get(`http://localhost:8080/api/exporters/${exporterId}`)
      .then(response => {
        setExporterInfo(response.data);
        setError(null);
        setSuccessMessage('Exporter found successfully');
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          setError('Exporter not found');
        } else {
          setError('An error occurred');
        }
        setExporterInfo(null);
        setSuccessMessage(null);
      });
  };

  const handleCloseSnackbar = () => {
    setError(null);
    setSuccessMessage(null);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Search Exporter by ID
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Exporter ID" name="exporterId" value={exporterId} onChange={handleInputChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </Grid>
        {exporterInfo && (
          <>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Identification" value={exporterInfo.identification || ''} InputProps={{ readOnly: true, style: { pointerEvents: 'none' } }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Identification Type" value={exporterInfo.identificationType || ''} InputProps={{ readOnly: true, style: { pointerEvents: 'none' } }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Name" value={exporterInfo.name || ''} InputProps={{ readOnly: true, style: { pointerEvents: 'none' } }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Email" value={exporterInfo.email || ''} InputProps={{ readOnly: true, style: { pointerEvents: 'none' } }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Acceptance Date" type="date" value={exporterInfo.acceptance || ''} InputLabelProps={{ shrink: true }} InputProps={{ readOnly: true, style: { pointerEvents: 'none' } }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Expiration Date" type="date" value={exporterInfo.expiration || ''} InputLabelProps={{ shrink: true }} InputProps={{ readOnly: true, style: { pointerEvents: 'none' } }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Province" type="number" value={exporterInfo.province || ''} InputProps={{ readOnly: true, style: { pointerEvents: 'none' } }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Canton" type="number" value={exporterInfo.canton || ''} InputProps={{ readOnly: true, style: { pointerEvents: 'none' } }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="District" type="number" value={exporterInfo.district || ''} InputProps={{ readOnly: true, style: { pointerEvents: 'none' } }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Sector" value={exporterInfo.sector || ''} InputProps={{ readOnly: true, style: { pointerEvents: 'none' } }} />
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth label="Version" value={exporterInfo.version || '0'} InputProps={{ readOnly: true, style: { pointerEvents: 'none' } }} />
            </Grid>
          </>
        )}


        {(successMessage || error) && (
          <Snackbar open={true} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity={successMessage ? 'success' : 'error'} variant="filled" sx={{ width: '100%' }}>
              {successMessage || error}
            </Alert>
          </Snackbar>
        )}
        <Grid item xs={12}>
          <Link to="/">
            <Button variant="contained">Go Back to Home</Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SearchExporterById;
