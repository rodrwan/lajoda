import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import Error from 'components/Error';

const Login = ({ onSubmit, credentials, onChange, isFetching, apiError }) => (
  <Form>
    {apiError.message ? <Error message={apiError.message} /> : null}
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
      <input
        placeholder="password"
        type="password"
        name="password"
        value={credentials.password}
        onChange={onChange}
      />
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
  apiError: PropTypes.shape({
    message: PropTypes.string,
  }).isRequired,
};

export default Login;
