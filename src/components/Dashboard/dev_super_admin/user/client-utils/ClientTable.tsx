"use client";
import { useClientTypeOption } from "@/hooks/useClientTypeOptions";
import {
  useDeleteClientMutation,
  useGetAllClientQuery,
} from "@/redux/api/user/clientApi";
import { useDebounced } from "@/redux/hooks";
import { Box, Stack, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import RestoreIcon from "@mui/icons-material/Restore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { toast } from "sonner";
import SelectFilter from "@/components/Dashboard/DashboardFilters/SclectFilter";
import { gender_options } from "@/constants/options";
import SearchFiled from "@/components/Dashboard/DashboardFilters/SearchFiled";
import Loading from "@/components/ui/LoadingBar";

type TQueryObj = {
  clientTypeId?: string;
  gender?: string;
  searchTerm?: string;
  page?: number;
  limit?: number;
};

type RRowParams = {
  title: string;
};

const ClientTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [clientType, setClientType] = useState("");
  const [gender, setGender] = useState("");

  const path = "/dashboard/dev_super_admin/users/client/update";

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

  if (clientType) {
    queryObj["clientTypeId"] = clientType;
  }
  if (gender) {
    queryObj["gender"] = gender;
  }

  const { options: client_type_options, isLoading: designation_isLoading } =
    useClientTypeOption();
  // Fetch Client data using API hook
  const { data, isLoading } = useGetAllClientQuery({ ...queryObj });
  console.log({ ClientData: data });

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
    { field: "gu_id", headerName: "USER ID", flex: 1 },
    { field: "owner_name", headerName: "NAME", flex: 1 },
    { field: "email", headerName: "EMAIL", flex: 1.5 },
    {
      field: "clientType",
      valueGetter: (params: RRowParams) => params?.title || "",
      headerName: "TYPE",
      flex: 0.8,
    },
    { field: "gender", headerName: "GENDER", flex: 0.8 },
    { field: "phone", headerName: "PHONE", flex: 1 },
    {
      field: "isDeleted",
      headerName: "is_Deleted",
      flex: 0.5,
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
                color: "#C7253E",
                cursor: "pointer",
              }}
              onClick={() => handleDelete(row?.id)}
            >
              {row.isDeleted ? <RestoreIcon /> : <DeleteOutlineIcon />}
            </Typography>
          </Tooltip>
        </Box>
      ),
    },
  ];

  // Handle user status change
  const [deleteClient] = useDeleteClientMutation();

  const handleDelete = async (id: string) => {
    console.log({ id });
    const toastId = toast.loading("Please wait...");
    try {
      const res = await deleteClient(id);
      if (res?.data?.success) {
        toast.success(res?.data?.message, { id: toastId, duration: 5000 });
      }
    } catch (err: any) {
      toast.error(err?.message, { id: toastId, duration: 5000 });
    }
  };

  // Pagination handler
  const handlePaginationChange = (newPaginationModel: any) => {
    setCurrentPage(newPaginationModel.page + 1); // DataGrid uses 0-based indexing, adjust to 1-based
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
            filter_title="Filter by Type"
            options={client_type_options}
            value={clientType}
            setValue={setClientType}
          />

          <SelectFilter
            filter_title="Filter by Gender"
            options={gender_options}
            value={gender}
            setValue={setGender}
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

export default ClientTable;
