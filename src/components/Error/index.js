import React from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';

const Error = ({ message }) => (
  <div>
    <Message negative>
      <Message.Header>Something went wrong</Message.Header>
      <p>{message}</p>
    </Message>
  </div>
);

Error.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Error;
