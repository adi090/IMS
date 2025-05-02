import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddPurchaseProduct = () => {
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState([]);
  const [products,setProducts]=useState([]);

  const [purchaseProd, setpurchaseProd] = useState({
    itemId: "",
    supplierId: "",
    quantity: "",
     date:""
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchsupplier = async () => {
      try {
        const res = await axios.get("http://localhost:8080/supplier");
        setSupplier(res.data);
      } catch (err) {
        console.error("Error fetching supplier:", err);
      }
    };
    fetchsupplier();
  }, []);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8080/items");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      itemId: purchaseProd.itemId,
      supplierId:purchaseProd.supplierId,
      quantity: parseInt(purchaseProd.quantity),
      date:purchaseProd.date
    };

    try {
        console.log(payload)
      await axios.post("http://localhost:8080/purchase", payload);
      alert("product purchased successfully!");
      navigate("/purchaseproduct");
    } catch (err) {
      console.error("Error purchasing item:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to purchase item.");
    }
  };

  return (
    <div className="px-80 py-24">
 <div className="p-4 max-w-3xl mx-auto bg-blue shadow rounded-lg mt-6 py-4 m-2">
      <h3 className="text-xl mb-4 text-black bg-blue-600 rounded-lg px-4 py-4 ">Purchase Product</h3>
      {error && <p className="text-red-600 mb-2">{error}</p>}
       <h3>Products</h3>
      <select
        // value={newItem.categoryId}
        onChange={(e) => setpurchaseProd({ ...purchaseProd, itemId: e.target.value })}
        className="mb-2 p-2 border border-gray-300 rounded w-full"
      >
        <option value="">Select Product</option>
        {products.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      <h3>Supplier</h3>
      <select
        // value={newItem.categoryId}
        onChange={(e) => setpurchaseProd({ ...purchaseProd, supplierId: e.target.value })}
        className="mb-2 p-2 border border-gray-300 rounded w-full"
      >
        <option value="">Select Supplier</option>
        {supplier.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

     

      <input
        type="number"
        placeholder="Quantity"
        value={purchaseProd.quantity}
        onChange={(e) => setpurchaseProd({ ...purchaseProd, quantity: e.target.value })}
        className="mb-2 p-2 border border-gray-300 rounded w-full"
      />


<input
  type="date"
  placeholder="Select Date"
  value={purchaseProd.date || ""}
  onChange={(e) => setpurchaseProd({ ...purchaseProd, date: e.target.value })}
  className="mb-2 p-2 border border-gray-300 rounded w-full"
/>


      <div>
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white rounded px-4 py-2 mr-2"
        >
          Create
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

export default AddPurchaseProduct;
