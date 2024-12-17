"use client";

import { formsAndTemplateTypeValue } from "@/constants/values";
import {
  TAuthorityQueryObj,
  useAuthorityOptions,
} from "@/hooks/content/useAuthorityOptions";
import {
  TCategoryQueryObj,
  useCategoryOptions,
} from "@/hooks/content/useCategoryOptions";
import {
  useChangeFormsStatusMutation,
  useDeleteFormsMutation,
  useGetAllPrivateFormsQuery,
} from "@/redux/api/content/formsApi";
import { useDebounced } from "@/redux/hooks";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { useState } from "react";
import Grid from "@mui/material/Grid2";
import SearchFiled from "@/components/Dashboard/DashboardFilters/SearchFiled";
import SelectFilter from "@/components/Dashboard/DashboardFilters/SclectFilter";
import { user_status_options } from "@/constants/options";
import Loading from "@/components/UI/LoadingBar";
import { toast } from "sonner";
import { user_status } from "@/constants";
import { useRouter } from "next/navigation";
import MoreActionsMenu from "@/components/Dashboard/common/moreActionsMenu/MoreActionsMenu";

type TQueryObj = {
  categoryId?: string;
  authorityId?: string;
  status?: string;
  searchTerm?: string;
  page?: number;
  limit?: number;
};
const FormsTable = () => {
  const categoryQueryObj: TCategoryQueryObj = {
    type: formsAndTemplateTypeValue,
    limit: 20,
    page: 1,
  };
  const authorityQueryObj: TAuthorityQueryObj = {
    limit: 20,
    page: 1,
  };
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [authorityId, setAuthorityId] = useState("");
  const [status, setStatus] = useState("");

  const path = "/dashboard/super_admin/content/others/forms/update";

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

  if (!!categoryId) {
    queryObj["categoryId"] = categoryId;
  }
  if (!!authorityId) {
    queryObj["authorityId"] = authorityId;
  }
  if (!!status) {
    queryObj["status"] = status;
  }

  const { options: category_options, isLoading: isCategoryLoading } =
    useCategoryOptions(categoryQueryObj);

  const { options: authority_options, isLoading: isAuthorityLoading } =
    useAuthorityOptions(authorityQueryObj);

  // Fetch forms data using API hook
  const { data, isLoading } = useGetAllPrivateFormsQuery({ ...queryObj });

  // index and also Role field to each user for serial number

  const forms_data =
    data?.data?.data?.map((row: any, index: number) => ({
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
      renderCell: (params) => (
        <Box
          component={Link}
          href={`/dashboard/super_admin/content/others/forms/details/${params?.row?.id}`}
          sx={{
            ":hover": {
              textDecoration: "underline",
              color: "#1f68de",
            },
          }}
        >
          {params?.row?.title}
        </Box>
      ),
    },
    {
      field: "description",
      headerName: "DESCRIPTION",
      flex: 1.5,
      renderCell: (params: Record<string, any>) => {
        return <Box>{params?.row?.description}</Box>;
      },
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1.5,
      renderCell: (params: Record<string, any>) => {
        return <Box>{params?.row?.category?.title}</Box>;
      },
    },
    {
      field: "authority",
      headerName: "Authority",
      flex: 1.5,
      renderCell: (params: Record<string, any>) => {
        return <Box>{params?.row?.authority?.title}</Box>;
      },
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
        <MoreActionsMenu
          onEdit={() => router.push(`${path}/${row?.id}`)}
          onDelete={() => handleDelete(row?.id)}
          onStatusChange={() => statusHandler(row.id)}
          isActive={row?.status === "ACTIVATED"}
          isDeleted={row?.isDeleted}
        />
      ),
    },
  ];

  // Handle delete, status change
  const [deleteFT] = useDeleteFormsMutation();
  const [changeStatus] = useChangeFormsStatusMutation();

  const handleDelete = async (id: string) => {
    console.log({ id });
    const toastId = toast.loading("Please wait...");
    try {
      const res = await deleteFT(id);
      if (res?.data?.success) {
        toast.success(res?.data?.message, { id: toastId, duration: 5000 });
      }
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  const statusHandler = async (id: string) => {
    console.log({ id });
    const toastId = toast.loading("Please wait...");
    try {
      const res = await changeStatus(id);
      if (res?.data?.success) {
        toast.success(res?.data?.message, { id: toastId, duration: 5000 });
      }
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  // Pagination handler
  const handlePaginationChange = (newPaginationModel: any) => {
    setCurrentPage(newPaginationModel.page + 1); // DataGrid uses 0-based indexing, adjust to 1-based
    setLimit(newPaginationModel.pageSize);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {/* Create button */}
        <Grid size={4}>
          <Button
            component={Link}
            href={"/dashboard/super_admin/content/others/forms/create"}
            sx={{
              maxHeight: "40px",
              width: {
                xs: "100%",
                md: "50%",
              },
            }}
          >
            Create
          </Button>
        </Grid>
        {/* Search box */}
        <Grid size={8}>
          <SearchFiled setSearchText={setSearchTerm} />
        </Grid>

        {/* Filtering */}
        <Grid size={12}>
          <Box>
            <Grid container spacing={2}>
              <Grid size={6}>
                <SelectFilter
                  filter_title="Filter by Category"
                  options={category_options}
                  value={categoryId}
                  setValue={setCategoryId}
                  isDisable={isCategoryLoading}
                  fullWidth={true}
                />
              </Grid>
              <Grid size={6}>
                <SelectFilter
                  filter_title="Filter by Authority"
                  options={authority_options}
                  value={authorityId}
                  setValue={setAuthorityId}
                  isDisable={isAuthorityLoading}
                  fullWidth={true}
                />
              </Grid>

              <Grid size={6}>
                <SelectFilter
                  filter_title="Filter by status"
                  options={user_status_options}
                  value={status}
                  setValue={setStatus}
                  fullWidth={true}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      {!isLoading ? (
        <Box>
          <DataGrid
            rows={forms_data}
            columns={columns}
            pagination
            paginationMode="server"
            pageSizeOptions={[10, 25, 50]}
            rowCount={data?.meta?.total}
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
  );
};

export default FormsTable;
