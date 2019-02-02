import React from 'react';
import withStyles from 'react-jss';

import Icon from '../Icon';
import Drawer from '../Drawer';

import { drawer } from './styles';
import menu from '../../assets/img/menu.svg';
import close from '../../assets/img/close.svg';

class NavDrawer extends React.Component {

  state = {
    isOpen: false,
  }

  handleClick = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }))
  }

  render() {
    const { classes } = this.props;
    const { isOpen } = this.state;
    return (
      <React.Fragment>
        <Icon 
          iconSource={menu}
          alt="menu icon"
          clickHandler={this.handleClick}
        />
        {
          isOpen && (
            <Drawer>
              <div className={classes.drawer}>
                <Icon
                  className={classes.icon}
                  iconSource={close}
                  alt= "close icon"
                  clickHandler={this.handleClick}
                />
              </div>
            </Drawer>
          )
        }
      </React.Fragment>
      
    )
  }
}

export default withStyles(drawer)(NavDrawer);