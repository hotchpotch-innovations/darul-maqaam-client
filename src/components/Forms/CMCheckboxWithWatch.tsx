"use client";

import { Checkbox, FormControlLabel } from "@mui/material";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

type TProps = {
  name: string;
  label: string;
  onValueChange: any;
  defaultChecked?: boolean;
};

const CMCheckboxWithWatch = ({
  name,
  label,
  onValueChange,
  defaultChecked = false,
}: TProps) => {
  const method = useFormContext();

  const inputValue = useWatch({
    control: method?.control,
    name,
  });

  useEffect(() => {
    onValueChange(inputValue);
  }, [inputValue, onValueChange]);

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <>
            <FormControlLabel
              control={<Checkbox {...field} defaultChecked={defaultChecked} />}
              label={label}
            />
          </>
        );
      }}
    />
  );
};

export default CMCheckboxWithWatch;
