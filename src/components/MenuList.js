import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';
import marked from "marked";

// Rendered Markdown modif - br and link
let renderer = new marked.Renderer();
renderer.br = () => {
  return `
  <br />
  `;
};

renderer.link = (href, title, text) => {
  return `<a href="${href}" alt="${title}" target="_blank">${text}</a>`;
};

// "Save as" function
const link = document.createElement("a");
const utf8 = "\ufeff";

const saveAs = (elem, mimeType = "text/plain", fileName="text.txt") => {
  let blob = new Blob([utf8 + elem], {type: mimeType});
  
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(blob);
};

// Component definition

const styles = theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
});

class MenuListComposition extends Component {
  // define state as private class property
  state = {
    open: false,
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  saveAsHtml = event => {
    // render and save as html
    let myHTML = marked(this.props.text, { renderer: renderer});
    saveAs(myHTML, "text/html", "document.html");
    // Close the menu
    this.handleClose(event);
  };

  saveAsMd = event => {
    // render and save as html    
    saveAs(this.props.text, "text/plain", "document.md");
    // Close the menu
    this.handleClose(event);
  };

  render() {
    const classes = this.props.classes;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <div>
          <Button
            buttonRef={node => {
              this.anchorEl = node;
            }}
            aria-owns={open ? 'menu-list-grow' : null}
            aria-haspopup="true"
            onClick={this.handleToggle}
          >
            Save as...
          </Button>
          <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList>
                      <MenuItem onClick={this.saveAsMd}>Markdown</MenuItem>
                      <MenuItem onClick={this.saveAsHtml}>HTML</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    );
  }
}

MenuListComposition.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(MenuListComposition);