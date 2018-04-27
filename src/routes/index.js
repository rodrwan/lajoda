import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import HomeView from '../screens/Home/View';
import LoginView from '../screens/Login/View';
import SignupView from '../screens/Signup/View';
import DashboardView from '../screens/Dashboard/View';

const routes = ({ location }) => (
  <div>
    <Route location={location} exact path="/" component={HomeView} />
    <Route location={location} exact path="/login" component={LoginView} />
    <Route location={location} exact path="/signup" component={SignupView} />
    <Route location={location} exact path="/dashboard" component={DashboardView} />
  </div>
);

routes.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default routes;
