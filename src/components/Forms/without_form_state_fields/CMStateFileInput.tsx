import { Button, SxProps, TextField, Typography } from "@mui/material";
import React from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "@emotion/styled";

type TInputProps = {
  name: string;
  label: string;
  //   size?: "small" | "medium";
  //   fullWidth?: boolean;
  sx?: SxProps;
  required?: boolean;
  setState: any;
  state: any;
  multiple?: boolean;
  accept: string;
  btn_width?: string;
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const CMStateFileInput = ({
  name,
  label,
  //   size = "medium",
  //   fullWidth,
  accept,
  sx,
  required = false,
  setState,
  state,
  multiple = false,
  btn_width = "50%",
}: TInputProps) => {
  return (
    <>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        sx={{
          width: btn_width,
          ...sx,
        }}
      >
        {label}
        <VisuallyHiddenInput
          type="file"
          onChange={(e: any) => {
            const files = e?.target?.files;
            if (!files) return;
            return setState(multiple ? Array.from(files) : files[0]);
          }}
          multiple={multiple}
          required={required}
          accept={accept}
          id={name}
        />
      </Button>

      <Typography color="info" fontSize={"12px"}>
        {multiple && state?.length > 0 && `${state.length} file selected.`}
        {!multiple && !!state && `${state?.name} is selected.`}
      </Typography>
    </>
  );
};

export default CMStateFileInput;
