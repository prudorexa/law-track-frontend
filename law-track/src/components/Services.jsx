import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedServices, setExpandedServices] = useState({});

  const fetchServices = async () => {
    try {
      const response = await axios.get('https://law-track-backend-1.onrender.com/api/services/');
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

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Services</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
        {services.map((service) => (
          <div key={service.id} className="border p-4 bg-gray-100 rounded-lg shadow-md">
            <p className="font-bold text-2xl mb-2 text-gray-900">{service.name}</p>
            <p className="text-gray-700">
              {expandedServices[service.id] ? service.description : `${service.description.slice(0, 100)}...`}
            </p>
            <button
              onClick={() => toggleReadMore(service.id)}
              className="text-blue-500 underline mt-2"
            >
              {expandedServices[service.id] ? 'Read Less' : 'Read More'}
            </button>
            <p className="font-bold text-xl text-gray-800 mt-4">{service.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
