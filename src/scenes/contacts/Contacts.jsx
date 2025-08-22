
import { useRef, useMemo } from "react";
import {
  Box,
  useTheme,
  Button,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";
import { CSVLink } from "react-csv";
import { useReactToPrint } from "react-to-print";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const printRef = useRef();
  const isSmallScreen = useMediaQuery("(max-width:768px)");

  // ✅ Table columns with responsive hiding
  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "ID", size: 60 },
      { accessorKey: "registrarId", header: "Registrar ID", size: 100 },
      { accessorKey: "name", header: "Name", size: 140 },
      { accessorKey: "age", header: "Age", size: 60 },
      !isSmallScreen && {
        accessorKey: "phone",
        header: "Phone Number",
        size: 150,
      },
      !isSmallScreen && { accessorKey: "email", header: "Email", size: 180 },
      { accessorKey: "address", header: "Address", size: 180 },
      !isSmallScreen && { accessorKey: "city", header: "City", size: 120 },
      !isSmallScreen && { accessorKey: "zipCode", header: "Zip Code", size: 100 },
    ].filter(Boolean),
    [isSmallScreen]
  );

  const muiButtonStyle = {
    backgroundColor: colors.blueAccent[700],
    color: colors.grey[100],
    textTransform: "none",
    fontWeight: "600",
    "&:hover": { backgroundColor: colors.blueAccent[500] },
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Contacts",
  });

  return (
    <Box m="20px">
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
      />

      {/* Toolbar with priority buttons */}
      <Box
        display="flex"
        justifyContent="flex-end"
        gap="10px"
        flexWrap="wrap"
        mb={2}
      >
        {/* Export CSV */}
        <CSVLink
          data={mockDataContacts}
          filename="contacts.csv"
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="contained"
            sx={muiButtonStyle}
            startIcon={<DownloadIcon />}
          >
            Export CSV
          </Button>
        </CSVLink>

        {/* Print */}
        <Button
          variant="contained"
          sx={muiButtonStyle}
          startIcon={<PrintIcon />}
          onClick={handlePrint}
        >
          Print
        </Button>
      </Box>

      {/* Responsive container */}
      <Box
        ref={printRef}
        sx={{
          width: "100%",
          maxWidth: "1400px",
          height: "calc(100vh - 180px)",
          overflowX: "auto",
          overflowY: "auto",
          m: "0 auto",
        }}
      >
        <MaterialReactTable
          columns={columns}
          data={mockDataContacts}
          enableColumnActions
          enableColumnFilters
          enableSorting
          enablePagination
          enableRowNumbers
          enableDensityToggle
          enableColumnResizing
          enableFullScreenToggle
          layoutMode={isSmallScreen ? "grid" : "table"} // ✅ grid on small screens
          displayColumnDefOptions={{
            "mrt-row-numbers": { enableHiding: false },
          }}
          muiTablePaperProps={{
            sx: {
              width: "100%",
              backgroundColor: colors.primary[400],
              color: colors.grey[100],
            },
          }}
          muiTableHeadCellProps={{
            sx: {
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontWeight: "bold",
            },
          }}
          muiTableBodyCellProps={{
            sx: { borderBottom: `1px solid ${colors.grey[700]}` },
          }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
