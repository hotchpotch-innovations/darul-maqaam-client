"use client";

import { user_status } from "@/constants";
import {
  useChangeFaqStatusMutation,
  useDeleteFaqMutation,
  useGetAllPrivateFaqQuery,
  useUpdateFaqMutation,
} from "@/redux/api/content/faqApi";
import { useDebounced } from "@/redux/hooks";
import { TResponseDataObj } from "@/types";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { toast } from "sonner";
import { FieldValues, SubmitHandler } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import Link from "next/link";
import SelectFilter from "@/components/Dashboard/DashboardFilters/SclectFilter";
import { user_status_options } from "@/constants/options";
import SearchFiled from "@/components/Dashboard/DashboardFilters/SearchFiled";
import Loading from "@/components/UI/LoadingBar";
import CMModal from "@/components/UI/CMModal";
import CMForm from "@/components/forms/CMForm";
import CMInput from "@/components/forms/CMInput";
import MoreActionsMenu from "@/components/Dashboard/common/moreActionsMenu/MoreActionsMenu";

type TQueryObj = {
  status?: string;
  searchTerm?: string;
  page?: number;
  limit?: number;
};

const FAQTable = () => {
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
    "/dashboard/super_admin/content/others/faq/create";

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

  // get All private faq data
  const { data, isLoading } = useGetAllPrivateFaqQuery({ ...queryObj });
  const faq_data = data as TResponseDataObj;

  // index and also Role field to each user for serial number
  const rowsWithIndex =
    faq_data?.data?.data.map((row: any, index: number) => ({
      ...row,
      index: (currentPage - 1) * limit + (index + 1),
      role: row?.user?.role,
    })) || [];

  const columns: GridColDef[] = [
    { field: "index", headerName: "SERIAL", width: 80 },
    {
      field: "question",
      headerName: "QUESTION",
      flex: 2,
    },

    {
      field: "answer",
      headerName: "ANSWER",
      flex: 2,
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
      flex: 0.5,
      headerAlign: "center", // Horizontally center the header
      align: "center",
      renderCell: ({ row }) => (
        <MoreActionsMenu
          onEdit={() => handleOpen(row)}
          onDelete={() => handleDelete(row?.id)}
          onStatusChange={() => statusHandler(row.id)}
          isActive={row?.status === "ACTIVATED"}
          isDeleted={row?.isDeleted}
        />
      ),
    },
  ];

  // Delete Menu

  const [deleteFAQ] = useDeleteFaqMutation();

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Please wait...");
    try {
      const res = await deleteFAQ(id).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
      } else {
        toast.error(res?.message, { id: toastId, duration: 5000 });
      }
    } catch (error: any) {
      toast.error(error?.message, { id: toastId, duration: 5000 });
    }
  };

  const [changeStatus] = useChangeFaqStatusMutation();

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

  // Update faq Handle

  const [updateFAQ] = useUpdateFaqMutation();
  const handleUpdate: SubmitHandler<FieldValues> = async (values) => {
    const toastId = toast.loading("Please wait...");

    try {
      const res = await updateFAQ({ ...values, id: updateId }).unwrap();
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
        {/* Create Button */}
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

        <Grid container size={{ xs: 12, md: 9 }} sx={{ alignItems: "center" }}>
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

          {/* Search Field */}
          <Grid size={{ xs: 12, md: 6 }} mt={4}>
            <SearchFiled setSearchText={setSearchTerm} />
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
            rowCount={faq_data?.data?.meta?.total}
            paginationModel={{ page: currentPage - 1, pageSize: limit }}
            onPaginationModelChange={handlePaginationChange}
            hideFooterPagination={
              faq_data?.data?.meta?.total < faq_data?.data?.meta?.limit
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
            Update FAQ
          </Typography>
          <CMForm
            onSubmit={handleUpdate}
            defaultValues={{
              question: item?.question,
              answer: item?.answer,
            }}
          >
            <Grid container spacing={3}>
              <Grid size={12}>
                <CMInput name="question" label="Question" fullWidth />
              </Grid>
              <Grid size={12}>
                <CMInput name="answer" label="Answer" fullWidth />
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

export default FAQTable;
