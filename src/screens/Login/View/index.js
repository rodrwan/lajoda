import React from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Message, Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { login } from '../../../reducers/session';
import Navigation from '../../../components/Navigation';

class Login extends React.Component {
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
      .login({
        credentials: this.state.credentials,
      })
      .then(res => {
        if (typeof res === 'undefined') {
          this.props.history.push('/dashboard');
        }
      });

  render() {
    return (
      <Navigation history={this.props.history}>
        <Container>
          <Header as="h2">Login</Header>
          <Form>
            {this.state.error.message ? <ErrorMessage message={this.state.error.message} /> : null}
            {this.props.error.message ? <ErrorMessage message={this.props.error.message} /> : null}
            <Form.Field>
              <label htmlFor="email">Email</label>
              <input
                placeholder="Email"
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.onChange}
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="email">Password</label>
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
              />
            </Form.Field>
            <Button type="submit" disabled={this.props.isFetching} onClick={this.submit}>
              Submit
            </Button>
          </Form>
        </Container>
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
  error: state.session.error,
  isFetching: state.session.isFetching,
});

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
