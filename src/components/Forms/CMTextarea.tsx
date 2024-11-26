"use client";

import { TextareaAutosize, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TProps = {
  name: string;
  label: string;
  required?: boolean;
  defaultValue?: string;
};

const CMTextarea = ({
  name,
  label,
  required = false,
  defaultValue,
}: TProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <>
          {!!label && (
            <Typography
              variant="subtitle1"
              color="text.secondary"
              fontWeight={500}
            >
              {required && (
                <Typography component="span" color="error">
                  *
                </Typography>
              )}
              {label + " :"}
            </Typography>
          )}
          <TextareaAutosize
            {...field}
            value={defaultValue}
            placeholder={label}
            required={required}
            minRows={4}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid lightgray",
              borderRadius: "4px",
              fontSize: "16px",
              resize: "vertical",
            }}
          />
        </>
      )}
    />
  );
};

export default CMTextarea;
