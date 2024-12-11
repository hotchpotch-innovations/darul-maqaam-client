import { TMakeChange } from "@/app/(withCommonLayout)/Types";
import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";

type TCardProps = {
  _id?: string;
  image?: string;
  found?: string;
  donationDetails?: string;
};

const MakeChangeCard = ({ data }: { data: TCardProps }) => {
  return (
    <Grid
      item
      xs={12}
      md={6}
      lg={4}
      className="rounded-es-[50px] rounded-se-[50px] bg-white hover:shadow-xl transition-all duration-500 max-w-[420px] group"
    >
      <Image
        src={data?.image ? data.image : ""}
        alt="Card Image"
        height={300}
        width={200}
        className="rounded-se-[50px] w-full group-hover:grayscale border-b-4 border-green-500"
      />
      <Box px={2} pb={4}>
        <Typography
          color={"primary.main"}
          align="center"
          variant="h6"
          pt={3}
          pb={1}
        >
          {data.found}
        </Typography>
        <Typography fontSize={14} className="text-justify pb-8 text-gray-500">
          {data.donationDetails}
        </Typography>

        <Button className="w-full">Donate</Button>
      </Box>
    </Grid>
  );
};

export default MakeChangeCard;
