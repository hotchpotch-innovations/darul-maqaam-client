import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import OnGoingCard from "../OnGoingCard";
import { MPS_Types } from "@/constants/options";

const OnProject = async () => {
  const backend_api = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const res = await fetch(
    `${backend_api}/content/multiple-page-section/public?type=${MPS_Types?.ongoing_project}&sortBy=createdAt&sortOrder=asc&page=1&limit=6&isPublished=true`,
    {
      cache: "no-store",
    }
  );
  const { data: ongoing_project_obj = {} } = await res.json();
  const ongoingProjectData = ongoing_project_obj?.data || [];
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
          {ongoingProjectData?.map((item: Record<string, any>) => (
            <OnGoingCard key={item?.id} data={item} />
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
