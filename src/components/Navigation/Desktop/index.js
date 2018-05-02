import React from 'react';
import PropTypes from 'prop-types';
import { Responsive, Menu, Container, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class DesktopNavigation extends React.Component {
  state = {};

  handlePusherClick = () => {
    const { sidebarOpened } = this.state;

    if (sidebarOpened) this.setState({ sidebarOpened: false });
  };

  handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened });

  logout = e => {
    e.preventDefault();
    this.props.logout();
    this.props.history.push('/login');
  };

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Responsive {...Responsive.onlyComputer}>
        <Menu fixed="top" inverted>
          <Container>
            <Menu.Item active>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item position="right">
              <Link to="/login">
                <Button inverted={!fixed}>Log in</Button>
              </Link>
              <Link to="/signup">
                <Button inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                  Sign Up
                </Button>
              </Link>
            </Menu.Item>
          </Container>
        </Menu>

        <Container text fluid style={{ marginTop: '3em' }}>
          {children}
        </Container>
      </Responsive>
    );
  }
}

DesktopNavigation.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  children: PropTypes.shape({}).isRequired,
  logout: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default DesktopNavigation;
