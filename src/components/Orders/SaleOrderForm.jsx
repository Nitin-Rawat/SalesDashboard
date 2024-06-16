
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  Box,
  Grid,
  GridItem,
  
} from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";

const SaleOrderForm = ({ onSubmit, defaultValues, readOnly }) => {
  const { register, handleSubmit, setValue, watch } = useForm();

  // const invoiceDate = watch("invoice_date");


   useEffect(() => {
     if (defaultValues) {
       for (const [key, value] of Object.entries(defaultValues)) {
         setValue(key, value);
       }
     }
   }, [defaultValues, setValue]);

   
  useEffect(() => {
    const storeData = JSON.parse(sessionStorage.getItem("SaleOrderForm"));
    if (storeData) {
      for (const [key, value] of Object.entries(storeData)) {
        setValue(key, value);
      }
    }
  }, [setValue]);

  useEffect(() => {
    const subsCribe = watch((value) => {
      sessionStorage.getItem("SaleOrderForm", JSON.stringify(value));
    });

    return () => subsCribe.unsubscribe();
  }, [watch]);

  const onSubmitForm = (data) => {
    console.log(data); 
    onSubmit(data);
  };

  return (
    <Box>
   
    </Box>
  );
};

export default SaleOrderForm;


