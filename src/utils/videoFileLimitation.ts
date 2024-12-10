type TResponse = {
  status: boolean;
  message?: string;
};

export const videoFileLimitation = (files: File[]): TResponse => {
  const video_files = files.filter((file: File) => file.type === "video/mp4");

  // multiple video validation
  if (video_files?.length > 1) {
    return {
      status: false,
      message: "You can't upload one more video type file.",
    };
  }

  // Size validation
  if (video_files?.length === 1) {
    const first_video: File = video_files[0];
    const bytes = 1000000;
    const selectedFileSize = first_video?.size;
    const fileMBSize = selectedFileSize / bytes;

    if (fileMBSize > 10) {
      return {
        status: false,
        message:
          "Video File is too much large. You can't upload more than 10 mb file.",
      };
    }
  }

  // Final Response
  return {
    status: true,
  };
};
