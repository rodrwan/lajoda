import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Segment } from 'semantic-ui-react';
import Error from 'components/Error';

const Login = ({ onSubmit, credentials, onChange, isFetching, apiError, buttonLabel }) => (
  <Form>
    {apiError.message ? <Error message={apiError.message} /> : null}
    <Segment stacked>
      <Form.Input
        fluid
        icon="user"
        iconPosition="left"
        placeholder="Email"
        name="email"
        type="email"
        value={credentials.email}
        onChange={onChange}
      />
      <Form.Input
        fluid
        icon="lock"
        iconPosition="left"
        placeholder="password"
        type="password"
        name="password"
        value={credentials.password}
        onChange={onChange}
      />

      <Button type="submit" color="black" fluid disabled={isFetching} onClick={onSubmit}>
        {buttonLabel}
      </Button>
    </Segment>
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
  buttonLabel: PropTypes.string.isRequired,
};

export default Login;
