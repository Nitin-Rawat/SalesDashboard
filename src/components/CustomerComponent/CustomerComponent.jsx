import React from "react";
import { ChakraProvider, Box, Heading, Text } from "@chakra-ui/react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Fetch function
const fetchCustomerData = async () => {
  const response = await fetch(
    "09SalesDashbordProject/src/components/Data/Data.json"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

// Customer Component
const CustomerComponent = () => {
  const { data, error, isLoading } = useQuery(
    ["customerData"],
    fetchCustomerData
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const customer = data.customer;
  const product = data.product;
  const saleOrder = data.sale_order;

  return (
    <Box>
      <Box>
        <Heading as="h3">Customer Details</Heading>
        <Text>Name: {customer.profile.name}</Text>
        <Text>Email: {customer.profile.email}</Text>
        <Text>Location: {customer.profile.location_name}</Text>
      </Box>

      <Box>
        <Heading as="h3">Product Details</Heading>
        <Text>Product Name: {product.name}</Text>
        <Text>Category: {product.category}</Text>
        <Text>Brand: {product.brand}</Text>
      </Box>

      <Box>
        <Heading as="h3">Sale Order</Heading>
        <Text>Invoice No: {saleOrder.invoice_no}</Text>
        <Text>Invoice Date: {saleOrder.invoice_date}</Text>
      </Box>
    </Box>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <ChakraProvider>
    <QueryClientProvider client={queryClient}>
      <CustomerComponent />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </ChakraProvider>
);

export default App;
