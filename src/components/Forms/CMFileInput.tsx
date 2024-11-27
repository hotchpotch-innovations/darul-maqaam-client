import { Button, Typography } from "@mui/material";
import { styled, SxProps } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Controller } from "react-hook-form";
import { useState } from "react";

type TInputProps = {
  name: string;
  multiple?: boolean;
  label?: string;
  required?: boolean;
  accept?: string;
  // setState:
  //   | React.Dispatch<React.SetStateAction<null>>
  //   | React.Dispatch<React.SetStateAction<string>>;
  // type?: string;
  // size?: "small" | "medium";
  // fullWidth?: boolean;
  sx?: SxProps;
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const CMFileInput = ({
  name,
  multiple = false,
  label = "Upload files",
  required = false,
  accept = "image/*",
  sx,
}: // setState,
TInputProps) => {
  const [file, setFile] = useState<any>();
  // const { control } = useFormContext();
  // const method = useFormContext();

  // const inputValue = useWatch({
  //   control: method.control,
  //   name,
  // });

  // useEffect(() => {
  //   setState(inputValue?.name);
  // }, [inputValue, setState]);

  return (
    <Controller
      // control={control}
      name={name}
      render={({
        field: { onChange, value, ...field },
        fieldState: { error },
      }) => (
        <>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            sx={{
              width: "50%",
              ...sx,
            }}
          >
            {label}
            <VisuallyHiddenInput
              type="file"
              {...field}
              onChange={(event: any) => {
                onChange(
                  multiple ? event?.target?.files : event?.target?.files?.[0]
                );
                setFile(
                  multiple ? event?.target?.files : event?.target?.files?.[0]
                );
              }}
              multiple={multiple}
              required={required}
              accept={accept}
              id={name}
            />
          </Button>
          <Typography color="info" fontSize={"12px"}>
            {multiple && file?.length > 0 && `${file.length} file selected.`}
            {!multiple && !!file && `${file?.name} is selected.`}
          </Typography>
        </>
      )}
    ></Controller>
  );
};

export default CMFileInput;
