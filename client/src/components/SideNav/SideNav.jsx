// React libraries
import React, { useState } from 'react';

// Material UI components
import { IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
// Material UI icons
import TodayIcon from '@material-ui/icons/Today';
import ListAltIcon from '@material-ui/icons/ListAlt';
import MenuIcon from '@material-ui/icons/Menu';

// Custom styles
import { styles } from './SideNav.style';


// Component
const SideNav = () => {
  const classes = styles();
  const [isOpen, setIsOpen] = useState(false)

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setIsOpen(open);
  };

  return (
    <>
      <IconButton onClick={toggleDrawer(true)} edge='start' className={classes.menuButton} color='inherit' aria-label='menu'>
        <MenuIcon />
      </IconButton>
      <Drawer anchor='left' open={isOpen} onClose={toggleDrawer(false)}>
        <List className={classes.drawer}>
          {['Schedule', 'Summary'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <TodayIcon /> : <ListAltIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default SideNav;