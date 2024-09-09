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
};

const CMSelect = ({
  name,
  label,
  size = "small",
  fullWidth,
  items,
  required,
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
            {items?.map((item) => (
              <MenuItem
                className="w-full"
                key={item?.value}
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
