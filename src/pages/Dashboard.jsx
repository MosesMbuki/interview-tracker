import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import CompanyList from '../components/CompanyList';
import FollowUpChart from '../components/StatusChart';
import { Waveform } from 'ldrs/react'
import 'ldrs/react/Waveform.css'

const Dashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [latestCompanies, setLatestCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('https://interview-tracker-e6tf.onrender.com/companies?_sort=applied_date&_order=desc');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setCompanies(data);
        setLatestCompanies(data.slice(0, 4));
      } catch (error) {
        await Swal.fire({
          title: 'Error!',
          text: 'Failed to fetch companies',
          icon: 'error',
          confirmButtonText: 'OK'
        });
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
      <div class="loader" className="flex justify-center items-center h-screen" >
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
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Interview Prep Dashboard</h1>
      
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-800">Total Applications</h2>
          <p className="text-2xl font-bold text-gray-900">{companies.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-800">Followed Up</h2>
          <p className="text-2xl font-bold text-gray-900">{companies.filter(company => company.is_followed_up).length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-800">Not Followed Up</h2>
          <p className="text-2xl font-bold text-gray-900">{companies.filter(company => !company.is_followed_up).length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-800">Interviews Scheduled</h2>
          <p className="text-2xl font-bold text-gray-900">{companies.filter(company => company.status === 'Interview Scheduled').length}</p>
      </div>
    </div>

      {/* Charts Row */}
      <div className="lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Follow-up Status</h3>
          <FollowUpChart />
        </div>
      </div>

      {/* Recent Applications */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Applications</h2>
        <CompanyList 
          companies={latestCompanies} 
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      </div>
    </div>
  );
};

export default Dashboard;