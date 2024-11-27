import { Box } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
type Tprops = {
  setState: any;
  defaultValue?: any;
};

const Editor = ({ setState, defaultValue }: Tprops) => {
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["link"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["clean"],
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  return (
    <Box sx={{ width: "100%", height: "500px" }}>
      <ReactQuill
        style={{ height: "400px" }}
        modules={modules}
        theme="snow"
        onChange={(newValue: any) => {
          setState(newValue);
        }}
        value={defaultValue}
      />
    </Box>
  );
};

export default Editor;
