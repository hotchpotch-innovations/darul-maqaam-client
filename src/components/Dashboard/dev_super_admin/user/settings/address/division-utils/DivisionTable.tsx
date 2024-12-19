"use client";
import SearchFiled from "@/components/Dashboard/DashboardFilters/SearchFiled";
import Loading from "@/components/UI/LoadingBar";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { useDebounced } from "@/redux/hooks";
import { TResponseDataObj } from "@/types";
import CMModal from "@/components/UI/CMModal";
import CMInput from "@/components/forms/CMInput";
import CMForm from "@/components/forms/CMForm";
import { FieldValues } from "react-hook-form";
import {
  useDeleteDivisionMutation,
  useGetAllDivisionQuery,
  useUpdateDivisionMutation,
} from "@/redux/api/user/settings/divisionApi";
import MoreActionsMenu from "@/components/Dashboard/common/moreActionsMenu/MoreActionsMenu";

type TQueryObj = {
  designationId?: string;
  departmentId?: string;
  searchTerm?: string;
  page?: number;
  limit?: number;
};

const DivisionTable = () => {
  // Modal Functionality Is Start
  const [open, setOpen] = useState(false);
  const [obj, setObj] = useState({});
  const division: any = obj;
  const handleOpen = (obj: any) => {
    setOpen(true);
    setObj(obj);
  };
  const handleClose = () => setOpen(false);
  //Modal Functionality Is End

  const path_create_division =
    "/dashboard/dev_super_admin/users/settings/address/division/create";

  const [currentPage, setCurrentPage] = useState(1);

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

  // get All Country data
  const { data, isLoading } = useGetAllDivisionQuery({ ...queryObj });
  const divisions = data as TResponseDataObj;

  console.log({ divisions });

  // index and also Role field to each user for serial number
  const rowsWithIndex =
    divisions?.data?.data?.map((row: any, index: number) => ({
      ...row,
      index: (currentPage - 1) * limit + (index + 1),
      role: row?.user?.role,
    })) || [];

  const columns: GridColDef[] = [
    { field: "index", headerName: "SERIAL", width: 80 },
    {
      field: "name",
      headerName: "NAME",
      flex: 2.5,
    },

    {
      field: "country",
      headerName: "COUNTRY",
      flex: 1.5,
      valueGetter: (params: any) => params?.name || "",
    },
    // {
    //   field: "status",
    //   headerName: "STATUS",
    //   flex: 1,
    // },

    {
      field: "Action",
      headerName: "ACTIONS",
      flex: 0.5,
      headerAlign: "center", // Horizontally center the header
      align: "center",
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
  const [deleteDivision] = useDeleteDivisionMutation();

  const handleDelete = async (id: string) => {
    console.log({ id });
    const toastId = toast.loading("Please wait...");
    try {
      const res = await deleteDivision(id);
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

  // Update Division Handle
  const [updateDivision] = useUpdateDivisionMutation();
  const handleUpdate = async (values: FieldValues) => {
    console.log(values, division?.id);
    const toastId = toast.loading("Please wait...");
    try {
      const res = await updateDivision({
        ...values,
        id: division?.id,
      }).unwrap();
      if (res?.success) {
        handleClose();
        setObj("");
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
      <Box sx={{ p: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          mb={2}
          spacing={2}
        >
          <Box
            sx={{
              display: "flex",
              gap: "30px",
            }}
          >
            {/* Create Country Section */}
            <Button
              component={Link}
              href={path_create_division}
              sx={{
                maxHeight: "40px",
              }}
            >
              Create
            </Button>
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
              rowCount={divisions?.data?.meta?.total}
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

      {/* Modal is Start Here */}
      <CMModal open={open} id={division?.id} handleClose={handleClose}>
        <Box>
          <Typography variant="h4" component="h4" mb={4}>
            Update Division
          </Typography>
          <CMForm
            onSubmit={handleUpdate}
            defaultValues={{
              name: division?.name,
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <CMInput name="name" label="Name" fullWidth />
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

export default DivisionTable;
