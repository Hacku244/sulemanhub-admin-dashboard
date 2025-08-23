
     
import { useState, useEffect } from "react";
import {
  Box,
  useTheme,
  Typography,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isSmall = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:900px)");

  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch("https://dummyjson.com/users");
        if (!response.ok) throw new Error("Failed to fetch invoices");
        const data = await response.json();

        const mappedData = data.users.map((user) => ({
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          phone: user.phone,
          email: user.email,
          cost: parseFloat((Math.random() * 1000).toFixed(2)),
        }));

        setInvoices(mappedData);
        setFilteredInvoices(mappedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  // Search/filter function including cost
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

    const filtered = invoices.filter(
      (invoice) =>
        invoice.name.toLowerCase().includes(value) ||
        invoice.email.toLowerCase().includes(value) ||
        invoice.phone.toLowerCase().includes(value) ||
        invoice.cost.toString().includes(value)
    );
    setFilteredInvoices(filtered);
  };

  // Helper to highlight matched text
  const highlightText = (text) => {
    if (!searchText) return text;
    const regex = new RegExp(`(${searchText})`, "gi");
    const parts = text.toString().split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} style={{ backgroundColor: "#fffa65" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.4, minWidth: 60 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => <span>{highlightText(params.row.name)}</span>,
    },
    !isSmall && {
      field: "phone",
      headerName: "Phone",
      flex: 1,
      minWidth: 140,
      renderCell: (params) => <span>{highlightText(params.row.phone)}</span>,
    },
    !isTablet && {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 180,
      renderCell: (params) => <span>{highlightText(params.row.email)}</span>,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 0.7,
      minWidth: 100,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {highlightText(`$${params.row.cost}`)}
        </Typography>
      ),
    },
  ].filter(Boolean); //  remove false columns

  if (loading) return <p>Loading invoices...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box m="20px">
      <Typography variant="h2" color={colors.grey[100]} fontWeight="600">
        Invoices
      </Typography>

      {/* Search input responsive */}
      <TextField
        label="Search Invoices"
        variant="outlined"
        value={searchText}
        onChange={handleSearch}
        sx={{
          mb: 2,
          width: isSmall ? "100%" : "300px",
        }}
      />

      <Box
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .name-column--cell": { color: colors.greenAccent[300] },
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
        }}
      >
        <DataGrid
          checkboxSelection
          rows={filteredInvoices}
          columns={columns}
          disableRowSelectionOnClick
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
        />
      </Box>
    </Box>
  );
};

export default Invoices;
