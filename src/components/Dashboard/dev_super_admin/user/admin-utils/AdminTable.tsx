"use client";
import SelectFilter from "@/components/Dashboard/DashboardFilters/SclectFilter";
import SearchFiled from "@/components/Dashboard/DashboardFilters/SearchFiled";
import Loading from "@/components/ui/LoadingBar";
import { useDepartmentOptions } from "@/hooks/useDepartmentOptions";
import { useDesignationOptions } from "@/hooks/useDesignationOptions";
import { useDebounced } from "@/redux/hooks";
import { Box, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Image from "next/image";
import React, { MouseEvent, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import RestoreIcon from "@mui/icons-material/Restore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { toast } from "sonner";
import Link from "next/link";
import {
  useDeleteAdminMutation,
  useGetAllAdminQuery,
} from "@/redux/api/user/adminApi";
import { useRouter } from "next/navigation";

type TQueryObj = {
  designationId?: string;
  departmentId?: string;
  searchTerm?: string;
  page?: number;
  limit?: number;
};

const AdminTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentId, setDepartment] = useState("");
  const [designationId, setDesignation] = useState("");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>, row: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter();

  const path = "/dashboard/dev_super_admin/users/admin/update";

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

  if (debouncedTerm) {
    queryObj["searchTerm"] = debouncedTerm;
  }

  if (departmentId) {
    queryObj["departmentId"] = departmentId;
  }
  if (designationId) {
    queryObj["designationId"] = designationId;
  }

  const { options: department_options, isLoading: department_isLoading } =
    useDepartmentOptions();

  const { options: designation_options, isLoading: designation_isLoading } =
    useDesignationOptions(queryObj);
  // Fetch Admin data using API hook
  const { data, isLoading } = useGetAllAdminQuery({ ...queryObj });

  // index and also Role field to each user for serial number

  const admin_data =
    data?.data?.map((row: any, index: number) => ({
      ...row,
      index: (currentPage - 1) * limit + (index + 1),
      role: row?.user?.role,
    })) || [];

  const columns: GridColDef[] = [
    {
      field: "index",
      headerName: "SERIAL",
      disableColumnMenu: true,
      width: 100,
    },
    {
      field: "profile_image",
      headerName: "IMAGE",
      disableColumnMenu: true,
      sortable: false,
      flex: 0.5,
      renderCell: (params) => (
        <Image
          src={params.row.profile_image}
          alt="profile"
          width={50}
          height={50}
        />
      ),
    },
    {
      field: "gu_id",
      headerName: "USER ID",
      flex: 1,
      renderCell: (params) => (
        <Box
          component={Link}
          href={`/dashboard/dev_super_admin/users/admin/details/${params.row.id}`}
          sx={{
            ":hover": {
              textDecoration: "underline",
              color: "#1f68de",
            },
          }}
        >
          {params?.row?.gu_id}
        </Box>
      ),
    },
    {
      field: "name",
      headerName: "NAME",
      flex: 1,
      renderCell: (params) => (
        <Box
          component={Link}
          href={`/dashboard/dev_super_admin/users/admin/details/${params.row.id}`}
          sx={{
            ":hover": {
              textDecoration: "underline",
              color: "#1f68de",
            },
          }}
        >
          {params?.row?.name}
        </Box>
      ),
    },
    { field: "email", headerName: "EMAIL", flex: 1.5 },
    { field: "role", headerName: "ROLE", flex: 1 },
    { field: "phone", headerName: "PHONE", flex: 1 },
    {
      field: "isDeleted",
      headerName: "Is DELETED",
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
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
          <Box
            sx={{
              alignItems: "left",
              fontSize: "12px",
              ...(!row.isDeleted
                ? { color: "greenyellow" }
                : { color: "orangered" }),
            }}
          >
            {row?.isDeleted ? "YES" : "NO"}
          </Box>
        </Box>
      ),
    },
    {
      field: "Action",
      headerName: "ACTIONS",
      flex: 1,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      sortable: false,
      renderCell: ({ row }) => (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Tooltip title="More Actions">
            <IconButton
              aria-controls="action-menu"
              aria-haspopup="true"
              onClick={(event) => handleClick(event, row)}
            >
              <MoreVertIcon />
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={() => router.push(`${path}/${row?.id}`)}>
              <EditIcon sx={{ mr: 1 }} /> Edit
            </MenuItem>
            <MenuItem onClick={() => handleDelete(row?.id)}>
              {row.isDeleted ? (
                <>
                  <RestoreIcon sx={{ mr: 1, color: "#de2c48" }} /> Restore
                </>
              ) : (
                <>
                  <DeleteOutlineIcon sx={{ mr: 1, color: "#C7253E" }} /> Delete
                </>
              )}
            </MenuItem>
          </Menu>
        </Box>
      ),
    },
  ];

  // Handle user status change
  const [deleteAdmin] = useDeleteAdminMutation();

  const handleDelete = async (id: string) => {
    console.log({ id });
    const toastId = toast.loading("Please wait...");
    try {
      const res = await deleteAdmin(id);
      if (res?.data?.success) {
        toast.success(res?.data?.message, { id: toastId, duration: 5000 });
      }
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  // Pagination handler
  const handlePaginationChange = (newPaginationModel: any) => {
    setCurrentPage(newPaginationModel.page + 1);
    setLimit(newPaginationModel.pageSize);
  };
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, lg: 4 }}>
          <SelectFilter
            filter_title="Search by department"
            options={department_options}
            value={departmentId}
            setValue={setDepartment}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <SelectFilter
            filter_title="Search by designation"
            options={designation_options}
            value={designationId}
            setValue={setDesignation}
            isDisable={department_isLoading}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }} mt={{ xs: 0, lg: 4 }}>
          <SearchFiled setSearchText={setSearchTerm} />
        </Grid>
      </Grid>

      {!isLoading ? (
        <Box>
          <DataGrid
            rows={admin_data}
            columns={columns}
            pagination
            paginationMode="server"
            pageSizeOptions={[10, 25, 50]}
            rowCount={data?.meta?.total}
            paginationModel={{ page: currentPage - 1, pageSize: limit }}
            onPaginationModelChange={handlePaginationChange}
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

export default AdminTable;
