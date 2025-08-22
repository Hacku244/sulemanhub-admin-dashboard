
import React, { useState } from "react";
import { Box, useTheme, Typography, useMediaQuery, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isSmall = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:900px)");

  // ✅ toggle state
  const [showMore, setShowMore] = useState(false);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.3,
      minWidth: 50,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 120,
      cellClassName: "name-column--cell",
    },
    showMore && {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.4,
      minWidth: 60,
    },
    showMore && {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
      minWidth: 140,
    },
    showMore && !isTablet && {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 180,
    },
    {
      field: "access",
      headerName: "Access Level",
      flex: 1,
      minWidth: 120,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="100%"
            m="auto"
            px={isSmall ? "6px" : "16px"}
            py="4px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius="6px"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : access === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[800]
            }
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon fontSize="small" />}
            {access === "manager" && <SecurityOutlinedIcon fontSize="small" />}
            {access === "user" && <LockOpenOutlinedIcon fontSize="small" />}
            {!isSmall && (
              <Typography color={colors.grey[100]} sx={{ ml: "5px", fontSize: "0.8rem" }}>
                {access}
              </Typography>
            )}
          </Box>
        );
      },
    },
  ].filter(Boolean);

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />

      {/* ✅ Toggle Button */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: colors.greenAccent[600],
            color: colors.grey[100],
            "&:hover": {
              backgroundColor: colors.greenAccent[700],
            },
          }}
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Show Less" : "Show More"}
        </Button>
      </Box>

      <Box
        mt="20px"
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
        }}
      >
        <DataGrid
          checkboxSelection
          rows={mockDataTeam}
          columns={columns}
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default Team;
