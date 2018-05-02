import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { createUser } from 'reducers/user';
import Navigation from 'components/Navigation';
import LoginForm from 'components/Form/Login';

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      credentials: {
        email: '',
        password: '',
      },
      error: {
        message: '',
      },
    };
  }

  onChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value,
      },
    });
  };

  submit = () =>
    this.props
      .createUser({
        user: this.state.user,
      })
      .then(res => {
        if (typeof res === 'undefined') {
          this.props.history.push('/dashboard');
        }
      });

  render() {
    return (
      <Navigation history={this.props.history}>
        <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 550 }}>
            <Header as="h2" textAlign="center">
              Signup
            </Header>
            {this.state.error.message ? <ErrorMessage message={this.state.error.message} /> : null}
            {this.props.error.message ? <ErrorMessage message={this.props.error.message} /> : null}
            <LoginForm
              onSubmit={this.submit}
              credentials={this.state.credentials} // porcion que quiero modificar
              onChange={this.onChange} // quien modifica esa porcion
              isFetching={this.props.isFetching}
              apiError={this.props.error}
              buttonLabel="Sign Up"
            />
          </Grid.Column>
        </Grid>
      </Navigation>
    );
  }
}

Signup.propTypes = {
  createUser: PropTypes.func.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const ErrorMessage = ({ message }) => (
  <div>
    <Message negative>
      <Message.Header>Something went wrong</Message.Header>
      <p>{message}</p>
    </Message>
  </div>
);

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  error: state.user.error,
  isFetching: state.user.isFetching,
});

const mapDispatchToProps = {
  createUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
