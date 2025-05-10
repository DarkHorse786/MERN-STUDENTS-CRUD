import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Form = ({ formData, setFormData, getRecords }) => {
  
  const setInputValue = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const saveData = (e) => {
    e.preventDefault();

    const url = formData._id
      ? `http://localhost:8000/web/api/students/updateRecord/${formData._id}`
      : 'http://localhost:8000/web/api/students/insertRecord';

    const method = formData._id ? axios.put : axios.post;

    method(url, formData)
      .then((response) => {
        if (response.data.status === true) {
          toast.success(response.data.message);
          // setFormData({ name: '', age: '', email: '', phone: '', address: '' });
          getRecords();
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(() => {
        toast.error('Error occurred while saving student');
      });
  };

  return (
    <div className="md:col-span-3 bg-gray-50 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">
        {formData._id ? 'Update' : 'Registration'} Form
      </h2>
      <form className="space-y-4" onSubmit={saveData}>
        {['name', 'age', 'email', 'phone', 'address'].map((field) => (
          <div key={field}>
            <label className="block mb-1 capitalize">{`Your ${field}`}</label>
            <input
              type={field === 'age' ? 'number' : 'text'}
              name={field}
              value={formData[field]}
              onChange={setInputValue}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder={`Enter Your ${field}`}
              required
            />
          </div>
        ))}
        <button type="submit" className="w-full bg-cyan-700 text-white py-2 rounded hover:bg-cyan-800">
          {formData._id ? 'Update' : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default Form;
