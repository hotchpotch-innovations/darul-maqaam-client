import { Stack, TextField, Typography } from "@mui/material";

type TSearchFiledProps = {
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
};

const SearchFiled = ({ setSearchText }: TSearchFiledProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSearchText(newValue);
  };
  return (
    <TextField
      onChange={handleChange}
      id="outlined-basic"
      fullWidth
      label="Search by keyword"
      variant="outlined"
      size="small"
    />
  );
};

export default SearchFiled;
