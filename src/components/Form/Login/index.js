import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Message } from 'semantic-ui-react';

const Login = ({ onSubmit, credentials, onChange, isFetching, stateError, apiError }) => (
  <Form>
    <pre>{JSON.stringify(credentials, null, 2)}</pre>
    {stateError.message ? <ErrorMessage message={stateError.message} /> : null}
    {apiError.message ? <ErrorMessage message={apiError.message} /> : null}
    <Form.Field>
      <label htmlFor="email">Email</label>
      <input
        placeholder="Email"
        name="email"
        type="email"
        value={credentials.email}
        onChange={onChange}
      />
    </Form.Field>
    <Form.Field>
      <label htmlFor="email">Password</label>
      <input type="password" name="password" value={credentials.password} onChange={onChange} />
    </Form.Field>
    <Button type="submit" disabled={isFetching} onClick={onSubmit}>
      Submit
    </Button>
  </Form>
);

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  credentials: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  stateError: PropTypes.shape({
    message: PropTypes.string,
  }).isRequired,
  apiError: PropTypes.shape({
    message: PropTypes.string,
  }).isRequired,
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

export default Login;
