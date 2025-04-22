import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import CompanyForm from '../components/CompanyForm';

const AddCompany = () => {
  const navigate = useNavigate();

  const handleAddCompany = async (companyData) => {
    try {
      const response = await axios.post('https://interview-tracker-e6tf.onrender.com/companies', companyData);
      toast.success(`${response.data.company} added successfully!`);
      navigate('/companies');
    } catch (error) {
      toast.error('Failed to add company');
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Application</h1>
      <CompanyForm onSubmit={handleAddCompany} />
    </div>
  );
};

export default AddCompany;