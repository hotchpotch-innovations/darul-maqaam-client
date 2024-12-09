import React, { useState, ChangeEvent, MouseEvent } from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";
import CameraAltSharpIcon from "@mui/icons-material/CameraAltSharp";

type UserData = {
  profile_image?: string;
  name?: string;
  owner_name?: string;
};

type ProfilePictureProps = {
  userData: UserData;
  isUploading: boolean;
  onImageUpload: (file: File) => Promise<void>;
};

// modal
const ModalContent: React.FC<{
  previewImage: string | null;
  userData: UserData;
  file: File | null;
  isUploading: boolean;
  handleImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleImageUpload: () => Promise<void>;
  handleClose: (event: MouseEvent<HTMLElement>) => void;
}> = ({
  previewImage,
  userData,
  file,
  isUploading,
  handleImageChange,
  handleImageUpload,
}) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="subtitle2" fontWeight={600}>
        Update Your Profile Picture
      </Typography>
      <Tooltip
        title="Click to change your profile picture"
        placement="right-start"
      >
        <Avatar
          src={previewImage || userData?.profile_image}
          alt={userData?.name || userData?.owner_name || "Profile Picture"}
          sx={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            border: "2px solid black",
            cursor: "pointer",
          }}
          onClick={() => {
            const fileInput = document.getElementById(
              "fileInput"
            ) as HTMLInputElement;
            fileInput.click();
          }}
        />
      </Tooltip>
      <input
        type="file"
        id="fileInput"
        hidden
        accept="image/*"
        onChange={handleImageChange}
      />
      <Button
        type="submit"
        disabled={isUploading || !file}
        onClick={handleImageUpload}
      >
        Save Changes
      </Button>
    </Box>
  );
};

// component
const ProfilePicture: React.FC<ProfilePictureProps> = ({
  userData,
  isUploading,
  onImageUpload,
}) => {
  const [open, setOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  // For modal open and close
  const handleOpen = () => setOpen(true);
  const handleClose = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setOpen(false);
  };

  // For local image preview
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    if (selectedFile) {
      const fileUrl = URL.createObjectURL(selectedFile);
      setPreviewImage(fileUrl);
      setFile(selectedFile);
    }
  };

  // For Image upload into db
  const handleImageUpload = async () => {
    if (file) {
      await onImageUpload(file);
      setOpen(false);
    }
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Avatar
        src={userData?.profile_image}
        alt={userData?.name || userData?.owner_name || "Profile Picture"}
        sx={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          border: "2px solid black",
        }}
      />

      <IconButton
        sx={{
          position: "absolute",
          right: 5,
          bottom: -2,
          backgroundColor: "#dce0dd",
          border: "1px solid #bbb",
          borderRadius: "50%",
          boxShadow: "none",
          width: 30,
          height: 30,
          zIndex: 1,
          "&:hover": {
            backgroundColor: "#f0f0f0",
            borderColor: "#bbb",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
          },
        }}
        component="label"
        onClick={handleOpen}
      >
        <CameraAltSharpIcon fontSize="small" />

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <ModalContent
            previewImage={previewImage}
            userData={userData}
            file={file}
            isUploading={isUploading}
            handleImageChange={handleImageChange}
            handleImageUpload={handleImageUpload}
            handleClose={handleClose}
          />
        </Modal>
      </IconButton>
    </Box>
  );
};

export default ProfilePicture;
