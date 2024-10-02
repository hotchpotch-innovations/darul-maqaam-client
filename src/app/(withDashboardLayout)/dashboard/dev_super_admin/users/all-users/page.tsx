// "use client";

// import {
//   useChangeUserStatusMutation,
//   useGetAllUsersQuery,
// } from "@/redux/api/user/userApi";
// import { useState } from "react";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import { Box, Button, Stack, Typography } from "@mui/material";
// import TitleDashboard from "@/components/dashboard/TitleDashboard";
// import SelectFilter from "@/components/dashboard/dashboardFilter/SclectFilter";

// import SearchFiled from "@/components/dashboard/dashboardFilter/SearchFiled";
// import BlockIcon from "@mui/icons-material/Block";
// import TaskAltIcon from "@mui/icons-material/TaskAlt";
// import { toast } from "sonner";
// import {
//   account_type_options,
//   dev_super_admin_user_role_options,
//   user_status_options,
// } from "@/constants/options";
// import { useDebounced } from "@/redux/hooks";
// import page from "../admin/create-admin/page";

// type TQueryObj = {
//   account_type?: string;
//   role?: string;
//   status?: string;
//   searchTerm?: string;
//   page?: number;
//   limit?: number;
// };

// const AllUserPage = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [accountType, setAccountType] = useState("");
//   const [userRole, setUserRole] = useState("");
//   const [userStatus, setUserStatus] = useState("");

//   console.log(currentPage + "=================");
//   const queryObj: TQueryObj = {};

//   const [paginationModel, setPaginationModel] = useState({
//     page: currentPage - 1,
//     pageSize: limit,
//   });

//   const debouncedTerm = useDebounced({ searchQuery: searchTerm, delay: 600 });

//   queryObj["limit"] = limit;
//   queryObj["page"] = currentPage;

//   if (!!debouncedTerm) {
//     queryObj["searchTerm"] = searchTerm;
//   }

//   if (!!accountType) {
//     queryObj["account_type"] = accountType;
//   }

//   if (!!userRole) {
//     queryObj["role"] = userRole;
//   }

//   if (!!userStatus) {
//     queryObj["status"] = userStatus;
//   }

//   const { data, isLoading, isFetching } = useGetAllUsersQuery({ ...queryObj });

//   // Add index field to each user for serial number
//   const rowsWithIndex = data?.data?.map((row: any, index: number) => ({
//     ...row,
//     index: index + 1, // This will give you a 1-based index for each row
//   }));

//   const columns: GridColDef[] = [
//     { field: "index", headerName: "SERIAL", width: 100 },
//     { field: "gu_id", headerName: "USER ID", flex: 1 },
//     { field: "email", headerName: "EMAIL", flex: 2 },
//     { field: "role", headerName: "ROLE", flex: 1 },
//     { field: "status", headerName: "STATUS", flex: 1 },
//     { field: "account_type", headerName: "ACCOUNT TYPE", flex: 1 },
//     {
//       field: "Action",
//       headerName: "ACTIONS",
//       headerAlign: "center",
//       align: "center",
//       flex: 1,
//       renderCell: ({ row }) => {
//         return (
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center", // Vertically center
//               justifyContent: "center", // Horizontally center
//               width: "100%", // Make sure it takes up the full cell width
//               height: "100%", // Ensure it takes up the full cell height
//             }}
//           >
//             <Typography
//               sx={{
//                 color: row?.status === "ACTIVATED" ? "red" : "green",
//                 cursor: "pointer",
//                 outline: "none",
//                 border: "none",
//                 boxShadow: "none",
//               }}
//               onClick={() => handleStatus(row?.gu_id)}
//             >
//               {row?.status === "ACTIVATED" ? <BlockIcon /> : <TaskAltIcon />}
//             </Typography>
//           </Box>
//         );
//       },
//     },

//     // other columns...
//   ];

//   // const paginationModel = { page: 0, pageSize: 5 };
//   const [changeUserStatus] = useChangeUserStatusMutation();

//   const handleStatus = async (id: string) => {
//     const toastId = toast.loading("Pleace wait...");

//     try {
//       const res = await changeUserStatus(id);

//       if (res?.data?.success) {
//         toast.success(res?.data?.message, { id: toastId, duration: 5000 });
//       }
//     } catch (err: any) {
//       toast.error(err?.message);
//       console.log(err);
//     }
//   };

//   // Pageination Section
//   const handlePaginationChange = (newPaginationModel: any) => {
//     setCurrentPage(newPaginationModel.page + 1);
//     setPaginationModel(newPaginationModel);
//     setLimit(newPaginationModel.pageSize);
//     console.log("Current Page:", newPaginationModel.page); // You can use this to get the page
//     console.log("Page Size Options:", newPaginationModel.pageSize); // You can use this to get the page
//   };

//   console.log(queryObj);
//   console.log(data?.data);

//   return (
//     <Box>
//       <TitleDashboard title="All Users List" />

