import React, { useState, useEffect } from "react";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import { EditIcon, AddIcon } from "@chakra-ui/icons";
import SaleOrderFormModal from "./SaleOrderFormModal"; // Assuming this is your modal component

const Orders = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ order: null, readOnly: false });
  const [activeOrders, setActiveOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([
    { id: 11908, customer: "Ram", price: 100, lastModified: "15-06-2024" },
  ]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/Data/Data.json");
        const orders = await response.json();

        const active = orders.filter((order) => !order.completed);
        const completed = orders.filter((order) => order.completed);

        setActiveOrders(active);
        setCompletedOrders(completed);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleOpenModal = (order = null, readOnly = false) => {
    setModalData({ order, readOnly });
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

  const handleSubmit = (data, isEditMode) => {
    const newOrder = {
      id: isEditMode ? data.id : activeOrders.length + 1,
      customer: data.customer,
      price: data.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
      lastModified: new Date().toLocaleDateString("en-GB"),
    };

    if (isEditMode) {
      setActiveOrders(
        activeOrders.map((order) => (order.id === data.id ? newOrder : order))
      );
    } else {
      setActiveOrders([...activeOrders, newOrder]);
    }

    handleCloseModal();
  };

  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  const renderTable = (orders, readOnly) => {
    if (isSmallScreen) {
      return orders.map((order) => (
        <Flex
          key={order.id}
          direction="column"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          mb={4}
          p={4}
        >
          <Flex justifyContent="space-between">
            <Box fontWeight="bold">ID:</Box>
            <Box>{order.id}</Box>
          </Flex>
          <Flex justifyContent="space-between">
            <Box fontWeight="bold">Name:</Box>
            <Box>{order.customer}</Box>
          </Flex>
          <Flex justifyContent="space-between">
            <Box fontWeight="bold">Price:</Box>
            <Box>{order.price}</Box>
          </Flex>
          <Flex justifyContent="space-between">
            <Box fontWeight="bold">Last Modified:</Box>
            <Box>{order.lastModified}</Box>
          </Flex>
          <Flex justifyContent="space-between">
            <Box fontWeight="bold">Edit/View:</Box>
            <IconButton
              icon={<EditIcon />}
              onClick={() => handleOpenModal(order, readOnly)}
              size="sm"
            />
          </Flex>
        </Flex>
      ));
    }

    return (
      <Table variant="striped" size="md">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Customer Name</Th>
            <Th>Price</Th>
            <Th>Last Modified</Th>
            <Th>Edit/View</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((order) => (
            <Tr key={order.id}>
              <Td>{order.id}</Td>
              <Td>{order.customer}</Td>
              <Td>{order.price}</Td>
              <Td>{order.lastModified}</Td>
              <Td>
                <IconButton
                  icon={<EditIcon />}
                  onClick={() => handleOpenModal(order, readOnly)}
                  size="sm"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
  };

  return (
    <Box
      height="100vh"
      width="100vw"
      maxWidth={{ base: "90vw", sm: "90vw", md: "90vw", lg: "90vw" }}
      paddingLeft={{ base: "sm", md: 10, lg: 20 }}
      paddingTop={58}
      backgroundAttachment="fixed"
      overflow="hidden"
    >
      <Tabs isFitted variant="enclosed" colorScheme="green" isLazy>
        <TabList
          spacing={{ base: 1, md: 20, lg: 40 }}
          size={{ base: "1vw", md: "md", lg: "lg" }}
          gap={{ base: "1vw", md: "md", lg: "lg" }}
        >
          <Tab>Active</Tab>
          <Tab>Completed</Tab>
          <Tab onClick={() => handleOpenModal()}>
            <AddIcon /> Order
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel height="70vh" overflowY="auto">
            {renderTable(activeOrders, false)}
          </TabPanel>
          <TabPanel height="70vh" overflowY="auto">
            {renderTable(completedOrders, true)}
          </TabPanel>
        </TabPanels>
      </Tabs>
      <SaleOrderFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={(data) => handleSubmit(data, !!modalData.order)}
        defaultValues={modalData.order}
        readOnly={modalData.readOnly}
      />
    </Box>
  );
};

export default Orders;
