import React, { useState, MouseEvent } from "react";
import { Box, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import RestoreIcon from "@mui/icons-material/Restore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

type MoreActionsMenuProps = {
  onEdit?: () => void;
  onDelete?: () => void;
  isDeleted?: boolean;
};

const MoreActionsMenu: React.FC<MoreActionsMenuProps> = ({
  onEdit,
  onDelete,
  isDeleted,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Tooltip title="More Actions">
        <IconButton
          aria-controls="action-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {onEdit && (
          <MenuItem onClick={onEdit}>
            <EditIcon sx={{ mr: 1 }} /> Edit
          </MenuItem>
        )}

        {onDelete && (
          <MenuItem onClick={onDelete}>
            {isDeleted ? (
              <>
                <RestoreIcon sx={{ mr: 1, color: "#de2c48" }} /> Restore
              </>
            ) : (
              <>
                <DeleteOutlineIcon sx={{ mr: 1, color: "#C7253E" }} /> Delete
              </>
            )}
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default MoreActionsMenu;
