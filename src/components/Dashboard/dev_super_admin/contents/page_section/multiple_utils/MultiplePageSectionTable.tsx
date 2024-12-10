"use client";

import { useCategoryOptions } from "@/hooks/content/useCategoryOptions";
import {
  useChangeMPSItemStatusMutation,
  useChangePublishedMPSItemStatusMutation,
  useDeleteMPSItemMutation,
  useGetAllPrivateMPSQuery,
} from "@/redux/api/content/multiplePageSectionApi";
import { useDebounced } from "@/redux/hooks";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import BlockIcon from "@mui/icons-material/Block";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import RestoreIcon from "@mui/icons-material/Restore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { toast } from "sonner";
import SelectFilter from "@/components/Dashboard/DashboardFilters/SclectFilter";
import {
  isPublished_options,
  multiple_page_section_types_options,
  user_status_options,
} from "@/constants/options";
import SearchFiled from "@/components/Dashboard/DashboardFilters/SearchFiled";
import Loading from "@/components/ui/LoadingBar";
import MoreActionsMenu from "@/components/Dashboard/common/moreActionsMenu/MoreActionsMenu";
import { useRouter } from "next/navigation";

type TMPSQueryObj = {
  status?: string;
  type?: string;
  categoryId?: string;
  isPublished?: string;
  searchTerm?: string;
  page?: number;
  limit?: number;
};
type TCategoryQueryObj = {
  type?: string;
  page?: number;
  limit?: number;
};

const MultiplePageSectionTable = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState("");
  const [categoryId, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [isPublished, setIsPublished] = useState("");

  const path =
    "/dashboard/dev_super_admin/content/page-section/multiple/update";

  // Debounced search term to avoid too many API requests
  const debouncedTerm: any = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  // Create query object to pass to API call
  const mps_query_obj: TMPSQueryObj = {
    limit,
    page: currentPage, // Sending current page as 1-based to the API
  };
  // Create query object to pass to API call
  const category_query_obj: TCategoryQueryObj = {
    limit: 50,
    page: 1,
  };

  if (!!debouncedTerm) {
    mps_query_obj["searchTerm"] = debouncedTerm;
  }

  if (!!type) {
    mps_query_obj["type"] = type;
    category_query_obj["type"] = type;
  }
  if (!!categoryId) {
    mps_query_obj["categoryId"] = categoryId;
  }
  if (!!status) {
    mps_query_obj["status"] = status;
  }
  if (!!isPublished) {
    mps_query_obj["isPublished"] = isPublished;
  }

  const { options: category_options, isLoading: category_isLoading } =
    useCategoryOptions(category_query_obj);

  // Fetch MPS data using API hook
  const { data, isLoading } = useGetAllPrivateMPSQuery({
    ...mps_query_obj,
  });
  //   console.log({ data });

  const mps_data =
    data?.data?.data?.map((row: any, index: number) => ({
      ...row,
      index: (currentPage - 1) * limit + (index + 1),
      role: row?.user?.role,
    })) || [];

  const columns: GridColDef[] = [
    { field: "index", headerName: "SERIAL", width: 100 },
    {
      field: "profile_image",
      headerName: "IMAGE",
      flex: 0.5,
      renderCell: (params) => (
        <Box>
          <Image
            src={params?.row?.cover_image?.url || ""}
            alt="Cover_Image"
            width={100}
            height={100}
          />
        </Box>
      ),
    },
    {
      field: "title",
      headerName: "TITLE",
      flex: 1,
    },
    {
      field: "type",
      headerName: "TYPE",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      renderCell: (params) => <Box>{params?.row?.common_category?.title}</Box>,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      renderCell: (params) => (
        <Box>{params?.row?.price > 0 ? params?.row?.price : "N/A"}</Box>
      ),
    },
    {
      field: "discount_rate",
      headerName: "Discount Rate",
      flex: 1,
      renderCell: (params) => (
        <Box>
          {params?.row?.discount_rate > 0 ? params?.row?.discount_rate : "N/A"}
        </Box>
      ),
    },
    {
      field: "isPublished",
      headerName: "Is PUBLISHED",
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
              ...(!row.isPublished
                ? { color: "orangered" }
                : { color: "greenyellow" }),
            }}
          >
            {row?.isPublished ? "YES" : "NO"}
          </Box>
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
      renderCell: ({ row }) => (
        <MoreActionsMenu
          onEdit={() => router.push(`${path}/${row?.id}`)}
          onDelete={() => handleDelete(row?.id)}
          onStatusChange={() => statusHandler(row?.id)}
          onPublishChange={() => handlePublishedStatus(row?.id)}
          isDeleted={row.isDeleted}
          isActive={row.status === "ACTIVATED"}
          isPublished={row.isPublished}
        />
      ),
    },
  ];

  // Handle user status change
  const [deleteMPSItem] = useDeleteMPSItemMutation();
  const [changeStatus] = useChangeMPSItemStatusMutation();
  const [changePublishedStatus] = useChangePublishedMPSItemStatusMutation();

  const handleDelete = async (id: string) => {
    console.log({ id });
    const toastId = toast.loading("Please wait...");
    try {
      const res = await deleteMPSItem(id);
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

  const handlePublishedStatus = async (id: string) => {
    console.log({ id });
    const toastId = toast.loading("Please wait...");
    try {
      const res = await changePublishedStatus(id);
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
      {/* Top Row: Search and Create Button */}
      <Grid container spacing={2} alignItems="center">
        <Grid size={4} textAlign={{ xs: "center", md: "left" }}>
          <Button
            component={Link}
            href={
              "/dashboard/dev_super_admin/content/page-section/multiple/create"
            }
            sx={{
              maxHeight: "40px",
              width: {
                xs: "100%",
                md: "60%",
              },
            }}
          >
            Create
          </Button>
        </Grid>

        <Grid size={8}>
          <SearchFiled setSearchText={setSearchTerm} />
        </Grid>
      </Grid>

      {/* Bottom Row: Filters */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <SelectFilter
            filter_title="Select Type"
            options={multiple_page_section_types_options}
            value={type}
            setValue={setType}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <SelectFilter
            filter_title="Select Category"
            options={category_options}
            value={categoryId}
            setValue={setCategory}
            isDisable={!type}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <SelectFilter
            filter_title="Select Publish Status"
            options={isPublished_options}
            value={isPublished}
            setValue={setIsPublished}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <SelectFilter
            filter_title="Select status"
            options={user_status_options}
            value={status}
            setValue={setStatus}
            fullWidth
          />
        </Grid>
      </Grid>
      {!isLoading ? (
        <Box>
          <DataGrid
            rows={mps_data}
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

export default MultiplePageSectionTable;
