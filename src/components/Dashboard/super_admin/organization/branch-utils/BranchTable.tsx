"use client";

import { user_status } from "@/constants";
import {
  useChangeBranchStatusMutation,
  useDeleteBranchMutation,
  useGetAllPrivateBranchQuery,
} from "@/redux/api/organization/branchApi";
import { useDebounced } from "@/redux/hooks";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import Grid from "@mui/material/Grid2";
import SearchFiled from "@/components/Dashboard/DashboardFilters/SearchFiled";
import SelectFilter from "@/components/Dashboard/DashboardFilters/SclectFilter";
import { user_status_options } from "@/constants/options";
import Loading from "@/components/UI/LoadingBar";
import MoreActionsMenu from "@/components/Dashboard/common/moreActionsMenu/MoreActionsMenu";
import { useRouter } from "next/navigation";

type TQueryObj = {
  status?: string;
  searchTerm?: string;
  page?: number;
  limit?: number;
};
const BranchTable = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");

  const path = "/dashboard/super_admin/organization/settings/branch/update";

  // Debounced search term to avoid too many API requests
  const debouncedTerm: any = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  // Create query object to pass to API call
  const queryObj: TQueryObj = {
    limit,
    page: currentPage, // Sending current page as 1-based to the API
  };

  if (!!debouncedTerm) {
    queryObj["searchTerm"] = debouncedTerm;
  }
  if (!!status) {
    queryObj["status"] = status;
  }

  // Fetch Admin data using API hook
  const { data, isLoading } = useGetAllPrivateBranchQuery({
    ...queryObj,
  });

  // index and also Role field to each user for serial number

  const branch_data =
    data?.data?.data?.map((row: any, index: number) => ({
      ...row,
      index: (currentPage - 1) * limit + (index + 1),
      role: row?.user?.role,
    })) || [];

  const columns: GridColDef[] = [
    { field: "index", headerName: "SERIAL", width: 100 },
    {
      field: "name",
      headerName: "NAME",
      flex: 1.5,
    },
    {
      field: "email",
      headerName: "EMAIL",
      flex: 1.5,
    },
    {
      field: "primary_phone",
      headerName: "PHONE",
      flex: 1,
    },
    {
      field: "primary_tel",
      headerName: "TELEPHONE",
      flex: 1,
    },

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
      headerAlign: "center", // Horizontally center the header
      align: "center",
      renderCell: ({ row }) => (
        <MoreActionsMenu
          onEdit={() => router.push(`${path}/${row?.id}`)}
          onDelete={() => handleDelete(row?.id)}
          onStatusChange={() => statusHandler(row.id)}
          isActive={row?.status === "ACTIVATED"}
          isDeleted={row?.isDeleted}
        />
      ),
    },
  ];

  // Handle user status change
  const [deleteBranch] = useDeleteBranchMutation();
  const [changeStatus] = useChangeBranchStatusMutation();

  const handleDelete = async (id: string) => {
    console.log({ id });
    const toastId = toast.loading("Please wait...");
    try {
      const res = await deleteBranch(id);
      if (res?.data?.success) {
        toast.success(res?.data?.message, { id: toastId, duration: 5000 });
      }
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  const statusHandler = async (id: string) => {
    console.log({ id });
    const toastId = toast.loading("Please wait...");
    try {
      const res = await changeStatus(id);
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
      <Grid container spacing={2}>
        {/* Create button */}
        <Grid size={{ xs: 4, lg: 2 }} mt={4}>
          <Button
            component={Link}
            href={"/dashboard/super_admin/organization/settings/branch/create"}
            sx={{
              maxHeight: "40px",
              width: {
                xs: "100%",
                md: "70%",
              },
            }}
          >
            Create
          </Button>
        </Grid>
        {/* Search box */}
        <Grid size={{ xs: 8, lg: 5 }} mt={4}>
          <SearchFiled setSearchText={setSearchTerm} />
        </Grid>

        {/* Filtering */}
        <Grid size={{ xs: 12, lg: 5 }}>
          <SelectFilter
            filter_title="Filter by status"
            options={user_status_options}
            value={status}
            setValue={setStatus}
            fullWidth={true}
          />
        </Grid>
      </Grid>

      {!isLoading ? (
        <Box>
          <DataGrid
            rows={branch_data}
            columns={columns}
            pagination
            paginationMode="server"
            pageSizeOptions={[10, 25, 50]}
            rowCount={data?.meta?.total}
            paginationModel={{ page: currentPage - 1, pageSize: limit }}
            onPaginationModelChange={handlePaginationChange}
            hideFooterPagination={
              data?.data?.meta?.total < data?.data?.meta?.limit
            }
            sx={{ border: "none", outline: "none", boxShadow: "none" }}
          />
        </Box>
      ) : (
        <Loading />
      )}
    </Box>
  );
};

export default BranchTable;
