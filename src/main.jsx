
import './index.css';
import * as React from "react";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';
import Login from './components/Login/Login';
import Orders from './components/Orders/Orders'
import Theme from "./components/Theme/Theme";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import SaleOrderForm from "./components/Orders/SaleOrderForm"
import SaleOrderFormModal from "./components/Orders/SaleOrderFormModal"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="" element={<Login />} />
      <Route path="orders" element={<Orders />} />
      <Route path="SaleOrderForm" element={<SaleOrderForm />} />
      <Route path="SaleOrderFormModal" element={<SaleOrderFormModal />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={Theme}>
      <ColorModeScript initialColorMode={Theme.config.initialColorMode} />
      <RouterProvider router={router} />
      <ThemeToggle />
    </ChakraProvider>
  </React.StrictMode>
);
