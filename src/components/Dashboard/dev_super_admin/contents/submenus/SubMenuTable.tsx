"use client";

import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SearchFiled from "@/components/Dashboard/DashboardFilters/SearchFiled";
import Loading from "@/components/ui/LoadingBar";
import {
  Box,
  Button,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
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
import { toast } from "sonner";
import RestoreIcon from "@mui/icons-material/Restore";
import BlockIcon from "@mui/icons-material/Block";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import {
  useChangeSubmenuStatusMutation,
  useDeleteSubmenuMutation,
  useGetAllSubmenuQuery,
  useUpdateSubmenuMutation,
} from "@/redux/api/content/submenuApi";
import { user_status_options } from "@/constants/options";
import { useMenubarOptions } from "@/hooks/content/useMenubarOptions";
import { user_status } from "@/constants";

type TQueryObj = {
  menubarId?: string;
  status?: string;
  searchTerm?: string;
  page?: number;
  limit?: number;
};

const SubMenuTable = () => {
  // Modal Functionality Is Start
  const [open, setOpen] = useState(false);
  const [updateId, setUpdateId] = useState("");
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

  const create_path = "/dashboard/dev_super_admin/content/submenu/create";

  const [currentPage, setCurrentPage] = useState(1);
  const [menubarId, setMenubarId] = useState("");
  const [status, setStatus] = useState("");
  const [limit, setLimit] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");

  const { options: menubar_options } = useMenubarOptions();
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
  if (!!menubarId) {
    queryObj["menubarId"] = menubarId;
  }
  if (!!status) {
    queryObj["status"] = status;
  }

  // get All Country data
  const { data, isLoading, isFetching } = useGetAllSubmenuQuery({
    ...queryObj,
  });
  const submenu_data = data as TResponseDataObj;

  // index and also Role field to each user for serial number
  const rowsWithIndex =
    submenu_data?.data?.data.map((row: any, index: number) => ({
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
      field: "menubar",
      headerName: "MENUBAR",
      flex: 1,
      renderCell: (params) => <Box>{params?.row?.menubar?.title}</Box>,
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
          <Tooltip title={row?.status === "ACTIVATED" ? "Block" : "Active"}>
            <Typography
              sx={{
                color:
                  row?.status === "ACTIVATED" ? "orangered" : "greenyellow",
                cursor: "pointer",
              }}
              onClick={() => handleStatus(row?.id)}
            >
              {row?.status === "ACTIVATED" ? <BlockIcon /> : <TaskAltIcon />}
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
  const [deleteSubmenu] = useDeleteSubmenuMutation();

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Please wait...");
    try {
      const res = await deleteSubmenu(id);
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

  // change status
  const [changeSubmenu] = useChangeSubmenuStatusMutation();

  const handleStatus = async (id: string) => {
    const toastId = toast.loading("Please wait...");
    try {
      const res = await changeSubmenu(id);
      if (res?.data?.success) {
        toast.success(res?.data?.message, { id: toastId, duration: 5000 });
      }
    } catch (error: any) {
      toast.error(error?.message, { id: toastId, duration: 5000 });
    }
  };

  // Update Menu Handle

  const [updateSubmenu] = useUpdateSubmenuMutation();
  const handleUpdate = async (values: FieldValues) => {
    console.log(values, updateId);
    const toastId = toast.loading("Please wait...");

    try {
      const res = await updateSubmenu({ ...values, id: updateId }).unwrap();
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
      {/* Top Row: Search and Create Button */}
      <Grid container spacing={2} alignItems="center">
        <Grid size={{ xs: 12, lg: 4 }} textAlign={{ xs: "center", md: "left" }}>
          <Button
            component={Link}
            href={"/dashboard/dev_super_admin/content/submenu/create"}
            sx={{
              width: {
                xs: "100%",
                lg: "80%",
              },
            }}
          >
            Create
          </Button>
        </Grid>

        <Grid size={{ xs: 12, lg: 8 }}>
          <SearchFiled setSearchText={setSearchTerm} />
        </Grid>
      </Grid>

      {/* Bottom Row: Filters */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <SelectFilter
            filter_title="Filter by menubar"
            options={menubar_options}
            value={menubarId}
            setValue={setMenubarId}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <SelectFilter
            filter_title="Filter by status"
            options={user_status_options}
            value={status}
            setValue={setStatus}
            fullWidth
          />
        </Grid>
      </Grid>

      {!isLoading || !isFetching ? (
        <Box>
          <DataGrid
            rows={rowsWithIndex}
            columns={columns}
            pagination
            paginationMode="server"
            pageSizeOptions={[10, 25, 50]}
            rowCount={submenu_data?.data?.meta?.total}
            paginationModel={{ page: currentPage - 1, pageSize: limit }}
            onPaginationModelChange={handlePaginationChange}
            hideFooterPagination={
              submenu_data?.data?.meta?.total < submenu_data?.data?.meta?.limit
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
            Update Submenu
          </Typography>
          <CMForm
            onSubmit={handleUpdate}
            defaultValues={{
              title: item?.title,
            }}
          >
            <Grid container spacing={3}>
              <Grid size={12}>
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
    </Box>
  );
};

export default SubMenuTable;
