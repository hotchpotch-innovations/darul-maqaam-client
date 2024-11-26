import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
type Tprops = {
  onChange: any;
};

const Editor = ({ onChange }: Tprops) => {
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

  const handleEditorChange = (newValue: any) => {
    onChange(newValue);
  };

  return (
    <div className="h-56">
      <ReactQuill
        className="flex h-full flex-col !rounded-lg"
        modules={modules}
        theme="snow"
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default Editor;
