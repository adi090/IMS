import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();

  // Fetch suppliers
  useEffect(() => {
    axios
      .get("http://localhost:8080/supplier")
      .then((res) => setSuppliers(res.data))
      .catch((err) => console.error("Error fetching suppliers:", err));
  }, []);

  const handleEdit = (supplier) => {
    console.log("Edit clicked for:", supplier);
    var id=supplier.id;
     navigate(`/supplier/update/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      axios
        .delete(`http://localhost:8080/supplier/${id}`)
        .then(() => {
          setSuppliers(suppliers.filter((s) => s.id !== id));
        })
        .catch((err) => console.error("Error deleting supplier:", err));
    }
  };

  return (
    <div className="px-20 py-14">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Suppliers</h2>
        <button
          onClick={() => navigate("/supplier/create")} 
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Create Supplier
        </button>
      </div>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Supplier Name</th>
            <th className="px-6 py-3">Address</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Phone</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr
              key={supplier.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                {supplier.name}
              </td>
              <td className="px-6 py-4">{supplier.address}</td>
              <td className="px-6 py-4">{supplier.email}</td>
              <td className="px-6 py-4">{supplier.phone}</td>
              <td className="px-6 py-4 space-x-2">
                <button
                  onClick={() => handleEdit(supplier)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(supplier.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {suppliers.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-6 text-gray-500">
                No suppliers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Supplier;
