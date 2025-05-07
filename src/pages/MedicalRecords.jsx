import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_RECORDS = 'http://localhost:8000/api/records';
const API_PATIENTS = 'http://localhost:8000/api/patients';

const MedicalRecords = () => {
  const [records, setRecords] = useState([]);
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    patient_id: '',
    visit_date: '',
    diagnosis: '',
    prescription: ''
  });
  const [editingId, setEditingId] = useState(null);

  const fetchRecords = async () => {
    const res = await axios.get(API_RECORDS);
    setRecords(res.data);
  };

  const fetchPatients = async () => {
    const res = await axios.get(API_PATIENTS);
    setPatients(res.data);
  };

  useEffect(() => {
    fetchPatients();
    fetchRecords();
  }, []);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_RECORDS}/${editingId}`, formData);
        setEditingId(null);
      } else {
        await axios.post(API_RECORDS, formData);
      }
      setFormData({
        patient_id: '',
        visit_date: '',
        diagnosis: '',
        prescription: ''
      });
      fetchRecords();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (record) => {
    setFormData({
      patient_id: record.patient_id,
      visit_date: record.visit_date,
      diagnosis: record.diagnosis,
      prescription: record.prescription
    });
    setEditingId(record.id);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this record?')) {
      await axios.delete(`${API_RECORDS}/${id}`);
      fetchRecords();
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Medical Records</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <select
            name="patient_id"
            value={formData.patient_id}
            onChange={handleChange}
            className="border px-4 py-2 rounded w-full md:w-1/3"
            required
          >
            <option value="">Select Patient</option>
            {patients.map(patient => (
              <option key={patient.id} value={patient.id}>
                {patient.first_name} {patient.last_name}
              </option>
            ))}
          </select>
          <input
            type="date"
            name="visit_date"
            value={formData.visit_date}
            onChange={handleChange}
            className="border px-4 py-2 rounded w-full md:w-1/3"
            required
          />
        </div>
        <textarea
          name="diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
          placeholder="Diagnosis"
          className="border px-4 py-2 rounded w-full"
          required
        />
        <textarea
          name="prescription"
          value={formData.prescription}
          onChange={handleChange}
          placeholder="Prescription"
          className="border px-4 py-2 rounded w-full"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {editingId ? 'Update Record' : 'Add Record'}
        </button>
      </form>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-3 py-2">#</th>
            <th className="border px-3 py-2">Patient</th>
            <th className="border px-3 py-2">Visit Date</th>
            <th className="border px-3 py-2">Diagnosis</th>
            <th className="border px-3 py-2">Prescription</th>
            <th className="border px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={record.id}>
              <td className="border px-3 py-2">{index + 1}</td>
              <td className="border px-3 py-2">
                {patients.find(p => p.id === record.patient_id)?.first_name}{" "}
                {patients.find(p => p.id === record.patient_id)?.last_name}
              </td>
              <td className="border px-3 py-2">{record.visit_date}</td>
              <td className="border px-3 py-2">{record.diagnosis}</td>
              <td className="border px-3 py-2">{record.prescription}</td>
              <td className="border px-3 py-2 space-x-2">
                <button
                  onClick={() => handleEdit(record)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(record.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {records.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">
                No medical records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MedicalRecords;
