import React, { useEffect, useState } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Tabs, Tab } from "@mui/material";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/header";
import { useTheme } from "@mui/material";
import axios from "axios";

// Define the type for the row data
interface Statement {
  id: string;
  Category: string;
  Type: 'SALARY' | 'CREDIT' | 'DEBIT';
  Amount: number;
  Description: string;
  Date: string; // We will display Date as a string in the DataGrid
}

const GoogleSheetsListStatement: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [statements, setStatements] = useState<Statement[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [selectedMonth, setSelectedMonth] = useState<number>(0);

  useEffect(() => {
    // Fetch data from the backend
    const fetchStatements = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/statementSheets");
        setStatements(response.data);
      } catch (error) {
        console.error("Error fetching statements:", error);
      }
    };

    fetchStatements();
  }, [selectedYear, selectedMonth]);

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    setSelectedYear(Number(event.target.value));
  };

  const handleMonthChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedMonth(newValue);
  };

  // Define columns with type annotation
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "Category", headerName: "Category", flex: 1 },
    { 
      field: "Type", 
      headerName: "Type", 
      flex: 1,
      renderCell: (params) => (
        <Box
          color={
            params.value === "SALARY"
              ? colors.blueAccent[400]
              : params.value === "CREDIT"
              ? colors.greenAccent[400]
              : colors.redAccent[400]
          }
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "Amount",
      headerName: "Amount",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
      renderCell: (params) => `₹${params.value}`, // Prepend rupee symbol
    },
    { field: "Description", headerName: "Description", flex: 1 },
    { 
      field: "Date", 
      headerName: "Date", 
      flex: 1,
      renderCell: (params) => new Date(params.value).toLocaleDateString(), // Format the date
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="STATEMENTS"
        subtitle="List of Statements from Google Sheets"
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
          rows={statements}
          columns={columns}
          getRowId={(row) => row.id}
          slots={{
            toolbar: GridToolbar,
          }}
        />
      </Box>
    </Box>
  );
};

export default GoogleSheetsListStatement;
