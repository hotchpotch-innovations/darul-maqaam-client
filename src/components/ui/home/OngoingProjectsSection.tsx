import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { makeChange } from "../../../../public/HomePageData/makeChange";
import { TMakeChange } from "@/app/(withCommonLayout)/Types";
import MakeChangeCard from "../MakeChangeCard";
import Link from "next/link";
import { onGoing } from "../../../../public/HomePageData/onGoing";
import OnGoingCard from "../OnGoingCard";

const OnProject = () => {
  const data = onGoing;
  return (
    <Box bgcolor={"white"}>
      <Container
        sx={{
          paddingY: "50px",
        }}
      >
        <Typography variant="h4" className="text-center pb-8">
          Ongoing projects
        </Typography>
        <Grid className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {data?.slice(0, 6).map((item: TMakeChange) => (
            <OnGoingCard key={item._id} data={item} />
          ))}
        </Grid>
        <Stack justifyContent={"center"} alignItems={"center"} pt={4}>
          <Link href="/ongoing-projects">
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

export default OnProject;
