"use client";

import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Box, Stack, Typography } from "@mui/material";

type TItems = {
  value: number;
  title: string;
};

type TSelectFilterProps = {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  options: TItems[];
  filter_title?: string;
};

const SelectFilter = ({
  setValue,
  value,
  options,
  filter_title,
}: TSelectFilterProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  return (
    <Box>
      <Stack direction={"column"}>
        <Typography color={"primary.main"} align="center">
          {filter_title}
        </Typography>
        <FormControl sx={{ m: 1, minWidth: 120, width: "250px" }} size="small">
          <InputLabel id="demo-select-small-label">
            {value === "" ? "All" : "Filter"}
          </InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={value}
            label="Select One"
            onChange={handleChange}
          >
            {options?.map((item) => (
              <MenuItem key={item?.value} value={item?.value}>
                {item?.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Box>
  );
};

export default SelectFilter;
