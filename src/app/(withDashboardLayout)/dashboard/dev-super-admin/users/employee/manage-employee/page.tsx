"use client";

import CM_AllUsersTable from "@/components/dashboard/CMTable/CMTable";
import SelectFilter from "@/components/dashboard/dashboardFilter/SclectFilter";
import SearchFiled from "@/components/dashboard/dashboardFilter/SearchFiled";
import TitleDashboard from "@/components/dashboard/TitleDashboard";
import { rows, select_items, userTHead } from "@/constants/tableData";
import { Box, Stack } from "@mui/material";
import { useState } from "react";

const EmployeeManagePage = () => {
  const [value, setValue] = useState("");
  const [searchText, setSearchText] = useState("");

  return (
    <Box>
      <TitleDashboard title="Manage Employee" />

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

export default EmployeeManagePage;
