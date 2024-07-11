import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ExporterActions from './ExporterActions';
import ExporterDetailsModal from './ExporterDetailsModal';

const ExportersList = ({ exporters, updateExportersList }) => {
  const [selectedExporter, setSelectedExporter] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const updateExporterStatus = (exporterId, newStatus) => {
    updateExportersList(exporterId, newStatus);
  };

  const handleOpenModal = (exporter) => {
    setSelectedExporter(exporter);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedExporter(null);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exporters.map((exporter) => (
              <TableRow key={exporter.identification}>
                <TableCell>{exporter.identification}</TableCell>
                <TableCell>{exporter.name}</TableCell>
                <TableCell>{exporter.email}</TableCell>
                <TableCell>{exporter.status === 'T' ? 'True' : 'False'}</TableCell>
                <TableCell>
                  <Box display="flex" justifyContent="space-between">
                    <IconButton color="primary" onClick={() => handleOpenModal(exporter)}>
                      <VisibilityIcon />
                    </IconButton>
                    <ExporterActions
                      exporterId={exporter.identification}
                      initialStatus={exporter.status}
                      updateExporterStatus={updateExporterStatus}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ExporterDetailsModal open={modalOpen} handleClose={handleCloseModal} exporterInfo={selectedExporter} />
    </>
  );
};

export default ExportersList;
