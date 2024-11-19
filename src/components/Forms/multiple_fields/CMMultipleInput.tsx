import {
  Box,
  Button,
  IconButton,
  SxProps,
  TextField,
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

const CMMultipleInput = ({
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
        <Typography
          variant="subtitle1"
          color="text.secondary"
          fontWeight={"600"}
        >
          {label + " :"}
        </Typography>
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
          <Box key={i} display="flex" alignItems="center" gap={1}>
            <TextField
              name={name}
              fullWidth={fullWidth}
              size={size}
              type={type}
              variant="outlined"
              value={data}
              placeholder={label}
              required={required}
              onChange={(e) => changeHandler(e, i)}
              sx={{
                ...sx,
                // border: "1px solid lightgray",
                borderRadius: "3px",
              }}
            />
            <IconButton
              color="error"
              onClick={() => deleteHandler(i)}
              sx={{
                border: "1px solid",
                borderRadius: "2px",
                borderColor: "grey.300",
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

export default CMMultipleInput;
