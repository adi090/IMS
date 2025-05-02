import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateSupplier = () => {
    const{id}=useParams();

    const navigate = useNavigate();
    const [supplier, setSupplier] = useState({});
      const [name, setName] = useState(supplier?.name || "");
      const [address, setAddress] = useState(supplier?.address || "");
      const[phone,setPhone]=useState(supplier?.phone|| "");
      const[email,setEmail]=useState(supplier?.email|| "");

      const [loading, setLoading] = useState(false);
      const [error, setError] = useState("");

      useEffect(() => {
        axios
          .get(`http://localhost:8080/supplier/${id}`)
          .then((res) => 
            {  
                // console.log(res.data)
                setSupplier(res.data);
                setName(res.data.name);
  setEmail(res.data.email);
  setPhone(res.data.phone);
  setAddress(res.data.address);
            })
          .catch((err) => console.error("Error fetching suppliers:", err));
          console.log(supplier.name);
      }, []);

      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            console.log("ji")
            console.log("Updating with:", { name, phone,email,address });
          await axios.put(`http://localhost:8080/supplier/${id}`, {
            name,
            phone,email,address
           
          }
         
            
        );
        alert("updated successsfully");
        navigate("/supplier")
          console.log("sdfasdfasf")
         
        //   toast.success("Category updated successfully!"); 
        //   onUpdate();  
        } catch (error) {
          alert(error.response?.data?.message || "Failed to update category");
        } finally {
          setLoading(false);
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            //   placeholder="123-45-678"
            //   pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
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
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              required
            />
          </div>

        
      <div>
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white rounded px-4 py-2 mr-2"
        >
         Update
        </button>
        <button
          onClick={() => navigate("/supplier")}
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

export default UpdateSupplier;
