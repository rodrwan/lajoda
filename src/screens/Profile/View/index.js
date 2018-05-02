import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Button } from 'semantic-ui-react'
import { connect } from 'react-redux';
import * as session from 'reducers/session';

import Navigation from 'components/Navigation';


const Profile = ({ user, logout, ...props }) => (
  <div>
    <Navigation history={props.history}>
      <Card centered fluid>
        <Image src="http://icons.iconarchive.com/icons/flat-icons.com/square/128/pill-icon.png" circular/>
        <Card.Content>
          <Card.Header>{user.email}</Card.Header>
        </Card.Content>
        <Card.Content extra centered>
        <Button onClick={e => {e.preventDefault(); logout()}} circular icon='sign out' centered />
        </Card.Content>
      </Card>
    </Navigation>
  </div>
);

Profile.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired
    }).isRequired,
    logout: PropTypes.func.isRequired,
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired
};

const mapStateToProps = state => ({
  user: state.session.user,
});

const mapDispatchToProps = {
    logout: session.logout,
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);