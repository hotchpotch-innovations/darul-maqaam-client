"use client";

import { InputLabel, MenuItem, Select, Box, Stack } from "@mui/material";
import FormControl from "@mui/material/FormControl";

type TItems = {
  value: string;
  label: string;
};

type TSelectProps = {
  name: string;
  label: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  items?: TItems[];
  required?: boolean;
  isDisabled?: boolean;
  setState: any;
  state: string;
  defaultValue?: string;
};

const CMSelectStateInput = ({
  name,
  label,
  size = "medium",
  fullWidth,
  items,
  required,
  isDisabled,
  setState,
  state,
  defaultValue = "",
}: TSelectProps) => {
  return (
    <div>
      <FormControl fullWidth error={false}>
        <InputLabel id={`${name}-select-label`}>{label}</InputLabel>
        <Select
          labelId={`${name}-select-label`}
          id={`${name}-select`}
          label={label}
          size={size}
          fullWidth={fullWidth}
          required={required}
          disabled={isDisabled}
          value={state}
          onChange={(e) => setState(e?.target?.value)}
        >
          <MenuItem value={""}>Select One</MenuItem>
          {items?.map((item, index) => (
            <MenuItem
              key={index}
              value={item?.value}
              // onClick={() => setState && setState(item?.value)}
            >
              {item?.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default CMSelectStateInput;
