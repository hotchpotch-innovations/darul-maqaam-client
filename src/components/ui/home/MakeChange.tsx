import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import MakeChangeCard from "../MakeChangeCard";
import Link from "next/link";

const MakeChange = async () => {
  const backend_api = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const res = await fetch(
    `${backend_api}/content/webpage/public?menubarId=caedb2db-aa25-4edd-a15e-0b9006ab9779&isPublished=true`,
    {
      cache: "no-store",
    }
  );
  const { data: webpage = {} } = await res.json();
  const donation_data = webpage?.data || [];
  return (
    <Box bgcolor={"secondary.main"}>
      <Container
        sx={{
          paddingY: "50px",
        }}
      >
        <Typography variant="h4" className="text-center pb-8">
          Together Let make a change
        </Typography>
        <Grid className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {donation_data?.slice(0, 6).map((item: Record<string, any>) => (
            <MakeChangeCard key={item?.id} data={item} />
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
