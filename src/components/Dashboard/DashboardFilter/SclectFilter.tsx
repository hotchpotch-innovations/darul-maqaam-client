"use client";

import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type TItems = {
  value: number;
  title: string;
};

type TSelectFilterProps = {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  options: TItems[];
};

const SelectFilter = ({ setValue, value, options }: TSelectFilterProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120, width: "250px" }} size="small">
      <InputLabel id="demo-select-small-label">All</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={value}
        label="Select One"
        onChange={handleChange}
      >
        {/* <MenuItem value="">
          <em>None</em>
        </MenuItem> */}

        {options?.map((item) => (
          <MenuItem key={item?.value} value={item?.value}>
            {item?.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectFilter;
