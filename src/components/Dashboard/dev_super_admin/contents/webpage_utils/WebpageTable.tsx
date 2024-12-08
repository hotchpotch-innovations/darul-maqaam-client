"use client";

import SelectFilter from "@/components/Dashboard/DashboardFilters/SclectFilter";
import SearchFiled from "@/components/Dashboard/DashboardFilters/SearchFiled";
import Loading from "@/components/ui/LoadingBar";
import {
  isPublished_options,
  user_status_options,
  webpage_types_options,
} from "@/constants/options";
import {
  TMenubarQueryObj,
  useMenubarOptions,
} from "@/hooks/content/useMenubarOptions";
import useSubmenuOptions, {
  TSubmenuQueryObj,
} from "@/hooks/content/useSubmenuOptions";
import {
  useChangePublishedWebpageStatusMutation,
  useChangeWebpageStatusMutation,
  useDeleteWebpageMutation,
  useGetAllPrivateWebpageQuery,
} from "@/redux/api/content/webpageApi";
import { useDebounced } from "@/redux/hooks";
import { Box, Button, Stack, Tooltip, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import BlockIcon from "@mui/icons-material/Block";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import RestoreIcon from "@mui/icons-material/Restore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useState } from "react";
import { toast } from "sonner";
import MoreActionsMenu from "@/components/Dashboard/common/moreActionsMenu/MoreActionsMenu";
import { useRouter } from "next/navigation";

type TWebpageQueryObj = {
  status?: string;
  page_type?: string;
  isPublished?: string;
  menubarId?: string;
  submenuId?: string;
  searchTerm?: string;
  page?: number;
  limit?: number;
};

const WebpageTable = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState("");
  const [menubarId, setMenubarId] = useState("");
  const [submenuId, setSubmenuId] = useState("");
  const [status, setStatus] = useState("");
  const [isPublished, setIsPublished] = useState("");

  const path = "/dashboard/dev_super_admin/content/web-page/update";

  // Debounced search term to avoid too many API requests
  const debouncedTerm: any = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  // Create query object to pass to API call
  const webpage_query_obj: TWebpageQueryObj = {
    limit,
    page: currentPage, // Sending current page as 1-based to the API
  };
  // Create query object to pass to API call
  const menubar_query_obj: TMenubarQueryObj = {
    limit: 50,
    page: 1,
  };

  const submenu_query_obj: TSubmenuQueryObj = {
    limit: 50,
    page: 1,
  };

  if (!!debouncedTerm) {
    webpage_query_obj["searchTerm"] = debouncedTerm;
  }

  if (!!type) {
    webpage_query_obj["page_type"] = type;
  }

  if (!!menubarId) {
    webpage_query_obj["menubarId"] = menubarId;
    submenu_query_obj["menubarId"] = menubarId;
  }

  if (!!status) {
    webpage_query_obj["status"] = status;
  }
  if (!!isPublished) {
    webpage_query_obj["isPublished"] = isPublished;
  }

  const { options: menubar_options, isLoading: menubar_isLoading } =
    useMenubarOptions(menubar_query_obj);

  const { options: submenu_options, isLoading: submenu_isLoading } =
    useSubmenuOptions(submenu_query_obj);

  // Fetch Admin data using API hook
  const { data, isLoading } = useGetAllPrivateWebpageQuery({
    ...webpage_query_obj,
  });
  //   console.log({ data });

  // assign data
  const webpage_data =
    data?.data?.data?.map((row: any, index: number) => ({
      ...row,
      index: (currentPage - 1) * limit + (index + 1),
      role: row?.user?.role,
    })) || [];

  // assign column
  const columns: GridColDef[] = [
    {
      field: "index",
      headerName: "SERIAL",
      width: 60,
      disableColumnMenu: true,
    },
    {
      field: "og_image",
      headerName: "IMAGE",
      flex: 0.5,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Image
            src={params?.row?.og_image}
            alt="Open Graph Image"
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
      renderCell: (params) => (
        <Box
          component={Link}
          href={`/dashboard/dev_super_admin/content/web-page/details/${params?.row?.slug}`}
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
      field: "menubar",
      headerName: "Menubar",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Box>
          {params?.row?.menubar?.title ? params?.row?.menubar?.title : "N/A"}
        </Box>
      ),
    },
    {
      field: "submenu",
      headerName: "Submenu",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Box>
          {params?.row?.submenu?.title ? params?.row?.submenu?.title : "N/A"}
        </Box>
      ),
    },
    {
      field: "og_author",
      headerName: "OG Author",
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
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      renderCell: ({ row }) => (
        <MoreActionsMenu
          onEdit={() => router.push(`${path}/${row?.slug}`)}
          onDelete={() => handleDelete(row?.id)}
          onStatusChange={() => handleStatus(row?.id)}
          onPublishChange={() => handlePublishedStatus(row?.id)}
          isDeleted={row.isDeleted}
          isActive={row.status === "ACTIVATED"}
          isPublished={row.isPublished}
        />
      ),
    },
  ];

  // Handle user status change
  const [deleteWebpage] = useDeleteWebpageMutation();
  const [changeStatus] = useChangeWebpageStatusMutation();
  const [changePublishedStatus] = useChangePublishedWebpageStatusMutation();

  const handleDelete = async (id: string) => {
    console.log({ id });
    const toastId = toast.loading("Please wait...");
    try {
      const res = await deleteWebpage(id);
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
    <Box sx={{ p: 2 }}>
      {/* Button and search field */}
      <Grid container spacing={2} alignItems="center">
        <Grid size={4}>
          <Button
            component={Link}
            href={"/dashboard/dev_super_admin/content/web-page/create"}
            sx={{
              maxHeight: "40px",
              width: "60%",
            }}
          >
            Create
          </Button>
        </Grid>

        <Grid size={8}>
          <SearchFiled setSearchText={setSearchTerm} />
        </Grid>
      </Grid>

      {/* Filter (Type & Menu) */}
      <Grid container spacing={2} alignItems="center" mt={2}>
        <Grid size={6}>
          <SelectFilter
            filter_title="Content Type"
            options={webpage_types_options}
            value={type}
            setValue={setType}
            fullWidth
          />
        </Grid>

        <Grid size={6}>
          <SelectFilter
            filter_title="Menu Selection"
            options={menubar_options}
            value={menubarId}
            setValue={setMenubarId}
            isDisable={menubar_isLoading}
            fullWidth
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} alignItems="center" mt={2}>
        <Grid size={4}>
          <SelectFilter
            filter_title="Submenu Selection"
            options={submenu_options}
            value={submenuId}
            setValue={setSubmenuId}
            fullWidth
            isDisable={!menubarId}
          />
        </Grid>
        <Grid size={4}>
          <SelectFilter
            filter_title="Publication Status"
            options={isPublished_options}
            value={isPublished}
            setValue={setIsPublished}
            fullWidth
          />
        </Grid>
        <Grid size={4}>
          <SelectFilter
            filter_title="User Status"
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
            rows={webpage_data}
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

export default WebpageTable;
