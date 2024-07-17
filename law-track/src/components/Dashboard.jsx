import React, { useEffect, useState } from 'react';
const Dashboard = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [features, setFeatures] = useState([]);
  const [attendances, setAttendances] = useState([]);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/payrolls/')
      .then((response) => response.json())
      .then((data) => setPayrolls(data))
      .catch((error) => console.error('Error fetching payroll data:', error));
    fetch('http://127.0.0.1:8000/features/')
      .then((response) => response.json())
      .then((data) => setFeatures(data))
      .catch((error) => console.error('Error fetching features data:', error));
    fetch('http://127.0.0.1:8000/api/attendaces/')
      .then((response) => response.json())
      .then((data) => setAttendances(data))
      .catch((error) => console.error('Error fetching attendance data:', error));
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <header className="bg-white shadow-sm py-4 mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        </div>
      </header>
      <main className="container mx-auto">
        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Payroll Data</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee Name</th>
                  <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</th>
                  <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                  <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bonus</th>
                  <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pay Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payrolls.map((payroll) => (
                  <tr key={payroll.id}>
                    <td className="py-4 px-6 whitespace-nowrap">{payroll.employee_name}</td>
                    <td className="py-4 px-6 whitespace-nowrap">{payroll.employee_id}</td>
                    <td className="py-4 px-6 whitespace-nowrap">{payroll.salary}</td>
                    <td className="py-4 px-6 whitespace-nowrap">{payroll.bonus}</td>
                    <td className="py-4 px-6 whitespace-nowrap">{payroll.pay_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Feature Data</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature Title</th>
                  <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature Content</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {features.map((feature) => (
                  <tr key={feature.id}>
                    <td className="py-4 px-6 whitespace-nowrap">{feature.title}</td>
                    <td className="py-4 px-6 whitespace-nowrap">{feature.content}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Attendance Data</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendances.map((attendance) => (
                  <tr key={attendance.id}>
                    <td className="py-4 px-6 whitespace-nowrap">{attendance.name}</td>
                    <td className="py-4 px-6 whitespace-nowrap">{attendance.date}</td>
                    <td className="py-4 px-6 whitespace-nowrap">{attendance.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <footer className="bg-white shadow-sm py-4 mt-6">
        <div className="container mx-auto text-center">
          <p className="text-gray-600">&copy; 2024 All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
export default Dashboard;