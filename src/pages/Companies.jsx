import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import CompanyList from '../components/CompanyList';
import { Waveform } from 'ldrs/react'
import 'ldrs/react/Waveform.css'


const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('https://interview-tracker-e6tf.onrender.com/companies');
        setCompanies(response.data);
      } catch (error) {
        toast.error('Failed to fetch companies');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleDelete = (id) => {
    setCompanies(companies.filter(company => company.id !== id));
  };

  const handleUpdate = (updatedCompany) => {
    setCompanies(companies.map(company => 
      company.id === updatedCompany.id ? updatedCompany : company
    ));
  };

  if (loading) {
    return (
       <div class="loader" className="flex justify-center items-center h-screen">
        <Waveform
          size="100"
          stroke="5"
          speed="1"
          color="#3949AB" 
        />
      </div>
    )
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">All Applications</h1>
        <span className="text-gray-600">
          Showing {companies.length} {companies.length === 1 ? 'application' : 'applications'}
        </span>
      </div>
      
      <CompanyList 
        companies={companies} 
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default Companies;