import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const CompanyCard = ({ company, onDelete, onUpdate }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`https://interview-tracker-e6tf.onrender.com/companies/${company.id}`);
      onDelete(company.id);
      toast.success(`${company.company} deleted successfully`);
    } catch (error) {
      toast.error('Failed to delete company');
      console.error('Error:', error);
    }
  };

  const handleFollowUp = async () => {
    try {
      const updatedCompany = { ...company, is_followed_up: !company.is_followed_up };
      const response = await axios.put(
        `https://interview-tracker-e6tf.onrender.com/companies/${company.id}`,
        updatedCompany
      );
      onUpdate(response.data);
      toast.success(`Follow-up status updated for ${company.company}`);
    } catch (error) {
      toast.error('Failed to update follow-up status');
      console.error('Error:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{company.company}</h3>
            <p className="text-indigo-600 font-medium">{company.role}</p>
          </div>
          <span className={`px-2 py-1 text-xs rounded-full ${
            company.status === 'Applied' ? 'bg-blue-100 text-blue-800' :
            company.status === 'Interview Scheduled' ? 'bg-yellow-100 text-yellow-800' :
            company.status === 'Interviewed' ? 'bg-purple-100 text-purple-800' :
            company.status === 'Offer Received' ? 'bg-green-100 text-green-800' :
            'bg-red-100 text-red-800'
          }`}>
            {company.status}
          </span>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          <p>Applied: {new Date(company.applied_date).toLocaleDateString()}</p>
          <p className="mt-1">
            Followed up: 
            <span 
              className={`ml-2 font-medium ${company.is_followed_up ? 'text-green-600' : 'text-red-600'}`}
            >
              {company.is_followed_up ? 'Yes' : 'No'}
            </span>
          </p>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700">Preparation Resources:</h4>
          <ul className="mt-1 space-y-1">
            {company.resources.map((resource, index) => (
              <li key={index} className="text-sm text-gray-600">• {resource}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-3 flex justify-between items-center">
        <button
          onClick={handleFollowUp}
          className={`text-sm px-3 py-1 rounded ${
            company.is_followed_up 
              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
              : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
          }`}
        >
          {company.is_followed_up ? 'Mark as Not Followed' : 'Mark as Followed Up'}
        </button>
        
        <div className="space-x-2">
          <Link
            to={`/edit-company/${company.id}`}
            className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="text-sm px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;