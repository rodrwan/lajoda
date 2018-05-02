import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader, Card, Image } from 'semantic-ui-react';
import { fetchReports } from 'reducers/report';
import { logout } from 'reducers/session';
import Navigation from 'components/Navigation';

const LoaderExampleLoader = () => <Loader active inline="centered" />;

class Dashboard extends React.Component {
  state = {};

  componentWillMount() {
    this.props.fetchReports();
  }

  render() {
    const { isFetching, reports } = this.props;

    return (
      <Navigation history={this.props.history}>
        <div>
          <h1>Dashboard</h1>
          {isFetching ? (
            <LoaderExampleLoader />
          ) : (
            <Card.Group centered>
              {reports.map(report => (
                <Card key={report.id} href={`/reports/${report.id}`}>
                  <Image size="small" centered src="https://i.redd.it/v2f9jbro0mly.jpg" />
                  <Card.Content>
                    <Card.Header>{report.title}</Card.Header>
                    <Card.Meta>Score: {report.rating}</Card.Meta>
                    <Card.Description>{report.description}</Card.Description>
                  </Card.Content>
                  <Card.Content extra>Go to</Card.Content>
                </Card>
              ))}
            </Card.Group>
          )}
        </div>
      </Navigation>
    );
  }
}

Dashboard.propTypes = {
  fetchReports: PropTypes.func.isRequired,
  reports: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      pill_id: PropTypes.number.isRequired,
      reporter: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    }),
  ).isRequired,
  isFetching: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  reports: state.reports.reports,
  isFetching: state.reports.isFetching,
});

const mapDispatchToProps = {
  fetchReports,
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
