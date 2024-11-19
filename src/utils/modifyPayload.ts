export const modifyPayload = (values: any) => {
  const obj = { ...values };

  // file
  const file = obj["file"];
  delete obj["file"];

  //files
  const files = obj["files"];
  delete obj["files"];

  // primary logo
  const primaryLogo = obj["primary_logo"];
  delete obj["primary_logo"];

  // secondary logo
  const secondaryLogo = obj["secondary_logo"];
  delete obj["secondary_logo"];

  // banner image
  const bannerImage = obj["banner_image"];
  delete obj["banner_image"];

  // data
  const data = JSON.stringify(obj);
  const formData = new FormData();
  if (!!data) {
    formData.append("data", data);
  }

  if (!!file) {
    formData.append("file", file);
  }

  if (!!files) {
    //convert File list to an array
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

  if (!!primaryLogo) {
    formData.append("primary_logo", primaryLogo);
  }

  if (!!secondaryLogo) {
    formData.append("secondary_logo", secondaryLogo);
  }

  if (!!bannerImage) {
    formData.append("banner_image", bannerImage);
  }

  return formData;
};
