import { Stack } from "@mui/material";
type TTextariaProps = {
  name: string;
  label: string;
  placeholder: string;
};

const Textaria = ({ name, label, placeholder }: TTextariaProps) => {
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
      <label htmlFor="message" className="w-1/3  lg:text-end">
        <span className="text-red-500 me-2">*</span>
        {label}:
      </label>

      <textarea
        name={name}
        id={name}
        rows={3}
        placeholder={placeholder}
        className="border border-gray-300 px-3 py-2 rounded-md focus:border-green-500 focus:outline-none focus:ring-0 w-full"
      />
    </Stack>
  );
};

export default Textaria;
