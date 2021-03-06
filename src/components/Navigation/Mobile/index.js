import React from 'react';
import PropTypes from 'prop-types';
import {
  Responsive,
  Visibility,
  Sidebar,
  Menu,
  Segment,
  Container,
  Icon,
  Grid,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class MobileNavigation extends React.Component {
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
    const { sidebarOpened } = this.state;

    return (
      <Responsive {...Responsive.onlyMobile}>
        <Visibility>
          <Sidebar.Pushable>
            <Sidebar as={Menu} animation="uncover" inverted vertical visible={sidebarOpened}>
              <Menu.Item as={Link} to="/" active>
                Home
              </Menu.Item>
              {this.props.isAuthenticated ? (
                <div>
                  <Menu.Item as={Link} to="/me">
                    Profile
                  </Menu.Item>
                  <Menu.Item onClick={this.logout}>Logout</Menu.Item>
                </div>
              ) : (
                <div>
                  <Menu.Item as={Link} to="/login">
                    Log in
                  </Menu.Item>
                  <Menu.Item as={Link} to="/signup">
                    Sign Up
                  </Menu.Item>
                </div>
              )}
            </Sidebar>

            <Sidebar.Pusher
              dimmed={sidebarOpened}
              onClick={this.handlePusherClick}
              style={{ minHeight: '100vh' }}
            >
              <Segment inverted textAlign="center" style={{ padding: '1em 0em' }} vertical>
                <Container>
                  <Menu inverted fixed="top">
                    <Menu.Item onClick={this.handleToggle}>
                      <Icon name="sidebar" />
                    </Menu.Item>
                  </Menu>
                </Container>
              </Segment>
              <Grid
                textAlign="center"
                style={{ height: '100%', marginTop: '3em' }}
                verticalAlign="middle"
              >
                <Grid.Column style={{ maxWidth: 450 }}>{this.props.children}</Grid.Column>
              </Grid>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Visibility>
      </Responsive>
    );
  }
}

MobileNavigation.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  children: PropTypes.shape({}).isRequired,
  logout: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default MobileNavigation;
