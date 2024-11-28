"use client";

import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SearchFiled from "@/components/Dashboard/DashboardFilters/SearchFiled";
import Loading from "@/components/ui/LoadingBar";
import { Box, Button, Stack, Tooltip, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { useDebounced } from "@/redux/hooks";
import { TResponseDataObj } from "@/types";
import CMModal from "@/components/ui/CMModal";
import CMInput from "@/components/forms/CMInput";
import CMForm from "@/components/forms/CMForm";
import { FieldValues } from "react-hook-form";
import {
  useDeleteDistrictMutation,
  useGetAllDistrictQuery,
  useUpdateDistrictMutation,
} from "@/redux/api/user/settings/districtApi";
import SelectFilter from "@/components/Dashboard/DashboardFilters/SclectFilter";
import { useDivisionOptions } from "@/hooks/useDivisionOptions";
import RestoreIcon from "@mui/icons-material/Restore";

type TQueryObj = {
  divisionId?: string;
  searchTerm?: string;
  page?: number;
  limit?: number;
};

const DistrictTable = () => {
  const { options } = useDivisionOptions();
  const [divisionId, setDivisionId] = useState("");
  // Modal Functionality Is Start
  const [open, setOpen] = useState(false);
  const [updateId, setUpdateId] = useState({});
  const obj: any = updateId;
  const handleOpen = (row: any) => {
    setOpen(true);
    setUpdateId(row?.id);
  };
  const handleClose = () => setOpen(false);
  //Modal Functionality Is End

  //Filter District

  const path_create_country =
    "/dashboard/dev_super_admin/users/settings/address/district/create";

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
  if (divisionId) {
    queryObj["divisionId"] = divisionId;
  }

  // get All Country data
  const { data, isLoading } = useGetAllDistrictQuery({ ...queryObj });
  const districts = data as TResponseDataObj;
  console.log({ districts });

  console.log({ districts });

  // index and also Role field to each user for serial number
  const rowsWithIndex =
    districts?.data?.data?.map((row: any, index: number) => ({
      ...row,
      index: (currentPage - 1) * limit + (index + 1),
      role: row?.user?.role,
    })) || [];

  const columns: GridColDef[] = [
    { field: "index", headerName: "SERIAL", width: 100 },
    {
      field: "name",
      headerName: "NAME",
      flex: 1,
    },

    {
      field: "divition",
      headerName: "DIVISION",
      flex: 1,
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
  const [deleteDistrict] = useDeleteDistrictMutation();

  const handleDelete = async (id: string) => {
    console.log({ id });
    const toastId = toast.loading("Please wait...");
    try {
      const res = await deleteDistrict(id);
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

  // Update Department Handle
  const [updateDistrict] = useUpdateDistrictMutation();
  const handleUpdate = async (values: FieldValues) => {
    console.log(values, updateId);
    const toastId = toast.loading("Please wait...");
    try {
      const res = await updateDistrict({ ...values, id: updateId }).unwrap();
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

    console.log();
    // console.log(values);
  };
  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid size={{ xs: 4, lg: 4 }} textAlign="left" mt={4}>
          <Button
            component={Link}
            href={path_create_country}
            sx={{
              maxHeight: "40px",
              width: "60%",
            }}
          >
            Create
          </Button>
        </Grid>
        <Grid size={{ xs: 4, lg: 4 }}>
          <SelectFilter
            filter_title="Search by Division"
            options={options}
            value={divisionId}
            setValue={setDivisionId}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 4, lg: 4 }} mt={4}>
          <SearchFiled setSearchText={setSearchTerm} />
        </Grid>
      </Grid>

      <Box sx={{ p: 2 }}>
        {!isLoading ? (
          <Box>
            <DataGrid
              rows={rowsWithIndex}
              columns={columns}
              pagination
              paginationMode="server"
              pageSizeOptions={[10, 25, 50, 100]}
              rowCount={districts?.data?.meta?.total}
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

      {/* Modal is Start Here */}
      <CMModal open={open} id={obj?.id} handleClose={handleClose}>
        <Box>
          <Typography variant="h4" component="h4" mb={4}>
            Update Department
          </Typography>
          <CMForm
            onSubmit={handleUpdate}
            defaultValues={{
              name: obj?.name,
            }}
          >
            <Grid container spacing={3}>
              <Grid size={12}>
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
    </>
  );
};

export default DistrictTable;
