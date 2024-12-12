import { SxProps, TextField } from "@mui/material";
import React from "react";

type TInputProps = {
  name: string;
  label: string;
  type?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  sx?: SxProps;
  defaultValue?: string;
  required?: boolean;
  setState: any;
};

const CMStateInput = ({
  name,
  label,
  type = "text",
  size = "medium",
  fullWidth,
  sx,
  defaultValue,
  required = false,
  setState,
}: TInputProps) => {
  return (
    <TextField
      sx={{
        ...sx,
        borderRadius: "3px",
      }}
      name={name}
      label={label}
      type={type}
      onChange={(e) => setState(e?.target?.value)}
      variant="outlined"
      size={size}
      fullWidth={fullWidth}
      placeholder={label}
      required={required}
      //   error={!!error?.message}
      //   helperText={error?.message}
      defaultValue={defaultValue}
    />
  );
};

export default CMStateInput;
