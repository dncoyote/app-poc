import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/header";
import { useState } from "react";
import axios from "axios";

interface ProductFormValues {
  productName: string;
  price: string;
}

const ProductForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [formStatus, setFormStatus] = useState<string>("");

  const handleFormSubmit = async (values: ProductFormValues) => {
    try {
      const response = await axios.post("http://localhost:5000/api/products", {
        price: parseFloat(values.price),
        productName: values.productName,
      });
      console.log("Product created:", response.data);
      setFormStatus("Product created successfully!");
    } catch (error) {
      console.error("Error creating product:", error);
      setFormStatus("Error creating product.");
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE PRODUCT" subtitle="Create a New Product" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Product Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.productName}
                name="productName"
                error={!!touched.productName && !!errors.productName}
                helperText={touched.productName && errors.productName}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
                name="price"
                error={!!touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Product
              </Button>
            </Box>
            {formStatus && <Box mt="20px">{formStatus}</Box>}
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  productName: yup.string().required("required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("required")
    .positive("Price must be a positive number"),
});

const initialValues: ProductFormValues = {
  productName: "",
  price: "",
};

export default ProductForm;
