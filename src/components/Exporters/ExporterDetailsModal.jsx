import React from 'react';
import { Modal, Box, Typography, Grid, TextField, Button } from '@mui/material';

const ExporterDetailsModal = ({ open, handleClose, exporterInfo }) => {
  if (!exporterInfo) return null;

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Exporter Details
        </Typography>
        <div style={{ marginBottom: '2rem' }} />
        <Grid container spacing={2}>
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
            <TextField fullWidth label="Version" value={exporterInfo.version || ''} InputProps={{ readOnly: true, style: { pointerEvents: 'none' } }} />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleClose}>Close</Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ExporterDetailsModal;
