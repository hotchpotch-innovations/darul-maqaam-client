"use client";

import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SearchFiled from "@/components/Dashboard/DashboardFilters/SearchFiled";
import Loading from "@/components/ui/LoadingBar";
import { Box, Button, Grid, Stack, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { useState } from "react";
import { useDebounced } from "@/redux/hooks";
import { TResponseDataObj } from "@/types";
import CMModal from "@/components/ui/CMModal";
import CMInput from "@/components/forms/CMInput";
import CMForm from "@/components/forms/CMForm";
import { FieldValues } from "react-hook-form";
import SelectFilter from "@/components/Dashboard/DashboardFilters/SclectFilter";
import { useDivisionOptions } from "@/hooks/useDivisionOptions";
import {
  useDeleteMenuMutation,
  useGetAllMenuQuery,
  useUpdateMenuMutation,
} from "@/redux/api/content/menuApi";
import { toast } from "sonner";
import RestoreIcon from "@mui/icons-material/Restore";

type TQueryObj = {
  divisionId?: string;
  searchTerm?: string;
  page?: number;
  limit?: number;
};

const SubMenuTable = () => {
  const { options } = useDivisionOptions();
  const [divisionId, setDivisionId] = useState("");
  // Modal Functionality Is Start
  const [open, setOpen] = useState(false);
  const [updateId, setUpdateId] = useState({});
  const [itemObj, setItemObj] = useState();

  const item = itemObj as any;
  const obj: any = updateId;
  const handleOpen = (row: any) => {
    setOpen(true);
    setUpdateId(row?.id);
    setItemObj(row);
  };
  const handleClose = () => setOpen(false);
  //Modal Functionality Is End

  //Filter District

  const path_create_country = "/dashboard/dev_super_admin/content/menu/create";

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
  const { data, isLoading } = useGetAllMenuQuery({ ...queryObj });
  const districts = data as TResponseDataObj;
  console.log(districts?.data);

  // index and also Role field to each user for serial number
  const rowsWithIndex =
    districts?.data?.data.map((row: any, index: number) => ({
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

    {
      field: "identifier",
      headerName: "IDENTIFIER",
      flex: 1,
    },
    {
      field: "has_children",
      headerName: "HAS CHILDREN",
      flex: 1,
      valueGetter: (params: any) => (params ? "Yes" : "No"),
    },
    {
      field: "slug",
      headerName: "HAS SUBMENUE",
      flex: 1,
      valueGetter: (params: any) => (params === "" ? "No" : params),
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

  // Delete Menu

  const [deleteMenu] = useDeleteMenuMutation();
  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Please wait...");
    try {
      const res = await deleteMenu(id);
      if (res?.data?.success) {
        toast.success(res?.data?.message, { id: toastId, duration: 5000 });
      }
    } catch (error: any) {
      toast.error(error?.message, { id: toastId, duration: 5000 });
    }
  };

  // Pagination handler
  const handlePaginationChange = (newPaginationModel: any) => {
    setCurrentPage(newPaginationModel.page + 1);
    setLimit(newPaginationModel.pageSize);
  };

  // Update Menu Handle

  const [updateMenu] = useUpdateMenuMutation();
  const handleUpdate = async (values: FieldValues) => {
    console.log(values, updateId);
    const toastId = toast.loading("Please wait...");

    try {
      const res = await updateMenu({ ...values, id: updateId }).unwrap();
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
              filter_title="Search by Menu Status"
              options={options}
              value={divisionId}
              setValue={setDivisionId}
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
              rowCount={districts?.data?.meta?.total}
              paginationModel={{ page: currentPage - 1, pageSize: limit }}
              onPaginationModelChange={handlePaginationChange}
              hideFooterPagination={
                districts?.data?.meta?.total < districts?.data?.meta?.limit
              }
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
            Update Menu
          </Typography>
          <CMForm
            onSubmit={handleUpdate}
            defaultValues={{
              title: item?.title,
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <CMInput name="title" label="Title" fullWidth />
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

export default SubMenuTable;
