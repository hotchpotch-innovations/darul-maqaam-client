"use client";

import { user_status } from "@/constants";
import {
  useChangeCommonCategoryStatusMutation,
  useDeleteCommonCategoryMutation,
  useGetAllPrivateCommonCategoryQuery,
  useUpdateCommonCategoryMutation,
} from "@/redux/api/content/commonCategoryApi";
import { useDebounced } from "@/redux/hooks";
import { TResponseDataObj } from "@/types";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { toast } from "sonner";
import { FieldValues, SubmitHandler } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import Link from "next/link";
import SelectFilter from "@/components/Dashboard/DashboardFilters/SclectFilter";
import {
  common_category_types_options,
  user_status_options,
} from "@/constants/options";
import SearchFiled from "@/components/Dashboard/DashboardFilters/SearchFiled";
import Loading from "@/components/UI/LoadingBar";
import CMModal from "@/components/UI/CMModal";
import CMForm from "@/components/forms/CMForm";
import CMSelect from "@/components/forms/CMSelect";
import CMInput from "@/components/forms/CMInput";
import { useState } from "react";
import MoreActionsMenu from "@/components/Dashboard/common/moreActionsMenu/MoreActionsMenu";

type TQueryObj = {
  type?: string;
  status?: string;
  searchTerm?: string;
  page?: number;
  limit?: number;
};
const CommonCategoryTable = () => {
  const [type, setType] = useState("");
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
    "/dashboard/dev_super_admin/content/settings/category/create";

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
  if (!!type) {
    queryObj["type"] = type;
  }

  // get All private category data
  const { data, isLoading } = useGetAllPrivateCommonCategoryQuery({
    ...queryObj,
  });

  const category_data = data as TResponseDataObj;

  // index and also Role field to each user for serial number
  const rowsWithIndex =
    category_data?.data?.data.map((row: any, index: number) => ({
      ...row,
      index: (currentPage - 1) * limit + (index + 1),
      role: row?.user?.role,
    })) || [];

  const columns: GridColDef[] = [
    {
      field: "index",
      headerName: "SERIAL",
      width: 80,
      disableColumnMenu: true,
    },
    {
      field: "title",
      headerName: "Title",
      flex: 2,
      sortable: false,
    },

    {
      field: "identifier",
      headerName: "Identifier",
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      disableColumnMenu: true,
    },
    {
      field: "status",
      headerName: "STATUS",
      flex: 1,
      disableColumnMenu: true,
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
      disableColumnMenu: true,
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
      flex: 0.5,
      disableColumnMenu: true,
      sortable: false,
      renderCell: ({ row }) => (
        <MoreActionsMenu
          onEdit={() => handleOpen(row)}
          onDelete={() => handleDelete(row?.id)}
          onStatusChange={() => statusHandler(row.id)}
          isActive={row?.status === user_status?.activate}
          isDeleted={row?.isDeleted}
        />
      ),
    },
  ];

  // Delete category

  const [deleteCategory] = useDeleteCommonCategoryMutation();

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Please wait...");
    try {
      const res = await deleteCategory(id).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
      } else {
        toast.error(res?.message, { id: toastId, duration: 5000 });
      }
    } catch (error: any) {
      toast.error(error?.message, { id: toastId, duration: 5000 });
    }
  };

  const [changeStatus] = useChangeCommonCategoryStatusMutation();

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

  // Update category Handle

  const [updateCategory] = useUpdateCommonCategoryMutation();
  const handleUpdate: SubmitHandler<FieldValues> = async (values) => {
    const toastId = toast.loading("Please wait...");

    try {
      const res = await updateCategory({ ...values, id: updateId }).unwrap();
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
              filter_title="Filter by Type"
              options={common_category_types_options}
              value={type}
              setValue={setType}
              fullWidth
            />
          </Grid>
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
            rowCount={category_data?.data?.meta?.total}
            paginationModel={{ page: currentPage - 1, pageSize: limit }}
            onPaginationModelChange={handlePaginationChange}
            hideFooterPagination={
              category_data?.data?.meta?.total <
              category_data?.data?.meta?.limit
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
            Update Category
          </Typography>
          <CMForm
            onSubmit={handleUpdate}
            defaultValues={{
              type: item?.type,
              title: item?.title,
              identifier: item?.identifier,
            }}
          >
            <Grid container spacing={3}>
              <Grid size={12}>
                <CMSelect
                  name="type"
                  label="Type"
                  items={common_category_types_options}
                  fullWidth
                />
              </Grid>
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

export default CommonCategoryTable;
