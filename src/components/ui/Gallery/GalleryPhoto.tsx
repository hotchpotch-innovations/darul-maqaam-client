import { Box, Grid, Stack, Typography } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { AboutDataItem, TGalleray } from "@/app/(withCommonLayout)/Types";
import { GallerytData } from "../../../../public/data/GalleryData";
import Image from "next/image";

type DrawerProps = {
  menu?: string | undefined;
};

const GalleryPhoto = ({ menu }: DrawerProps) => {
  const data = GallerytData.find((item: any) => item.menu === menu);
  console.log(menu);
  console.log(data);

  if (!data) {
    // Handle the case where data is not found
    return (
      <section className="bg-white text-slate-600 py-12 px-8">
        <Typography fontSize={27} mb={2} color={"black"} fontWeight={500}>
          Menu not found
        </Typography>
      </section>
    );
  }

  return (
    <section className="bg-white text-slate-600 py-12 px-8">
      <Typography fontSize={27} mb={2} color={"black"} fontWeight={500}>
        {data.menu}
      </Typography>

      {data?.content?.map((item, index) => (
        <Box key={index} className="grid grid-cols-3 gap-4">
          {item.data.map((dataItem, itemIndex) => (
            <Box
              justifyItems={"center"}
              key={itemIndex}
              mb={1}
              className="block"
            >
              <Image
                src={dataItem}
                className="rounded-md"
                alt="Gallery Photo"
                height={400}
                width={400}
              />
            </Box>
          ))}
        </Box>
      ))}
    </section>
  );
};

export default GalleryPhoto;
