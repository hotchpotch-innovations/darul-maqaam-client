import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { makeChange } from "../../../../public/HomePageData/makeChange";
import MakeChangeCard from "../MakeChangeCard";
import { time } from "console";
import { TMakeChange } from "@/app/(withCommonLayout)/Types";
import Link from "next/link";

const MakeChange = () => {
  const data = makeChange;
  return (
    <Box bgcolor={"secondary.main"}>
      <Container
        sx={{
          paddingY: "50px",
        }}
      >
        <Typography variant="h4" className="text-center pb-8">
          Together Let’s make a change
        </Typography>
        <Grid className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {data?.slice(0, 6).map((item: TMakeChange) => (
            <MakeChangeCard key={item._id} data={item} />
          ))}
        </Grid>
        <Stack justifyContent={"center"} alignItems={"center"} pt={4}>
          <Link href="/donation">
            <Button
              sx={{
                width: "300px",
              }}
            >
              More
            </Button>
          </Link>
        </Stack>
      </Container>
    </Box>
  );
};

export default MakeChange;
