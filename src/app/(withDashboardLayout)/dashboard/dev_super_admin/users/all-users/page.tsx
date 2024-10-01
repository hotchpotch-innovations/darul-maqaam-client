"use client";

import {
  useChangeUserStatusMutation,
  useGetAllUsersQuery,
} from "@/redux/api/user/userApi";
import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, Stack, Typography } from "@mui/material";
import TitleDashboard from "@/components/dashboard/TitleDashboard";
import SelectFilter from "@/components/dashboard/dashboardFilter/SclectFilter";

import SearchFiled from "@/components/dashboard/dashboardFilter/SearchFiled";
import BlockIcon from "@mui/icons-material/Block";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { toast } from "sonner";
import {
  account_type_options,
  dev_super_admin_user_role_options,
  user_status_options,
} from "@/constants/options";

const AllUserPage = () => {
  const queryObj = {};
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [accountType, setAccountType] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userStatus, setUserStatus] = useState("");
  console.log({ accountType, userRole, userStatus });

  const [searchText, setSearchText] = useState("");

  const { data, isLoading } = useGetAllUsersQuery({});

  // Add index field to each user for serial number
  const rowsWithIndex = data?.data?.map((row: any, index: number) => ({
    ...row,
    index: index + 1, // This will give you a 1-based index for each row
  }));

  const columns: GridColDef[] = [
    { field: "index", headerName: "SERIAL", width: 100 },
    { field: "gu_id", headerName: "USER ID", flex: 1 },
    { field: "email", headerName: "EMAIL", flex: 2 },
    { field: "role", headerName: "ROLE", flex: 1 },
    { field: "status", headerName: "STATUS", flex: 1 },
    { field: "account_type", headerName: "ACCOUNT TYPE", flex: 1 },
    {
      field: "Action",
      headerName: "ACTIONS",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center", // Vertically center
              justifyContent: "center", // Horizontally center
              width: "100%", // Make sure it takes up the full cell width
              height: "100%", // Ensure it takes up the full cell height
            }}
          >
            <Typography
              sx={{
                color: row?.status === "ACTIVATED" ? "red" : "green",
                cursor: "pointer",
                outline: "none",
                border: "none",
                boxShadow: "none",
              }}
              onClick={() => handleStatus(row?.gu_id)}
            >
              {row?.status === "ACTIVATED" ? <BlockIcon /> : <TaskAltIcon />}
            </Typography>
          </Box>
        );
      },
    },

    // other columns...
  ];

  // const paginationModel = { page: 0, pageSize: 5 };
  const [changeUserStatus] = useChangeUserStatusMutation();

  const handleStatus = async (id: string) => {
    const toastId = toast.loading("Pleace wait...");

    try {
      const res = await changeUserStatus(id);

      if (res?.data?.success) {
        toast.success(res?.data?.message, { id: toastId, duration: 5000 });
      }
    } catch (err: any) {
      toast.error(err?.message);
      console.log(err);
    }
  };

  // Pageination Section
  const handlePaginationChange = (newPaginationModel: any) => {
    setPaginationModel(newPaginationModel);
    console.log("Current Page:", newPaginationModel.page); // You can use this to get the page
    console.log("Page Size Options:", newPaginationModel.pageSize); // You can use this to get the page
  };

  return (
    <Box>
      <TitleDashboard title="All Users List" />

      <Box
        sx={{
          m: "30px 60px",
        }}
      >
        <Stack direction={"row"} justifyContent={"space-between"} mb={2}>
          <SelectFilter
            filter_title="Search by account type"
            options={account_type_options}
            value={accountType}
            setValue={setAccountType}
          />
          <SelectFilter
            filter_title="Search by user role"
            options={dev_super_admin_user_role_options}
            value={userRole}
            setValue={setUserRole}
          />
          <SelectFilter
            filter_title="Search by user status"
            options={user_status_options}
            value={userStatus}
            setValue={setUserStatus}
          />
          <SearchFiled setSearchText={setSearchText} />
        </Stack>
        {!isLoading ? (
          <Box>
            <DataGrid
              rows={rowsWithIndex} // Use the rows with added index field
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 100]}
              rowCount={data?.meta?.total}
              onPaginationModelChange={handlePaginationChange} // Handle pagination changes
              sx={{ border: "none", outline: "none", boxShadow: "none" }}
            />
          </Box>
        ) : (
          <Typography>Loading...!!!</Typography>
        )}
      </Box>
    </Box>
  );
};

export default AllUserPage;
