import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PurchaseProduct = () => {
  const [purchaseProduct, setPurchaseproduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [suppliers, setSupplier] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for fetching data
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [purchaseProd, prodRes, supRes] = await Promise.all([
          axios.get("http://localhost:8080/purchase"),
          axios.get("http://localhost:8080/items"),
          axios.get("http://localhost:8080/supplier"),
        ]);
        setPurchaseproduct(purchaseProd.data);
        setProducts(prodRes.data);
        setSupplier(supRes.data);
        console.log(supRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false); // End loading after fetch
      }
    };

    fetchData();
  }, []);

  const handleEdit = (p) => {
    var id = p.id;
    console.log(id);
    navigate(`/purchaseproduct/update/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this purchased product?")) {
      axios
        .delete(`http://localhost:8080/purchase/${id}`)
        .then(() => {
          setPurchaseproduct(prevState => prevState.filter((p) => p.id !== id));
        })
        .catch((err) => console.error("Error deleting purchased product:", err));
    }
  };

  // helper to get item name
  const getItemName = (itemId) => {
    const item = products.find((p) => p.id === itemId);
    return item ? item.name : "Unknown Product";
  };

  // helper to get supplier name
  const getSupplierName = (supplierId) => {
    const supplier = suppliers.find((s) => s.id === supplierId);
    return supplier ? supplier.name : "Unknown supplier";
  };

  // Show a loading message while data is being fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p>Loading data...</p>
      </div>
    );
  }

  return (
    <div className="px-20 py-14">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Purchased Product</h2>
        <button
          onClick={() => navigate("/purchaseproduct/add")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Purchase New Product
        </button>
      </div>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Product</th>
            <th className="px-6 py-3">Supplier</th>
            <th className="px-6 py-3">Quantity</th>
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {purchaseProduct.map((p) => (
            <tr key={p.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                {getItemName(p.itemId)}
              </td>
              <td className="px-6 py-4">{getSupplierName(p.supplierId)}</td>
              <td className="px-6 py-4">{p.quantity}</td>
              <td className="px-6 py-4">{p.date}</td>
              <td className="px-6 py-4 space-x-2">
                {/* <button
                  onClick={() => handleEdit(p)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button> */}
                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {purchaseProduct.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-6 text-gray-500">
                No purchase products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseProduct;
