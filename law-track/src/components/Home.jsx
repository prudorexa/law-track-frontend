import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative">
      <img className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] object-cover" src="src/assets/Lawyer.jpg" alt="Lawyer" />

      <div className="home min-h-screen p-6 flex flex-col items-center justify-center">
        <section className="hero w-full max-w-4xl mb-12 text-center bg-black bg-opacity-50 shadow-xl p-6 md:p-8 rounded-lg">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-white">Welcome to Our Law Track</h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200">Providing exceptional legal services for over 20 years.</p>
        </section>

        <section className="about w-full max-w-4xl mb-12 bg-white bg-opacity-75 shadow-xl p-6 md:p-8 rounded-lg">
          <img className="w-full mb-4 rounded-lg object-cover" src="src/assets/negotiation.webp" alt="About Us"  />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-800">About Us</h2>
          <p className="text-base sm:text-lg md:text-xl mb-4 text-gray-700">Our law firm is dedicated to providing top-notch legal services and representation in various fields of law. Our experienced team is committed to achieving the best outcomes for our clients.</p>
          <Link to="/about" className="text-blue-700 text-base sm:text-lg md:text-xl hover:text-blue-500">Learn more about us</Link>
        </section>

        <section className="services w-full max-w-4xl mb-12 bg-white bg-opacity-75 shadow-xl p-6 md:p-8 rounded-lg">
          <img src="src/assets/Probate and success.webp" alt="Our Services" className="w-full mb-4 rounded-lg object-cover" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-800">Our Services</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-base sm:text-lg md:text-xl text-gray-700">Corporate Law</li>
            <li className="text-base sm:text-lg md:text-xl text-gray-700">Criminal Defense</li>
            <li className="text-base sm:text-lg md:text-xl text-gray-700">Family Law</li>
            <li className="text-base sm:text-lg md:text-xl text-gray-700">Real Estate Law</li>
            <li className="text-base sm:text-lg md:text-xl text-gray-700">Personal Injury Law</li>
          </ul>
          <Link to="/services" className="text-blue-700 text-base sm:text-lg md:text-xl hover:text-blue-500 mt-4 inline-block">Explore our services</Link>
        </section>

        <section className="contact w-full max-w-4xl mb-12 bg-white bg-opacity-75 shadow-xl p-6 md:p-8 rounded-lg">
          <img src="src/assets/topping.webp" alt="Contact Us" className="w-full mb-4 rounded-lg object-cover" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-800">Contact Us</h2>
          <p className="text-base sm:text-lg md:text-xl mb-4 text-gray-700">Have any questions or need a consultation? Feel free to reach out to us.</p>
          <Link to="/contact" className="text-blue-700 text-base sm:text-lg md:text-xl hover:text-blue-500">Get in touch</Link>
        </section>
      </div>
    </div>
  );
}

export default Home;
