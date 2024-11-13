"use client";

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect } from "react";

import { Controller, useFormContext, useWatch } from "react-hook-form";
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
  setState:
    | React.Dispatch<React.SetStateAction<null>>
    | React.Dispatch<React.SetStateAction<string>>;
  isDisabled?: boolean;
  defaultValue?: string;
};

const CMSelectWithWatch = ({
  options = null,
  name,
  label,
  size = "small",
  required,
  setState,
  isDisabled,
  defaultValue = "",
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
      name={name}
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
            disabled={isDisabled}
            defaultValue={defaultValue}
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
