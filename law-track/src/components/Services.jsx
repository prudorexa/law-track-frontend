import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedServices, setExpandedServices] = useState({});

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/services/');
      console.log('Services data:', response.data); // Log the response data
      setServices(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching details:', error); // Log errors for debugging
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
    return <div>Loading...</div>;
  }

  return (
    <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 bg-white rounded-full text-gray-800 text-base lg:text-lg'>
      <h1>Services</h1>
      {services.map((service) => (
        <div key={service.id} className='border p-3 bg-neutral-400 mx-9 my-8 rounded-lg'>
          <p className='font-bold text-4xl text-black-500'> {service.name}</p>
          <p>
            {expandedServices[service.id] ? service.description : `${service.description.slice(0, 100)}...`}
          </p>
          <button
            onClick={() => toggleReadMore(service.id)}
            className='text-blue-500 underline'
          >
            {expandedServices[service.id] ? 'Read Less' : 'Read More'}
          </button>
          <p className='font-bold text-xl text-blue-4900'>{service.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Services;
