import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Dispatch } from "@reduxjs/toolkit";
import { SetStateAction } from "react";

import { Controller, useFormContext } from "react-hook-form";

type TOptions = {
  id: string;
  createdAt: string;
  identifier: string;
  isDeleted: string;
  title: string;
  updatedAt: string;
};

type TSelectProps = {
  name: string;
  label?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  options?: TOptions[];
  required?: boolean;
  isLoading?: boolean;
  setIdValue: React.Dispatch<React.SetStateAction<string | null>>;
  idValue?: string;
};

const CMDynamicSelect = ({
  name,
  label,
  size = "small",
  fullWidth,
  options,
  required,
  setIdValue,
}: TSelectProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name} // Ensure this is a unique field name
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <InputLabel id={`${name}-select-label`}>{label}</InputLabel>
          <Select
            {...field}
            labelId={`${name}-select-label`}
            id={`${name}-select`}
            label={label}
            size={size}
            fullWidth={fullWidth}
            required={required}
          >
            {options?.map((item, index) => (
              <MenuItem
                key={index}
                value={item?.id}
                onClick={() => setIdValue(item?.id)}
              >
                {item?.title}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText>{error?.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

export default CMDynamicSelect;
