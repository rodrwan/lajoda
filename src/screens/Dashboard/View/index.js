import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu, Icon, Sidebar, Segment, Container, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { fetchReports } from '../../../reducers/report';
import { logout } from '../../../reducers/session';

const LoaderExampleLoader = () => <Loader active inline="centered" />;

class Dashboard extends React.Component {
  state = {};

  componentWillMount() {
    this.props.fetchReports();
  }

  handlePusherClick = () => {
    const { sidebarOpened } = this.state;

    if (sidebarOpened) this.setState({ sidebarOpened: false });
  };

  handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened });

  logout = () => this.props.logout().then(() => this.props.history.push('/login'));

  render() {
    const { sidebarOpened } = this.state;

    return (
      <div>
        <Sidebar.Pushable>
          <Sidebar as={Menu} animation="uncover" inverted vertical visible={sidebarOpened}>
            <Menu.Item as={Link} to="/" active>
              Home
            </Menu.Item>
            {this.props.user.isAuthenticated ? (
              <Menu.Item onClick={this.logout()}>Logout</Menu.Item>
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

            <h1>Dashboard</h1>
            <pre>{JSON.stringify(this.props.user, null, 2)}</pre>
            {this.props.isFetching ? (
              <LoaderExampleLoader />
            ) : (
              <pre>{JSON.stringify(this.props.reports, null, 2)}</pre>
            )}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

Dashboard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
  }).isRequired,
  fetchReports: PropTypes.func.isRequired,
  reports: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      pillId: PropTypes.string.isRequired,
      reporter: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    }),
  ).isRequired,
  isFetching: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  user: state.session.user,
  reports: state.reports.reports,
  isFetching: state.reports.isFetching,
});

const mapDispatchToProps = {
  fetchReports,
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
