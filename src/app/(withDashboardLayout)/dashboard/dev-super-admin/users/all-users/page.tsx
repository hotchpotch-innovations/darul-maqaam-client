"use client";

import CMTable from "@/components/Dashboard/CMTable/CMTable";
import SelectFilter from "@/components/Dashboard/DashboardFilter/SclectFilter";
import { rows, select_items, userTHead } from "@/constants/tableData";
import { Box, Typography } from "@mui/material";
import { useState } from "react";

const AllUserPage = () => {
  const [value, setValue] = useState("");
  console.log(value);
  return (
    <Box>
      <Typography>This is All Users Page</Typography>
      <SelectFilter options={select_items} value={value} setValue={setValue} />
      <Box
        sx={{
          m: "30px 60px",
        }}
      >
        <CMTable pagination={true} table_title={userTHead} rows={rows || []} />
      </Box>
    </Box>
  );
};

export default AllUserPage;
