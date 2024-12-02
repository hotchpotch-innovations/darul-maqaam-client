import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, SxProps, TextField } from "@mui/material";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

type TPasswordInputProps = {
  name: string;
  label?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  sx?: SxProps;
  required?: boolean;
  defaultValue?: string;
};

const CMPasswordInput = ({
  name,
  label,
  size = "small",
  fullWidth = true,
  sx,
  required = false,
  defaultValue = "",
}: TPasswordInputProps) => {
  const { control } = useFormContext();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          sx={{
            ...sx,
            borderRadius: "3px",
            backgroundColor: "white",
          }}
          label={label}
          type={isPasswordVisible ? "text" : "password"}
          variant="outlined"
          size={size}
          fullWidth={fullWidth}
          required={required}
          placeholder={label}
          defaultValue={defaultValue}
          error={!!error?.message}
          helperText={error?.message}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={togglePasswordVisibility}
                    edge="end"
                    sx={{
                      backgroundColor: "#f5f5f5",
                      "&:hover": {
                        backgroundColor: "#e0e0e0",
                      },
                      borderRadius: "8px",
                      padding: "4px",
                    }}
                  >
                    {isPasswordVisible ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      )}
    />
  );
};

export default CMPasswordInput;
