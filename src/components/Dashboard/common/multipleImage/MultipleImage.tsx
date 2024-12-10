"use client";

import { Box, Button, Grid2 } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import UploadedImage from "./UploadedImage";
import SelectedImage from "./SelectedImage";

type TImage = {
  url: string;
  key: string;
};

type TProps = {
  data: TImage[];
  deleteHandler: any;
  selectedFiles: any;
  removeHandler: any;
  changeHandler: any;
  updateHandler: any;
  isLoading: boolean;
  remainingSlots: number;
};

const MultipleImage = ({
  data,
  deleteHandler,
  selectedFiles,
  removeHandler,
  changeHandler,
  updateHandler,
  isLoading,
  remainingSlots,
}: TProps) => {
  return (
    <Grid2
      container
      spacing={2}
      sx={{
        width: "95%",
        justifyContent: "space-between",
        marginBottom: "20px",
      }}
    >
      {/* Render existing article images */}
      {data?.map((image: any) => (
        <UploadedImage
          key={image?.key}
          data={image}
          deleteHandler={deleteHandler}
        />
      ))}

      {/* Preview selected images files */}
      {selectedFiles.map((file: any) => (
        <SelectedImage
          key={file?.key}
          data={file}
          removeHandler={removeHandler}
        />
      ))}

      {/* Add image button*/}
      {remainingSlots > 0 && (
        <Grid2
          size={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label htmlFor="upload-button">
            <Box
              sx={{
                width: "100%",
                padding: "10px 5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <AddCircleIcon fontSize="large" color="info" />
            </Box>
          </label>
          <input
            id="upload-button"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => changeHandler(e)}
          />
        </Grid2>
      )}

      {/* Update button */}
      {selectedFiles.length > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "8px",
            width: "100%",
            maxHeight: "34px",
          }}
        >
          <Button
            disabled={isLoading}
            type="submit"
            size="small"
            onClick={() => updateHandler()}
          >
            Update
          </Button>
        </Box>
      )}
    </Grid2>
  );
};

export default MultipleImage;
