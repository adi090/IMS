import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OutgoingProducts = () => {
  const [outgoingProd, setOutgoingProd] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [outProdRes, prodRes, custRes] = await Promise.all([
          axios.get("http://localhost:8080/outgoing"),
          axios.get("http://localhost:8080/items"),
          axios.get("http://localhost:8080/customer"),
        ]);
        setOutgoingProd(outProdRes.data);
        setProducts(prodRes.data);
        setCustomers(custRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (p) => {
    var id = p.id;
    console.log(id);
    navigate(`/outgoingproduct/update/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this outgoing product?")) {
      axios
        .delete(`http://localhost:8080/outgoing/${id}`)
        .then(() => {
          setOutgoingProd(outgoingProd.filter((p) => p.id !== id));
        })
        .catch((err) => console.error("Error deleting outgoing product:", err));
    }
  };

  // helper to get item name
  const getItemName = (itemId) => {
    const item = products.find((p) => p.id === itemId);
    return item ? item.name : "Unknown Product";
  };

  // helper to get customer name
  const getCustomerName = (customerId) => {
    const customer = customers.find((c) => c.id === customerId);
    return customer ? customer.name : "Unknown Customer";
  };

  return (
    <div className="px-20 py-14">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Outgoing List</h2>
        <button
          onClick={() => navigate("/outgoingproduct/add")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add New Outgoing Product
        </button>
      </div>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Product</th>
            <th className="px-6 py-3">Customer</th>
            <th className="px-6 py-3">Quantity</th>
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {outgoingProd.map((p) => (
            <tr key={p.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                {getItemName(p.itemId)}
              </td>
              <td className="px-6 py-4">{getCustomerName(p.customerId)}</td>
              <td className="px-6 py-4">{p.quantity}</td>
              <td className="px-6 py-4">{p.date}</td>
              <td className="px-6 py-4 space-x-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {outgoingProd.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-6 text-gray-500">
                No outgoing products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OutgoingProducts;
