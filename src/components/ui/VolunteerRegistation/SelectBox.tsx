import { Stack } from "@mui/material";
type TOptions = {
  label: string;
  value: string;
};
type TSelectBox = {
  options: TOptions[];
};

const SelectBox = ({ options }: TSelectBox) => {
  return (
    <Stack direction={"row"} gap={4}>
      <label htmlFor="name" className="w-1/3 text-end">
        <span className="text-red-500 me-2">*</span>
        Occupation:
      </label>
      <select
        name="occupation"
        id="occupation"
        about="Select Occupation"
        className="border border-gray-300 px-3 py-2 rounded-md focus:border-green-500 focus:outline-none focus:ring-0 w-full"
      >
        <option value="" className="text-gray-700">
          Select Occupation
        </option>
        {options?.map((item) => {
          return (
            <option
              key={item?.value}
              value={item?.value}
              className="text-gray-400"
            >
              {item?.label}
            </option>
          );
        })}
      </select>
    </Stack>
  );
};

export default SelectBox;
