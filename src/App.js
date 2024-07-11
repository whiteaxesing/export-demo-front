import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Button } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ExportersList from './components/exporters/ExportersList';
import ExporterForm from './components/exporters/ExporterForm';
import SearchExporterById from './components/exporters/SearchExporterById';

const Home = ({ exporters, updateExportersList }) => (
  <Container maxWidth="md" style={{ marginTop: '2rem' }}>
    <Typography variant="h4" align="center" gutterBottom>
      Exporters App
    </Typography>
    <Button component={Link} to="/search" variant="contained" color="primary">
      Search by ID
    </Button>
    <div style={{ marginBottom: '2rem' }} />
    <ExporterForm updateExportersList={updateExportersList} />
    <div style={{ marginBottom: '3rem' }} />
    <ExportersList exporters={exporters} updateExportersList={updateExportersList} />
  </Container>
);

const App = () => {
  const [exporters, setExporters] = useState([]);

  useEffect(() => {
    fetchExporters();
  }, []);

  const fetchExporters = () => {
    axios.get('http://localhost:8080/api/exporters')
      .then(response => {
        setExporters(response.data);
      })
      .catch(error => {
        console.error('Error fetching exporters:', error);
      });
  };

  const updateExportersList = () => {
    fetchExporters();
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home exporters={exporters} updateExportersList={updateExportersList} />} />
        <Route path="/search" element={<SearchExporterById />} />
      </Routes>
    </Router>
  );
};

export default App;
