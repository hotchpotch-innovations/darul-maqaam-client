import CMTable from "@/components/Dashboard/CMTable/CMTable";
import { rows } from "@/constants/tableData";
import { Box, Typography } from "@mui/material";

const AllUserPage = () => {
  return (
    <Box>
      <Typography>This is All Users Page</Typography>
      <Box
        sx={{
          m: "30px 60px",
        }}
      >
        <CMTable pagination={true} rows={rows || []} />
      </Box>
    </Box>
  );
};

export default AllUserPage;
