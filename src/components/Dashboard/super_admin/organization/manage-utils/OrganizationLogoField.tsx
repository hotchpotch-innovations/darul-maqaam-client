"use client";
import {
  Avatar,
  Box,
  Button,
  Grid2,
  IconButton,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState, ChangeEvent, MouseEvent } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Image from "next/image";

type TLogo = {
  url: string;
  key: string;
};

export type TOrgData = {
  label: string;
  logo: TLogo;
  type: "primary_logo" | "secondary_logo";
  name: string;
  tag_line: string;
};

export type TLogoPayload = {
  previous_primary_key?: string;
  previous_secondary_key?: string;
  primary_logo?: File;
  secondary_logo?: File;
};

type TOrganizationLogoProps = {
  org_data: TOrgData;
  isUploading: boolean;
  onImageUpload: (payload: TLogoPayload) => Promise<void>;
};

// modal
const ModalContent: React.FC<{
  previewImage: string | null;
  org_data: TOrgData;
  file: File | null;
  isUploading: boolean;
  handleImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleImageUpload: () => Promise<void>;
  handleClose: (event: MouseEvent<HTMLElement>) => void;
}> = ({
  previewImage,
  org_data,
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
        Update Your Organization Logo
      </Typography>
      <Tooltip
        title="Click to change your profile picture"
        placement="right-start"
      >
        <Avatar
          src={previewImage ? previewImage : org_data?.logo?.url}
          alt={org_data.name || "Organization Logo"}
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
        onClick={() => handleImageUpload()}
      >
        Save Changes
      </Button>
    </Box>
  );
};

// Logo Field Component
const OrganizationLogoField: React.FC<TOrganizationLogoProps> = ({
  org_data,
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
    if (!file) {
      return;
    }
    const PrimaryLogoPayload = {
      previous_primary_key: org_data?.logo?.key,
      primary_logo: file,
    };
    const SecondaryLogoPayload = {
      previous_secondary_key: org_data?.logo?.key,
      secondary_logo: file,
    };
    if (org_data?.type === "primary_logo") {
      await onImageUpload(PrimaryLogoPayload);
      setOpen(false);
    }
    if (org_data?.type === "secondary_logo") {
      await onImageUpload(SecondaryLogoPayload);
      setOpen(false);
    }
  };

  return (
    <Grid2
      sx={{
        border: "1px solid block",
        minHeight: "120px",
        minWidth: "120px",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <Typography variant="body1" color="primary" fontWeight={600}>
        {org_data?.label}
      </Typography>

      <Box
        component="div"
        onClick={handleOpen}
        sx={{
          position: "relative",
          cursor: "pointer",
          width: "100px",
          height: "100px",
          marginTop: "10px",
        }}
      >
        <Image
          style={{
            borderRadius: "2%",
            objectFit: "cover",
          }}
          src={org_data?.logo?.url}
          alt={`${org_data?.label} logo`}
          fill
        />

        <IconButton
          className="removeButton"
          sx={{
            position: "absolute",
            top: "40%",
            backgroundColor: "#dce0dd",
            border: "1px solid #bbb",
            borderRadius: "50%",
            boxShadow: "none",
            width: 30,
            height: 30,
            zIndex: 1,
            opacity: 0,
          }}
        >
          <EditIcon color="info" fontSize="small" />
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ModalContent
              previewImage={previewImage}
              org_data={org_data}
              file={file}
              isUploading={isUploading}
              handleImageChange={handleImageChange}
              handleImageUpload={handleImageUpload}
              handleClose={handleClose}
            />
          </Modal>
        </IconButton>
      </Box>
    </Grid2>
  );
};

export default OrganizationLogoField;
