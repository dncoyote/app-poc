import { Box, Button, TextField, Snackbar, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/header";
import { useState } from "react";
import axios from "axios";
import MuiAlert, { AlertProps } from '@mui/material/Alert';

// Alert component for Snackbar
const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

interface StatementFormValues {
  category: string;
  type: string;
  amount: string;
  description: string;
  date: string;
}

const StatementForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [formStatus, setFormStatus] = useState<string>("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleFormSubmit = async (values: StatementFormValues) => {
    try {
      const response = await axios.post("http://localhost:5000/api/statements", {
        category: values.category,
        type: values.type,
        amount: parseFloat(values.amount),
        description: values.description,
        date: values.date,
      });
      console.log("Statement created:", response.data);
      setFormStatus("Statement created successfully!");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error creating statement:", error);
      setFormStatus("Error creating statement.");
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box m="20px">
      <Header title="CREATE STATEMENT" subtitle="Create a New Statement" />

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
                label="Category"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.category}
                name="category"
                error={!!touched.category && !!errors.category}
                helperText={touched.category && errors.category}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                select
                variant="filled"
                label="Type"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.type}
                name="type"
                error={!!touched.type && !!errors.type}
                helperText={touched.type && errors.type}
                sx={{ gridColumn: "span 4" }}
              >
                <MenuItem value="SALARY">Salary</MenuItem>
                <MenuItem value="CREDIT">Credit</MenuItem>
                <MenuItem value="DEBIT">Debit</MenuItem>
              </TextField>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Amount"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.amount}
                name="amount"
                error={!!touched.amount && !!errors.amount}
                helperText={touched.amount && errors.amount}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.date}
                name="date"
                error={!!touched.date && !!errors.date}
                helperText={touched.date && errors.date}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Statement
              </Button>
            </Box>
            {formStatus && <Box mt="20px">{formStatus}</Box>}
            <Snackbar
              open={openSnackbar}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
            >
              <Alert onClose={handleCloseSnackbar} severity="success">
                {formStatus}
              </Alert>
            </Snackbar>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  category: yup.string().required("required"),
  type: yup.string().required("required"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .required("required")
    .positive("Amount must be a positive number"),
  description: yup.string().required("required"),
  date: yup.date().required("required"),
});

const initialValues: StatementFormValues = {
  category: "",
  type: "",
  amount: "",
  description: "",
  date: "",
};

export default StatementForm;
