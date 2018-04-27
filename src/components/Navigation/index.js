import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu, Icon, Sidebar, Segment, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { logout } from '../../reducers/session';

class Navigation extends React.Component {
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
      <div>
        <Sidebar.Pushable>
          <Sidebar as={Menu} animation="uncover" inverted vertical visible={sidebarOpened}>
            <Menu.Item as={Link} to="/" active>
              Home
            </Menu.Item>
            {this.props.isAuthenticated ? (
              <Menu.Item onClick={this.logout}>Logout</Menu.Item>
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
            <Segment
              inverted
              textAlign="center"
              style={{ minHeight: 60, padding: '1em 0em' }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size="small">
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name="sidebar" />
                  </Menu.Item>
                </Menu>
              </Container>
            </Segment>

            {this.props.children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

Navigation.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  children: PropTypes.shape({}).isRequired,
  logout: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  user: state.session.user,
  isAuthenticated: state.session.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navigation);
