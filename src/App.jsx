import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Companies from './pages/Companies';
import AddCompany from './pages/AddCompany';
import CompanyCard from './components/CompanyCard';
import EditCompany from './components/EditCompany';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/add-company" element={<AddCompany />} />
            <Route path="/edit-company/:id" element={<EditCompany />} />   
          </Routes>
        </div>
        <ToastContainer position="bottom-right" />
      </div>
      <Footer />
    </Router>
  );
}

export default App;