import { Box, Grid, Stack, Typography } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { AboutDataItem, TGalleray } from "@/app/(withCommonLayout)/Types";
// import { aboutData } from "../../../public/data/AboutData";
// import { GallerytData } from "../../../public/data/GalleryData";
import Image from "next/image";
import CustomListTag from "../Dashboard/common/content/CustomListTag";

type DrawerProps = {
  selectedData: Record<string, any>;
  // contantData?: AboutDataItem | undefined;
  // isGallery?: boolean | undefined;
};

const Content = ({ selectedData }: DrawerProps) => {
  // const data = dataInContant.find((item: any) => item.menu === menu);

  if (!selectedData) {
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
    <section className="bg-white text-slate-600 py-12 px-2 lg:px-8">
      {/* <Typography
        fontSize={27}
        mb={2}
        color={"green"}
        fontWeight={500}
        // className={`${selectedData.id === data.menu ? "text-green-500" : ""}`}
      >
        {selectedData?.title}
      </Typography> */}

      {/* <div
        className="text-editor"
        dangerouslySetInnerHTML={{ __html: selectedData?.contents }}
      ></div> */}

      <div className="text-editor">
        <CustomListTag htmlContent={selectedData?.contents} />
      </div>

      {/* {data?.content?.map((item, index) => (
        <Box key={index}>
          {item?.data.map((dataItem, itemIndex) => (
            <Box
              justifyItems={"center"}
              key={itemIndex}
              mb={1}
              className="block"
            >
              <Box className="text-green-600 font-semibold size-[15px] border-green-500 rounded-full border-2 inline-block me-4"></Box>
              <span className="text-gray-600 lg:font-semibold font-normal text-justify ">
                {dataItem}
              </span>
            </Box>
          ))}
        </Box>
      ))} */}
    </section>
  );
};

export default Content;
