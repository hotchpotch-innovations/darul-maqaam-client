// import { TMakeChange } from "@/app/(withCommonLayout)/Types";
import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const MakeChangeCard = ({ data }: Record<string, any>) => {
  return (
    <Grid
      item
      xs={12}
      md={6}
      lg={4}
      className="rounded-es-[50px] rounded-se-[50px] bg-white hover:shadow-xl transition-all duration-500 h-[550px] max-w-[420px] group"
    >
      <Image
        src={data?.og_image || ""}
        alt={data?.title || ""}
        height={300}
        width={200}
        className="rounded-se-[50px] h-[300px] w-full group-hover:grayscale border-b-4 border-green-500"
      />
      <Box px={2} pb={4} height={"250px"}>
        <div className="h-[200px]">
          <Typography
            color={"primary.main"}
            align="center"
            variant="h6"
            pt={3}
            pb={1}
          >
            {data?.title}
          </Typography>
          <Typography fontSize={14} className="text-justify pb-8 text-gray-500">
            {data?.meta_description?.length > 245
              ? data?.meta_description?.slice(0, 240) + "..."
              : data?.meta_description}
          </Typography>
        </div>

        <div className="h-[50px]">
          <Button className="w-full">
            <Link href={`/donation/${data?.slug}`}>Donate</Link>
          </Button>
        </div>
      </Box>
    </Grid>
  );
};

export default MakeChangeCard;
