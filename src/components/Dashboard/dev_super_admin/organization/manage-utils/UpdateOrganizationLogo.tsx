import { ChangeEvent, MouseEvent, useState } from "react";
import Image from "next/image";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import EditIcon from "@mui/icons-material/Edit";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const ModalContent = ({ logoPreviewURL, label, onClick }) => {
  return (
    <Box sx={style} component="div" onClick={onClick}>
      <Image
        style={{
          borderRadius: "50%",
          objectFit: "cover",
        }}
        src={logoPreviewURL}
        alt={`${label} logo`}
        fill
      />
    </Box>
  );
};

const LogoBox = ({
  label,
  logoPreviewURL,
  onClick,
  fontColor,
}: {
  label: string;
  logoPreviewURL: string;
  onClick: any;
  fontColor: string;
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setOpen(false);
  };

  return (
    <Grid
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
      <Typography variant="body1" color={fontColor} fontWeight={600}>
        {label}
      </Typography>

      <Box
        component="div"
        // onClick={onClick}
        onClick={handleOpen}
        sx={{
          position: "relative",
          cursor: "pointer",
          width: "100px",
          height: "100px",
          marginTop: "10px",
          "&:hover": { backgroundColor: "black" },
        }}
      >
        <Image
          style={{
            borderRadius: "50%",
            objectFit: "cover",
          }}
          src={logoPreviewURL}
          alt={`${label} logo`}
          fill
        />

        <IconButton
          className="removeButton"
          sx={{
            positon: "absolute",
            top: "40%",
            // left: "50%",
            backgroundColor: "#dce0dd",
            border: "1px solid #bbb",
            borderRadius: "50%",
            boxShadow: "none",
            width: 30,
            height: 30,
            zIndex: 1,
            opacity: 0,
            // "&:hover": {
            //   backgroundColor: "#f0f0f0",
            //   borderColor: "#bbb",
            //   boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            // },
          }}
        >
          <EditIcon color="info" fontSize="small" />
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ModalContent onClick={onClick} logoPreviewURL={logoPreviewURL} />
          </Modal>
        </IconButton>
      </Box>
    </Grid>
  );
};

const UpdateOrganizationLogo = ({ business_data }: { business_data: any }) => {
  // -------- State Management --------
  // Set logo type
  const [logoType, setLogoType] = useState<"primary" | "secondary" | null>(
    null
  );
  const [logos, setLogos] = useState<{
    primary: string;
    secondary: string;
  }>({
    primary: business_data.primary_logo?.url,
    secondary: business_data.secondary_logo?.url,
  });
  const [file, setFile] = useState<File | null>(null);
  console.log(file);

  // Logo change
  const handleFileChange = (
    event: import("react").ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile || !logoType) return;

    const fileUrl = URL.createObjectURL(selectedFile);

    setLogos((prev) => ({
      ...prev,
      [logoType]: fileUrl,
    }));
    setFile(selectedFile);
  };

  // Triggred logo file input based on logo type ("Primary or Secondary")
  const trriggerLogoFileInput = (type: "primary" | "secondary" | null) => {
    setLogoType(type);
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    fileInput.click();
  };

  // Function to handle for update user profile picture
  const handleLogoUpdate = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    console.log(file);
    // if (!file) return;
    // const toastId = toast.loading("Uploading...");
    // const payload = modifyPayload({ file });

    // try {
    //   const res = await changeLogo(payload).unwrap();
    //   if (res?.success) {
    //     toast.success(res?.message, { id: toastId, duration: 3000 });
    //   } else {
    //     toast.error(res?.message, { id: toastId, duration: 3000 });
    //   }
    // } catch (error) {
    //   toast.error("Something went wrong!", { id: toastId, duration: 3000 });
    //   customTimeOut(3000).then(() => window?.location?.reload());
    // }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
      }}
    >
      <LogoBox
        label="Primary Logo"
        logoPreviewURL={logos?.primary}
        onClick={() => trriggerLogoFileInput("primary")}
        fontColor="primary"
      />

      <LogoBox
        label="Secondary Logo"
        logoPreviewURL={logos?.secondary}
        onClick={() => trriggerLogoFileInput("secondary")}
        fontColor="secondary"
      />

      <input
        type="file"
        id="fileInput"
        accept="image/*"
        hidden
        onChange={handleFileChange}
      />
    </Box>
  );
};

export default UpdateOrganizationLogo;
