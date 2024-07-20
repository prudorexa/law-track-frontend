import React from 'react';

const About = () => {
  return (
    <div className="about min-h-screen p-6 bg-gray-100">
      <section className="about-section mb-8 bg-white bg-opacity-80 shadow-md p-6 sm:p-8 rounded-lg">
        <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-gray-800">About Our Law Firm</h1>
        <p className="text-base sm:text-xl text-gray-700">
          Our law firm has been serving clients for over 20 years, providing top-notch legal services and representation in various fields of law.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <section className="about-section bg-white bg-opacity-80 shadow-md p-6 sm:p-8 rounded-lg">
          <img src="src/assets/provide legal advice.webp" alt="Our History" className="mb-4 rounded-lg w-full h-auto object-cover" />
          <h2 className="text-2xl sm:text-4xl font-semibold mb-2 text-gray-800">Our History</h2>
          <p className="text-base sm:text-xl text-gray-700">
            Founded in 2000, our firm has grown from a small practice to a well-established firm with a reputation for excellence. We have consistently been recognized for our dedication to client service and legal expertise.
          </p>
        </section>

        <section className="about-section bg-white bg-opacity-80 shadow-md p-6 sm:p-8 rounded-lg">
          <img src="src/assets/laww.webp" alt="Our Mission" className="mb-4 rounded-lg w-full h-auto object-cover" />
          <h2 className="text-2xl sm:text-4xl font-semibold mb-2 text-gray-800">Our Mission</h2>
          <p className="text-base sm:text-xl text-gray-700">
            Our mission is to provide exceptional legal services with integrity, professionalism, and respect for our clients and the community.
          </p>
        </section>

        <section className="about-section bg-white bg-opacity-80 shadow-md p-6 sm:p-8 rounded-lg">
          <img src="src/assets/topp jet.jpg" alt="Our Team" className="mb-4 rounded-lg w-full h-auto object-cover" />
          <h2 className="text-2xl sm:text-4xl font-semibold mb-2 text-gray-800">Our Team</h2>
          <p className="text-base sm:text-xl text-gray-700">
            Our team is composed of experienced lawyers, paralegals, and support staff who are committed to achieving the best outcomes for our clients. We believe in a collaborative approach to legal practice, ensuring that each client receives personalized and effective legal solutions.
          </p>
        </section>

        <section className="about-section bg-white bg-opacity-80 shadow-md p-6 sm:p-8 rounded-lg">
          <img src="src/assets/topping.webp" alt="Our Values" className="mb-4 rounded-lg w-full h-auto object-cover" />
          <h2 className="text-2xl sm:text-4xl font-semibold mb-2 text-gray-800">Our Values</h2>
          <ul className="list-disc pl-5 text-base sm:text-xl text-gray-700">
            <li className="mb-2"><strong>Integrity:</strong> We uphold the highest standards of ethical practice in all our dealings.</li>
            <li className="mb-2"><strong>Excellence:</strong> We strive for excellence in everything we do, from legal representation to client service.</li>
            <li className="mb-2"><strong>Respect:</strong> We treat our clients, colleagues, and opponents with respect and dignity.</li>
            <li className="mb-2"><strong>Commitment:</strong> We are committed to the success of our clients and the betterment of our community.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default About;
