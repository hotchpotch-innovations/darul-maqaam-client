"use client";

import { user_status } from "@/constants";
import {
  useChangeAuthorityStatusMutation,
  useDeleteAuthorityMutation,
  useGetAllPrivateAuthorityQuery,
  useUpdateAuthorityMutation,
} from "@/redux/api/content/authorityApi";
import { useDebounced } from "@/redux/hooks";
import { TResponseDataObj } from "@/types";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import RestoreIcon from "@mui/icons-material/Restore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { toast } from "sonner";
import { FieldValues, SubmitHandler } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import Link from "next/link";
import SearchFiled from "@/components/Dashboard/DashboardFilters/SearchFiled";
import SelectFilter from "@/components/Dashboard/DashboardFilters/SclectFilter";
import { user_status_options } from "@/constants/options";
import Loading from "@/components/ui/LoadingBar";
import CMModal from "@/components/ui/CMModal";
import CMForm from "@/components/forms/CMForm";
import CMInput from "@/components/forms/CMInput";

type TQueryObj = {
  status?: string;
  searchTerm?: string;
  page?: number;
  limit?: number;
};
const AuthorityTable = () => {
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  // Modal Functionality Is Start
  const [open, setOpen] = useState(false);
  const [updateId, setUpdateId] = useState({});
  const [itemObj, setItemObj] = useState();

  const item = itemObj as any;
  const obj: any = updateId;

  // modal open handler
  const handleOpen = (row: any) => {
    setOpen(true);
    setUpdateId(row?.id);
    setItemObj(row);
  };

  // modal close handler
  const handleClose = () => setOpen(false);

  const path_create_country =
    "/dashboard/dev_super_admin/content/settings/authority/create";

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

  // get All private category data
  const { data, isLoading } = useGetAllPrivateAuthorityQuery({
    ...queryObj,
  });

  const authority_data = data as TResponseDataObj;

  // index and also Role field to each user for serial number
  const rowsWithIndex =
    authority_data?.data?.data.map((row: any, index: number) => ({
      ...row,
      index: (currentPage - 1) * limit + (index + 1),
      role: row?.user?.role,
    })) || [];

  const columns: GridColDef[] = [
    { field: "index", headerName: "SERIAL", width: 100 },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
    },

    {
      field: "identifier",
      headerName: "Identifier",
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
              onClick={() => handleOpen(row)}
            >
              <EditIcon />
            </Typography>
          </Tooltip>
          <Tooltip
            title={row?.status === user_status?.activate ? "Block" : "Activate"}
          >
            <Typography
              sx={{
                color:
                  row?.status === user_status?.activate
                    ? "orangered"
                    : "greenyellow",
                cursor: "pointer",
              }}
              onClick={() => statusHandler(row?.id)}
            >
              {row?.status === user_status?.activate ? (
                <BlockIcon />
              ) : (
                <TaskAltIcon />
              )}
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

  // Delete authority

  const [deleteAuthority] = useDeleteAuthorityMutation();

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Please wait...");
    try {
      const res = await deleteAuthority(id).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
      } else {
        toast.error(res?.message, { id: toastId, duration: 5000 });
      }
    } catch (error: any) {
      toast.error(error?.message, { id: toastId, duration: 5000 });
    }
  };

  const [changeStatus] = useChangeAuthorityStatusMutation();

  const statusHandler = async (id: string) => {
    const toastId = toast.loading("Please wait...");
    try {
      const res = await changeStatus(id).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
      } else {
        toast.error(res?.message, { id: toastId, duration: 5000 });
      }
    } catch (error: any) {
      toast.error(error?.message, { id: toastId, duration: 5000 });
    }
  };

  // Pagination handler
  const handlePaginationChange = (newPaginationModel: any) => {
    setCurrentPage(newPaginationModel?.page + 1);
    setLimit(newPaginationModel?.pageSize);
  };

  // Update authority Handle

  const [updateAuthority] = useUpdateAuthorityMutation();

  const handleUpdate: SubmitHandler<FieldValues> = async (values) => {
    const toastId = toast.loading("Please wait...");

    try {
      const res = await updateAuthority({ ...values, id: updateId }).unwrap();
      if (res?.success) {
        handleClose();
        setUpdateId("");
        toast.success(res?.message, { id: toastId, duration: 3000 });
      } else {
        toast.error(res?.message, { id: toastId, duration: 3000 });
        console.log(res);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong", { duration: 3000 });
    }
  };
  return (
    <Box sx={{ p: 2 }}>
      {/* Main Row */}
      <Grid container spacing={2} alignItems="center">
        <Grid container size={{ xs: 12, md: 9 }} sx={{ alignItems: "center" }}>
          {/* create Field */}

          <Grid
            size={{ xs: 12, md: 3 }}
            textAlign={{ xs: "center", sm: "left" }}
            mt={4}
          >
            <Button
              component={Link}
              href={path_create_country}
              sx={{
                width: {
                  xs: "100%",
                  md: "80%",
                },
              }}
            >
              Create
            </Button>
          </Grid>

          {/* Search Field  */}
          <Grid size={{ xs: 12, md: 6 }}>
            <SearchFiled setSearchText={setSearchTerm} />
          </Grid>

          {/* Filter Field */}
          <Grid size={{ xs: 12, md: 6 }}>
            <SelectFilter
              filter_title="Filter by Status"
              options={user_status_options}
              value={status}
              setValue={setStatus}
              fullWidth
            />
          </Grid>
        </Grid>
      </Grid>

      {!isLoading ? (
        <Box>
          <DataGrid
            rows={rowsWithIndex}
            columns={columns}
            pagination
            paginationMode="server"
            pageSizeOptions={[10, 25, 50]}
            rowCount={authority_data?.data?.meta?.total}
            paginationModel={{ page: currentPage - 1, pageSize: limit }}
            onPaginationModelChange={handlePaginationChange}
            hideFooterPagination={
              authority_data?.data?.meta?.total <
              authority_data?.data?.meta?.limit
            }
            sx={{ border: "none", outline: "none", boxShadow: "none" }}
          />
        </Box>
      ) : (
        <Loading />
      )}

      {/* Modal is Start Here */}
      <CMModal open={open} id={obj?.id} handleClose={handleClose}>
        <Box>
          <Typography variant="h4" component="h4" mb={4}>
            Update Authority
          </Typography>
          <CMForm
            onSubmit={handleUpdate}
            defaultValues={{
              title: item?.title,
              identifier: item?.identifier,
            }}
          >
            <Grid container spacing={3}>
              <Grid size={12}>
                <CMInput name="title" label="Title" fullWidth />
              </Grid>
              <Grid size={12}>
                <CMInput name="identifier" label="Identifier" fullWidth />
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                mt: 2,
                gap: 3,
              }}
            >
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleClose()}
              >
                Close
              </Button>
              <Button type="submit">Update</Button>
            </Box>
          </CMForm>
        </Box>
      </CMModal>
    </Box>
  );
};

export default AuthorityTable;
