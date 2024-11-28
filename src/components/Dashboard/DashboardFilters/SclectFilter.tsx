"use client";

import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Typography } from "@mui/material";
import { ISelectOption } from "@/constants/options";

type TSelectFilterProps = {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string | undefined;
  options: ISelectOption[];
  filter_title?: string | null;
  isDisable?: boolean;
  width?: string;
  fullWidth?: boolean;
};

const SelectFilter = ({
  setValue,
  value,
  options,
  filter_title,
  isDisable,
  width = "",
  fullWidth = false,
}: TSelectFilterProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  return (
    <>
      <Typography
        sx={{ textTransform: "capitalize" }}
        color={"primary.main"}
        align="left"
      >
        {filter_title + ":"}
      </Typography>
      <FormControl
        fullWidth={fullWidth}
        sx={{ mt: 1, minWidth: 120, width: { width } }}
        size="small"
      >
        <InputLabel id="demo-select-small-label">
          {value === "" ? "All" : "Filter"}
        </InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={value}
          label="Select One"
          disabled={isDisable}
          onChange={handleChange}
        >
          <MenuItem sx={{ fontSize: "14px" }} value={""}>
            All
          </MenuItem>
          {options?.map((item) => (
            <MenuItem
              sx={{ fontSize: "14px" }}
              key={item?.value}
              value={item?.value}
            >
              {item?.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default SelectFilter;
