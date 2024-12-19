"use client";

import SearchFiled from "@/components/Dashboard/DashboardFilters/SearchFiled";
import Loading from "@/components/UI/LoadingBar";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { useDebounced } from "@/redux/hooks";
import Image from "next/image";
import {
  useDeleteCountryMutation,
  useGetAllCountryQuery,
} from "@/redux/api/user/settings/countryApi";
import ConutryModla from "@/components/UI/modals/ConutryModla";
import MoreActionsMenu from "@/components/Dashboard/common/moreActionsMenu/MoreActionsMenu";

type TQueryObj = {
  designationId?: string;
  departmentId?: string;
  searchTerm?: string;
  page?: number;
  limit?: number;
};

const CountryTable = () => {
  //Modal Functionality Is Start
  const [open, setOpen] = useState(false);
  const [obj, setObj] = useState({});
  const handleOpen = (row: any) => {
    setOpen(true);
    setObj(row);
  };

  const path_create_country =
    "/dashboard/dev_super_admin/users/settings/address/country/create";
  const [currentPage, setCurrentPage] = useState(1);

  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Debounced search term to avoid too many API requests
  const debouncedTerm: any = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  // Create query object to pass to API call
  const queryObj: TQueryObj = {
    limit,
    page: currentPage,
  };

  if (debouncedTerm) {
    queryObj["searchTerm"] = debouncedTerm;
  }

  // get All Country data
  const { data, isLoading } = useGetAllCountryQuery({ ...queryObj });

  // index and also Role field to each user for serial number
  const rowsWithIndex =
    data?.data?.data?.map((row: any, index: number) => ({
      ...row,
      index: (currentPage - 1) * limit + (index + 1),
      role: row?.user?.role,
    })) || [];

  const columns: GridColDef[] = [
    { field: "index", headerName: "SERIAL", width: 80 },
    {
      field: "profile_image",
      headerName: "IMAGE",
      flex: 0.5,
      headerAlign: "center",
      align: "center",

      renderCell: (params) => (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src={params?.row?.symbol}
            alt="profile"
            width={50}
            height={50}
          />
        </Box>
      ),
    },

    { field: "name", headerName: "NAME", flex: 2.5 },
    { field: "currency", headerName: "CURRENCY", flex: 1 },
    {
      field: "iso3",
      headerName: "ISO3",
      flex: 1,
    },

    { field: "code", headerName: "CODE", flex: 1 },
    { field: "phone_code", headerName: "PHONE CODE", flex: 1 },

    {
      field: "Action",
      headerName: "ACTIONS",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => (
        <MoreActionsMenu
          onEdit={() => handleOpen(row)}
          onDelete={() => handleDelete(row?.id)}
          isDeleted={row?.isDeleted}
        />
      ),
    },
  ];

  // Handle user status change
  const [deleteCountry] = useDeleteCountryMutation();

  const handleDelete = async (id: string) => {
    console.log({ id });
    const toastId = toast.loading("Please wait...");
    try {
      const res = await deleteCountry(id);
      if (res?.data?.success) {
        toast.success(res?.data?.message, { id: toastId, duration: 5000 });
      }
    } catch (err: any) {
      toast.error(err?.message, { id: toastId, duration: 5000 });
    }
  };

  // Pagination handler
  const handlePaginationChange = (newPaginationModel: any) => {
    setCurrentPage(newPaginationModel.page + 1);
    setLimit(newPaginationModel.pageSize);
  };

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 6, lg: 6 }} textAlign="left">
            <Button
              component={Link}
              href={path_create_country}
              sx={{
                maxHeight: "40px",
                width: "60%",
              }}
            >
              Create
            </Button>
          </Grid>
          <Grid size={{ xs: 6, lg: 6 }}>
            <SearchFiled setSearchText={setSearchTerm} />
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
              rowCount={data?.data?.meta?.total}
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

      <ConutryModla obj={obj} setState={setOpen} open={open} />
    </>
  );
};

export default CountryTable;
