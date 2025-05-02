import axios from "axios";
import { useState, useEffect } from "react";
import UpdateCategory from "./UpdateCategory";  

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newCategory, setNewCategory] = useState({ name: "", description: "" ,items:[]}); // State for new category
  const [isCreating, setIsCreating] = useState(false); // State to track if the new category form is open

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/categories");
      console.log("Fetched Categories:", res.data);
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Error fetching categories");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (category) => {
    setEditingCategory(category);
  };

  const handleUpdateSuccess = () => {
    setEditingCategory(null);
    fetchCategories(); // Refresh categories after update
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/categories/${id}`);
      setCategories(categories.filter((category) => category.id !== id)); // Remove deleted category from state
    } catch (err) {
      console.error("Error deleting category:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to delete category");
    }
  };

  const handleCreateCategory = async () => {
    try {
      const response = await axios.post("http://localhost:8080/categories", newCategory);
      setCategories([...categories, response.data]); // Add the newly created category to the state
      setNewCategory({ name: "", description: "" }); // Reset the form
      setIsCreating(false); // Close the create form
    } catch (err) {
      console.error("Error creating category:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to create category");
    }
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-20 ">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Categories</h2>

      {/* Create New Category Button */}
      <button
        onClick={() => setIsCreating(true)}
        className="text-white bg-green-600 hover:bg-green-700 rounded px-4 py-2 mb-4"
      >
        Create New Category
      </button>

      {/* New Category Form */}
      {isCreating && (
        <div className="mb-4 p-4 bg-white shadow rounded-lg">
          <h3 className="text-xl mb-2">Create New Category</h3>
          <input
            type="text"
            placeholder="Category Name"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            className="mb-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Category Description"
            value={newCategory.description}
            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
            className="mb-2 p-2 border border-gray-300 rounded"
          />
          <div>
            <button
              onClick={handleCreateCategory}
              className="bg-blue-600 text-white rounded px-4 py-2 mr-2"
            >
              Create
            </button>
            <button
              onClick={() => setIsCreating(false)}
              className="bg-gray-600 text-white rounded px-4 py-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Category List */}
      {categories.length === 0 ? (
        <p className="text-gray-600">No categories found.</p>
      ) : (
        <ul className="bg-white shadow rounded-lg divide-y divide-gray-200">
          {categories.map((category) => (
            <li key={category.id} className="flex justify-between items-center p-4">
              <span className="text-gray-700 font-medium">{category.name}</span>
              <div>
                <button
                  onClick={() => handleEditClick(category)}
                  className="text-white bg-blue-600 hover:bg-blue-700 rounded px-3 py-1 text-sm mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(category.id)}
                  className="text-white bg-red-600 hover:bg-red-700 rounded px-3 py-1 text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Edit Category Form */}
      {editingCategory && (
        <UpdateCategory
          category={editingCategory}
          onUpdate={handleUpdateSuccess}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default Categories;
