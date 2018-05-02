import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { login } from 'reducers/session';
import Navigation from 'components/Navigation';
import LoginForm from 'components/Form/Login';
import Error from 'components/Error';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      credentials: {
        email: 'lajoda@test.com',
        password: 'lala',
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
      .login({
        credentials: this.state.credentials,
      })
      .then(res => {
        if (typeof res !== 'undefined') {
          this.props.history.push('/dashboard');
        }
      });

  render() {
    const { error } = this.state;

    return (
      <Navigation history={this.props.history}>
        <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" textAlign="center">
              Login
            </Header>
            {error.message ? <Error message={error.message} /> : null}
            <LoginForm
              onSubmit={this.submit}
              credentials={this.state.credentials} // porcion que quiero modificar
              onChange={this.onChange} // quien modifica esa porcion
              isFetching={this.props.isFetching}
              apiError={this.props.error}
              buttonLabel="Login"
            />
            <Message>
              New to us? <a href="/signup">Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </Navigation>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  error: state.session.error,
  isFetching: state.session.isFetching,
});

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
