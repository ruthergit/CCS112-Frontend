import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/patients';

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({ first_name: '', last_name: '' });
  const [editingId, setEditingId] = useState(null);

  // Fetch patients
  const fetchPatients = async () => {
    const res = await axios.get(API_URL);
    setPatients(res.data);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create or update patient
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData);
        setEditingId(null);
      } else {
        await axios.post(API_URL, formData);
      }
      setFormData({ first_name: '', last_name: '' });
      fetchPatients();
    } catch (err) {
      console.error(err);
    }
  };

  // Edit patient
  const handleEdit = (patient) => {
    setFormData({ first_name: patient.first_name, last_name: patient.last_name });
    setEditingId(patient.id);
  };

  // Delete patient
  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this patient?')) {
      await axios.delete(`${API_URL}/${id}`);
      fetchPatients();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Patient Management</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div className="flex space-x-4">
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="First Name"
            className="border rounded px-4 py-2 w-1/2"
            required
          />
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Last Name"
            className="border rounded px-4 py-2 w-1/2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingId ? 'Update Patient' : 'Add Patient'}
        </button>
      </form>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">First Name</th>
            <th className="border px-4 py-2">Last Name</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr key={patient.id}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{patient.first_name}</td>
              <td className="border px-4 py-2">{patient.last_name}</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => handleEdit(patient)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(patient.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {patients.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No patients found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatientManagement;
