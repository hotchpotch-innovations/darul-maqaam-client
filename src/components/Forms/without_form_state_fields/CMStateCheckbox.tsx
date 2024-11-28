"use client";
import { Checkbox, FormControlLabel } from "@mui/material";

type TProps = {
  name: string;
  label: string;
  setState: any;
  state: boolean;
  defaultChecked?: boolean;
};

const CMStateCheckbox = ({
  name,
  label,
  setState,
  state,
  defaultChecked = false,
}: TProps) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          name={name}
          onChange={() => setState(!state)}
          defaultChecked={defaultChecked}
        />
      }
      label={label}
    />
  );
};

export default CMStateCheckbox;
