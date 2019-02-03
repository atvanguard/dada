import React from 'react';
import withStyles from 'react-jss';
import { Transition, config, animated } from 'react-spring';

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
          className={classes.menu}
        />
          <Transition
            native
            items={isOpen}
            from={{width: '0%'}}
            enter={{width: '100%'}}
            leave={{width: '0%'}}
            config={{...config.default}}
          >
            {isOpen => isOpen && (props =>
              <Drawer>
                <animated.div className={classes.drawer} style={props}>
                  <Icon
                    className={classes.icon}
                    iconSource={close}
                    alt= "close icon"
                    clickHandler={this.handleClick}
                  />
                  <ul>
                    <li className={classes.navLi}>
                      <a className={classes.btnLink} href="/account/authorize_user">Sign up with Instagram</a>
                    </li>
                  </ul>
                </animated.div>
              </Drawer>
            )}
          </Transition>
      </React.Fragment>
      
    )
  }
}

export default withStyles(drawer)(NavDrawer);