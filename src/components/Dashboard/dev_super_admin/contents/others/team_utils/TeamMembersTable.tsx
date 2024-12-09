"use client";

import { useDepartmentOptions } from "@/hooks/useDepartmentOptions";
import { useDesignationOptions } from "@/hooks/useDesignationOptions";
import {
  useChangePublishedTeamStatusMutation,
  useChangeTeamStatusMutation,
  useDeleteTeamMutation,
  useGetAllPrivateTeamMemberQuery,
} from "@/redux/api/content/teamApi";
import { useDebounced } from "@/redux/hooks";
import { Box, Button, Tooltip, Typography } from "@mui/material";
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
import Grid from "@mui/material/Grid2";
import SearchFiled from "@/components/Dashboard/DashboardFilters/SearchFiled";
import SelectFilter from "@/components/Dashboard/DashboardFilters/SclectFilter";
import { isPublished_options, user_status_options } from "@/constants/options";
import Loading from "@/components/ui/LoadingBar";
import { useRouter } from "next/navigation";
import MoreActionsMenu from "@/components/Dashboard/common/moreActionsMenu/MoreActionsMenu";
import { user_status } from "@/constants";

type TQueryObj = {
  designationId?: string;
  departmentId?: string;
  status?: string;
  isPublished?: string;
  searchTerm?: string;
  page?: number;
  limit?: number;
};

const TeamMembersTable = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [designationId, setDesignationId] = useState("");
  const [isPublished, setIsPublished] = useState("");
  const [status, setStatus] = useState("");

  const path = "/dashboard/dev_super_admin/content/others/team/update";

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

  if (!!departmentId) {
    queryObj["departmentId"] = departmentId;
  }
  if (!!designationId) {
    queryObj["designationId"] = designationId;
  }
  if (!!isPublished) {
    queryObj["isPublished"] = isPublished;
  }
  if (!!status) {
    queryObj["status"] = status;
  }

  const { options: department_options, isLoading: department_isLoading } =
    useDepartmentOptions();

  const { options: designation_options, isLoading: designation_isLoading } =
    useDesignationOptions(queryObj);
  // Fetch Admin data using API hook
  const { data, isLoading } = useGetAllPrivateTeamMemberQuery({ ...queryObj });

  // index and also Role field to each user for serial number

  const team_data =
    data?.data?.data?.map((row: any, index: number) => ({
      ...row,
      index: (currentPage - 1) * limit + (index + 1),
      role: row?.user?.role,
    })) || [];

  const columns: GridColDef[] = [
    { field: "index", headerName: "SERIAL", width: 100 },
    {
      field: "image",
      headerName: "IMAGE",
      flex: 0.5,
      renderCell: (params) => (
        <Image src={params.row?.image} alt="profile" width={50} height={50} />
      ),
    },
    {
      field: "name",
      headerName: "NAME",
      flex: 1,
      renderCell: (params) => (
        <Box
          component={Link}
          href={`/dashboard/dev_super_admin/content/others/team/details/${params?.row?.id}`}
          sx={{
            ":hover": {
              textDecoration: "underline",
              color: "#1f68de",
            },
          }}
        >
          {params?.row?.name}
        </Box>
      ),
    },
    {
      field: "department",
      headerName: "DEPARTMENT",
      flex: 1.5,
      renderCell: (params: Record<string, any>) => {
        return <Box>{params?.row?.department?.title}</Box>;
      },
    },
    {
      field: "designation",
      headerName: "DESIGNATION",
      flex: 1.5,
      renderCell: (params: Record<string, any>) => {
        return <Box>{params?.row?.designation?.title}</Box>;
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
                ? { color: "greenyellow" }
                : { color: "orangered" }),
            }}
          >
            {row?.isPublished ? "YES" : "NO"}
          </Box>
        </Box>
      ),
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

  // Handle user status change
  const [deleteMember] = useDeleteTeamMutation();
  const [changeStatus] = useChangeTeamStatusMutation();
  const [changePublishedStatus] = useChangePublishedTeamStatusMutation();

  const handleDelete = async (id: string) => {
    console.log({ id });
    const toastId = toast.loading("Please wait...");
    try {
      const res = await deleteMember(id);
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
            href={"/dashboard/dev_super_admin/content/others/team/create"}
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
                  filter_title="Filter by Department"
                  options={department_options}
                  value={departmentId}
                  setValue={setDepartmentId}
                  fullWidth={true}
                />
              </Grid>
              <Grid size={6}>
                <SelectFilter
                  filter_title="Filter by designation"
                  options={designation_options}
                  value={designationId}
                  setValue={setDesignationId}
                  isDisable={!departmentId}
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
            rows={team_data}
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

export default TeamMembersTable;
