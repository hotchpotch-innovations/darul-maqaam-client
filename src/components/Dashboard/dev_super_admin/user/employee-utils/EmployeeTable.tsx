"use client";

import { useDepartmentOptions } from "@/hooks/useDepartmentOptions";
import { useDesignationOptions } from "@/hooks/useDesignationOptions";
import {
  useDeleteEmployeeMutation,
  useGetAllEmployeeQuery,
} from "@/redux/api/user/employeeApi";
import { useDebounced } from "@/redux/hooks";
import { Box, Stack, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import RestoreIcon from "@mui/icons-material/Restore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { toast } from "sonner";
import SelectFilter from "@/components/Dashboard/DashboardFilters/SclectFilter";
import SearchFiled from "@/components/Dashboard/DashboardFilters/SearchFiled";
import Loading from "@/components/ui/LoadingBar";
import Link from "next/link";

type TQueryObj = {
  designationId?: string;
  departmentId?: string;
  searchTerm?: string;
  page?: number;
  limit?: number;
};

const EmployeeTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentId, setDepartment] = useState("");
  const [designationId, setDesignation] = useState("");

  const path = "/dashboard/dev_super_admin/users/employee/update";

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
  const { data, isLoading } = useGetAllEmployeeQuery({ ...queryObj });

  // index and also Role field to each user for serial number
  const rowsWithIndex =
    data?.data?.map((row: any, index: number) => ({
      ...row,
      index: (currentPage - 1) * limit + (index + 1),
      role: row?.user?.role,
    })) || [];

  const columns: GridColDef[] = [
    { field: "index", headerName: "SERIAL", width: 100 },
    {
      field: "profile_image",
      headerName: "IMAGE",
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
          href={`/dashboard/dev_super_admin/users/employee/details/${params.row.id}`}
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
          href={`/dashboard/dev_super_admin/users/employee/details/${params.row.id}`}
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
    { field: "phone", headerName: "PHONE", flex: 1 },
    // {
    //   field: "isDeleted",
    //   headerName: "is_Deleted",
    //   flex: 0.5,
    // },
    {
      field: "isDeleted",
      headerName: "Is DELETED",
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
              ...(!row.isDeleted
                ? { color: "greenyellow" }
                : { color: "orangered" }),
            }}
          >
            {row?.isDeleted ? "YES" : "NO"}
          </Typography>
        </Box>
      ),
    },
    {
      field: "Action",
      headerName: "ACTIONS",
      flex: 1,
      headerAlign: "center", // Horizontally center the header
      align: "center",
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
          <Tooltip title="Update">
            <Typography
              sx={{
                color: "primary.main",
                cursor: "pointer",
              }}
              component={Link}
              href={`${path}/${row?.id}`}
            >
              <EditIcon />
            </Typography>
          </Tooltip>
          <Tooltip title={row?.isDeleted ? "Restore" : "Delete"}>
            <Typography
              sx={{
                color: row?.isDeleted ? "#de2c48" : "#C7253E",
                cursor: "pointer",
              }}
              onClick={() => handleDelete(row?.id)}
            >
              {row?.isDeleted ? <RestoreIcon /> : <DeleteOutlineIcon />}
            </Typography>
          </Tooltip>
        </Box>
      ),
    },
  ];

  // Handle user status change
  const [deleteEmployee] = useDeleteEmployeeMutation();

  const handleDelete = async (id: string) => {
    console.log({ id });
    const toastId = toast.loading("Please wait...");
    try {
      const res = await deleteEmployee(id);
      if (res?.data?.success) {
        toast.success(res?.data?.message, { id: toastId, duration: 5000 });
      }
    } catch (err: any) {
      toast.error(err?.message, { id: toastId, duration: 5000 });
    }
  };

  // Pagination handler
  const handlePaginationChange = (newPaginationModel: any) => {
    setCurrentPage(newPaginationModel.page + 1);
    setLimit(newPaginationModel.pageSize);
  };
  return (
    <Box sx={{ m: "30px 60px" }}>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Box
          sx={{
            display: "flex",
            gap: "30px",
          }}
        >
          <SelectFilter
            filter_title="Search by department"
            options={department_options}
            value={departmentId}
            setValue={setDepartment}
          />

          <SelectFilter
            filter_title="Search by designation"
            options={designation_options}
            value={designationId}
            setValue={setDesignation}
            isDisable={departmentId || designation_isLoading ? false : true}
          />
        </Box>
        <SearchFiled setSearchText={setSearchTerm} />
      </Stack>

      {!isLoading ? (
        <Box>
          <DataGrid
            rows={rowsWithIndex}
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

export default EmployeeTable;
