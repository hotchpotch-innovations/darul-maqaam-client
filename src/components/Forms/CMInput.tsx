import { SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  name: string;
  label?: string;
  type?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  sx?: SxProps;
  defaultValue?: string;
  readOnly?: boolean;
};

const CMInput = ({
  name,
  label,
  type = "text",
  size = "small",
  fullWidth,
  sx,
  defaultValue,
  readOnly = false,
}: TInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          sx={{
            ...sx,
            // border: "1px solid lightgray",
            borderRadius: "3px",
            backgroundColor: readOnly ? "#e0e0e0" : "white",
          }}
          label={label}
          type={type}
          variant="outlined"
          size={size}
          fullWidth={fullWidth}
          placeholder={label}
          error={!!error?.message}
          helperText={error?.message}
          defaultValue={defaultValue}
          slotProps={{
            input: {
              readOnly,
            },
          }}
        />
      )}
    />
  );
};

export default CMInput;
