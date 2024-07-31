import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../config";

const Schedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [lawyers, setLawyers] = useState([]);
  const [cases, setCases] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [assignedLawyer, setAssignedLawyer] = useState("");
  const [caseId, setCaseId] = useState("");
  const [editingScheduleId, setEditingScheduleId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchSchedules();
    fetchLawyers();
    fetchCases();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/schedules/`);
      console.log("Fetched schedules:", response.data);
      if (Array.isArray(response.data)) {
        setSchedules(response.data);
      } else {
        console.error("API response is not an array");
      }
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  const fetchLawyers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/lawyers/`);
      setLawyers(response.data);
    } catch (error) {
      console.error("Error fetching lawyers:", error);
    }
  };

  const fetchCases = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/cases/`);
      setCases(response.data);
    } catch (error) {
      console.error("Error fetching cases:", error);
    }
  };

  const handleCreateUpdate = async () => {
    const scheduleData = {
      title,
      date,
      description,
      assigned_lawyer: assignedLawyer,
      case: caseId,
    };

    try {
      if (editingScheduleId) {
        await axios.put(`${BASE_URL}/api/schedules/${editingScheduleId}/`, scheduleData);
      } else {
        await axios.post(`${BASE_URL}/api/schedules/`, scheduleData);
      }
      fetchSchedules();
      resetForm();
      setShowForm(false);
    } catch (error) {
      console.error("Error creating/updating schedule:", error);
    }
  };

  const handleEdit = (schedule) => {
    setTitle(schedule.title);
    setDate(schedule.date);
    setDescription(schedule.description);
    setAssignedLawyer(schedule.assigned_lawyer);
    setCaseId(schedule.case);
    setEditingScheduleId(schedule.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setTitle("");
    setDate("");
    setDescription("");
    setAssignedLawyer("");
    setCaseId("");
    setEditingScheduleId(null);
  };

  const renderScheduleList = () => {
    if (schedules.length === 0) {
      return <p className="text-center text-gray-600">No schedules available.</p>;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {schedules.map((schedule) => (
          <div key={schedule.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">{schedule.title}</h3>
            <p className="text-gray-700">Date: {new Date(schedule.date).toLocaleDateString()}</p>
            <p className="text-gray-700">Description: {schedule.description}</p>
            <p className="text-gray-700">Assigned Lawyer: {schedule.assigned_lawyer}</p>
            <p className="text-gray-700">Case: {schedule.case}</p>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => handleEdit(schedule)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Schedules</h2>
      <button
        onClick={() => setShowForm((prev) => !prev)}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        {showForm ? "Hide Form" : "Add Schedule"}
      </button>

      {showForm && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateUpdate();
          }}
          className="space-y-4 mb-6"
        >
          <div>
            <label className="block text-gray-700">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700">Assigned Lawyer:</label>
            <select
              value={assignedLawyer}
              onChange={(e) => setAssignedLawyer(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Select Lawyer</option>
              {lawyers.map((lawyer) => (
                <option key={lawyer.id} value={lawyer.id}>
                  {lawyer.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-black">Case:</label>
            <select
              value={caseId}
              onChange={(e) => setCaseId(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Select Case</option>
              {cases.map((caseItem) => (
                <option key={caseItem.id} value={caseItem.id}>
                  {caseItem.case_name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {editingScheduleId ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {renderScheduleList()}
    </div>
  );
};

export default Schedule;
