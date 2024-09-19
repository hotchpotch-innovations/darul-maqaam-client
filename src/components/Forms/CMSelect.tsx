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
  setAccountType?: React.Dispatch<React.SetStateAction<string>> | any;
};

const CMSelect = ({
  name,
  label,
  size = "small",
  fullWidth,
  items,
  required,
  setAccountType,
}: TSelectProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <InputLabel id={`${name}-select-label`}>{label}</InputLabel>
          <Select
            className="w-full border-1 border"
            {...field}
            labelId={`${name}-select-label`}
            id={`${name}-select`}
            label={label}
            size={size}
            fullWidth={fullWidth}
            required={required}
            error={!!error?.message}
          >
            {items?.map((item, index) => (
              <MenuItem
                onClick={() => setAccountType(item?.value)}
                className="w-full"
                key={index}
                value={item?.value}
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
