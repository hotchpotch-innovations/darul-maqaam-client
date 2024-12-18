import React from "react";
import { Box, TextareaAutosize } from "@mui/material";

type TProps = {
  name: string;
  defaultValue?: string;
  label: string;
  required?: boolean;
  setState: any;
};

const CMStateTextarea = ({
  name,
  defaultValue = "",
  label,
  required = false,
  setState,
}: TProps) => {
  return (
    <>
      <Box sx={{ marginBottom: "4px" }}>
        <label className=" text-gray-500">{label}</label>
      </Box>
      <TextareaAutosize
        name={name}
        defaultValue={defaultValue}
        placeholder={label}
        required={required}
        minRows={4}
        onChange={(e) => setState(e?.target?.value)}
        style={{
          width: "100%",
          padding: "8px",
          border: "1px solid lightgray",
          borderRadius: "4px",
          fontSize: "16px",
          resize: "vertical",
        }}
      />
    </>
  );
};

export default CMStateTextarea;
