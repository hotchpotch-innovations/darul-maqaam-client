"use client";
import SelectFilter from "@/components/Dashboard/DashboardFilters/SclectFilter";
import SearchFiled from "@/components/Dashboard/DashboardFilters/SearchFiled";
import {
  useChangeUserStatusMutation,
  useGetAllUsersQuery,
} from "@/redux/api/user/userApi";
import { useDebounced } from "@/redux/hooks";
import { Box, Tooltip, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useState } from "react";
import BlockIcon from "@mui/icons-material/Block";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { toast } from "sonner";
import {
  account_type_options,
  dev_super_admin_user_role_options,
  user_status_options,
} from "@/constants/options";
import { user_status } from "@/constants";
import Loading from "@/components/UI/LoadingBar";

type TQueryObj = {
  account_type?: string;
  role?: string;
  status?: string;
  searchTerm?: string;
  page?: number;
  limit?: number;
};

const AllUserTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [accountType, setAccountType] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userStatus, setUserStatus] = useState("");

  // Debounced search term to avoid too many API requests
  const debouncedTerm = useDebounced({ searchQuery: searchTerm, delay: 600 });

  // Create query object to pass to API call
  const queryObj: TQueryObj = {
    limit,
    page: currentPage, // Sending current page as 1-based to the API
  };

  if (!!debouncedTerm) {
    queryObj["searchTerm"] = debouncedTerm;
  }

  if (!!accountType) {
    queryObj["account_type"] = accountType;
  }

  if (!!userRole) {
    queryObj["role"] = userRole;
  }

  if (!!userStatus) {
    queryObj["status"] = userStatus;
  }

  // Fetch user data using API hook
  const { data, isLoading } = useGetAllUsersQuery({ ...queryObj });

  // Add index field to each user for serial number
  const rowsWithIndex =
    data?.data?.map((row: any, index: number) => ({
      ...row,
      index: (currentPage - 1) * limit + (index + 1),
    })) || [];

  const columns: GridColDef[] = [
    { field: "index", headerName: "SERIAL", width: 100 },
    { field: "gu_id", headerName: "USER ID", flex: 1 },
    { field: "email", headerName: "EMAIL", flex: 2 },
    { field: "role", headerName: "ROLE", flex: 1 },
    { field: "account_type", headerName: "ACCOUNT TYPE", flex: 1 },
    // { field: "status", headerName: "STATUS", flex: 1 },
    {
      field: "status",
      headerName: "STATUS",
      flex: 1,
      valueGetter: (params: any) => (params === "" ? "No" : params),
      renderCell: ({ row }) => (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            gap: 2,
          }}
        >
          <Typography
            sx={{
              alignItems: "left",
              fontSize: "12px",
              ...(row.status === user_status?.activate
                ? { color: "greenyellow" }
                : { color: "orangered" }),
            }}
          >
            {row?.status}
          </Typography>
        </Box>
      ),
    },
    {
      field: "Action",
      headerName: "ACTIONS",
      flex: 0.5,
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Tooltip title={row?.status === "ACTIVATED" ? "Block" : "Active"}>
              <Typography
                sx={{
                  color:
                    row?.status === "ACTIVATED" ? "orangered" : "greenyellow",
                  cursor: "pointer",
                }}
                onClick={() => handleStatus(row?.gu_id)}
              >
                {row?.status === "ACTIVATED" ? <BlockIcon /> : <TaskAltIcon />}
              </Typography>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  // Handle user status change
  const [changeUserStatus] = useChangeUserStatusMutation();

  const handleStatus = async (id: string) => {
    const toastId = toast.loading("Please wait...");
    try {
      const res = await changeUserStatus(id);
      if (res?.data?.success) {
        toast.success(res?.data?.message, { id: toastId, duration: 5000 });
      }
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  // Pagination handler
  const handlePaginationChange = (newPaginationModel: any) => {
    setCurrentPage(newPaginationModel.page + 1); // DataGrid uses 0-based indexing, adjust to 1-based
    setLimit(newPaginationModel.pageSize);
  };
  return (
    <Box sx={{ p: 2 }}>
      {/* Bottom Row: Filters */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, md: 6, lg: 12 }} mt={4}>
          <SearchFiled setSearchText={setSearchTerm} />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <SelectFilter
            filter_title="Search by account type"
            options={account_type_options}
            value={accountType}
            setValue={setAccountType}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <SelectFilter
            filter_title="Search by user role"
            options={dev_super_admin_user_role_options}
            value={userRole}
            setValue={setUserRole}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <SelectFilter
            filter_title="Search by user status"
            options={user_status_options}
            value={userStatus}
            setValue={setUserStatus}
            fullWidth
          />
        </Grid>
      </Grid>

      {!isLoading ? (
        <Box>
          <DataGrid
            rows={rowsWithIndex} // Use the rows with the added index field
            columns={columns}
            pagination
            paginationMode="server" // Use server-side pagination
            pageSizeOptions={[10, 25, 50]}
            rowCount={data?.meta?.total || 0} // Total rows in the database
            paginationModel={{ page: currentPage - 1, pageSize: limit }} // Adjust for 0-based index in DataGrid
            onPaginationModelChange={handlePaginationChange} // Handle pagination changes
            hideFooterPagination={data?.meta?.total < data?.meta?.limit}
            sx={{ border: "none", outline: "none", boxShadow: "none" }}
          />
        </Box>
      ) : (
        <Loading />
      )}
    </Box>
  );
};

export default AllUserTable;
