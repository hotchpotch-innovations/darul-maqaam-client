import React, { useState, MouseEvent } from "react";
import { Box, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import RestoreIcon from "@mui/icons-material/Restore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BlockIcon from "@mui/icons-material/Block";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

type MoreActionsMenuProps = {
  onEdit?: () => void;
  onDelete?: () => void;
  onStatusChange?: () => void;
  isDeleted?: boolean;
  isActive?: boolean;
};

const MoreActionsMenu: React.FC<MoreActionsMenuProps> = ({
  onEdit,
  onDelete,
  onStatusChange,
  isDeleted,
  isActive,
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
            <EditIcon sx={{ mr: 1, color: "primary.main" }} /> Edit
          </MenuItem>
        )}

        {onStatusChange && (
          <MenuItem onClick={onStatusChange}>
            {isActive ? (
              <>
                <BlockIcon sx={{ mr: 1, color: "orangered" }} /> Block
              </>
            ) : (
              <>
                <TaskAltIcon sx={{ mr: 1, color: "greenyellow" }} /> Activate
              </>
            )}
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
