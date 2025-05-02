import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UpdateItem from "./UpdateItem";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Items = () => {
  const [items, setItems] = useState([]);
  const [editItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [promocodes, setPromocodes] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [filteredProducts, setFilteredProducts] = useState(items);
  const navigate = useNavigate();
  const LOW_STOCK_THRESHOLD = 10;

  useEffect(() => {
    fetchItems();
  }, []);

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

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/items");
      setItems(res.data);
      setFilteredProducts(res.data);
      checkLowStock(res.data);
    } catch (err) {
      console.error("Error fetching Items:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const checkLowStock = (items) => {
    items.forEach((item) => {
      if (item.quantity < LOW_STOCK_THRESHOLD) {
        toast.warn(`Stock for ${item.name} is low! Only ${item.quantity} left.`, {
          autoClose: 5000,
        });
      }
    });
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/items/${id}`);
      fetchItems();
    } catch (err) {
      console.error("Error deleting item:", err.response?.data || err.message);
      setError("Error deleting item");
    }
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
  };

  const handleUpdateSuccess = () => {
    setEditingItem(null);
    fetchItems();
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  useEffect(() => {
    if (searchClicked) {
      let filtered = items;
      if (selectedCategory !== "All categories") {
        const selectedCategoryObj = categories.find(
          (cat) => cat.name.toLowerCase() === selectedCategory.toLowerCase()
        );
        if (selectedCategoryObj) {
          filtered = filtered.filter(
            (i) => i.categoryId === selectedCategoryObj.id
          );
        }
      }
      if (searchTerm.trim() !== "") {
        filtered = filtered.filter((i) =>
          i.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      setFilteredProducts(filtered);
      setSearchClicked(false);
    }
  }, [searchTerm, selectedCategory, items, searchClicked]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-20">
      <ToastContainer />
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 px-4 sm:px-8 md:px-16 lg:px-32">
          <form className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full sm:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-2 rounded border text-sm w-full sm:w-auto"
              >
                <option>All categories</option>
                {categories.map((cat) => (
                  <option key={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="flex w-full">
              <input
                type="search"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search products..."
                className="flex-grow p-2 border rounded-l text-sm"
              />
              <button
                type="button"
                onClick={() => setSearchClicked(true)}
                className="bg-blue-600 text-white px-4 rounded-r text-sm"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">Products</h2>

        <button
          onClick={() => navigate("/items/create")}
          className="text-white bg-green-600 hover:bg-green-700 rounded px-4 py-2 mb-4"
        >
          Create New Product
        </button>

        {error && <p className="text-red-600 mb-2">{error}</p>}

        {loading ? (
          <p className="text-gray-600">Loading product...</p>
        ) : items.length === 0 ? (
          <p className="text-gray-600">No product found.</p>
        ) : (
          <section className="text-gray-700">
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm border p-3 flex flex-col text-center hover:shadow-md"
                >
                  <div className="w-full h-40 bg-gray-200 rounded mb-3 flex items-center justify-center overflow-hidden">
                    <img
                      alt={item.name}
                      src={item.imageUrl || "https://dummyimage.com/200x160/cccccc/ffffff&text=No+Image"}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h2 className="text-gray-900 font-semibold text-base">{item.name}</h2>
                  <p className="text-sm text-gray-700 mt-1">${item.price}</p>
                  <p className={`text-sm mt-2 ${item.quantity < LOW_STOCK_THRESHOLD ? 'text-red-600' : 'text-green-600'}`}>
                    {item.quantity < LOW_STOCK_THRESHOLD
                      ? `Low Stock: ${item.quantity}`
                      : `In Stock: ${item.quantity}`}
                  </p>

                  <div className="flex mt-3 w-full justify-between">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700 w-[48%]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(item.id)}
                      className="bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700 w-[48%]"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {editItem && (
          <UpdateItem
            item={editItem}
            categories={categories}
            onUpdate={handleUpdateSuccess}
            onCancel={handleCancelEdit}
          />
        )}
      </div>
    </div>
  );
};

export default Items;