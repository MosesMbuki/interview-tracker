import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 text-white shadow-lg" >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          <img src="public/job-seeker.png" alt="Logo" className="h-9 w-9 inline-block mr-2 " />
          Job Quest
        </Link>
        <div className="space-x-4">
          <NavLink 
            to="/companies" 
            className={({isActive}) => `px-3 py-2 rounded ${isActive ? 'bg-indigo-700' : 'hover:bg-indigo-500'}`}
          >
            <img src="https://i.postimg.cc/5tq2MnGH/company.png" alt="Companies" className="h-7 w-7 inline-block mr-2" />
            Companies
          </NavLink>
          <NavLink 
            to="/add-company" 
            className={({isActive}) => `px-3 py-2 rounded ${isActive ? 'bg-indigo-700' : 'hover:bg-indigo-500'}`}
          >
            <img src="https://i.postimg.cc/Wzf4HzyX/circular.png" alt="Add" className="h-6 w-6 inline-block mr-2" />
            Add Company
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;