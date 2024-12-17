"use client";

import SearchFiled from "@/components/Dashboard/DashboardFilters/SearchFiled";
import Loading from "@/components/UI/LoadingBar";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { useDebounced } from "@/redux/hooks";
import { TResponseDataObj } from "@/types";
import CMModal from "@/components/UI/CMModal";
import CMForm from "@/components/forms/CMForm";
import CMInput from "@/components/forms/CMInput";
import { FieldValues } from "react-hook-form";
import {
  useDeleteDesignationMutation,
  useGetAllPrivateDesignationQuery,
  useUpdateDesignationMutation,
} from "@/redux/api/user/settings/designationApi";
import SelectFilter from "@/components/Dashboard/DashboardFilters/SclectFilter";
import { useDepartmentOptions } from "@/hooks/useDepartmentOptions";
import MoreActionsMenu from "@/components/Dashboard/common/moreActionsMenu/MoreActionsMenu";

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
  const [designationObj, setDesignationObj] = useState({});

  const designation: any = designationObj;
  const handleOpen = (row: any) => {
    setOpen(true);
    setUpdateId(row?.id);
    setDesignationObj(row);
  };
  const handleClose = () => setOpen(false);

  const path_create_country =
    "/dashboard/super_admin/organization/settings/designation/create";

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
    page: currentPage,
  };

  if (debouncedTerm) {
    queryObj["searchTerm"] = debouncedTerm;
  }

  if (!!departmentId) {
    queryObj["departmentId"] = departmentId;
  }

  // get All Country data
  const { data, isLoading } = useGetAllPrivateDesignationQuery({ ...queryObj });
  const designations = data as TResponseDataObj;

  // index and also Role field to each user for serial number
  const rowsWithIndex =
    designations?.data?.data?.map((row: any, index: number) => ({
      ...row,
      index: (currentPage - 1) * limit + (index + 1),
      role: row?.user?.role,
    })) || [];

  const columns: GridColDef[] = [
    {
      field: "index",
      headerName: "SERIAL",
      width: 100,
      disableColumnMenu: true,
    },
    {
      field: "title",
      headerName: "TITLE",
      sortable: false,
      flex: 2,
    },

    {
      field: "identifier",
      headerName: "IDENTIFIER",
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "department",
      valueGetter: (params: RRowParams) => params?.title || "",
      headerName: "DEPARTMENT",
      flex: 1,
      sortable: false,
    },
    {
      field: "Action",
      headerName: "ACTIONS",
      flex: 0.5,
      disableColumnMenu: true,
      sortable: false,
      renderCell: ({ row }) => (
        <MoreActionsMenu
          onEdit={() => handleOpen(row)}
          onDelete={() => handleDelete(row?.id)}
          isDeleted={row?.isDeleted}
        />
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

  // Update Designation Handler
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
  };
  return (
    <Box>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} mb={1}>
          <Grid size={{ xs: 12, lg: 8 }} mt={4}>
            <Box>
              <Grid container spacing={2}>
                <Grid size={4}>
                  <Button
                    component={Link}
                    href={path_create_country}
                    sx={{
                      maxHeight: "40px",
                    }}
                  >
                    Create
                  </Button>
                </Grid>

                <Grid size={8}>
                  <SearchFiled setSearchText={setSearchTerm} />
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }}>
            <SelectFilter
              filter_title="Search by Department"
              options={options}
              value={departmentId}
              setValue={setDepartmentId}
              fullWidth={true}
            />
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
              title: designation?.title,
              identifier: designation?.identifier,
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
      {/* Modal is End Here */}
    </Box>
  );
};

export default DesignationTable;
