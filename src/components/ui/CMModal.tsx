"use client";

import { Box, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: "550px",
  minWidth: "30%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

type CMModalPropes = {
  handleClose: any;
  open: boolean;
  id?: string;
  children: React.ReactNode;
};

const CMModal = ({ handleClose, open, children }: CMModalPropes) => {
  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </Box>
  );
};

export default CMModal;
