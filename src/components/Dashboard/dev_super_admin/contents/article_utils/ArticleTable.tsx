"use client";
import dayjs from "dayjs";
import SelectFilter from "@/components/Dashboard/DashboardFilters/SclectFilter";
import SearchFiled from "@/components/Dashboard/DashboardFilters/SearchFiled";
import Loading from "@/components/ui/LoadingBar";
import { useDebounced } from "@/redux/hooks";
import { Box, Button, Stack, Tooltip, Typography } from "@mui/material";
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
  user_status_options,
} from "@/constants/options";
import { useCategoryOptions } from "@/hooks/content/useCategoryOptions";
import {
  useChangeArticleStatusMutation,
  useChangePublishedArticleStatusMutation,
  useDeleteArticleMutation,
  useGetAllArticlesQuery,
} from "@/redux/api/content/articleApi";
import BlockIcon from "@mui/icons-material/Block";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import UnpublishedIcon from "@mui/icons-material/Unpublished";

type TArticleQueryObj = {
  status?: string;
  type?: string;
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
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState("");
  const [categoryId, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const path = "/dashboard/dev_super_admin/content/articles/update";

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

  const { options: category_options, isLoading: category_isLoading } =
    useCategoryOptions(category_query_obj);

  // Fetch Admin data using API hook
  const { data, isLoading } = useGetAllArticlesQuery({ ...article_query_obj });
  //   console.log({ data });

  const article_data =
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
      renderCell: (params) => (
        <Box
          component={Link}
          href={`/dashboard/dev_super_admin/content/articles/details/${params?.row?.id}`}
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
      field: "author",
      headerName: "Author",
      flex: 1,
    },
    {
      field: "published_date",
      headerName: "Published Date",
      flex: 1,
      renderCell: (params: Record<string, any>) => {
        const date = dayjs(params?.published_date).format("DD MMM YYYY");
        return <Box>{date}</Box>;
      },
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
              component={Link}
              href={`${path}/${row?.id}`}
            >
              <EditIcon />
            </Typography>
          </Tooltip>
          <Tooltip title={row?.isPublished ? "Hide" : "Publish"}>
            <Typography
              sx={{
                color: row?.isPublished ? "orangered" : "greenyellow",
                cursor: "pointer",
              }}
              onClick={() => handlePublishedStatus(row?.id)}
            >
              {row?.isPublished ? (
                <UnpublishedIcon />
              ) : (
                <PublishedWithChangesIcon />
              )}
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
                color: row?.isDeleted ? "#de2c48" : "#C7253E",
                cursor: "pointer",
              }}
              onClick={() => handleDelete(row?.id)}
            >
              {row?.isDeleted ? <RestoreIcon /> : <DeleteOutlineIcon />}
            </Typography>
          </Tooltip>
        </Box>
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

  const handleStatus = async (id: string) => {
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
    <Box sx={{ m: "30px 60px" }}>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Box
          sx={{
            display: "flex",
            alignItems: "end",
            gap: "30px",
          }}
        >
          {/* Create Country Section */}
          <Button
            component={Link}
            href={"/dashboard/dev_super_admin/content/articles/create"}
            sx={{
              maxHeight: "40px",
            }}
          >
            Create
          </Button>
        </Box>

        <Box display="flex" gap={2}>
          <SelectFilter
            filter_title="Filter by Type"
            options={article_types_options}
            value={type}
            setValue={setType}
          />

          <SelectFilter
            filter_title="Filter by category"
            options={category_options}
            value={categoryId}
            setValue={setCategory}
            isDisable={!type}
          />
          <SelectFilter
            filter_title="Filter by status"
            options={user_status_options}
            value={status}
            setValue={setStatus}
          />
          <SearchFiled setSearchText={setSearchTerm} />
        </Box>
      </Stack>

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
