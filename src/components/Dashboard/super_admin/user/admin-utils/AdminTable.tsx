"use client";
import SelectFilter from "@/components/Dashboard/DashboardFilters/SclectFilter";
import SearchFiled from "@/components/Dashboard/DashboardFilters/SearchFiled";
import { useDepartmentOptions } from "@/hooks/useDepartmentOptions";
import { useDesignationOptions } from "@/hooks/useDesignationOptions";
import { useDebounced } from "@/redux/hooks";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import {
  useDeleteAdminMutation,
  useGetAllAdminQuery,
} from "@/redux/api/user/adminApi";
import { useRouter } from "next/navigation";
import MoreActionsMenu from "@/components/Dashboard/common/moreActionsMenu/MoreActionsMenu";
import Loading from "@/components/UI/LoadingBar";

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

  const router = useRouter();

  const path = "/dashboard/super_admin/users/admin/update";

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

  const { options: designation_options } = useDesignationOptions(queryObj);
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
      width: 80,
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
          href={`/dashboard/super_admin/users/admin/details/${params.row.id}`}
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
          href={`/dashboard/super_admin/users/admin/details/${params.row.id}`}
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
    {
      field: "department",
      headerName: "DEPARTMENT",
      flex: 1,
      renderCell: (params) => <Box>{params?.row?.department?.title}</Box>,
    },
    { field: "phone", headerName: "PHONE", flex: 1 },
    {
      field: "Action",
      headerName: "ACTIONS",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      sortable: false,
      renderCell: ({ row }) => (
        <MoreActionsMenu
          onEdit={() => router.push(`${path}/${row?.id}`)}
          onDelete={() => handleDelete(row?.id)}
          isDeleted={row?.isDeleted}
        />
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
