"use client";

import CM_AllUsersTable from "@/components/Dashboard/CMTable/CMTable";
import SelectFilter from "@/components/Dashboard/DashboardFilter/SclectFilter";
import SearchFiled from "@/components/Dashboard/DashboardFilter/SearchFiled";
import { rows, select_items, userTHead } from "@/constants/tableData";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

const AllUserPage = () => {
  const [value, setValue] = useState("");
  const [searchText, setSearchText] = useState("");
  console.log(searchText);

  return (
    <Box>
      <Typography
        fontSize={"24px"}
        align="center"
        borderBottom={"1px solid lightgray"}
        maxWidth={"400px"}
        mx={"auto"}
      >
        All User List
      </Typography>

      <Box
        sx={{
          m: "30px 60px",
        }}
      >
        <Stack direction={"row"} justifyContent={"space-between"} mb={2}>
          <SelectFilter
            filter_title="Filter By Type"
            options={select_items}
            value={value}
            setValue={setValue}
          />
          <SelectFilter
            filter_title="Filter By Type"
            options={select_items}
            value={value}
            setValue={setValue}
          />
          <SelectFilter
            filter_title="Filter By Type"
            options={select_items}
            value={value}
            setValue={setValue}
          />
          <SearchFiled setSearchText={setSearchText} />
        </Stack>
        <CM_AllUsersTable
          pagination={true}
          table_title={userTHead}
          rows={rows || []}
        />
      </Box>
    </Box>
  );
};

export default AllUserPage;
