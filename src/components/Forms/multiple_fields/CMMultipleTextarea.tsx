"use client";
import {
  Box,
  Button,
  IconButton,
  SxProps,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React from "react";

type TInputProps = {
  name: string;
  label: string;
  type?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  sx?: SxProps;
  required?: boolean;
  setState: any;
  states: Array<string>;
};

const CMMultipleTextarea = ({
  name,
  label,
  states = [],
  type = "text",
  size = "medium",
  fullWidth,
  sx,
  required = false,
  setState,
}: TInputProps) => {
  const addHandler = () => {
    const all_state = [...states, []];
    setState(all_state);
  };

  const changeHandler = (onChangeValue: any, i: number) => {
    const all_state = [...states];
    all_state[i] = onChangeValue.target?.value;
    setState(all_state);
  };

  const deleteHandler = (i: number) => {
    const all_state = [...states];
    all_state.splice(i, 1);
    setState(all_state);
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        {label && (
          <Typography
            variant="subtitle1"
            color="text.secondary"
            fontWeight={600}
          >
            {required && (
              <Typography component="span" color="error">
                *
              </Typography>
            )}
            {label + " :"}
          </Typography>
        )}
        <Button
          variant="outlined"
          color="primary"
          onClick={addHandler}
          sx={{ textTransform: "none" }}
        >
          Add
        </Button>
      </Box>

      <Box display="flex" flexDirection="column" gap={2}>
        {states.map((data, i) => (
          <Box key={i} position="relative">
            <TextareaAutosize
              name={name}
              value={data}
              onChange={(e) => changeHandler(e, i)}
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
            <IconButton
              color="error"
              onClick={() => deleteHandler(i)}
              sx={{
                border: "1px solid",
                borderRadius: "2px",
                position: "absolute",
                right: "0px",
                borderColor: "grey.300",
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "error.main",
                  color: "white",
                },
              }}
            >
              X
            </IconButton>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default CMMultipleTextarea;
