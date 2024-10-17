export const modifyPayload = (values: any) => {
  const obj = { ...values };

  const file = obj["file"];
  delete obj["file"];

  //file

  const files = obj["files"];
  delete obj["files"];

  const data = JSON.stringify(obj);

  const formData = new FormData();

  if (data) {
    formData.append("data", data);
  }
  if (file) {
    formData.append("file", file);
  }
  if (!!files) {
    //convert Filelist to an array
    const filesArray = Array.from(files);

    if (filesArray.length > 0) {
      filesArray.forEach((file: any) => {
        formData.append("files", file);
      });
    } else {
      console.error(
        "Files array is empty or not converted property:",
        filesArray
      );
    }
  }

  return formData;
};
