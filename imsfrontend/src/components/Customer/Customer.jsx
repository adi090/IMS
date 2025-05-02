import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get("http://localhost:8080/customer")
      .then((res) => setCustomers(res.data))
      .catch((err) => console.error("Error fetching customers:", err));
  }, []);

  const handleEdit = (customer) => {
    console.log("Edit clicked for:", customer);
    var id = customer.id;
    navigate(`/customer/update/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      axios
        .delete(`http://localhost:8080/customer/${id}`)
        .then(() => {
          setCustomers(customers.filter((s) => s.id !== id));
        })
        .catch((err) => console.error("Error deleting customer:", err));
    }
  };

  return (
    <div className="px-20 py-14 w-full overflow-x-auto max-w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Customers</h2>
        <button
          onClick={() => navigate("/customer/create")} // Route to your create form
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Create Customer
        </button>
      </div>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3 w-1/6">Customer Name</th>
            <th className="px-6 py-3 w-1/4">Address</th>
            <th className="px-6 py-3 w-1/5">Email</th>
            <th className="px-6 py-3 w-1/6">Phone</th>
            <th className="px-6 py-3 w-1/6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr
              key={customer.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                {customer.name}
              </td>
              <td className="px-6 py-4">{customer.address}</td>
              <td className="px-6 py-4">{customer.email}</td>
              <td className="px-6 py-4">{customer.phone}</td>
              <td className="px-6 py-4 space-x-2">
                <button
                  onClick={() => handleEdit(customer)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(customer.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {customers.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-6 text-gray-500">
                No Customer found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Customer;
