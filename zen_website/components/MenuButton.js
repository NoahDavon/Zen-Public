import React, { useState } from 'react';
import {IconButton, Menu} from '@mui/material'
function MenuButton(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
      setAnchorEl(null);
    };
      return (
      <div>
          <IconButton
              onClick={handleClick}
              color="inherit"
              sx={{padding:0}}
          >
              {props.icon}
          </IconButton>
          <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          >
          {props.children}
          </Menu>
      </div>
      );
}

export default MenuButton;