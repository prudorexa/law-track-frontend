import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../../config';


const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedServices, setExpandedServices] = useState({});
  const navigate = useNavigate();

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/services/`);
      console.log('Services data:', response.data); 
      setServices(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching details:', error); 
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const toggleReadMore = (id) => {
    setExpandedServices((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleContactUs = () => {
    navigate('/contact');
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4" style={{ backgroundImage: `url('src\assets\provide legal advice.webp')` }}>
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">Our Services</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
        {services.map((service) => (
          <div key={service.id} className="border p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <h2 className="font-bold text-2xl mb-3 text-gray-800">{service.name}</h2>
            <p className="text-gray-700 mb-4">
              {expandedServices[service.id] ? service.description : `${service.description.slice(0, 100)}...`}
            </p>
            <button
              onClick={() => toggleReadMore(service.id)}
              className="text-blue-500 underline mb-4"
            >
              {expandedServices[service.id] ? 'Read Less' : 'Read More'}
            </button>
            <button
              onClick={handleContactUs}
              className="block w-full text-center py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Contact Us for Price
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
