import React, { useEffect, useState } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Tabs, Tab } from "@mui/material";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/header";
import { useTheme } from "@mui/material";
import axios from "axios";

// Define the type for the row data
interface Product {
  ProductID: number;
  Price: number;
  ProductName: string;
}

const Contacts: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [selectedMonth, setSelectedMonth] = useState<number>(0);

  useEffect(() => {
    // Fetch data from the backend
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    setSelectedYear(Number(event.target.value));
  };
  const handleMonthChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedMonth(newValue);
  };

  // Define columns with type annotation
  const columns: GridColDef[] = [
    { field: "ProductID", headerName: "Product ID", flex: 0.5 },
    { field: "ProductName", headerName: "Product Name", flex: 1 },
    {
      field: "Price",
      headerName: "Price",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="PRODUCTS"
        subtitle="List of Products"
      />
      <FormControl variant="filled" sx={{ minWidth: 120, mb: 2 }}>
        <InputLabel id="select-year-label">Year</InputLabel>
        <Select
          labelId="select-year-label"
          id="select-year"
          value={selectedYear}
          onChange={handleYearChange}
        >
          <MenuItem value={2022}>2022</MenuItem>
          <MenuItem value={2023}>2023</MenuItem>
          <MenuItem value={2024}>2024</MenuItem>
        </Select>
      </FormControl>

      <Tabs
        value={selectedMonth}
        onChange={handleMonthChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="month tabs"
      >
        <Tab label="January" />
        <Tab label="February" />
        <Tab label="March" />
        <Tab label="April" />
        <Tab label="May" />
        <Tab label="June" />
        <Tab label="July" />
        <Tab label="August" />
        <Tab label="September" />
        <Tab label="October" />
        <Tab label="November" />
        <Tab label="December" />
      </Tabs>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={products}
          columns={columns}
          getRowId={(row) => row.ProductID} // Use the correct field name with proper casing
          slots={{
            toolbar: GridToolbar,
          }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
