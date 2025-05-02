import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const CreateCustomer = () => {
  const navigate = useNavigate();
    const [newCustomer, setNewCustomer] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
      });
      const [error, setError] = useState("");
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const payload = {
          name: newCustomer.name,
          email: newCustomer.email,
          address: newCustomer.address,
          phone: parseInt(newCustomer.phone)
        };
    
        try {
            console.log(payload)
          await axios.post("http://localhost:8080/customer", payload);
          alert("Customer created successfully!");
          navigate("/customer");
        } catch (err) {
          console.error("Error creating customer:", err.response?.data || err.message);
          setError(err.response?.data?.message || "Failed to create customer.");
        }
      };
    return ( 
      
      <div className=" pt-16 pr-60 flex items-center justify-center min-h-screen  bg-black-100">
        <form className=" py-10 px-8 rounded-lg shadow-lg w-full max-w-xl bg-gray-600">
          <div className="flex flex-col gap-6">
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-extrabold text-black"
              >
                Name
              </label>
              <input
                type="text"
                id="first_name"
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              //   placeholder="John"
                required
              />
            </div>
  
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-extrabold text-gray-900"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              //   placeholder="abc@email.com"
                required
              />
            </div>
  
            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-extrabold text-gray-900"
              >
                Phone number
              </label>
              <input
                type="tel"
                id="phone"
                value={newCustomer.phone}
                onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                // placeholder="123-45-678"
                // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                required
              />
            </div>
  
            <div>
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-extrabold text-gray-900"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                value={newCustomer.address}
                onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              />
            </div>
  
            <div>
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white rounded px-4 py-2 mr-2"
        >
          Create
        </button>
        <button
          onClick={() => navigate("/customer")}
          className="bg-gray-600 text-white rounded px-4 py-2"
        >
          Cancel
        </button>
      </div>
          </div>
        </form>
      </div>
    );
  };
  
  export default CreateCustomer;
  