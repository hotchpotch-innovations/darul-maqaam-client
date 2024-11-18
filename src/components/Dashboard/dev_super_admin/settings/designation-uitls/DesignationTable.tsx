"use client";

import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SearchFiled from "@/components/Dashboard/DashboardFilters/SearchFiled";
import Loading from "@/components/ui/LoadingBar";
import { Box, Button, Grid, Stack, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { useDebounced } from "@/redux/hooks";
import { useGetAllDesignationQuery } from "@/redux/api/user/clientTypeApi";
import { TResponseDataObj } from "@/types";
import CMModal from "@/components/ui/CMModal";
import CMForm from "@/components/forms/CMForm";
import CMInput from "@/components/forms/CMInput";
import { FieldValues } from "react-hook-form";
import {
  useDeleteDesignationMutation,
  useUpdateDesignationMutation,
} from "@/redux/api/user/settings/designationApi";
import RestoreIcon from "@mui/icons-material/Restore";
import SelectFilter from "@/components/Dashboard/DashboardFilters/SclectFilter";
import { useDepartmentOptions } from "@/hooks/useDepartmentOptions";

type RRowParams = {
  title: string;
};

type TQueryObj = {
  designationId?: string;
  departmentId?: string;
  searchTerm?: string;
  page?: number;
  limit?: number;
};

const DesignationTable = () => {
  const { options } = useDepartmentOptions();
  // Modal Functionality Is Start
  const [open, setOpen] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const handleOpen = (id: string) => {
    setOpen(true);
    setUpdateId(id);
  };
  const handleClose = () => setOpen(false);
  //Modal Functionality Is End

  const path_create_country =
    "/dashboard/super_admin/users/settings/designation/create";

  const [currentPage, setCurrentPage] = useState(1);
  const [departmentId, setDepartmentId] = useState("");

  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

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

  if (!!departmentId) {
    queryObj["departmentId"] = departmentId;
  }

  // get All Country data
  const { data, isLoading } = useGetAllDesignationQuery({ ...queryObj });
  const designations = data as TResponseDataObj;

  // index and also Role field to each user for serial number
  const rowsWithIndex =
    designations?.data?.data?.map((row: any, index: number) => ({
      ...row,
      index: (currentPage - 1) * limit + (index + 1),
      role: row?.user?.role,
    })) || [];

  const columns: GridColDef[] = [
    { field: "index", headerName: "SERIAL", width: 100 },
    {
      field: "title",
      headerName: "TITLE",
      flex: 1,
    },

    { field: "identifier", headerName: "INDENTIFIER", flex: 1 },
    {
      field: "department",
      valueGetter: (params: RRowParams) => params?.title || "",
      headerName: "DEPARTMENT",
      flex: 1,
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
              onClick={() => handleOpen(row?.id)}
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

  // Pagination handler
  const handlePaginationChange = (newPaginationModel: any) => {
    setCurrentPage(newPaginationModel.page + 1);
    setLimit(newPaginationModel.pageSize);
  };
  // Delete Designation Handeler
  const [deleteDesignation] = useDeleteDesignationMutation();

  const handleDelete = async (id: string) => {
    console.log({ id });
    const toastId = toast.loading("Please wait...");
    try {
      const res = await deleteDesignation(id);
      if (res?.data?.success) {
        toast.success(res?.data?.message, { id: toastId, duration: 5000 });
      }
    } catch (err: any) {
      toast.error(err?.message, { id: toastId, duration: 5000 });
    }
  };

  // Update Designation Handeler
  const [updateDesignation] = useUpdateDesignationMutation();
  const handleUpdate = async (values: FieldValues) => {
    const toastId = toast.loading("Please wait...");
    try {
      const res = await updateDesignation({ ...values, id: updateId }).unwrap();
      if (res?.success) {
        handleClose();
        toast.success(res?.message, { id: toastId, duration: 3000 });
      } else {
        toast.error(res?.message, { id: toastId, duration: 3000 });
        console.log(res);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong", { duration: 3000 });
    }

    console.log();
    // console.log(values);
  };
  return (
    <Box>
      <Box sx={{ m: "30px 60px" }}>
        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Box
            sx={{
              display: "flex",
              gap: "30px",
            }}
          >
            {/* Create Country Section */}
            <Button
              component={Link}
              href={path_create_country}
              sx={{
                maxHeight: "40px",
              }}
            >
              Create
            </Button>
          </Box>
          <Box display="flex" gap={2}>
            <SelectFilter
              filter_title="Search by Department"
              options={options}
              value={departmentId}
              setValue={setDepartmentId}
            />
            <SearchFiled setSearchText={setSearchTerm} />
          </Box>
        </Stack>

        {!isLoading ? (
          <Box>
            <DataGrid
              rows={rowsWithIndex}
              columns={columns}
              pagination
              paginationMode="server"
              pageSizeOptions={[10, 25, 50]}
              rowCount={designations?.data?.meta?.total}
              paginationModel={{ page: currentPage - 1, pageSize: limit }}
              onPaginationModelChange={handlePaginationChange}
              hideFooterPagination={
                designations?.data?.meta?.total <
                designations?.data?.meta?.limit
              }
              sx={{ border: "none", outline: "none", boxShadow: "none" }}
            />
          </Box>
        ) : (
          <Loading />
        )}
      </Box>

      {/* Modal is Start Here */}
      <CMModal open={open} id={updateId} handleClose={handleClose}>
        <Box>
          <Typography variant="h4" component="h4" mb={4}>
            Update Department
          </Typography>
          <CMForm
            onSubmit={handleUpdate}
            defaultValues={{
              title: "",
              identifier: "",
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <CMInput name="title" label="Title" fullWidth />
              </Grid>
              <Grid item xs={12} md={12}>
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
      {/* Modal is End Here */}
    </Box>
  );
};

export default DesignationTable;
