import { useState } from 'react';

const CompanyForm = ({ initialData = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    company: initialData.company || '',
    role: initialData.role || '',
    status: initialData.status || 'Applied',
    resources: initialData.resources || [],
    applied_date: initialData.applied_date || new Date().toISOString().split('T')[0],
    is_followed_up: initialData.is_followed_up || false,
    newResource: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddResource = (e) => {
    e.preventDefault();
    if (formData.newResource.trim()) {
      setFormData(prev => ({
        ...prev,
        resources: [...prev.resources, prev.newResource.trim()],
        newResource: ''
      }));
    }
  };

  const handleRemoveResource = (index) => {
    setFormData(prev => ({
      ...prev,
      resources: prev.resources.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { newResource, ...dataToSubmit } = formData;
    onSubmit(dataToSubmit);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company Name*</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role*</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status*</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="Applied">Applied</option>
            <option value="Interview Scheduled">Interview Scheduled</option>
            <option value="Interviewed">Interviewed</option>
            <option value="Offer Received">Offer Received</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Applied Date*</label>
          <input
            type="date"
            name="applied_date"
            value={formData.applied_date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Followed Up</label>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="is_followed_up"
            checked={formData.is_followed_up}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-gray-700">
            {formData.is_followed_up ? 'Yes' : 'No'}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Preparation Resources</label>
        <div className="flex mb-2">
          <input
            type="text"
            value={formData.newResource}
            onChange={(e) => setFormData(prev => ({...prev, newResource: e.target.value}))}
            placeholder="Add resource"
            className="flex-1 p-2 border rounded-l"
          />
          <button
            onClick={handleAddResource}
            className="bg-indigo-600 text-white px-4 py-2 rounded-r hover:bg-indigo-700"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.resources.map((resource, index) => (
            <div key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
              <span className="text-sm">{resource}</span>
              <button
                type="button"
                onClick={() => handleRemoveResource(index)}
                className="ml-2 text-gray-500 hover:text-red-500"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
      >
        {initialData.id ? 'Update Company' : 'Add Company'}
      </button>
    </form>
  );
};

export default CompanyForm;