
import { Routes, BrowserRouter, Route } from "react-router-dom";

import Items from "./components/Items/Items";
// import Header from "./components/Header";

import Categories from "./components/Category/Categories";
import CreateItem from "./components/Items/CreateItem";
import CreateCategory from "./components/Category/CreateCategory";
import UpdateCategory from "./components/Category/UpdateCategory";
import UpdateItem from "./components/Items/UpdateItem";
import Layout from "./components/Layout"; 
import CreateSupplier from "./components/Supplier/CreateSupplier";
import Supplier from "./components/Supplier/Supplier";
import Customer from "./components/Customer/Customer";
import CreateCustomer from "./components/Customer/CreateCustomer";
import UpdateSupplier from "./components/Supplier/UpdateSupplier";
import UpdateCustomer from "./components/Customer/UpdateCustomer";
import OutgoingProducts from "./components/OutgoingProduct/OutgoingProducts";
import AddOutgoingProduct from "./components/OutgoingProduct/AddOutgoingProduct";
import UpdateOutgoingProduct from "./components/OutgoingProduct/UpdateOutgoingProduct";
import PurchaseProduct from "./components/PurchaseProduct/PurchaseProduct";
import AddPurchaseProduct from "./components/AddPurchaseProduct";
import Dashboard from "./components/dashboard";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
     
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="categories" element={<Categories />} />
          <Route path="items" element={<Items />} />
         
          <Route path="items/create" element={<CreateItem />} />
          <Route path="categories/create" element={<CreateCategory />} />
          <Route path="categories/update/:id" element={<UpdateCategory />} />
          <Route path="items/update/:id" element={<UpdateItem />} />
          <Route path="supplier/create" element={<CreateSupplier />} />
          <Route path="supplier" element={<Supplier />} />
          <Route path="customer" element={<Customer />} />
          <Route path="customer/create" element={<CreateCustomer />} />
          <Route path="supplier/update/:id" element={<UpdateSupplier/>} />
          <Route path="customer/update/:id" element={<UpdateCustomer/>} />
          <Route path="outgoingproduct" element={<OutgoingProducts/>} />
          <Route path="outgoingproduct/add" element={<AddOutgoingProduct/>} />
          <Route path="outgoingproduct/update/:id" element={<UpdateOutgoingProduct/>} />
          <Route path="purchaseproduct" element={<PurchaseProduct/>} />
          <Route path="purchaseproduct/add" element={<AddPurchaseProduct/>} />
          {/* <Route path="dashboard" element={<Dashboard/>} /> */}

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

// export default AppRoutes;

  export default AppRoutes