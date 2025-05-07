import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MedicalRecords from './pages/MedicalRecords';
import PatientManagement from './pages/PatientManagement';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/patients" element={<PatientManagement />} />
          <Route path="/medical-records" element={<MedicalRecords />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
