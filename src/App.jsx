

import React from "react";
import { Outlet } from "react-router-dom";
import ThemeToggle from "./components/ThemeToggle";
import SaleOrderFormModal from "./components/Orders/SaleOrderFormModal"



const App = () => {
  return (
    <div>
      <SaleOrderFormModal/>
      <ThemeToggle />
      <Outlet />
    </div>
  );
};

export default App;
