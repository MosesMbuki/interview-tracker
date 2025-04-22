import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CompanyForm from './CompanyForm';
import { Waveform } from 'ldrs/react'
import 'ldrs/react/Waveform.css'
    
  function EditCompany() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
    
      useEffect(() => {
          // Fetch item data based on ID
              const fetchCompany = async () => {
      try {
   const response = await fetch(`https://interview-tracker-e6tf.onrender.com/companies/${id}`)
        if (!response.ok) throw new Error('Failed to fetch company');
        const data = await response.json();
        setCompany(data);
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to load company data',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        navigate('/companies');
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [id, navigate])
    
  const handleSubmit = async (updatedCompany) => {
    try {
      const response = await fetch(`https://interview-tracker-e6tf.onrender.com/companies/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCompany)
      });

      if (!response.ok) throw new Error('Failed to update');

      const data = await response.json();
      
      Swal.fire({
        title: 'Success!',
        text: `${data.company} updated successfully!`,
        icon: 'success',
        confirmButtonText: 'OK'
      });
      
      navigate('/companies');
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update company',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Waveform
          size="100"
          stroke="5"
          speed="1"
          color="#3949AB" 
        />
      </div>
    );
  }
    
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Application</h1>
      {company && (
        <CompanyForm 
          initialData={company} 
          onSubmit={handleSubmit} 
        />
      )}
    </div>
  );
}
    
    export default EditCompany;