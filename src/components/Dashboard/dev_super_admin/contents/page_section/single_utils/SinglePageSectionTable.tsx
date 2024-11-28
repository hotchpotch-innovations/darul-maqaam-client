"use client";

import { user_status } from "@/constants";
import {
  TMenubarQueryObj,
  useMenubarOptions,
} from "@/hooks/content/useMenubarOptions";
import useSubmenuOptions, {
  TSubmenuQueryObj,
} from "@/hooks/content/useSubmenuOptions";
import useWebpageOptions, {
  TWebpageQueryObj,
} from "@/hooks/content/useWebpageOptions";
import {
  useChangeSPSStatusMutation,
  useDeleteSPSMutation,
  useGetAllPrivateSPSQuery,
} from "@/redux/api/content/singlePageSectionApi";
import { useDebounced } from "@/redux/hooks";
import { Box, Button, Stack, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import RestoreIcon from "@mui/icons-material/Restore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { toast } from "sonner";
import SelectFilter from "@/components/Dashboard/DashboardFilters/SclectFilter";
import { user_status_options } from "@/constants/options";
import SearchFiled from "@/components/Dashboard/DashboardFilters/SearchFiled";
import Loading from "@/components/ui/LoadingBar";

type TSPSQueryObj = {
  webpageId?: string;
  menubarId?: string;
  submenuId?: string;
  searchTerm?: string;
  status?: string;
  page?: number;
  limit?: number;
};

const SinglePageSectionTable = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [menubarId, setMenubarId] = useState("");
  const [submenuId, setSubmenuId] = useState("");
  const [webpageId, setWebpageId] = useState("");
  const [status, setStatus] = useState("");

  const path = "/dashboard/dev_super_admin/content/page-section/single/update";

  // Debounced search term to avoid too many API requests
  const debouncedTerm: any = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  const menubarQueryObj: TMenubarQueryObj = {
    page: 1,
    limit: 50,
  };
  const submenuQueryObj: TSubmenuQueryObj = {
    page: 1,
    limit: 50,
  };

  const webpageQueryObj: TWebpageQueryObj = {
    page: 1,
    limit: 50,
    only_wp: "true",
  };

  const pageSectionQueryObj: TSPSQueryObj = {
    page: 1,
    limit: 50,
  };

  // query assign
  if (!!debouncedTerm) {
    pageSectionQueryObj["searchTerm"] = debouncedTerm;
  }

  if (!!menubarId) {
    webpageQueryObj["menubarId"] = menubarId;
    submenuQueryObj["menubarId"] = menubarId;
    pageSectionQueryObj["menubarId"] = menubarId;
    delete webpageQueryObj["only_wp"];
  }
  if (!!submenuId) {
    webpageQueryObj["submenuId"] = submenuId;
    pageSectionQueryObj["submenuId"] = submenuId;
    delete webpageQueryObj["only_wp"];
  }
  if (!!webpageId) {
    pageSectionQueryObj["webpageId"] = webpageId;
  }
  if (!!status) {
    pageSectionQueryObj["status"] = status;
  }

  // get options
  const { options: menubar_options, isLoading: isMenubarLoading } =
    useMenubarOptions(menubarQueryObj);
  const { options: submenu_options, isLoading: isSubmenuLoading } =
    useSubmenuOptions(submenuQueryObj);
  const { options: webpage_options, isLoading: isWebpageLoading } =
    useWebpageOptions(webpageQueryObj);

  // Fetch MPS data using API hook
  const { data, isLoading } = useGetAllPrivateSPSQuery({
    ...pageSectionQueryObj,
  });

  //   console.log({ data });

  const sps_data =
    data?.data?.data?.map((row: any, index: number) => ({
      ...row,
      index: (currentPage - 1) * limit + (index + 1),
      role: row?.user?.role,
    })) || [];

  // column
  const columns: GridColDef[] = [
    { field: "index", headerName: "SERIAL", width: 80 },
    {
      field: "section_name",
      headerName: "Section Name",
      flex: 1,
      renderCell: (params) => (
        <Box
          component={Link}
          href={`/dashboard/dev_super_admin/content/page-section/single/details/${params?.row?.id}`}
          sx={{
            ":hover": {
              textDecoration: "underline",
              color: "#1f68de",
            },
          }}
        >
          {params?.row?.section_name}
        </Box>
      ),
    },
    {
      field: "section_slug",
      headerName: "Section Slug",
      flex: 1,
    },
    {
      field: "menubar",
      headerName: "Menu",
      flex: 1,
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
      renderCell: (params) => (
        <Box>
          {params?.row?.submenu?.title ? params?.row?.submenu?.title : "N/A"}
        </Box>
      ),
    },
    {
      field: "webpage",
      headerName: "Webpage",
      flex: 1,
      renderCell: (params) => <Box>{params?.row?.webpage?.title}</Box>,
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

  // Handle change
  const [deleteSPSItem] = useDeleteSPSMutation();
  const [changeStatus] = useChangeSPSStatusMutation();

  const handleDelete = async (id: string) => {
    console.log({ id });
    const toastId = toast.loading("Please wait...");
    try {
      const res = await deleteSPSItem(id);
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
            href={
              "/dashboard/dev_super_admin/content/page-section/single/create"
            }
            sx={{
              maxHeight: "40px",
            }}
          >
            Create
          </Button>
        </Box>
        <Box display="flex" gap={2}>
          <SelectFilter
            filter_title="Filter Menubar"
            options={menubar_options}
            value={menubarId}
            setValue={setMenubarId}
            isDisable={isMenubarLoading}
          />

          <SelectFilter
            filter_title="Filter by Submenu"
            options={submenu_options}
            value={submenuId}
            setValue={setSubmenuId}
            isDisable={!menubarId || isSubmenuLoading}
          />
          <SelectFilter
            filter_title="Filter by Webpage"
            options={webpage_options}
            value={webpageId}
            setValue={setWebpageId}
            isDisable={isWebpageLoading}
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
            rows={sps_data}
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

export default SinglePageSectionTable;
