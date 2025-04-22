import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          PrepTracker
        </Link>
        <div className="space-x-4">
          <NavLink 
            to="/" 
            className={({isActive}) => `px-3 py-2 rounded ${isActive ? 'bg-indigo-700' : 'hover:bg-indigo-500'}`}
          >
            Dashboard
          </NavLink>
          <NavLink 
            to="/companies" 
            className={({isActive}) => `px-3 py-2 rounded ${isActive ? 'bg-indigo-700' : 'hover:bg-indigo-500'}`}
          >
            Companies
          </NavLink>
          <NavLink 
            to="/add-company" 
            className={({isActive}) => `px-3 py-2 rounded ${isActive ? 'bg-indigo-700' : 'hover:bg-indigo-500'}`}
          >
            Add Company
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;