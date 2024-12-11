import Title from "@/components/UI/Title";
import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";

const NewsPage = () => {
  return (
    <Box bgcolor={"secondary.main"}>
      <Title title="news" />
      <Container
        sx={{
          padding: "34px 10px",
        }}
      >
        <Grid
          container
          columnSpacing={2}
          borderRadius={2}
          justifyContent="center"
          alignItems="center"
        >
          {Array.from({ length: 24 }).map((_, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              paddingY={4}
              paddingRight={2}
            >
              <Box
                padding={2}
                bgcolor={"white"}
                sx={{ border: "0.1px solid #dee2e6", borderRadius: "10px" }}
              >
                <Typography variant="h5" pb={2}>
                  This is News Title
                </Typography>
                <Image
                  className="rounded-[5px]"
                  src={
                    "https://t3.ftcdn.net/jpg/03/27/55/60/360_F_327556002_99c7QmZmwocLwF7ywQ68ChZaBry1DbtD.jpg"
                  }
                  alt="News Image"
                  height={315}
                  width={1000}
                />

                <Typography
                  pt={2}
                  pb={2}
                  fontSize={16}
                  className="text-justify"
                  color={"GrayText"}
                >
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Minus iure praesentium aliquam natus nobis commodi laudantium
                  doloremque quod, eveniet vero reiciendis laboriosam, nam sunt
                  asperiores totam magni iusto animi vel sequi consequatur harum
                  saepe ducimus. In mollitia accusamus consequuntur
                  necessitatibus eveniet laudantium. Molestias dicta repellat
                  rerum ipsa. Odit, accusantium odio!
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default NewsPage;
