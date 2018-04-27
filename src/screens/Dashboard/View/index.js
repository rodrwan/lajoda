import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';
import { fetchReports } from '../../../reducers/report';
import { logout } from '../../../reducers/session';
import Navigation from '../../../components/Navigation';

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

  render() {
    return (
      <Navigation history={this.props.history}>
        <h1>Dashboard</h1>
        <pre>{JSON.stringify(this.props.user, null, 2)}</pre>
        {this.props.isFetching ? (
          <LoaderExampleLoader />
        ) : (
          <pre>{JSON.stringify(this.props.reports, null, 2)}</pre>
        )}
      </Navigation>
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
