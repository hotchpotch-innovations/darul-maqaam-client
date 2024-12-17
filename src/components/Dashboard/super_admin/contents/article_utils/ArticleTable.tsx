"use client";
import dayjs from "dayjs";
import SelectFilter from "@/components/Dashboard/DashboardFilters/SclectFilter";
import SearchFiled from "@/components/Dashboard/DashboardFilters/SearchFiled";
import Loading from "@/components/UI/LoadingBar";
import { useDebounced } from "@/redux/hooks";
import { Box, Button, TextField, Tooltip, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import RestoreIcon from "@mui/icons-material/Restore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { toast } from "sonner";
import {
  article_types_options,
  isPublished_options,
  user_status_options,
} from "@/constants/options";
import { useCategoryOptions } from "@/hooks/content/useCategoryOptions";
import {
  useChangeArticleStatusMutation,
  useChangePublishedArticleStatusMutation,
  useDeleteArticleMutation,
  useGetAllPrivateArticlesQuery,
} from "@/redux/api/content/articleApi";
import { useRouter } from "next/navigation";
import MoreActionsMenu from "@/components/Dashboard/common/moreActionsMenu/MoreActionsMenu";

type TArticleQueryObj = {
  status?: string;
  type?: string;
  isPublished?: string;
  categoryId?: string;
  searchTerm?: string;
  page?: number;
  limit?: number;
};
type TCategoryQueryObj = {
  type?: string;
  page?: number;
  limit?: number;
};
const ArticleTable = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState("");
  const [categoryId, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [isPublished, setIsPublished] = useState("");

  const path = "/dashboard/super_admin/content/articles/update";

  // Debounced search term to avoid too many API requests
  const debouncedTerm: any = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  // Create query object to pass to API call
  const article_query_obj: TArticleQueryObj = {
    limit,
    page: currentPage, // Sending current page as 1-based to the API
  };
  // Create query object to pass to API call
  const category_query_obj: TCategoryQueryObj = {
    limit: 50,
    page: 1,
  };

  if (!!debouncedTerm) {
    article_query_obj["searchTerm"] = debouncedTerm;
  }

  if (!!type) {
    article_query_obj["type"] = type;
    category_query_obj["type"] = type;
  }
  if (!!categoryId) {
    article_query_obj["categoryId"] = categoryId;
  }
  if (!!status) {
    article_query_obj["status"] = status;
  }
  if (!!isPublished) {
    article_query_obj["isPublished"] = isPublished;
  }

  const { options: category_options, isLoading: category_isLoading } =
    useCategoryOptions(category_query_obj);

  // Fetch Admin data using API hook
  const { data, isLoading } = useGetAllPrivateArticlesQuery({
    ...article_query_obj,
  });
  //   console.log({ data });

  const article_data =
    data?.data?.data?.map((row: any, index: number) => ({
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
      field: "profile_image",
      headerName: "IMAGE",
      flex: 0.5,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Image
            src={params?.row?.cover_image?.url}
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
      sortable: false,
    },
    {
      field: "type",
      headerName: "TYPE",
      flex: 1,
      disableColumnMenu: true,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      disableColumnMenu: true,
      renderCell: (params) => <Box>{params?.row?.common_category?.title}</Box>,
    },
    {
      field: "author",
      headerName: "Author",
      flex: 1,
      sortable: false,
    },
    {
      field: "published_date",
      headerName: "Published Date",
      flex: 1,
      disableColumnMenu: true,
      renderCell: (params: Record<string, any>) => {
        const date = dayjs(params?.published_date).format("DD MMM YYYY");
        return <Box>{date}</Box>;
      },
    },
    {
      field: "isPublished",
      headerName: "Is PUBLISHED",
      disableColumnMenu: true,
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
      disableColumnMenu: true,
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
      disableColumnMenu: true,
      sortable: false,
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
  const [deleteArticle] = useDeleteArticleMutation();
  const [changeStatus] = useChangeArticleStatusMutation();
  const [changePublishedStatus] = useChangePublishedArticleStatusMutation();

  const handleDelete = async (id: string) => {
    console.log({ id });
    const toastId = toast.loading("Please wait...");
    try {
      const res = await deleteArticle(id);
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
      <Grid container spacing={2}>
        {/* Create button */}
        <Grid size={4}>
          <Button
            component={Link}
            href={"/dashboard/super_admin/content/articles/create"}
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
                  filter_title="Filter by Type"
                  options={article_types_options}
                  value={type}
                  setValue={setType}
                  fullWidth={true}
                />
              </Grid>
              <Grid size={6}>
                <SelectFilter
                  filter_title="Filter by category"
                  options={category_options}
                  value={categoryId}
                  setValue={setCategory}
                  isDisable={!type}
                  fullWidth={true}
                />
              </Grid>

              <Grid size={6}>
                <SelectFilter
                  filter_title="Filter by publish status"
                  options={isPublished_options}
                  value={isPublished}
                  setValue={setIsPublished}
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
            rows={article_data}
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

export default ArticleTable;
