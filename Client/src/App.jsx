import React, { useEffect, useState } from 'react';
import Form from '../components/Form';
import Record from '../components/Record';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

function App() {
  const [record, setRecord] = useState([]);
  const [formData, setFormData] = useState({name: '',age: '',email: '',phone: '',address: ''});

  const getRecords = () => {
    axios.get('http://localhost:8000/web/api/students/getRecords')
      .then((response) => {
        if (response.data.status === true) {
          setRecord(response.data.data);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(() => {
        toast.error('Error occurred while fetching student records');
      });
  };

  useEffect(() => {
    getRecords();
  }, [record]);

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-center mb-8">Student Record</h1>
      <div className="grid grid-cols-1 md:grid-cols-10 gap-8">
        <Form
          formData={formData}
          setFormData={setFormData}
          getRecords={getRecords}
        />
        <Record
          record={record}
          getRecords={getRecords}
          setFormData={setFormData}
        />
      </div>
    </div>
  );
}

export default App;
