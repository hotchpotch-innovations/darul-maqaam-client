import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import { Controller, useFormContext } from "react-hook-form";

type TItems = {
  value: string;
  label: string;
};

type TSelectProps = {
  name: string;
  label?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  items?: TItems[];
  required?: boolean;
  isDisabled?: boolean;
  setIdValue?: any;
};

const CMSelect = ({
  name,
  label,
  size = "small",
  fullWidth,
  items,
  required,
  isDisabled,
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
            disabled={isDisabled}
          >
            {items?.map((item, index) => (
              <MenuItem
                key={index}
                value={item?.value}
                onClick={() => setIdValue && setIdValue(item?.value)}
              >
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

export default CMSelect;
