import { useState } from 'react';
import CompanyCard from './CompanyCard';
import FilterControls from './FilterControls';

const CompanyList = ({ companies, onDelete, onUpdate }) => {
  const [filters, setFilters] = useState({
    role: '',
    status: '',
    search: ''
  });

  const filteredCompanies = companies.filter(company => {
    return (
      (filters.role === '' || company.role.toLowerCase().includes(filters.role.toLowerCase())) &&
      (filters.status === '' || company.status === filters.status) &&
      (filters.search === '' || 
        company.company.toLowerCase().includes(filters.search.toLowerCase()) ||
        company.role.toLowerCase().includes(filters.search.toLowerCase()))
    );
  });

  return (
    <div className="space-y-6">
      <FilterControls filters={filters} setFilters={setFilters} />
      
      {filteredCompanies.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No companies found matching your criteria
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredCompanies.map(company => (
            <CompanyCard 
              key={company.id} 
              company={company} 
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyList;