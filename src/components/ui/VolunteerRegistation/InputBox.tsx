import { Stack } from "@mui/material";
type TInputBoxProps = {
  name: string;
  label?: string;
  placeholder: string;
  type: string;
  isClassName?: string;
};

const InputBox = ({
  name,
  label,
  placeholder,
  type,
  isClassName,
}: TInputBoxProps) => {
  return (
    <Stack
      sx={{
        flexDirection: {
          xs: "column", // Mobile devices
          sm: "row", // Tablet devices and larger
        },
        gap: {
          xs: 1, // Gap of 1 for mobile devices
          sm: 4, // Gap of 4 for tablet devices and larger
        },
      }}
    >
      <label
        htmlFor="name"
        className={`w-1/3 lg:text-end ${label ? "" : "hidden"}`}
      >
        <span className="text-red-500 me-2">*</span>
        {label}:
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className={`border border-gray-300 px-3 py-2 rounded-md focus:border-green-500 focus:outline-none focus:ring-0 w-full ${
          isClassName ? "isClassName " : ""
        }`}
      />
    </Stack>
  );
};

export default InputBox;
