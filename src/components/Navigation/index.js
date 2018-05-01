import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DesktopNavigation from './Desktop';
import MobileNavigation from './Mobile';
import { logout } from '../../reducers/session';

const mapStateToProps = state => ({
  user: state.session.user,
  isAuthenticated: state.session.isAuthenticated,
});

const ResponsiveContainer = ({ children, ...rest }) => (
  <div>
    <DesktopNavigation {...rest}>{children}</DesktopNavigation>
    <MobileNavigation {...rest}>{children}</MobileNavigation>
  </div>
);

ResponsiveContainer.defaultProps = {
  children: undefined,
};

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
};

export default connect(mapStateToProps, { logout })(ResponsiveContainer);
