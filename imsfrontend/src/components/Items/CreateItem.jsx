import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateItem = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    categoryId: "",   
    image: ""  // To store image URL
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8080/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: newItem.name,
      description: newItem.description,
      price: parseFloat(newItem.price),
      quantity: parseInt(newItem.quantity),
      categoryId: newItem.categoryId ? parseInt(newItem.categoryId) : null,
      image: newItem.image,
    };

    try {
      console.log(payload);
      await axios.post("http://localhost:8080/items", payload);
      alert("Item created successfully!");
      navigate("/items");
    } catch (err) {
      console.error("Error creating item:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to create item.");
    }
  };

  return (
    <div className="px-80 py-24">
      <div className="p-4 max-w-3xl mx-auto bg-blue shadow rounded-lg mt-6 py-4 m-2">
        <h3 className="text-xl mb-4 text-black bg-blue-600 rounded-lg px-4 py-4 ">Create New Item</h3>
        {error && <p className="text-red-600 mb-2">{error}</p>}

        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />

        <textarea
          placeholder="Item Description"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
          className="mb-2 p-2 border border-gray-300 rounded w-full"
          rows="3"
        />

        <input
          type="number"
          placeholder="Price"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />

        <input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />

        <select
          onChange={(e) => setNewItem({ ...newItem, categoryId: e.target.value })}
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Image URL"
          value={newItem.image}
          onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />

        {/* Render the image if URL is provided */}
        {newItem.image && (
          <div className="mb-4">
            <img
              src={newItem.image}
              alt="Product"
              className="w-full h-auto rounded"
              style={{ maxHeight: '300px', objectFit: 'cover' }}
            />
          </div>
        )}

        <div>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white rounded px-4 py-2 mr-2"
          >
            Create
          </button>
          <button
            onClick={() => navigate("/items")}
            className="bg-gray-600 text-white rounded px-4 py-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateItem;
