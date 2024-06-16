import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import { useForm, useFieldArray } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

// Sample product data
const productData = [
  { id: "product1", name: "Product 1", sku: "SKU1", price: 100 },
  { id: "product2", name: "Product 2", sku: "SKU2", price: 150 },
  { id: "product3", name: "Product 3", sku: "SKU3", price: 150 },
  { id: "product4", name: "Product 4", sku: "SKU4", price: 150 },
  { id: "product5", name: "Product 5", sku: "SKU5", price: 150 },

];

const SaleOrderFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
  readOnly,
}) => {
  const { register, handleSubmit, setValue, control, watch } = useForm({
    defaultValues: {
      items: defaultValues?.items || [],
      ...defaultValues,
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "items" });
  const invoiceDate = watch("invoice_date");
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    if (defaultValues) {
      for (const [key, value] of Object.entries(defaultValues)) {
        setValue(key, value);
      }
    }
  }, [defaultValues, setValue]);


  useEffect(() => {
    const newItems = selectedProducts.map((productId) => {
      const product = productData.find((p) => p.id === productId);
      return {
        productId: product.id,
        skuId: product.sku,
        quantity: 0,
        price: product.price,
        remaining: product.remaining,
      };
    });
    newItems.forEach((item) => append(item));
  }, [selectedProducts, append]);

  const calculateTotal = (data) => {
    const total = data.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalAmount(total);
  };

  const onSubmitForm = (data) => {
    calculateTotal(data);
    onSubmit(data);
    onClose();
  };

  const handleProductSelect = (selectedOptions) => {
    setSelectedProducts(selectedOptions.map((option) => option.value));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sale Order Form</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <ModalBody>
            <Grid
              templateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(4, 1fr)",
                xl: "repeat(5, 1fr)",
              }}
              gap={8}
            >
              <GridItem colSpan={1}>
                <FormControl id="customer" isRequired>
                  <FormLabel>Customer Name</FormLabel>
                  <Input
                    {...register("customer")}
                    placeholder="Customer Name"
                    isReadOnly={readOnly}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={1}>
                <FormControl id="invoice_date" isRequired>
                  <FormLabel>Invoice Date</FormLabel>
                  <Box
                    className="react-datepicker"
                    sx={{
                      ".react-datepicker__input-container input": {
                        width: "100%",
                        padding: "8px 12px",
                        fontSize: "16px",
                        border: "1px solid",
                        borderColor: "gray.300",
                        borderRadius: "md",
                      },
                    }}
                  >
                    <DatePicker
                      selected={invoiceDate}
                      onChange={(date) => setValue("invoice_date", date)}
                      dateFormat="dd/MM/yyyy"
                      customInput={<Input isReadOnly={readOnly} />}
                    />
                  </Box>
                </FormControl>
              </GridItem>
            </Grid>
            <FormControl id="products" isRequired mt={4}>
              <FormLabel>Select Products</FormLabel>
              <Box color={"black"}>
                <Select
                  isMulti
                  options={productData.map((product) => ({
                    value: product.id,
                    label: product.name,
                  }))}
                  onChange={handleProductSelect}
                  isDisabled={readOnly}
                />
              </Box>
            </FormControl>
            <Grid
              templateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(4, 1fr)",
                xl: "repeat(6, 1fr)",
              }}
              gap={6}
              mt={4}
            >
              {fields.map((item, index) => (
                <React.Fragment key={item.id}>
                  <GridItem colSpan={1}>
                    <FormControl isRequired>
                      <FormLabel>Product</FormLabel>
                      <Input
                        value={
                          productData.find(
                            (product) => product.id === item.productId
                          )?.name || ""
                        }
                        isReadOnly={true}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <FormControl isRequired>
                      <FormLabel>SKU</FormLabel>
                      <Input
                        {...register(`items[${index}].skuId`)}
                        isReadOnly={true}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <FormControl isRequired>
                      <FormLabel>Price</FormLabel>
                      <Input
                        {...register(`items[${index}].price`)}
                        isReadOnly={true}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <FormControl isRequired>
                      <FormLabel>Quantity</FormLabel>
                      <Input
                        type="number"
                        {...register(`items[${index}].quantity`)}
                        placeholder="Quantity"
                        isReadOnly={readOnly}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <FormControl isRequired>
                      <FormLabel>Remaining</FormLabel>
                      <Input
                        value={
                          productData.find(
                            (product) => product.id === item.productId
                          )?.remaining || ""
                        }
                        isReadOnly={true}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Button
                      mt={8}
                      colorScheme="red"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </Button>
                  </GridItem>
                </React.Fragment>
              ))}
            </Grid>
          </ModalBody>
          <ModalFooter>
            <Text mr={3}>Total Amount: ${totalAmount}</Text>
            <Button type="submit" colorScheme="blue" mr={3}>
              Submit
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default SaleOrderFormModal;
