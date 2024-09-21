"use client";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect } from "react";

import { Controller, set, useFormContext, useWatch } from "react-hook-form";
type TItems = {
  label: string;
  value: string;
};

type TSelectProps = {
  name: string;
  label?: string;
  size?: "small" | "medium";
  options?: TItems[] | null;
  required?: boolean;
  setState?: React.Dispatch<React.SetStateAction<string>> | any;
};

const CMSelectWithWatch = ({
  options = null,
  name,
  label,
  size = "small",
  required,
  setState,
}: TSelectProps) => {
  const { control } = useFormContext();
  const method = useFormContext();

  const inputValue = useWatch({
    control: method.control,
    name,
  });

  useEffect(() => {
    setState(inputValue);
  }, [inputValue, setState]);

  return (
    <Controller
      control={control}
      name={name} // Ensure unique name here
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <InputLabel id={`${name}-select-label`}>{label}</InputLabel>
          <Select
            {...field}
            name={name}
            labelId={`${name}-select-label`}
            id={`${name}-select`}
            label={label}
            size={size}
            fullWidth
            required={required}
            // onChange={(event) => {
            //   {
            //     setState(event.target.value); // Update accountType here independently
            //   }
            //   field.onChange(event); // Make sure to update form state
            // }}
          >
            {options?.map((item: TItems) => (
              <MenuItem key={item?.value} value={item?.value}>
                {item?.label}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText>{error?.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

export default CMSelectWithWatch;
