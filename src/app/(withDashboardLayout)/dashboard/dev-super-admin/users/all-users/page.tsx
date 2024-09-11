import CMTable from "@/components/Dashboard/CMTable/CMTable";
import { rows } from "@/constants/tableData";
import { Box, Typography } from "@mui/material";

const AllUserPage = () => {
  const userTHead = [
    {
      _id: "KA01",
      title: "ID",
    },
    {
      _id: "KA02",
      title: "Name",
    },
    {
      _id: "KA03",
      title: "Address",
    },
    {
      _id: "KA04",
      title: "Phone",
    },
  ];
  return (
    <Box>
      <Typography>This is All Users Page</Typography>
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