//       <Box
//         sx={{
//           m: "30px 60px",
//         }}
//       >
//         <Stack direction={"row"} justifyContent={"space-between"} mb={2}>
//           <SelectFilter
//             filter_title="Search by account type"
//             options={account_type_options}
//             value={accountType}
//             setValue={setAccountType}
//           />
//           <SelectFilter
//             filter_title="Search by user role"
//             options={dev_super_admin_user_role_options}
//             value={userRole}
//             setValue={setUserRole}
//           />
//           <SelectFilter
//             filter_title="Search by user status"
//             options={user_status_options}
//             value={userStatus}
//             setValue={setUserStatus}
//           />
//           <SearchFiled setSearchText={setSearchTerm} />
//         </Stack>
//         {!isLoading ? (
//           <Box>
//             <DataGrid
//               rows={rowsWithIndex} // Use the rows with added index field
//               columns={columns}
//               initialState={{ pagination: { paginationModel } }}
//               pageSizeOptions={[10, 25, 50]}
//               rowCount={data?.meta?.total}
//               onPaginationModelChange={handlePaginationChange} // Handle pagination changes
//               sx={{ border: "none", outline: "none", boxShadow: "none" }}
//             />
//           </Box>
//         ) : (
//           <Typography>Loading...!!!</Typography>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default AllUserPage;

"use client";

import {
  useChangeUserStatusMutation,
  useGetAllUsersQuery,
} from "@/redux/api/user/userApi";
import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Stack, Typography } from "@mui/material";
import TitleDashboard from "@/components/dashboard/TitleDashboard";
import SelectFilter from "@/components/dashboard/dashboardFilter/SclectFilter";
import SearchFiled from "@/components/dashboard/dashboardFilter/SearchFiled";
import BlockIcon from "@mui/icons-material/Block";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { toast } from "sonner";
import {
  account_type_options,
  dev_super_admin_user_role_options,
  user_status_options,
} from "@/constants/options";
import { useDebounced } from "@/redux/hooks";

type TQueryObj = {
  account_type?: string;
  role?: string;
  status?: string;
  searchTerm?: string;
  page?: number;
  limit?: number;
};

const AllUserPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [accountType, setAccountType] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userStatus, setUserStatus] = useState("");

  // Debounced search term to avoid too many API requests
  const debouncedTerm = useDebounced({ searchQuery: searchTerm, delay: 600 });

  // Create query object to pass to API call
  const queryObj: TQueryObj = {
    limit,
    page: currentPage, // Sending current page as 1-based to the API
  };

  if (debouncedTerm) {
    queryObj["searchTerm"] = debouncedTerm;
  }

  if (accountType) {
    queryObj["account_type"] = accountType;
  }

  if (userRole) {
    queryObj["role"] = userRole;
  }

  if (userStatus) {
    queryObj["status"] = userStatus;
  }

  // Fetch user data using API hook
  const { data, isLoading } = useGetAllUsersQuery({ ...queryObj });

  // Add index field to each user for serial number
  const rowsWithIndex =
    data?.data?.map((row: any, index: number) => ({
      ...row,
      index: (currentPage - 1) * limit + (index + 1),
    })) || [];

  // Define table columns
  const columns: GridColDef[] = [
    { field: "index", headerName: "SERIAL", width: 100 },
    { field: "gu_id", headerName: "USER ID", flex: 1 },
    { field: "email", headerName: "EMAIL", flex: 2 },
    { field: "role", headerName: "ROLE", flex: 1 },
    { field: "status", headerName: "STATUS", flex: 1 },
    { field: "account_type", headerName: "ACCOUNT TYPE", flex: 1 },
    {
      field: "Action",
      headerName: "ACTIONS",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                color: row?.status === "ACTIVATED" ? "red" : "green",
                cursor: "pointer",
              }}
              onClick={() => handleStatus(row?.gu_id)}
            >
              {row?.status === "ACTIVATED" ? <BlockIcon /> : <TaskAltIcon />}
            </Typography>
          </Box>
        );
      },
    },
  ];

  // Handle user status change
  const [changeUserStatus] = useChangeUserStatusMutation();
  const handleStatus = async (id: string) => {
    const toastId = toast.loading("Please wait...");
    try {
      const res = await changeUserStatus(id);
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
    <Box>
      <TitleDashboard title="All Users List" />
      <Box sx={{ m: "30px 60px" }}>
        <Stack direction="row" justifyContent="space-between" mb={2}>
          <SelectFilter
            filter_title="Search by account type"
            options={account_type_options}
            value={accountType}
            setValue={setAccountType}
          />
          <SelectFilter
            filter_title="Search by user role"
            options={dev_super_admin_user_role_options}
            value={userRole}
            setValue={setUserRole}
          />
          <SelectFilter
            filter_title="Search by user status"
            options={user_status_options}
            value={userStatus}
            setValue={setUserStatus}
          />
          <SearchFiled setSearchText={setSearchTerm} />
        </Stack>

        {!isLoading ? (
          <Box>
            <DataGrid
              rows={rowsWithIndex} // Use the rows with the added index field
              columns={columns}
              pagination
              paginationMode="server" // Use server-side pagination
              pageSizeOptions={[10, 25, 50]}
              rowCount={data?.meta?.total || 0} // Total rows in the database
              paginationModel={{ page: currentPage - 1, pageSize: limit }} // Adjust for 0-based index in DataGrid
              onPaginationModelChange={handlePaginationChange} // Handle pagination changes
              sx={{ border: "none", outline: "none", boxShadow: "none" }}
            />
          </Box>
        ) : (
          <Typography>Loading...!!!</Typography>
        )}
      </Box>
    </Box>
  );
};

export default AllUserPage;
