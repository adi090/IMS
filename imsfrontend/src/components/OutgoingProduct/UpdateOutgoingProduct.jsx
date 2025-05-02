import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateOutgoingProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [outProd, setOutProd] = useState({
    itemId: "",
    customerId: "",
    quantity: "",
    date: ""
  });
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch existing outgoing product details
    const fetchOutgoingProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/outgoing/${id}`);
        setOutProd({
          itemId: res.data.itemId,
          customerId: res.data.customerId,
          quantity: res.data.quantity,
          date: res.data.date
        });
      } catch (err) {
        console.error("Error fetching outgoing product:", err);
      }
    };

    // Fetch all products
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8080/items");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    // Fetch all customers
    const fetchCustomers = async () => {
      try {
        const res = await axios.get("http://localhost:8080/customer");
        setCustomers(res.data);
      } catch (err) {
        console.error("Error fetching customers:", err);
      }
    };

    fetchOutgoingProduct();
    fetchProducts();
    fetchCustomers();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      itemId: outProd.itemId,
      customerId: outProd.customerId,
      quantity: parseInt(outProd.quantity),
      date: outProd.date
    };

    try {
      await axios.put(`http://localhost:8080/outgoing/${id}`, payload); // <-- use PUT for update
      alert("Outgoing product updated successfully!");
      navigate("/outgoingproduct");
    } catch (err) {
      console.error("Error updating outgoing product:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to update outgoing product.");
    }
  };

  return (
    <div className="px-80 py-24">
      <div className="p-4 max-w-3xl mx-auto bg-blue shadow rounded-lg mt-6 py-4 m-2">
        <h3 className="text-xl mb-4 text-black bg-blue-600 rounded-lg px-4 py-4">
          Update Outgoing Product
        </h3>
        {error && <p className="text-red-600 mb-2">{error}</p>}

        <h3>Products</h3>
        <select
          value={outProd.itemId}
          onChange={(e) => setOutProd({ ...outProd, itemId: e.target.value })}
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        >
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <h3>Customer</h3>
        <select
          value={outProd.customerId}
          onChange={(e) => setOutProd({ ...outProd, customerId: e.target.value })}
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        >
          <option value="">Select Customer</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Quantity"
          value={outProd.quantity}
          onChange={(e) => setOutProd({ ...outProd, quantity: e.target.value })}
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />

        <input
          type="date"
          placeholder="Select Date"
          value={outProd.date || ""}
          onChange={(e) => setOutProd({ ...outProd, date: e.target.value })}
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />

        <div>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white rounded px-4 py-2 mr-2"
          >
            Update
          </button>
          <button
            onClick={() => navigate("/outgoingproduct")}
            className="bg-gray-600 text-white rounded px-4 py-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateOutgoingProduct;
