"use client";
import React from "react";
import { Box, Button, Grid2, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Image from "next/image";

type TData = {
  url: string;
  key: string;
};

type TSelectedFile = {
  file: File;
  url: string;
  key: string;
};

type TVideoSectionProps = {
  data: TData;
  selectedFile: TSelectedFile;
  deleteHandler: any;
  removeHandler: any;
  fileChangeHandler: any;
  uploadHandler: any;
  isUploadLoading: boolean;
};

const VideoSection = ({
  data,
  selectedFile,
  deleteHandler,
  removeHandler,
  fileChangeHandler,
  uploadHandler,
  isUploadLoading,
}: TVideoSectionProps) => {
  return (
    <>
      {/* Render existing article images */}
      {!!data?.url && (
        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "250px",
            ":hover .removeButton": {
              opacity: 1,
            },
          }}
        >
          <video
            style={{ objectFit: "cover" }}
            height="100%"
            width="100%"
            src={data?.url || ""}
            controls
          />
          <IconButton
            onClick={() => deleteHandler(data?.key)}
            className="removeButton"
            sx={{
              position: "absolute",
              top: 6,
              right: 6,
              backgroundColor: "white",
              color: "red",
              fontSize: "20px",
              padding: "2px",
              opacity: 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      )}

      {/* Preview selected images files */}
      {selectedFile?.url && (
        <Grid2
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "200px",
              ":hover .videoRemoveButton": {
                opacity: 1,
              },
            }}
          >
            <video
              style={{ objectFit: "cover" }}
              height="100%"
              width="90%"
              src={selectedFile?.url || ""}
              controls
            />
            <IconButton
              className="videoRemoveButton"
              onClick={() => removeHandler()}
              sx={{
                position: "absolute",
                top: 6,
                right: 75,
                backgroundColor: "white",
                color: "red",
                fontSize: "20px",
                padding: "2px",
                cursor: "pointer",
                opacity: 0,
                transition: "opacity 0.3s ease",
              }}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          </Box>
        </Grid2>
      )}

      {/* Add video button*/}
      {!selectedFile && !data?.url && (
        <Grid2
          size={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label htmlFor="video-upload-button">
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
            id="video-upload-button"
            type="file"
            accept="video/*"
            style={{ display: "none" }}
            onChange={(e) => fileChangeHandler(e)}
          />
        </Grid2>
      )}

      {/* Update button */}
      {!!selectedFile && (
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
            disabled={isUploadLoading}
            type="submit"
            size="small"
            onClick={() => uploadHandler()}
          >
            Update
          </Button>
        </Box>
      )}
    </>
  );
};

export default VideoSection;
