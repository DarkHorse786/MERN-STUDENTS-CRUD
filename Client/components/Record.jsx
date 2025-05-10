import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Record = ({ record, getRecords, setFormData }) => {

  const deleteRecord = (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      axios.delete(`http://localhost:8000/web/api/students/deleteRecord/${id}`)
        .then((response) => {
          if (response.data.status === true) {
            toast.success(response.data.message);
            getRecords();
          } else {
            toast.error(response.data.message);
          }
        })
        .catch(() => {
          toast.error('Error occurred while deleting student record');
        });
    }
  };

  const getRecord = (id) => {
    axios.get(`http://localhost:8000/web/api/students/getRecord/${id}`)
      .then((response) => {
        if (response.data.status === 1) {
          setFormData(response.data.data);
        }
      })
      .catch(() => {
        toast.error('Error occurred while getting student record');
      });
  };

  return (
    <div className="md:col-span-7 bg-gray-50 p-6 rounded-lg shadow-md overflow-x-auto">
      <h2 className="text-xl text-center font-semibold mb-4">Student List</h2>
      <table className="w-full table-auto text-left border-collapse">
        <thead>
          <tr className="bg-gray-300 text-sm text-gray-700">
            <th className="px-4 py-2">SR NO</th>
            <th className="px-4 py-2">NAME</th>
            <th className="px-4 py-2">AGE</th>
            <th className="px-4 py-2">EMAIL</th>
            <th className="px-4 py-2">PHONE</th>
            <th className="px-4 py-2">ADDRESS</th>
            <th className="px-4 py-2">DELETE</th>
            <th className="px-4 py-2">EDIT</th>
          </tr>
        </thead>
        <tbody>
          {record.length > 0 ? record.map((data, index) => (
            <tr key={data._id} className="even:bg-gray-200 odd:bg-white text-sm">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{data.name}</td>
              <td className="px-4 py-2">{data.age}</td>
              <td className="px-4 py-2">{data.email}</td>
              <td className="px-4 py-2">{data.phone}</td>
              <td className="px-4 py-2">{data.address}</td>
              <td className="px-4 py-2">
                <button
                  className="bg-red-600 rounded-md py-1 px-4 text-white cursor-pointer"
                  onClick={() => deleteRecord(data._id)}
                >
                  Delete
                </button>
              </td>
              <td className="px-4 py-2">
                <button
                  className="bg-cyan-700 rounded-md py-1 px-4 text-white cursor-pointer"
                  onClick={() => getRecord(data._id)}
                >
                  Edit
                </button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan={8} className="text-center py-6">No <strong>Record</strong> Added yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Record;
